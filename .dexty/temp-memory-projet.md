# DEXTY — Mémoire Projet
> Généré automatiquement — Ne pas éditer manuellement
> @author @hopsyder | Nexus Partners
> 🌐 ceo.nexuspartners.xyz
> 📧 daoudaabassichristian@gmail.com

## ⚠️ Correction
Une session précédente avait initialisé ce fichier et le schéma Prisma pour le mauvais projet ("Iroko Mobilier", e-commerce de meubles). Ce dépôt est en réalité **Alixco-luce Shop**. Contenu corrigé le 2026-06-17.

## 📌 Méta-projet
- **Nom** : Alixco-luce Shop
- **Type** : Boutique en ligne haut de gamme — gravure & découpe laser sur-mesure
- **Organisation** : Nexus Partners
- **Initialisé le** : 2026-06-17 (correction)
- **Dernière mise à jour** : 2026-06-17

## 🛠️ Stack — État actuel → Cible
- **Avant** : `backend/` FastAPI + MongoDB (Motor), JWT (python-jose) + bcrypt, Cloudinary. Deux apps Next.js consommatrices : `frontend/` (boutique, Next 16/React 19) et `frontend-admin/` (back-office, Next 15/React 19), toutes deux en Axios sur des chemins plats (`/products`, `/categories`, `/orders`, etc.).
- **Cible (migration en cours)** : Backend remplacé par des API routes Next.js dans `frontend/app/api/**` (mêmes chemins, mêmes formes de réponse JSON — y compris `_id`), Prisma 7 + PostgreSQL (Supabase) via `@prisma/adapter-pg`. `frontend-admin/` reste une app séparée, inchangée côté code, qui pointe juste `NEXT_PUBLIC_API_URL` vers la nouvelle API. Cloudinary conservé pour les images.
- **Langage** : TypeScript strict, Tailwind CSS 4, Framer Motion, Lucide React.

## 🎯 Skills actifs pour ce projet
- `nextjs-best-practices`, `prisma-expert`, `supabase`, `supabase-postgres-best-practices` (déjà dans `frontend/skills-lock.json`), `tailwind-design-system`, `clean-code`, `api-design-principles`.

## 📁 Contexte projet
- **Description courte** : Boutique Alixco-luce, spécialisée dans la personnalisation par gravure/découpe laser (bois, verre, métal, cuir), bilingue FR/EN, SEO soigné. Commande via formulaire → génération automatique d'un message WhatsApp formaté → redirection `wa.me`.
- **Modèle métier réel** (porté depuis `backend/app/models/schemas.py` et `user.py`) : `User`/`Address`, `Category` (catégories d'affichage homepage), `Product` (bilingue, SEO, `category` en string libre — pas de FK), `FeaturedProduct`, `Order`/`OrderItem` (avec `whatsappMessage`, `orderNumber` au format `ALX-XXXX`), `Testimonial`, `Setting` (clé/valeur générique pour `page_settings` home et `whatsapp_number`).
- **Plan de migration détaillé** : voir le plan approuvé de la session du 2026-06-17 (architecture, mapping des routes, script de migration des données réelles MongoDB → Postgres, décommission du backend FastAPI).
- **Conventions spéciales** : Signature standard NEXUS dans les nouveaux fichiers de code.

## ⚠️ Notes importantes
- Le schéma `frontend/prisma/schema.prisma` et `frontend/.env.local` contenaient encore des valeurs Iroko Mobilier (`iroko_db`, `NEXT_PUBLIC_APP_NAME="Iroko Mobilier"`) — à corriger en même temps que cette mémoire.
- Préservation absolue du design existant (couleurs, typographies, composants) — seule la couche backend/données change.
- Il existe des données réelles dans MongoDB à migrer (pas un simple reseed) avant de décommissionner FastAPI.
