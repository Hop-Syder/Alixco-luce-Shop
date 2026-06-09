/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product List Page (Liquid Glass Design)
 * @created 2026-05-22
 * @updated 2026-06-09
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import type { Metadata } from 'next';
"use client";

export const metadata: Metadata = {
  title: "Catalogue — Gravure Laser, Art & Accessoires Personnalisés",
  description:
    "Parcourez le catalogue AlixcoLuxe : gravures laser, objets d'art, accessoires de mode et cadeaux d'entreprise fabriqués sur-mesure à Cotonou, Bénin. Commandez en ligne.",
  keywords: [
    "produits artisanat Bénin",
    "catalogue gravure laser",
    "acheter cadeaux personnalisés Cotonou",
    "boutique luxe artésanat",
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
import React, { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { ProductHeader } from '@/components/products/ProductHeader';
import { ProductGrid } from '@/components/products/ProductGrid';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // By default we get page 1, limit 20. For full shop, we might want limit 100 or infinite scroll.
        // Keeping it simple: limit 100 to show most products
        const response = await api.get('/products', { params: { limit: 100 } });
        setProducts(response.data.items || []);
      } catch (error: unknown) {
        const err = error as { isAxiosError?: boolean, message?: string };
        if (err.isAxiosError && err.message === 'Network Error') {
          console.warn("Le backend n'est pas accessible pour récupérer les produits.");
        } else {
          console.error('Error fetching products', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] relative overflow-hidden">
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <ProductHeader />
        <ProductGrid products={products} loading={loading} />
      </main>
    </div>
  );
}
