/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Global Navigation Header (Liquid Glass style)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const cartItems = useCartStore(state => state.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading text-3xl font-bold tracking-wider text-[hsl(var(--text-main))] hover:text-orange-600 transition-colors">
              ALIXCO <span className="text-[hsl(var(--primary))]">LUXE</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-stone-600 hover:text-orange-600 font-medium transition-colors">Accueil</Link>
            <Link to="/products" className="text-stone-600 hover:text-orange-600 font-medium transition-colors">Catalogue</Link>
            <Link to="/about" className="text-stone-600 hover:text-orange-600 font-medium transition-colors">L'Atelier</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative text-stone-600 hover:text-orange-600 transition-colors p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[hsl(var(--primary))] rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="text-sm font-semibold text-stone-800 hover:text-orange-600 transition-colors">
                  Mon Compte
                </Link>
                <button onClick={logout} className="text-sm font-medium text-stone-500 hover:text-stone-800 transition-colors">
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-sm font-medium text-stone-600 hover:text-orange-600 transition-colors">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
