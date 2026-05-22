/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description About / Atelier Page (Design Dark Luxe & Précision)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { AtelierHeroSection } from '@/components/about/AtelierHeroSection';
import { AtelierPhilosophySection } from '@/components/about/AtelierPhilosophySection';
import { AtelierMaterialsSection } from '@/components/about/AtelierMaterialsSection';
import { AtelierProcessSection } from '@/components/about/AtelierProcessSection';
import { AtelierMachinesSection } from '@/components/about/AtelierMachinesSection';
import { AtelierCTASection } from '@/components/about/AtelierCTASection';

export default function AboutPage() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-[hsl(var(--background))]">
      <AtelierHeroSection />
      <AtelierPhilosophySection />
      <AtelierMaterialsSection />
      <AtelierProcessSection />
      <AtelierMachinesSection />
      <AtelierCTASection />
    </div>
  );
}
