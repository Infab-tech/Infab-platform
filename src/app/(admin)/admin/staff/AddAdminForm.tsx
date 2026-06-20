'use client';

import { useState } from 'react';
import { addAdminRole } from '@/app/actions/roles';

export default function AddAdminForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await addAdminRole(formData);
            
            if (result && result.success) {
                setMessage({ type: 'success', text: result.message });
                (e.target as HTMLFormElement).reset(); // clear form
            } else if (result && !result.success) {
                setMessage({ type: 'error', text: result.message });
            }
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {message && (
                <div className={`p-3 rounded-lg text-sm font-bold ${message.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {message.text}
                </div>
            )}
            
            <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase text-[var(--text-secondary)] mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="colleague@infab.com"
                    className="w-full px-4 py-2 bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded focus:outline-none focus:border-[var(--accent-primary)] text-sm transition-colors text-[var(--text-primary)]"
                />
            </div>
            
            <div>
                <label htmlFor="password" className="block text-xs font-bold uppercase text-[var(--text-secondary)] mb-2">
                    Temporary Password
                </label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="SecurePass123!"
                    className="w-full px-4 py-2 bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded focus:outline-none focus:border-[var(--accent-primary)] text-sm transition-colors text-[var(--text-primary)]"
                />
                <p className="text-[10px] text-[var(--text-secondary)] mt-1">
                    Provide this password to the staff member. They will use it to log in.
                </p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 px-4 py-3 bg-[var(--accent-primary)] text-black font-bold uppercase tracking-wider text-xs rounded hover:opacity-90 transition-opacity disabled:opacity-50"
            >
                {loading ? 'Creating Account...' : 'Register Staff Account'}
            </button>
        </form>
    );
}
