from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime, timezone
from urllib.parse import quote
from bson import ObjectId
import uuid

from app.models.schemas import OrderCreate, Order, CartItem
from app.db.mongodb import get_database
from app.core.config import settings

router = APIRouter()

def generate_order_number() -> str:
    # Génère un numéro de type ALX-XXXX
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
        # Notes is already part of the object
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

@router.post("/orders")
async def create_poc_order(order_data: OrderCreate):
    db = get_database()
    
    # Étape 1 & 2 : Validation Pydantic déjà faite via FastAPI
    
    # Étape 3 & 4 : Vérification stock et calcul total
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
        
    # Étape 5 : Génération numéro de commande
    order_number = generate_order_number()
    now = datetime.now(timezone.utc)
    
    # Création de l'objet Order complet (sans le champ whatsappMessage pour l'instant)
    new_order = Order(
        orderNumber=order_number,
        userId=order_data.userId,
        customer=order_data.customer,
        items=order_data.items,
        total=total,
        status="pending",
        whatsappMessage="", # Sera mis à jour ensuite
        createdAt=now,
        updatedAt=now
    )
    
    # Étape 7 : Construction message WhatsApp
    whatsapp_message = build_whatsapp_message(new_order)
    new_order.whatsappMessage = whatsapp_message
    
    # Étape 6 : Persistance MongoDB
    order_dict = new_order.model_dump(by_alias=True, exclude={"id"})
    result = await db.orders.insert_one(order_dict)
    
    # Mise à jour optionnelle du stock (selon MVP)
    for p in products_to_update:
        await db.products.update_one(
            {"_id": p["id"]},
            {"$inc": {"stock": -p["quantity"]}}
        )
        
    # Étape 8 : Retour URL
    wa_url = f"https://wa.me/{settings.whatsapp_number}?text={whatsapp_message}"
    
    return {
        "orderId": str(result.inserted_id),
        "orderNumber": order_number,
        "whatsappUrl": wa_url
    }
