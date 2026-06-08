/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Customers CRM Page (Mini-CRM)
 * @created 2026-06-08
 * @updated 2026-06-08
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, fetcher } from '@/services/api';
import useSWR from 'swr';
import { Download, Search, Users, ExternalLink, CalendarDays, ShoppingCart, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { Pagination } from '@/components/ui/Pagination';

interface Customer {
  phone: string;
  name: string;
  email: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export default function CustomersCRMPage() {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;
  const [isExporting, setIsExporting] = useState(false);

  const { data: customersData, isLoading: loading } = useSWR(`/analytics/customers?page=${page}&limit=${limit}`, fetcher);
  const customers: Customer[] = customersData?.items || [];
  const totalPages = customersData?.total_pages || 1;

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone?.includes(searchTerm) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = async () => {
    setIsExporting(true);
    try {
      const response = await api.get('/analytics/customers', {
        headers: { Authorization: `Bearer ${token}` },
        params: { export: true }
      });
      const allCustomers: Customer[] = response.data;

      if (allCustomers.length === 0) {
        toast.error('Aucune donnée à exporter');
        return;
      }

      const headers = ['Nom', 'Email', 'Téléphone', 'Adresse', 'Total Commandes', 'Total Dépensé (FCFA)', 'Dernière Commande'];
      
      const csvContent = [
        headers.join(','),
        ...allCustomers.map(c => [
          `"${c.name?.replace(/"/g, '""') || ''}"`,
          `"${c.email?.replace(/"/g, '""') || ''}"`,
          `"${c.phone?.replace(/"/g, '""') || ''}"`,
          `"${c.address?.replace(/"/g, '""') || ''}"`,
          c.totalOrders,
          c.totalSpent,
          `"${new Date(c.lastOrderDate).toLocaleDateString()}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `clients_alixcoluxe_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Fichier CSV généré avec succès !');
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'export CSV.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 text-stone-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6 md:p-8">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-[hsl(var(--primary))]" />
            Clients (Mini-CRM)
          </h2>
          <p className="text-stone-400 mt-2">Gérez vos contacts et analysez l'historique de vos acheteurs.</p>
        </div>
        
        <button 
          onClick={exportCSV}
          disabled={isExporting}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-medium transition-colors border border-emerald-500/50 hover:border-emerald-400/50 shadow-lg shadow-emerald-900/20 disabled:opacity-50"
        >
          {isExporting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Download className="w-5 h-5" />
          )}
          Exporter CSV Complet
        </button>
      </div>

      <div className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, email, téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-stone-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[hsl(var(--primary))] focus:ring-1 focus:ring-[hsl(var(--primary))]/50 transition-all"
            />
          </div>
          <div className="text-sm font-medium text-stone-400 bg-stone-900/50 px-4 py-2 rounded-lg border border-white/5">
            {filteredCustomers.length} client(s) trouvé(s)
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-900/80 text-stone-400 border-b border-white/10 text-sm tracking-wide">
                <th className="p-4 font-semibold">Client</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Commandes</th>
                <th className="p-4 font-semibold">Total Dépensé</th>
                <th className="p-4 font-semibold">Dernière Activité</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-[hsl(var(--primary))] border-t-transparent rounded-full animate-spin mb-4"></div>
                      Chargement des clients...
                    </div>
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-stone-500">
                    Aucun client trouvé.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white mb-1">{customer.name}</div>
                      <div className="text-xs text-stone-500 max-w-[200px] truncate" title={customer.address}>
                        {customer.address || 'Aucune adresse'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-stone-300 font-medium">{customer.phone}</div>
                      <div className="text-stone-500 text-xs mt-0.5">{customer.email || 'Pas d\'email'}</div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-800/50">
                        {customer.totalOrders} cmd
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-[hsl(var(--primary))] font-bold">
                        {customer.totalSpent.toLocaleString()} <span className="text-xs font-normal">FCFA</span>
                      </div>
                    </td>
                    <td className="p-4 text-stone-400">
                      {new Date(customer.lastOrderDate).toLocaleDateString('fr-FR', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs bg-emerald-950/40 text-emerald-400 px-3 py-2 rounded-lg font-medium hover:bg-emerald-900/60 hover:text-emerald-300 transition-colors border border-emerald-900/50"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Contacter
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && totalPages > 1 && (
          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        )}
      </div>
    </div>
  );
}
