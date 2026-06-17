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
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api, fetcher } from '@/services/api';
import useSWR from 'swr';
import { Plus, Edit2, Trash2, X, Save, Search, Layers, DollarSign, Image as ImageIcon, Search as SearchIcon } from 'lucide-react';
import { DragDropImageUploader } from '@/components/ui/DragDropImageUploader';
import { Pagination } from '@/components/ui/Pagination';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productSchema = z.object({
  name_fr: z.string().min(1, 'Le nom FR est requis'),
  name_en: z.string().min(1, 'Le nom EN est requis'),
  price: z.number().min(1, 'Le prix doit être supérieur à 0'),
  stock: z.number().min(0, 'Le stock ne peut pas être négatif'),
  category: z.string().min(1, 'La catégorie est requise'),
  image: z.string().min(1, "L'image est requise"),
  seo_title_fr: z.string().optional(),
  seo_title_en: z.string().optional(),
  seo_desc_fr: z.string().optional(),
  seo_desc_en: z.string().optional(),
  seo_keywords_fr: z.string().optional(),
  seo_keywords_en: z.string().optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

type TabType = 'general' | 'price' | 'media' | 'seo';

interface Product {
  _id?: string;
  name_fr: string;
  name_en: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  seo_title_fr?: string;
  seo_title_en?: string;
  seo_desc_fr?: string;
  seo_desc_en?: string;
  seo_keywords_fr?: string;
  seo_keywords_en?: string;
}

interface Category {
  _id?: string;
  title_fr: string;
  title_en: string;
}

export default function AdminProducts() {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 20;
  
  const { data: prodData, error: prodErr, mutate: mutateProducts, isLoading: loadingProducts } = useSWR(`/products?page=${page}&limit=${limit}`, fetcher);
  const { data: categoriesData, isLoading: loadingCategories } = useSWR('/categories', fetcher);

  const products: Product[] = prodData?.items || [];
  const totalPages = prodData?.total_pages || 1;
  const categories: Category[] = categoriesData || [];
  const loading = loadingProducts || loadingCategories;
  const error = prodErr ? 'Erreur lors de la récupération des données.' : null;
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [search, setSearch] = useState('');

  const defaultValues: ProductFormValues = {
    name_fr: '',
    name_en: '',
    price: 0,
    image: '',
    stock: 0,
    category: '',
    seo_title_fr: '',
    seo_title_en: '',
    seo_desc_fr: '',
    seo_desc_en: '',
    seo_keywords_fr: '',
    seo_keywords_en: ''
  };

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues
  });



  const handleEdit = (product: Product) => {
    setIsEditing(product._id!);
    reset({
      ...defaultValues,
      ...product
    });
    setActiveTab('general');
  };

  const handleCreate = () => {
    setIsEditing('new');
    reset({ ...defaultValues, category: categories.length > 0 ? categories[0]._id! : '' });
    setActiveTab('general');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce produit ?')) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Produit supprimé avec succès.');
      mutateProducts();
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la suppression.');
    }
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      if (isEditing === 'new') {
        await api.post('/products', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Produit créé avec succès.');
      } else {
        await api.put(`/products/${isEditing}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Produit mis à jour avec succès.');
      }
      setIsEditing(null);
      mutateProducts();
    } catch (err) {
      console.error(err);
      toast.error('Erreur lors de la sauvegarde.');
    }
  };

  const filteredProducts = products.filter(p => (p.name_fr && p.name_fr.toLowerCase().includes(search.toLowerCase())) || (p.name_en && p.name_en.toLowerCase().includes(search.toLowerCase())) || p.category.includes(search));

  if (loading) return <div className="text-stone-500 flex items-center justify-center h-40">Chargement du catalogue...</div>;

  return (
    <div className="space-y-6 text-stone-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6 gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-white">Catalogue Produits</h2>
          <p className="text-stone-400">Gérez l&apos;ensemble des produits de la boutique.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-[hsl(var(--surface-neutral))] text-white placeholder-stone-500"
            />
          </div>
          <button 
            onClick={handleCreate}
            className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-xl flex items-center hover:opacity-90 transition-opacity whitespace-nowrap font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter
          </button>
        </div>
      </div>

      {error && <div className="text-red-400 bg-red-950/30 p-4 rounded-xl border border-red-900/50">{error}</div>}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[hsl(var(--surface-light))] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-heading font-bold text-white">{isEditing === 'new' ? 'Nouveau Produit' : 'Modifier le Produit'}</h3>
            <button type="button" onClick={() => setIsEditing(null)} className="text-stone-400 hover:text-white"><X className="w-6 h-6" /></button>
          </div>

          <div className="flex border-b border-white/10 mb-6 overflow-x-auto">
            <button type="button" onClick={() => setActiveTab('general')} className={`px-4 py-3 font-semibold flex items-center whitespace-nowrap transition-colors ${activeTab === 'general' ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' : 'text-stone-400 hover:text-stone-300'}`}>
              <Layers className="w-4 h-4 mr-2" /> Général
            </button>
            <button type="button" onClick={() => setActiveTab('price')} className={`px-4 py-3 font-semibold flex items-center whitespace-nowrap transition-colors ${activeTab === 'price' ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' : 'text-stone-400 hover:text-stone-300'}`}>
              <DollarSign className="w-4 h-4 mr-2" /> Stock & Prix
            </button>
            <button type="button" onClick={() => setActiveTab('media')} className={`px-4 py-3 font-semibold flex items-center whitespace-nowrap transition-colors ${activeTab === 'media' ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' : 'text-stone-400 hover:text-stone-300'}`}>
              <ImageIcon className="w-4 h-4 mr-2" /> Média
            </button>
            <button type="button" onClick={() => setActiveTab('seo')} className={`px-4 py-3 font-semibold flex items-center whitespace-nowrap transition-colors ${activeTab === 'seo' ? 'text-[hsl(var(--primary))] border-b-2 border-[hsl(var(--primary))]' : 'text-stone-400 hover:text-stone-300'}`}>
              <SearchIcon className="w-4 h-4 mr-2" /> SEO
            </button>
          </div>

          <div className="min-h-[300px]">
            {activeTab === 'general' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Nom du Produit (FR) *</label>
                  <input 
                    {...register('name_fr')}
                    className={`w-full border rounded-xl p-3 focus:ring-2 outline-none bg-[hsl(var(--surface-neutral))] text-white ${errors.name_fr ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[hsl(var(--primary))]'}`}
                    placeholder="Ex: Applique Murale LED"
                  />
                  {errors.name_fr && <p className="text-red-400 text-xs mt-1 font-medium">{errors.name_fr.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Nom du Produit (EN) *</label>
                  <input 
                    {...register('name_en')}
                    className={`w-full border rounded-xl p-3 focus:ring-2 outline-none bg-[hsl(var(--surface-neutral))] text-white ${errors.name_en ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[hsl(var(--primary))]'}`}
                    placeholder="Ex: LED Wall Sconce"
                  />
                  {errors.name_en && <p className="text-red-400 text-xs mt-1 font-medium">{errors.name_en.message}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Catégorie *</label>
                  <select
                    {...register('category')}
                    className={`w-full border rounded-xl p-3 focus:ring-2 outline-none bg-[hsl(var(--surface-neutral))] text-white ${errors.category ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[hsl(var(--primary))]'}`}
                  >
                    <option value="" className="bg-stone-900 text-stone-400">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id} className="bg-stone-900 text-white">{cat.title_fr || cat.title_en}</option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-400 text-xs mt-1 font-medium">{errors.category.message}</p>}
                </div>
              </div>
            )}

            {activeTab === 'price' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Prix (FCFA) *</label>
                  <input 
                    type="number" 
                    {...register('price', { valueAsNumber: true })}
                    className={`w-full border rounded-xl p-3 focus:ring-2 outline-none bg-[hsl(var(--surface-neutral))] text-white ${errors.price ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[hsl(var(--primary))]'}`}
                  />
                  {errors.price && <p className="text-red-400 text-xs mt-1 font-medium">{errors.price.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Stock *</label>
                  <input 
                    type="number" 
                    {...register('stock', { valueAsNumber: true })}
                    className={`w-full border rounded-xl p-3 focus:ring-2 outline-none bg-[hsl(var(--surface-neutral))] text-white ${errors.stock ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 focus:ring-[hsl(var(--primary))]'}`}
                  />
                  {errors.stock && <p className="text-red-400 text-xs mt-1 font-medium">{errors.stock.message}</p>}
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="animate-in fade-in">
                <label className="block text-sm font-semibold text-stone-300 mb-2">Image du produit *</label>
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <DragDropImageUploader 
                      value={field.value} 
                      onChange={field.onChange} 
                    />
                  )}
                />
                {errors.image && <p className="text-red-400 text-xs mt-2 font-medium">{errors.image.message}</p>}
              </div>
            )}

            {activeTab === 'seo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Title (FR)</label>
                  <input {...register('seo_title_fr')} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="Titre pour Google" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Title (EN)</label>
                  <input {...register('seo_title_en')} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="Google Title" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Description (FR)</label>
                  <textarea {...register('seo_desc_fr')} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" rows={2}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Meta Description (EN)</label>
                  <textarea {...register('seo_desc_en')} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" rows={2}></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Mots-clés (FR)</label>
                  <input {...register('seo_keywords_fr')} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="bois, luxe, décoration" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-300 mb-2">Mots-clés (EN)</label>
                  <input {...register('seo_keywords_en')} className="w-full border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] outline-none bg-[hsl(var(--surface-neutral))] text-white" placeholder="wood, luxury, decor" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/10">
            <button 
              type="button"
              onClick={() => setIsEditing(null)}
              className="bg-stone-800 text-stone-300 px-6 py-3 rounded-xl flex items-center hover:bg-stone-700 font-semibold transition-colors"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="bg-[hsl(var(--primary))] text-white px-6 py-3 rounded-xl flex items-center hover:opacity-90 font-semibold transition-opacity"
            >
              <Save className="w-5 h-5 mr-2" /> Enregistrer le produit
            </button>
          </div>
        </form>
      )}

      <div className="bg-[hsl(var(--surface-light))] rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-950/40 border-b border-white/10 text-stone-400 text-sm font-semibold">
                <th className="p-4">Produit</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Catégorie</th>
                <th className="p-4">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => {
                const cat = categories.find(c => c._id === product.category);
                return (
                  <tr key={product._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12">
                          <img src={product.image} alt={product.name_fr} className="w-full h-full object-cover rounded-lg bg-stone-900 border border-white/5" />
                        </div>
                        <span className="font-bold text-white">{product.name_fr}</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[hsl(var(--primary))]">
                      {product.price.toLocaleString()} FCFA
                    </td>
                    <td className="p-4">
                      <span className="bg-stone-800 text-stone-300 px-3 py-1 rounded-full text-xs font-medium">
                        {cat ? (cat.title_fr || cat.title_en) : 'Non classé'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-950/30 text-green-400 border border-green-900/50' : 'bg-red-950/30 text-red-400 border border-red-900/50'}`}>
                        {product.stock} en stock
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-stone-400 hover:text-[hsl(var(--primary))] hover:bg-white/5 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id!)}
                          className="p-2 text-stone-400 hover:text-red-500 hover:bg-white/5 rounded-lg transition-colors"
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
