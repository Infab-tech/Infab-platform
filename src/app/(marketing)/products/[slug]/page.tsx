import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_PRODUCTS } from '@/lib/content-defaults';

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

async function getProduct(slug: string) {
  // Try DB first
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      select: { id: true, slug: true, name: true, category: true, description: true, specs: true, imageUrl: true, imageUrls: true, datasheetUrl: true, drawingUrl: true, cadFileUrls: true, updatedAt: true },
    });
    if (p) return { ...p, specs: Array.isArray(p.specs) ? (p.specs as string[]) : [], imageUrls: p.imageUrls ?? [], cadFileUrls: p.cadFileUrls ?? [] };
  } catch { /* DB unavailable */ }

  // Fall back to static data matched by slugified name
  const match = FALLBACK_PRODUCTS.find(p => slugify(p.name) === slug);
  if (!match) return null;
  return {
    id: `fallback-${slug}`,
    slug,
    name: match.name,
    category: match.category,
    description: match.description,
    specs: match.specs,
    imageUrl: match.imageUrl ?? null,
    imageUrls: match.imageUrl ? [match.imageUrl] : [],
    datasheetUrl: match.datasheetUrl ?? null,
    drawingUrl: match.drawingUrl ?? null,
    cadFileUrls: match.cadFileUrls ?? [],
    updatedAt: new Date(),
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: 'Product Not Found | INFAB Semiconductor' };
  return {
    title: `${product.name} | INFAB Semiconductor`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
    },
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  AEROSPACE: 'Aerospace & Defence',
  HEALTHCARE: 'Healthcare & Life Sciences',
  MEMS: 'MEMS & Semiconductor',
};

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const allImages = [
    ...(product.imageUrl ? [product.imageUrl] : []),
    ...product.imageUrls.filter(u => u !== product.imageUrl),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: allImages[0] ? `https://infabsemi.com${allImages[0]}` : undefined,
    brand: { '@type': 'Brand', name: 'INFAB Semiconductor' },
    manufacturer: {
      '@type': 'Organization',
      name: 'INFAB Semiconductor Pvt. Ltd.',
      url: 'https://infabsemi.com',
    },
    category: CATEGORY_LABELS[product.category] ?? product.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'INFAB Semiconductor Pvt. Ltd.' },
    },
  };

  return (
    <div className="bg-[var(--bg-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb + hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs text-[var(--text-secondary)] mb-8 flex-wrap">
            <Link href="/" className="hover:text-[var(--accent-primary)] transition-colors">Home</Link>
            <i className="ph ph-caret-right text-[10px]" />
            <Link href="/products" className="hover:text-[var(--accent-primary)] transition-colors">Products</Link>
            <i className="ph ph-caret-right text-[10px]" />
            <Link href={`/products#${product.category.toLowerCase()}`} className="hover:text-[var(--accent-primary)] transition-colors">
              {CATEGORY_LABELS[product.category] ?? product.category}
            </Link>
            <i className="ph ph-caret-right text-[10px]" />
            <span className="text-[var(--text-primary)] truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Image */}
            <div className="rounded-2xl border border-[var(--border-primary)] bg-white overflow-hidden aspect-[4/3] relative">
              {allImages[0] ? (
                <Image src={allImages[0]} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-6" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="ph ph-cpu text-6xl text-[var(--border-primary)]" />
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="inline-block font-mono text-xs font-semibold tracking-widest uppercase text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-3 py-1 rounded mb-4">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="w-10 h-1 bg-[var(--accent-primary)] mb-6" />
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Downloads */}
              {(product.datasheetUrl || product.drawingUrl || product.cadFileUrls.length > 0) && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {product.datasheetUrl && (
                    <a href={product.datasheetUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 px-4 py-2 rounded-lg hover:bg-[var(--accent-primary)] hover:text-white transition-colors">
                      <i className="ph ph-file-pdf" /> Datasheet
                    </a>
                  )}
                  {product.drawingUrl && (
                    <a href={product.drawingUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 px-4 py-2 rounded-lg hover:bg-[var(--accent-primary)] hover:text-white transition-colors">
                      <i className="ph ph-blueprint" /> 2D Drawing
                    </a>
                  )}
                  {product.cadFileUrls.map((url, i) => (
                    <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 px-4 py-2 rounded-lg hover:bg-[var(--accent-primary)] hover:text-white transition-colors">
                      <i className="ph ph-cube" /> 3D CAD
                    </a>
                  ))}
                </div>
              )}

              {/* CTA */}
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="inline-flex items-center gap-3 bg-[var(--accent-primary)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:brightness-110 transition-all"
              >
                <i className="ph ph-paper-plane-tilt" /> Request Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      {product.specs.length > 0 && (
        <div className="py-16 sm:py-24 border-b border-[var(--border-primary)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Specifications</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8">Technical Specifications</h2>
            <div className="max-w-2xl rounded-xl border border-[var(--border-primary)] overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec) => {
                    const colonIdx = spec.indexOf(':');
                    if (colonIdx === -1) return (
                      <tr key={spec} className="border-b border-[var(--border-primary)] last:border-0 bg-[var(--accent-primary)]/5">
                        <td colSpan={2} className="px-5 py-3 font-mono font-bold text-[var(--accent-primary)]">{spec}</td>
                      </tr>
                    );
                    const label = spec.slice(0, colonIdx).trim();
                    const value = spec.slice(colonIdx + 1).trim();
                    return (
                      <tr key={spec} className="border-b border-[var(--border-primary)] last:border-0 even:bg-[var(--bg-secondary)]">
                        <td className="px-5 py-3 font-mono text-[var(--text-secondary)] w-[45%] border-r border-[var(--border-primary)]">{label}</td>
                        <td className="px-5 py-3 font-semibold text-[var(--text-primary)]">{value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Related CTA */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">Need a custom configuration?</h2>
              <p className="text-[var(--text-secondary)]">Talk to our engineers about bespoke variants, custom ranges, or OEM integration.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="inline-flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-lg hover:brightness-110 transition-all whitespace-nowrap">
                Request Quote
              </Link>
              <Link href="/products"
                className="inline-flex items-center justify-center gap-2 border border-[var(--border-primary)] text-[var(--text-primary)] font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all whitespace-nowrap">
                All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
