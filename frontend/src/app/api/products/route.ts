/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Catalogue produits — remplace backend/app/api/endpoints/products.py
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
import { toMongoLike, paginate } from '@/lib/serialize';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    prisma.product.findMany({ skip, take: limit }),
    prisma.product.count(),
  ]);

  return withCors(
    NextResponse.json(paginate(items.map(toMongoLike), total, page, limit)),
    origin
  );
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const body = await req.json();
  const product = await prisma.product.create({
    data: {
      name_fr: body.name_fr,
      name_en: body.name_en,
      price: body.price,
      image: body.image,
      stock: body.stock ?? 0,
      category: body.category,
      seo_title_fr: body.seo_title_fr,
      seo_title_en: body.seo_title_en,
      seo_desc_fr: body.seo_desc_fr,
      seo_desc_en: body.seo_desc_en,
      seo_keywords_fr: body.seo_keywords_fr,
      seo_keywords_en: body.seo_keywords_en,
    },
  });

  return withCors(NextResponse.json(toMongoLike(product)), origin);
});
