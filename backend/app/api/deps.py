from typing import AsyncGenerator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError

from app.core.config import settings
from app.core import security
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId
from app.db.mongodb import get_database

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.api_v1_str}/auth/login/access-token"
)

async def get_db() -> AsyncIOMotorDatabase:
    # Re-utilise le client global créé au démarrage de l'application
    # Evite de créer une nouvelle connexion à chaque requête (fuite de ressources)
    return get_database()

reusable_oauth2_optional = OAuth2PasswordBearer(
    tokenUrl=f"{settings.api_v1_str}/auth/login/access-token",
    auto_error=False
)

async def get_optional_current_user(
    db: AsyncIOMotorDatabase = Depends(get_db),
    token: str = Depends(reusable_oauth2_optional)
) -> dict | None:
    if not token:
        return None
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[security.ALGORITHM]
        )
        user_id = payload.get("sub")
        if user_id is None:
            return None
        
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["id"] = str(user["_id"])
            return user
    except (JWTError, ValidationError):
        return None
    return None

async def get_current_user(
    db: AsyncIOMotorDatabase = Depends(get_db),
    token: str = Depends(reusable_oauth2)
) -> dict:
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[security.ALGORITHM]
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=403, detail="Could not validate credentials")
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["id"] = str(user["_id"])
    return user

async def get_current_active_user(
    current_user: dict = Depends(get_current_user),
) -> dict:
    # Additional checks like is_active could be added here
    return current_user

async def get_current_active_admin(
    current_user: dict = Depends(get_current_active_user),
) -> dict:
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user
