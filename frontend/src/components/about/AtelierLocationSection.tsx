/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Location Section with Google Map
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

export function AtelierLocationSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[hsl(var(--background))] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-wider">
            Notre <span className="text-[hsl(var(--primary))]">Localisation</span>
          </h2>
          <div className="w-16 h-1 bg-[hsl(var(--primary))] mx-auto"></div>
          <p className="text-stone-400 max-w-2xl mx-auto text-lg pt-4 font-light">
            Venez découvrir notre savoir-faire au cœur de notre atelier de fabrication.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Info Panel */}
          <FadeUp delay={0.2} className="lg:col-span-1 glass-card p-8 rounded-2xl h-full flex flex-col justify-center space-y-8 border border-white/10 bg-black/40">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-6 uppercase tracking-widest">Coordonnées</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <MapPin className="w-6 h-6 text-[hsl(var(--primary))] mr-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-sm text-stone-400 uppercase tracking-widest mb-1">Adresse</span>
                    <span className="text-stone-200">Atelier AlixcoLuxe<br />Bénin</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-6 h-6 text-[hsl(var(--primary))] mr-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-sm text-stone-400 uppercase tracking-widest mb-1">Téléphone</span>
                    <span className="text-stone-200">+229 01 97 41 29 33</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <Mail className="w-6 h-6 text-[hsl(var(--primary))] mr-4 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <span className="block text-sm text-stone-400 uppercase tracking-widest mb-1">Email</span>
                    <span className="text-stone-200">contact@alixcoluxe.com</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-heading font-semibold text-white mb-6 uppercase tracking-widest">Horaires</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div className="flex items-center text-stone-400">
                    <Clock className="w-5 h-5 mr-3" strokeWidth={1.5} />
                    <span>Lundi - Vendredi</span>
                  </div>
                  <span className="text-stone-200 font-medium">09:00 - 18:00</span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center text-stone-400">
                    <Clock className="w-5 h-5 mr-3" strokeWidth={1.5} />
                    <span>Samedi</span>
                  </div>
                  <span className="text-stone-200 font-medium">Sur rendez-vous</span>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center text-stone-400">
                    <Clock className="w-5 h-5 mr-3" strokeWidth={1.5} />
                    <span>Dimanche</span>
                  </div>
                  <span className="text-[hsl(var(--primary))] font-medium">Fermé</span>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Map */}
          <FadeUp delay={0.4} className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/10 h-[500px] relative group bg-stone-900">
            {/* The CSS filters apply a dark theme to the standard google map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126932.12879555198!2d2.3485747!3d6.3702927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102355ab4d5cb3f7%3A0xc324a3501235b2e5!2sCotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) hue-rotate(180deg)' }}
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl"></div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
