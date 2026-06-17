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
import { useTranslation } from '@/context/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'react-hot-toast';

export function ProductCard({ product }: { product: Product }) {
  const { t, language } = useTranslation();
  const addItem = useCartStore((state) => state.addItem);
  const name = language === 'en' ? (product.name_en || product.name_fr) : (product.name_fr || product.name_en);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la navigation du Link
    e.stopPropagation();

    if (product.stock <= 0) {
      toast.error(t('products.out_of_stock') || 'Rupture de stock');
      return;
    }

    addItem({
      productId: product._id,
      name,
      price: product.price,
      quantity: 1,
      image: product.image
    });

    toast.success(t('cart.added') || 'Ajouté au panier');
  };

  return (
    <Link href={`/products/${product._id}`} className="group block h-full">
      <div className="relative glass-card rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[hsl(var(--primary))]/20 h-full flex flex-col border border-white/10 bg-[#0a0a0a]/60">
        
        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent z-20 pointer-events-none"></div>

        <div className="relative aspect-[4/5] overflow-hidden bg-stone-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image || 'https://via.placeholder.com/600x750?text=Alixco+Luxe'} 
            alt={name} 
            className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 ease-out"
          />
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.stock <= 0 && (
              <div className="bg-red-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-red-500/30">
                {t('products.out_of_stock')}
              </div>
            )}
          </div>
          
          {/* Sliding Quick Action */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-10">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className={`w-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold uppercase tracking-widest py-3 text-center transition-colors
                ${product.stock > 0 ? 'hover:bg-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] cursor-pointer' : 'opacity-50 cursor-not-allowed'}
              `}
            >
              {product.stock > 0 ? (t('products.add_to_cart') || 'Ajouter au panier') : (t('products.out_of_stock') || 'Rupture')}
            </button>
          </div>
          
          {/* Gradient Overlay for bottom text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="p-6 md:p-8 flex-grow flex flex-col justify-between relative z-10 bg-gradient-to-b from-transparent to-black/40">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-4 h-[1px] bg-[hsl(var(--primary))] block"></span>
              <p className="text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] font-bold">{product.category}</p>
            </div>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2 line-clamp-2 group-hover:text-gradient-gold transition-colors duration-300">{name}</h3>
          </div>
          
          <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
            <p className="text-lg md:text-xl font-light text-stone-300 tracking-wide">{product.price.toLocaleString()} <span className="text-[10px] text-[hsl(var(--primary))] font-bold ml-1">FCFA</span></p>
            
            {/* Arrow icon that moves on hover */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/40 group-hover:text-[hsl(var(--primary))] group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
        
      </div>
    </Link>
  );
}
