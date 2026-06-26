'use client';

import { useState } from 'react';
import { updatePassword } from '@/app/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        if (formData.get('password') !== formData.get('confirmPassword')) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            setIsSubmitting(false);
            return;
        }

        const result = await updatePassword(formData);

        if (result && !result.success) {
            setMessage({ type: 'error', text: result.message });
        } else {
            setMessage({ type: 'success', text: result?.message || 'Password updated successfully!' });
            setTimeout(() => {
                router.push('/profile');
            }, 2000);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="mb-10">
                <Link href="/profile" className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors -ml-4">
                    <i className="ph ph-arrow-left"></i> Back to Profile
                </Link>
                <h2 className="text-3xl font-bold mb-2">Change Password</h2>
                <p className="text-[var(--text-secondary)]">Update your account password securely.</p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl overflow-hidden mb-8 p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">New Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength={6}
                            className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirmPassword" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            minLength={6}
                            className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        />
                    </div>

                    {message && (
                        <div className={`p-4 border rounded-lg text-sm text-center font-medium ${
                            message.type === 'success' 
                                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                                : 'bg-red-500/10 border-red-500/20 text-red-400'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors disabled:opacity-50 mt-2"
                    >
                        {isSubmitting ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
