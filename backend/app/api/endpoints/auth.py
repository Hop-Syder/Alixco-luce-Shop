from datetime import timedelta, datetime, timezone
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.api import deps
from app.core import security
from app.core.config import settings
from app.models.user import UserCreate, UserResponse
from pydantic import BaseModel

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str

@router.post("/login/access-token", response_model=Token)
async def login_access_token(
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    # Assuming form_data.username is phone number for our app
    user = await db.users.find_one({"phone": form_data.username})
    if not user or not user.get("hashed_password"):
        raise HTTPException(status_code=400, detail="Incorrect phone or password")
    
    if not security.verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect phone or password")
    
    access_token_expires = timedelta(minutes=settings.access_token_expire_minutes)
    return {
        "access_token": security.create_access_token(
            str(user["_id"]), user.get("role", "customer"), expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }

@router.post("/register", response_model=UserResponse)
async def register(
    user_in: UserCreate,
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
) -> Any:
    """
    Register a new user
    """
    user = await db.users.find_one({"phone": user_in.phone})
    if user:
        raise HTTPException(
            status_code=400,
            detail="A user with this phone number already exists.",
        )
    
    user_dict = user_in.model_dump()
    if user_in.password:
        user_dict["hashed_password"] = security.get_password_hash(user_in.password)
        del user_dict["password"]
    
    user_dict["created_at"] = datetime.now(timezone.utc)
    user_dict["updated_at"] = user_dict["created_at"]
    
    result = await db.users.insert_one(user_dict)
    
    user_dict["id"] = str(result.inserted_id)
    return user_dict
