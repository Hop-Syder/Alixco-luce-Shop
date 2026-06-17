/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Profil utilisateur connecté — remplace backend/app/api/endpoints/users.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';
import prisma from '@/lib/db';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const user = await requireUser(req);

  const fullUser = await prisma.user.findUnique({ where: { id: user.id }, include: { addresses: true } });
  return withCors(
    NextResponse.json({
      id: user.id,
      email: user.email,
      phone: user.phone,
      full_name: user.full_name,
      role: user.role,
      addresses: fullUser?.addresses ?? [],
      created_at: fullUser?.created_at,
    }),
    origin
  );
});
