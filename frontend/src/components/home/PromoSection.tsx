/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Promo Section for Home Page
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import Image from 'next/image';
import { useTranslation } from '@/context/LanguageContext';
import { api } from '@/services/api';

interface PromoData {
  title: string;
  subtitle: string;
  description: string;
  discount_tag: string;
  cta_text: string;
  cta_link: string;
  image: string;
  countdown_end?: string;
}

export function PromoSection() {
  const { t } = useTranslation();
  const [promoData, setPromoData] = useState<PromoData | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState<boolean>(false);

  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const response = await api.get('/page-settings/home');
        if (response.data && response.data.promo) {
          setPromoData(response.data.promo);
        }
      } catch (error) {
        console.warn("Impossible de charger le contenu dynamique de la promo, utilisation des données de secours locales.");
      }
    };
    fetchPromoData();
  }, []);

  useEffect(() => {
    // Default end date if none is provided: 3 days from now
    const defaultEndDate = new Date();
    defaultEndDate.setDate(defaultEndDate.getDate() + 3);
    
    const endDateString = promoData?.countdown_end || defaultEndDate.toISOString();
    const endDate = new Date(endDateString).getTime();

    const checkTime = () => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return true; // Indicates timer should stop
      } else {
        setIsExpired(false);
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
        return false;
      }
    };

    // Run once immediately
    const shouldStop = checkTime();

    if (shouldStop) return;

    const timer = setInterval(() => {
      const stop = checkTime();
      if (stop) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [promoData?.countdown_end]);

  if (isExpired) {
    return null;
  }

  return (
    <section className="py-12 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeUp>
          <div className="relative border border-white/5 overflow-hidden rounded-sm shadow-2xl bg-[#0a0a0a]">
            {/* Background Image */}
            <Image 
              src={promoData?.image || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600"} 
              alt="Promo" 
              fill
              className="object-cover opacity-30 mix-blend-screen pointer-events-none" 
              unoptimized
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20 pointer-events-none"></div>
            
            {/* Content Container */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 p-8 md:p-12 lg:p-16 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-[0.3em]">
                  <Clock className="w-4 h-4 mr-3" /> {promoData?.discount_tag || t('promo.badge')}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-none tracking-tight">
                  {promoData?.title || t('promo.title1')} <br/>
                  <span className="text-gradient-gold mt-1 block">{promoData?.subtitle || t('promo.title2')}</span>
                </h2>
                
                <p className="text-stone-400 text-base md:text-lg font-light leading-snug max-w-lg">
                  {promoData?.description || t('promo.description')}
                </p>
              </div>
              
              <ul className="space-y-3 text-stone-300 font-light text-base md:text-lg">
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  {t('promo.feature1')}
                </li>
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  {t('promo.feature2')}
                </li>
                <li className="flex items-center group">
                  <span className="bg-white/5 p-2 rounded-full mr-4 group-hover:bg-[hsl(var(--primary))]/20 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary))]" />
                  </span>
                  {t('promo.feature3')}
                </li>
              </ul>
              
              <div className="pt-6">
                <Link href={promoData?.cta_link || "/products?collection=limited"} className="btn-primary inline-flex items-center group px-10 py-4 text-sm uppercase tracking-widest">
                  {promoData?.cta_text || t('promo.cta')}
                  <ChevronRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Countdown / Visual Element */}
            <div className="flex justify-center lg:justify-end w-full">
              <div className="glass-card p-4 sm:p-6 md:p-8 flex items-center justify-center gap-2 sm:gap-4 md:gap-6 text-center border border-white/10 backdrop-blur-md relative overflow-hidden group w-full max-w-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="flex flex-col relative z-10 w-12 sm:w-16 md:w-20">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading text-white tabular-nums tracking-tighter">{String(timeLeft.days).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-2 font-bold">{t('promo.days')}</span>
                </div>
                
                <span className="text-2xl sm:text-3xl md:text-4xl font-light text-white/20 relative z-10 -mt-4 sm:-mt-6">:</span>
                
                <div className="flex flex-col relative z-10 w-12 sm:w-16 md:w-20">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading text-white tabular-nums tracking-tighter">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-2 font-bold">{t('promo.hours')}</span>
                </div>
                
                <span className="text-2xl sm:text-3xl md:text-4xl font-light text-white/20 relative z-10 -mt-4 sm:-mt-6">:</span>
                
                <div className="flex flex-col relative z-10 w-12 sm:w-16 md:w-20">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading text-white tabular-nums tracking-tighter">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-2 font-bold">{t('promo.minutes')}</span>
                </div>

                <span className="text-2xl sm:text-3xl md:text-4xl font-light text-white/20 relative z-10 -mt-4 sm:-mt-6">:</span>
                
                <div className="flex flex-col relative z-10 w-12 sm:w-16 md:w-20">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-heading text-white tabular-nums tracking-tighter">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] sm:text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-2 font-bold">{t('promo.seconds') || 'SECS'}</span>
                </div>
              </div>
            </div>
            
          </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
