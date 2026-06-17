/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Numéro WhatsApp de réception des commandes (table Setting, clé "whatsapp_number")
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';

const SETTING_KEY = 'whatsapp_number';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const setting = await prisma.setting.findUnique({ where: { key: SETTING_KEY } });
  const whatsapp_number = setting && typeof setting.value === 'string' ? setting.value : (process.env.WHATSAPP_NUMBER || '');

  return withCors(NextResponse.json({ whatsapp_number }), origin);
});

export const PUT = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const body = await req.json();
  const whatsapp_number = String(body.whatsapp_number ?? '').trim();

  if (!/^\+?[0-9]{8,15}$/.test(whatsapp_number)) {
    return withCors(
      NextResponse.json({ detail: 'Numéro invalide. Utilisez le format international, ex: +2290197412933' }, { status: 400 }),
      origin
    );
  }

  // Stocké sans le "+" pour rester compatible avec le format attendu par l'URL wa.me
  const normalized = whatsapp_number.replace(/^\+/, '');

  const setting = await prisma.setting.upsert({
    where: { key: SETTING_KEY },
    update: { value: normalized },
    create: { key: SETTING_KEY, value: normalized },
  });

  return withCors(NextResponse.json({ whatsapp_number: setting.value }), origin);
});
