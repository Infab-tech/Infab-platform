import { prisma } from '@/lib/supabase/prisma';
import DeleteUserButton from './DeleteUserButton';

export const metadata = {
    title: 'Registered Users | Admin Console',
};

// Define the type we expect back from the raw Supabase query
type SupabaseUser = {
    id: string;
    email: string;
    raw_user_meta_data: any;
    created_at: Date;
    last_sign_in_at: Date | null;
};

export default async function AdminUsersPage() {
    // We use a raw query because Prisma defaults to the 'public' schema, 
    // but Supabase stores auth users in the 'auth' schema. This bypasses the need for the Service Role key.
    const users = await prisma.$queryRawUnsafe<SupabaseUser[]>(`
        SELECT id, email, raw_user_meta_data, created_at, last_sign_in_at 
        FROM auth.users 
        ORDER BY created_at DESC
    `);

    // Fetch who is an admin
    const admins = await prisma.userRole.findMany({
        where: { role: 'ADMIN' }
    });
    
    const adminEmails = admins.map(a => a.email.toLowerCase());

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Registered Users</h1>
                <p className="text-[var(--text-secondary)]">View and manage all registered clients and staff members.</p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[var(--text-primary)]/[0.02] border-b border-[var(--text-primary)]/5 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                                <th className="p-5 font-semibold">User Details</th>
                                <th className="p-5 font-semibold">Organization</th>
                                <th className="p-5 font-semibold">Role</th>
                                <th className="p-5 font-semibold">Registration Date</th>
                                <th className="p-5 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-10 text-center text-[var(--text-secondary)]">No users found.</td>
                                </tr>
                            )}
                            {users.map((user) => {
                                const meta = user.raw_user_meta_data || {};
                                const firstName = meta.first_name || '';
                                const lastName = meta.last_name || '';
                                const fullName = [firstName, lastName].filter(Boolean).join(' ');
                                const org = meta.organization || '—';
                                const customerId = meta.customer_id || user.id.substring(0, 8).toUpperCase();
                                const isAdmin = adminEmails.includes(user.email?.toLowerCase());

                                return (
                                    <tr key={user.id} className="border-b border-[var(--text-primary)]/5 hover:bg-[var(--text-primary)]/[0.02] transition-colors">
                                        <td className="p-5">
                                            <div className="font-bold text-[var(--text-primary)]">
                                                {fullName || 'Unknown Name'}
                                            </div>
                                            <div className="text-xs text-[var(--text-secondary)] mt-1 font-mono mb-2">
                                                {user.email}
                                            </div>
                                            {!isAdmin && (
                                                <span className="text-[10px] px-2 py-0.5 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] rounded font-mono font-bold tracking-wider">
                                                    ID: {customerId}
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5">
                                            <span className="text-[var(--text-primary)]">
                                                {org}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            {isAdmin ? (
                                                <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-[var(--text-primary)]/5 text-[var(--text-secondary)] rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    Customer
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-5 text-[var(--text-secondary)]">
                                            <div className="text-[var(--text-primary)]">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs mt-1">
                                                Last seen: {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                                            </div>
                                        </td>
                                        <td className="p-5 text-right">
                                            {!isAdmin && (
                                                <DeleteUserButton userId={user.id} userEmail={user.email} />
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
