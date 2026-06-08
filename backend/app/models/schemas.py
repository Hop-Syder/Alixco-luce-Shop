from datetime import datetime
from typing import List, Optional, TypeVar, Generic
from pydantic import BaseModel, Field

T = TypeVar('T')

class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    page: int
    limit: int
    total_pages: int

class ProductBase(BaseModel):
    name_fr: str
    name_en: str
    price: float
    image: str
    stock: int
    category: str
    seo_title_fr: Optional[str] = None
    seo_title_en: Optional[str] = None
    seo_desc_fr: Optional[str] = None
    seo_desc_en: Optional[str] = None
    seo_keywords_fr: Optional[str] = None
    seo_keywords_en: Optional[str] = None

class Product(ProductBase):
    model_config = {"populate_by_name": True}
    id: str = Field(alias="_id")

class ProductUpdate(BaseModel):
    name_fr: Optional[str] = None
    name_en: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    stock: Optional[int] = None
    category: Optional[str] = None
    seo_title_fr: Optional[str] = None
    seo_title_en: Optional[str] = None
    seo_desc_fr: Optional[str] = None
    seo_desc_en: Optional[str] = None
    seo_keywords_fr: Optional[str] = None
    seo_keywords_en: Optional[str] = None

class CategoryBase(BaseModel):
    title_fr: str
    title_en: str
    desc_fr: str
    desc_en: str
    img: str
    order: int = 0
    seo_title_fr: Optional[str] = None
    seo_title_en: Optional[str] = None
    seo_desc_fr: Optional[str] = None
    seo_desc_en: Optional[str] = None
    seo_keywords_fr: Optional[str] = None
    seo_keywords_en: Optional[str] = None

class Category(CategoryBase):
    model_config = {"populate_by_name": True}
    id: str = Field(alias="_id")

class FeaturedProductBase(BaseModel):
    name_fr: str
    name_en: str
    price_fr: str
    price_en: str
    badge_fr: Optional[str] = None
    badge_en: Optional[str] = None
    img: str
    order: int = 0

class FeaturedProduct(FeaturedProductBase):
    model_config = {"populate_by_name": True}
    id: str = Field(alias="_id")

class CartItem(BaseModel):
    productId: str
    quantity: int
    notes: str = ""

class CustomerInfo(BaseModel):
    name: str
    email: str
    phone: str
    address: str

class OrderCreate(BaseModel):
    customer: CustomerInfo
    items: List[CartItem]
    userId: Optional[str] = None

class Order(BaseModel):
    model_config = {"populate_by_name": True}
    id: Optional[str] = Field(None, alias="_id")
    orderNumber: str
    userId: Optional[str] = None
    customer: CustomerInfo
    items: List[CartItem]
    total: float
    status: str = "pending"
    whatsappMessage: str
    createdAt: datetime
    updatedAt: datetime

class OrderStatusUpdate(BaseModel):
    status: str

class HeroSettings(BaseModel):
    title_highlight: str
    title_main: str
    subtitle: str
    description: str
    cta_primary_text: str
    cta_primary_link: str
    cta_secondary_text: str
    cta_secondary_link: str
    image_3d: str
    image_bg: str

class PromoSettings(BaseModel):
    title: str
    subtitle: str
    description: str
    discount_tag: Optional[str] = None
    cta_text: str
    cta_link: str
    image: str

class HomePageSettings(BaseModel):
    hero: HeroSettings
    promo: PromoSettings
    # Champ interne MongoDB — ignoré lors de la sérialisation sortante
    model_config = {"populate_by_name": True}
    page: Optional[str] = None

class TestimonialBase(BaseModel):
    name: str
    role_fr: str
    role_en: str
    text_fr: str
    text_en: str
    rating: int = 5
    is_featured: bool = False
    is_approved: bool = False

class Testimonial(TestimonialBase):
    model_config = {"populate_by_name": True}
    id: str = Field(alias="_id")

class TestimonialUpdate(BaseModel):
    name: Optional[str] = None
    role_fr: Optional[str] = None
    role_en: Optional[str] = None
    text_fr: Optional[str] = None
    text_en: Optional[str] = None
    rating: Optional[int] = None
    is_featured: Optional[bool] = None
    is_approved: Optional[bool] = None
