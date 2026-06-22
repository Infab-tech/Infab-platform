'use client';

import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { useState } from 'react';
import ProductImageCarousel from '@/components/ui/ProductImageCarousel';

export interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl: string | null;
  imageUrls: string[];
  datasheetUrl: string | null;
  drawingUrl: string | null;
  cadFileUrls: string[];
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: string; colour: string }> = {
  AEROSPACE:  { label: 'Aerospace & Defence',      icon: 'ph-airplane-tilt', colour: 'text-blue-400 bg-blue-400/10' },
  HEALTHCARE: { label: 'Healthcare & Life Sciences', icon: 'ph-dna',          colour: 'text-green-400 bg-green-400/10' },
};

function AddToRFQButton({ product }: { product: CatalogProduct }) {
  const { add, items } = useCart();
  const inCart = items.some((i) => i.productId === product.id);
  const [flash, setFlash] = useState(false);

  const handleAdd = () => {
    add({ productId: product.id, name: product.name, category: product.category, imageUrl: product.imageUrl });
    setFlash(true);
    setTimeout(() => setFlash(false), 1500);
  };

  if (inCart) {
    return (
      <Link
        href="/cart"
        className="w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--accent-primary)]/20 transition-colors"
      >
        <i className="ph ph-check-circle"></i> In RFQ Cart
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`w-full inline-flex items-center justify-center gap-2 h-10 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
        flash
          ? 'bg-green-500 text-white'
          : 'bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:opacity-90'
      }`}
    >
      <i className={`ph ${flash ? 'ph-check' : 'ph-plus'}`}></i>
      {flash ? 'Added!' : 'Add to RFQ'}
    </button>
  );
}

export default function CatalogClient({ products }: { products: CatalogProduct[] }) {
  const { count } = useCart();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = activeCategory ? products.filter((p) => p.category === activeCategory) : products;

  return (
    <div>
      {/* Cart CTA banner */}
      {count > 0 && (
        <div className="mb-6 flex items-center justify-between p-4 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 rounded-xl">
          <div className="flex items-center gap-3">
            <i className="ph ph-shopping-cart text-[var(--accent-primary)] text-xl"></i>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              You have <span className="text-[var(--accent-primary)]">{count} product{count !== 1 ? 's' : ''}</span> in your RFQ cart.
            </p>
          </div>
          <Link
            href="/cart"
            className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
          >
            Review & Submit →
          </Link>
        </div>
      )}

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
            activeCategory === null
              ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
              : 'border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40'
          }`}
        >
          All ({products.length})
        </button>
        {categories.map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          const count = products.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat
                  ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'
                  : 'border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)]/40'
              }`}
            >
              {cfg?.label ?? cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((product) => {
          const cfg = CATEGORY_CONFIG[product.category];
          return (
            <div
              key={product.id}
              className="group flex flex-col rounded-2xl border border-[var(--border-primary)] bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-primary)]/30 hover:shadow-xl hover:shadow-[var(--accent-primary)]/5"
            >
              {/* Image carousel */}
              {(() => {
                const allImages = [
                  ...(product.imageUrl ? [product.imageUrl] : []),
                  ...product.imageUrls.filter((u) => u !== product.imageUrl),
                ];
                return <ProductImageCarousel urls={allImages} name={product.name} height="h-40" />;
              })()}

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow gap-3">
                {/* Category badge */}
                <span className={`self-start inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${cfg?.colour ?? 'text-[var(--text-secondary)] bg-[var(--text-primary)]/5'}`}>
                  <i className={`ph ${cfg?.icon ?? 'ph-cube'}`}></i>
                  {cfg?.label ?? product.category}
                </span>

                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                  {product.name}
                </h3>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed flex-grow line-clamp-3">
                  {product.description}
                </p>

                {/* Specs */}
                {product.specs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {product.specs.slice(0, 3).map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[var(--text-primary)]/5 text-[var(--text-secondary)] font-mono text-[10px]">{s}</span>
                    ))}
                    {product.specs.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-[var(--text-primary)]/5 text-[var(--text-secondary)] font-mono text-[10px]">+{product.specs.length - 3} more</span>
                    )}
                  </div>
                )}

                {/* Downloads */}
                {(product.datasheetUrl || product.drawingUrl || product.cadFileUrls?.length > 0) && (
                  <div className="flex gap-2 flex-wrap mb-2">
                     {product.datasheetUrl && <a href={product.datasheetUrl} target="_blank" className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors">Datasheet</a>}
                     {product.drawingUrl && <a href={product.drawingUrl} target="_blank" className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors">2D Drawing</a>}
                     {product.cadFileUrls?.map((url, i) => <a key={i} href={url} target="_blank" className="text-[10px] uppercase font-mono font-bold tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-2 py-1 rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors">3D CAD</a>)}
                  </div>
                )}

                <AddToRFQButton product={product} />
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-[var(--text-secondary)]">
          <i className="ph ph-magnifying-glass text-4xl mb-3 block opacity-30"></i>
          No products in this category yet.
        </div>
      )}
    </div>
  );
}
