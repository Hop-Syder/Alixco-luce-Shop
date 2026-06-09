/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Footer Component
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-stone-300 border-t border-white/5 relative overflow-hidden z-50 mt-auto">
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/50 to-transparent"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[hsl(var(--primary))] opacity-5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-heading font-bold text-white tracking-widest uppercase">
              Alixco<span className="text-[hsl(var(--primary))]">Luxe</span>
            </h3>
            <p className="font-light text-stone-400 text-sm leading-relaxed pr-4">
              {t('footer.brand_desc')}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://web.facebook.com/AlixcoLuxe" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] transition-all duration-300 group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-heading tracking-[0.2em] uppercase text-sm font-bold">{t('footer.explore')}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/products" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light flex items-center group transition-colors">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[hsl(var(--primary))]" />
                  {t('footer.collections')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light flex items-center group transition-colors">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[hsl(var(--primary))]" />
                  {t('footer.our_workshop')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light flex items-center group transition-colors">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[hsl(var(--primary))]" />
                  {t('footer.custom_made')}
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light flex items-center group transition-colors">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[hsl(var(--primary))]" />
                  {t('footer.journal')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-heading tracking-[0.2em] uppercase text-sm font-bold">{t('footer.legal')}</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/legal/cgv" className="text-stone-400 hover:text-white text-sm font-light transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/legal/mentions-legales" className="text-stone-400 hover:text-white text-sm font-light transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-stone-400 hover:text-white text-sm font-light transition-colors">
                  {t('footer.shipping')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-stone-400 hover:text-white text-sm font-light transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-heading tracking-[0.2em] uppercase text-sm font-bold">{t('footer.contact')}</h4>
            <ul className="space-y-5">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-[hsl(var(--primary))] mr-3 mt-0.5 shrink-0" />
                <a href="https://maps.app.goo.gl/k7uKZ3bfaonbioQNA" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light leading-relaxed transition-colors" aria-label="Voir l'atelier AlixcoLuxe sur Google Maps">
                  Atelier AlixcoLuxe<br />
                  Cotonou, Bénin
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-[hsl(var(--primary))] mr-3 shrink-0" />
                <a href="https://wa.me/2290197412933" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light transition-colors">
                  +229 01 97 41 29 33
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[hsl(var(--primary))] mr-3 shrink-0" />
                <a href="mailto:contact@alixcoluxe.com" className="text-stone-400 hover:text-[hsl(var(--primary))] text-sm font-light transition-colors">
                  contact@alixcoluxe.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-xs font-light">
            &copy; {currentYear} AlixcoLuxe. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-stone-500 text-xs font-light tracking-widest uppercase">
              Designed by Nexus Partners
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
