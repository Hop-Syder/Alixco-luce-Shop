/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Détail/édition/suppression d'un produit — remplace backend/app/api/endpoints/products.py
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

export async function GET(req: NextRequest, { params }: Params) {
  const origin = req.headers.get('origin');
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return withCors(NextResponse.json({ detail: 'Product not found' }, { status: 404 }), origin);
  return withCors(NextResponse.json(toMongoLike(product)), origin);
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
  const updateData = Object.fromEntries(Object.entries(body).filter(([, v]) => v !== null && v !== undefined));

  try {
    const product = await prisma.product.update({ where: { id }, data: updateData });
    return withCors(NextResponse.json(toMongoLike(product)), origin);
  } catch {
    return withCors(NextResponse.json({ detail: 'Product not found' }, { status: 404 }), origin);
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
    await prisma.product.delete({ where: { id } });
    return withCors(NextResponse.json({ message: 'Product deleted successfully' }), origin);
  } catch {
    return withCors(NextResponse.json({ detail: 'Product not found' }, { status: 404 }), origin);
  }
}
