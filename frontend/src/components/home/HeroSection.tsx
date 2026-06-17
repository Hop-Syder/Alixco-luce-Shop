/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Hero Section for Home Page (Premium & Interactive 3D design)
 * @created 2026-05-22
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Crown, Sparkles, Cpu, Award } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';
import { FadeUp } from '@/components/ui/FadeUp';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { api } from '@/services/api';

interface HeroData {
  title_highlight: string;
  title_main: string;
  subtitle: string;
  description: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
  image_3d: string;
  image_bg: string;
}

export function HeroSection() {
  const { t } = useTranslation();
  const [heroData, setHeroData] = useState<HeroData | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await api.get('/page-settings/home');
        if (response.data && response.data.hero) {
          setHeroData(response.data.hero);
        }
      } catch {
        console.warn("Impossible de charger le contenu dynamique du Hero, utilisation des données de secours locales.");
      }
    };
    fetchHeroData();
  }, []);

  // Mouse Parallax values using Framer Motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map values for 3D card tilt & parallax
  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);
  
  // Parallax translation for floating elements
  const floatX1 = useTransform(x, [-300, 300], [-25, 25]);
  const floatY1 = useTransform(y, [-300, 300], [-25, 25]);
  
  const floatX2 = useTransform(x, [-300, 300], [20, -20]);
  const floatY2 = useTransform(y, [-300, 300], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 lg:px-12 xl:px-24 text-left pt-16 sm:pt-24 pb-16 overflow-hidden bg-[hsl(var(--background))]"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={heroData?.image_bg || "/hearder.jpg"} 
          alt="AlixcoLuxe Header Background" 
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/95 via-transparent to-[hsl(var(--background))]"></div>
        {/* Glowing Accents */}
        <div className="absolute top-[25%] left-[25%] w-[65vw] h-[65vw] md:w-[45vw] md:h-[45vw] rounded-full bg-[hsl(var(--primary))]/10 blur-[160px] pointer-events-none mix-blend-screen animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center -mt-12 sm:-mt-6 lg:-mt-12">
        
        {/* GAUCHE : TEXTES ET BOUTONS */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-6 flex flex-col items-start">
          
          {/* Badge de Confiance Flottant en Verre Dépoli */}
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] group hover:border-[hsl(var(--primary))]/30 transition-all duration-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-200 flex items-center gap-1.5">
                {t('hero.subtitle')}
                <Crown className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="text-stone-500 font-light px-1">|</span>
                <span className="text-[hsl(var(--primary))] font-bold text-[10px] tracking-wider">{t('hero.badge_craftsmanship')}</span>
              </span>
            </div>
          </FadeUp>

          {/* Titre Principal avec Gradients HSL Premium */}
          <div className="space-y-3">
            <FadeUp delay={0.25}>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-extrabold tracking-tight text-white leading-[1.05]">
                {heroData?.title_main || "L'Art de la"}{" "}
                <span className="bg-gradient-to-r from-amber-500 via-amber-200 to-orange-500 bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                  {heroData?.title_highlight || "Personnalisation"}
                </span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.35}>
              <h2 className="text-2xl sm:text-4xl xl:text-5xl font-heading font-medium tracking-tight text-stone-300">
                {heroData?.subtitle || t('hero.subtitle')}
              </h2>
            </FadeUp>
          </div>
          
          <FadeUp delay={0.45}>
            <p className="text-lg text-stone-300 max-w-xl font-light leading-relaxed">
              {heroData?.description || t('hero.description')}
            </p>
          </FadeUp>

          <FadeUp delay={0.65} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-5 pt-4 w-full sm:w-auto">
            <Link href={heroData?.cta_primary_link || "/products"} className="btn-primary flex items-center justify-center group text-center py-4 px-8 rounded-full font-semibold">
              {heroData?.cta_primary_text || t('hero.cta_collection')}
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href={heroData?.cta_secondary_link || "/about"} className="btn-secondary flex items-center justify-center text-center py-4 px-8 rounded-full font-semibold">
              {heroData?.cta_secondary_text || t('hero.cta_about')}
            </Link>
          </FadeUp>
        </div>

        {/* DROIT : CARTE INTERACTIVE MULTICOUCHE (3D + Floating Elements) */}
        <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center items-center py-12">
          
          {/* Lueur de feu 3D dynamique en arrière-plan */}
          <motion.div 
            style={{ x: floatX1, y: floatY1 }}
            className="absolute -inset-4 bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 rounded-3xl blur-[40px] opacity-35 pointer-events-none"
          />

          {/* Conteneur principal 3D */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            className="relative w-full max-w-[340px] aspect-[4/5] rounded-[2.5rem] p-1 bg-gradient-to-br from-orange-600/30 to-amber-500/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 overflow-visible group cursor-grab active:cursor-grabbing"
          >
            {/* Contenu intérieur */}
            <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-[#120804] p-2 relative flex flex-col justify-between">
              
              {/* Bordure laser intérieure */}
              <div className="absolute inset-2 border border-dashed border-amber-500/40 rounded-[1.8rem] pointer-events-none z-10"></div>
              
              {/* Image principale */}
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={heroData?.image_3d || "/header-droit.jpeg"} 
                  alt="Art et personnalisation AlixcoLuxe" 
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                />
                
                {/* Overlay sombre progressif */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120804]/90 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Texte overlay sur l'image en bas */}
              <div className="absolute bottom-6 left-6 right-6 z-20" style={{ transform: 'translateZ(30px)' }}>
                <span className="text-[10px] uppercase tracking-widest text-[hsl(var(--primary))] font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> {t('hero.badge_precision')}
                </span>
                <h3 className="text-lg font-heading font-bold text-white mt-1">{t('hero.badge_custom_design')}</h3>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 1: Haute Précision (Top Left) */}
          <motion.div
            style={{ x: floatX1, y: floatY1, transform: 'translateZ(50px)' }}
            className="absolute -top-4 -left-6 z-30 flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-white/10 bg-[hsl(var(--background))]/70 backdrop-blur-xl shadow-xl pointer-events-none"
          >
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))]/20 flex items-center justify-center text-[hsl(var(--primary))]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{t('hero.badge_laser')}</div>
              <div className="text-[10px] text-stone-400">{t('hero.badge_precision_mm')}</div>
            </div>
          </motion.div>

          {/* Floating Element 2: Pièces Uniques (Bottom Right) */}
          <motion.div
            style={{ x: floatX2, y: floatY2, transform: 'translateZ(40px)' }}
            className="absolute -bottom-2 -right-8 z-30 flex items-center gap-2.5 px-4 py-3 rounded-2xl border border-white/10 bg-[hsl(var(--background))]/70 backdrop-blur-xl shadow-xl pointer-events-none"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{t('hero.badge_unique')}</div>
              <div className="text-[10px] text-stone-400">{t('hero.badge_certified')}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de Défilement (Scroll) Dynamique et Stylisé */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-2 font-medium">
          {t('hero.scroll')}
        </span>
        <div className="w-6 h-10 rounded-full border border-white/20 p-1 flex justify-center">
          <motion.div 
            animate={{ 
              y: [0, 14, 0],
              opacity: [1, 0.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]"
          />
        </div>
      </div>
    </section>
  );
}

