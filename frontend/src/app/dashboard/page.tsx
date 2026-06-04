/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Client Dashboard Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { useTranslation } from '@/context/LanguageContext';

interface Address {
  street: string;
  city: string;
  country: string;
  details?: string;
}

interface Profile {
  email: string;
  phone: string;
  role: string;
  created_at?: string;
  addresses?: Address[];
}

interface Order {
  _id?: string;
  id?: string;
  orderNumber: string;
  createdAt: string;
  status: string;
  total: number;
}

export default function ClientDashboard() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          api.get('/users/me', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/orders/my-orders', { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ data: [] }))
        ]);
        setProfile(profileRes.data);
        setOrders(ordersRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (loading) {
    return <div className="p-8 text-center text-stone-400 font-medium tracking-wider uppercase text-sm">{t('common.loading')}</div>;
  }

  return (
    <div className="glass-card rounded-2xl p-8 max-w-7xl mx-auto my-12">
      <h2 className="text-3xl font-heading text-[hsl(var(--text-main))] mb-2">{t('dashboard.welcome')} <span className="text-[hsl(var(--primary))]">{user?.full_name}</span></h2>
      <p className="text-stone-400 mb-8">{t('dashboard.subtitle')}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-white/10 rounded-xl p-6 bg-[hsl(var(--surface-neutral))] shadow-sm">
          <h3 className="font-semibold text-xl text-[hsl(var(--text-main))] mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] flex items-center justify-center mr-3 text-sm">👤</span>
            {t('dashboard.account_info')}
          </h3>
          <div className="space-y-3">
            <p className="text-stone-400 flex justify-between"><span className="font-medium text-[hsl(var(--text-main))]">Email</span> <span>{profile?.email || t('dashboard.not_provided')}</span></p>
            <p className="text-stone-400 flex justify-between"><span className="font-medium text-[hsl(var(--text-main))]">{t('dashboard.phone')}</span> <span>{profile?.phone}</span></p>
            <p className="text-stone-400 flex justify-between"><span className="font-medium text-[hsl(var(--text-main))]">{t('dashboard.role')}</span> <span className="capitalize">{profile?.role}</span></p>
            <p className="text-stone-400 flex justify-between"><span className="font-medium text-[hsl(var(--text-main))]">{t('dashboard.member_since')}</span> <span>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'N/A'}</span></p>
          </div>
        </div>
        
        <div className="border border-white/10 rounded-xl p-6 bg-[hsl(var(--surface-neutral))] shadow-sm">
          <h3 className="font-semibold text-xl text-[hsl(var(--text-main))] mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] flex items-center justify-center mr-3 text-sm">📍</span>
            {t('dashboard.addresses')}
          </h3>
          {profile?.addresses && profile.addresses.length > 0 ? (
            <ul className="space-y-3">
              {profile.addresses.map((addr: Address, index: number) => (
                <li key={index} className="text-stone-400 bg-black/20 p-3 rounded border border-white/5">
                  <p className="font-medium text-[hsl(var(--text-main))]">{addr.street}</p>
                  <p>{addr.city}, {addr.country}</p>
                  {addr.details && <p className="text-sm text-stone-500 mt-1">{addr.details}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-stone-400 italic mb-4">{t('dashboard.no_address')}</p>
              <button type="button" className="text-sm text-[hsl(var(--primary))] font-medium hover:text-white transition-colors">
                {t('dashboard.add_address')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Commandes */}
      <div className="mt-10 border border-white/10 rounded-xl p-6 bg-[hsl(var(--surface-neutral))] shadow-sm">
        <h3 className="font-semibold text-xl text-[hsl(var(--text-main))] mb-6 flex items-center">
          <span className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] flex items-center justify-center mr-3 text-sm">📦</span>
          {t('dashboard.orders')}
        </h3>
        
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 text-sm">
                  <th className="pb-3 font-medium">N° Commande</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((order: Order) => (
                  <tr key={order._id || order.id} className="text-stone-300 text-sm">
                    <td className="py-4 font-medium">{order.orderNumber}</td>
                    <td className="py-4">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : ''}
                        ${order.status === 'processing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
                        ${order.status === 'shipped' ? 'bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/30' : ''}
                        ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : ''}
                      `}>
                        {order.status === 'pending' && t('dashboard.status.pending')}
                        {order.status === 'processing' && t('dashboard.status.processing')}
                        {order.status === 'shipped' && t('dashboard.status.shipped')}
                        {order.status === 'delivered' && t('dashboard.status.delivered')}
                        {order.status === 'cancelled' && t('dashboard.status.cancelled')}
                        {!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(order.status) && order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-[hsl(var(--primary))]">{order.total.toLocaleString()} FCFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-stone-400 italic mb-4">{t('dashboard.no_orders')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
