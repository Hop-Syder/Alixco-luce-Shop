/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Home Page / Landing (Design Dark Luxe & Précision)
 * @created 2026-05-22
 * @updated 2026-06-09
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */

import type { Metadata } from 'next';
import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBannerSection } from '@/components/home/TrustBannerSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { PromoSection } from '@/components/home/PromoSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export const metadata: Metadata = {
  title: "Gravure Laser, Art & Cadeaux Personnalisés au Bénin",
  description:
    "AlixcoLuxe — l'atelier artisanal de référence à Cotonou, Bénin. Gravure laser sur bois, verre et métal, accessoires de mode, objets d'art uniques et cadeaux d'entreprise sur-mesure.",
  keywords: [
    "gravure laser Cotonou",
    "boutique artisanat Bénin",
    "cadeaux personnalisés Cotonou",
    "AlixcoLuxe",
    "art sur-mesure Bénin",
  ],
  alternates: {
    canonical: "https://alixcoluxe.com",
  },
  openGraph: {
    title: "AlixcoLuxe — Gravure Laser & Créations Artisanales au Bénin",
    description:
      "L'atelier de création sur-mesure de Cotonou. Gravure laser, objets d'art, accessoires de mode et cadeaux d'entreprise personnalisés.",
    url: "https://alixcoluxe.com",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col relative bg-[hsl(var(--background))]">
      <HeroSection />
      <TrustBannerSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <PromoSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}
