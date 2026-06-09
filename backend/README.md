# Alixco Luxe - Backend API

API REST performante et scalable pour la plateforme e-commerce **Alixco Luxe**. Construite avec FastAPI et MongoDB, elle gère l'authentification, les produits, les commandes, les clients et les configurations du site.

## 📋 Table des Matières

- [Aperçu](#-aperçu)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Structure du Projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Développement](#-développement)
- [Déploiement](#-déploiement)
- [Docker](#-docker)
- [Scripts Utiles](#-scripts-utiles)
- [Dépannage](#-dépannage)
- [Ressources](#-ressources)

## 🎯 Aperçu

**Backend API** est une API REST complète et robuste qui fournit :

- ✅ **Authentification** : JWT OAuth2, gestion des utilisateurs
- ✅ **Produits** : CRUD complet, gestion des stocks, SEO bilingue
- ✅ **Commandes** : Suivi, statuts, gestion clients
- ✅ **Catégories** : Organisation hiérarchique des produits
- ✅ **Uploads** : Intégration Cloudinary pour images/médias
- ✅ **Témoignages** : Gestion des avis et commentaires
- ✅ **Analytics** : Données de ventes et statistiques
- ✅ **Paramètres** : Configuration dynamique du site
- ✅ **Bilingue** : Support complet FR/EN

**Stack Technique** :
- **Framework** : FastAPI 0.136+ (framework async moderne)
- **Base de données** : MongoDB avec Motor (async driver)
- **Authentification** : JWT + OAuth2 Password Bearer
- **Sécurité** : Bcrypt pour hachage des passwords
- **Uploads** : Cloudinary API
- **Server** : Uvicorn ASGI
- **Validation** : Pydantic v2
- **Language** : Python 3.13+

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

| Outil | Version | Lien |
|-------|---------|------|
| **Python** | ≥ 3.13 | [python.org](https://www.python.org/downloads) |
| **MongoDB** | ≥ 4.4 | [mongodb.com](https://www.mongodb.com/try/download/community) |
| **UV** | Dernière | [astral-sh/uv](https://github.com/astral-sh/uv) |
| **Docker** | 20.10+ | [docker.com](https://www.docker.com/products/docker-desktop) |

**Vérifier les versions** :
```bash
python --version      # ≥ 3.13
uv --version         # Latest
mongosh --version    # Optionnel
docker --version     # 20.10+
```

**Services Externes** :
- [Cloudinary](https://cloudinary.com) - Stockage et optimisation d'images
- MongoDB instance (locale ou Atlas)

## 🚀 Installation

### 1. Cloner le Dépôt

```bash
git clone <repository-url>
cd Alixco-luce\ Shop/backend
```

### 2. Configurer Python avec UV

```bash
# UV détecte automatiquement .python-version
# et créera le venv approprié
uv sync

# Vérifier que tout est installé
uv pip list | head -20
```

### 3. Configurer les Variables d'Environnement

Créez un fichier `.env` à la racine du backend :

```bash
# .env

# Base de Données MongoDB
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=alixcoluxe

# Authentification
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 jours

# Cloudinary (Images)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# WhatsApp (Notifications optionnelles)
WHATSAPP_NUMBER=2290197412933

# Application
API_V1_STR=/api
ENVIRONMENT=development
DEBUG=true

# CORS (Frontend URLs)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:5173

# Email (pour notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 4. Initialiser MongoDB

**Option A : MongoDB Locale (Docker)**

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  mongo:latest
```

**Option B : MongoDB Atlas (Cloud)**

```bash
# Utiliser le connection string d'Atlas dans MONGODB_URI
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/alixcoluxe
```

### 5. Démarrer le Serveur

```bash
# Développement avec rechargement automatique
uv run python main.py

# Production
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

Accédez à [http://localhost:8000](http://localhost:8000)

**Documentation Swagger** : [http://localhost:8000/docs](http://localhost:8000/docs)

## ⚙️ Configuration

### Variables d'Environnement Détaillées

| Variable | Type | Défaut | Description |
|----------|------|--------|-------------|
| `MONGODB_URI` | string | `mongodb://localhost:27017` | URI de connexion MongoDB |
| `MONGODB_DB_NAME` | string | `alixcoluxe` | Nom de la base de données |
| `SECRET_KEY` | string | ⚠️ Requis | Clé secrète pour JWT (min 32 chars) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | int | `10080` | Expiration du token (7j par défaut) |
| `CLOUDINARY_CLOUD_NAME` | string | ⚠️ Requis | Cloud name Cloudinary |
| `CLOUDINARY_API_KEY` | string | ⚠️ Requis | API key Cloudinary |
| `CLOUDINARY_API_SECRET` | string | ⚠️ Requis | API secret Cloudinary |
| `WHATSAPP_NUMBER` | string | `""` | Numéro WhatsApp pour notifications |
| `ENVIRONMENT` | string | `development` | `development` ou `production` |
| `DEBUG` | bool | `true` | Activer le debug mode |
| `ALLOWED_ORIGINS` | string | `*` | URLs CORS autorisées (séparées par virgules) |

### Secrets en Production

⚠️ **IMPORTANT** :
- Changez `SECRET_KEY` avec une clé sécurisée générée (minimum 32 caractères)
- Ne committez JAMAIS le fichier `.env`
- Utilisez des variables d'environnement du serveur en production
- Rotez les clés Cloudinary régulièrement

**Générer une SECRET_KEY sécurisée** :
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## 📁 Structure du Projet

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                    # Point d'entrée FastAPI
│   ├── api/
│   │   ├── __init__.py           # Router principal
│   │   ├── deps.py               # Dépendances (DB, Auth)
│   │   └── endpoints/
│   │       ├── auth.py           # Authentification JWT
│   │       ├── users.py          # Gestion utilisateurs
│   │       ├── products.py       # CRUD produits
│   │       ├── categories.py     # Catégories
│   │       ├── orders.py         # Commandes
│   │       ├── featured_products.py  # Produits vedettes
│   │       ├── testimonials.py   # Avis clients
│   │       ├── page_settings.py  # Config site
│   │       ├── upload.py         # Upload images
│   │       ├── analytics.py      # Statistiques
│   │       └── poc.py            # POC/tests
│   ├── core/
│   │   ├── config.py             # Pydantic Settings
│   │   └── security.py           # JWT, hachage passwords
│   ├── db/
│   │   └── mongodb.py            # Connexion MongoDB async
│   └── models/
│       ├── schemas.py            # Schémas Pydantic
│       └── user.py               # Modèles utilisateurs
├── create_admin.py               # Script création admin
├── seed.py                        # Script seed données
├── seed_categories.py            # Seed catégories
├── migrate_language.py           # Migration bilingue
├── pyproject.toml               # Dépendances UV
├── uv.lock                      # Lock file UV
├── Dockerfile                   # Docker build
├── .dockerignore                # Fichiers ignorés Docker
├── .python-version              # Version Python (3.13)
├── .env                         # Variables d'environnement
└── main.py                      # Entrypoint
```

### Détails des Modules

| Module | Responsabilité |
|--------|-----------------|
| `app/api/endpoints/auth.py` | Authentification, login, tokens JWT |
| `app/api/endpoints/users.py` | Profils, inscriptions, gestion clients |
| `app/api/endpoints/products.py` | Catalogue produits, recherche, SEO |
| `app/api/endpoints/categories.py` | Hiérarchie et filtrage |
| `app/api/endpoints/orders.py` | Création, suivi, statuts commandes |
| `app/api/endpoints/featured_products.py` | Configuration produits vedettes |
| `app/api/endpoints/upload.py` | Upload Cloudinary |
| `app/api/endpoints/analytics.py` | Statistiques ventes, tableaux bord |
| `app/core/security.py` | Hachage, JWT, authentification |
| `app/db/mongodb.py` | Connexion async Motor |

## 🔌 API Endpoints

### Authentification (`/api/auth`)

```
POST   /api/auth/login/access-token      Login avec phone/password
GET    /api/auth/me                       Infos utilisateur courant
POST   /api/auth/refresh                  Refresh token
```

### Utilisateurs (`/api/users`)

```
POST   /api/users/register               Créer un compte
GET    /api/users                        Lister les utilisateurs
GET    /api/users/{user_id}             Détail utilisateur
PUT    /api/users/{user_id}             Modifier utilisateur
DELETE /api/users/{user_id}             Supprimer utilisateur
```

### Produits (`/api/products`)

```
GET    /api/products                     Lister produits (pagination)
POST   /api/products                     Créer produit (admin)
GET    /api/products/{product_id}       Détail produit
PUT    /api/products/{product_id}       Modifier produit (admin)
DELETE /api/products/{product_id}       Supprimer produit (admin)
GET    /api/products/search?q=...       Recherche produits
```

### Catégories (`/api/categories`)

```
GET    /api/categories                   Lister catégories
POST   /api/categories                   Créer catégorie (admin)
GET    /api/categories/{cat_id}         Détail catégorie
PUT    /api/categories/{cat_id}         Modifier catégorie (admin)
DELETE /api/categories/{cat_id}         Supprimer catégorie (admin)
```

### Commandes (`/api/orders`)

```
POST   /api/orders                       Créer commande
GET    /api/orders                       Lister commandes (user)
GET    /api/orders/{order_id}           Détail commande
PUT    /api/orders/{order_id}           Mettre à jour statut (admin)
GET    /api/orders/analytics/stats      Statistiques (admin)
```

### Uploads (`/api/upload`)

```
POST   /api/upload                       Upload image (Cloudinary)
POST   /api/upload/multiple              Upload multiple images
DELETE /api/upload/{image_id}           Supprimer image
```

### Analytics (`/api/analytics`)

```
GET    /api/analytics/sales              Ventes par période
GET    /api/analytics/products           Top produits
GET    /api/analytics/customers          Stats clients
GET    /api/analytics/revenue            Revenus totaux
```

### Témoignages (`/api/testimonials`)

```
GET    /api/testimonials                 Lister avis
POST   /api/testimonials                 Créer avis (user)
PUT    /api/testimonials/{id}           Modifier avis
DELETE /api/testimonials/{id}           Supprimer avis
```

**Documentation Interactive** : [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

## 👨‍💻 Développement

### Démarrer le Serveur Dev

```bash
# Avec rechargement automatique
uv run python main.py

# Ou directement avec uvicorn
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Features Dev** :
- ♻️ Hot reload à chaque changement
- 📚 Documentation Swagger auto-générée
- 🔍 ReDoc documentation
- 🛠️ Debug mode activé par défaut

### IDE & Extensions Recommandées

**VS Code** :
```json
{
  "extensions": [
    "ms-python.python",
    "ms-python.vscode-pylance",
    "charliermarsh.ruff",
    "ms-vscode.makefile-tools"
  ]
}
```

**PyCharm** :
- Python support (built-in)
- FastAPI support
- MongoDB support

### Linter & Formatage

```bash
# Linter avec Ruff (config in pyproject.toml)
uv run ruff check app/

# Formatter avec Ruff
uv run ruff format app/

# Type checking avec mypy
uv run mypy app/
```

### Commandes de Développement Courantes

```bash
# Vérifier la syntaxe
uv run python -m py_compile app/

# Linter
uv run ruff check app/ --fix

# Type checking
uv run mypy app/ --ignore-missing-imports

# Tests (quand disponibles)
uv run pytest tests/ -v

# Créer un utilisateur admin
uv run python create_admin.py

# Seeder la base de données
uv run python seed.py
uv run python seed_categories.py
```

### Conventions de Code

#### Imports

```python
# ✅ Bon : Organisés par section
from datetime import datetime, timedelta
from typing import Any, Optional, List

from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from pydantic import BaseModel, Field

from app.api import deps
from app.core import security
from app.core.config import settings

# ❌ Mauvais : Désorganisés
import security, db, fastapi, motor
```

#### Schemas Pydantic

```python
# ✅ Bon : Typés, validés, bien documentés
from pydantic import BaseModel, Field, validator

class ProductCreate(BaseModel):
    """Schema pour créer un produit"""
    name_fr: str = Field(..., min_length=1, description="Nom français")
    name_en: str = Field(..., min_length=1, description="Nom anglais")
    price: float = Field(..., gt=0, description="Prix en EUR")
    stock: int = Field(default=0, ge=0)
    
    @validator('price')
    def validate_price(cls, v):
        if v < 0.01:
            raise ValueError('Prix doit être >= 0.01')
        return round(v, 2)

# ❌ Mauvais : Types weak, pas de validation
class Product:
    name = ""
    price = 0
```

#### Routes FastAPI

```python
# ✅ Bon : Sécurisé, documenté, paginé
from fastapi import Query, Depends
from app.api import deps
from app.core.security import get_current_user

@router.get("/products", response_model=PaginatedResponse[Product])
async def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = Query(None),
    db: AsyncIOMotorDatabase = Depends(deps.get_db),
    current_user = Depends(get_current_user)
):
    """Lister les produits avec pagination"""
    query = {}
    if category:
        query["category"] = category
    
    items = await db.products.find(query).skip(skip).limit(limit).to_list(limit)
    total = await db.products.count_documents(query)
    
    return {
        "items": items,
        "total": total,
        "page": skip // limit,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }

# ❌ Mauvais : Pas de validation, pas d'auth
@router.get("/products")
async def products():
    return all_products()
```

#### Gestion des Erreurs

```python
# ✅ Bon : Exceptions explicites
from fastapi import HTTPException, status

@router.get("/products/{product_id}")
async def get_product(product_id: str, db = Depends(deps.get_db)):
    """Récupérer un produit"""
    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Produit non trouvé"
            )
        return product
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ID invalide"
        )
    except Exception as e:
        logger.error(f"Error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur serveur"
        )

# ❌ Mauvais : Swallowing exceptions
@router.get("/products/{product_id}")
async def get_product(product_id):
    try:
        return db.products.find_one(product_id)
    except:
        pass
```

## 🚢 Déploiement

### Option 1 : Docker (Recommandé)

**Build l'image** :

```bash
docker build -t alixco-backend:latest .
```

**Lancer le conteneur** :

```bash
docker run -d \
  --name alixco-api \
  -p 8000:8000 \
  -e MONGODB_URI=mongodb://mongo:27017 \
  -e SECRET_KEY=your-secret-key \
  -e CLOUDINARY_CLOUD_NAME=xxx \
  -e CLOUDINARY_API_KEY=xxx \
  -e CLOUDINARY_API_SECRET=xxx \
  alixco-backend:latest
```

**Avec Docker Compose** (inclus dans le projet) :

```bash
docker-compose up -d backend
```

### Option 2 : Railway (Recommandé)

**Avantages** :
- Infrastructure gérée
- Déploiement depuis Git
- Environnement de staging
- Support MongoDB & Postgres

**Étapes** :
1. Créer un compte [railway.app](https://railway.app)
2. Connecter le dépôt GitHub
3. Railway détecte automatiquement Python
4. Configurer les variables d'environnement
5. Déployer

### Option 3 : Heroku

```bash
# Installer Heroku CLI
heroku login
heroku create alixco-api

# Configurer variables
heroku config:set SECRET_KEY=xxx
heroku config:set MONGODB_URI=xxx

# Déployer
git push heroku main
```

### Option 4 : VPS Personnel (Ubuntu/Debian)

**Installation** :

```bash
# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Python 3.13
sudo apt install -y python3.13 python3.13-venv

# Installer UV
curl -LsSf https://astral.sh/uv/install.sh | sh

# Cloner et configurer
git clone <repo>
cd backend
uv sync

# Créer un service systemd
sudo nano /etc/systemd/system/alixco-api.service
```

**Fichier systemd** :

```ini
[Unit]
Description=Alixco Luxe API
After=network.target mongodb.service

[Service]
Type=notify
User=appuser
WorkingDirectory=/home/appuser/backend
Environment="PATH=/home/appuser/backend/.venv/bin"
ExecStart=/home/appuser/.local/bin/uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Démarrer** :

```bash
sudo systemctl daemon-reload
sudo systemctl start alixco-api
sudo systemctl enable alixco-api
sudo systemctl status alixco-api
```

**Configurer Nginx** :

```nginx
upstream alixco_api {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name api.alixco-luxe.com;
    
    location / {
        proxy_pass http://alixco_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Checklist de Déploiement

- [ ] Variables d'environnement définies
- [ ] SECRET_KEY générée et sécurisée
- [ ] MongoDB production configurée (Atlas ou self-managed)
- [ ] Cloudinary credentials valides
- [ ] CORS configuré correctement
- [ ] HTTPS activé
- [ ] Logs et monitoring en place
- [ ] Backups MongoDB automatiques
- [ ] Health checks configurés
- [ ] Alertes enregistrées
- [ ] Documentation à jour

## 🐳 Docker

### Dockerfile Optimisé

Le projet inclut un `Dockerfile` multi-stage optimisé :

```dockerfile
# Stage 1: Builder avec UV (rapide)
FROM python:3.13-slim-bookworm
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/
WORKDIR /app
COPY pyproject.toml uv.lock .
RUN uv sync --frozen --no-install-project

# Stage 2: Runtime minimal
FROM python:3.13-slim-bookworm
COPY --from=builder /app/.venv /app/.venv
COPY app /app/app
WORKDIR /app
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0"]
```

**Avantages** :
- 📦 Image fine (~300MB)
- ⚡ Builds ultra-rapides avec UV
- 🔒 Sécurité : pas de source code en dev
- 🚀 Startup temps < 1s

### Commandes Docker

```bash
# Build
docker build -t alixco-backend:latest .

# Run
docker run -p 8000:8000 alixco-backend:latest

# Avec variables d'env
docker run -p 8000:8000 \
  -e MONGODB_URI=mongodb://mongo:27017 \
  -e SECRET_KEY=xxx \
  alixco-backend:latest

# Docker Compose
docker-compose up backend
docker-compose logs -f backend
docker-compose down
```

## 🛠️ Scripts Utiles

### Créer un Utilisateur Admin

```bash
uv run python create_admin.py
```

Cela crée un utilisateur avec rôle `admin` pour accéder au dashboard admin.

### Seeder la Base de Données

```bash
# Ajouter des catégories
uv run python seed_categories.py

# Ajouter des produits et données
uv run python seed.py
```

### Migration des Langues

```bash
uv run python migrate_language.py
```

Migrate les produits existants en structure bilingue (FR/EN).

### Vérifier la Syntaxe

```bash
find app -name "*.py" -type f | xargs python3 -m py_compile
echo "✅ All files compile successfully"
```

## 🔧 Dépannage

### Problèmes Courants

#### 1. Erreur de Connexion MongoDB

```bash
# Vérifier que MongoDB tourne
mongosh --eval "db.adminCommand('ping')"

# Ou avec Docker
docker ps | grep mongo

# Tester la connexion dans l'app
uv run python -c "
import asyncio
from app.db.mongodb import connect_to_mongo
asyncio.run(connect_to_mongo())
print('✅ MongoDB connected')
"
```

#### 2. Erreur "Secret Key Not Found"

```bash
# Générer une nouvelle clé
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Ajouter au .env
echo "SECRET_KEY=<generated-key>" >> .env
```

#### 3. Erreur Cloudinary

```bash
# Vérifier les credentials
uv run python -c "
import os
from dotenv import load_dotenv
load_dotenv()
print(f'Cloud Name: {os.getenv(\"CLOUDINARY_CLOUD_NAME\")}')
print(f'API Key: {os.getenv(\"CLOUDINARY_API_KEY\")[:10]}...')
"

# Tester l'upload
uv run python -c "
import cloudinary
import cloudinary.uploader
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET')
)
print('✅ Cloudinary configured')
"
```

#### 4. Port 8000 Déjà Utilisé

```bash
# Linux/Mac
lsof -i :8000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Ou utiliser un autre port
uv run uvicorn app.main:app --port 8001
```

#### 5. Erreur CORS

Vérifier les `ALLOWED_ORIGINS` dans `.env` :

```bash
# Doit inclure l'URL du frontend
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Ou permettre tous les origins (dev seulement)
ALLOWED_ORIGINS=*
```

#### 6. Import Error "No module named app"

```bash
# S'assurer d'être dans le bon répertoire
cd backend/

# Ou utiliser le PYTHONPATH
export PYTHONPATH=/path/to/backend:$PYTHONPATH
uv run python main.py
```

### Logs et Debugging

```python
# Ajouter du logging
import logging
logger = logging.getLogger(__name__)

# Dans les routes
logger.info(f"User {user_id} authenticated")
logger.error(f"Database error: {error}")

# Voir les logs
uv run python main.py 2>&1 | tee app.log
```

### Health Check

```bash
# Vérifier que l'API répond
curl http://localhost:8000/

# Voir la documentation
curl http://localhost:8000/docs

# Healthcheck personnalisé
curl http://localhost:8000/api/health || echo "API not responding"
```

## 📚 Ressources

### Documentation Officielle

- **FastAPI** : [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
- **Pydantic** : [docs.pydantic.dev](https://docs.pydantic.dev)
- **MongoDB** : [docs.mongodb.com](https://docs.mongodb.com)
- **Motor** : [motor.readthedocs.io](https://motor.readthedocs.io)
- **Python** : [python.org/docs](https://docs.python.org/3.13)

### Packages Utilisés

- **[FastAPI](https://fastapi.tiangolo.com)** - Web framework
- **[Uvicorn](https://www.uvicorn.org)** - ASGI server
- **[Pydantic](https://docs.pydantic.dev)** - Validation données
- **[Motor](https://motor.readthedocs.io)** - MongoDB async driver
- **[PyJWT](https://pyjwt.readthedocs.io)** - JWT tokens
- **[Bcrypt](https://github.com/pyca/bcrypt)** - Password hashing
- **[Cloudinary](https://cloudinary.com/documentation/python_integration)** - Image hosting
- **[python-dotenv](https://github.com/theskumar/python-dotenv)** - .env files
- **[python-multipart](https://github.com/andrew-d/python-multipart)** - Form parsing

### Tutoriels Recommandés

- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial) - Guide complet
- [MongoDB with FastAPI](https://www.mongodb.com/languages/python) - Intégration BD
- [JWT with FastAPI](https://fastapi.tiangolo.com/tutorial/security) - Authentification
- [Async FastAPI](https://fastapi.tiangolo.com/async-sql-databases) - Requêtes async

### Commandes Rapides

```bash
# Développement
uv sync                          # Installer dépendances
uv run python main.py           # Démarrer dev server
uv run uvicorn app.main:app --reload  # Avec reload

# Scripts
uv run python create_admin.py   # Créer admin
uv run python seed.py           # Seed données
uv run python seed_categories.py # Seed catégories

# Maintenance
uv pip list                      # Lister packages
uv pip check                     # Vérifier dépendances
uv pip outdated                 # Paquets outdated
uv lock --upgrade              # Mettre à jour lock file

# Docker
docker build -t alixco-backend:latest .
docker run -p 8000:8000 alixco-backend:latest
docker-compose up -d
```

## 📝 Notes Importantes

- **Sécurité** : Ne committez JAMAIS `.env` (déjà dans `.gitignore`)
- **Performance** : MongoDB avec indexes pour queries rapides
- **Async** : Tout est async (Motor + Uvicorn) pour haute concurrence
- **SEO** : Champs SEO bilingues pour chaque produit
- **Bilingue** : Support complet FR/EN dans les schemas
- **Upload** : Utiliser Cloudinary pour images (ne pas stocker localement)
- **JWT** : Tokens avec expiration 7j, refresh tokens recommandés

## 📧 Support & Contribution

Pour des questions ou problèmes :
1. Vérifier la documentation [fastapi.tiangolo.com](https://fastapi.tiangolo.com)
2. Consulter les logs de l'application
3. Vérifier les issues GitHub
4. Créer une issue avec détails et traces

---

**Version** : 0.1.0  
**Python** : 3.13+  
**Framework** : FastAPI 0.136+  
**Database** : MongoDB 4.4+  
**Dernière mise à jour** : 2026-06-09  
**Mainteneur** : Alixco Luxe Team
