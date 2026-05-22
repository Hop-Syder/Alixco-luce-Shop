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
          &quot;La machine trace avec une exactitude mathématique, mais c&apos;est la main humaine qui lui insuffle son âme.&quot;
        </p>
        <p className="text-stone-400 font-light">
          Chez Alixco, nous croyons que la haute technologie n&apos;a de sens que si elle sert le beau. Nous marions la puissance des lasers industriels à la minutie de l&apos;artisan d&apos;art. Le résultat : des pièces uniques, impeccables, imprégnées de caractère.
        </p>
      </FadeUp>
    </section>
  );
}
