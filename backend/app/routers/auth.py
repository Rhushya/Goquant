from fastapi import APIRouter, HTTPException, status
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

from app.schemas import UserCreate, LoginRequest, TokenResponse, UserResponse
from app.config import settings

router = APIRouter()

# Password hashing
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# Mock database for demo
fake_users_db = {
    "test@buggy.com": {
        "id": 1,
        "email": "test@buggy.com",
        "name": "Test User",
        "hashed_password": pwd_context.hash("Password123!"),
        "created_at": datetime.now()
    }
}

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate):
    """Register a new user"""
    if user.email in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = hash_password(user.password)
    new_user = {
        "id": len(fake_users_db) + 1,
        "email": user.email,
        "name": user.name,
        "hashed_password": hashed_password,
        "created_at": datetime.now()
    }
    
    fake_users_db[user.email] = new_user
    
    return UserResponse(**{k: v for k, v in new_user.items() if k != "hashed_password"})

@router.post("/login", response_model=TokenResponse)
async def login(credentials: LoginRequest):
    """Login user and return access token"""
    user = fake_users_db.get(credentials.email)
    
    if not user or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    access_token = create_access_token({"sub": user["email"]})
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(**{k: v for k, v in user.items() if k != "hashed_password"})
    )

@router.post("/refresh-token")
async def refresh_token(token: str):
    """Refresh access token"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    new_token = create_access_token({"sub": email})
    return {"access_token": new_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str):
    """Get current user profile"""
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    user = fake_users_db.get(email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return UserResponse(**{k: v for k, v in user.items() if k != "hashed_password"})
