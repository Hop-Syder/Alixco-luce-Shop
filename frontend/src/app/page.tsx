/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Home Page / Landing (Design Dark Luxe & Précision)
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 * ──────────────────────────────────
 */

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCcw, 
  Star, 
  ArrowRight,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { AnimatedTitle } from '@/components/ui/AnimatedTitle';
import { FadeUp } from '@/components/ui/FadeUp';

export default function Home() {
  return (
    <div className="flex flex-col relative overflow-hidden bg-[hsl(var(--background))]">
      
      {/* ================= SECTION 1: HERO IMPACTANT (DARK MODE LUXE) ================= */}
      <section className="relative min-h-screen flex flex-col justify-center items-start px-4 sm:px-6 lg:px-12 xl:px-24 text-left pt-20">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=2000" 
            alt="Laser cutting wood macro" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/80 via-transparent to-[hsl(var(--background))]"></div>
          {/* Glowing Accents */}
          <div className="absolute top-[30%] left-[30%] -translate-x-1/2 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] rounded-full bg-[hsl(var(--primary))]/10 blur-[150px] pointer-events-none mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center -mt-10 md:-mt-20">
          {/* DIV GAUCHE: TEXTES ET BOUTONS */}
          <div className="space-y-6 flex flex-col items-start">
            <FadeUp delay={0.1} className="flex flex-col items-start">
              <span className="text-[hsl(var(--primary))] uppercase tracking-[0.3em] text-sm md:text-base font-bold mb-4 block">
                Maison de Personnalisation
              </span>
              <div className="accent-line"></div>
            </FadeUp>
            
            <div className="relative">
              <AnimatedTitle 
                text1="L'Art de la" 
                text2="Précision Laser" 
                className="text-4xl md:text-6xl lg:text-7xl text-white text-left" 
              />
            </div>
            
            <FadeUp delay={0.4}>
              <p className="text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed">
                Sublimez la matière. Nous transformons le bois, le verre, le métal et le cuir en véritables œuvres d'art grâce à une précision absolue. Des créations uniques, raffinées et résolument sur-mesure.
              </p>
            </FadeUp>

            <FadeUp delay={0.6} className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6 pt-2 w-full">
              <Link href="/products" className="btn-primary w-full sm:w-auto flex items-center justify-center group">
                Découvrir la Collection
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/about" className="btn-secondary w-full sm:w-auto flex items-center justify-center">
                Notre Savoir-Faire
              </Link>
            </FadeUp>
          </div>

          {/* DIV DROIT: CARTE IMAGE AVEC BORDURE "FEU DE BOIS" */}
          <FadeUp delay={0.8} className="relative w-full max-w-md mx-auto lg:ml-auto group">
            {/* Effet lueur de feu en arrière plan */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-orange-600 via-amber-500 to-red-600 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
            
            {/* L'image elle-même avec la trace de feu (bordure) de 2px */}
            <div className="relative rounded-xl overflow-hidden border-2 border-orange-600 shadow-[0_0_20px_rgba(234,88,12,0.6)] aspect-[4/5] p-1.5 bg-[#1a0800]">
              {/* Le contour intérieur en pointillés pour l'effet "trace laser sur bois" */}
              <div className="w-full h-full border-2 border-dashed border-amber-500/80 rounded-lg overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1611077544831-29e20a0279c6?auto=format&fit=crop&q=80&w=800" 
                  alt="Gravure Laser sur Bois" 
                  className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-700"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50 animate-pulse">
          <span className="text-xs uppercase tracking-widest text-white mb-2">Découvrir</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* ================= SECTION 2: BANDEAU DE RÉASSURANCE ================= */}
      <section className="border-y border-white/5 bg-[hsl(var(--surface-light))] py-12 relative z-10">
        <FadeUp className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
            <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
              <Truck className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-lg text-white tracking-wide uppercase">Livraison Premium</h3>
              <p className="text-sm text-stone-400 mt-2">Expédition sécurisée et sur-mesure</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
              <RefreshCcw className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-lg text-white tracking-wide uppercase">Exigence & Qualité</h3>
              <p className="text-sm text-stone-400 mt-2">Finitions contrôlées à la main</p>
            </div>
            <div className="flex flex-col items-center justify-center pt-6 md:pt-0">
              <ShieldCheck className="w-8 h-8 text-[hsl(var(--primary))] mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-lg text-white tracking-wide uppercase">Paiement Sécurisé</h3>
              <p className="text-sm text-stone-400 mt-2">Transactions cryptées de bout en bout</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ================= SECTION 3: CATÉGORIES PHARES ================= */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeUp className="text-center mb-20 flex flex-col items-center">
          <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Notre Expertise</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">L'Univers Alixco</h2>
          <div className="accent-line"></div>
        </FadeUp>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Gravure Laser", desc: "L'empreinte de l'élégance sur vos objets", img: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&q=80&w=800" },
            { title: "Découpe Sur-Mesure", desc: "Des formes complexes d'une netteté absolue", img: "https://images.unsplash.com/photo-1563207153-f4040a459385?auto=format&fit=crop&q=80&w=800" },
            { title: "Objets d'Art & Cadeaux", desc: "Trophées, accessoires et cadeaux d'entreprise", img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800" }
          ].map((cat, idx) => (
            <FadeUp key={idx} delay={idx * 0.15}>
              <Link href={`/products?category=${cat.title.toLowerCase()}`} className="group relative h-[450px] overflow-hidden block border border-white/10 hover:border-[hsl(var(--primary))]/50 transition-colors duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-heading font-bold text-white mb-3">{cat.title}</h3>
                  <p className="text-stone-300 font-light text-sm uppercase tracking-wider flex items-center">
                    {cat.desc} <ArrowRight className="ml-4 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[hsl(var(--primary))]" />
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ================= SECTION 4: PRODUITS VEDETTES ================= */}
      <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Sélection Exclusive</span>
              <h2 className="text-4xl font-heading font-bold text-white">Pièces Maîtresses</h2>
            </div>
            <Link href="/products" className="flex items-center text-sm uppercase tracking-widest text-white hover:text-[hsl(var(--primary))] transition-colors group">
              Voir la collection complète <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Trophée Verre Gravé", price: "À partir de 120 €", badge: "Best-Seller", img: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&q=80&w=600" },
              { name: "Enseigne Bois Découpé", price: "Sur Devis", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=600" },
              { name: "Porte-clés Cuir Personnalisé", price: "25 €", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600" },
              { name: "Plaque Métal Entreprise", price: "180 €", badge: "Nouveau", img: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&q=80&w=600" }
            ].map((product, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="group cursor-pointer h-full flex flex-col">
                  <div className="relative h-80 overflow-hidden mb-6 border border-white/5">
                    {product.badge && (
                      <div className="absolute top-4 left-4 z-10 bg-[hsl(var(--background))] border border-[hsl(var(--primary))]/30 text-[hsl(var(--primary))] text-[10px] uppercase tracking-widest font-bold px-3 py-1">
                        {product.badge}
                      </div>
                    )}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
                    
                    {/* Overlay interaction */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white uppercase tracking-widest text-xs border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
                        Découvrir
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 flex-grow text-center">
                    <h3 className="text-lg font-heading text-white">{product.name}</h3>
                    <p className="text-[hsl(var(--primary))] text-sm tracking-wider">{product.price}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: PROMOTION / URGENCE ================= */}
      <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeUp className="relative border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-[hsl(var(--background))] -z-10"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1600" alt="Promo" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen -z-10" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 p-12 md:p-20 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center text-[hsl(var(--primary))] text-xs font-bold uppercase tracking-widest">
                <Clock className="w-4 h-4 mr-2" /> Vente Flash Exclusive
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">L'Édition Limitée <br/><span className="text-gradient-gold">"Noir &amp; Or"</span></h2>
              <p className="text-stone-400 text-lg font-light leading-relaxed">
                Profitez de privilèges sur notre collection la plus exclusive. Une fusion parfaite entre la chaleur du bois noble et l'éclat de l'or.
              </p>
              
              <ul className="space-y-4 text-stone-300 font-light">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-4 text-[hsl(var(--primary))]" /> Finitions artisanales à la feuille d'or</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-4 text-[hsl(var(--primary))]" /> Certificat d'authenticité inclus</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-4 text-[hsl(var(--primary))]" /> Pièces numérotées de 1 à 50</li>
              </ul>
              
              <div className="pt-6">
                <Link href="/products?collection=limited" className="btn-primary inline-block">
                  Accéder à la Vente
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="glass-card p-10 flex gap-6 text-center border border-white/5">
                <div className="flex flex-col">
                  <span className="text-5xl font-heading text-white">02</span>
                  <span className="text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-3">Jours</span>
                </div>
                <span className="text-4xl font-light text-stone-700">:</span>
                <div className="flex flex-col">
                  <span className="text-5xl font-heading text-white">14</span>
                  <span className="text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-3">Heures</span>
                </div>
                <span className="text-4xl font-light text-stone-700">:</span>
                <div className="flex flex-col">
                  <span className="text-5xl font-heading text-white">45</span>
                  <span className="text-[10px] text-[hsl(var(--primary))] uppercase tracking-[0.2em] mt-3">Min</span>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ================= SECTION 6: PREUVE SOCIALE ================= */}
      <section className="py-32 bg-[hsl(var(--surface-light))] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp className="flex flex-col items-center">
            <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Témoignages</span>
            <h2 className="text-4xl font-heading font-bold text-white mb-6">L'Excellence Reconnue</h2>
            <div className="accent-line mb-20"></div>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sophie L.", role: "Architecte d'intérieur", text: "La finesse de la découpe laser pour notre cloison en bois est époustouflante. Un véritable travail d'orfèvre qui a sublimé notre projet." },
              { name: "Marc D.", role: "Directeur Marketing", text: "Nous avons fait graver nos trophées d'entreprise en verre. Le rendu est ultra-premium et la précision des lettres est impressionnante." },
              { name: "Élise M.", role: "Cliente Vérifiée", text: "Le porte-clés en cuir gravé sur-mesure a fait un cadeau d'une élégance rare. L'expérience AlixcoLuxe est premium du début à la fin." }
            ].map((review, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="p-10 text-left flex flex-col justify-between h-full border border-white/5 bg-[hsl(var(--surface-neutral))]/30 hover:bg-[hsl(var(--surface-neutral))]/50 transition-colors">
                  <div>
                    <div className="flex text-[hsl(var(--primary))] mb-8">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current mr-1" />)}
                    </div>
                    <p className="text-stone-300 font-light leading-relaxed mb-8">"{review.text}"</p>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="font-heading text-lg text-white">{review.name}</h4>
                    <p className="text-xs text-[hsl(var(--primary))] uppercase tracking-widest mt-1">{review.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: NEWSLETTER & FOOTER ================= */}
      <section className="py-32 bg-[hsl(var(--background))] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--primary))]/50 to-transparent"></div>
        
        <FadeUp className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Le Cercle Privé</h2>
          <p className="text-stone-400 mb-12 font-light text-lg">
            Inscrivez-vous pour accéder en avant-première à nos nouvelles collections et bénéficier de privilèges exclusifs.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Votre adresse e-mail" 
              className="flex-grow bg-transparent border-b border-white/20 px-4 py-4 text-white placeholder-stone-600 focus:outline-none focus:border-[hsl(var(--primary))] transition-colors rounded-none"
              required
            />
            <button type="submit" className="text-sm uppercase tracking-widest font-bold text-[hsl(var(--primary))] hover:text-white transition-colors px-6 whitespace-nowrap">
              S'inscrire
            </button>
          </form>
        </FadeUp>
      </section>

    </div>
  );
}
