from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.config import settings
from app.routers import auth, products, bugs

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="QA Assignment - E-Commerce Testing API",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(products.router, prefix="/api/v1/products", tags=["products"])
app.include_router(bugs.router, prefix="/api/v1/bugs", tags=["bugs"])

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "QA Assignment API",
        "version": settings.API_VERSION,
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "QA-Assignment-API",
        "environment": "development" if settings.DEBUG else "production"
    }

@app.get("/api/v1/metrics")
async def get_metrics():
    """API metrics endpoint"""
    return {
        "requests_total": 1000,
        "requests_successful": 950,
        "requests_failed": 50,
        "avg_response_time_ms": 125
    }

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    logger.error(f"HTTP Exception: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=settings.DEBUG)
