/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Dashboard Page
 * @created 2026-05-22
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';

export default function AdminDashboard() {
  const { token } = useAuth();
  const [adminStatus, setAdminStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingOrders: 0,
    productsCount: 0,
    uniqueCustomers: 0
  });

  useEffect(() => {
    const checkAdminAndFetchStats = async () => {
      try {
        const [adminRes, productsRes, ordersRes] = await Promise.all([
          api.get('/users/admin-test', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          api.get('/products'),
          api.get('/orders')
        ]);
        
        setAdminStatus(adminRes.data.message);
        
        const products = productsRes.data || [];
        const orders = ordersRes.data || [];
        
        // Calculate pending orders (status is 'pending' or 'processing')
        const pending = orders.filter((o: { status: string }) => o.status === 'pending' || o.status === 'processing').length;
        
        // Calculate unique customers by phone number
        const phones = orders.map((o: { customer?: { phone?: string } }) => o.customer?.phone).filter(Boolean);
        const uniqueClients = new Set(phones).size;

        setStats({
          pendingOrders: pending,
          productsCount: products.length,
          uniqueCustomers: uniqueClients
        });
      } catch (error) {
        console.error('Error during data initialization:', error);
        setAdminStatus('Erreur de validation des droits (Accès Refusé).');
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      checkAdminAndFetchStats();
    }
  }, [token]);

  return (
    <div className="space-y-6 text-stone-200">
      <div className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Tableau de bord Admin</h2>
        <p className="text-stone-400 mb-6">{"Vue d'ensemble de l'activité"}</p>
        
        {loading ? (
          <div className="text-stone-400">Vérification des droits en cours...</div>
        ) : (
          <div className={`p-4 rounded-xl border font-medium ${
            adminStatus.includes('Erreur') 
              ? 'bg-red-950/30 text-red-400 border-red-900/50' 
              : 'bg-green-950/30 text-green-400 border-green-900/50'
          } inline-block`}>
            Statut des droits : {adminStatus}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-950/40 text-blue-400 flex items-center justify-center text-xl mr-4">
            📦
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stats.pendingOrders}</h3>
            <p className="text-stone-400 font-medium text-sm">Commandes en attente</p>
          </div>
        </div>
        
        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-950/40 text-purple-400 flex items-center justify-center text-xl mr-4">
            🛍️
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stats.productsCount}</h3>
            <p className="text-stone-400 font-medium text-sm">Produits en ligne</p>
          </div>
        </div>
        
        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-orange-950/40 text-[hsl(var(--primary))] flex items-center justify-center text-xl mr-4">
            👥
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stats.uniqueCustomers}</h3>
            <p className="text-stone-400 font-medium text-sm">Clients inscrits</p>
          </div>
        </div>

        <Link href="/products" className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center hover:border-[hsl(var(--primary))]/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-blue-950/40 text-blue-400 flex items-center justify-center text-xl mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            📦
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gérer</h3>
            <p className="text-stone-400 font-medium text-sm">Catalogue</p>
          </div>
        </Link>

        <Link href="/categories" className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center hover:border-[hsl(var(--primary))]/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-indigo-950/40 text-indigo-400 flex items-center justify-center text-xl mr-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            🏷️
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gérer</h3>
            <p className="text-stone-400 font-medium text-sm">Catégories</p>
          </div>
        </Link>

        <Link href="/featured-products" className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center hover:border-[hsl(var(--primary))]/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-amber-950/40 text-amber-400 flex items-center justify-center text-xl mr-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            ⭐
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gérer</h3>
            <p className="text-stone-400 font-medium text-sm">Mis en avant</p>
          </div>
        </Link>

        <Link href="/orders" className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center hover:border-[hsl(var(--primary))]/50 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-orange-950/40 text-orange-400 flex items-center justify-center text-xl mr-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            📋
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gérer</h3>
            <p className="text-stone-400 font-medium text-sm">Commandes</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
