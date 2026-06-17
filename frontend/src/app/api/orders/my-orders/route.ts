/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Commandes de l'utilisateur connecté — remplace backend/app/api/endpoints/orders.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireUser, AuthError } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { toMongoLike } from '@/lib/serialize';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  let user;
  try {
    user = await requireUser(req);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { items: true },
  });

  return withCors(NextResponse.json(orders.map(toMongoLike)), origin);
}
