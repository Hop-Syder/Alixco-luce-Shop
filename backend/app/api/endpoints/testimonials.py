"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Testimonial endpoints for Alixco-luce
 * @created 2026-06-08
 * @updated 2026-06-08
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.api import deps
from app.models.schemas import Testimonial, TestimonialBase, TestimonialUpdate, PaginatedResponse

router = APIRouter()

def serialize_testimonial(db_testimonial: dict) -> dict:
    """Helper to convert MongoDB _id to id string."""
    db_testimonial["_id"] = str(db_testimonial["_id"])
    return db_testimonial

@router.get("/", response_model=PaginatedResponse[Testimonial])
async def list_testimonials(
    is_featured: Optional[bool] = Query(None, description="Filter by featured status"),
    is_approved: Optional[bool] = Query(None, description="Filter by approval status"),
    page: int = 1,
    limit: int = 20,
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
):
    """
    Retrieve testimonials. If filters are provided, applies them.
    Public requests typically use ?is_approved=true.
    """
    query = {}
    if is_featured is not None:
        query["is_featured"] = is_featured
    if is_approved is not None:
        query["is_approved"] = is_approved

    skip = (page - 1) * limit
    total = await db.testimonials.count_documents(query)

    cursor = db.testimonials.find(query).sort("_id", -1).skip(skip).limit(limit)
    testimonials = await cursor.to_list(length=limit)
    
    total_pages = (total + limit - 1) // limit

    return {
        "items": [serialize_testimonial(t) for t in testimonials],
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }

@router.post("/", response_model=Testimonial)
async def create_testimonial(
    testimonial_in: TestimonialBase,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Create a new testimonial (Admin only).
    """
    new_testimonial = testimonial_in.model_dump()
    result = await db.testimonials.insert_one(new_testimonial)
    
    created_testimonial = await db.testimonials.find_one({"_id": result.inserted_id})
    return serialize_testimonial(created_testimonial)

@router.put("/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(
    testimonial_id: str,
    testimonial_in: TestimonialUpdate,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Update an existing testimonial (Admin only).
    """
    try:
        obj_id = ObjectId(testimonial_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid testimonial ID format")
        
    update_data = {k: v for k, v in testimonial_in.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = await db.testimonials.update_one(
        {"_id": obj_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    updated_testimonial = await db.testimonials.find_one({"_id": obj_id})
    return serialize_testimonial(updated_testimonial)

@router.delete("/{testimonial_id}")
async def delete_testimonial(
    testimonial_id: str,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Delete a testimonial (Admin only).
    """
    try:
        obj_id = ObjectId(testimonial_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid testimonial ID format")
        
    result = await db.testimonials.delete_one({"_id": obj_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    return {"message": "Testimonial deleted successfully"}
