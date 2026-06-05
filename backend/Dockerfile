# ##################################################################
# @author @hopsyder
# @organization Nexus Partners
# @description Dockerfile for FastAPI Backend (optimized with UV)
# @created 2026-06-05
# @updated 2026-06-05
# 🌐 ceo.nexuspartners.xyz
# 📧 daoudaabassichristian@gmail.com
# ##################################################################

FROM python:3.13-slim-bookworm

# Copier uv depuis l'image officielle pour un build ultra-rapide
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Variables d'environnement pour Python & UV
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_LINK_MODE=copy \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Copier d'abord les fichiers de dépendances pour mettre en cache le layer de build
COPY pyproject.toml uv.lock ./

# Synchroniser les dépendances (crée automatiquement /app/.venv)
RUN uv sync --frozen --no-cache --no-install-project

# Copier le reste de l'application
COPY app ./app

# Exposer le port de l'application (Railway l'écoutera via sa variable PORT)
EXPOSE 8000

# Lancement de l'application avec Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
