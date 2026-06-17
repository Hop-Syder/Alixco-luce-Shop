/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Testimonials Management Page
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
import { Plus, Edit2, Trash2, X, Save, MessageSquare, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Pagination } from '@/components/ui/Pagination';

interface Testimonial {
  _id?: string;
  name: string;
  role_fr: string;
  role_en: string;
  text_fr: string;
  text_en: string;
  rating: number;
  is_featured: boolean;
  is_approved: boolean;
}

export default function AdminTestimonials() {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: testimonialsData, isLoading: loading, mutate: fetchTestimonials } = useSWR(`/testimonials?page=${page}&limit=${limit}`, fetcher);
  const testimonials: Testimonial[] = testimonialsData?.items || [];
  const totalPages = testimonialsData?.total_pages || 1;
  
  const [formData, setFormData] = useState<Testimonial>({
    name: '',
    role_fr: '',
    role_en: '',
    text_fr: '',
    text_en: '',
    rating: 5,
    is_featured: false,
    is_approved: true
  });

  const handleEdit = (item: Testimonial) => {
    setIsEditing(item._id!);
    setFormData({ ...item });
  };

  const handleCreate = () => {
    setIsEditing('new');
    setFormData({ name: '', role_fr: '', role_en: '', text_fr: '', text_en: '', rating: 5, is_featured: false, is_approved: true });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce témoignage ?')) return;
    try {
      await api.delete(`/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
      toast.success('Témoignage supprimé.');
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la suppression.');
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.text_fr || !formData.text_en) {
      toast.error('Veuillez remplir le nom et le texte.');
      return;
    }
    
    try {
      if (isEditing === 'new') {
        await api.post('/testimonials', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.put(`/testimonials/${isEditing}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsEditing(null);
      fetchTestimonials();
      toast.success('Témoignage enregistré.');
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la sauvegarde.');
    }
  };

  const toggleApproval = async (item: Testimonial) => {
    try {
      await api.put(`/testimonials/${item._id}`, { ...item, is_approved: !item.is_approved }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch {
      toast.error('Erreur lors de la modification.');
    }
  };

  const toggleFeatured = async (item: Testimonial) => {
    try {
      await api.put(`/testimonials/${item._id}`, { ...item, is_featured: !item.is_featured }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch {
      toast.error('Erreur lors de la modification.');
    }
  };

  if (loading) return <div className="text-stone-500 flex justify-center py-20">Chargement...</div>;

  return (
    <div className="space-y-6 text-stone-200">
      <div className="flex justify-between items-center bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-[hsl(var(--primary))]" /> Témoignages
          </h2>
          <p className="text-stone-400">Gérez les avis affichés sur la page d'accueil.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-xl flex items-center hover:opacity-90 transition-opacity font-medium"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter un avis
        </button>
      </div>

      {isEditing && (
        <div className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-heading font-bold mb-4 text-white">{isEditing === 'new' ? 'Nouveau Témoignage' : 'Modifier le Témoignage'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-1">Nom du client *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-1">Note (sur 5)</label>
              <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value) || 5})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-1">Rôle / Titre (FR)</label>
              <input type="text" value={formData.role_fr} onChange={(e) => setFormData({...formData, role_fr: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="Client(e) fidèle" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-300 mb-1">Rôle / Titre (EN)</label>
              <input type="text" value={formData.role_en} onChange={(e) => setFormData({...formData, role_en: e.target.value})} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="Loyal customer" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-300 mb-1">Texte de l'avis (FR) *</label>
              <textarea value={formData.text_fr} onChange={(e) => setFormData({...formData, text_fr: e.target.value})} rows={3} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-300 mb-1">Texte de l'avis (EN) *</label>
              <textarea value={formData.text_en} onChange={(e) => setFormData({...formData, text_en: e.target.value})} rows={3} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" />
            </div>

            <div className="md:col-span-2 flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                <input type="checkbox" checked={formData.is_approved} onChange={(e) => setFormData({...formData, is_approved: e.target.checked})} className="rounded text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] bg-stone-900 border-white/10" />
                Approuvé (Visible publiquement)
              </label>
              <label className="flex items-center gap-2 text-stone-300 cursor-pointer">
                <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({...formData, is_featured: e.target.checked})} className="rounded text-[hsl(var(--primary))] focus:ring-[hsl(var(--primary))] bg-stone-900 border-white/10" />
                Mis en avant (Affiché sur l'accueil)
              </label>
            </div>
          </div>
          <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
            <button onClick={handleSave} className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-xl flex items-center font-semibold"><Save className="w-4 h-4 mr-2" /> Enregistrer</button>
            <button onClick={() => setIsEditing(null)} className="bg-stone-800 text-stone-300 px-6 py-3 rounded-xl flex items-center font-semibold hover:bg-stone-700"><X className="w-4 h-4 mr-2" /> Annuler</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map(item => (
          <div key={item._id} className={`bg-[hsl(var(--surface-light))] p-6 rounded-2xl border ${item.is_featured ? 'border-[hsl(var(--primary))]' : 'border-white/10'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-heading font-bold text-lg text-white">{item.name}</h4>
                <div className="flex text-[hsl(var(--primary))] mt-1">
                  {[...Array(item.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleApproval(item)} className={`px-3 py-1 rounded-full text-xs font-bold border ${item.is_approved ? 'bg-green-950/40 text-green-400 border-green-900/50' : 'bg-red-950/40 text-red-400 border-red-900/50'}`}>
                  {item.is_approved ? 'Approuvé' : 'Rejeté'}
                </button>
                <button onClick={() => toggleFeatured(item)} className={`px-3 py-1 rounded-full text-xs font-bold border ${item.is_featured ? 'bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/30' : 'bg-stone-800 text-stone-400 border-white/5'}`}>
                  {item.is_featured ? 'À la une' : 'Standard'}
                </button>
              </div>
            </div>
            
            <p className="text-stone-300 italic mb-4">"{item.text_fr}"</p>
            
            <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
              <button onClick={() => handleEdit(item)} className="p-2 text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg"><Edit2 className="w-5 h-5" /></button>
              <button onClick={() => handleDelete(item._id!)} className="p-2 text-stone-400 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-lg"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && !isEditing && (
          <div className="col-span-full py-12 text-center text-stone-500 bg-stone-900/30 rounded-2xl border border-white/5 border-dashed">
            Aucun témoignage. Cliquez sur "Ajouter un avis" pour commencer.
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
        />
      )}
    </div>
  );
}
