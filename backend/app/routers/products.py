from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from app.schemas import ProductCreate, ProductResponse, ProductUpdate, SearchQuery

router = APIRouter()

# Mock products database
fake_products_db = [
    {
        "id": 1,
        "name": "Laptop",
        "description": "High-performance laptop",
        "price": 999.99,
        "category": "Electronics",
        "stock": 5,
        "created_at": "2024-01-01"
    },
    {
        "id": 2,
        "name": "Mouse",
        "description": "Wireless mouse",
        "price": 29.99,
        "category": "Electronics",
        "stock": 50,
        "created_at": "2024-01-01"
    },
    {
        "id": 3,
        "name": "USB Cable",
        "description": "Type-C cable",
        "price": 9.99,
        "category": "Accessories",
        "stock": 100,
        "created_at": "2024-01-01"
    }
]

@router.get("", response_model=list[ProductResponse])
async def get_products(skip: int = 0, limit: int = 10):
    """Get all products with pagination"""
    return fake_products_db[skip:skip + limit]

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int):
    """Get specific product by ID"""
    product = next((p for p in fake_products_db if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("", response_model=ProductResponse)
async def create_product(product: ProductCreate):
    """Create new product"""
    new_product = {
        "id": len(fake_products_db) + 1,
        **product.dict(),
        "created_at": "2024-01-01"
    }
    fake_products_db.append(new_product)
    return new_product

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product: ProductUpdate):
    """Update product"""
    db_product = next((p for p in fake_products_db if p["id"] == product_id), None)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    return db_product

@router.delete("/{product_id}")
async def delete_product(product_id: int):
    """Delete product"""
    global fake_products_db
    fake_products_db = [p for p in fake_products_db if p["id"] != product_id]
    return {"message": "Product deleted"}

@router.get("/search", response_model=list[ProductResponse])
async def search_products(
    q: str = Query(..., min_length=1),
    category: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None
):
    """Search products with filters"""
    results = fake_products_db
    
    # Filter by query
    results = [p for p in results if q.lower() in p["name"].lower() or q.lower() in p["description"].lower()]
    
    # Filter by category
    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]
    
    # Filter by price range
    if min_price:
        results = [p for p in results if p["price"] >= min_price]
    if max_price:
        results = [p for p in results if p["price"] <= max_price]
    
    return results

@router.get("/category/{category}", response_model=list[ProductResponse])
async def get_by_category(category: str):
    """Get products by category"""
    return [p for p in fake_products_db if p["category"].lower() == category.lower()]
