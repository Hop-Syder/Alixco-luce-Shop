from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "alixcoluxe"
    secret_key: str = "super_secret"
    whatsapp_number: str = "2290197412933"
    api_v1_str: str = "/api"
    access_token_expire_minutes: int = 60 * 24 * 7 # 7 days

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
