from fastapi import APIRouter
from app.api.endpoints import poc, auth, users, products, orders, categories, featured_products, page_settings, upload, analytics, testimonials
api_router = APIRouter()
api_router.include_router(poc.router, prefix="/poc", tags=["poc"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(featured_products.router, prefix="/featured-products", tags=["featured-products"])
api_router.include_router(page_settings.router, prefix="/page-settings", tags=["page-settings"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(testimonials.router, prefix="/testimonials", tags=["testimonials"])
