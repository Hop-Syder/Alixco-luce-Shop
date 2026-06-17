/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Catégories d'affichage homepage — remplace backend/app/api/endpoints/categories.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';
import { toMongoLike } from '@/lib/serialize';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } });
  return withCors(NextResponse.json(categories.map(toMongoLike)), origin);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const body = await req.json();
  const category = await prisma.category.create({
    data: {
      title_fr: body.title_fr,
      title_en: body.title_en,
      desc_fr: body.desc_fr,
      desc_en: body.desc_en,
      img: body.img,
      order: body.order ?? 0,
      seo_title_fr: body.seo_title_fr,
      seo_title_en: body.seo_title_en,
      seo_desc_fr: body.seo_desc_fr,
      seo_desc_en: body.seo_desc_en,
      seo_keywords_fr: body.seo_keywords_fr,
      seo_keywords_en: body.seo_keywords_en,
    },
  });

  return withCors(NextResponse.json(toMongoLike(category)), origin);
});
