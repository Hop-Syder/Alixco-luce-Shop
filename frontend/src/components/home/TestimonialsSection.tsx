/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Testimonials Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';
import { api } from '@/services/api';

interface Testimonial {
  _id: string;
  name: string;
  role_fr: string;
  role_en: string;
  text_fr: string;
  text_en: string;
  rating: number;
}

export function TestimonialsSection() {
  const { t, language } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get('/testimonials', {
          params: { is_approved: true, is_featured: true, limit: 3 }
        });
        setTestimonials(response.data.items || []);
      } catch (err) {
        console.error('Failed to fetch testimonials', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const defaultTestimonials = [
    { name: "Sophie L.", role: t('testimonials.review1_role'), text: t('testimonials.review1_text'), rating: 5 },
    { name: "Marc D.", role: t('testimonials.review2_role'), text: t('testimonials.review2_text'), rating: 5 },
    { name: "Élise M.", role: t('testimonials.review3_role'), text: t('testimonials.review3_text'), rating: 5 }
  ];

  const displayReviews = testimonials.length > 0 
    ? testimonials.map(item => ({
        name: item.name,
        role: language === 'en' ? (item.role_en || item.role_fr) : (item.role_fr || item.role_en),
        text: language === 'en' ? (item.text_en || item.text_fr) : (item.text_fr || item.text_en),
        rating: item.rating || 5
      }))
    : defaultTestimonials;

  return (
    <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp className="flex flex-col items-center">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t('testimonials.subtitle')}</span>
          <h2 className="text-4xl font-heading font-bold text-white mb-6">{t('testimonials.title')}</h2>
          <div className="accent-line mb-20"></div>
        </FadeUp>
        
        {loading && testimonials.length === 0 ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayReviews.slice(0, 3).map((review, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="p-10 text-left flex flex-col justify-between h-full border border-white/5 bg-[hsl(var(--surface-neutral))]/30 hover:bg-[hsl(var(--surface-neutral))]/50 transition-colors">
                  <div>
                    <div className="flex text-[hsl(var(--primary))] mb-8">
                      {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current mr-1" />)}
                    </div>
                    <p className="text-stone-300 font-light leading-relaxed mb-8">&quot;{review.text}&quot;</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="font-heading text-lg text-white">{review.name}</h4>
                    <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-widest mt-1">{review.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
