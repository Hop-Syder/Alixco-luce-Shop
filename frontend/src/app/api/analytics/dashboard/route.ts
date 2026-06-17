/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Statistiques agrégées pour le dashboard admin — remplace backend/app/api/endpoints/analytics.py
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

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const orders = await prisma.order.findMany({
    where: { status: { not: 'cancelled' } },
    include: { items: { include: { product: true } } },
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  const monthlyMap = new Map<string, { revenue: number; orders: number }>();
  for (const order of orders) {
    if (order.createdAt < sixMonthsAgo) continue;
    const key = `${order.createdAt.getFullYear()}-${String(order.createdAt.getMonth() + 1).padStart(2, '0')}`;
    const entry = monthlyMap.get(key) ?? { revenue: 0, orders: 0 };
    entry.revenue += order.total;
    entry.orders += 1;
    monthlyMap.set(key, entry);
  }
  const monthlyData = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, stats]) => ({ name, ...stats }));

  const categoryMap = new Map<string, number>();
  for (const order of orders) {
    for (const item of order.items) {
      const categoryName = item.product.category;
      categoryMap.set(categoryName, (categoryMap.get(categoryName) ?? 0) + item.quantity);
    }
  }
  const categoryData = Array.from(categoryMap.entries()).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }));

  return withCors(
    NextResponse.json({
      summary: { totalRevenue, totalOrders },
      monthlyData,
      categoryData,
    }),
    origin
  );
});
