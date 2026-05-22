"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Category endpoints for featured categories
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
*/──────────────────────────────────
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, Body
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.api import deps
from app.models.schemas import Category, CategoryBase

router = APIRouter()

def serialize_category(db_category: dict) -> dict:
    """Helper to convert MongoDB _id to id string."""
    db_category["_id"] = str(db_category["_id"])
    return db_category

@router.get("/", response_model=List[Category])
async def list_categories(
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
):
    """
    Retrieve all featured categories, ordered by the 'order' field.
    """
    cursor = db.categories.find({}).sort("order", 1)
    categories = await cursor.to_list(length=100)
    return [serialize_category(c) for c in categories]

@router.post("/", response_model=Category)
async def create_category(
    category_in: CategoryBase,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Create a new featured category (Admin only).
    """
    new_category = category_in.model_dump()
    result = await db.categories.insert_one(new_category)
    
    created_category = await db.categories.find_one({"_id": result.inserted_id})
    return serialize_category(created_category)

@router.put("/{category_id}", response_model=Category)
async def update_category(
    category_id: str,
    category_in: CategoryBase,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Update an existing featured category (Admin only).
    """
    try:
        obj_id = ObjectId(category_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid category ID format")
        
    updated_data = category_in.model_dump()
    result = await db.categories.update_one(
        {"_id": obj_id},
        {"$set": updated_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
        
    updated_category = await db.categories.find_one({"_id": obj_id})
    return serialize_category(updated_category)

@router.delete("/{category_id}")
async def delete_category(
    category_id: str,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Delete a featured category (Admin only).
    """
    try:
        obj_id = ObjectId(category_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid category ID format")
        
    result = await db.categories.delete_one({"_id": obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
        
    return {"message": "Category deleted successfully"}
