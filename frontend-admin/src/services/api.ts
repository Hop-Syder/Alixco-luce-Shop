/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Axios API instance with interceptors and SWR fetcher
 * @created 2026-05-22
 * @updated 2026-06-09
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import axios from 'axios';
import toast from 'react-hot-toast';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// SWR fetcher — wraps axios instance to inherit interceptors and base URL
export const fetcher = (url: string) => api.get(url).then(res => res.data);

// ────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR — Attache le token JWT à chaque requête sortante
// ────────────────────────────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ────────────────────────────────────────────────────────────────────────────
// RESPONSE INTERCEPTOR — Gestion centralisée des erreurs via Toast
// Traduit les codes HTTP en messages humains non-bloquants
// ────────────────────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.detail || error.response.data?.message;

      if (status === 401) {
        // Purge le token expiré pour éviter des boucles de requêtes invalides
        localStorage.removeItem('token');
        toast.error('Session expirée. Redirection vers la page de connexion...');
        // Délai pour que le toast soit lisible avant la redirection
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }, 1500);
      } else if (status === 422) {
        toast.error(`Erreur de validation : ${message || 'Données invalides'}`);
      } else if (status === 403) {
        toast.error("Accès refusé. Vous n'avez pas les droits nécessaires.");
      } else if (status === 404) {
        toast.error('Ressource introuvable.');
      } else if (status >= 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        toast.error(message || 'Une erreur inattendue est survenue.');
      }
    } else if (error.request) {
      toast.error('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } else {
      toast.error('Erreur de configuration de la requête.');
    }

    return Promise.reject(error);
  }
);

export default api;
