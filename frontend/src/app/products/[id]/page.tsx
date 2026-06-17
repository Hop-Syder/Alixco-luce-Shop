import { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: Promise<{ id: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Try to fetch the product from our backend
  try {
    const { id } = await params;
    // Determine the base URL for server-side fetching
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const API_URL = process.env.NEXT_PUBLIC_API_URL || `${protocol}://${host}/api`;
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
      return { title: 'Produit Introuvable - AlixcoLuxe' };
    }
    
    const product = await res.json();
    
    // Check for SEO fields
    // Default to french for now, or check lang if supported
    const title = product.seo_title_fr || product.name_fr || 'Produit AlixcoLuxe';
    const description = product.seo_desc_fr || `Découvrez ${product.name_fr} chez AlixcoLuxe.`;
    const keywords = product.seo_keywords_fr ? product.seo_keywords_fr.split(',') : ['luxe', 'art', 'décoration'];

    return {
      // Le layout racine applique déjà le template "%s | AlixcoLuxe" — ne pas le dupliquer ici.
      title,
      description,
      keywords,
      openGraph: {
        title: title,
        description: description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'AlixcoLuxe Boutique',
    };
  }
}

export default function ProductPage() {
  return <ProductDetailClient />;
}
