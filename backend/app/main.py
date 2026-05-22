from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.api import api_router
from app.db.mongodb import connect_to_mongo, close_mongo_connection

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(
    title="Alixco Luxe API",
    description="API pour la plateforme e-commerce Alixco Luxe",
    version="1.0.0",
    lifespan=lifespan
)

import os

# CORS config
# On autorise les origines via une variable d'environnement ou on permet un fallback générique pour la prod et le local
env_origins = os.getenv("ALLOW_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,https://alixcoluxe.com")
origins = [origin.strip() for origin in env_origins.split(",") if origin.strip()]

# Si on veut temporairement tout autoriser en attendant le vrai domaine de production
if os.getenv("ALLOW_ALL_ORIGINS", "true").lower() == "true":
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True if origins != ["*"] else False, # allow_credentials=True is not compatible with allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API Alixco Luxe"}
