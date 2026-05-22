/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier CTA Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

export function AtelierCTASection() {
  return (
    <section className="py-24 bg-[hsl(var(--surface-neutral))]/30 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-[hsl(var(--primary))]/10 blur-[100px] pointer-events-none -z-10"></div>
      
      <FadeUp className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <h2 className="text-4xl font-heading font-bold text-white">Vous avez une idée ?</h2>
        <p className="text-xl text-stone-300 font-light">
          Donnons forme à votre imagination. Particuliers ou professionnels, notre atelier est à votre écoute pour concevoir la pièce qui vous ressemble.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/products" className="btn-primary flex items-center justify-center group">
            Explorer le Catalogue
            <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link href="/contact" className="btn-secondary flex items-center justify-center">
            Demander un Devis
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}
