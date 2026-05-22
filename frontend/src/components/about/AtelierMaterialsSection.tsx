/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Atelier Materials Section
 * @created 2026-05-22
 * @updated 2026-05-22
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */
import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

const materials = [
  { name: "Bois Noble", desc: "Chaleur et authenticité. Nous sculptons l'âme de chaque essence.", img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" },
  { name: "Verre Pur", desc: "Transparence et élégance. La gravure y dépose un voile de lumière.", img: "https://images.unsplash.com/photo-1623861214040-d9d10e5f2cf9?auto=format&fit=crop&q=80&w=800" },
  { name: "Cuir Véritable", desc: "Caractère et patine. Une empreinte indélébile sur des pièces intemporelles.", img: "https://images.unsplash.com/photo-1590740537021-39659b9e5d48?auto=format&fit=crop&q=80&w=800" },
  { name: "Métal Brut", desc: "Force et durabilité. Le marquage inaltérable de l'industrie sublimée.", img: "https://images.unsplash.com/photo-1501166222995-ff437b789be3?auto=format&fit=crop&q=80&w=800" }
];

export function AtelierMaterialsSection() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeUp className="text-center mb-20 flex flex-col items-center">
        <span className="text-[hsl(var(--primary))] uppercase tracking-[0.2em] text-xs font-bold mb-4 block">Savoir-Faire</span>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">La Maîtrise des Matières</h2>
        <div className="accent-line"></div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {materials.map((mat, idx) => (
          <FadeUp key={idx} delay={idx * 0.1}>
            <div className="group relative h-80 overflow-hidden rounded-2xl border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mat.img} alt={mat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/50 to-transparent"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                <h3 className="text-2xl font-heading font-bold text-white mb-2">{mat.name}</h3>
                <p className="text-stone-300 font-light text-sm">{mat.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
