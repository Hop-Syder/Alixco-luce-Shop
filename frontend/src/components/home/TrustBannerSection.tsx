/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Trust Banner Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React from 'react';
import { Truck, RefreshCcw, ShieldCheck } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';

export function TrustBannerSection() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-white/5 bg-[hsl(var(--surface-light))] py-12 relative z-10">
      <FadeUp className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <Truck className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-lg text-white tracking-wide uppercase">{t('trust.delivery_title')}</h3>
            <p className="text-sm text-stone-400 mt-2">{t('trust.delivery_desc')}</p>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <RefreshCcw className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-lg text-white tracking-wide uppercase">{t('trust.quality_title')}</h3>
            <p className="text-sm text-stone-400 mt-2">{t('trust.quality_desc')}</p>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <ShieldCheck className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-lg text-white tracking-wide uppercase">{t('trust.payment_title')}</h3>
            <p className="text-sm text-stone-400 mt-2">{t('trust.payment_desc')}</p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
