/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Home Page / Landing
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
*/──────────────────────────────────

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col relative overflow-hidden">
      
      {/* Abstract Background Orbs for Liquid Glass effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-400/20 blur-[100px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-stone-500/10 blur-[120px] pointer-events-none -z-10"></div>
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="space-y-6">
            <h2 className="text-sm font-bold tracking-[0.3em] text-[hsl(var(--primary))] uppercase">
              Excellence & Artisanat
            </h2>
            
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-[hsl(var(--text-main))] leading-tight">
              L'Art du <br className="hidden md:block"/>
              <span className="text-glow text-[hsl(var(--primary))]">Personnalisé</span>, version Luxe.
            </h1>
            
            <p className="text-lg md:text-xl text-[hsl(var(--text-light))] max-w-2xl mx-auto font-light">
              Découvrez une collection exclusive de créations artisanales. 
              Chaque pièce est conçue avec une précision d'orfèvre et un 
              souci du détail inégalé.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link to="/products" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">
              Explorer le Catalogue
            </Link>
            <Link to="/about" className="text-[hsl(var(--text-main))] font-semibold hover:text-[hsl(var(--primary))] transition-colors px-8 py-4 w-full sm:w-auto">
              Découvrir l'Atelier &rarr;
            </Link>
          </div>
          
        </div>
      </main>

      {/* Featured Section Preview (Liquid Glass Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-500">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-stone-900 mb-3">Savoir-Faire</h3>
            <p className="text-stone-600 leading-relaxed">Une maîtrise parfaite des matériaux nobles pour des créations intemporelles et durables.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-500">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-stone-900 mb-3">Personnalisation</h3>
            <p className="text-stone-600 leading-relaxed">Votre vision prend vie grâce à nos services de personnalisation sur-mesure avancés.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl group hover:-translate-y-2 transition-transform duration-500">
            <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-bold text-stone-900 mb-3">Qualité Premium</h3>
            <p className="text-stone-600 leading-relaxed">Une sélection rigoureuse des meilleurs matériaux pour garantir l'excellence à chaque livraison.</p>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Home;
