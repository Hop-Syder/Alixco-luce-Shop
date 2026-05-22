/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Home Page / Landing (Design Dark Luxe & Précision)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustBannerSection } from '@/components/home/TrustBannerSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProductsSection } from '@/components/home/FeaturedProductsSection';
import { PromoSection } from '@/components/home/PromoSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-[hsl(var(--background))]">
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
