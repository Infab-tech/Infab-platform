import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/supabase/prisma';
import { FALLBACK_PRODUCTS } from '@/lib/content-defaults';
import ProductImageCarousel from '@/components/ui/ProductImageCarousel';
import DomainTransit from '@/components/ui/DomainTransit';

export const metadata: Metadata = {
  title: 'Products | INFAB Semiconductor',
  description: "Precision engineered MEMS sensors, microfluidic devices, and semiconductor components serving the world's most demanding industries.",
};

interface ProductData {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl?: string | null;
  imageUrls: string[];
  datasheetUrl: string | null;
  drawingUrl: string | null;
  cadFileUrls: string[];
}

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const fallbackProducts: ProductData[] = FALLBACK_PRODUCTS.map((p, i) => ({
  ...p,
  id: `default-${i}`,
  slug: slugify(p.name),
  imageUrls: p.imageUrl ? [p.imageUrl] : [],
  datasheetUrl: p.datasheetUrl || null,
  drawingUrl: p.drawingUrl || null,
  cadFileUrls: p.cadFileUrls || [],
}));

const categories = [
  { id: 'aerospace', key: 'AEROSPACE', label: 'Aerospace & Defence', icon: 'ph-airplane-tilt', description: 'INFAB pressure sensors and modules exceed the rigorous requirements of the most demanding airborne applications. Our products sustain high environmental stresses and deliver excellent precision, long-term stability, and reliability.' },
  { id: 'healthcare', key: 'HEALTHCARE', label: 'Healthcare & Life Sciences', icon: 'ph-dna', description: 'INFAB products and technologies are integrated into the most advanced medical equipment. Our microfluidic platforms enable next-generation diagnostics, drug delivery, and biological research.' },
];

function SpecTable({ specs }: { specs: string[] }) {
  if (specs.length === 0) return null;
  return (
    <div className="mb-4 rounded-lg border border-[var(--border-primary)] overflow-hidden">
      <table className="w-full text-xs">
        <tbody>
          {specs.map((spec) => {
            const colonIdx = spec.indexOf(':');
            if (colonIdx === -1) {
              return (
                <tr key={spec} className="border-b border-[var(--border-primary)] last:border-0">
                  <td colSpan={2} className="px-3 py-1.5 font-mono text-[var(--accent-primary)]">{spec}</td>
                </tr>
              );
            }
            const label = spec.slice(0, colonIdx).trim();
            const value = spec.slice(colonIdx + 1).trim();
            return (
              <tr key={spec} className="border-b border-[var(--border-primary)] last:border-0 even:bg-[var(--text-primary)]/[0.02]">
                <td className="px-3 py-1.5 text-[var(--text-secondary)] font-mono whitespace-nowrap w-[40%] border-r border-[var(--border-primary)]">{label}</td>
                <td className="px-3 py-1.5 text-[var(--text-primary)] font-semibold">{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ProductCard({ product }: { product: ProductData }) {
  const allImages = [
    ...(product.imageUrl ? [product.imageUrl] : []),
    ...product.imageUrls.filter((u) => u !== product.imageUrl),
  ];
  return (
    <div className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-white dark:bg-[var(--bg-secondary)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/40 hover:shadow-2xl hover:shadow-[var(--accent-primary)]/5">
      <ProductImageCarousel urls={allImages} name={product.name} />

      <div className="p-6 flex flex-col flex-grow">
        {/* Model number / name */}
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        {/* Spec table */}
        <SpecTable specs={product.specs} />

        {/* Downloads */}
        {(product.datasheetUrl || product.drawingUrl || product.cadFileUrls.length > 0) && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {product.datasheetUrl && <a href={product.datasheetUrl} target="_blank" className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2.5 py-1 rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors">Datasheet</a>}
            {product.drawingUrl && <a href={product.drawingUrl} target="_blank" className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2.5 py-1 rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors">2D Drawing</a>}
            {product.cadFileUrls.map((url, i) => <a key={i} href={url} target="_blank" className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2.5 py-1 rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors">3D CAD</a>)}
          </div>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors mt-2"
        >
          View Details <i className="ph ph-arrow-right transition-transform group-hover:translate-x-1"></i>
        </Link>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  let dbProducts: ProductData[] = [];
  try {
    const rows = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { category: 'asc' },
      select: { id: true, slug: true, name: true, category: true, description: true, specs: true, imageUrl: true, imageUrls: true, datasheetUrl: true, drawingUrl: true, cadFileUrls: true },
    });
    dbProducts = rows.map((r) => ({
      id: r.id,
      slug: r.slug,
      name: r.name,
      category: r.category.toUpperCase(),
      description: r.description,
      specs: Array.isArray(r.specs) ? (r.specs as string[]) : [],
      imageUrl: r.imageUrl,
      imageUrls: r.imageUrls ?? [],
      datasheetUrl: r.datasheetUrl,
      drawingUrl: r.drawingUrl,
      cadFileUrls: r.cadFileUrls ?? [],
    }));
  } catch {
    // DB not available — use fallback
  }

  const products = dbProducts.length > 0 ? dbProducts : fallbackProducts;

  return (
    <div className="bg-[var(--bg-primary)]">

      {/* Page Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">Product Catalog</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-5 sm:mb-6 leading-tight max-w-3xl">Our Products</h1>
              <div className="w-12 h-1 bg-[var(--accent-primary)] mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                Precision-engineered MEMS sensors, microfluidic devices, and semiconductor components serving the world&apos;s most demanding industries.
              </p>
            </div>
            <div>
              <DomainTransit />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Category Nav */}
      <div className="sticky top-20 z-40 bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--border-primary)]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-0 overflow-x-auto">
            {categories.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`} className="flex items-center gap-2 px-3 sm:px-6 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border-b-2 border-transparent hover:border-[var(--accent-primary)] transition-all whitespace-nowrap">
                <i className={`ph ${cat.icon}`}></i>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Category Sections */}
      {categories.map((cat, idx) => {
        const catProducts = products.filter((p) => p.category === cat.key);
        return (
          <div key={cat.id} id={cat.id} className={`border-b border-[var(--border-primary)] py-16 sm:py-24 lg:py-32 ${idx % 2 === 1 ? 'bg-[var(--bg-secondary)]' : ''}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-16">
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
                      <i className={`ph ${cat.icon} text-xl text-[var(--accent-primary)]`}></i>
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">{cat.label}</span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-4">{cat.label}</h2>
                  <div className="w-8 h-0.5 bg-[var(--accent-primary)]"></div>
                </div>
                <div className="lg:col-span-2 flex items-center">
                  <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{cat.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catProducts.length > 0
                  ? catProducts.map((p) => <ProductCard key={p.id} product={p} />)
                  : <p className="text-[var(--text-secondary)] col-span-3 py-8 text-center">Products coming soon.</p>
                }
              </div>
            </div>
          </div>
        );
      })}

      {/* CTA */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-2xl border border-[var(--accent-primary)]/20 bg-[var(--bg-secondary)] p-12 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Need a custom solution?</h2>
            <p className="text-[var(--text-secondary)] mb-8 text-lg max-w-xl mx-auto">
              Talk to our engineers about bespoke sensor modules, custom MEMS processes, or microfluidic system integration.
            </p>
            <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-md bg-[var(--accent-primary)] px-8 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110">
              Consult an Engineer
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
