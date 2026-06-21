import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';
import { prisma } from '@/lib/supabase/prisma';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect('/login');
    }

    // RBAC Security Check
    const userRole = await prisma.userRole.findUnique({
        where: { email: user.email.toLowerCase() }
    });

    if (!userRole || userRole.role !== 'ADMIN') {
        // If a normal customer tries to enter the admin area, kick them to their portal
        redirect('/dashboard');
    }

    return (
        <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

            {/* Admin Sidebar */}
            <aside className="w-64 border-r border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] flex flex-col">
                <div className="p-6 border-b border-[var(--text-primary)]/10 relative">
                    <Link href="/admin">
                        <Image src="/assests/cropped-infab-logo.webp" alt="INFAB" width={120} height={40} className="brand-logo-adaptive mb-2" />
                    </Link>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-red-500 font-bold bg-red-500/10 px-2 py-1 rounded">
                        Admin Console
                    </span>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-squares-four text-xl text-[var(--accent-primary)]"></i> Dashboard
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-envelope-simple text-xl text-[var(--accent-primary)]"></i> Inquiries
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-receipt text-xl text-[var(--accent-primary)]"></i> Quote Requests
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-microchip text-xl text-[var(--accent-primary)]"></i> Products
                    </Link>
                    <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-newspaper text-xl text-[var(--accent-primary)]"></i> News
                    </Link>
                    <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-users-three text-xl text-[var(--accent-primary)]"></i> Team
                    </Link>
                    <Link href="/admin/staff" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-shield-check text-xl text-[var(--accent-primary)]"></i> Staff Access
                    </Link>
                    
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors">
                        <i className="ph ph-users text-xl text-[var(--accent-primary)]"></i> Users
                    </Link>
                </nav>

                <div className="p-4 border-t border-[var(--text-primary)]/10">
                    <form action={logoutUser}>
                        <button type="submit" className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-semibold">
                            <i className="ph ph-sign-out mr-2"></i> Secure Logout
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[var(--bg-primary)] flex flex-col">
                <div className="flex justify-end px-8 pt-6 pb-2">
                    <ThemeToggle />
                </div>
                <div className="px-8 pb-8 flex-1">
                    {children}
                </div>
            </main>

        </div>
    );
}