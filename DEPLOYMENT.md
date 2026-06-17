/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Guide de déploiement pour la plateforme Alixco-luce Shop
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
──────────────────────────────────

# 🚀 Guide de Déploiement — Alixco-luce Shop

Ce document décrit la procédure recommandée pour déployer l'application **Alixco-luce Shop** en production.
La nouvelle architecture repose sur **Next.js** (Frontend + API) et **Supabase** (PostgreSQL + Storage).

## 🏗️ Architecture de Production

- **Base de données & Stockage** : Supabase (PostgreSQL, PgBouncer, Supabase Storage).
- **Application Web & API (frontend)** : Recommandée pour déploiement sur **Vercel** (optimisé pour Next.js App Router).
- **Back-Office (frontend-admin)** : Recommandée pour déploiement sur **Vercel**.

---

## 1️⃣ Étape 1 : Configuration de Supabase (Base de données & Stockage)

### 1. Base de données PostgreSQL
1. Créez un projet sur [Supabase](https://supabase.com).
2. Récupérez les URL de connexion dans les paramètres de la base de données :
   - `DATABASE_URL` (URL avec le pooler, généralement sur le port `6543`).
   - `DIRECT_URL` (URL de connexion directe, port `5432`).

### 2. Migrations Prisma
Depuis le dossier `frontend` en local, appliquez les migrations vers votre base Supabase de production :
```bash
cd frontend
export DIRECT_URL="postgresql://postgres.[ID]:[PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
npx prisma migrate deploy
```

### 3. Supabase Storage
L'application requiert un bucket public nommé `alixco-luxe-uploads`.
- Dans le Dashboard Supabase, allez dans **Storage**.
- Créez un nouveau bucket nommé `alixco-luxe-uploads` et assurez-vous qu'il soit configuré comme **Public**.
- Alternative : utilisez le script d'initialisation fourni dans le projet :
  ```bash
  cd frontend
  npx tsx scripts/create-storage-bucket.ts
  ```
  *(Nécessite les variables d'environnement `NEXT_PUBLIC_SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`)*.

---

## 2️⃣ Étape 2 : Déploiement du Frontend (Boutique + API)

> **Recommandation : Vercel** (Optimal pour les API routes et Server Actions Next.js)

### Déploiement via Vercel
1. Liez votre dépôt GitHub à [Vercel](https://vercel.com).
2. Créez un nouveau projet en sélectionnant le sous-dossier `frontend` comme **Root Directory**.
3. **Variables d'environnement** à configurer :
   - `DATABASE_URL` : L'URL de connexion Prisma (via PgBouncer).
   - `DIRECT_URL` : L'URL de connexion directe pour Prisma.
   - `NEXT_PUBLIC_SUPABASE_URL` : URL de l'API de votre projet Supabase.
   - `SUPABASE_SERVICE_ROLE_KEY` : Clé secrète de rôle de service Supabase.
   - `JWT_SECRET` : Clé secrète forte pour la signature et validation des tokens JWT.
4. Lancez le déploiement. Vercel exécutera automatiquement `npm run build` et mettra le site en ligne.

---

## 3️⃣ Étape 3 : Déploiement du Back-Office (Admin)

### Déploiement via Vercel
1. Dans Vercel, créez un nouveau projet en sélectionnant le même dépôt GitHub.
2. Cette fois, définissez le sous-dossier `frontend-admin` comme **Root Directory**.
3. **Variables d'environnement** à configurer :
   - `NEXT_PUBLIC_API_URL` : L'URL de production du Frontend où l'API est exposée (ex: `https://alixco-shop.vercel.app/api`).
   - `NEXT_PUBLIC_APP_ENV` : `production`
   - `SESSION_SECRET` : Clé secrète forte pour la gestion des sessions admin.
4. Lancez le déploiement.

---

## 4️⃣ Étape 4 : Post-Déploiement

1. **Création du compte Admin de production**
   Depuis le répertoire `frontend` en local (en pointant vos variables d'environnement vers la DB de production) ou via une requête API sécurisée, exécutez le script d'initialisation du compte administrateur :
   ```bash
   DATABASE_URL="votre_url_de_production" npm run create:admin
   ```
2. **Tester les flux fonctionnels**
   - Testez l'upload d'image depuis l'admin pour vérifier que le bucket Supabase `alixco-luxe-uploads` accepte bien les requêtes.
   - Vérifiez que les catégories s'affichent correctement côté client.
   - Simulez une commande pour valider la génération des numéros de commande au format `ALX-XXXX` et la sauvegarde en base.

---

## 🔒 Considérations de Sécurité

- Gardez les variables `SUPABASE_SERVICE_ROLE_KEY` et `JWT_SECRET` strictement confidentielles. Ne les exposez jamais côté client (ne leur donnez pas le préfixe `NEXT_PUBLIC_`).
- La base de données PostgreSQL de Supabase est sécurisée par défaut, mais assurez-vous que les RLS (Row Level Security) soient cohérentes si elles sont utilisées (bien que Prisma bypass habituellement RLS si utilisé côté serveur).
- Assurez-vous que les politiques CORS du Frontend (`frontend/src/app/api/**`) autorisent spécifiquement le domaine de votre application `frontend-admin` de production.
