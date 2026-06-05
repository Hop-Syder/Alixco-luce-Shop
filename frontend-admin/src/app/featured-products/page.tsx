/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Featured Products Management Page
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

interface FeaturedProduct {
  _id?: string;
  name: string;
  price: string;
  badge?: string;
  img: string;
  order: number;
}

export default function AdminFeaturedProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<FeaturedProduct>({ name: '', price: '', badge: '', img: '', order: 0 });
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/featured-products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des pièces maîtresses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchProducts();
  }, []);

  const handleEdit = (product: FeaturedProduct) => {
    setIsEditing(product._id!);
    setFormData({ ...product, badge: product.badge || '' });
  };

  const handleCreate = () => {
    setIsEditing('new');
    setFormData({ name: '', price: '', badge: '', img: '', order: products.length });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer cette pièce maîtresse ?')) return;
    try {
      await api.delete(`/featured-products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price || !formData.img) {
      alert('Veuillez remplir au moins le nom, le prix et l\'image.');
      return;
    }
    
    // Convert empty badge to null if needed, or just leave as string
    const dataToSend = { ...formData, badge: formData.badge || null };
    
    try {
      if (isEditing === 'new') {
        await api.post('/featured-products', dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.put(`/featured-products/${isEditing}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsEditing(null);
      fetchProducts();
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
          <h2 className="text-2xl font-bold text-gray-800">Pièces Maîtresses (Sélection)</h2>
          <p className="text-gray-500">Gérez les 4 produits mis en avant sur la page d&apos;accueil.</p>
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
          <h3 className="text-lg font-bold mb-4">{isEditing === 'new' ? 'Nouveau produit phare' : 'Modifier le produit phare'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom du Produit</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="Ex: Trophée Verre Gravé"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texte du Prix</label>
              <input 
                type="text" 
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="Ex: À partir de 120 €"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Optionnel)</label>
              <input 
                type="text" 
                value={formData.badge || ''} 
                onChange={(e) => setFormData({...formData, badge: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="Ex: Best-Seller, Nouveau..."
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
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de l&apos;image</label>
              <input 
                type="text" 
                value={formData.img} 
                onChange={(e) => setFormData({...formData, img: e.target.value})}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none"
                placeholder="https://..."
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col">
            <div className="relative h-48">
              {product.badge && (
                <div className="absolute top-2 left-2 z-10 bg-black text-[hsl(var(--primary))] text-[10px] uppercase tracking-widest font-bold px-2 py-1">
                  {product.badge}
                </div>
              )}
              <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button 
                  onClick={() => handleEdit(product)}
                  className="bg-white text-gray-900 p-2 rounded-full hover:bg-blue-50"
                  title="Modifier"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(product._id!)}
                  className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-md leading-tight">{product.name}</h3>
              </div>
              <p className="text-[hsl(var(--primary))] font-medium text-sm mt-auto">{product.price}</p>
              <p className="text-xs text-gray-400 mt-2">Ordre: {product.order}</p>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
            Aucun produit phare configuré. Les produits par défaut seront affichés sur le site.
          </div>
        )}
      </div>
    </div>
  );
}
