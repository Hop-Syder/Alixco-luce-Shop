/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Script ponctuel de migration des données réelles MongoDB (backend FastAPI) vers PostgreSQL (Prisma/Supabase).
 *              À exécuter une seule fois, manuellement, avant de décommissionner le backend FastAPI.
 *              Usage : npx tsx scripts/migrate-mongo-to-postgres.ts
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
import { MongoClient, Document } from 'mongodb';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'alixcoluxe';
const POSTGRES_URL = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!POSTGRES_URL) {
  throw new Error('DATABASE_URL ou DIRECT_URL doit être défini dans .env.local avant de lancer la migration.');
}

async function main() {
  const mongo = new MongoClient(MONGODB_URI);
  await mongo.connect();
  const db = mongo.db(MONGODB_DB_NAME);

  const adapter = new PrismaPg({ connectionString: POSTGRES_URL, ssl: { rejectUnauthorized: false } });
  const prisma = new PrismaClient({ adapter });

  const counts: Record<string, number> = {};

  try {
    counts.users = await migrateUsers(db, prisma);
    counts.categories = await migrateCategories(db, prisma);
    counts.products = await migrateProducts(db, prisma);
    counts.featuredProducts = await migrateFeaturedProducts(db, prisma);
    counts.testimonials = await migrateTestimonials(db, prisma);
    counts.pageSettings = await migratePageSettings(db, prisma);
    counts.orders = await migrateOrders(db, prisma);

    console.log('\n✅ Migration terminée avec succès. Résumé :');
    for (const [collection, count] of Object.entries(counts)) {
      console.log(`  - ${collection}: ${count}`);
    }
  } catch (error) {
    console.error('\n❌ Migration interrompue suite à une erreur :', error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
    await mongo.close();
  }
}

async function migrateUsers(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const docs = await db.collection('users').find().toArray();
  let count = 0;
  for (const doc of docs) {
    const id = String(doc._id);
    const phone = doc.phone || `unknown-${id}`;
    const fullName = doc.full_name || [doc.first_name, doc.last_name].filter(Boolean).join(' ') || 'Inconnu';

    await prisma.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        email: doc.email ?? null,
        phone,
        full_name: fullName,
        role: doc.role || 'customer',
        hashed_password: doc.hashed_password ?? null,
        created_at: doc.created_at ? new Date(doc.created_at) : new Date(),
        updated_at: doc.updated_at ? new Date(doc.updated_at) : new Date(),
        addresses: {
          create: (doc.addresses || []).map((a: Document) => ({
            street: a.street,
            city: a.city,
            country: a.country || 'Bénin',
            details: a.details ?? null,
          })),
        },
      },
    });
    count++;
  }
  return count;
}

async function migrateCategories(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const docs = await db.collection('categories').find().toArray();
  let count = 0;
  for (const doc of docs) {
    await prisma.category.upsert({
      where: { id: String(doc._id) },
      update: {},
      create: {
        id: String(doc._id),
        title_fr: doc.title_fr,
        title_en: doc.title_en,
        desc_fr: doc.desc_fr,
        desc_en: doc.desc_en,
        img: doc.img,
        order: doc.order ?? 0,
        seo_title_fr: doc.seo_title_fr ?? null,
        seo_title_en: doc.seo_title_en ?? null,
        seo_desc_fr: doc.seo_desc_fr ?? null,
        seo_desc_en: doc.seo_desc_en ?? null,
        seo_keywords_fr: doc.seo_keywords_fr ?? null,
        seo_keywords_en: doc.seo_keywords_en ?? null,
      },
    });
    count++;
  }
  return count;
}

async function migrateProducts(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const docs = await db.collection('products').find().toArray();
  let count = 0;
  for (const doc of docs) {
    await prisma.product.upsert({
      where: { id: String(doc._id) },
      update: {},
      create: {
        id: String(doc._id),
        name_fr: doc.name_fr ?? doc.name ?? 'Produit sans nom',
        name_en: doc.name_en ?? doc.name ?? 'Unnamed product',
        price: doc.price,
        image: doc.image,
        stock: doc.stock ?? 0,
        category: doc.category ?? 'divers',
        seo_title_fr: doc.seo_title_fr ?? null,
        seo_title_en: doc.seo_title_en ?? null,
        seo_desc_fr: doc.seo_desc_fr ?? null,
        seo_desc_en: doc.seo_desc_en ?? null,
        seo_keywords_fr: doc.seo_keywords_fr ?? null,
        seo_keywords_en: doc.seo_keywords_en ?? null,
        createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
      },
    });
    count++;
  }
  return count;
}

async function migrateFeaturedProducts(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const docs = await db.collection('featured_products').find().toArray();
  let count = 0;
  for (const doc of docs) {
    await prisma.featuredProduct.upsert({
      where: { id: String(doc._id) },
      update: {},
      create: {
        id: String(doc._id),
        name_fr: doc.name_fr ?? doc.name ?? 'Produit sans nom',
        name_en: doc.name_en ?? doc.name ?? 'Unnamed product',
        price_fr: String(doc.price_fr ?? doc.price ?? ''),
        price_en: String(doc.price_en ?? doc.price ?? ''),
        badge_fr: doc.badge_fr ?? doc.badge ?? null,
        badge_en: doc.badge_en ?? doc.badge ?? null,
        img: doc.img,
        order: doc.order ?? 0,
      },
    });
    count++;
  }
  return count;
}

async function migrateTestimonials(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const docs = await db.collection('testimonials').find().toArray();
  let count = 0;
  for (const doc of docs) {
    await prisma.testimonial.upsert({
      where: { id: String(doc._id) },
      update: {},
      create: {
        id: String(doc._id),
        name: doc.name,
        role_fr: doc.role_fr,
        role_en: doc.role_en,
        text_fr: doc.text_fr,
        text_en: doc.text_en,
        rating: doc.rating ?? 5,
        is_featured: doc.is_featured ?? false,
        is_approved: doc.is_approved ?? false,
      },
    });
    count++;
  }
  return count;
}

async function migratePageSettings(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const doc = await db.collection('page_settings').findOne({ page: 'home' });
  if (!doc) return 0;

  await prisma.setting.upsert({
    where: { key: 'home_page' },
    update: { value: { hero: doc.hero, promo: doc.promo } },
    create: { key: 'home_page', value: { hero: doc.hero, promo: doc.promo } },
  });
  return 1;
}

async function migrateOrders(db: ReturnType<MongoClient['db']>, prisma: PrismaClient): Promise<number> {
  const docs = await db.collection('orders').find().toArray();
  let count = 0;
  for (const doc of docs) {
    const customer = doc.customer || {};
    await prisma.order.upsert({
      where: { id: String(doc._id) },
      update: {},
      create: {
        id: String(doc._id),
        orderNumber: doc.orderNumber,
        userId: doc.userId ? String(doc.userId) : null,
        customerName: customer.name ?? '',
        customerEmail: customer.email ?? '',
        customerPhone: customer.phone ?? '',
        customerAddress: customer.address ?? '',
        total: doc.total ?? 0,
        status: doc.status ?? 'pending',
        whatsappMessage: doc.whatsappMessage ?? '',
        createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
        updatedAt: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
        items: {
          create: (doc.items || []).map((item: Document) => ({
            productId: String(item.productId),
            quantity: item.quantity,
            notes: item.notes ?? '',
          })),
        },
      },
    });
    count++;
  }
  return count;
}

main();
