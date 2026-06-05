/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Home Page Settings Editor (Hero & Promo)
 * @created 2026-06-05
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Save, ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface HeroSettings {
  title_highlight: string;
  title_main: string;
  subtitle: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  image_3d: string;
  image_bg: string;
}

interface PromoSettings {
  title: string;
  subtitle: string;
  description: string;
  discount_tag: string;
  cta_text: string;
  cta_link: string;
  image: string;
}

interface HomePageSettings {
  hero: HeroSettings;
  promo: PromoSettings;
}

export default function HomeSettingsEditor() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<HomePageSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/page-settings/home');
        setSettings(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des configurations:', error);
        toast.error('Erreur lors du chargement des configurations.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleHeroChange = (field: keyof HeroSettings, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      hero: {
        ...settings.hero,
        [field]: value
      }
    });
  };

  const handlePromoChange = (field: keyof PromoSettings, value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      promo: {
        ...settings.promo,
        [field]: value
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    const savePromise = api.put('/page-settings/home', settings, {
      headers: { Authorization: `Bearer ${token}` }
    });

    toast.promise(savePromise, {
      loading: 'Enregistrement des modifications...',
      success: 'Configuration de la page d\'accueil mise à jour !',
      error: 'Erreur lors de la sauvegarde.'
    });

    try {
      const response = await savePromise;
      setSettings(response.data);
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-stone-500 font-medium">
        Chargement de la configuration de la page d&apos;accueil...
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-red-500 bg-red-50 p-6 rounded-2xl border border-red-100 max-w-xl mx-auto text-center">
        Impossible de charger les données de la page d&apos;accueil.
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-6xl mx-auto pb-12">
      
      {/* En-tête de la Page */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow rounded-2xl p-6 gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-stone-100 rounded-xl transition-colors">
            <ArrowLeft className="w-5 h-5 text-stone-500" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[hsl(var(--primary))]" />
              Édition Page d&apos;accueil
            </h2>
            <p className="text-gray-500">Personnalisez les textes, images et actions du site vitrine.</p>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-xl flex items-center hover:opacity-90 font-semibold transition-opacity disabled:opacity-50"
        >
          <Save className="w-5 h-5 mr-2" /> Enregistrer les changements
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLONNE GAUCHE : SECTION HERO */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Bloc Hero */}
          <div className="bg-white rounded-2xl shadow p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-stone-800 border-b pb-3 border-stone-100">
              1. Section principale (Hero Banner)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Titre surligné (Or)</label>
                <input
                  type="text"
                  value={settings.hero.title_highlight}
                  onChange={(e) => handleHeroChange('title_highlight', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  placeholder="Ex: Personnalisation"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Titre principal</label>
                <input
                  type="text"
                  value={settings.hero.title_main}
                  onChange={(e) => handleHeroChange('title_main', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  placeholder="Ex: L'Art de la"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Sous-titre (Laser)</label>
                <input
                  type="text"
                  value={settings.hero.subtitle}
                  onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  placeholder="Ex: Gravure & Découpe au Laser"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Texte de description</label>
                <textarea
                  value={settings.hero.description}
                  onChange={(e) => handleHeroChange('description', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50 h-28 resize-none"
                  placeholder="Description détaillée de l'entreprise..."
                  required
                />
              </div>
            </div>

            <div className="border-t pt-6 border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-4">Bouton Principal (CTA Or)</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Libellé du bouton</label>
                    <input
                      type="text"
                      value={settings.hero.cta_primary_text}
                      onChange={(e) => handleHeroChange('cta_primary_text', e.target.value)}
                      className="w-full border border-stone-100 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Lien de redirection</label>
                    <input
                      type="text"
                      value={settings.hero.cta_primary_link}
                      onChange={(e) => handleHeroChange('cta_primary_link', e.target.value)}
                      className="w-full border border-stone-100 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-800 mb-4">Bouton Secondaire (CTA Sombre)</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Libellé du bouton</label>
                    <input
                      type="text"
                      value={settings.hero.cta_secondary_text}
                      onChange={(e) => handleHeroChange('cta_secondary_text', e.target.value)}
                      className="w-full border border-stone-100 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Lien de redirection</label>
                    <input
                      type="text"
                      value={settings.hero.cta_secondary_link}
                      onChange={(e) => handleHeroChange('cta_secondary_link', e.target.value)}
                      className="w-full border border-stone-100 rounded-lg p-2.5 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bloc Promotion */}
          <div className="bg-white rounded-2xl shadow p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-stone-800 border-b pb-3 border-stone-100">
              2. Section promotionnelle (Offre Spéciale)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Titre de l&apos;offre</label>
                <input
                  type="text"
                  value={settings.promo.title}
                  onChange={(e) => handlePromoChange('title', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Sous-titre (Réduction / Offre)</label>
                <input
                  type="text"
                  value={settings.promo.subtitle}
                  onChange={(e) => handlePromoChange('subtitle', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Badge promotionnel</label>
                <input
                  type="text"
                  value={settings.promo.discount_tag}
                  onChange={(e) => handlePromoChange('discount_tag', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  placeholder="Ex: Offre Limitée"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Action (Lien CTA)</label>
                <input
                  type="text"
                  value={settings.promo.cta_link}
                  onChange={(e) => handlePromoChange('cta_link', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Texte d&apos;action (CTA)</label>
                <input
                  type="text"
                  value={settings.promo.cta_text}
                  onChange={(e) => handlePromoChange('cta_text', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-700 mb-2">Description promotionnelle</label>
                <textarea
                  value={settings.promo.description}
                  onChange={(e) => handlePromoChange('description', e.target.value)}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50 h-24 resize-none"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : IMAGES & RENDUS */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Images Hero */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            <h3 className="text-md font-bold text-stone-800 border-b pb-3 border-stone-100">
              Médias du Hero
            </h3>
            
            {/* Image de la carte 3D */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-700">Image interactive 3D (URL ou Local)</label>
              <input
                type="text"
                value={settings.hero.image_3d}
                onChange={(e) => handleHeroChange('image_3d', e.target.value)}
                className="w-full border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                required
              />
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-stone-100 bg-stone-100 flex items-center justify-center">
                {settings.hero.image_3d ? (
                  <img src={settings.hero.image_3d} alt="Aperçu 3D" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>
            </div>

            {/* Image de fond */}
            <div className="space-y-3 border-t pt-6 border-stone-100">
              <label className="block text-xs font-semibold text-stone-700">Image de fond (URL ou Local)</label>
              <input
                type="text"
                value={settings.hero.image_bg}
                onChange={(e) => handleHeroChange('image_bg', e.target.value)}
                className="w-full border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                required
              />
              <div className="relative h-24 rounded-lg overflow-hidden border border-stone-100 bg-stone-100 flex items-center justify-center">
                {settings.hero.image_bg ? (
                  <img src={settings.hero.image_bg} alt="Aperçu fond" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>
            </div>
          </div>

          {/* Image Promo */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-6">
            <h3 className="text-md font-bold text-stone-800 border-b pb-3 border-stone-100">
              Média de la Promo
            </h3>
            
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-700">Image de fond promo (URL)</label>
              <input
                type="text"
                value={settings.promo.image}
                onChange={(e) => handlePromoChange('image', e.target.value)}
                className="w-full border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-stone-50"
                required
              />
              <div className="relative h-36 rounded-xl overflow-hidden border border-stone-100 bg-stone-100 flex items-center justify-center">
                {settings.promo.image ? (
                  <img src={settings.promo.image} alt="Aperçu Promo" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>
            </div>
          </div>
        </div>

      </div>

    </form>
  );
}
