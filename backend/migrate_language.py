import asyncio
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database

async def migrate_data():
    await connect_to_mongo()
    db = get_database()
    
    # Products
    async for p in db.products.find({}):
        update_fields = {}
        if "name" in p:
            update_fields["name_fr"] = p["name"]
            update_fields["name_en"] = p["name"]
        
        if update_fields:
            await db.products.update_one({"_id": p["_id"]}, {"$set": update_fields, "$unset": {"name": ""}})

    # Featured products
    async for p in db.featured_products.find({}):
        update_fields = {}
        if "name" in p:
            update_fields["name_fr"] = p["name"]
            update_fields["name_en"] = p["name"]
        if "price" in p:
            update_fields["price_fr"] = p["price"]
            update_fields["price_en"] = p["price"]
        if "badge" in p:
            update_fields["badge_fr"] = p.get("badge", "")
            update_fields["badge_en"] = p.get("badge", "")

        if update_fields:
            await db.featured_products.update_one({"_id": p["_id"]}, {"$set": update_fields, "$unset": {"name": "", "price": "", "badge": ""}})

    print("Migration finished")
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(migrate_data())
