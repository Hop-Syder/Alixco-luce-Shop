/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Génération de robots.txt — référence le sitemap dynamique
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import type { MetadataRoute } from 'next';

const SITE_URL = 'https://alixcoluxe.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
