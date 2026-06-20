import { prisma } from '@/lib/supabase/prisma';
import { toggleProductStatus, deleteProduct } from '@/app/actions/admin';
import Link from 'next/link';

export const metadata = {
    title: 'Products Management | Admin Console',
};

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: { category: 'asc' }
    });

    return (
        <div className="max-w-6xl mx-auto pt-8 sm:pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
                <div className="mt-8 sm:mt-0">
                    <h1 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">Product Catalog</h1>
                    <p className="text-[var(--text-secondary)]">Manage your active products and categories.</p>
                </div>
                <Link href="/admin/products/new" className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity">
                    + Add New Product
                </Link>
            </div>

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
                                    <td colSpan={4} className="p-10 text-center text-[var(--text-secondary)]">No products in the database.</td>
                                </tr>
                            )}
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors text-[var(--text-primary)]">
                                    <td className="p-5">
                                        {product.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={product.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover border border-[var(--text-primary)]/10" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 flex items-center justify-center">
                                                <i className="ph ph-image text-lg text-[var(--text-secondary)]/40"></i>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-5">
                                        <span className="inline-flex px-2 py-1 bg-[var(--text-primary)]/5 rounded text-xs font-mono uppercase text-[var(--text-secondary)]">
                                            {product.category}
                                        </span>
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

                                            {/* Edit */}
                                            <Link href={`/admin/products/${product.id}/edit`} className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-colors">
                                                Edit
                                            </Link>

                                            {/* Toggle Status Action */}
                                            <form action={async () => {
                                                'use server';
                                                await toggleProductStatus(product.id, product.isActive);
                                            }}>
                                                <button type="submit" className="text-xs font-bold uppercase tracking-wider px-3 py-2 rounded border border-[var(--text-primary)]/20 hover:bg-[var(--text-primary)]/10 transition-colors">
                                                    {product.isActive ? 'Hide' : 'Show'}
                                                </button>
                                            </form>

                                            {/* Delete Action */}
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
        </div>
    );
}