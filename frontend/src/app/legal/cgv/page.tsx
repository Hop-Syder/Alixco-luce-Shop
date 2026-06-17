import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions Générales de Vente de la boutique AlixcoLuxe.',
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full bg-[hsl(var(--primary))]/5 blur-[120px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-400 hover:text-[hsl(var(--primary))] transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour à l&apos;accueil
        </Link>
        
        <div className="glass-card rounded-[2rem] p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[hsl(var(--text-main))] mb-4">
            Conditions Générales de Vente
          </h1>
          <p className="text-stone-400 mb-12">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          
          <div className="space-y-10 text-stone-300 leading-relaxed font-light">
            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                1. Objet
              </h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong>AlixcoLuxe</strong> (ci-après &quot;le Vendeur&quot;) et toute personne physique ou morale (ci-après &quot;le Client&quot;) effectuant un achat ou une commande de personnalisation via le site internet, les réseaux sociaux ou en contact direct.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                2. Produits et Services
              </h2>
              <p>
                AlixcoLuxe propose des œuvres d&apos;art personnalisées, de la joaillerie sur-mesure, de la gravure laser sur divers supports et de la customisation de vêtements. Les photographies et visuels présentés sur nos plateformes n&apos;ont pas de valeur contractuelle absolue, chaque pièce artisanale étant unique et pouvant présenter de légères variations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                3. Commandes et Validation
              </h2>
              <p>
                La commande est validée une fois que les détails du sur-mesure ont été confirmés par les deux parties et qu&apos;un acompte ou le paiement intégral a été perçu. Le processus de validation se fait généralement via nos canaux officiels (WhatsApp, Email).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                4. Prix et Modalités de Paiement
              </h2>
              <p>
                Les prix sont indiqués en Francs CFA (XOF) et peuvent être convertis selon les accords. Le paiement s&apos;effectue via les moyens sécurisés proposés lors de la finalisation de la commande (Mobile Money, Carte Bancaire via CinetPay/Stripe, ou virement). Pour les créations sur-mesure, un acompte non remboursable peut être exigé avant le début de la production.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                5. Livraison et Expédition
              </h2>
              <p>
                L&apos;Atelier est situé au Bénin. Les délais de livraison varient selon la complexité de l&apos;œuvre et la destination. Les risques liés au transport sont transférés au Client dès la remise de la marchandise au transporteur, sauf disposition contraire expresse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                6. Droit de Rétractation et Retours
              </h2>
              <p>
                Conformément aux dispositions légales relatives aux biens confectionnés selon les spécifications du consommateur ou nettement personnalisés (art, gravure, vêtements customisés), le droit de rétractation ne s&apos;applique pas sur les commandes sur-mesure validées et en cours de production ou expédiées. Si le produit présente un défaut de fabrication, l&apos;Atelier s&apos;engage à l&apos;étudier pour proposer une retouche ou réparation.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                7. Propriété Intellectuelle
              </h2>
              <p>
                Tous les designs, modèles, croquis et œuvres créés par AlixcoLuxe demeurent la propriété intellectuelle de l&apos;Atelier. Toute reproduction sans accord préalable est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading text-[hsl(var(--text-main))] mb-4 flex items-center">
                <span className="w-8 h-px bg-[hsl(var(--primary))] mr-4"></span>
                8. Contact
              </h2>
              <p>
                Pour toute réclamation ou question concernant ces Conditions Générales de Vente, vous pouvez nous contacter à l&apos;adresse <strong>contact@alixcoluxe.com</strong> ou par WhatsApp au <strong>+229 01 97 41 29 33</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
