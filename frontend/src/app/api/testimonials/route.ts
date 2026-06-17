/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Témoignages clients — remplace backend/app/api/endpoints/testimonials.py
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
import { toMongoLike, paginate } from '@/lib/serialize';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const { searchParams } = req.nextUrl;
  const isFeatured = searchParams.get('is_featured');
  const isApproved = searchParams.get('is_approved');
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');
  const skip = (page - 1) * limit;

  const where: Record<string, boolean> = {};
  if (isFeatured !== null) where.is_featured = isFeatured === 'true';
  if (isApproved !== null) where.is_approved = isApproved === 'true';

  const [items, total] = await Promise.all([
    prisma.testimonial.findMany({ where, skip, take: limit, orderBy: { id: 'desc' } }),
    prisma.testimonial.count({ where }),
  ]);

  return withCors(NextResponse.json(paginate(items.map(toMongoLike), total, page, limit)), origin);
});

export const POST = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const body = await req.json();
  const testimonial = await prisma.testimonial.create({
    data: {
      name: body.name,
      role_fr: body.role_fr,
      role_en: body.role_en,
      text_fr: body.text_fr,
      text_en: body.text_en,
      rating: body.rating ?? 5,
      is_featured: body.is_featured ?? false,
      is_approved: body.is_approved ?? false,
    },
  });

  return withCors(NextResponse.json(toMongoLike(testimonial)), origin);
});
