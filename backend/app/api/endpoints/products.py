"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product catalog endpoints
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
*/──────────────────────────────────
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.api import deps
from app.models.schemas import Product, ProductBase, ProductUpdate, PaginatedResponse

router = APIRouter()

def serialize_product(db_product: dict) -> dict:
    """Helper to convert MongoDB _id to id string."""
    db_product["_id"] = str(db_product["_id"])
    return db_product

@router.get("/", response_model=PaginatedResponse[Product])
async def list_products(
    page: int = 1,
    limit: int = 20,
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
):
    """
    Retrieve products list (paginated).
    """
    skip = (page - 1) * limit
    total = await db.products.count_documents({})
    
    cursor = db.products.find({}).skip(skip).limit(limit)
    products = await cursor.to_list(length=limit)
    
    total_pages = (total + limit - 1) // limit
    
    return {
        "items": [serialize_product(p) for p in products],
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }

@router.get("/{product_id}", response_model=Product)
async def get_product(
    product_id: str,
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
):
    """
    Get product by ID.
    """
    try:
        obj_id = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID format")
        
    product = await db.products.find_one({"_id": obj_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return serialize_product(product)

@router.post("/", response_model=Product)
async def create_product(
    product_in: ProductBase,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Create new product (Admin only).
    """
    new_product = product_in.model_dump()
    result = await db.products.insert_one(new_product)
    
    created_product = await db.products.find_one({"_id": result.inserted_id})
    return serialize_product(created_product)

@router.put("/{product_id}", response_model=Product)
async def update_product(
    product_id: str,
    product_in: ProductUpdate,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Update a product (Admin only).
    """
    try:
        obj_id = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    # Correction: filtrer uniquement les valeurs None, pas les 0 ou chaînes vides
    update_data = {k: v for k, v in product_in.model_dump().items() if v is not None}
    
    if update_data:
        result = await db.products.update_one(
            {"_id": obj_id},
            {"$set": update_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")

    updated_product = await db.products.find_one({"_id": obj_id})
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return serialize_product(updated_product)

@router.delete("/{product_id}")
async def delete_product(
    product_id: str,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Delete a product (Admin only).
    """
    try:
        obj_id = ObjectId(product_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid product ID format")

    result = await db.products.delete_one({"_id": obj_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
        
    return {"message": "Product deleted successfully"}
