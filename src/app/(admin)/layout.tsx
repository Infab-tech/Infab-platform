import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';
import { prisma } from '@/lib/supabase/prisma';
import ThemeToggle from '@/components/ui/ThemeToggle';
import AdminSidebarNav from '@/components/layout/AdminSidebarNav';

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

                <AdminSidebarNav />

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