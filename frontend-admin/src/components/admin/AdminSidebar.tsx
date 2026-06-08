/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Admin Sidebar — Navigation Premium Dark avec déconnexion sécurisée
 * @created 2026-06-05
 * @updated 2026-06-05
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tag,
  Star,
  ShoppingBag,
  Users,
  Settings2,
  LogOut,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { href: '/', label: 'Tableau de Bord', icon: LayoutDashboard },
  { href: '/products', label: 'Produits', icon: Package },
  { href: '/categories', label: 'Catégories', icon: Tag },
  { href: '/featured-products', label: 'Pièces Phares', icon: Star },
  { href: '/orders', label: 'Commandes', icon: ShoppingBag },
  { href: '/customers', label: 'Clients (CRM)', icon: Users },
  { href: '/testimonials', label: 'Témoignages', icon: MessageSquare },
  { href: '/home-settings', label: "Page d'accueil", icon: Settings2 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className="w-64 shrink-0 bg-[hsl(var(--surface-light))] border-r border-white/8 flex flex-col sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))]/20 flex items-center justify-center text-[hsl(var(--primary))]">
            <span className="text-sm font-bold">A</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Alixco<span className="text-[hsl(var(--primary))]">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[hsl(var(--primary))]/15 text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/20'
                  : 'text-stone-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-colors ${
                  isActive ? 'text-[hsl(var(--primary))]' : 'text-stone-500 group-hover:text-white'
                }`}
              />
              <span>{label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/8">
        {user && (
          <div className="px-4 py-3 mb-2 rounded-xl bg-stone-950/60 border border-white/5">
            <p className="text-xs font-semibold text-white truncate">{user.full_name}</p>
            <p className="text-[10px] text-stone-500 mt-0.5 truncate">{user.phone || user.email || 'Administrateur'}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-stone-400 hover:text-red-400 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:text-red-400" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
