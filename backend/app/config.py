from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./test.db"
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    API_TITLE: str = "QA Assignment API"
    API_VERSION: str = "1.0.0"
    DEBUG: bool = True

    class Config:
        env_file = ".env"

settings = Settings()
