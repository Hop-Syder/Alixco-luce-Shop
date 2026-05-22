"use client";

/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Global Navigation Header (Liquid Glass style) with Mobile Menu
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCartStore } from '@/store/cartStore';
import { Menu, X, ShoppingBag, User, LogOut, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const cartItems = useCartStore(state => state.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    // Using a microtask prevents the synchronous setState warning
    Promise.resolve().then(() => setIsMobileMenuOpen(false));
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/products' },
    { name: "L'Atelier", path: '/about' },
  ];

  return (
    <>
      <header className="glass-nav z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center z-50">
              <Link href="/" className="font-heading text-2xl md:text-3xl font-bold tracking-wider text-[hsl(var(--text-main))] hover:text-[hsl(var(--primary))] transition-colors relative z-50">
                ALIXCO <span className="text-[hsl(var(--primary))]">LUXE</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path} 
                  className={`text-sm uppercase tracking-widest font-medium transition-colors ${
                    pathname === link.path ? 'text-[hsl(var(--primary))]' : 'text-stone-600 hover:text-[hsl(var(--primary))]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions & Mobile Toggles */}
            <div className="flex items-center space-x-4 md:space-x-6 z-50">
              
              {/* Cart Icon (Visible on both) */}
              <Link href="/cart" className="relative text-stone-600 hover:text-[hsl(var(--primary))] transition-colors p-2 flex items-center">
                <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white transform translate-x-1/4 -translate-y-1/4 bg-[hsl(var(--primary))] rounded-full border-2 border-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Desktop Auth */}
              <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated ? (
                  <>
                    <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm uppercase tracking-widest font-semibold text-stone-800 hover:text-[hsl(var(--primary))] transition-colors flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Mon Compte
                    </Link>
                    <button onClick={logout} className="text-stone-400 hover:text-red-500 transition-colors p-2" title="Déconnexion">
                      <LogOut className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm uppercase tracking-widest font-medium text-stone-600 hover:text-[hsl(var(--primary))] transition-colors">
                      Connexion
                    </Link>
                    <Link href="/register" className="btn-primary text-xs uppercase tracking-widest px-5 py-2.5">
                      Créer un compte
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 text-stone-800 hover:text-[hsl(var(--primary))] transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-7 h-7" strokeWidth={1.5} /> : <Menu className="w-7 h-7" strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-40 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden flex flex-col pt-24 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col">
          <nav className="flex flex-col space-y-6 mb-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path} 
                className={`text-2xl font-heading font-bold transition-colors flex items-center justify-between group ${
                  pathname === link.path ? 'text-[hsl(var(--primary))]' : 'text-stone-800 hover:text-[hsl(var(--primary))]'
                }`}
              >
                {link.name}
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${pathname === link.path ? 'text-[hsl(var(--primary))] opacity-100' : 'text-stone-300 opacity-0 group-hover:opacity-100'}`} />
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-stone-100 pt-8 flex flex-col space-y-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 mb-4 text-stone-500">
                  <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">{user?.full_name || 'Utilisateur'}</p>
                    <p className="text-xs">{user?.email}</p>
                  </div>
                </div>
                <Link href={user?.role === 'admin' ? '/admin' : '/dashboard'} className="w-full py-3 px-4 border border-[hsl(var(--primary))] text-[hsl(var(--primary))] text-center rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-[hsl(var(--primary))]/5 transition-colors">
                  Mon Compte
                </Link>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-3 px-4 flex items-center justify-center text-red-500 font-bold uppercase tracking-widest text-sm hover:bg-red-50 transition-colors rounded-sm">
                  <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="w-full py-4 text-center font-bold uppercase tracking-widest text-sm text-stone-800 hover:text-[hsl(var(--primary))] transition-colors">
                  Connexion
                </Link>
                <Link href="/register" className="btn-primary w-full py-4 text-center font-bold uppercase tracking-widest text-sm">
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
