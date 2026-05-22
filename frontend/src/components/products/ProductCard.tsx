/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product Card Component
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/10 h-full flex flex-col">
        
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image || 'https://via.placeholder.com/600x750?text=Alixco+Luxe'} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {product.stock <= 0 && (
            <div className="absolute top-4 right-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              Rupture
            </div>
          )}
        </div>
        
        <div className="p-8 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-[0.15em] font-bold mb-2">{product.category}</p>
            <h3 className="text-xl font-heading font-bold text-stone-900 mb-2 line-clamp-2">{product.name}</h3>
          </div>
          <p className="text-lg font-semibold text-stone-700 mt-4">{product.price.toLocaleString()} FCFA</p>
        </div>
        
      </div>
    </Link>
  );
}
