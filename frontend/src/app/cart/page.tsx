/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Cart Page with Checkout (Liquid Glass Design)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';
import Image from 'next/image';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.full_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const orderData = {
        customer: customerInfo,
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity, notes: '' })),
        userId: user?.id || null
      };
      
      const response = await api.post('/orders/', orderData);
      
      clearCart();
      
      if (response.data.whatsappUrl) {
        window.open(response.data.whatsappUrl, '_blank');
      }
      
      alert("Commande préparée. Redirection vers WhatsApp...");
      router.push('/');
      
    } catch (error) {
      console.error("Error during checkout", error);
      alert("Une erreur est survenue lors de la validation de la commande.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
        
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-stone-300/30 blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="glass-card rounded-[2.5rem] p-12 max-w-lg w-full text-center shadow-xl">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8 text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-[hsl(var(--text-main))] mb-4">Votre Écrin est Vide</h2>
          <p className="text-stone-500 mb-10 text-lg font-light">Découvrez notre collection pour trouver l&apos;inspiration.</p>
          <Link href="/products" className="btn-primary w-full inline-block">
            Explorer le Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Blurs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-200/20 blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
        
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-[hsl(var(--text-main))] mb-2">Votre Sélection</h1>
            <p className="text-stone-500 font-light">Vérifiez les pièces avant de finaliser votre commande.</p>
          </div>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="glass-card flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem]">
                <div className="relative w-32 h-32">
                  <Image src={item.image || 'https://via.placeholder.com/300'} alt={item.name} fill className="object-cover rounded-2xl shadow-sm" unoptimized />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-heading font-bold text-2xl text-stone-900 mb-1">{item.name}</h3>
                  <p className="text-[hsl(var(--primary))] font-semibold text-xl">{item.price.toLocaleString()} FCFA</p>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      className="px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-[hsl(var(--primary))] transition-colors"
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    >-</button>
                    <span className="px-3 font-semibold text-stone-800 w-8 text-center">{item.quantity}</span>
                    <button 
                      className="px-4 py-2 text-stone-600 hover:bg-stone-50 hover:text-[hsl(var(--primary))] transition-colors"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.productId)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    title="Retirer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Checkout Form */}
        <div className="w-full lg:w-1/3">
          <div className="glass-card rounded-[2.5rem] p-8 sticky top-32 border-t-[4px] border-t-[hsl(var(--primary))]">
            <h2 className="text-2xl font-heading font-bold text-stone-900 mb-6">Finalisation</h2>
            
            <div className="flex justify-between items-end mb-8 pb-8 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Total Estimé</span>
              <span className="font-bold text-3xl text-stone-900">{total.toLocaleString()} <span className="text-lg text-stone-500">FCFA</span></span>
            </div>
            
            <form onSubmit={handleCheckout} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold tracking-wide text-stone-700 mb-2 uppercase">Nom complet</label>
                <input 
                  required
                  type="text" 
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full bg-white/50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                  placeholder="Jean Dupont"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-stone-700 mb-2 uppercase">Email</label>
                  <input 
                    required
                    type="email" 
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full bg-white/50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                    placeholder="jean@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-stone-700 mb-2 uppercase">WhatsApp</label>
                  <input 
                    required
                    type="tel" 
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full bg-white/50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all"
                    placeholder="+225..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold tracking-wide text-stone-700 mb-2 uppercase">Adresse complète</label>
                <textarea 
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full bg-white/50 border border-stone-200 rounded-xl p-3 focus:ring-2 focus:ring-[hsl(var(--primary))] focus:border-transparent outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Quartier, Rue, Ville..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-lg py-4 mt-6 flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Préparation...' : 'Commander via WhatsApp'}
              </button>
              
              <p className="text-xs text-center text-stone-400 mt-4">
                En validant, vous serez redirigé vers WhatsApp pour finaliser l&apos;achat avec un conseiller.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

