/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Mise à jour du statut d'une commande (admin) — remplace backend/app/api/endpoints/orders.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin, AuthError } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';

const VALID_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

type Params = { params: Promise<{ id: string }> };

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const origin = req.headers.get('origin');
  try {
    await requireAdmin(req);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }

  const { id } = await params;
  const body = await req.json();
  const status = body.status;

  if (!VALID_STATUSES.includes(status)) {
    return withCors(
      NextResponse.json({ detail: `Statut invalide. Utilisez: ${VALID_STATUSES.join(', ')}` }, { status: 400 }),
      origin
    );
  }

  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    return withCors(NextResponse.json({ detail: 'Commande non trouvée' }, { status: 404 }), origin);
  }

  if (order.status === status) {
    return withCors(NextResponse.json({ message: 'Statut inchangé', status }), origin);
  }

  await prisma.order.update({ where: { id }, data: { status } });
  return withCors(NextResponse.json({ message: 'Statut mis à jour avec succès', status }), origin);
}
