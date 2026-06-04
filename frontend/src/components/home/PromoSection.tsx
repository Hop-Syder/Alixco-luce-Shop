/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Promo Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';

export function PromoSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeUp>
          <div className="relative border border-white/5 overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a]">
            {/* Background Image */}
            <Image 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600" 
              alt="Promo" 
              fill
              className="object-cover opacity-30 mix-blend-screen pointer-events-none" 
              unoptimized
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 pointer-events-none"></div>
            
            {/* Content Container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 lg:p-16 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-[0.3em]">
                  <Clock className="w-4 h-4 mr-3" /> {t('promo.badge')}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-none tracking-tight">
                  {t('promo.title1')} <br/>
                  <span className="text-gradient-gold mt-1 block">{t('promo.title2')}</span>
                </h2>
                
                <p className="text-stone-400 text-base md:text-lg font-light leading-snug max-w-lg">
                  {t('promo.description')}
                </p>
              </div>
              
              <ul className="space-y-3 text-stone-300 font-light text-base md:text-lg">
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  {t('promo.feature1')}
                </li>
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  {t('promo.feature2')}
                </li>
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  {t('promo.feature3')}
                </li>
              </ul>
              
              <div className="pt-6">
                <Link href="/products?collection=limited" className="btn-primary inline-flex items-center group px-10 py-4 text-sm uppercase tracking-widest">
                  {t('promo.cta')}
                  <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Countdown / Visual Element */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="glass-card p-6 sm:p-10 md:p-12 flex items-center justify-center gap-3 sm:gap-6 md:gap-8 text-center border border-white/10 backdrop-blur-md relative overflow-hidden group w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-heading text-white tabular-nums tracking-tighter">02</span>
                  <span className="text-[10px] sm:text-xs text-[hsl(var(--primary))] uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2 sm:mt-4 font-bold">{t('promo.days')}</span>
                </div>
                
                <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white/20 relative z-10 -mt-6 sm:-mt-8">:</span>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-heading text-white tabular-nums tracking-tighter">14</span>
                  <span className="text-[10px] sm:text-xs text-[hsl(var(--primary))] uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2 sm:mt-4 font-bold">{t('promo.hours')}</span>
                </div>
                
                <span className="text-3xl sm:text-4xl md:text-5xl font-light text-white/20 relative z-10 -mt-6 sm:-mt-8">:</span>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-heading text-white tabular-nums tracking-tighter">45</span>
                  <span className="text-[10px] sm:text-xs text-[hsl(var(--primary))] uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-2 sm:mt-4 font-bold">{t('promo.minutes')}</span>
                </div>
              </div>
            </div>
            
          </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
