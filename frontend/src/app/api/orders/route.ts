/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Création et listing des commandes — remplace backend/app/api/endpoints/orders.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { requireAdmin, getOptionalCurrentUser } from '@/lib/auth';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';
import { toMongoLike } from '@/lib/serialize';
import { buildWhatsappMessage, generateOrderNumber, getWhatsappNumber } from '@/lib/whatsapp';

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const GET = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  await requireAdmin(req);

  const { searchParams } = req.nextUrl;
  const skip = Number(searchParams.get('skip') || '0');
  const limit = Number(searchParams.get('limit') || '100');

  const orders = await prisma.order.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { items: true },
  });

  return withCors(NextResponse.json(orders.map(toMongoLike)), origin);
});

interface OrderItemInput {
  productId: string;
  quantity: number;
  notes?: string;
}

export const POST = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const body = await req.json();
  const items: OrderItemInput[] = body.items;
  const customer = body.customer;

  if (!Array.isArray(items) || items.length === 0) {
    return withCors(NextResponse.json({ detail: 'La commande doit contenir au moins un article.' }, { status: 400 }), origin);
  }
  if (!customer?.name || !customer?.phone || !customer?.address) {
    return withCors(NextResponse.json({ detail: 'Nom, téléphone et adresse du client sont requis.' }, { status: 400 }), origin);
  }

  const currentUser = await getOptionalCurrentUser(req);
  const userId = currentUser?.id ?? body.userId ?? null;

  let total = 0;
  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) {
      return withCors(NextResponse.json({ detail: `Produit non trouvé : ${item.productId}` }, { status: 400 }), origin);
    }
    if (product.stock < item.quantity) {
      return withCors(
        NextResponse.json({ detail: `Stock insuffisant pour le produit : ${product.name_fr}` }, { status: 400 }),
        origin
      );
    }
    total += product.price * item.quantity;
  }

  const orderNumber = generateOrderNumber();
  const now = new Date();
  const whatsappMessage = buildWhatsappMessage({
    orderNumber,
    customerName: customer.name,
    customerPhone: customer.phone,
    customerAddress: customer.address,
    items,
    total,
    createdAt: now,
  });

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        orderNumber,
        userId,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerAddress: customer.address,
        total,
        status: 'pending',
        whatsappMessage,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes ?? '',
          })),
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return created;
  });

  const waUrl = `https://wa.me/${await getWhatsappNumber()}?text=${whatsappMessage}`;

  return withCors(
    NextResponse.json({ orderId: order.id, orderNumber: order.orderNumber, whatsappUrl: waUrl }),
    origin
  );
});
