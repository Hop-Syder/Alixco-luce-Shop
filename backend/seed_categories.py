import asyncio
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

async def seed_categories():
    await connect_to_mongo()
    db = get_database()
    
    categories = [
        { "title_fr": "Gravure & Découpe Laser", "title_en": "Laser Engraving & Cutting", "desc_fr": "Personnalisation sur bois, verre, métal et cuir pour donner vie à vos idées", "desc_en": "Personalization on wood, glass, metal and leather to bring your ideas to life", "img": "https://images.unsplash.com/photo-1611077544831-29e20a0279c6?auto=format&fit=crop&q=80&w=800", "order": 1 },
        { "title_fr": "Créations d'Art", "title_en": "Art Creations", "desc_fr": "Pièces uniques conçues sur-mesure pour sublimer votre décoration", "desc_en": "Unique custom-made pieces to enhance your interior decoration", "img": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800", "order": 2 },
        { "title_fr": "Accessoires de Mode", "title_en": "Fashion Accessories", "desc_fr": "Customisation sur tissus et accessoires pour affirmer votre style unique", "desc_en": "Customization on fabrics and accessories to assert your unique style", "img": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800", "order": 3 },
        { "title_fr": "Cadeaux d'Entreprise", "title_en": "Corporate Gifts", "desc_fr": "Boîtes personnalisées et cadeaux d'affaires sur-mesure pour marquer les esprits", "desc_en": "Personalized boxes and custom business gifts to make a lasting impression", "img": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", "order": 4 }
    ]
    
    # clear existing categories
    await db.categories.delete_many({})
    
    result = await db.categories.insert_many(categories)
    print(f"Seeded {len(result.inserted_ids)} categories into the database.")
    
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_categories())
