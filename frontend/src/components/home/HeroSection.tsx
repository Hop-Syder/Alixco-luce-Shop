/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Hero Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { FadeUp } from '@/components/ui/FadeUp';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 lg:px-12 xl:px-24 text-left pt-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=2000" 
          alt="Laser cutting wood macro" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/80 via-transparent to-[hsl(var(--background))]"></div>
        {/* Glowing Accents */}
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[hsl(var(--primary))]/10 blur-[150px] pointer-events-none mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center -mt-10 md:-mt-20">
        {/* DIV GAUCHE: TEXTES ET BOUTONS */}
        <div className="space-y-6 flex flex-col items-start">
          <FadeUp delay={0.1} className="flex flex-col items-start">
            <span className="text-[hsl(var(--primary))] uppercase tracking-[0.3em] text-sm md:text-base font-bold mb-4 block">
              Maison de Personnalisation
            </span>
            <div className="accent-line"></div>
          </FadeUp>
          
          <div className="relative">
            <AnimatedTitle 
              text1="L'Art de l'Unique" 
              text2="& du Sur-Mesure" 
              className="text-4xl md:text-6xl lg:text-7xl text-white text-left" 
            />
          </div>
          
          <FadeUp delay={0.4}>
            <p className="text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed">
              Installés au cœur du Bénin, nous donnons vie à vos émotions à travers des pièces d'exception. Maîtres de la gravure laser sur chaînes, bois et tissus, nous créons vos coffrets personnalisés et façonnons des œuvres uniques qui portent votre empreinte.
            </p>
          </FadeUp>

          <FadeUp delay={0.6} className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 pt-2 w-full">
            <Link href="/products" className="btn-primary w-full sm:w-auto flex items-center justify-center group">
              Découvrir la Collection
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link href="/about" className="btn-secondary w-full sm:w-auto flex items-center justify-center">
              Notre Savoir-Faire
            </Link>
          </FadeUp>
        </div>

        {/* DIV DROIT: CARTE IMAGE AVEC BORDURE "FEU DE BOIS" */}
        <FadeUp delay={0.8} className="relative w-full max-w-md mx-auto lg:ml-auto group">
          {/* Effet lueur de feu en arrière plan */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
          
          {/* L'image elle-même avec la trace de feu (bordure) de 2px */}
          <div className="relative rounded-xl overflow-hidden border-2 border-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.6)] aspect-[4/5] p-1.5 bg-[#1a0800]">
            {/* Le contour intérieur en pointillés pour l'effet "trace laser sur bois" */}
            <div className="w-full h-full border-2 border-dashed border-amber-500/80 rounded-lg overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1618220179428-22790b46a015?auto=format&fit=crop&q=80&w=800" 
                alt="Art et personnalisation AlixcoLuxe" 
                className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700"
              />
            </div>
          </div>
        </FadeUp>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
        <span className="text-xs uppercase tracking-widest text-white mb-2">Découvrir</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}
