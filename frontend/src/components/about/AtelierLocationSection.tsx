/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Location Section with Google Map
 * @created 2026-05-22
 * @updated 2026-06-09
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
"use client";
import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { useTranslation } from '@/context/LanguageContext';

export function AtelierLocationSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 relative overflow-hidden bg-[hsl(var(--background))] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-wider">
            {t('about.location_title1')} <span className="text-[hsl(var(--primary))]">{t('about.location_title2')}</span>
          </h2>
          <div className="w-16 h-1 bg-[hsl(var(--primary))] mx-auto"></div>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg pt-4 font-light">
            {t('about.location_desc')}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Info Panel */}
          <FadeUp delay={0.2} className="lg:col-span-1 glass-card p-8 rounded-2xl h-full flex flex-col justify-center space-y-8 border border-white/10 bg-black/40">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-6 uppercase tracking-widest">{t('about.location_contact')}</h3>
              <ul className="space-y-6">
                {/* Adresse cliquable → Google Maps */}
                <li className="flex items-start">
                  <a
                    href="https://maps.app.goo.gl/k7uKZ3bfaonbioQNA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start group"
                    aria-label={t('about.open_google_maps_aria')}
                  >
                    <MapPin className="w-6 h-6 text-[hsl(var(--primary))] mr-4 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    <div>
                      <span className="block text-sm text-stone-400 uppercase tracking-widest mb-1">{t('about.location_address_label')}</span>
                      <span className="text-stone-200 group-hover:text-[hsl(var(--primary))] transition-colors">{t('about.location_address_value1')}<br />{t('about.location_address_value2')}</span>
                    </div>
                  </a>
                </li>
                <li className="flex items-start">
                  <Phone className="w-6 h-6 text-[hsl(var(--primary))] mr-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-sm text-stone-400 uppercase tracking-widest mb-1">{t('about.location_phone_label')}</span>
                    <a href="https://wa.me/22901974129033" target="_blank" rel="noopener noreferrer" className="text-stone-200 hover:text-[hsl(var(--primary))] transition-colors">
                      +229 01 97 41 29 33
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-6 h-6 text-[hsl(var(--primary))] mr-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-sm text-stone-400 uppercase tracking-widest mb-1">{t('about.location_email_label')}</span>
                    <a href="mailto:contact@alixcoluxe.com" className="text-stone-200 hover:text-[hsl(var(--primary))] transition-colors">
                      contact@alixcoluxe.com
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-heading font-semibold text-white mb-6 uppercase tracking-widest">{t('about.location_hours')}</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div className="flex items-center text-stone-400">
                    <Clock className="w-5 h-5 mr-3" strokeWidth={1.5} />
                    <span>{t('about.location_mon_fri')}</span>
                  </div>
                  <span className="text-stone-200 font-medium">{t('about.location_mon_fri_val')}</span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center text-stone-400">
                    <Clock className="w-5 h-5 mr-3" strokeWidth={1.5} />
                    <span>{t('about.location_sat')}</span>
                  </div>
                  <span className="text-stone-200 font-medium">{t('about.location_sat_val')}</span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center text-stone-400">
                    <Clock className="w-5 h-5 mr-3" strokeWidth={1.5} />
                    <span>{t('about.location_sun')}</span>
                  </div>
                  <span className="text-[hsl(var(--primary))] font-medium">{t('about.location_sun_val')}</span>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Map + CTA Google Maps */}
          <FadeUp delay={0.4} className="lg:col-span-2 flex flex-col gap-4">
            {/* Iframe Google Maps — thème sombre */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-[440px] relative group bg-stone-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126932.12879555198!2d2.3485747!3d6.3702927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355ab4d5cb3f7%3A0xc324a3501235b2e5!2sCotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)' }}
                title={t('about.location_map_title')}
              ></iframe>
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
            </div>

            {/* Bouton CTA → Google Maps (SEO local + UX) */}
            <a
              href="https://maps.app.goo.gl/k7uKZ3bfaonbioQNA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('about.open_google_maps_aria')}
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-xl border border-[hsl(var(--primary))]/50 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-black transition-all duration-300 font-semibold tracking-wider uppercase text-sm cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              {t('about.open_google_maps')}
            </a>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
