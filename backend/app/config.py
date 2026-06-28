from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    SECRET_KEY: str = 'replace-with-a-local-secret'
    SQLALCHEMY_DATABASE_URI: str = 'sqlite:///./survey_app.db'
    BACKEND_PORT: int = 6030
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = '.env'
        case_sensitive = True


settings = Settings()
