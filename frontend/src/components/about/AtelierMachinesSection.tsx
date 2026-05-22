/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Machines Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

export function AtelierMachinesSection() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes laser-scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-laser {
          animation: laser-scan 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <FadeUp delay={0.1}>
          <div className="relative aspect-square rounded-2xl overflow-hidden border border-[hsl(var(--primary))]/30 shadow-[0_0_30px_rgba(234,88,12,0.15)] group">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent mix-blend-overlay z-10 group-hover:opacity-50 transition-opacity"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1565439390234-fcac65507119?auto=format&fit=crop&q=80&w=1000" alt="Machine Laser" className="w-full h-full object-cover opacity-80" />
            
            {/* Laser scanning effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-orange-500/80 shadow-[0_0_15px_rgba(234,88,12,1)] z-20 animate-laser"></div>
          </div>
        </FadeUp>

        <FadeUp delay={0.3} className="space-y-8">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Notre Équipement</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">Technologie <br/>de Pointe</h2>
          <p className="text-stone-300 font-light text-lg leading-relaxed">
            Notre parc machine est composé de graveurs et découpeurs laser de dernière génération. Ils offrent une résolution exceptionnelle permettant de reproduire les détails les plus infimes, qu&apos;il s&apos;agisse de typographies élégantes ou de motifs complexes.
          </p>
          <ul className="space-y-4 text-stone-400 text-sm font-light">
            <li className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-[hsl(var(--primary))] before:rounded-full before:mr-4">
              Laser CO2 Haute Précision pour les matières organiques.
            </li>
            <li className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-[hsl(var(--primary))] before:rounded-full before:mr-4">
              Laser Fibre pour le marquage inaltérable des métaux.
            </li>
            <li className="flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-[hsl(var(--primary))] before:rounded-full before:mr-4">
              Calibration optique au 1/100ème de millimètre.
            </li>
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
