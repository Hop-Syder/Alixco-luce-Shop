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
import { requireAdmin } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const user = await requireAdmin(req);
  return withCors(NextResponse.json({ message: 'You have admin privileges', user_id: user.id }), origin);
});
