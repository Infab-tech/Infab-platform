'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { registerUser } from '@/app/actions/auth';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccessMsg('');

        const formData = new FormData(e.currentTarget);
        const res = await registerUser(formData);
        
        if (res && !res.success) {
            setError(res.message);
            setLoading(false);
        } else if (res && res.message) {
            // Reached here meaning success=false wasn't returned, but a message was.
            // This happens if email confirmation is required.
            setSuccessMsg(res.message);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] flex relative items-center justify-center p-4">
            {/* Top Right Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle className="border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 text-[var(--text-primary)]" />
            </div>

            {/* Top Left Back Button */}
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-all">
                    <i className="ph ph-arrow-left"></i> Back to Home
                </Link>
            </div>

            {/* Glowing background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-md relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <Link href="/">
                        <Image src="/assests/cropped-infab-logo.webp" alt="INFAB" width={160} height={50} priority style={{ width: 'auto', height: 'auto' }} className="brand-logo-adaptive mb-6" />
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Request Access</h1>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Create a client account to request quotes and manage active orders.</p>
                </div>

                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 rounded-2xl p-8 shadow-2xl">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-500 text-sm font-medium">
                            {successMsg}
                        </div>
                    )}

                    {!successMsg && (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="firstName">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstName" 
                                        name="firstName" 
                                        required 
                                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-sm text-[var(--text-primary)]" 
                                        placeholder="John" 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="lastName">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastName" 
                                        name="lastName" 
                                        required 
                                        className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-sm text-[var(--text-primary)]" 
                                        placeholder="Doe" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="organization">Organization / Company</label>
                                <input 
                                    type="text" 
                                    id="organization" 
                                    name="organization" 
                                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-sm text-[var(--text-primary)]" 
                                    placeholder="Acme Corp (Optional)" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="email">Business Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required 
                                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-sm text-[var(--text-primary)]" 
                                    placeholder="name@company.com" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    required 
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-sm text-[var(--text-primary)]" 
                                    placeholder="••••••••" 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]" htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    name="confirmPassword" 
                                    required 
                                    minLength={6}
                                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--text-primary)]/10 rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors text-sm text-[var(--text-primary)]" 
                                    placeholder="••••••••" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-3 mt-4 bg-[var(--accent-primary)] text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <i className="ph ph-spinner animate-spin text-lg"></i>
                                        CREATING ACCOUNT...
                                    </>
                                ) : (
                                    <>CREATE ACCOUNT</>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                            Already have an account? <span className="font-semibold text-[var(--text-primary)]">Sign in</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
