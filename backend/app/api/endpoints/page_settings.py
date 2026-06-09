# ##################################################################
# @author @hopsyder
# @organization Nexus Partners
# @description API Endpoints for dynamic page settings management
# @created 2026-06-05
# @updated 2026-06-05
# 🌐 ceo.nexuspartners.xyz
# 📧 daoudaabassichristian@gmail.com
# ##################################################################

from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from bson import ObjectId

from app.api import deps
from app.models.schemas import HomePageSettings, HeroSettings, PromoSettings

router = APIRouter()

def serialize_settings(doc: dict) -> dict:
    """Helper: convertit _id MongoDB en str et retire les champs internes."""
    if doc and "_id" in doc:
        doc["_id"] = str(doc["_id"])
    return doc

# Valeurs de secours (fallback) par défaut pour la page d'accueil
DEFAULT_HOME_SETTINGS = {
    "page": "home",
    "hero": {
        "title_highlight": "Personnalisation",
        "title_main": "L'Art de la",
        "subtitle": "Gravure & Découpe au Laser",
        "description": "Créations uniques et gravures sur-mesure de haute précision pour sublimer vos objets du quotidien et vos cadeaux d'exception.",
        "cta_primary_text": "Découvrir la Collection",
        "cta_primary_link": "/products",
        "cta_secondary_text": "En savoir plus",
        "cta_secondary_link": "/about",
        "image_3d": "/header-droit.jpeg",
        "image_bg": "/hearder.jpg"
    },
    "promo": {
        "title": "Collection Éphémère",
        "subtitle": "-20% sur la Décoration",
        "description": "Découvrez des pièces gravées exclusives en édition très limitée. Offre valable jusqu'à épuisement des stocks.",
        "discount_tag": "Offre Limitée",
        "cta_text": "Profiter de l'offre",
        "cta_link": "/products?collection=limited",
        "image": "/background.jpg"
    }
}

@router.get("/home", response_model=HomePageSettings)
async def get_home_settings(
    db: AsyncIOMotorDatabase = Depends(deps.get_db)
):
    """
    Récupère la configuration éditoriale de la page d'accueil.
    Si aucune configuration n'existe en base de données, retourne la configuration par défaut.
    """
    settings = await db.page_settings.find_one({"page": "home"})
    if not settings:
        return DEFAULT_HOME_SETTINGS
    return serialize_settings(settings)

@router.put("/home", response_model=HomePageSettings)
async def update_home_settings(
    settings_in: HomePageSettings,
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_admin: dict = Depends(deps.get_current_active_admin)
):
    """
    Met à jour la configuration éditoriale de la page d'accueil (Admin uniquement).
    """
    # On exclut le champ 'page' qui vient du schema (optionnel) pour éviter la duplication
    updated_data = settings_in.model_dump(exclude={"page"})
    updated_data["page"] = "home"
    
    await db.page_settings.replace_one(
        {"page": "home"},
        updated_data,
        upsert=True
    )
    
    saved_settings = await db.page_settings.find_one({"page": "home"})
    return serialize_settings(saved_settings)
