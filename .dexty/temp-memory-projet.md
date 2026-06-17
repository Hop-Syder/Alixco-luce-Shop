# DEXTY — Mémoire Projet
> Généré automatiquement — Ne pas éditer manuellement
> @author @hopsyder | Nexus Partners
> 🌐 ceo.nexuspartners.xyz
> 📧 daoudaabassichristian@gmail.com

## ✅ Statut : Migration backend terminée (2026-06-17)
Le backend FastAPI + MongoDB a été entièrement remplacé et décommissionné (dossier `backend/` supprimé,
`docker-compose.yml` nettoyé). L'API vit désormais dans `frontend/src/app/api/**`.

## 📌 Méta-projet
- **Nom** : Alixco-luce Shop
- **Type** : Boutique en ligne haut de gamme — gravure & découpe laser sur-mesure
- **Organisation** : Nexus Partners
- **Dernière mise à jour** : 2026-06-17

## 🛠️ Stack actuelle
- **Frontend boutique** : `frontend/` — Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion, Zustand, Axios.
- **Back-office** : `frontend-admin/` — app Next.js 15 séparée, code inchangé, appelle la même API via `NEXT_PUBLIC_API_URL`.
- **API** : routes Next.js dans `frontend/src/app/api/**`, mêmes chemins et mêmes formes de réponse JSON que l'ancien FastAPI (alias `_id`, enveloppe `{items,total,page,limit,total_pages}`), pour zéro changement de code côté frontends.
- **Base de données** : PostgreSQL géré par **Supabase**, accédé via Prisma 7 + `@prisma/adapter-pg`.
  ⚠️ Piège résolu : `PrismaPg` doit recevoir une **config** (`{connectionString, ssl}`) ou un `pg.Pool`, jamais une instance `pg.Client` connectée à la main (ancien bug qui cassait toutes les requêtes avec "invalid frontend message type 0").
  ⚠️ Prisma 7 : `url`/`directUrl` ne vont plus dans `schema.prisma` mais dans `prisma.config.ts` (`datasource.url`). La CLI (`migrate`/`generate`) utilise `DIRECT_URL` (port 5432, hors pooler) ; le runtime applicatif (`src/lib/db.ts`) utilise `DATABASE_URL` (pooler PgBouncer, port 6543).
- **Stockage images** : Supabase Storage (bucket `alixco-luxe-uploads`, public), pas Cloudinary — décision prise en cours de session car Cloudinary n'avait que des credentials placeholder jamais configurés.
- **Auth** : JWT (`jose`) + bcrypt (`bcryptjs`), login par téléphone, identique au comportement FastAPI.
- **Langage** : TypeScript strict.

## 🔑 Accès admin de dev
Compte admin de test existant : téléphone `+22900000000` / mot de passe `Admin@2026!Dev` — à changer en production.

## 📁 Modèle de données réel
`User`/`Address`, `Category` (catégories d'affichage homepage, pas de FK avec `Product.category` qui reste une string libre), `Product` (bilingue FR/EN, champs SEO), `FeaturedProduct`, `Order`/`OrderItem` (`whatsappMessage`, `orderNumber` au format `ALX-XXXX`), `Testimonial`, `Setting` (clé/valeur JSON générique : `home_page`, `whatsapp_number`).

## 🗂️ Scripts utiles (`frontend/`)
- `npm run create:admin` — crée un compte admin fonctionnel.
- `npm run migrate:mongo` — migration ponctuelle Mongo→Postgres (déjà exécutée une fois ; idempotente via `upsert`).
- `npx tsx scripts/create-storage-bucket.ts` — (re)crée le bucket Supabase Storage si besoin.

## ⚠️ Découverte importante (infra du repo)
Ce dépôt a un mécanisme de checkpoint automatique qui **commit ET push directement sur `main`** vers le vrai remote GitHub (`Hop-Syder/Alixco-luce-Shop`), sans action explicite de l'agent. Le remote `origin` contient un token GitHub en clair dans `.git/config` — à rotater/sécuriser. Être conscient que tout changement local atteint vite le repo réel, sans passer par une PR.

## ⚠️ Notes importantes
- Préservation absolue du design existant (couleurs, typographies, composants) — seule la couche backend/données a changé.
- Données MongoDB réelles au moment de la migration : très peu de volume (1 user incomplet, 4 catégories, tout le reste vide) — migrées avec succès via `migrate-mongo-to-postgres.ts`.
