from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

# Authentication Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    name: str = Field(..., min_length=2)

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
    created_at: datetime

    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Product Schemas
class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    price: float = Field(..., gt=0)
    category: str
    stock: int = Field(default=0, ge=0)

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    category: str
    stock: int
    created_at: datetime

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    stock: Optional[int] = None

# Bug Report Schemas
class BugCreate(BaseModel):
    title: str = Field(..., min_length=5)
    description: str = Field(..., min_length=20)
    severity: str = Field(..., pattern="^(Critical|High|Medium|Low)$")
    bug_type: str = Field(..., pattern="^(Functional|Security|Performance|Validation|UI/UX)$")
    reproduction_steps: list[str]
    expected_behavior: str
    actual_behavior: str
    environment: Optional[str] = None

class BugResponse(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    bug_type: str
    reproduction_steps: list[str]
    expected_behavior: str
    actual_behavior: str
    environment: Optional[str]
    status: str = "Open"
    created_at: datetime
    created_by: str

    class Config:
        from_attributes = True

# Search/Filter Schemas
class SearchQuery(BaseModel):
    q: str = Field(..., min_length=1)
    category: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    sort_by: Optional[str] = "relevance"
