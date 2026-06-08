/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Categories Management Page
 * @created 2026-05-22
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, fetcher } from '@/services/api';
import useSWR from 'swr';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { DragDropImageUploader } from '@/components/ui/DragDropImageUploader';

interface Category {
  _id?: string;
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
  img: string;
  order: number;
  seo_title_fr?: string;
  seo_title_en?: string;
  seo_desc_fr?: string;
  seo_desc_en?: string;
  seo_keywords_fr?: string;
  seo_keywords_en?: string;
}

export default function AdminCategories() {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Category>({ title_fr: '', title_en: '', desc_fr: '', desc_en: '', img: '', order: 0, seo_title_fr: '', seo_title_en: '', seo_desc_fr: '', seo_desc_en: '', seo_keywords_fr: '', seo_keywords_en: '' });
  
  const { data: categoriesData, error: catErr, mutate: mutateCategories, isLoading: loading } = useSWR('/categories', fetcher);
  const categories = categoriesData || [];
  const error = catErr ? 'Erreur lors de la récupération des catégories.' : null;

  const handleEdit = (category: Category) => {
    setIsEditing(category._id!);
    setFormData({ ...category });
  };

  const handleCreate = () => {
    setIsEditing('new');
    setFormData({ title_fr: '', title_en: '', desc_fr: '', desc_en: '', img: '', order: categories.length, seo_title_fr: '', seo_title_en: '', seo_desc_fr: '', seo_desc_en: '', seo_keywords_fr: '', seo_keywords_en: '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette catégorie ?')) return;
    try {
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Catégorie supprimée avec succès.');
      mutateCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    if (!formData.title_fr || !formData.title_en || !formData.desc_fr || !formData.desc_en || !formData.img) {
      toast.error('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      if (isEditing === 'new') {
        await api.post('/categories', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Catégorie créée avec succès.');
      } else {
        await api.put(`/categories/${isEditing}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Catégorie mise à jour avec succès.');
      }
      setIsEditing(null);
      mutateCategories();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-[40vh] text-stone-500 text-sm">Chargement des catégories...</div>;

  return (
    <div className="space-y-6 text-stone-200">
      <div className="flex justify-between items-center bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white">Catégories Phares</h2>
          <p className="text-stone-400">Gérez les sections affichées sur la page d&apos;accueil.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-xl flex items-center hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter
        </button>
      </div>

      {error && <div className="text-red-400 bg-red-950/30 p-4 rounded-xl border border-red-900/50">{error}</div>}

      {isEditing && (
        <div className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-heading font-bold mb-4 text-white">{isEditing === 'new' ? 'Nouvelle catégorie' : 'Modifier la catégorie'}</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-1">Titre (FR) *</label>
                <input 
                  type="text" 
                  value={formData.title_fr} 
                  onChange={(e) => setFormData({...formData, title_fr: e.target.value})}
                  className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white"
                  placeholder="Ex: Gravure Laser"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-1">Titre (EN) *</label>
                <input 
                  type="text" 
                  value={formData.title_en} 
                  onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                  className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white"
                  placeholder="Ex: Laser Engraving"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-1">Description (FR) *</label>
                <textarea 
                  value={formData.desc_fr} 
                  onChange={(e) => setFormData({...formData, desc_fr: e.target.value})}
                  className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white"
                  placeholder="Courte phrase d'accroche"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-300 mb-1">Description (EN) *</label>
                <textarea 
                  value={formData.desc_en} 
                  onChange={(e) => setFormData({...formData, desc_en: e.target.value})}
                  className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white"
                  placeholder="Short catchy phrase"
                  rows={2}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-1">Image de la catégorie *</label>
              <DragDropImageUploader 
                value={formData.img} 
                onChange={(url) => setFormData({...formData, img: url})} 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-1">Ordre d&apos;affichage</label>
              <input 
                type="number" 
                value={formData.order} 
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white"
              />
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <h4 className="text-lg font-heading font-bold text-white mb-4">Paramètres SEO (Optionnel)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Title (FR)</label>
                  <input type="text" value={formData.seo_title_fr || ''} onChange={(e) => setFormData({...formData, seo_title_fr: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="Titre pour Google" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Title (EN)</label>
                  <input type="text" value={formData.seo_title_en || ''} onChange={(e) => setFormData({...formData, seo_title_en: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="Google Title" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Description (FR)</label>
                  <textarea value={formData.seo_desc_fr || ''} onChange={(e) => setFormData({...formData, seo_desc_fr: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" rows={2}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Description (EN)</label>
                  <textarea value={formData.seo_desc_en || ''} onChange={(e) => setFormData({...formData, seo_desc_en: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" rows={2}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Mots-clés (FR)</label>
                  <input type="text" value={formData.seo_keywords_fr || ''} onChange={(e) => setFormData({...formData, seo_keywords_fr: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="bois, luxe, décoration" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Mots-clés (EN)</label>
                  <input type="text" value={formData.seo_keywords_en || ''} onChange={(e) => setFormData({...formData, seo_keywords_en: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="wood, luxury, decor" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
            <button 
              onClick={handleSave}
              className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-xl flex items-center hover:opacity-90 font-semibold transition-opacity"
            >
              <Save className="w-4 h-4 mr-2" /> Enregistrer
            </button>
            <button 
              onClick={() => setIsEditing(null)}
              className="bg-stone-800 text-stone-300 px-6 py-3 rounded-xl flex items-center hover:bg-stone-700 font-semibold transition-colors"
            >
              <X className="w-4 h-4 mr-2" /> Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat: Category) => (
          <div key={cat._id} className="bg-[hsl(var(--surface-light))] rounded-2xl border border-white/10 overflow-hidden group">
            <div className="relative h-48 border-b border-white/5">
              <img src={cat.img} alt={cat.title_fr} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => handleEdit(cat)}
                  className="bg-stone-900 text-stone-200 p-2 rounded-full hover:bg-stone-800 border border-white/10"
                  title="Modifier"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(cat._id!)}
                  className="bg-stone-900 text-red-400 p-2 rounded-full hover:bg-stone-850 border border-white/10"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-heading font-bold text-lg text-white">{cat.title_fr}</h3>
                <span className="text-xs bg-stone-800 text-stone-300 px-2 py-1 rounded-full border border-white/5">Ordre: {cat.order}</span>
              </div>
              <p className="text-stone-400 text-sm line-clamp-2">{cat.desc_fr}</p>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-stone-500 bg-stone-900/40 rounded-2xl border border-dashed border-white/10">
            Aucune catégorie configurée. Les catégories par défaut seront affichées sur le site.
          </div>
        )}
      </div>
    </div>
  );
}
