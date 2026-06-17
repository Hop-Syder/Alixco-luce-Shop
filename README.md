/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description README global du projet Alixco-luce Shop
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
──────────────────────────────────

# 🌟 Alixco-luce Shop — Monorepo

> **Boutique en ligne haut de gamme spécialisée dans la gravure et découpe laser sur-mesure.**
> Développé par Nexus Partners.

## 📌 Présentation

Ce dépôt contient l'ensemble du code source pour la plateforme E-Commerce **Alixco-luce Shop**.
Le projet est architecturé sous forme de monorepo contenant la boutique client (front-end) et le tableau de bord d'administration (back-office).

Récemment, l'architecture a évolué : l'ancien backend (FastAPI + MongoDB) a été entièrement remplacé. Désormais, les routes de l'API sont directement intégrées au projet Next.js (`frontend`) et les données sont stockées sur une base de données **PostgreSQL** gérée par **Supabase**.

## 📂 Structure du Projet

- [`frontend/`](./frontend) : L'application principale (boutique client) développée avec **Next.js 16 (App Router)**.
  - ⚙️ Contient également toutes les **Routes API** (`src/app/api/**`) qui servent de backend pour l'ensemble du projet.
  - 🗄️ Gère la connexion à la base de données PostgreSQL via **Prisma ORM**.
- [`frontend-admin/`](./frontend-admin) : Le tableau de bord d'administration développé avec **Next.js 15**.
  - 🔗 Se connecte aux API fournies par l'application `frontend`.

## 🛠️ Stack Technique Globale

- **Frameworks** : Next.js 15/16 (App Router), React 19
- **Styling** : Tailwind CSS v4, Framer Motion
- **Base de données** : PostgreSQL hébergé sur **Supabase**
- **ORM** : Prisma 7
- **Stockage** : Supabase Storage (bucket `alixco-luxe-uploads`)
- **Authentification** : JWT (`jose`) + bcrypt (`bcryptjs`)

## 💻 Démarrage Rapide (Local)

### 1. Prérequis
- Node.js 18+ ou 20+
- Un compte Supabase (ou accès aux variables de l'environnement)

### 2. Configuration
Il faut configurer les variables d'environnement dans les deux dossiers.
- **`frontend/.env.local`** : Configurer `DATABASE_URL`, `DIRECT_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `JWT_SECRET`, etc.
- **`frontend-admin/.env.local`** : Configurer `NEXT_PUBLIC_API_URL` pointant vers l'API locale du frontend, généralement `http://localhost:3000/api`.

### 3. Lancer l'API et la Boutique (Frontend)
Dans un premier terminal :
```bash
cd frontend
npm install
npm run dev
```
La boutique client et les API seront accessibles sur http://localhost:3000.

### 4. Lancer le Back-Office (Admin)
Dans un second terminal :
```bash
cd frontend-admin
npm install
npm run dev
```
Le panel d'administration sera accessible sur http://localhost:3001 (ou autre port configuré).

## 📄 Documentation détaillée
- [Documentation Frontend](./frontend/README.md)
- [Documentation Admin](./frontend-admin/README.md)
- [Guide de Déploiement](./DEPLOYMENT.md)

---
> Ce projet est conçu avec fierté par **Nexus Partners** 🌐 [nexuspartners.xyz](https://nexuspartners.xyz)
