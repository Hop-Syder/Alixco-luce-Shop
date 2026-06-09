/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description About / Atelier Page (Design Dark Luxe & Précision)
 * @created 2026-05-22
 * @updated 2026-06-09
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import type { Metadata } from 'next';
import React from 'react';
import { AtelierHeroSection } from '@/components/about/AtelierHeroSection';
import { AtelierPhilosophySection } from '@/components/about/AtelierPhilosophySection';
import { AtelierMaterialsSection } from '@/components/about/AtelierMaterialsSection';
import { AtelierProcessSection } from '@/components/about/AtelierProcessSection';
import { AtelierMachinesSection } from '@/components/about/AtelierMachinesSection';
import { AtelierLocationSection } from '@/components/about/AtelierLocationSection';
import { AtelierCTASection } from '@/components/about/AtelierCTASection';

export const metadata: Metadata = {
  title: "Notre Atelier de Création — Gravure Laser & Artisanat à Cotonou",
  description:
    "Découvrez l'atelier AlixcoLuxe à Cotonou, Bénin. Techniques artisanales d'excellence, gravure laser, création d'objets d'art sur-mesure. Venez nous rencontrer ou commandez en ligne.",
  keywords: [
    "atelier gravure Cotonou",
    "artisan Bénin",
    "création sur-mesure Cotonou",
    "AlixcoLuxe atelier",
    "gravure laser artisan Bénin",
  ],
  alternates: {
    canonical: "https://alixcoluxe.com/about",
  },
  openGraph: {
    title: "Atelier AlixcoLuxe — Artisanat & Gravure Laser à Cotonou, Bénin",
    description:
      "L'atelier de création artisanale d'AlixcoLuxe. Gravure laser sur bois, verre et métal, objets d'art et cadeaux personnalisés fabriqués à Cotonou.",
    url: "https://alixcoluxe.com/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-[hsl(var(--background))]">
      <AtelierHeroSection />
      <AtelierPhilosophySection />
      <AtelierMaterialsSection />
      <AtelierProcessSection />
      <AtelierMachinesSection />
      <AtelierLocationSection />
      <AtelierCTASection />
    </div>
  );
}
