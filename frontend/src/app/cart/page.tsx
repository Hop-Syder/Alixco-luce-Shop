/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Cart Page with Checkout (Liquid Glass Design)
 * @created 2026-05-22
 * @updated 2026-06-09
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
import { logger } from '@/services/logger';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';
import { toast } from 'react-hot-toast';

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

// Simple email validation
const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Simple phone validation (basic)
const validatePhone = (phone: string): boolean => {
  return /^[\d+\-\s()]+$/.test(phone) && phone.length >= 8;
};

export default function CartPage(): JSX.Element {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: user?.full_name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: ''
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Validate form before submission
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!validateEmail(customerInfo.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!validatePhone(customerInfo.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = 'L\'adresse est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Le panier est vide');
      return;
    }

    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs du formulaire');
      return;
    }

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

      toast.success(t('cart.success_msg'));
      logger.info('Order placed successfully', { orderId: response.data.id });

      // Redirect after a brief delay
      setTimeout(() => {
        router.push('/');
      }, 2000);

    } catch (error) {
      logger.error('Checkout error', error);

      // Provide user-friendly error message
      const errorMessage = error instanceof Error
        ? error.message
        : 'Une erreur est survenue lors de la commande';

      toast.error(errorMessage || t('cart.error_msg'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[hsl(var(--background))] py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">

        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-stone-300/30 blur-[100px] pointer-events-none -z-10"></div>

        <div className="glass-card rounded-[2.5rem] p-12 max-w-lg w-full text-center shadow-xl">
          <div className="w-24 h-24 bg-[hsl(var(--primary))]/20 rounded-full flex items-center justify-center mx-auto mb-8 text-[hsl(var(--primary))]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-heading font-bold text-[hsl(var(--text-main))] mb-4">{t('cart.empty_title')}</h2>
          <p className="text-stone-500 mb-10 text-lg font-light">{t('cart.empty_desc')}</p>
          <Link href="/products" className="btn-primary w-full inline-block">
            {t('cart.explore')}
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
            <h1 className="text-4xl font-heading font-bold text-[hsl(var(--text-main))] mb-2">{t('cart.selection_title')}</h1>
            <p className="text-stone-500 font-light">{t('cart.selection_desc')}</p>
          </div>

          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="glass-card flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[2rem]">
                <div className="relative w-32 h-32">
                  <Image src={item.image || 'https://via.placeholder.com/300'} alt={item.name} fill className="object-cover rounded-2xl shadow-sm" unoptimized />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-heading font-bold text-2xl text-[hsl(var(--text-main))] mb-1">{item.name}</h3>
                  <p className="text-[hsl(var(--primary))] font-semibold text-xl">{item.price.toLocaleString()} FCFA</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-[hsl(var(--surface-neutral))] border border-white/10 rounded-xl overflow-hidden shadow-sm">
                    <button
                      type="button"
                      aria-label="Diminuer la quantité"
                      className="px-4 py-2 text-stone-400 hover:bg-white/5 hover:text-[hsl(var(--primary))] transition-colors"
                      onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                    >-</button>
                    <span className="px-3 font-semibold text-[hsl(var(--text-main))] w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Augmenter la quantité"
                      className="px-4 py-2 text-stone-400 hover:bg-white/5 hover:text-[hsl(var(--primary))] transition-colors"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >+</button>
                  </div>

                  <button
                    type="button"
                    aria-label="Retirer du panier"
                    onClick={() => removeItem(item.productId)}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
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
            <h2 className="text-2xl font-heading font-bold text-[hsl(var(--text-main))] mb-6">{t('cart.checkout_title')}</h2>

            <div className="flex justify-between items-end mb-8 pb-8 border-b border-white/10">
              <span className="text-stone-400 font-medium">{t('cart.estimated_total')}</span>
              <span className="font-bold text-3xl text-[hsl(var(--text-main))]">{total.toLocaleString()} <span className="text-lg text-stone-500">FCFA</span></span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold tracking-wide text-stone-300 mb-2 uppercase">{t('cart.full_name')}</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full bg-[hsl(var(--surface-neutral))] border rounded-xl p-3 focus:ring-2 focus:border-transparent outline-none transition-all text-[hsl(var(--text-main))] placeholder:text-stone-600 ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-white/10 focus:ring-[hsl(var(--primary))]'
                    }`}
                  placeholder="Jean Dupont"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-stone-300 mb-2 uppercase">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => {
                      setCustomerInfo({ ...customerInfo, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full bg-[hsl(var(--surface-neutral))] border rounded-xl p-3 focus:ring-2 focus:border-transparent outline-none transition-all text-[hsl(var(--text-main))] placeholder:text-stone-600 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-white/10 focus:ring-[hsl(var(--primary))]'
                      }`}
                    placeholder="jean@mail.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold tracking-wide text-stone-300 mb-2 uppercase">WhatsApp</label>
                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => {
                      setCustomerInfo({ ...customerInfo, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`w-full bg-[hsl(var(--surface-neutral))] border rounded-xl p-3 focus:ring-2 focus:border-transparent outline-none transition-all text-[hsl(var(--text-main))] placeholder:text-stone-600 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-white/10 focus:ring-[hsl(var(--primary))]'
                      }`}
                    placeholder="+229..."
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold tracking-wide text-stone-300 mb-2 uppercase">{t('cart.address')}</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => {
                    setCustomerInfo({ ...customerInfo, address: e.target.value });
                    if (errors.address) setErrors({ ...errors, address: undefined });
                  }}
                  className={`w-full bg-[hsl(var(--surface-neutral))] border rounded-xl p-3 focus:ring-2 focus:border-transparent outline-none transition-all resize-none text-[hsl(var(--text-main))] placeholder:text-stone-600 ${errors.address ? 'border-red-500 focus:ring-red-400' : 'border-white/10 focus:ring-[hsl(var(--primary))]'
                    }`}
                  rows={3}
                  placeholder="Quartier, Rue, Ville..."
                ></textarea>
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className={`w-full text-lg py-4 mt-6 flex justify-center items-center gap-2 rounded-xl font-semibold transition-all ${isSubmitting || items.length === 0
                    ? 'btn-primary opacity-50 cursor-not-allowed'
                    : 'btn-primary hover:shadow-xl'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t('cart.preparing')}
                  </>
                ) : (
                  t('cart.order_whatsapp')
                )}
              </button>

              <p className="text-xs text-center text-stone-400 mt-4">
                {t('cart.redirect_notice')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

