from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str
    price: float
    image: str
    stock: int
    category: str

class Product(ProductBase):
    id: str = Field(alias="_id")

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    image: Optional[str] = None
    stock: Optional[int] = None
    category: Optional[str] = None

class CategoryBase(BaseModel):
    title: str
    desc: str
    img: str
    order: int = 0

class Category(CategoryBase):
    id: str = Field(alias="_id")

class FeaturedProductBase(BaseModel):
    name: str
    price: str
    badge: Optional[str] = None
    img: str
    order: int = 0

class FeaturedProduct(FeaturedProductBase):
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
