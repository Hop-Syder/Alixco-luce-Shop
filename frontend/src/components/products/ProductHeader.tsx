/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product List Header
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";
import React from 'react';
import { useTranslation } from '@/context/LanguageContext';

export function ProductHeader() {
  const { t } = useTranslation();
  return (
    <>
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-orange-200/20 blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="mb-12 text-center">
        <h2 className="text-sm font-bold tracking-[0.2em] text-[hsl(var(--primary))] uppercase mb-4">{t('products.subtitle')}</h2>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[hsl(var(--text-main))]">
          {t('products.title1')} <span className="text-glow text-[hsl(var(--primary))]">{t('products.title2')}</span>
        </h1>
      </div>
    </>
  );
}
