/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Process Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { PenTool, Crosshair, Sparkles } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

const steps = [
  { icon: PenTool, title: "1. Idéation & Design", desc: "Tout commence par un croquis, un plan. Notre bureau d'étude numérise vos visions avec une précision vectorielle." },
  { icon: Crosshair, title: "2. Précision Laser", desc: "Nos machines entrent en action. Le faisceau lumineux incise, creuse ou découpe la matière au dixième de millimètre près." },
  { icon: Sparkles, title: "3. Finition Manuelle", desc: "L'œil humain valide. Ponçage délicat, vernis protecteur, assemblage final... L'œuvre prend vie." }
];

export function AtelierProcessSection() {
  return (
    <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-20 flex flex-col items-center">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Méthodologie</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Le Processus de Création</h2>
          <div className="accent-line"></div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 -z-10"></div>
          {steps.map((step, idx) => (
            <FadeUp key={idx} delay={idx * 0.2} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[hsl(var(--background))] border border-[hsl(var(--primary))]/50 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(234,88,12,0.2)]">
                <step.icon className="w-8 h-8 text-[hsl(var(--primary))]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">{step.title}</h3>
              <p className="text-stone-400 font-light text-sm">{step.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
