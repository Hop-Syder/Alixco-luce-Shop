/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Philosophy Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

export function AtelierPhilosophySection() {
  return (
    <section className="py-24 bg-[hsl(var(--surface-light))] border-y border-white/5 relative z-10">
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">Notre Vision</h2>
        <p className="text-xl md:text-2xl font-light text-stone-300 leading-relaxed italic mb-8">
          &quot;Chez AlixcoLuxe, nous ne créons pas de simples objets, nous façonnons des pièces uniques qui portent votre empreinte.&quot;
        </p>
        <p className="text-stone-400 font-light">
          Nous croyons que chaque détail compte. De la toile de maître personnalisée à la bague gravée, en passant par la customisation de vos vêtements préférés, nous transformons vos idées en chefs-d'œuvre pour sublimer votre quotidien. Que ce soit pour un cadeau mémorable ou pour vous faire plaisir, notre atelier est le lieu où l'art rencontre l'exceptionnel.
        </p>
      </FadeUp>
    </section>
  );
}
