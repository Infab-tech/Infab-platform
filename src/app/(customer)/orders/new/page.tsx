import { prisma } from '@/lib/supabase/prisma';
import { submitQuoteRequest } from '@/app/actions/quote';
import { redirect } from 'next/navigation';

export const metadata = {
    title: 'Request New Quote | INFAB Client Portal',
};

export default async function NewQuotePage() {
    // Fetch active products directly from the database for the dropdown
    const products = await prisma.product.findMany({
        where: { isActive: true },
        orderBy: { category: 'asc' }
    });

    return (
        <div className="max-w-3xl">
            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2">Request Official Quote</h2>
                <p className="text-[var(--text-secondary)]">
                    Select a product and specify your volume requirements. An INFAB engineer will review your request and provide a formal quotation within 24-48 hours.
                </p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8">
                {/* We use a Server Action directly on the form action attribute */}
                <form action={async (formData) => {
                    'use server';
                    const result = await submitQuoteRequest(formData);
                    if (result.success) {
                        redirect('/orders'); // Send them back to the orders page on success
                    }
                }} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="productId" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Product Selection</label>
                        <select
                            id="productId"
                            name="productId"
                            required
                            defaultValue=""
                            className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] appearance-none transition-colors"
                        >
                            <option value="" disabled className="bg-[var(--bg-secondary)] text-[var(--text-secondary)]">-- Select a Product --</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id} className="bg-[var(--bg-secondary)] text-[var(--text-primary)]">
                                    {product.category} | {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="quantity" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Estimated Volume (Units)</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            defaultValue="1"
                            required
                            className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="notes" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Engineering Notes / Custom Requirements</label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={5}
                            placeholder="E.g., Require extended temperature range testing, or specific connector types..."
                            className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] resize-none transition-colors"
                        ></textarea>
                    </div>

                    <div className="pt-4 border-t border-[var(--text-primary)]/10 flex justify-end gap-4">
                        <a href="/dashboard" className="px-6 py-3 rounded-lg border border-[var(--text-primary)]/10 text-[var(--text-primary)] font-semibold text-sm hover:bg-[var(--text-primary)]/5 transition-colors">
                            Cancel
                        </a>
                        <button type="submit" className="px-6 py-3 rounded-lg bg-[var(--accent-primary)] text-[#03060c] font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors">
                            Submit Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
