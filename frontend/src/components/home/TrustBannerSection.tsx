/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Trust Banner Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
import React from 'react';
import { Truck, RefreshCcw, ShieldCheck } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

export function TrustBannerSection() {
  return (
    <section className="border-y border-white/5 bg-[hsl(var(--surface-light))] py-12 relative z-10">
      <FadeUp className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <Truck className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-lg text-white tracking-wide uppercase">Livraison Premium</h3>
            <p className="text-sm text-stone-400 mt-2">Expédition sécurisée et sur-mesure</p>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <RefreshCcw className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-lg text-white tracking-wide uppercase">Exigence & Qualité</h3>
            <p className="text-sm text-stone-400 mt-2">Finitions contrôlées à la main</p>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
            <ShieldCheck className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-lg text-white tracking-wide uppercase">Paiement Sécurisé</h3>
            <p className="text-sm text-stone-400 mt-2">Transactions cryptées de bout en bout</p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
