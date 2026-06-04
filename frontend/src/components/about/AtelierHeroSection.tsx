/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Hero Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";
import React from 'react';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';

export function AtelierHeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center pt-20">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80&w=2000" 
          alt="Atelier Laser" 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/80 via-[hsl(var(--background))]/50 to-[hsl(var(--background))]"></div>
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] rounded-full bg-[hsl(var(--primary))]/20 blur-[150px] pointer-events-none mix-blend-screen"></div>
      </div>

      <div className="max-w-4xl mx-auto z-10 w-full space-y-6">
        <FadeUp delay={0.1} className="flex flex-col items-center">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.3em] text-sm md:text-base font-bold mb-4 block">
            {t('about.hero_subtitle')}
          </span>
          <div className="accent-line mx-auto"></div>
        </FadeUp>
        
        <div className="relative">
          <AnimatedTitle 
            text1={t('about.hero_title1')} 
            text2={t('about.hero_title2')} 
            className="text-4xl md:text-6xl lg:text-7xl text-white text-center" 
          />
        </div>
        
        <FadeUp delay={0.4}>
          <p className="text-lg md:text-xl text-stone-300 font-light leading-relaxed mt-6">
            {t('about.hero_description')}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
