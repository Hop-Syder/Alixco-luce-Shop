"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Featured products endpoints for the homepage
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
from app.models.schemas import FeaturedProduct, FeaturedProductBase

router = APIRouter()

def serialize_featured_product(db_item: dict) -> dict:
    """Helper to convert MongoDB _id to id string."""
    db_item["_id"] = str(db_item["_id"])
    return db_item

@router.get("/", response_model=List[FeaturedProduct])
async def list_featured_products(
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
):
    """
    Retrieve all featured products, ordered by the 'order' field.
    """
    cursor = db.featured_products.find({}).sort("order", 1)
    items = await cursor.to_list(length=100)
    return [serialize_featured_product(c) for c in items]

@router.post("/", response_model=FeaturedProduct)
async def create_featured_product(
    item_in: FeaturedProductBase,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Create a new featured product (Admin only).
    """
    new_item = item_in.model_dump()
    result = await db.featured_products.insert_one(new_item)
    
    created_item = await db.featured_products.find_one({"_id": result.inserted_id})
    return serialize_featured_product(created_item)

@router.put("/{item_id}", response_model=FeaturedProduct)
async def update_featured_product(
    item_id: str,
    item_in: FeaturedProductBase,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Update an existing featured product (Admin only).
    """
    try:
        obj_id = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item ID format")
        
    updated_data = item_in.model_dump()
    result = await db.featured_products.update_one(
        {"_id": obj_id},
        {"$set": updated_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Featured product not found")
        
    updated_item = await db.featured_products.find_one({"_id": obj_id})
    return serialize_featured_product(updated_item)

@router.delete("/{item_id}")
async def delete_featured_product(
    item_id: str,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Delete a featured product (Admin only).
    """
    try:
        obj_id = ObjectId(item_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid item ID format")
        
    result = await db.featured_products.delete_one({"_id": obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Featured product not found")
        
    return {"message": "Featured product deleted successfully"}
