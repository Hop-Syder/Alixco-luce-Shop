/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Édition/suppression d'un produit mis en avant — remplace backend/app/api/endpoints/featured_products.py
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

type Params = { params: Promise<{ id: string }> };

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function PUT(req: NextRequest, { params }: Params) {
  const origin = req.headers.get('origin');
  try {
    await requireAdmin(req);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const item = await prisma.featuredProduct.update({
      where: { id },
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
  } catch {
    return withCors(NextResponse.json({ detail: 'Featured product not found' }, { status: 404 }), origin);
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const origin = req.headers.get('origin');
  try {
    await requireAdmin(req);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }

  const { id } = await params;
  try {
    await prisma.featuredProduct.delete({ where: { id } });
    return withCors(NextResponse.json({ message: 'Featured product deleted successfully' }), origin);
  } catch {
    return withCors(NextResponse.json({ detail: 'Featured product not found' }, { status: 404 }), origin);
  }
}
