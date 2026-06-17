"use client";

/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Global Navigation Header with Mobile Bottom Nav
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/context/LanguageContext';
import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, User, LogOut, Home, Grid, PenTool, Bell } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { t } = useTranslation();
  const cartItems = useCartStore(state => state.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const pathname = usePathname();

  // Navigation principale (utilisée en desktop top-nav et mobile bottom-nav)
  const navLinks = [
    { name: t('nav.home'), path: '/', icon: Home },
    { name: t('nav.catalog'), path: '/products', icon: Grid },
    { name: t('nav.workshop'), path: '/about', icon: PenTool },
  ];

  return (
    <>
      {/* 
        HEADER TOP (Visible sur Mobile & Desktop) 
        - Desktop : Contient Logo, Liens Principaux, Actions (Compte, Panier)
        - Mobile : Contient Logo (gauche), Actions spécifiques (droite)
      */}
      <header className="glass-nav z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 -translate-y-[5px]">
            
            {/* Logo (Gauche) */}
            <div className="flex-shrink-0 flex items-center z-50">
              <Link href="/" className="relative z-50 flex items-center">
                <Image 
                  src="/logo.png" 
                  alt="AlixcoLuxe Logo" 
                  width={150} 
                  height={50} 
                  className="object-contain h-10 w-auto md:h-12"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Desktop (Centrée, cachée sur mobile) */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name} 
                    href={link.path} 
                    className={`relative text-sm uppercase tracking-widest font-medium transition-colors group py-2 ${
                      isActive ? 'text-[hsl(var(--primary))]' : 'text-stone-400 hover:text-[hsl(var(--text-main))]'
                    }`}
                  >
                    {link.name}
                    {/* Indicateur actif desktop */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[hsl(var(--primary))] origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                );
              })}
            </nav>

            {/* Actions (Droite) */}
            <div className="flex items-center space-x-4 md:space-x-6 z-50">
              
              {/* Notification - Uniquement Mobile (Fixé en haut à droite) */}
              <button type="button" aria-label="Notifications" className="md:hidden relative text-stone-400 hover:text-[hsl(var(--primary))] transition-colors p-2">
                <Bell className="w-5 h-5" strokeWidth={1.5} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[hsl(var(--primary))] rounded-full border border-black"></span>
              </button>



              {/* Action de compte supprimée du Header Top (Mobile) et déplacée en bas */}


              {/* Panier (Visible Desktop & Mobile) */}
              <Link href="/cart" aria-label={`Panier avec ${cartItemCount} articles`} className="relative text-stone-400 hover:text-[hsl(var(--primary))] transition-colors p-2 flex items-center">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-[hsl(var(--primary))] rounded-full border border-black md:w-5 md:h-5 md:text-[10px] md:border-2">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* 
        BOTTOM NAVIGATION (Uniquement sur Mobile) 
        - Design "Pro UI" : Floating Dock / Pill
      */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full z-50 shadow-2xl px-2">
        <div className="flex justify-between items-center h-[60px] px-2">
          {[
            ...navLinks
          ].map((link) => {
            const isActive = pathname === link.path;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.name}
                href={link.path}
                className="group relative flex flex-col items-center justify-center w-full h-full"
              >
                {/* Effet de survol uniquement (sans fond orange actif) */}
                <div className={`absolute w-12 h-10 rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive ? 'opacity-0' : 'scale-50 opacity-0 group-hover:scale-75 group-hover:bg-white/5 group-hover:opacity-100'
                }`} />

                {/* Conteneur Icône */}
                <div className={`relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive ? '-translate-y-2' : 'translate-y-0 group-hover:-translate-y-1'
                }`}>
                  <Icon 
                    className={`w-[22px] h-[22px] transition-colors duration-300 ${
                      isActive ? 'text-[hsl(var(--primary))]' : 'text-stone-400'
                    }`} 
                    strokeWidth={isActive ? 2.5 : 1.5} 
                  />
                </div>
                
                {/* Libellé Texte */}
                <span className={`absolute bottom-1.5 z-10 text-[10px] tracking-wide font-medium transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isActive ? 'text-[hsl(var(--primary))] opacity-100 translate-y-0' : 'text-stone-500 opacity-0 translate-y-2'
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Header;
