# Alixco Luxe - Admin Dashboard

Interface d'administration pour la gestion complète de la boutique **Alixco Luxe**. Plateforme SaaS moderne permettant de gérer les produits, commandes, clients, catégories et configurations du site.

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du Projet](#-structure-du-projet)
- [Développement](#-développement)
- [Build & Optimisations](#-build--optimisations)
- [Déploiement](#-déploiement)
- [Conventions & Guidelines](#-conventions--guidelines)
- [Dépannage](#-dépannage)
- [Ressources](#-ressources)

## 🎯 Aperçu

**Admin Dashboard** est une application Next.js 15 moderne et performante qui fournit une interface complète pour :

- ✅ **Gestion des Produits** : CRUD, uploads d'images, organisation par catégories
- ✅ **Gestion des Commandes** : Suivi, statuts, détails clients
- ✅ **Gestion des Clients** : Profils, historique d'achats
- ✅ **Catégories** : Organisation et hiérarchie des produits
- ✅ **Produits Mis en Avant** : Configuration des produits vedettes
- ✅ **Témoignages** : Gestion des avis clients
- ✅ **Paramètres de Page** : Configuration SEO et contenu
- ✅ **Analytics** : Tableaux de bord et statistiques

**Stack Technique** :

- **Framework** : Next.js 15 avec App Router
- **UI Framework** : React 19 + Tailwind CSS v4
- **State Management** : Zustand + React Context
- **Forms** : React Hook Form + Zod (validation)
- **API Client** : Axios + SWR (data fetching)
- **Linting** : ESLint 9 + Next.js config
- **Language** : TypeScript 5 (strict mode)

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

| Outil | Version | Lien |
|-------|---------|------|
| **Node.js** | ≥ 18.17 | [nodejs.org](https://nodejs.org) |
| **npm** | ≥ 9.6 | Inclus avec Node.js |
| **Git** | Dernière | [git-scm.com](https://git-scm.com) |

**Vérifier les versions** :

```bash
node --version   # v18.17.0 ou supérieur
npm --version    # 9.6.0 ou supérieur
```

**Accès Backend** :

- L'API backend doit être accessible (par défaut `http://localhost:8000`)
- Assurez-vous que le backend est en cours d'exécution avant de commencer le dev

## 🔑 Accès par défaut (Test / Développement)

Pour accéder au tableau de bord, utilisez les identifiants administrateur suivants :

- **Numéro de téléphone** : `+22900000000`
- **Mot de passe** : `Admin@2026!Dev`

> **⚠️ Attention :** Pensez à modifier ces identifiants ou à supprimer ce compte temporaire une fois en production.

## 🚀 Installation

### 1. Cloner le Dépôt

```bash
git clone <repository-url>
cd Alixco-luce\ Shop/frontend-admin
```

### 2. Installer les Dépendances

```bash
npm install
```

Cela installe toutes les dépendances listées dans `package.json` :

- Next.js et React
- Dépendances UI (Tailwind CSS, Lucide)
- Dépendances formulaires et validation (React Hook Form, Zod)
- Outils de développement (TypeScript, ESLint)

### 3. Vérifier l'Installation

```bash
npm run dev
```

Accédez à [http://localhost:3000](http://localhost:3000) pour confirmer que l'application démarre correctement.

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# .env.local

# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=30000

# Application Environment
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_NAME=Alixco Luxe Admin
NEXT_PUBLIC_APP_VERSION=0.1.0

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_EXPORT=true

# Session Configuration
SESSION_SECRET=your-secret-key-here-change-in-production
SESSION_TIMEOUT=3600000
```

### Pour la Production

Créez un fichier `.env.production.local` :

```bash
# .env.production.local

NEXT_PUBLIC_API_URL=https://api.alixco-luxe.com
NEXT_PUBLIC_API_TIMEOUT=30000
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
SESSION_SECRET=your-production-secret-key
SESSION_TIMEOUT=3600000
```

### Variables Sensibles

⚠️ **IMPORTANT** :

- Ne committez JAMAIS de fichiers `.env.local` ou `.env.production.local`
- Ils sont déjà dans `.gitignore`
- En production, définissez les variables via votre plateforme de déploiement
- Changez `SESSION_SECRET` avec une clé sécurisée en production

## 📁 Structure du Projet

```
frontend-admin/
├── public/                    # Assets statiques (images, icônes)
├── src/
│   ├── app/                   # App Router (pages et layouts)
│   │   ├── page.tsx          # Dashboard principal
│   │   ├── layout.tsx        # Layout racine
│   │   ├── globals.css       # Styles globaux
│   │   ├── categories/       # Module catégories
│   │   ├── customers/        # Module clients
│   │   ├── featured-products/# Module produits vedettes
│   │   ├── home-settings/    # Configuration homepage
│   │   ├── login/            # Authentification
│   │   ├── orders/           # Gestion commandes
│   │   ├── products/         # Gestion produits
│   │   └── testimonials/     # Gestion témoignages
│   ├── components/           # Composants réutilisables
│   │   ├── admin/            # Composants spécifiques admin
│   │   └── ui/               # Composants UI génériques
│   ├── context/              # Context API (Auth, Theme)
│   │   └── AuthContext.tsx
│   ├── services/             # Services API
│   │   └── api.ts           # Axios instance et requêtes
│   └── types/                # Définitions TypeScript
│       └── index.ts
├── .eslintrc.json            # Configuration ESLint
├── .gitignore                # Fichiers à ignorer
├── eslint.config.mjs         # Config ESLint moderne
├── next.config.ts            # Configuration Next.js
├── package.json              # Dépendances et scripts
├── postcss.config.mjs        # Configuration PostCSS (Tailwind)
├── tsconfig.json             # Configuration TypeScript
└── README.md                 # Ce fichier
```

### Détails des Répertoires

| Répertoire | Description |
|-----------|-------------|
| `src/app/` | Fichiers basés sur les routes (pages, layouts, API routes) |
| `src/components/` | Composants réutilisables, organisés par domaine |
| `src/context/` | Context API pour état global (authentification, etc.) |
| `src/services/` | Logique métier, appels API, intégrations |
| `src/types/` | Définitions TypeScript globales et partagées |
| `public/` | Assets statiques servis directement |

## 👨‍💻 Développement

### Démarrer le Serveur de Développement

```bash
npm run dev
```

Accédez à [http://localhost:3000](http://localhost:3000)

**Caractéristiques** :

- **Hot Module Replacement (HMR)** : Changements en temps réel
- **Fast Refresh** : État préservé lors des changements
- **Turbopack** : Bundler ultra-rapide (4x plus rapide que Webpack)

### IDE & Extensions Recommandées

**VS Code** :

```json
{
  "extensions": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "unifiedjs.vscode-mdx"
  ]
}
```

**IntelliJ** :

- TypeScript & JavaScript
- ESLint
- Tailwind CSS

### Commandes de Développement Courantes

```bash
# Linter le code
npm run lint

# Linter et corriger automatiquement
npm run lint -- --fix

# Compiler TypeScript (vérification types)
npx tsc --noEmit

# Vérifier les dépendances obsolètes
npm outdated
```

### Conventions de Nommage

- **Composants** : PascalCase (ex: `ProductCard.tsx`)
- **Fichiers** : kebab-case pour les répertoires, fichiers en minuscules (ex: `src/components/product-card/`)
- **Variables/Fonctions** : camelCase (ex: `fetchProducts`)
- **Constantes** : UPPER_SNAKE_CASE (ex: `API_BASE_URL`)
- **Types/Interfaces** : PascalCase (ex: `IProduct`, `ProductDTO`)

## 🏗️ Build & Optimisations

### Build pour Production

```bash
npm run build
```

Cela :

1. Compile TypeScript
2. Exécute ESLint
3. Optimise les images et assets
4. Génère une build production optimisée

### Output du Build

```
.next/
├── static/        # Fichiers statiques cachés pour toujours
├── server/        # Code serveur compilé
├── cache/         # Fichiers de cache Next.js
└── package.json   # Dépendances du runtime
```

### Démarrer Production Localement

```bash
npm run build
npm start
```

Accédez à [http://localhost:3000](http://localhost:3000)

### Optimisations Appliquées

- **Image Optimization** : Compression et lazy loading automatiques
- **Code Splitting** : Bundle séparé par route
- **CSS Minification** : Tailwind CSS purgé des styles inutilisés
- **JavaScript Minification** : Compression automatique
- **Static Generation** : Pages pré-rendues quand possible
- **Turbopack** : Compilation ultra-rapide

## 🚢 Déploiement

### Option 1 : Vercel (Recommandé)

**Avantages** :

- Créateurs de Next.js
- Déploiement instantané depuis Git
- Prévisualisation automatique
- CDN global
- SSL automatique

**Étapes** :

1. **Créer un compte** : [vercel.com](https://vercel.com)
2. **Connecter le dépôt GitHub**
3. **Configurer les variables d'environnement** :
   - Accédez à Project Settings → Environment Variables
   - Ajoutez toutes les variables du `.env.production.local`
4. **Déployer** :

   ```bash
   # Depuis GitHub (automatique)
   # ou via CLI
   npm install -g vercel
   vercel --prod
   ```

### Option 2 : Docker & Compose

**Créer un Dockerfile** (racine du projet) :

```dockerfile
# Stage 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:18-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

ENV PORT=3000
CMD ["node", "server.js"]
```

**Ajouter au docker-compose.yml** :

```yaml
frontend-admin:
  build:
    context: ./frontend-admin
    dockerfile: Dockerfile
  container_name: alixco_admin_frontend
  ports:
    - "3001:3000"
  environment:
    NEXT_PUBLIC_API_URL: http://api:8000
    NEXT_PUBLIC_APP_ENV: production
    SESSION_SECRET: ${SESSION_SECRET}
  depends_on:
    - backend
  restart: always
  networks:
    - alixco_network
```

**Déployer** :

```bash
docker-compose up -d frontend-admin
```

### Option 3 : Railway

**Configuration** :

1. Connecter le dépôt GitHub
2. Ajouter les variables d'environnement
3. Railway détecte automatiquement Next.js
4. Déploiement automatique à chaque push

### Option 4 : Production Personnalisée (VPS/Serveur)

```bash
# Sur votre serveur
git clone <repo>
cd frontend-admin
npm install
npm run build

# Utiliser un process manager (PM2)
npm install -g pm2
pm2 start npm --name "admin-dashboard" -- start
pm2 save
pm2 startup
```

**Configurer Nginx** :

```nginx
server {
    listen 80;
    server_name admin.alixco-luxe.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Checklist de Déploiement

- [ ] Variables d'environnement définies
- [ ] Tests en mode production (`npm run build && npm start`)
- [ ] Vérifier la connexion API backend
- [ ] HTTPS activé
- [ ] Logs configurés
- [ ] Monitoring en place (Sentry, DataDog, etc.)
- [ ] Backups configurés
- [ ] CDN pour assets statiques (optionnel)
- [ ] Monitoring de performance (Core Web Vitals)

## 📐 Conventions & Guidelines

### Conventions de Code

#### Imports

```typescript
// ✅ Bon : Utiliser l'alias @/
import { useAuth } from '@/context/AuthContext';
import ProductCard from '@/components/admin/ProductCard';

// ❌ Mauvais : Imports relatifs profonds
import { useAuth } from '../../../context/AuthContext';
```

#### Composants Fonctionnels

```typescript
// ✅ Bon
import { FC, ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ title, children }) => {
  return <div className="card">{children}</div>;
};

export default Card;

// ❌ Mauvais : any types, pas de typage
const Card = ({ title, children }: any) => {
  return <div>{children}</div>;
};
```

#### État avec Zustand

```typescript
// store/productStore.ts
import create from 'zustand';

interface ProductState {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
}));

export default useProductStore;
```

#### Formulaires avec React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  price: z.number().positive('Le prix doit être positif'),
});

type FormData = z.infer<typeof schema>;

export default function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
}
```

### Styles & Tailwind CSS

```typescript
// ✅ Bon : Classes Tailwind organisées
className="flex items-center justify-between gap-4 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"

// ❌ Mauvais : Inline styles, pas de Tailwind
style={{ display: 'flex', padding: '8px' }}
```

### Gestion des Erreurs

```typescript
// ✅ Bon
try {
  const data = await api.products.fetch();
} catch (error) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message ?? 'Erreur serveur');
  } else {
    toast.error('Erreur inattendue');
  }
}

// ❌ Mauvais : Silencer les erreurs
try {
  const data = await api.products.fetch();
} catch (error) {
  // Ignorer l'erreur
}
```

## 🔧 Dépannage

### Problèmes Courants

#### 1. Erreur : "Cannot find module"

```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 2. Port 3000 déjà utilisé

```bash
# Linux/Mac
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Ou utiliser un port différent
npm run dev -- -p 3001
```

#### 3. Erreur de validation TypeScript

```bash
# Vérifier les erreurs de type
npx tsc --noEmit

# Voir les erreurs ESLint
npm run lint
```

#### 4. API backend non accessible

```bash
# Vérifier que le backend est en cours d'exécution
curl http://localhost:8000/health

# Vérifier NEXT_PUBLIC_API_URL dans .env.local
cat .env.local | grep NEXT_PUBLIC_API_URL
```

#### 5. Build échoue en production

```bash
# Tester la build localement
npm run build

# Vérifier les erreurs
npm run lint

# Nettoyer les fichiers de cache
rm -rf .next
npm run build
```

### Utile : Commandes de Débogage

```bash
# Afficher les variables d'environnement chargées
npm run dev -- --verbose

# Vérifier les dépendances
npm ls

# Analyser la taille du bundle
npx next-bundle-analyzer

# Vérifier les fichiers générés
ls -la .next/static/
```

### Logs et Monitoring

```typescript
// Ajouter du logging
const API_DEBUG = process.env.NODE_ENV === 'development';

if (API_DEBUG) {
  console.log('[API]', method, url, { data });
}
```

## 📚 Ressources

### Documentation Officielle

- **Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **React** : [react.dev](https://react.dev)
- **TypeScript** : [typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Tailwind CSS** : [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **React Hook Form** : [react-hook-form.com](https://react-hook-form.com)

### Packages Utilisés

- **[axios](https://axios-http.com)** : Client HTTP
- **[swr](https://swr.vercel.app)** : Data fetching avec cache
- **[zustand](https://github.com/pmndrs/zustand)** : State management
- **[zod](https://zod.dev)** : Validation TypeScript-first
- **[react-hot-toast](https://react-hot-toast.com)** : Notifications
- **[recharts](https://recharts.org)** : Graphiques React
- **[lucide-react](https://lucide.dev)** : Icônes SVG
- **[react-dropzone](https://react-dropzone.js.org)** : Upload de fichiers

### Commandes Rapides

```bash
# Développement
npm run dev              # Démarrer dev server
npm run build           # Compiler pour production
npm start              # Démarrer production
npm run lint           # Linter le code
npm run lint -- --fix  # Linter et corriger

# Maintenance
npm outdated           # Vérifier les mises à jour
npm update             # Mettre à jour les dépendances
npm audit              # Vérifier les failles de sécurité
npm audit fix          # Corriger les failles
```

## 📝 Notes Importantes

- **Security** : Ne committez jamais les fichiers `.env.local`
- **Performance** : Utilisez `next/image` pour les images
- **SEO** : Utilisez `next/head` ou `metadata` pour les metas
- **Accessibility** : Respectez les standards WCAG 2.1
- **Mobile** : Testez sur mobile et tablette

## 📧 Support & Contribution

Pour des questions ou problèmes :

1. Consultez la [documentation Next.js](https://nextjs.org/docs)
2. Vérifiez les issues GitHub existantes
3. Créez une nouvelle issue avec détails et logs

---

**Version** : 0.1.0  
**Dernière mise à jour** : 2026-06-09  
**Mainteneur** : Alixco Luxe Team
