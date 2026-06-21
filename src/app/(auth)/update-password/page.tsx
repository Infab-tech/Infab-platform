'use client';

import { useState, useEffect } from 'react';
import { updatePassword } from '@/app/actions/auth';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function UpdatePasswordPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Supabase passes the recovery token in the hash hash URL fragment.
        // The auth helper handles PKCE exchange automatically on mount.
        // If we want to be sure, we can listen to auth state change.
        const supabase = createClient();
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                // Now they are logged in with a recovery session, safe to update password
            }
        });
    }, []);

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
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-6">
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors">
                    <i className="ph ph-arrow-left"></i> Back to Home
                </Link>
            </div>
            
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle className="border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 text-[var(--text-primary)]" />
            </div>

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[rgba(0,212,255,0.03)] blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-10">
                    <Link href="/">
                        <Image
                            src="/assests/cropped-infab-logo.webp"
                            alt="INFAB Logo"
                            width={180}
                            height={60}
                            priority
                            style={{ width: 'auto', height: 'auto' }}
                            className="brand-logo-adaptive mb-6"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Set New Password</h1>
                    <p className="text-[var(--text-secondary)] mt-2">Please enter your new password</p>
                </div>

                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-8 rounded-2xl shadow-2xl">
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
                            <div className={`p-3 border rounded-lg text-sm text-center font-medium ${
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
        </div>
    );
}
