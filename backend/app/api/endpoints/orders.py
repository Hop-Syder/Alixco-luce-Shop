"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Orders endpoints with authentication support
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
*/──────────────────────────────────
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from urllib.parse import quote
from bson import ObjectId
import uuid
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.api import deps
from app.api.deps import get_current_active_user
from app.models.schemas import OrderCreate, Order, OrderStatusUpdate
from app.core.config import settings

router = APIRouter()

def serialize_order(db_order: dict) -> dict:
    """Helper to convert MongoDB _id to id string."""
    db_order["_id"] = str(db_order["_id"])
    return db_order

def generate_order_number() -> str:
    return f"ALX-{str(uuid.uuid4().int)[:4]}"

def build_whatsapp_message(order: Order) -> str:
    lines = []
    lines.append("🛍️ *NOUVELLE COMMANDE ALIXCO LUXE*")
    lines.append(f"Numéro de commande : {order.orderNumber}")
    lines.append("")
    lines.append("*Informations client :*")
    lines.append(f"Nom : {order.customer.name}")
    lines.append(f"Téléphone : {order.customer.phone}")
    lines.append(f"Adresse de livraison : {order.customer.address}")
    lines.append("")
    lines.append("*Détail des articles :*")
    
    for item in order.items:
        notes_str = f" (Notes: {item.notes})" if getattr(item, "notes", "") else ""
        lines.append(f"- Produit ID {item.productId} x{item.quantity}{notes_str}")
        
    lines.append("")
    lines.append(f"*Total général : {order.total:,.0f} FCFA*".replace(",", " "))
    lines.append("")
    
    date_str = order.createdAt.astimezone().strftime("%d/%m/%Y %H:%M")
    lines.append(f"_{date_str}_")
    lines.append("_En attente de confirmation_")
    
    message = "\n".join(lines)
    return quote(message)

@router.post("/", response_model=dict)
async def create_order(
    order_data: OrderCreate,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_user: dict | None = Depends(deps.get_optional_current_user)
):
    """
    Create a new order. Associates with user if authenticated.
    """
    total = 0.0
    products_to_update = []
    
    for item in order_data.items:
        try:
            product_obj_id = ObjectId(item.productId)
        except Exception:
            raise HTTPException(status_code=400, detail=f"ID produit invalide : {item.productId}")
            
        product = await db.products.find_one({"_id": product_obj_id})
        
        if not product:
            raise HTTPException(status_code=400, detail=f"Produit non trouvé : {item.productId}")
            
        if product.get("stock", 0) < item.quantity:
            raise HTTPException(status_code=400, detail=f"Stock insuffisant pour le produit : {product.get('name', item.productId)}")
            
        total += float(product.get("price", 0)) * item.quantity
        products_to_update.append({"id": product_obj_id, "quantity": item.quantity})
        
    order_number = generate_order_number()
    now = datetime.now(timezone.utc)
    
    # Associate with user if logged in
    user_id = current_user["id"] if current_user else order_data.userId
    
    new_order = Order(
        orderNumber=order_number,
        userId=user_id,
        customer=order_data.customer,
        items=order_data.items,
        total=total,
        status="pending",
        whatsappMessage="", 
        createdAt=now,
        updatedAt=now
    )
    
    whatsapp_message = build_whatsapp_message(new_order)
    new_order.whatsappMessage = whatsapp_message
    
    order_dict = new_order.model_dump(by_alias=True, exclude={"id"})
    result = await db.orders.insert_one(order_dict)
    
    for p in products_to_update:
        await db.products.update_one(
            {"_id": p["id"]},
            {"$inc": {"stock": -p["quantity"]}}
        )
        
    wa_url = f"https://wa.me/{settings.whatsapp_number}?text={whatsapp_message}"
    
    return {
        "orderId": str(result.inserted_id),
        "orderNumber": order_number,
        "whatsappUrl": wa_url
    }

# IMPORTANT: /my-orders MUST be defined BEFORE / to avoid FastAPI route conflict
@router.get("/my-orders", response_model=List[Order])
async def list_my_orders(
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_user: dict = Depends(get_current_active_user)
):
    """
    Get current user's orders.
    """
    cursor = db.orders.find({"userId": current_user["id"]}).sort("createdAt", -1)
    orders = await cursor.to_list(length=100)
    return [serialize_order(o) for o in orders]

@router.get("/", response_model=List[Order])
async def list_all_orders(
    skip: int = 0,
    limit: int = 100,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Get all orders (Admin only).
    """
    cursor = db.orders.find({}).sort("createdAt", -1).skip(skip).limit(limit)
    orders = await cursor.to_list(length=limit)
    return [serialize_order(o) for o in orders]

@router.patch("/{id}/status", response_model=dict)
async def update_order_status(
    id: str,
    status_update: OrderStatusUpdate,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Update order status (Admin only).
    Valid statuses: pending, processing, shipped, delivered, cancelled
    """
    valid_statuses = ["pending", "processing", "shipped", "delivered", "cancelled"]
    if status_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Statut invalide. Utilisez: {', '.join(valid_statuses)}")
        
    try:
        obj_id = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="Format d'ID invalide")

    result = await db.orders.update_one(
        {"_id": obj_id},
        {"$set": {
            "status": status_update.status,
            "updatedAt": datetime.now(timezone.utc)
        }}
    )
    
    if result.modified_count == 0:
        # Check if order exists
        order = await db.orders.find_one({"_id": obj_id})
        if not order:
            raise HTTPException(status_code=404, detail="Commande non trouvée")
        # If it exists but wasn't modified, it means the status was already the same
        return {"message": "Statut inchangé", "status": status_update.status}
        
    return {"message": "Statut mis à jour avec succès", "status": status_update.status}
