import asyncio
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

async def seed_db():
    await connect_to_mongo()
    db = get_database()
    
    # Check if we already have products
    count = await db.products.count_documents({})
    if count > 0:
        print("Database already seeded with products")
        await close_mongo_connection()
        return

    products = [
        {
            "name": "Tableau personnalisé Luxe (Portrait)",
            "price": 25000,
            "image": "https://via.placeholder.com/400x500?text=Tableau+Luxe",
            "stock": 10,
            "category": "tableaux",
            "featured": True,
            "tags": ["premium", "portrait"]
        },
        {
            "name": "Collier Gravé Or",
            "price": 15000,
            "image": "https://via.placeholder.com/400x400?text=Collier+Or",
            "stock": 25,
            "category": "bijoux",
            "featured": True,
            "tags": ["bijoux", "or"]
        }
    ]
    
    result = await db.products.insert_many(products)
    print(f"Seeded {len(result.inserted_ids)} products into the database.")
    
    # Afficher les IDs pour le frontend POC
    for idx, p_id in enumerate(result.inserted_ids):
        print(f"Product {idx+1}: {products[idx]['name']} - ID: {str(p_id)}")

    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(seed_db())
