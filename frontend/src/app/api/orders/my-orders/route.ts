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
import { requireUser } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';
import { toMongoLike } from '@/lib/serialize';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const user = await requireUser(req);

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: { items: true },
  });

  return withCors(NextResponse.json(orders.map(toMongoLike)), origin);
});
