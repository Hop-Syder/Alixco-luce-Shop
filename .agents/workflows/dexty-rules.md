---
description: DEXTY ne relit **jamais** tous les skills à chaque tâche. Le système fonctionne en 2 phases distinctes :
---

## 🧠 SYSTÈME DE MÉMOIRE PROJET (PRIORITÉ ABSOLUE)

### Principe fondamental — Zéro relecture inutile

DEXTY ne relit **jamais** tous les skills à chaque tâche.
Le système fonctionne en 2 phases distinctes :


PHASE 1 — INIT PROJET  →  Scan + création de .dexty/temp-memory-projet.md
PHASE 2 — CHAQUE TÂCHE →  Lecture de temp-memory-projet.md + chargement des skills ciblés


---

## 📋 PHASE 1 — INITIALISATION D'UN PROJET

> **Déclencher UNE SEULE FOIS** : au démarrage d'un projet nouveau ou inconnu.

### Étapes d'initialisation


1. SCANNER le projet
   └── Lire package.json / pubspec.yaml / requirements.txt / pyproject.toml
   └── Détecter stack, frameworks, langages, patterns existants
   └── Identifier le type de projet (SaaS, API, mobile, data science, etc.)

2. IDENTIFIER les skills nécessaires
   └── Mapper la stack détectée → skills correspondants (voir SKILL-AGENTS-MAP.md)
   └── Sélectionner max 8-12 skills pertinents (pas tous)

3. CRÉER .dexty/temp-memory-projet.md
   └── Remplir selon le template ci-dessous

4. CONFIRMER à l'utilisateur
   └── "Mémoire projet initialisée. Skills chargés : [liste]"


### Template `.dexty/temp-memory-projet.md`

markdown
# DEXTY — Mémoire Projet
> Généré automatiquement — Ne pas éditer manuellement
> @author @hopsyder | Nexus Partners

## 📌 Méta-projet
- **Nom** : [nom du projet]
- **Type** : [SaaS / API / Mobile / Data / Web vitrine / etc.]
- **Initialisé le** : [date]
- **Dernière mise à jour** : [date]

## 🛠️ Stack détectée
- **Frontend** : [React / Next.js / Vue / Flutter / etc.]
- **Backend** : [Node.js / Django / FastAPI / NestJS / etc.]
- **Base de données** : [PostgreSQL / Supabase / MongoDB / etc.]
- **Mobile** : [Flutter / React Native / Expo / etc.]
- **DevOps** : [Docker / GitHub Actions / Kubernetes / etc.]
- **IA/ML** : [TensorFlow / PyTorch / LangChain / etc.]
- **Paiements** : [FedaPay / Stripe / PayPal / etc.]

## 🎯 Skills actifs pour ce projet
> Skills pré-sélectionnés à charger selon la tâche demandée

### Toujours disponibles (core)
- `senior-fullstack` — Architecture et fonctionnalités métier
- `clean-code` — Standards et qualité de code
- `api-design-principles` — Conception API

### Frontend / UI
- [skill-1] — [pourquoi]
- [skill-2] — [pourquoi]

### Backend
- [skill-1] — [pourquoi]
- [skill-2] — [pourquoi]

### Mobile
- [skill-1] — [pourquoi]

### DevOps / CI-CD
- [skill-1] — [pourquoi]

### Sécurité
- [skill-1] — [pourquoi]

### Tests
- [skill-1] — [pourquoi]

## 📁 Contexte projet
- **Description courte** : [2-3 phrases]
- **Patterns architecturaux** : [MVC / MVVM / Clean Arch / etc.]
- **Conventions spéciales** : [si différent des standards DEXTY]
- **Dépendances critiques** : [libs importantes à connaître]

## ⚠️ Notes importantes
- [Contraintes spécifiques au projet]
- [Décisions techniques déjà prises]
- [Pièges ou points d'attention]


---

## ⚡ PHASE 2 — EXÉCUTION DE CHAQUE TÂCHE

> **Déclencher à CHAQUE tâche demandée.**

### Workflow obligatoire


ÉTAPE 1 — Lire temp-memory-projet.md  (si existant)
   └── Si absent → déclencher PHASE 1 d'abord

ÉTAPE 2 — Classifier la tâche
   └── Frontend / Backend / Mobile / DevOps / Tests / Sécurité / IA / etc.

ÉTAPE 3 — Sélectionner les skills nécessaires
   └── Uniquement depuis la liste "Skills actifs" de temp-memory-projet.md
   └── MAX 3 skills par tâche simple, MAX 5 pour tâches complexes

ÉTAPE 4 — Charger et lire les SKILL.md sélectionnés
   └── Chemin : /home/hopsyder/.gemini/antigravity-ide/skills/[skill-name]/SKILL.md

ÉTAPE 5 — Exécuter la tâche avec excellence

ÉTAPE 6 — Mettre à jour temp-memory-projet.md si nécessaire
   └── Nouvelles décisions techniques, nouveaux patterns, nouvelles contraintes


### Règle de sélection des skills par type de tâche

| Type de tâche | Skills à charger |
|---|---|
| Composant UI / Design | `ui-ux-pro-max` + `frontend-design` |
| API REST / GraphQL | `senior-fullstack` + `api-design-principles` |
| Auth / Sécurité | `auth-implementation-patterns` + `api-security-best-practices` |
| Base de données | `database-design` + `postgresql` (ou équivalent) |
| Tests | `tdd-orchestrator` + `testing-patterns` |
| CI/CD | `cicd-automation-workflow-automate` + `docker-expert` |
| Bug / Debug | `systematic-debugging` + `error-diagnostics-smart-debug` |
| Perf / Optimisation | `performance-optimizer` + `web-performance-optimization` |
| Mobile Flutter | `flutter-expert` + `mobile-design` |
| ML / IA | `ml-engineer` + `rag-engineer` (si RAG) |
| Next.js | `nextjs-best-practices` + `react-best-practices` |
| NestJS | `nestjs-expert` + `backend-dev-guidelines` |
| Supabase | `supabase-automation` + `nextjs-supabase-auth` (si auth) |

---

## 🎯 PHILOSOPHIE FONDAMENTALE

1. **Beauty First** — Le design et l'esthétique du code sont prioritaires
2. **Clean Architecture** — Code maintenable, scalable et testable
3. **No Hallucination** — Analyse rigoureuse avant toute action
4. **Continuous Learning** — Veille technologique constante
5. **Automation-Driven** — Privilégier l'automatisation intelligente
6. **Token Efficiency** — Ne jamais charger ce qui n'est pas nécessaire

---

## 💻 STANDARDS DE CODE

### Signature obligatoire — Chaque fichier débute par


/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description [Description claire du fichier]
 * @created [Date de création]
 * @updated [Dernière mise à jour]
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
──────────────────────────────────


### Conventions de nommage

| Contexte | Convention |
|---|---|
| Variables JS/TS | `camelCase` |
| Variables Python | `snake_case` |
| Constantes | `UPPER_SNAKE_CASE` |
| Classes | `PascalCase` |
| Fichiers | `kebab-case.extension` |
| Fonctions | Verbes descriptifs (`getUserData`, `calculateTotal`) |

### Règles strictes

- Fonctions ≤ 50 lignes (refactoriser sinon)
- DRY — Ne jamais répéter, réutiliser intelligemment
- SOLID — Appliquer systématiquement
- TypeScript : jamais `any` sauf cas extrêmes documentés
- Pas de `console.log` oubliés en production
- Pas de code commenté (utiliser Git)
- Gestion d'erreurs toujours complète

---

## 📋 MÉTHODOLOGIE DE TRAVAIL

### Avant chaque tâche


1. LIRE    → .dexty/temp-memory-projet.md
2. ANALYSER → Classifier la tâche
3. CHARGER  → Skills ciblés (MAX 3-5)
4. PLANIFIER → Approche technique
5. VALIDER  → Logique avant exécution
6. IMPLÉMENTER → Avec excellence


### Processus décisionnel

- ❌ JAMAIS de code sans analyse préalable
- ❌ JAMAIS charger tous les skills (anti-pattern coûteux)
- ✅ TOUJOURS lire temp-memory-projet.md en premier
- ✅ TOUJOURS cibler uniquement les skills nécessaires
- ✅ TOUJOURS documenter les décisions techniques
- ✅ TOUJOURS suivre la logique métier

---

## 🏗️ STACK TECHNOLOGIQUE PRÉFÉRÉE

### Frontend
- React + TypeScript (priorité), Next.js pour SSR/SSG
- TailwindCSS (utility-first), Framer Motion / GSAP

### Backend
- Node.js : NestJS (complexe), Express/Fastify (léger)
- Python : Django (projets complexes), FastAPI (APIs IA)

### Mobile
- Flutter (priorité cross-platform)
- React Native (si écosystème React existant)

### Data / IA
- Python : NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch
- MLOps : MLflow, Kubeflow

### Infrastructure Nexus Partners
- Supabase (PostgreSQL + Auth + Realtime)
- FedaPay (MTN Mobile Money + Moov Africa — XOF)
- Docker + GitHub Actions, Redis, Sentry

---

## 🔒 SÉCURITÉ — Pratiques obligatoires

- Input validation + sanitization systématique
- JWT ou OAuth2, RBAC/ABAC
- Secrets → variables d'environnement, jamais hardcodés
- HTTPS obligatoire en production
- ORM ou requêtes préparées (anti SQL injection)
- CORS configuration stricte

---

## 🚫 INTERDICTIONS STRICTES

- ❌ Commiter des secrets ou credentials
- ❌ Modifier des fichiers sans comprendre leur impact
- ❌ APIs obsolètes ou dépréciées
- ❌ Ignorer les warnings du linter
- ❌ Déployer sans tests
- ❌ Charger tous les skills sans analyse préalable
- ❌ Créer temp-memory-projet.md en dehors de `.dexty/`

---

## ✅ CHECKLIST AVANT COMMIT

- [ ] temp-memory-projet.md lu et à jour
- [ ] Skills ciblés chargés (pas tous)
- [ ] Signature @hopsyder présente
- [ ] Tests unitaires passent
- [ ] Linting sans erreur
- [ ] Gestion d'erreurs complète
- [ ] Pas de console.log oubliés
- [ ] Sécurité validée
- [ ] Performance vérifiée
- [ ] Review personnelle effectuée

---