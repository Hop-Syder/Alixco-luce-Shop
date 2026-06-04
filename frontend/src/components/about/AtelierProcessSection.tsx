/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Process Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";
import React from 'react';
import { PenTool, Crosshair, Sparkles } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';

export function AtelierProcessSection() {
  const { t } = useTranslation();

  const steps = [
    { icon: PenTool, title: t('about.process_step1_title'), desc: t('about.process_step1_desc') },
    { icon: Crosshair, title: t('about.process_step2_title'), desc: t('about.process_step2_desc') },
    { icon: Sparkles, title: t('about.process_step3_title'), desc: t('about.process_step3_desc') }
  ];

  return (
    <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-20 flex flex-col items-center">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">{t('about.process_subtitle')}</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">{t('about.process_title')}</h2>
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
