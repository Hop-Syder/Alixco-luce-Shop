import asyncio
from app.db.mongodb import connect_to_mongo, close_mongo_connection, get_database
from app.core.security import get_password_hash

async def create_admin():
    await connect_to_mongo()
    db = get_database()
    
    email = "admin@alixcoluxe.com"
    existing = await db.users.find_one({"email": email})
    
    if existing:
        print(f"Admin user {email} already exists.")
        await close_mongo_connection()
        return
        
    hashed_password = get_password_hash("Admin@2026!")
    
    admin_user = {
        "email": email,
        "first_name": "Admin",
        "last_name": "System",
        "hashed_password": hashed_password,
        "role": "admin"
    }
    
    await db.users.insert_one(admin_user)
    print(f"Admin user created successfully!")
    print(f"Email: {email}")
    print(f"Password: Admin@2026!")
    
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(create_admin())
