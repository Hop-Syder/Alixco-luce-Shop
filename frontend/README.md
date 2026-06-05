# 🌟 Alixco-luce Shop — Boutique E-Commerce Premium

> **Boutique en ligne haut de gamme d'Alixco-luce Shop, spécialisée dans la gravure et découpe laser sur-mesure.**
> Développé par Nexus Partners.

---

## 📌 Présentation

Ce dépôt contient l'application **Frontend** d'Alixco-luce Shop. Conçue sous une direction artistique moderne de type *Dark Luxe & Précision*, cette boutique offre une expérience interactive et fluide pour la personnalisation d'objets, l'artisanat d'art, et la commande d'accessoires sur-mesure.

L'interface est entièrement réactive, optimisée pour le référencement (SEO) et dotée d'animations fluides avec des micro-interactions premium pour émerveiller l'utilisateur.

---

## 🛠️ Stack Technique

- **Framework** : [Next.js 15/16](https://nextjs.org/) (App Router)
- **Bibliothèque Core** : [React 19](https://react.dev/)
- **Styling** : [Tailwind CSS v4](https://tailwindcss.com/) avec `@tailwindcss/postcss`
- **Animations** : [Framer Motion](https://www.framer.com/motion/) & [Lucide React](https://lucide.dev/) (icônes)
- **Gestion d'État** : [Zustand](https://zustand-demo.pmnd.rs/)
- **Client HTTP** : [Axios](https://axios-http.com/)
- **Langages** : TypeScript / JavaScript

---

## 🚀 Fonctionnalités Clés

- **Direction Artistique "Dark Luxe"** : Palette de couleurs HSL soignée (tons chauds ambrés, foncés profonds et or).
- **Héros Interactif 3D** : Section principale intégrant un effet de parallaxe 3D contrôlé par les mouvements de la souris (ou tactile) et des éléments flottants.
- **Grille de Catégories Dynamiques** : Affichage responsive avec chargement asynchrone depuis l'API et comportement fallback intelligent vers des catégories locales par défaut.
- **Support Internationalisation (i18n)** : Contexte linguistique dynamique pour une navigation multilingue simplifiée.
- **Composants d'Entrée Animés** : Utilisation de transitions personnalisées et d'effets `FadeUp` sur le défilement.

---

## 📂 Structure du Projet

```
frontend/
├── public/                 # Fichiers statiques (images, logos, icônes)
├── src/
│   ├── app/                # Pages & Layouts (Next.js App Router)
│   ├── components/         # Composants UI
│   │   ├── home/           # Composants spécifiques à la page d'accueil (Hero, Catégories, etc.)
│   │   └── ui/             # Éléments d'interface réutilisables (FadeUp, etc.)
│   ├── context/            # Contextes React globaux (Langue, etc.)
│   ├── services/           # Services de communication API (Configuration Axios)
│   └── styles/             # Fichiers CSS globaux
├── package.json            # Scripts de build et dépendances
├── tsconfig.json           # Configuration TypeScript
└── README.md               # Le présent fichier de documentation
```

---

## ⚙️ Configuration & Variables d'Environnement

Créez un fichier `.env.local` à la racine du dossier `frontend` et configurez les variables suivantes :

| Variable | Description | Valeur par défaut / Exemple |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL de l'API REST du Backend FastAPI | `http://localhost:8000/api` |

---

## 💻 Démarrage Local

### Prérequis

- [Node.js](https://nodejs.org/) (version 18+ ou 20+ recommandée)
- Un gestionnaire de paquets (`npm`, `yarn` ou `pnpm`)
- Le serveur **Backend** en cours d'exécution (facultatif si utilisation des données de secours locale).

### Étape 1 : Installer les dépendances

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Étape 2 : Lancer le serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

L'application sera accessible localement sur [http://localhost:3000](http://localhost:3000).

---

## 📦 Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter :

- `npm run dev` : Démarre l'application Next.js en mode de développement avec rechargement à chaud.
- `npm run build` : Compile et optimise l'application pour la production.
- `npm run start` : Démarre le serveur Next.js en mode production après compilation.
- `npm run lint` : Analyse la qualité de code et signale les avertissements ou erreurs ESLint.

---

## ⚠️ Dépannage

### Erreurs d'affichage d'images
Si certaines images de catégories ou de produits ne s'affichent pas, vérifiez :
1. Que votre connexion Internet est active (certaines images de secours proviennent d'Unsplash).
2. Que les images locales existent dans le répertoire `/public` (comme `/header-droit.jpeg`).

### Connexion au Backend coupée
Si le message `"Le backend n'est pas accessible, utilisation des catégories par défaut."` apparaît dans la console du navigateur, cela signifie que l'API Backend n'est pas lancée ou n'écoute pas sur le port configuré. Vérifiez que votre backend FastAPI tourne sur le port `8000` ou ajustez `NEXT_PUBLIC_API_URL`.

---

> Ce projet est conçu avec fierté par **Nexus Partners** 🌐 [nexuspartners.xyz](https://nexuspartners.xyz)
