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

# CORS config
origins = [
    "http://localhost:5173", # Vite default port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API Alixco Luxe"}
