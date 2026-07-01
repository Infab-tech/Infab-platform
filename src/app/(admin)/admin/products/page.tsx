import { prisma } from '@/lib/supabase/prisma';
import { toggleProductStatus, deleteProduct, seedDefaultProducts } from '@/app/actions/admin';
import Link from 'next/link';

import Pagination from '@/components/ui/Pagination';

export const metadata = {
    title: 'Products Management | Admin Console',
};

const CATEGORY_CONFIG: Record<string, { icon: string; colour: string; label: string }> = {
    AEROSPACE:  { icon: 'ph-airplane-tilt', colour: 'text-blue-400 bg-blue-400/10',  label: 'Aerospace' },
    HEALTHCARE: { icon: 'ph-dna',           colour: 'text-green-400 bg-green-400/10', label: 'Healthcare' },
    MEMS:       { icon: 'ph-cpu',           colour: 'text-cyan-400 bg-cyan-400/10',   label: 'MEMS' },
};

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ error?: string, page?: string, q?: string }> }) {
    const params = await searchParams;
    const currentPage = Math.max(1, parseInt(params?.page || '1', 10));
    const PAGE_SIZE = 10;
    const search = params?.q?.trim() || '';

    const where = search ? {
        OR: [
            { name:     { contains: search, mode: 'insensitive' as const } },
            { category: { contains: search, mode: 'insensitive' as const } },
        ],
    } : {};

    const [totalProducts, products] = await prisma.$transaction([
        prisma.product.count({ where }),
        prisma.product.findMany({
            where,
            orderBy: { category: 'asc' },
            skip: (currentPage - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        }),
    ]);
    const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

    // Only show seed banner when the entire DB is empty (not when search returns no results)
    const totalAllProducts = search ? await prisma.product.count() : totalProducts;
    const isUsingFallback = totalAllProducts === 0;

    return (
        <div className="max-w-6xl mx-auto pt-8 sm:pt-4">

            {/* FK error */}
            {params?.error === 'has_quotes' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg font-bold flex items-center gap-3">
                    <i className="ph ph-warning-circle text-xl"></i>
                    Cannot delete this product because it is part of existing customer quote requests. Please use &ldquo;Hide&rdquo; instead to preserve history.
                </div>
            )}

            {/* Status banner */}
            {isUsingFallback ? (
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <div className="flex items-start gap-3">
                        <i className="ph ph-warning text-yellow-400 text-xl mt-0.5 flex-shrink-0"></i>
                        <div>
                            <p className="font-bold text-yellow-400 text-sm">Frontend is showing hardcoded fallback products</p>
                            <p className="text-yellow-400/70 text-xs mt-0.5">The database has no products yet. Seed the defaults to take control — any edits you make after seeding will appear live on <strong>/products</strong>.</p>
                        </div>
                    </div>
                    <form action={async () => {
                        'use server';
                        await seedDefaultProducts();
                    }}>
                        <button
                            type="submit"
                            className="whitespace-nowrap px-5 py-2.5 rounded-lg bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors"
                        >
                            Seed 15 Defaults →
                        </button>
                    </form>
                </div>
            ) : (
                <div className="mb-6 flex items-center justify-between p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <i className="ph ph-check-circle text-green-400 text-lg"></i>
                        <p className="text-green-400 text-sm font-semibold">
                            Live — frontend <code className="font-mono text-xs bg-green-500/10 px-1 py-0.5 rounded">/products</code> is showing {products.filter(p => p.isActive).length} active DB product{products.filter(p => p.isActive).length !== 1 ? 's' : ''}.
                        </p>
                    </div>
                    <Link href="/products" target="_blank" className="text-xs font-mono font-bold text-green-400 hover:text-green-300 flex items-center gap-1">
                        View on site <i className="ph ph-arrow-square-out"></i>
                    </Link>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-6">
                <div className="mt-2 sm:mt-0">
                    <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Product Catalog</h1>
                    <p className="text-[var(--text-secondary)]">Manage your active products and categories.</p>
                </div>
                <div className="flex items-center gap-3">
                    {!isUsingFallback && (
                        <Link href="/products" target="_blank" className="px-4 py-3 rounded-lg border border-[var(--text-primary)]/20 text-[var(--text-secondary)] font-bold text-sm hover:bg-[var(--text-primary)]/5 transition-colors flex items-center gap-2">
                            <i className="ph ph-eye"></i> Preview
                        </Link>
                    )}
                    <Link href="/admin/products/new" className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity">
                        + Add New Product
                    </Link>
                </div>
            </div>

            {/* Search bar */}
            <form method="GET" className="mb-6 flex gap-3">
                <div className="relative flex-1 max-w-sm">
                    <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"></i>
                    <input
                        type="text"
                        name="q"
                        defaultValue={search}
                        placeholder="Search by name or category…"
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-primary)]/50"
                    />
                </div>
                <button type="submit" className="px-4 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] text-sm font-bold hover:opacity-90 transition-opacity">
                    Search
                </button>
                {search && (
                    <a href="/admin/products" className="px-4 py-2.5 rounded-lg border border-[var(--text-primary)]/10 text-sm text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-colors">
                        Clear
                    </a>
                )}
            </form>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/10 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                                <th className="p-5 font-semibold w-16">Image</th>
                                <th className="p-5 font-semibold">Category</th>
                                <th className="p-5 font-semibold">Product Name</th>
                                <th className="p-5 font-semibold">Status</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-10 text-center text-[var(--text-secondary)]">
                                        {search ? `No products matching "${search}".` : 'No products in the database. Use "Seed 15 Defaults" above to get started.'}
                                    </td>
                                </tr>
                            )}
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors text-[var(--text-primary)]">
                                    <td className="p-5">
                                        {product.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-lg object-contain bg-white border border-[var(--text-primary)]/10 p-1" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 flex items-center justify-center">
                                                <i className="ph ph-image text-lg text-[var(--text-secondary)]/40"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        {(() => {
                                            const cfg = CATEGORY_CONFIG[product.category.toUpperCase()];
                                            return cfg ? (
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono font-bold uppercase ${cfg.colour}`}>
                                                    <i className={`ph ${cfg.icon}`}></i> {cfg.label}
                                                </span>
                                            ) : (
                                                <span className="inline-flex px-2 py-1 bg-[var(--text-primary)]/5 rounded text-xs font-mono uppercase text-[var(--text-secondary)]">
                                                    {product.category}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td className="p-5">
                                        <div className="font-bold text-[var(--text-primary)] mb-1">{product.name}</div>
                                        <div className="text-xs text-[var(--text-secondary)] line-clamp-1 max-w-md">
                                            {product.description}
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        {product.isActive ? (
                                            <span className="text-green-500 font-bold text-xs uppercase flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                                            </span>
                                        ) : (
                                            <span className="text-red-500 font-bold text-xs uppercase flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-red-500"></span> Inactive
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <div className="flex justify-end gap-3">
                                            <Link href={`/admin/products/${product.id}/edit`} className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors">
                                                Edit
                                            </Link>
                                            <form action={async () => {
                                                'use server';
                                                await toggleProductStatus(product.id, product.isActive);
                                            }}>
                                                <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors">
                                                    {product.isActive ? 'Hide' : 'Show'}
                                                </button>
                                            </form>
                                            <form action={async () => {
                                                'use server';
                                                await deleteProduct(product.id);
                                            }}>
                                                <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </div>
    );
}
