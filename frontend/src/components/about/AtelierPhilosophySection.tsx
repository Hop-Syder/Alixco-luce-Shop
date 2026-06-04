/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Philosophy Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";
import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';

export function AtelierPhilosophySection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[hsl(var(--surface-light))] border-y border-white/5 relative z-10">
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">{t('about.philosophy_title')}</h2>
        <p className="text-xl md:text-2xl font-light text-stone-300 leading-relaxed italic mb-8">
          &quot;{t('about.philosophy_quote')}&quot;
        </p>
        <p className="text-stone-400 font-light">
          {t('about.philosophy_desc')}
        </p>
      </FadeUp>
    </section>
  );
}
