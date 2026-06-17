/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Vérification des privilèges admin — remplace backend/app/api/endpoints/users.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, AuthError } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin');
  try {
    const user = await requireAdmin(req);
    return withCors(NextResponse.json({ message: 'You have admin privileges', user_id: user.id }), origin);
  } catch (err) {
    if (err instanceof AuthError) return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
    throw err;
  }
}
