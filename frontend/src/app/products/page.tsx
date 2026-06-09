/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product List Page — Server Component wrapper (SEO metadata)
 * @created 2026-05-22
 * @updated 2026-06-09
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import type { Metadata } from 'next';
import ProductListClient from './ProductListClient';

export const metadata: Metadata = {
  title: "Catalogue — Gravure Laser, Art & Accessoires Personnalisés",
  description:
    "Parcourez le catalogue AlixcoLuxe : gravures laser, objets d'art, accessoires de mode et cadeaux d'entreprise fabriqués sur-mesure à Cotonou, Bénin. Commandez en ligne.",
  keywords: [
    "produits artisanat Bénin",
    "catalogue gravure laser",
    "acheter cadeaux personnalisés Cotonou",
    "boutique luxe artisanat",
  ],
  alternates: {
    canonical: "https://alixcoluxe.com/products",
  },
  openGraph: {
    title: "Catalogue AlixcoLuxe — Créations Artisanales Personnalisées",
    description:
      "Gravures laser, objets d'art, accessoires et cadeaux d'entreprise sur-mesure. Fabriqués avec passion à Cotonou, Bénin.",
    url: "https://alixcoluxe.com/products",
    type: "website",
  },
};

export default function ProductsPage() {
  return <ProductListClient />;
}
