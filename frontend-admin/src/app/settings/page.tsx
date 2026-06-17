/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Paramètres généraux — numéro WhatsApp de réception des commandes
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Save, Phone, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings/whatsapp', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const number = response.data.whatsapp_number || '';
        setWhatsappNumber(number && !number.startsWith('+') ? `+${number}` : number);
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        toast.error('Erreur lors du chargement des paramètres.');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchSettings();
  }, [token]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const loadingToast = toast.loading('Enregistrement...');

    try {
      const response = await api.put('/settings/whatsapp', { whatsapp_number: whatsappNumber }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWhatsappNumber(response.data.whatsapp_number);
      toast.success('Numéro WhatsApp mis à jour !', { id: loadingToast });
    } catch (error: unknown) {
      console.error('Erreur de sauvegarde:', error);
      const e = error as { response?: { data?: { detail?: string } } };
      toast.error(e?.response?.data?.detail || 'Erreur lors de la sauvegarde.', { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-stone-500 font-medium">
        Chargement des paramètres...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-12 text-stone-200">
      <div className="mb-8">
        <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[hsl(var(--primary))]" />
          Paramètres
        </h2>
        <p className="text-stone-400">Configuration générale de la boutique.</p>
      </div>

      <form onSubmit={handleSave} className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-heading font-bold text-white border-b pb-3 border-white/10 flex items-center gap-2">
          <Phone className="w-5 h-5 text-[hsl(var(--primary))]" />
          Numéro WhatsApp de réception des commandes
        </h3>
        <p className="text-sm text-stone-400">
          Toutes les commandes passées sur la boutique seront envoyées via WhatsApp à ce numéro, au format international (ex: +2290197412933).
        </p>

        <div>
          <label className="block text-sm font-semibold text-stone-300 mb-2">Numéro WhatsApp</label>
          <input
            type="tel"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white"
            placeholder="+2290197412933"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-xl flex items-center hover:opacity-90 font-semibold transition-opacity disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" /> Enregistrer
        </button>
      </form>
    </div>
  );
}
