/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Prisma 7 configuration. `datasource.url` n'est utilisé que par la CLI (migrate/generate/studio) :
 *              on lui passe DIRECT_URL (connexion directe, hors pooler) car les migrations nécessitent
 *              des fonctionnalités de session non supportées par le pooler transaction-mode de Supabase.
 *              Le runtime applicatif (src/lib/db.ts) utilise lui DATABASE_URL (pooler) via @prisma/adapter-pg.
 * @created 2026-06-16
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { config as loadEnv } from "dotenv";
import { defineConfig } from "@prisma/config";

// La CLI Prisma ne charge `.env` par défaut, pas `.env.local` (convention Next.js) — on le charge explicitement.
loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DIRECT_URL,
  },
});
