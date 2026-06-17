/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description CRM clients agrégés depuis les commandes — remplace backend/app/api/endpoints/analytics.py
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
import { paginate } from '@/lib/serialize';

interface CustomerAggregate {
  phone: string;
  name: string;
  email: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date;
}

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const { searchParams } = req.nextUrl;
  const isExport = searchParams.get('export') === 'true';
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');

  const orders = await prisma.order.findMany({
    where: { status: { not: 'cancelled' } },
    orderBy: { createdAt: 'desc' },
  });

  const byPhone = new Map<string, CustomerAggregate>();
  for (const order of orders) {
    const existing = byPhone.get(order.customerPhone);
    if (existing) {
      existing.totalOrders += 1;
      existing.totalSpent += order.total;
      if (order.createdAt > existing.lastOrderDate) existing.lastOrderDate = order.createdAt;
    } else {
      byPhone.set(order.customerPhone, {
        phone: order.customerPhone,
        name: order.customerName || 'Inconnu',
        email: order.customerEmail || '',
        address: order.customerAddress || '',
        totalOrders: 1,
        totalSpent: order.total,
        lastOrderDate: order.createdAt,
      });
    }
  }

  const customers = Array.from(byPhone.values()).sort(
    (a, b) => b.lastOrderDate.getTime() - a.lastOrderDate.getTime()
  );

  if (isExport) {
    return withCors(NextResponse.json(customers), origin);
  }

  const total = customers.length;
  const skip = (page - 1) * limit;
  const items = customers.slice(skip, skip + limit);

  return withCors(NextResponse.json(paginate(items, total, page, limit)), origin);
});
