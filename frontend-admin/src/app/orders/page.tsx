/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Orders Management Page
 * @created 2026-05-22
 * @updated 2026-05-22
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mr-3">📦</span>
          Gestion des Commandes
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">N° Commande</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Client</th>
              <th className="p-4 font-semibold">Articles</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold text-center">Statut</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  Aucune commande pour le moment.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const oId = order._id || order.id;
                return (
                  <tr key={oId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{order.orderNumber}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-gray-900">{order.customer?.name}</div>
                      <div className="text-xs text-gray-500">{order.customer?.phone}</div>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {order.items?.length || 0} article(s)
                    </td>
                    <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                      {order.total?.toLocaleString()} FCFA
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${order.status === 'processing' ? 'bg-blue-100 text-blue-700' : ''}
                        ${order.status === 'shipped' ? 'bg-indigo-100 text-indigo-700' : ''}
                        ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {VALID_STATUSES.find(s => s.value === order.status)?.label || order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(oId as string, e.target.value)}
                        disabled={updating === oId}
                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50"
                      >
                        {VALID_STATUSES.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
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
