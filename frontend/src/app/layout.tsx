import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const SITE_URL = "https://alixcoluxe.com";
const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/k7uKZ3bfaonbioQNA";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AlixcoLuxe — Gravure Laser, Art & Cadeaux Personnalisés au Bénin",
    template: "%s | AlixcoLuxe",
  },
  description:
    "AlixcoLuxe est votre atelier de création sur-mesure à Cotonou, Bénin. Gravure laser sur bois, verre et métal, accessoires de mode, objets d'art et cadeaux d'entreprise personnalisés. Livraison rapide.",
  keywords: [
    "gravure laser Bénin",
    "gravure laser Cotonou",
    "cadeaux personnalisés Bénin",
    "atelier artisanat Cotonou",
    "création art Bénin",
    "accessoires mode personnalisés",
    "cadeaux entreprise Bénin",
    "découpe laser bois métal verre",
    "AlixcoLuxe",
    "boutique luxe Cotonou",
  ],
  authors: [{ name: "AlixcoLuxe", url: SITE_URL }],
  creator: "AlixcoLuxe",
  publisher: "AlixcoLuxe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "fr-BJ": `${SITE_URL}/fr`,
      "en-BJ": `${SITE_URL}/en`,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_BJ",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: "AlixcoLuxe",
    title: "AlixcoLuxe — Gravure Laser, Art & Cadeaux Personnalisés au Bénin",
    description:
      "Atelier de création sur-mesure à Cotonou : gravure laser, objets d'art, accessoires de mode et cadeaux d'entreprise personnalisés.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AlixcoLuxe — Atelier Artisanat Luxe Cotonou Bénin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlixcoLuxe — Gravure Laser & Créations sur-mesure au Bénin",
    description:
      "Découvrez nos créations artisanales uniques : gravure laser, objets d'art, cadeaux personnalisés. Atelier basé à Cotonou, Bénin.",
    images: [`${SITE_URL}/og-image.jpg`],
    creator: "@AlixcoLuxe",
  },
  category: "e-commerce",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://alixcoluxe.com/#organization",
    name: "AlixcoLuxe",
    alternateName: "Alixco Luxe",
    description:
      "Atelier de création sur-mesure à Cotonou, Bénin : gravure laser sur bois, verre et métal, accessoires de mode, objets d'art et cadeaux d'entreprise personnalisés.",
    url: "https://alixcoluxe.com",
    logo: "https://alixcoluxe.com/logo.png",
    image: "https://alixcoluxe.com/og-image.jpg",
    telephone: "+22901974129033",
    email: "contact@alixcoluxe.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Atelier AlixcoLuxe",
      addressLocality: "Cotonou",
      addressCountry: "BJ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.3702927,
      longitude: 2.3485747,
    },
    hasMap: GOOGLE_MAPS_URL,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ],
    sameAs: [
      "https://web.facebook.com/AlixcoLuxe",
      "https://maps.app.goo.gl/k7uKZ3bfaonbioQNA",
    ],
    servesCuisine: undefined,
    priceRange: "$$",
    knowsLanguage: ["fr", "en"],
    areaServed: {
      "@type": "Country",
      name: "Bénin",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Gravure & Découpe Laser",
          description:
            "Personnalisation sur bois, verre, métal et cuir pour donner vie à vos idées.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Créations d'Art",
          description:
            "Pièces uniques conçues sur-mesure pour sublimer votre décoration.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Accessoires de Mode",
          description:
            "Customisation sur tissus et accessoires pour affirmer votre style unique.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cadeaux d'Entreprise",
          description:
            "Boîtes personnalisées et cadeaux d'affaires sur-mesure pour marquer les esprits.",
        },
      },
    ],
  };

  return (
    <html lang="fr" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[hsl(var(--background))] text-[hsl(var(--text-main))]">
        {/* JSON-LD : Données structurées LocalBusiness pour Google */}
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <AuthProvider>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#1c1917',
                color: '#d6d3d1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: 'hsl(var(--primary))',
                  secondary: '#000000',
                },
              },
            }}
          />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
