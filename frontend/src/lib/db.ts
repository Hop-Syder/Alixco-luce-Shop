/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Database client instance configuration with Prisma and PG Adapter
 * @created 2026-06-16
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// PrismaPg gère lui-même un pool `pg.Pool` à partir de cette config — ne JAMAIS lui passer
// une instance `pg.Client` déjà connectée, ce qui désynchronise le protocole ("invalid frontend message type 0").
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  // Supabase exige TLS sur la connexion Postgres.
  ssl: { rejectUnauthorized: false },
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
