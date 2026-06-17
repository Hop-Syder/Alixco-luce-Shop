/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Produits mis en avant (homepage) — remplace backend/app/api/endpoints/featured_products.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin, AuthError } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { toMongoLike } from '@/lib/serialize';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  const items = await prisma.featuredProduct.findMany({ orderBy: { order: 'asc' } });
  return withCors(NextResponse.json(items.map(toMongoLike)), origin);
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    await requireAdmin(req);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }

  const body = await req.json();
  const item = await prisma.featuredProduct.create({
    data: {
      name_fr: body.name_fr,
      name_en: body.name_en,
      price_fr: body.price_fr,
      price_en: body.price_en,
      badge_fr: body.badge_fr,
      badge_en: body.badge_en,
      img: body.img,
      order: body.order ?? 0,
    },
  });

  return withCors(NextResponse.json(toMongoLike(item)), origin);
}
