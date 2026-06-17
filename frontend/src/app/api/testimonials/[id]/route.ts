/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Édition/suppression d'un témoignage — remplace backend/app/api/endpoints/testimonials.py
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
import { toMongoLike } from '@/lib/serialize';

type Params = { params: Promise<{ id: string }> };

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const PUT = withErrorHandling<Params>(async (req, { params }) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const { id } = await params;
  const body = await req.json();
  const updateData = Object.fromEntries(Object.entries(body).filter(([, v]) => v !== null && v !== undefined));

  if (Object.keys(updateData).length === 0) {
    return withCors(NextResponse.json({ detail: 'No fields to update' }, { status: 400 }), origin);
  }

  try {
    const testimonial = await prisma.testimonial.update({ where: { id }, data: updateData });
    return withCors(NextResponse.json(toMongoLike(testimonial)), origin);
  } catch {
    return withCors(NextResponse.json({ detail: 'Testimonial not found' }, { status: 404 }), origin);
  }
});

export const DELETE = withErrorHandling<Params>(async (req, { params }) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const { id } = await params;
  try {
    await prisma.testimonial.delete({ where: { id } });
    return withCors(NextResponse.json({ message: 'Testimonial deleted successfully' }), origin);
  } catch {
    return withCors(NextResponse.json({ detail: 'Testimonial not found' }, { status: 404 }), origin);
  }
});
