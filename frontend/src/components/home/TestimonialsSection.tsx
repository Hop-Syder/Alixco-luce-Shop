/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Testimonials Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
import React from 'react';
import { Star } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

export function TestimonialsSection() {
  return (
    <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeUp className="flex flex-col items-center">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Témoignages</span>
          <h2 className="text-4xl font-heading font-bold text-white mb-6">L'Excellence Reconnue</h2>
          <div className="accent-line mb-20"></div>
        </FadeUp>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Sophie L.", role: "Architecte d'intérieur", text: "La finesse de la découpe laser pour notre cloison en bois est époustouflante. Un véritable travail d'orfèvre qui a sublimé notre projet." },
            { name: "Marc D.", role: "Directeur Marketing", text: "Nous avons fait graver nos trophées d'entreprise en verre. Le rendu est ultra-premium et la précision des lettres est impressionnante." },
            { name: "Élise M.", role: "Cliente Vérifiée", text: "Le porte-clés en cuir gravé sur-mesure a fait un cadeau d'une élégance rare. L'expérience AlixcoLuxe est premium du début à la fin." }
          ].map((review, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="p-10 text-left flex flex-col justify-between h-full border border-white/5 bg-[hsl(var(--surface-neutral))]/30 hover:bg-[hsl(var(--surface-neutral))]/50 transition-colors">
                <div>
                  <div className="flex text-[hsl(var(--primary))] mb-8">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current mr-1" />)}
                  </div>
                  <p className="text-stone-300 font-light leading-relaxed mb-8">"{review.text}"</p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <h4 className="font-heading text-lg text-white">{review.name}</h4>
                  <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-widest mt-1">{review.role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
