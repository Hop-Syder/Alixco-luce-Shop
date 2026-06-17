/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Crée un compte admin fonctionnel (login par téléphone) — remplace backend/create_admin.py,
 *              corrigé pour utiliser le champ `phone` requis par le schéma actuel.
 *              Usage : npx tsx scripts/create-admin.ts [phone] [password]
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { config as loadEnv } from 'dotenv';
loadEnv({ path: '.env.local' });
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const DEFAULT_PHONE = '+22900000000';
const DEFAULT_PASSWORD = 'Admin@2026!Dev';

async function main() {
  const phone = process.argv[2] || DEFAULT_PHONE;
  const password = process.argv[3] || DEFAULT_PASSWORD;

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL ou DIRECT_URL doit être défini dans .env.local.');
  }

  const adapter = new PrismaPg({ connectionString, ssl: { rejectUnauthorized: false } });
  const prisma = new PrismaClient({ adapter });

  try {
    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      console.log(`Un compte existe déjà pour ${phone} (role: ${existing.role}).`);
      return;
    }

    const hashed_password = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        phone,
        full_name: 'Administrateur',
        role: 'admin',
        hashed_password,
      },
    });

    console.log('✅ Compte admin créé avec succès !');
    console.log(`Téléphone : ${phone}`);
    console.log(`Mot de passe : ${password}`);
    console.log('⚠️  Changez ce mot de passe en production.');
  } finally {
    await prisma.$disconnect();
  }
}

main();
