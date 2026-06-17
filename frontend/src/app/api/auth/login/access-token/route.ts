/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Login phone+password — remplace backend/app/api/endpoints/auth.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { createAccessToken, verifyPassword } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const POST = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');

  // Le formulaire est envoyé en FormData ou en x-www-form-urlencoded par les deux frontends
  const formData = await req.formData();
  const phone = String(formData.get('username') || '');
  const password = String(formData.get('password') || '');

  if (!phone || !password) {
    return withCors(NextResponse.json({ detail: 'Incorrect phone or password' }, { status: 400 }), origin);
  }

  const user = await prisma.user.findUnique({ where: { phone } });
  if (!user || !user.hashed_password) {
    return withCors(NextResponse.json({ detail: 'Incorrect phone or password' }, { status: 400 }), origin);
  }

  const valid = await verifyPassword(password, user.hashed_password);
  if (!valid) {
    return withCors(NextResponse.json({ detail: 'Incorrect phone or password' }, { status: 400 }), origin);
  }

  const accessToken = await createAccessToken(user.id, user.role);
  return withCors(NextResponse.json({ access_token: accessToken, token_type: 'bearer' }), origin);
});
