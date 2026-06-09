import { Metadata, ResolvingMetadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

type Props = {
  params: { id: string }
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Try to fetch the product from our backend
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${API_URL}/products/${params.id}`, { cache: 'no-store' });
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
      title: `${title} | AlixcoLuxe`,
      description,
      keywords,
      openGraph: {
        title: title,
        description: description,
        images: [product.image],
      },
    };
  } catch (err) {
    return {
      title: 'AlixcoLuxe Boutique',
    };
  }
}

export default function ProductPage({ params }: Props) {
  return <ProductDetailClient />;
}
