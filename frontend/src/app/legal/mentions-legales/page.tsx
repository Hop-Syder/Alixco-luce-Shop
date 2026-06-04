import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Mentions Légales | AlixcoLuxe',
  description: 'Mentions Légales de la plateforme AlixcoLuxe.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full bg-[hsl(var(--primary))]/5 blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-400 hover:text-[hsl(var(--primary))] transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l'accueil
        </Link>
        
        <div className="glass-card rounded-[2rem] p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[hsl(var(--text-main))] mb-4">
            Mentions Légales
          </h1>
          <p className="text-stone-400 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <div className="space-y-10 text-stone-300 leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                1. Éditeur du site
              </h2>
              <p>
                Le présent site, accessible à l'URL (le "Site"), est édité par :
                <br /><br />
                <strong>AlixcoLuxe</strong><br />
                Atelier situé au Bénin.<br />
                Contact : +229 01 97 41 29 33<br />
                Email : contact@alixcoluxe.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                2. Hébergement
              </h2>
              <p>
                Le site est hébergé par la plateforme de déploiement cloud Vercel Inc. (ou LWS, selon l'infrastructure finale).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                3. Propriété intellectuelle
              </h2>
              <p>
                La structure générale du site, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit d'AlixcoLuxe, est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                4. Données personnelles
              </h2>
              <p>
                Conformément à la réglementation applicable en matière de protection des données, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données personnelles. Vous pouvez exercer ce droit en nous contactant à l'adresse email : contact@alixcoluxe.com.
              </p>
              <p className="mt-4">
                Les informations recueillies via nos formulaires (contact, commande, inscription) sont enregistrées dans un fichier informatisé par AlixcoLuxe pour faciliter le traitement de vos requêtes et le suivi de vos créations sur-mesure. Elles sont conservées le temps nécessaire à ces finalités.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
