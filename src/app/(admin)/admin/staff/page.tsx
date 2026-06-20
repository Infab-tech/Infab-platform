import { prisma } from '@/lib/supabase/prisma';
import { removeAdminRole } from '@/app/actions/roles';
import AddAdminForm from './AddAdminForm';
import { createClient } from '@/lib/supabase/server';

export const metadata = {
    title: 'Staff Roles | Admin Console',
};

export default async function AdminStaffPage() {
    const supabase = await createClient();
    const { data: { user: currentUser } } = await supabase.auth.getUser();

    const admins = await prisma.userRole.findMany({
        where: { role: 'ADMIN' },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Staff Access</h1>
                <p className="text-[var(--text-secondary)]">Manage which users have Administrator privileges.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Add New Admin Form */}
                <div className="md:col-span-1">
                    <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/5 rounded-2xl p-6 shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Add Admin</h2>
                        <AddAdminForm />
                    </div>
                </div>

                {/* List of Admins */}
                <div className="md:col-span-2">
                    <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/5 rounded-2xl overflow-hidden shadow-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/5 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                                    <th className="p-5 font-semibold">Administrator Email</th>
                                    <th className="p-5 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {admins.length === 0 && (
                                    <tr>
                                        <td colSpan={2} className="p-10 text-center text-[var(--text-secondary)]">No admins found.</td>
                                    </tr>
                                )}
                                {admins.map((admin) => (
                                    <tr key={admin.email} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors">
                                        <td className="p-5">
                                            <div className="font-bold text-[var(--text-primary)]">{admin.email}</div>
                                            <div className="text-xs text-[var(--text-secondary)] mt-1">
                                                Added {new Date(admin.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            {currentUser?.email?.toLowerCase() === admin.email.toLowerCase() ? (
                                                <span className="px-4 py-2 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded text-xs font-bold uppercase cursor-default">
                                                    You
                                                </span>
                                            ) : (
                                                <form action={async () => {
                                                    'use server';
                                                    await removeAdminRole(admin.email);
                                                }}>
                                                    <button 
                                                        type="submit" 
                                                        className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-[var(--text-primary)] transition-colors rounded text-xs font-bold uppercase"
                                                    >
                                                        Revoke
                                                    </button>
                                                </form>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
