/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Dashboard Page with Recharts Analytics
 * @created 2026-05-22
 * @updated 2026-06-08
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

interface AnalyticsData {
  summary: {
    totalRevenue: number;
    totalOrders: number;
  };
  monthlyData: Array<{ name: string; revenue: number; orders: number }>;
  categoryData: Array<{ name: string; value: number }>;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#f43f5e', '#14b8a6'];

export default function AdminDashboard() {
  const { token } = useAuth();
  const [adminStatus, setAdminStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  const [stats, setStats] = useState({
    pendingOrders: 0,
    productsCount: 0,
    uniqueCustomers: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [adminRes, productsRes, ordersRes, analyticsRes] = await Promise.all([
          api.get('/users/admin-test', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          api.get('/products'),
          api.get('/orders'),
          api.get('/analytics/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        
        setAdminStatus(adminRes.data.message);
        setAnalytics(analyticsRes.data);
        
        const products = productsRes.data || [];
        const orders = ordersRes.data || [];
        
        // Calculate pending orders
        const pending = orders.filter((o: { status: string }) => o.status === 'pending' || o.status === 'processing').length;
        // Calculate unique customers
        const phones = orders.map((o: { customer?: { phone?: string } }) => o.customer?.phone).filter(Boolean);
        const uniqueClients = new Set(phones).size;

        setStats({
          pendingOrders: pending,
          productsCount: products.length,
          uniqueCustomers: uniqueClients
        });
      } catch (error) {
        console.error('Error during data initialization:', error);
        setAdminStatus('Erreur de chargement (Accès Refusé ou API indisponible).');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }

  // Custom Tooltip for Line Chart
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-900 border border-white/10 p-4 rounded-xl shadow-xl">
          <p className="text-stone-300 font-bold mb-2">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name === 'revenue' ? 'Chiffre d\'Affaires' : 'Clics WhatsApp'}: 
              <span className="ml-2 font-bold text-white">
                {entry.name === 'revenue' 
                  ? `${entry.value.toLocaleString()} FCFA` 
                  : entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 text-stone-200">
      <div className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-8">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">Tableau de bord Admin</h2>
        <p className="text-stone-400 mb-6">{"Vue d'ensemble de l'activité (Analytics via Clics WhatsApp)"}</p>
        
        {loading ? (
          <div className="text-stone-400">Vérification et chargement en cours...</div>
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-emerald-950/40 text-emerald-400 flex items-center justify-center text-xl mr-4">💰</div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {analytics ? analytics.summary.totalRevenue.toLocaleString() : '...'}
            </h3>
            <p className="text-stone-400 font-medium text-xs uppercase tracking-wider">CA Généré (FCFA)</p>
          </div>
        </div>

        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-950/40 text-blue-400 flex items-center justify-center text-xl mr-4">📦</div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stats.pendingOrders}</h3>
            <p className="text-stone-400 font-medium text-xs uppercase tracking-wider">En attente</p>
          </div>
        </div>
        
        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-950/40 text-purple-400 flex items-center justify-center text-xl mr-4">🛍️</div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stats.productsCount}</h3>
            <p className="text-stone-400 font-medium text-xs uppercase tracking-wider">Produits Actifs</p>
          </div>
        </div>
        
        <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 flex items-center">
          <div className="w-12 h-12 rounded-full bg-orange-950/40 text-[hsl(var(--primary))] flex items-center justify-center text-xl mr-4">👥</div>
          <div>
            <h3 className="text-2xl font-bold text-white">{stats.uniqueCustomers}</h3>
            <p className="text-stone-400 font-medium text-xs uppercase tracking-wider">Clients (Contacts)</p>
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Line Chart: Monthly Trend */}
          <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10 lg:col-span-2">
            <h3 className="text-xl font-heading font-bold text-white mb-6">Évolution des Intentions d'Achat (CA Théorique)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis yAxisId="left" stroke="#3b82f6" tickFormatter={(value) => `${value / 1000}k`} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" tick={{fill: '#9ca3af', fontSize: 12}} />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                  <Line yAxisId="left" type="monotone" dataKey="revenue" name="Chiffre d'Affaires" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" name="Nombre de Clics WhatsApp" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Category Distribution */}
          <div className="bg-[hsl(var(--surface-light))] p-6 rounded-2xl border border-white/10">
            <h3 className="text-xl font-heading font-bold text-white mb-6">Demandes par Catégorie</h3>
            <div className="h-80 w-full flex justify-center items-center">
              {analytics.categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analytics.categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1c1917', borderColor: '#ffffff10', borderRadius: '0.75rem' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-stone-500">Données insuffisantes</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Quick Links */}
      <h3 className="text-xl font-heading font-bold text-white pt-4">Gestion Rapide</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Link href="/products" className="bg-[hsl(var(--surface-light))] p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary))]/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-blue-950/40 text-blue-400 flex items-center justify-center text-lg mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">📦</div>
          <h3 className="text-sm font-bold text-white">Produits</h3>
        </Link>

        <Link href="/categories" className="bg-[hsl(var(--surface-light))] p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary))]/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-indigo-950/40 text-indigo-400 flex items-center justify-center text-lg mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">🏷️</div>
          <h3 className="text-sm font-bold text-white">Catégories</h3>
        </Link>

        <Link href="/featured-products" className="bg-[hsl(var(--surface-light))] p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary))]/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-amber-950/40 text-amber-400 flex items-center justify-center text-lg mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">⭐</div>
          <h3 className="text-sm font-bold text-white">Mis en avant</h3>
        </Link>

        <Link href="/orders" className="bg-[hsl(var(--surface-light))] p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary))]/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-orange-950/40 text-orange-400 flex items-center justify-center text-lg mb-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">📋</div>
          <h3 className="text-sm font-bold text-white">Commandes</h3>
        </Link>
        
        <Link href="/customers" className="bg-[hsl(var(--surface-light))] p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary))]/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-emerald-950/40 text-emerald-400 flex items-center justify-center text-lg mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">👥</div>
          <h3 className="text-sm font-bold text-white">Clients</h3>
        </Link>
        
        <Link href="/home-settings" className="bg-[hsl(var(--surface-light))] p-5 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center hover:border-[hsl(var(--primary))]/50 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-teal-950/40 text-teal-400 flex items-center justify-center text-lg mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">⚙️</div>
          <h3 className="text-sm font-bold text-white">Paramètres</h3>
        </Link>
      </div>
    </div>
  );
}
