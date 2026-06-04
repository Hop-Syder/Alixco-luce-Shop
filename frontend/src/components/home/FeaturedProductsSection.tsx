/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Featured Products Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { api } from '@/services/api';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';

interface FeaturedProduct {
  _id?: string;
  name: string;
  price: string;
  badge?: string;
  img: string;
  order?: number;
}

const defaultProducts: FeaturedProduct[] = [
  { name: "Trophée Verre Gravé", price: "À partir de 120 €", badge: "Best-Seller", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600" },
  { name: "Enseigne Bois Découpé", price: "Sur Devis", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600" },
  { name: "Porte-clés Cuir Personnalisé", price: "25 €", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600" },
  { name: "Plaque Métal Entreprise", price: "180 €", badge: "Nouveau", img: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=600" }
];

export function FeaturedProductsSection() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<FeaturedProduct[]>(defaultProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/featured-products');
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        }
      } catch (error: unknown) {
        const err = error as { isAxiosError?: boolean, message?: string };
        if (err.isAxiosError && err.message === 'Network Error') {
          console.warn("Le backend n'est pas accessible, utilisation des pièces maîtresses par défaut.");
        } else {
          console.error("Erreur lors de la récupération des pièces maîtresses:", error);
        }
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t('featured.subtitle')}</span>
            <h2 className="text-4xl font-heading font-bold text-white">{t('featured.title')}</h2>
          </div>
          <Link href="/products" className="flex items-center text-sm uppercase tracking-widest text-white hover:text-[hsl(var(--primary))] transition-colors group">
            {t('featured.view_all')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <FadeUp key={product._id || i} delay={i * 0.1}>
              <div className="group cursor-pointer h-full flex flex-col">
                <div className="relative h-80 overflow-hidden mb-6 border border-white/5">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-[hsl(var(--background))] border border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] text-[10px] uppercase tracking-widest font-bold px-3 py-1">
                      {product.badge}
                    </div>
                  )}
                  <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100" unoptimized />
                  
                  {/* Overlay interaction */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white uppercase tracking-widest text-xs border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
                      {t('featured.discover')}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 flex-grow text-center">
                  <h3 className="text-lg font-heading text-white">{product.name}</h3>
                  <p className="text-[hsl(var(--primary))] text-sm tracking-wider">{product.price}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
