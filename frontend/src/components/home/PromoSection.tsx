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
import React from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

export function PromoSection() {
  return (
    <section className="py-20 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeUp>
          <div className="relative border border-white/5 overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a]">
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600" 
              alt="Promo" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen pointer-events-none" 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 pointer-events-none"></div>
            
            {/* Content Container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 p-8 md:p-16 lg:p-20 gap-12 lg:gap-20 items-center">
              {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-[0.3em]">
                  <Clock className="w-4 h-4 mr-3" /> Vente Flash Exclusive
                </div>
                
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white leading-none tracking-tight">
                  L'Édition Limitée <br/>
                  <span className="text-gradient-gold mt-1 block">"Noir &amp; Or"</span>
                </h2>
                
                <p className="text-stone-400 text-lg md:text-xl font-light leading-snug max-w-lg">
                  Profitez de privilèges sur notre collection la plus exclusive. Une fusion parfaite entre la chaleur du bois noble et l'éclat de l'or, taillée avec une précision millimétrique.
                </p>
              </div>
              
              <ul className="space-y-3 text-stone-300 font-light text-base md:text-lg">
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  Finitions artisanales à la feuille d'or
                </li>
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  Certificat d'authenticité inclus
                </li>
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  Pièces numérotées de 1 à 50
                </li>
              </ul>
              
              <div className="pt-6">
                <Link href="/products?collection=limited" className="btn-primary inline-flex items-center group px-10 py-4 text-sm uppercase tracking-widest">
                  Accéder à la Vente
                  <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Countdown / Visual Element */}
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card p-12 md:p-16 flex gap-8 md:gap-12 text-center border border-white/10 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-6xl md:text-7xl font-heading text-white tabular-nums tracking-tighter">02</span>
                  <span className="text-xs text-[hsl(var(--primary))] uppercase tracking-[0.3em] mt-6 font-bold">Jours</span>
                </div>
                
                <span className="text-5xl md:text-6xl font-light text-white/20 mt-1 relative z-10">:</span>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-6xl md:text-7xl font-heading text-white tabular-nums tracking-tighter">14</span>
                  <span className="text-xs text-[hsl(var(--primary))] uppercase tracking-[0.3em] mt-6 font-bold">Heures</span>
                </div>
                
                <span className="text-5xl md:text-6xl font-light text-white/20 mt-1 relative z-10">:</span>
                
                <div className="flex flex-col relative z-10">
                  <span className="text-6xl md:text-7xl font-heading text-white tabular-nums tracking-tighter">45</span>
                  <span className="text-xs text-[hsl(var(--primary))] uppercase tracking-[0.3em] mt-6 font-bold">Min</span>
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
