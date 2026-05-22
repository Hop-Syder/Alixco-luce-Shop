from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

class Address(BaseModel):
    street: str
    city: str
    country: str = "Bénin"
    details: Optional[str] = None

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    phone: str
    full_name: str
    role: str = "customer" # customer, artisan, admin

class UserCreate(UserBase):
    password: Optional[str] = None # Optional for WhatsApp registration

class UserInDB(UserBase):
    id: str = Field(alias="_id")
    hashed_password: Optional[str] = None
    addresses: List[Address] = []
    created_at: datetime
    updated_at: datetime
    
class UserResponse(UserBase):
    id: str
    addresses: List[Address] = []
    created_at: datetime
