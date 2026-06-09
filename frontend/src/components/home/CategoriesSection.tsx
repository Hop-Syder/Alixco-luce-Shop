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
  title_fr: string;
  title_en: string;
  desc_fr: string;
  desc_en: string;
  img: string;
  order?: number;
}

const defaultCategories: Category[] = [
  { title_fr: "Gravure & Découpe Laser", title_en: "Laser Engraving & Cutting", desc_fr: "Personnalisation sur bois, verre, métal et cuir pour donner vie à vos idées", desc_en: "Customization on wood, glass, metal and leather to bring your ideas to life", img: "/gravure.jpg" },
  { title_fr: "Créations d'Art", title_en: "Art Creations", desc_fr: "Pièces uniques conçues sur-mesure pour sublimer votre décoration", desc_en: "Unique pieces designed to measure to enhance your decoration", img: "/creation_art.jpg" },
  { title_fr: "Accessoires de Mode", title_en: "Fashion Accessories", desc_fr: "Customisation sur tissus et accessoires pour affirmer votre style unique", desc_en: "Customization on fabrics and accessories to assert your unique style", img: "/accessoires_de_mode.jpg" },
  { title_fr: "Cadeaux d'Entreprise", title_en: "Corporate Gifts", desc_fr: "Boîtes personnalisées et cadeaux d'affaires sur-mesure pour marquer les esprits", desc_en: "Custom boxes and tailored corporate gifts to make a lasting impression", img: "/cadeaux_dentreprise.jpg" }
];

export function CategoriesSection() {
  const { t, language } = useTranslation();
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        if (response.data && response.data.length > 0) {
          setCategories(response.data);
        }
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'isAxiosError' in error && (error as { message?: string }).message === 'Network Error') {
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
        {categories.map((cat, idx) => {
          const title = language === 'en' ? (cat.title_en || cat.title_fr) : (cat.title_fr || cat.title_en);
          const desc = language === 'en' ? (cat.desc_en || cat.desc_fr) : (cat.desc_fr || cat.desc_en);
          const hrefTitle = cat.title_fr ? cat.title_fr.toLowerCase() : '';

          return (
            <FadeUp key={cat._id || idx} delay={idx * 0.15}>
              <Link href={`/products?category=${hrefTitle}`} className="group relative h-[450px] overflow-hidden block border border-white/10 hover:border-[hsl(var(--primary))]/50 transition-colors duration-500">
                <Image src={cat.img} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-heading font-bold text-white mb-3 truncate" title={title}>{title}</h3>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-stone-300 font-light text-sm uppercase tracking-wider line-clamp-2 flex-1" title={desc}>
                      {desc}
                    </p>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[hsl(var(--primary))]" />
                  </div>
                </div>
              </Link>
            </FadeUp>
          )
        })}
      </div>
    </section>
  );
}
