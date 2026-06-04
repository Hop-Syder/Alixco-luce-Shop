/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Categories Section for Home Page
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

interface Category {
  _id?: string;
  title: string;
  desc: string;
  img: string;
  order?: number;
}

const defaultCategories: Category[] = [
  { title: "Gravure & Découpe Laser", desc: "Personnalisation sur bois, verre, métal et cuir pour donner vie à vos idées", img: "https://images.unsplash.com/photo-1611077544831-29e20a0279c6?auto=format&fit=crop&q=80&w=800" },
  { title: "Créations d'Art", desc: "Pièces uniques conçues sur-mesure pour sublimer votre décoration", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" },
  { title: "Accessoires de Mode", desc: "Customisation sur tissus et accessoires pour affirmer votre style unique", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800" },
  { title: "Cadeaux d'Entreprise", desc: "Boîtes personnalisées et cadeaux d'affaires sur-mesure pour marquer les esprits", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800" }
];

export function CategoriesSection() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data && response.data.length > 0) {
          setCategories(response.data);
        }
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'isAxiosError' in error && (error as {message?: string}).message === 'Network Error') {
          console.warn("Le backend n'est pas accessible, utilisation des catégories par défaut.");
        } else {
          console.error("Erreur lors de la récupération des catégories:", error);
        }
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <FadeUp className="text-center mb-20 flex flex-col items-center">
        <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t('categories.subtitle')}</span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">{t('categories.title')}</h2>
        <div className="accent-line"></div>
      </FadeUp>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {categories.map((cat, idx) => (
          <FadeUp key={cat._id || idx} delay={idx * 0.15}>
            <Link href={`/products?category=${cat.title.toLowerCase()}`} className="group relative h-[450px] overflow-hidden block border border-white/10 hover:border-[hsl(var(--primary))]/50 transition-colors duration-500">
              <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-heading font-bold text-white mb-3 truncate" title={cat.title}>{cat.title}</h3>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-stone-300 font-light text-sm uppercase tracking-wider line-clamp-2 flex-1" title={cat.desc}>
                    {cat.desc}
                  </p>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[hsl(var(--primary))]" />
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
