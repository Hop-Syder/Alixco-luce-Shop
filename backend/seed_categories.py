import asyncio
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

async def seed_categories():
    await connect_to_mongo()
    db = get_database()
    
    categories = [
        { "title": "Gravure & Découpe Laser", "desc": "Personnalisation sur bois, verre, métal et cuir pour donner vie à vos idées", "img": "https://images.unsplash.com/photo-1611077544831-29e20a0279c6?auto=format&fit=crop&q=80&w=800", "order": 1 },
        { "title": "Créations d'Art", "desc": "Pièces uniques conçues sur-mesure pour sublimer votre décoration", "img": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800", "order": 2 },
        { "title": "Accessoires de Mode", "desc": "Customisation sur tissus et accessoires pour affirmer votre style unique", "img": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800", "order": 3 },
        { "title": "Cadeaux d'Entreprise", "desc": "Boîtes personnalisées et cadeaux d'affaires sur-mesure pour marquer les esprits", "img": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", "order": 4 }
    ]
    
    # clear existing categories
    await db.categories.delete_many({})
    
    result = await db.categories.insert_many(categories)
    print(f"Seeded {len(result.inserted_ids)} categories into the database.")
    
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_categories())
