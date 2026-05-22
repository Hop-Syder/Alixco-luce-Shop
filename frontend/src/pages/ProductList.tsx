/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Product List Page (Liquid Glass Design)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-orange-200/20 blur-[120px] pointer-events-none -z-10"></div>
      
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-center">
          <h2 className="text-sm font-bold tracking-[0.2em] text-[hsl(var(--primary))] uppercase mb-4">Notre Collection</h2>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[hsl(var(--text-main))]">
            Le Catalogue <span className="text-glow text-[hsl(var(--primary))]">Alixco</span>
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[hsl(var(--primary))]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.length > 0 ? products.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id} className="group">
                <div className="glass-card rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-900/10 h-full flex flex-col">
                  
                  <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
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
            )) : (
              <div className="col-span-full text-center py-20 glass-card rounded-[2rem]">
                <p className="text-stone-500 text-lg">Notre collection est en cours de renouvellement.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;
