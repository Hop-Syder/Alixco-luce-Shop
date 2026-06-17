/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Configuration éditoriale de la page d'accueil — remplace backend/app/api/endpoints/page_settings.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin, AuthError } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';

const HOME_SETTINGS_KEY = 'home_page';

const DEFAULT_HOME_SETTINGS = {
  hero: {
    title_highlight: 'Personnalisation',
    title_main: "L'Art de la",
    subtitle: 'Gravure & Découpe au Laser',
    description:
      'Créations uniques et gravures sur-mesure de haute précision pour sublimer vos objets du quotidien et vos cadeaux d\'exception.',
    cta_primary_text: 'Découvrir la Collection',
    cta_primary_link: '/products',
    cta_secondary_text: 'En savoir plus',
    cta_secondary_link: '/about',
    image_3d: '/header-droit.jpeg',
    image_bg: '/hearder.jpg',
  },
  promo: {
    title: 'Collection Éphémère',
    subtitle: '-20% sur la Décoration',
    description:
      'Découvrez des pièces gravées exclusives en édition très limitée. Offre valable jusqu\'à épuisement des stocks.',
    discount_tag: 'Offre Limitée',
    cta_text: "Profiter de l'offre",
    cta_link: '/products?collection=limited',
    image: '/background.jpg',
  },
};

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const setting = await prisma.setting.findUnique({ where: { key: HOME_SETTINGS_KEY } });
  return withCors(NextResponse.json(setting ? setting.value : DEFAULT_HOME_SETTINGS), origin);
}

export async function PUT(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    await requireAdmin(req);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }

  const body = await req.json();
  const value = { hero: body.hero, promo: body.promo };

  const setting = await prisma.setting.upsert({
    where: { key: HOME_SETTINGS_KEY },
    update: { value },
    create: { key: HOME_SETTINGS_KEY, value },
  });

  return withCors(NextResponse.json(setting.value), origin);
}
