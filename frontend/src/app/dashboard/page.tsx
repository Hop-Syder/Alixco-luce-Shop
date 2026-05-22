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
    return <div className="p-8 text-center text-gray-500">Chargement...</div>;
  }

  return (
    <div className="bg-white shadow rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Bienvenue, {user?.full_name}</h2>
      <p className="text-gray-500 mb-8">Gérez vos commandes, votre profil et vos adresses.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-100 rounded-xl p-6 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">👤</span>
            Informations du compte
          </h3>
          <div className="space-y-3">
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Email</span> <span>{profile?.email || 'Non renseigné'}</span></p>
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Téléphone</span> <span>{profile?.phone}</span></p>
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Rôle</span> <span className="capitalize">{profile?.role}</span></p>
            <p className="text-gray-600 flex justify-between"><span className="font-medium text-gray-700">Membre depuis</span> <span>{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'N/A'}</span></p>
          </div>
        </div>
        
        <div className="border border-gray-100 rounded-xl p-6 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-xl text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">📍</span>
            Adresses d&apos;expédition
          </h3>
          {profile?.addresses && profile.addresses.length > 0 ? (
            <ul className="space-y-3">
              {profile.addresses.map((addr: Address, index: number) => (
                <li key={index} className="text-gray-600 bg-white p-3 rounded border border-gray-200">
                  <p className="font-medium text-gray-800">{addr.street}</p>
                  <p>{addr.city}, {addr.country}</p>
                  {addr.details && <p className="text-sm text-gray-500 mt-1">{addr.details}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 italic mb-4">Aucune adresse enregistrée.</p>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-800">
                + Ajouter une adresse
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Commandes */}
      <div className="mt-10 border border-gray-100 rounded-xl p-6 bg-gray-50 shadow-sm">
        <h3 className="font-semibold text-xl text-gray-800 mb-6 flex items-center">
          <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 text-sm">📦</span>
          Historique des commandes
        </h3>
        
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 text-sm">
                  <th className="pb-3 font-medium">N° Commande</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Statut</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order: Order) => (
                  <tr key={order._id || order.id} className="text-gray-700 text-sm">
                    <td className="py-4 font-medium">{order.orderNumber}</td>
                    <td className="py-4">{new Date(order.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${order.status === 'processing' ? 'bg-blue-100 text-blue-700' : ''}
                        ${order.status === 'shipped' ? 'bg-indigo-100 text-indigo-700' : ''}
                        ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                      `}>
                        {order.status === 'pending' && 'En attente'}
                        {order.status === 'processing' && 'En traitement'}
                        {order.status === 'shipped' && 'Expédiée'}
                        {order.status === 'delivered' && 'Livrée'}
                        {order.status === 'cancelled' && 'Annulée'}
                        {!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(order.status) && order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold">{order.total.toLocaleString()} FCFA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 italic mb-4">Vous n&apos;avez passé aucune commande pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};
