from datetime import datetime, timedelta, timezone
from typing import Any, Union
import bcrypt
from jose import jwt
from app.core.config import settings

ALGORITHM = "HS256"

def create_access_token(subject: Union[str, Any], role: str, expires_delta: timedelta = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # 7 days expiration for customer, 8 hours for admin can be managed at call time
        expire = datetime.now(timezone.utc) + timedelta(days=7)
    
    to_encode = {"exp": expire, "sub": str(subject), "role": role}
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=ALGORITHM)
    return encoded_jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
