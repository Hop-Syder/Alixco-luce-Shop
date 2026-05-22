/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product Grid Component
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="col-span-full text-center py-20 glass-card rounded-[2rem]">
        <p className="text-stone-500 text-lg">Notre collection est en cours de renouvellement.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
