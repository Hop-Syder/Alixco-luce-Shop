/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Newsletter Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';

export function NewsletterSection() {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-[hsl(var(--background))] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/50 to-transparent"></div>
      
      <FadeUp className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t('newsletter.title')}</h2>
        <p className="text-stone-400 mb-12 font-light text-lg">
          {t('newsletter.description')}
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder={t('newsletter.placeholder')} 
            className="flex-grow bg-transparent border-b border-white/20 px-4 py-4 text-white placeholder-stone-600 focus:outline-none focus:border-[hsl(var(--primary))] transition-colors rounded-none"
            required
          />
          <button type="submit" className="text-sm uppercase tracking-widest font-bold text-[hsl(var(--primary))] hover:text-white transition-colors px-6 whitespace-nowrap">
            {t('newsletter.button')}
          </button>
        </form>
      </FadeUp>
    </section>
  );
}
