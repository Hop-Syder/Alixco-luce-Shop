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
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

interface Category {
  _id?: string;
  title: string;
  desc: string;
  img: string;
  order: number;
}

export default function AdminCategories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Category>({ title: '', desc: '', img: '', order: 0 });
  const [error, setError] = useState('');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des catégories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setIsEditing(category._id!);
    setFormData({ ...category });
  };

  const handleCreate = () => {
    setIsEditing('new');
    setFormData({ title: '', desc: '', img: '', order: categories.length });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette catégorie ?')) return;
    try {
      await api.delete(`/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.desc || !formData.img) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    
    try {
      if (isEditing === 'new') {
        await api.post('/categories', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.put(`/categories/${isEditing}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsEditing(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde.');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white shadow rounded-2xl p-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Catégories Phares</h2>
          <p className="text-gray-500">Gérez les sections affichées sur la page d&apos;accueil.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-lg flex items-center hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter
        </button>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>}

      {isEditing && (
        <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold mb-4">{isEditing === 'new' ? 'Nouvelle catégorie' : 'Modifier la catégorie'}</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="Ex: Gravure Laser"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input 
                type="text" 
                value={formData.desc} 
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="Courte phrase d'accroche"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de l&apos;image</label>
              <input 
                type="text" 
                value={formData.img} 
                onChange={(e) => setFormData({...formData, img: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ordre d&apos;affichage</label>
              <input 
                type="number" 
                value={formData.order} 
                onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button 
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" /> Enregistrer
            </button>
            <button 
              onClick={() => setIsEditing(null)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center hover:bg-gray-300"
            >
              <X className="w-4 h-4 mr-2" /> Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48">
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => handleEdit(cat)}
                  className="bg-white text-gray-900 p-2 rounded-full hover:bg-blue-50"
                  title="Modifier"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(cat._id!)}
                  className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">{cat.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Ordre: {cat.order}</span>
              </div>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
            Aucune catégorie configurée. Les catégories par défaut seront affichées sur le site.
          </div>
        )}
      </div>
    </div>
  );
}
