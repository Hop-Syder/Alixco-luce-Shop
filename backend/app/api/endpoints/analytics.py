"""
/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Analytics endpoints for Admin Dashboard
 * @created 2026-06-08
 * @updated 2026-06-08
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
*/──────────────────────────────────
"""

from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from datetime import datetime, timezone
from dateutil.relativedelta import relativedelta

from app.api import deps

router = APIRouter()

@router.get("/dashboard")
async def get_dashboard_analytics(
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Get aggregated analytics data for the admin dashboard.
    """
    # 1. Total Stats
    total_stats_cursor = db.orders.aggregate([
        {"$match": {"status": {"$ne": "cancelled"}}},
        {"$group": {
            "_id": None,
            "totalRevenue": {"$sum": "$total"},
            "totalOrders": {"$sum": 1}
        }}
    ])
    total_stats_list = await total_stats_cursor.to_list(1)
    
    total_revenue = 0
    total_orders = 0
    if total_stats_list:
        total_revenue = total_stats_list[0].get("totalRevenue", 0)
        total_orders = total_stats_list[0].get("totalOrders", 0)

    # 2. Monthly Stats (last 6 months)
    six_months_ago = datetime.now(timezone.utc) - relativedelta(months=6)
    
    monthly_stats_cursor = db.orders.aggregate([
        {"$match": {
            "status": {"$ne": "cancelled"},
            "createdAt": {"$gte": six_months_ago}
        }},
        {"$group": {
            "_id": {"$dateToString": {"format": "%Y-%m", "date": "$createdAt"}},
            "revenue": {"$sum": "$total"},
            "orders": {"$sum": 1}
        }},
        {"$sort": {"_id": 1}}
    ])
    monthly_stats_list = await monthly_stats_cursor.to_list(12)
    
    formatted_monthly = []
    for item in monthly_stats_list:
        formatted_monthly.append({
            "name": item["_id"],  # e.g., "2026-05"
            "revenue": item["revenue"],
            "orders": item["orders"]
        })

    # 3. Category Breakdown
    category_stats_cursor = db.orders.aggregate([
        {"$match": {"status": {"$ne": "cancelled"}}},
        {"$unwind": "$items"},
        {"$addFields": {"productObjId": {"$toObjectId": "$items.productId"}}},
        {"$lookup": {
            "from": "products",
            "localField": "productObjId",
            "foreignField": "_id",
            "as": "product_info"
        }},
        {"$unwind": "$product_info"},
        {"$group": {
            "_id": "$product_info.category",
            "value": {"$sum": "$items.quantity"}
        }}
    ])
    category_stats_list = await category_stats_cursor.to_list(100)
    
    formatted_categories = []
    for item in category_stats_list:
        # Resolve category names nicely if possible, or just return the ID string
        cat_id = item["_id"]
        # It's better to capitalize or format. Let's just use it directly.
        formatted_categories.append({
            "name": cat_id.capitalize() if isinstance(cat_id, str) else str(cat_id),
            "value": item["value"]
        })

    return {
        "summary": {
            "totalRevenue": total_revenue,
            "totalOrders": total_orders
        },
        "monthlyData": formatted_monthly,
        "categoryData": formatted_categories
    }

@router.get("/customers")
async def get_customers_crm(
    export: bool = False,
    page: int = 1,
    limit: int = 20,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Get all unique customers aggregated by phone number from orders.
    If export=True, returns the full list. Otherwise, returns a paginated response.
    """
    match_stage = {"$match": {"status": {"$ne": "cancelled"}}}
    group_stage = {"$group": {
        "_id": "$customer.phone",
        "name": {"$first": "$customer.name"},
        "email": {"$first": "$customer.email"},
        "address": {"$first": "$customer.address"},
        "totalOrders": {"$sum": 1},
        "totalSpent": {"$sum": "$total"},
        "lastOrderDate": {"$max": "$createdAt"}
    }}
    sort_stage = {"$sort": {"lastOrderDate": -1}}

    if export:
        customers_cursor = db.orders.aggregate([match_stage, group_stage, sort_stage])
        customers = await customers_cursor.to_list(None)
        
        formatted_customers = []
        for c in customers:
            formatted_customers.append({
                "phone": c["_id"],
                "name": c.get("name", "Inconnu"),
                "email": c.get("email", ""),
                "address": c.get("address", ""),
                "totalOrders": c.get("totalOrders", 0),
                "totalSpent": c.get("totalSpent", 0),
                "lastOrderDate": c.get("lastOrderDate")
            })
        return formatted_customers

    skip = (page - 1) * limit
    facet_stage = {
        "$facet": {
            "metadata": [{"$count": "total"}],
            "data": [{"$skip": skip}, {"$limit": limit}]
        }
    }

    customers_cursor = db.orders.aggregate([match_stage, group_stage, sort_stage, facet_stage])
    result = await customers_cursor.to_list(1)
    
    if not result or not result[0]["data"]:
        return {"items": [], "total": 0, "page": page, "limit": limit, "total_pages": 0}

    data = result[0]["data"]
    total = result[0]["metadata"][0]["total"] if result[0]["metadata"] else 0
    total_pages = (total + limit - 1) // limit

    formatted_customers = []
    for c in data:
        formatted_customers.append({
            "phone": c["_id"],
            "name": c.get("name", "Inconnu"),
            "email": c.get("email", ""),
            "address": c.get("address", ""),
            "totalOrders": c.get("totalOrders", 0),
            "totalSpent": c.get("totalSpent", 0),
            "lastOrderDate": c.get("lastOrderDate")
        })

    return {
        "items": formatted_customers,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }
