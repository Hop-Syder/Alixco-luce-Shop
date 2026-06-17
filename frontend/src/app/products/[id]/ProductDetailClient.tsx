/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product Detail Page (Liquid Glass Design)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';
import { FadeUp } from '@/components/ui/FadeUp';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/product';

import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const addItem = useCartStore((state) => state.addItem);
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const fetchSimilarProducts = async () => {
      try {
        const response = await api.get('/products', {
          params: { category: product.category, limit: 8 },
        });
        const items: Product[] = response.data.items || [];
        setSimilarProducts(items.filter((p) => p._id !== product._id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching similar products', error);
      }
    };
    fetchSimilarProducts();
  }, [product]);

  const name = product ? (language === 'en' ? (product.name_en || product.name_fr) : (product.name_fr || product.name_en)) : '';

  const addToCart = () => {
    if (!product) return;
    
    addItem({
      productId: product._id,
      name: name,
      price: product.price,
      image: product.image,
      quantity
    });
    
    // Minimalist toast fallback (can be improved later with a proper Toast system)
    toast.success(`${t('cart.added')} : ${quantity}x ${name}`);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-[hsl(var(--background))]">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">{t('products.not_found')}</h2>
        <Link href="/products" className="btn-primary">{t('products.back_to_catalog')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-stone-300/30 blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-200/20 blur-[120px] pointer-events-none -z-10"></div>
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href="/products" className="text-stone-500 hover:text-[hsl(var(--primary))] transition-colors font-medium flex items-center text-sm tracking-wide">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('products.back_to_catalog')}
          </Link>
        </div>

        <div className="glass-card rounded-[2.5rem] overflow-hidden p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
            
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="rounded-[2rem] overflow-hidden bg-stone-900 aspect-[4/5] relative shadow-inner border border-white/5">
                <Image 
                  src={product.image || '/logo.png'}
                  alt={name} 
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
              </div>
            </div>
            
            {/* Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
              
              <div className="mb-8">
                <span className="text-xs text-[hsl(var(--primary))] font-bold uppercase tracking-[0.2em] mb-3 block">{product.category}</span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">{name}</h1>
                <p className="text-3xl text-[hsl(var(--primary))] font-semibold">{product.price.toLocaleString()} FCFA</p>
              </div>
              
              <div className="border-t border-white/8 py-8 mb-8">
                <h3 className="text-sm font-bold tracking-widest uppercase text-stone-300 mb-4">{t('products.description')}</h3>
                <p className="text-stone-400 leading-relaxed font-light text-lg">
                  {t('products.placeholder_desc')}
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-stone-900 border border-white/10 rounded-xl overflow-hidden">
                    <button 
                      className="px-5 py-3 text-stone-400 hover:bg-white/5 hover:text-[hsl(var(--primary))] transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >-</button>
                    <span className="px-4 font-semibold text-white w-12 text-center">{quantity}</span>
                    <button 
                      className="px-5 py-3 text-stone-400 hover:bg-white/5 hover:text-[hsl(var(--primary))] transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                    >+</button>
                  </div>
                  <div className="text-sm font-medium">
                    {product.stock > 0 
                      ? <span className="text-emerald-600 flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span> {t('products.in_stock')} ({product.stock})</span>
                      : <span className="text-red-500 flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> {t('products.out_of_stock')}</span>
                    }
                  </div>
                </div>
                
                <button 
                  onClick={addToCart}
                  disabled={product.stock <= 0}
                  className="w-full btn-primary text-lg py-4 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {t('products.add_to_cart')}
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Vous aimerez aussi : autres créations de la même catégorie */}
        {similarProducts.length > 0 && (
          <section className="mt-20">
            <FadeUp className="text-center mb-12 flex flex-col items-center">
              <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
                {t('products.similar_subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                {t('products.similar_title')}
              </h2>
              <div className="accent-line"></div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {similarProducts.map((similar) => (
                <ProductCard key={similar._id} product={similar} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

