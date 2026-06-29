import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_PRODUCTS } from '@/lib/content-defaults';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://infabsemi.com';

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { url: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/team', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/news', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/careers', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ];

  // Fetch product slugs — fall back to static list if DB unavailable
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });
    if (dbProducts.length > 0) {
      productEntries = dbProducts.map(p => ({
        url: `${BASE_URL}/products/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    } else {
      throw new Error('empty');
    }
  } catch {
    productEntries = FALLBACK_PRODUCTS.map(p => ({
      url: `${BASE_URL}/products/${slugify(p.name)}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));
  }

  return [
    ...staticPages.map(({ url, priority, changeFrequency }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...productEntries,
  ];
}
