import { createClient } from '@/lib/supabase/server';
import { logoutUser } from '@/app/actions/auth';

export const metadata = {
    title: 'Profile | INFAB Client Portal',
};

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    return (
        <div className="max-w-3xl">
            <div className="mb-10">
                <h2 className="text-3xl font-bold mb-2">Profile Settings</h2>
                <p className="text-[var(--text-secondary)]">Manage your account and security preferences.</p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden mb-8">
                <div className="p-6 border-b border-[var(--text-primary)]/10 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] flex items-center justify-center text-2xl font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">Account Details</h3>
                        <p className="text-sm text-[var(--text-secondary)]">Client Portal Access</p>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block font-mono text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">Registered Email</label>
                        <div className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)]">
                            {user.email}
                        </div>
                    </div>
                    <div>
                        <label className="block font-mono text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">Account ID</label>
                        <div className="bg-white/[0.02] border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] font-mono text-sm truncate">
                            {user.id}
                        </div>
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-6 flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Change Password</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Request a secure password reset link via email.</p>
                </div>
                <a
                    href="/forgot-password"
                    className="px-6 py-3 rounded-lg bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] font-bold uppercase tracking-wider text-sm hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)] transition-colors border border-[var(--accent-primary)]/20"
                >
                    Reset Password
                </a>
            </div>

            {/* Logout Form using Server Actions */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">Secure Logout</h3>
                    <p className="text-sm text-[var(--text-secondary)]">Sign out of the client portal.</p>
                </div>
                <form action={logoutUser}>
                    <button type="submit" className="px-6 py-3 rounded-lg bg-red-500/10 text-red-500 font-bold uppercase tracking-wider text-sm hover:bg-red-500 hover:text-[var(--text-primary)] transition-colors border border-red-500/20">
                        Sign Out
                    </button>
                </form>
            </div>

        </div>
    );
}