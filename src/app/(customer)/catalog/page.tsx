import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_PRODUCTS } from '@/lib/content-defaults';
import CatalogClient from './CatalogClient';
import type { CatalogProduct } from './CatalogClient';

export const metadata = { title: 'Product Catalog | INFAB Client Portal' };

export default async function CatalogPage() {
  let products: CatalogProduct[] = [];

  try {
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { category: 'asc' },
      select: { id: true, name: true, category: true, description: true, specs: true, imageUrl: true, imageUrls: true, datasheetUrl: true, drawingUrl: true, cadFileUrls: true },
    });

    if (rows.length > 0) {
      products = rows.map((r) => ({
        id: r.id,
        name: r.name,
        category: r.category.toUpperCase(),
        description: r.description,
        specs: Array.isArray(r.specs) ? (r.specs as string[]) : [],
        imageUrl: r.imageUrl,
        imageUrls: r.imageUrls ?? [],
        datasheetUrl: r.datasheetUrl,
        drawingUrl: r.drawingUrl,
        cadFileUrls: Array.isArray(r.cadFileUrls) ? (r.cadFileUrls as string[]) : [],
      }));
    }
  } catch {
    // fall through to fallback
  }

  if (products.length === 0) {
    products = FALLBACK_PRODUCTS.map((p, i) => ({
      id: `default-${i}`,
      name: p.name,
      category: p.category,
      description: p.description,
      specs: p.specs,
      imageUrl: p.imageUrl ?? null,
      imageUrls: p.imageUrl ? [p.imageUrl] : [],
      datasheetUrl: null,
      drawingUrl: null,
      cadFileUrls: [],
    }));
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Product Catalog</h2>
        <p className="text-[var(--text-secondary)]">
          Browse our full range of aerospace sensors and microfluidic products. Add items to your RFQ cart and submit a quote request in one go.
        </p>
      </div>

      <CatalogClient products={products} />
    </div>
  );
}
