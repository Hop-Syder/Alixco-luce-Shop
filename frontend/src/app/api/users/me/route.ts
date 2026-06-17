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
import { requireUser, AuthError } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import prisma from '@/lib/db';

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
}
