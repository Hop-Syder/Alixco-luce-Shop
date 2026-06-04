---
description: Ce fichier est la **référence de mapping** entre une stack/tâche détectée et les skills/agents à charger. > DEXTY le lit **une seule fois en PHASE 1** pour peupler `temp-memory-projet.md`. > Il n'est **jamais relu** lors des tâches (PHASE 2).
---

Détection automatique → Skills à activer

SI package.json contient "next"        → nextjs-best-practices, react-best-practices, nextjs-app-router-patterns
SI package.json contient "react"       → react-best-practices, react-patterns, react-state-management
SI package.json contient "vue"         → angular (non), lire vue patterns via senior-fullstack
SI package.json contient "nestjs"      → nestjs-expert, backend-dev-guidelines
SI package.json contient "express"     → nodejs-best-practices, nodejs-backend-patterns
SI package.json contient "fastify"     → nodejs-best-practices, backend-dev-guidelines
SI package.json contient "tailwind"    → tailwind-design-system, tailwind-patterns
SI package.json contient "prisma"      → prisma-expert, database-design
SI package.json contient "drizzle"     → drizzle-orm-expert, database-design
SI package.json contient "supabase"    → supabase-automation, nextjs-supabase-auth
SI package.json contient "stripe"      → stripe-integration
SI package.json contient "trpc"        → trpc-fullstack
SI package.json contient "graphql"     → graphql-architect, graphql
SI package.json contient "langchain"   → langchain-architecture, llm-app-patterns
SI pubspec.yaml existe                 → flutter-expert, mobile-design, mobile-developer
SI requirements.txt / pyproject        → python-pro, python-patterns
SI requirements.txt contient "django"  → django-pro, backend-dev-guidelines
SI requirements.txt contient "fastapi" → fastapi-pro, fastapi-templates
SI requirements.txt contient "torch"   → ml-engineer, mlops-engineer
SI requirements.txt contient "sklearn" → ml-engineer, data-scientist
SI requirements.txt contient "langchain"→ llm-app-patterns, rag-engineer
SI docker-compose.yml existe           → docker-expert, devops-deploy
SI .github/workflows/ existe           → cicd-automation-workflow-automate, github-actions-templates
SI terraform/ existe                   → terraform-specialist, cloud-architect
SI kubernetes/ ou k8s/ existe          → kubernetes-architect, k8s-manifest-generator
```

---

## 🎯 SECTION 2 — SKILLS PAR TYPE DE TÂCHE

> Utilisé en PHASE 2 pour charger uniquement ce qui est nécessaire.

### 🎨 Frontend / UI / Design

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Créer un composant React/TS | `react-best-practices` | `ui-ux-pro-max` |
| Design system / tokens | `tailwind-design-system` | `ui-tokens`, `ui-ux-pro-max` |
| Page complète responsive | `frontend-design` | `ui-page`, `tailwind-patterns` |
| Animation / micro-interactions | `magic-animator` | `animejs-animation` |
| Audit accessibilité | `ui-a11y` | `wcag-audit-patterns` |
| Performance frontend | `web-performance-optimization` | `react-component-performance` |
| Dark mode / theming | `theme-factory` | `tailwind-design-system` |
| Formulaires / validation | `zod-validation-expert` | `form-cro` |
| Dashboard / dataviz | `kpi-dashboard-design` | `plotly`, `claude-d3js-skill` |
| UI review | `ui-review` | `ux-audit` |

### ⚙️ Backend / API

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Architecture API REST | `api-design-principles` | `senior-fullstack` |
| Création endpoint NestJS | `nestjs-expert` | `backend-dev-guidelines` |
| Création endpoint Express | `nodejs-backend-patterns` | `nodejs-best-practices` |
| Création endpoint FastAPI | `fastapi-pro` | `fastapi-templates` |
| Auth JWT / OAuth2 | `auth-implementation-patterns` | `clerk-auth` |
| Middleware / Guards | `senior-fullstack` | `api-security-best-practices` |
| GraphQL schema | `graphql-architect` | `graphql` |
| tRPC routes | `trpc-fullstack` | `typescript-expert` |
| WebSockets / Realtime | `senior-fullstack` | `supabase-automation` |
| Rate limiting / cache | `performance-optimizer` | `nodejs-best-practices` |

### 🗄️ Base de données

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Modélisation / schéma | `database-design` | `database-architect` |
| Migrations | `database-migration` | `prisma-expert` |
| Optimisation requêtes | `postgresql-optimization` | `database-optimizer` |
| ORM Prisma | `prisma-expert` | `database-design` |
| ORM Drizzle | `drizzle-orm-expert` | `database-design` |
| Supabase RLS / policies | `supabase-automation` | `api-security-best-practices` |
| Redis / cache | `performance-optimizer` | `senior-fullstack` |
| NoSQL | `nosql-expert` | `database-design` |

### 📱 Mobile

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Widget Flutter | `flutter-expert` | `mobile-design` |
| Navigation Flutter | `flutter-expert` | `mobile-developer` |
| State management Flutter | `flutter-expert` | `senior-fullstack` |
| Expo / React Native | `react-native-architecture` | `expo-deployment` |
| Mobile auth | `auth-implementation-patterns` | `flutter-expert` |
| Push notifications | `expo-cicd-workflows` | `flutter-expert` |
| Performance mobile | `flutter-expert` | `mobile-security-coder` |

### 🧪 Tests / Qualité

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Tests unitaires JS/TS | `testing-patterns` | `javascript-testing-patterns` |
| Tests unitaires Python | `python-testing-patterns` | `tdd-orchestrator` |
| TDD workflow | `tdd-orchestrator` | `tdd-workflow` |
| Tests E2E | `playwright-skill` | `e2e-testing` |
| Tests API | `api-testing-observability-api-mock` | `testing-qa` |
| Code review | `code-review-excellence` | `code-reviewer` |
| Refactoring | `code-refactoring-refactor-clean` | `clean-code` |

### 🔒 Sécurité

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Audit sécurité API | `api-security-best-practices` | `security-auditor` |
| Auth sécurisée | `auth-implementation-patterns` | `api-security-best-practices` |
| Scan vulnérabilités | `security-scanning-security-sast` | `vulnerability-scanner` |
| OWASP / XSS / SQLi | `top-web-vulnerabilities` | `web-security-testing` |
| CORS / Headers | `api-security-best-practices` | `backend-security-coder` |
| Compliance RGPD | `gdpr-data-handling` | `privacy-by-design` |

### 🐛 Debug / Incidents

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| Bug complexe | `systematic-debugging` | `error-diagnostics-smart-debug` |
| Analyse d'erreur | `error-detective` | `error-debugging-error-analysis` |
| Performance lente | `performance-profiling` | `performance-optimizer` |
| Incident prod | `incident-responder` | `distributed-debugging-debug-trace` |
| Postmortem | `postmortem-writing` | `incident-responder` |

### 📚 Documentation

| Tâche | Skills principaux | Skills secondaires |
|---|---|---|
| README | `readme` | `documentation` |
| API docs / Swagger | `api-documentation` | `openapi-spec-generation` |
| ADR | `architecture-decision-records` | `documentation` |
| Diagrammes archi | `c4-architecture-c4-architecture` | `mermaid-expert` |

---

## 🤝 SECTION 3 — AGENTS PAR RÔLE

> Les agents sont des entités spécialisées à instancier selon le besoin.
> Utiliser uniquement si la tâche dépasse les skills standards.

### Agents Core (disponibles sur tout projet)

| Agent | Rôle | Quand l'utiliser |
|---|---|---|
| `senior-fullstack` | Architecte full stack senior | Architecture générale, décisions techniques majeures |
| `backend-architect` | Architecte backend | Conception système distribué, microservices |
| `senior-frontend` | Expert frontend senior | Design system, composants complexes |
| `ai-agents-architect` | Architecte agents IA | Systèmes multi-agents, orchestration |
| `systematic-debugging` | Debugger expert | Bugs complexes, regressions |

### Agents Spécialisés

| Agent | Rôle | Quand l'utiliser |
|---|---|---|
| `ml-engineer` | Ingénieur ML | Tout pipeline ML/DL |
| `mlops-engineer` | MLOps | Déploiement modèles, monitoring |
| `security-auditor` | Auditeur sécurité | Audit pré-production, pentesting |
| `performance-engineer` | Ingénieur perf | Optimisation benchmarkée |
| `cloud-architect` | Architecte cloud | Infrastructure multi-cloud |
| `kubernetes-architect` | Expert K8s | Orchestration conteneurs complexe |
| `database-architect` | Architecte BDD | Modélisation avancée, sharding |
| `devops-deploy` | DevOps | Pipelines CI/CD, déploiements |

### Agents Orchestration (multi-agents)

| Agent | Rôle | Quand l'utiliser |
|---|---|---|
| `antigravity-skill-orchestrator` | Orchestrateur principal | Combiner plusieurs expertises |
| `multi-agent-architect` | Architecte multi-agents | Systèmes d'agents complexes |
| `agent-orchestrator` | Orchestrateur générique | Délégation de sous-tâches |
| `skill-router` | Routeur de skills | Ambiguïté dans la sélection |

---
## 📦 SECTION 4 — MAPPING PAR TYPE DE PROJET

> Utilisé en PHASE 1 pour pré-remplir les skills actifs dans temp-memory-projet.md.

### Projet SaaS Next.js + Supabase (stack Nexus Partners standard)


Core          : senior-fullstack, clean-code, api-design-principles
Frontend      : nextjs-best-practices, react-best-practices, tailwind-design-system, ui-ux-pro-max
Backend       : nestjs-expert (ou nodejs-backend-patterns)
Auth          : auth-implementation-patterns, nextjs-supabase-auth
BDD           : supabase-automation, prisma-expert (ou drizzle-orm-expert), postgresql-optimization
Paiements     : stripe-integration (ou fedapay via senior-fullstack)
Tests         : tdd-orchestrator, testing-patterns, playwright-skill
DevOps        : docker-expert, cicd-automation-workflow-automate, github-actions-templates
Sécurité      : api-security-best-practices, gdpr-data-handling


### Projet Application Flutter + API Django/FastAPI

Core          : senior-fullstack, clean-code
Mobile        : flutter-expert, mobile-design, mobile-developer
Backend       : fastapi-pro (ou django-pro), backend-dev-guidelines
Auth          : auth-implementation-patterns
BDD           : postgresql-optimization, database-design
Paiements     : senior-fullstack (FedaPay XOF)
Tests         : flutter-expert (tests), python-testing-patterns
DevOps        : docker-expert, cicd-automation-workflow-automate
Sécurité      : mobile-security-coder, api-security-best-practices



### Projet Landing page / Site vitrine

Core          : frontend-design, ui-ux-pro-max
Frontend      : nextjs-best-practices (ou react-best-practices), tailwind-design-system
SEO           : seo, seo-technical, seo-meta-optimizer
Perf          : web-performance-optimization
Animations    : magic-animator, animejs-animation
```

### Projet API Pure (microservice)

Core          : api-design-principles, senior-fullstack, backend-architect
Backend       : nestjs-expert (ou fastapi-pro), backend-dev-guidelines
Auth          : auth-implementation-patterns
BDD           : database-design, postgresql-optimization
Tests         : tdd-orchestrator, api-testing-observability-api-mock
DevOps        : docker-expert, cicd-automation-workflow-automate, kubernetes-deployment
Sécurité      : api-security-best-practices, secrets-management


## 🔄 SECTION 5 — RÈGLES DE MISE À JOUR

### Quand mettre à jour temp-memory-projet.md

✅ Nouvelle dépendance majeure ajoutée au projet
✅ Changement de stack ou de framework
✅ Nouvelle décision d'architecture prise
✅ Nouveau pattern adopté pour le projet
✅ Contrainte de sécurité identifiée
✅ Skill inadapté → le remplacer dans la liste active

### Format de mise à jour dans temp-memory-projet.md

markdown
## ⚠️ Notes importantes
- [2026-05-27] Migration de Prisma vers Drizzle → remplacer `prisma-expert` par `drizzle-orm-expert`
- [2026-05-27] Ajout FedaPay → ajouter contexte XOF dans skills paiement
- [2026-05-27] Pattern Repository adopté → référencer dans toutes les tâches backend



## 📏 RÈGLES D'OR — À ne jamais violer


1. NE JAMAIS charger plus de 5 skills pour une seule tâche
2. NE JAMAIS lire ce fichier en PHASE 2 (trop lourd)
3. TOUJOURS lire temp-memory-projet.md avant ce fichier
4. Ce fichier est consulté UNIQUEMENT en PHASE 1 (initialisation)
5. En cas de doute sur un skill → utiliser skill-router 
6. Si aucun skill ne correspond → utiliser senior-fullstack par défaut