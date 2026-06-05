/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Standard Products Management Page
 * @created 2026-05-22
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import { Plus, Edit2, Trash2, X, Save, Search } from 'lucide-react';

interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  category: string;
}

interface Category {
  _id?: string;
  title: string;
}

export default function AdminProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Product>({
    name: '',
    price: 0,
    image: '',
    stock: 0,
    category: ''
  });
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchData = async (showLoading = true) => {
    if (showLoading) {
      // Small trick to avoid synchronous state update in effect
      Promise.resolve().then(() => setLoading(true));
    }
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la récupération des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData(true);
  }, []);

  const handleEdit = (product: Product) => {
    setIsEditing(product._id!);
    setFormData({ ...product });
  };

  const handleCreate = () => {
    setIsEditing('new');
    setFormData({ name: '', price: 0, image: '', stock: 0, category: categories.length > 0 ? categories[0]._id! : '' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression.');
    }
  };

  const handleSave = async () => {
    if (!formData.name || formData.price <= 0 || !formData.image || !formData.category) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      if (isEditing === 'new') {
        await api.post('/products', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.put(`/products/${isEditing}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setIsEditing(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la sauvegarde.');
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search));

  if (loading) return <div className="text-stone-500 flex items-center justify-center h-40">Chargement du catalogue...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow rounded-2xl p-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Catalogue Produits</h2>
          <p className="text-gray-500">Gérez l&apos;ensemble des produits de la boutique.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
            />
          </div>
          <button 
            onClick={handleCreate}
            className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-xl flex items-center hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter
          </button>
        </div>
      </div>

      {error && <div className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">{error}</div>}

      {isEditing && (
        <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
          <h3 className="text-xl font-bold mb-6 text-stone-800">{isEditing === 'new' ? 'Nouveau Produit' : 'Modifier le Produit'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Nom du Produit *</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                placeholder="Ex: Applique Murale LED"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Prix (FCFA) *</label>
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-2">Stock *</label>
                <input 
                  type="number" 
                  value={formData.stock} 
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-2">Catégorie *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-stone-700 mb-2">URL de l&apos;image *</label>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-stone-50"
                  placeholder="https://..."
                />
                {formData.image && (
                  <div className="relative w-12 h-12">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover rounded-lg border" />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8 pt-6 border-t border-stone-100">
            <button 
              onClick={handleSave}
              className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-xl flex items-center hover:opacity-90 font-semibold"
            >
              <Save className="w-5 h-5 mr-2" /> Enregistrer
            </button>
            <button 
              onClick={() => setIsEditing(null)}
              className="bg-stone-200 text-stone-800 px-6 py-3 rounded-xl flex items-center hover:bg-stone-300 font-semibold"
            >
              <X className="w-5 h-5 mr-2" /> Annuler
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100 text-stone-500 text-sm font-semibold">
                <th className="p-4">Produit</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((product) => {
                const cat = categories.find(c => c._id === product.category);
                return (
                  <tr key={product._id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg bg-stone-100" />
                        </div>
                        <span className="font-bold text-stone-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[hsl(var(--primary))]">
                      {product.price.toLocaleString()} FCFA
                    </td>
                    <td className="p-4">
                      <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-medium">
                        {cat ? cat.title : 'Non classé'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock} en stock
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-stone-400 hover:text-[hsl(var(--primary))] hover:bg-orange-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id!)}
                          className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              Aucun produit trouvé.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
