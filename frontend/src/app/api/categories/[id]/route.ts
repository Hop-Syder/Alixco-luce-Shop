/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Édition/suppression d'une catégorie — remplace backend/app/api/endpoints/categories.py
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

type Params = { params: Promise<{ id: string }> };

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const PUT = withErrorHandling<Params>(async (req, { params }) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const { id } = await params;
  const body = await req.json();

  try {
    const category = await prisma.category.update({
      where: { id },
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
  } catch {
    return withCors(NextResponse.json({ detail: 'Category not found' }, { status: 404 }), origin);
  }
});

export const DELETE = withErrorHandling<Params>(async (req, { params }) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const { id } = await params;
  try {
    await prisma.category.delete({ where: { id } });
    return withCors(NextResponse.json({ message: 'Category deleted successfully' }), origin);
  } catch {
    return withCors(NextResponse.json({ detail: 'Category not found' }, { status: 404 }), origin);
  }
});
