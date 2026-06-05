/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Orders Management Page
 * @created 2026-05-22
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';

const VALID_STATUSES = [
  { value: 'pending', label: 'En attente' },
  { value: 'processing', label: 'En traitement' },
  { value: 'shipped', label: 'Expédiée' },
  { value: 'delivered', label: 'Livrée' },
  { value: 'cancelled', label: 'Annulée' }
];

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  _id?: string;
  id?: string;
  orderNumber: string;
  createdAt: string;
  customer?: { name: string; phone: string; email?: string };
  items?: OrderItem[];
  total: number;
  status: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchOrders();
  }, []);


  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      setUpdating(orderId);
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      
      // Update local state
      setOrders(orders.map(order => 
        (order._id === orderId || order.id === orderId) 
          ? { ...order, status: newStatus } 
          : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erreur lors de la mise à jour du statut.');
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Chargement des commandes...</div>;
  }

  return (
    <div className="bg-[hsl(var(--surface-light))] rounded-2xl border border-white/10 overflow-hidden text-stone-200">
      <div className="p-6 border-b border-white/10 flex justify-between items-center bg-stone-950/40">
        <h2 className="text-xl font-heading font-bold text-white flex items-center">
          <span className="w-8 h-8 rounded-lg bg-orange-950/50 text-[hsl(var(--primary))] flex items-center justify-center mr-3">📦</span>
          Gestion des Commandes
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-950/40 border-b border-white/10 text-stone-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">N° Commande</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Client</th>
              <th className="p-4 font-semibold">Articles</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold text-center">Statut</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-stone-500">
                  Aucune commande pour le moment.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const oId = order._id || order.id;
                return (
                  <tr key={oId} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{order.orderNumber}</td>
                    <td className="p-4 text-sm text-stone-300">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-white">{order.customer?.name}</div>
                      <div className="text-xs text-stone-400">{order.customer?.phone}</div>
                    </td>
                    <td className="p-4 text-sm text-stone-300">
                      {order.items?.length || 0} article(s)
                    </td>
                    <td className="p-4 font-bold text-white whitespace-nowrap">
                      {order.total?.toLocaleString()} FCFA
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border
                        ${order.status === 'pending' ? 'bg-yellow-950/30 text-yellow-400 border-yellow-900/30' : ''}
                        ${order.status === 'processing' ? 'bg-blue-950/30 text-blue-400 border-blue-900/30' : ''}
                        ${order.status === 'shipped' ? 'bg-indigo-950/30 text-indigo-400 border-indigo-900/30' : ''}
                        ${order.status === 'delivered' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/30' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-950/30 text-red-400 border-red-900/30' : ''}
                      `}>
                        {VALID_STATUSES.find(s => s.value === order.status)?.label || order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(oId as string, e.target.value)}
                        disabled={updating === oId}
                        className="text-sm border border-white/10 rounded-md bg-[hsl(var(--surface-neutral))] text-white focus:border-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] disabled:opacity-50"
                      >
                        {VALID_STATUSES.map(s => (
                          <option key={s.value} value={s.value} className="bg-stone-900 text-white">{s.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
