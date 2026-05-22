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

interface Category {
  _id?: string;
  title: string;
  desc: string;
  img: string;
  order?: number;
}

const defaultCategories: Category[] = [
  { title: "Gravure Laser", desc: "L'empreinte de l'élégance sur vos objets", img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800" },
  { title: "Découpe Sur-Mesure", desc: "Des formes complexes d'une netteté absolue", img: "https://images.unsplash.com/photo-1563207153-f4040a459385?auto=format&fit=crop&q=80&w=800" },
  { title: "Objets d'Art & Cadeaux", desc: "Trophées, accessoires et cadeaux d'entreprise", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" }
];

export function CategoriesSection() {
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
        <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Notre Expertise</span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">L&apos;Univers Alixco</h2>
        <div className="accent-line"></div>
      </FadeUp>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <FadeUp key={cat._id || idx} delay={idx * 0.15}>
            <Link href={`/products?category=${cat.title.toLowerCase()}`} className="group relative h-[450px] overflow-hidden block border border-white/10 hover:border-[hsl(var(--primary))]/50 transition-colors duration-500">
              <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-heading font-bold text-white mb-3">{cat.title}</h3>
                <p className="text-stone-300 font-light text-sm uppercase tracking-wider flex items-center">
                  {cat.desc} <ArrowRight className="ml-4 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[hsl(var(--primary))]" />
                </p>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
