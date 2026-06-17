/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Seed de produits de démonstration pour remplir le catalogue (modifiable/supprimable ensuite depuis le dashboard admin).
 *              Rattache chaque produit à une vraie Category existante (Product.category = Category.id).
 *              Usage : npx tsx scripts/seed-mock-products.ts
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

type MockProduct = {
  name_fr: string;
  name_en: string;
  price: number;
  stock: number;
  image: string;
  categoryTitleFr: string;
};

const MOCK_PRODUCTS: MockProduct[] = [
  // Gravure & Découpe Laser
  { name_fr: 'Plaque murale gravée sur bois', name_en: 'Engraved wooden wall plaque', price: 18000, stock: 12, image: '/gravure.jpg', categoryTitleFr: 'Gravure & Découpe Laser' },
  { name_fr: 'Porte-clés personnalisé en acrylique', name_en: 'Custom acrylic keychain', price: 6000, stock: 30, image: '/gravure.jpg', categoryTitleFr: 'Gravure & Découpe Laser' },
  { name_fr: 'Set de dessous de verre gravés', name_en: 'Engraved coaster set', price: 12000, stock: 18, image: '/gravure.jpg', categoryTitleFr: 'Gravure & Découpe Laser' },
  // Créations d'Art
  { name_fr: 'Tableau abstrait découpé au laser', name_en: 'Laser-cut abstract wall art', price: 35000, stock: 6, image: '/creation_art.jpg', categoryTitleFr: "Créations d'Art" },
  { name_fr: 'Sculpture murale géométrique', name_en: 'Geometric wall sculpture', price: 42000, stock: 4, image: '/creation_art.jpg', categoryTitleFr: "Créations d'Art" },
  { name_fr: 'Portrait gravé sur bois massif', name_en: 'Engraved solid wood portrait', price: 28000, stock: 8, image: '/creation_art.jpg', categoryTitleFr: "Créations d'Art" },
  // Accessoires de Mode
  { name_fr: 'Boîte à bijoux gravée', name_en: 'Engraved jewelry box', price: 22000, stock: 10, image: '/accessoires_de_mode.jpg', categoryTitleFr: 'Accessoires de Mode' },
  { name_fr: 'Bracelet en bois gravé', name_en: 'Engraved wooden bracelet', price: 9000, stock: 20, image: '/accessoires_de_mode.jpg', categoryTitleFr: 'Accessoires de Mode' },
  { name_fr: 'Pochette en cuir personnalisée', name_en: 'Custom engraved leather pouch', price: 15500, stock: 14, image: '/accessoires_de_mode.jpg', categoryTitleFr: 'Accessoires de Mode' },
  // Cadeaux d'Entreprise
  { name_fr: "Coffret cadeau d'entreprise gravé", name_en: 'Engraved corporate gift box', price: 32000, stock: 9, image: '/cadeaux_dentreprise.jpg', categoryTitleFr: "Cadeaux d'Entreprise" },
  { name_fr: 'Trophée en acrylique personnalisé', name_en: 'Custom acrylic trophy', price: 27000, stock: 7, image: '/cadeaux_dentreprise.jpg', categoryTitleFr: "Cadeaux d'Entreprise" },
  { name_fr: 'Stylo et carnet gravés', name_en: 'Engraved pen and notebook set', price: 14000, stock: 16, image: '/cadeaux_dentreprise.jpg', categoryTitleFr: "Cadeaux d'Entreprise" },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL doit être défini dans .env.local.');
  }

  const adapter = new PrismaPg({ connectionString, ssl: { rejectUnauthorized: false } });
  const prisma = new PrismaClient({ adapter });

  try {
    const categories = await prisma.category.findMany();
    const categoryByTitle = new Map(categories.map((c) => [c.title_fr, c.id]));

    let created = 0;
    let skipped = 0;

    for (const mock of MOCK_PRODUCTS) {
      const categoryId = categoryByTitle.get(mock.categoryTitleFr);
      if (!categoryId) {
        console.warn(`⚠️  Catégorie "${mock.categoryTitleFr}" introuvable, produit ignoré : ${mock.name_fr}`);
        continue;
      }

      const existing = await prisma.product.findFirst({ where: { name_fr: mock.name_fr } });
      if (existing) {
        skipped++;
        continue;
      }

      await prisma.product.create({
        data: {
          name_fr: mock.name_fr,
          name_en: mock.name_en,
          price: mock.price,
          image: mock.image,
          stock: mock.stock,
          category: categoryId,
        },
      });
      created++;
    }

    console.log(`✅ ${created} produit(s) créé(s), ${skipped} déjà existant(s) ignoré(s).`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error('❌', err);
  process.exitCode = 1;
});
