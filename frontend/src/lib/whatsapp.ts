/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Génération du message WhatsApp de commande — port 1:1 de build_whatsapp_message (backend/app/api/endpoints/orders.py)
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { randomUUID } from 'crypto';
import prisma from '@/lib/db';

export async function getWhatsappNumber(): Promise<string> {
  const setting = await prisma.setting.findUnique({ where: { key: 'whatsapp_number' } });
  if (setting && typeof setting.value === 'string') return setting.value;
  return process.env.WHATSAPP_NUMBER || '';
}

export interface WhatsappOrderItem {
  productId: string;
  quantity: number;
  notes?: string;
}

export interface WhatsappOrderInput {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: WhatsappOrderItem[];
  total: number;
  createdAt: Date;
}

export function generateOrderNumber(): string {
  const digits = BigInt('0x' + randomUUID().replace(/-/g, '')).toString().slice(0, 4);
  return `ALX-${digits}`;
}

export function buildWhatsappMessage(order: WhatsappOrderInput): string {
  const lines: string[] = [];
  lines.push('🛍️ *NOUVELLE COMMANDE ALIXCO LUXE*');
  lines.push(`Numéro de commande : ${order.orderNumber}`);
  lines.push('');
  lines.push('*Informations client :*');
  lines.push(`Nom : ${order.customerName}`);
  lines.push(`Téléphone : ${order.customerPhone}`);
  lines.push(`Adresse de livraison : ${order.customerAddress}`);
  lines.push('');
  lines.push('*Détail des articles :*');

  for (const item of order.items) {
    const notesStr = item.notes ? ` (Notes: ${item.notes})` : '';
    lines.push(`- Produit ID ${item.productId} x${item.quantity}${notesStr}`);
  }

  lines.push('');
  const formattedTotal = Math.round(order.total).toLocaleString('fr-FR').replace(/ |,/g, ' ');
  lines.push(`*Total général : ${formattedTotal} FCFA*`);
  lines.push('');

  const dateStr = new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(order.createdAt);
  lines.push(`_${dateStr}_`);
  lines.push('_En attente de confirmation_');

  return encodeURIComponent(lines.join('\n'));
}
