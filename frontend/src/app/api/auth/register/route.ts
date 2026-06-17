/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Inscription d'un nouvel utilisateur — remplace backend/app/api/endpoints/auth.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin');
  const body = await req.json();

  const existing = await prisma.user.findUnique({ where: { phone: body.phone } });
  if (existing) {
    return withCors(
      NextResponse.json({ detail: 'A user with this phone number already exists.' }, { status: 400 }),
      origin
    );
  }

  const user = await prisma.user.create({
    data: {
      email: body.email ?? null,
      phone: body.phone,
      full_name: body.full_name,
      role: body.role ?? 'customer',
      hashed_password: body.password ? await hashPassword(body.password) : null,
    },
  });

  return withCors(
    NextResponse.json({
      id: user.id,
      email: user.email,
      phone: user.phone,
      full_name: user.full_name,
      role: user.role,
      addresses: [],
      created_at: user.created_at,
    }),
    origin
  );
}
