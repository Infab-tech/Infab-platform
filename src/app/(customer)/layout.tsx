import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { prisma } from '@/lib/supabase/prisma';
import { CartProvider } from '@/lib/cart-context';
import CartBadge from '@/components/ui/CartBadge';

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect('/login');
    }

    const userRole = await prisma.userRole.findUnique({
        where: { email: user.email.toLowerCase() }
    });
    const isAdmin = userRole?.role === 'ADMIN';

    if (isAdmin) {
        redirect('/admin');
    }

    return (
        <CartProvider>
            <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

                {/* Sidebar Navigation */}
                <aside className="w-64 border-r border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] flex flex-col">
                    <div className="p-6 border-b border-[var(--text-primary)]/10">
                        <Link href="/">
                            <Image src="/assests/cropped-infab-logo.webp" alt="INFAB" width={120} height={40} priority style={{ width: 'auto', height: 'auto' }} className="brand-logo-adaptive" />
                        </Link>
                    </div>

                    <nav className="flex-1 p-4 flex flex-col gap-1">
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 hover:text-[var(--text-primary)] transition-colors">
                            <i className="ph ph-squares-four text-xl text-[var(--accent-primary)]"></i> Overview
                        </Link>

                        <div className="mt-2 mb-1 px-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]/50">Shop</span>
                        </div>

                        <Link href="/catalog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 hover:text-[var(--text-primary)] transition-colors">
                            <i className="ph ph-storefront text-xl text-[var(--accent-primary)]"></i> Product Catalog
                        </Link>

                        <Link href="/cart" className="flex items-center justify-between px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 hover:text-[var(--text-primary)] transition-colors">
                            <span className="flex items-center gap-3">
                                <i className="ph ph-shopping-cart text-xl text-[var(--accent-primary)]"></i> RFQ Cart
                            </span>
                            <CartBadge />
                        </Link>

                        <div className="mt-2 mb-1 px-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]/50">Account</span>
                        </div>

                        <Link href="/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 hover:text-[var(--text-primary)] transition-colors">
                            <i className="ph ph-file-text text-xl text-[var(--accent-primary)]"></i> Quotes & Orders
                        </Link>
                    </nav>

                    {/* Profile Bottom */}
                    <div className="p-4 border-t border-[var(--text-primary)]/10 mt-auto">
                        <Link href="/profile" className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[var(--text-primary)]/5 transition-colors group w-full">
                            <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex-shrink-0 flex items-center justify-center text-[var(--accent-primary)] font-bold text-lg">
                                {user.email?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="overflow-hidden text-left flex-1">
                                <p className="text-sm font-semibold text-[var(--text-primary)] truncate block w-full">{user.email}</p>
                                <p className="text-xs text-[var(--text-secondary)] truncate block w-full">Manage Account</p>
                            </div>
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto">
                    <header className="h-16 border-b border-[var(--text-primary)]/10 flex items-center justify-between px-8 bg-[var(--bg-secondary)]/50 backdrop-blur-md sticky top-0 z-10">
                        <h1 className="font-mono text-sm tracking-widest uppercase text-[var(--text-secondary)]">Client Portal</h1>
                        <ThemeToggle className="border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 text-[var(--text-primary)]" />
                    </header>
                    <div className="p-8">
                        {children}
                    </div>
                </main>

            </div>
        </CartProvider>
    );
}
