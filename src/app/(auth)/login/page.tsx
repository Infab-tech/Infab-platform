'use client';

import { useState } from 'react';
import { loginUser } from '@/app/actions/auth';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function LoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await loginUser(formData);

        // If we reach this line, the redirect failed (invalid credentials)
        if (result && !result.success) {
            setErrorMessage(result.message);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-6">
            
            {/* Top Left Back Button */}
            <div className="absolute top-6 left-6 z-50">
                <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors">
                    <i className="ph ph-arrow-left"></i> Back to Home
                </Link>
            </div>
            
            {/* Top Right Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle className="border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 text-[var(--text-primary)]" />
            </div>

            {/* Background aesthetics */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[rgba(0,212,255,0.03)] blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo Header */}
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
                    <h1 className="text-2xl font-bold text-[var(--text-primary)]">Client Portal Access</h1>
                    <p className="text-[var(--text-secondary)] mt-2">Sign in to manage your quotes and orders</p>
                </div>

                {/* Login Form */}
                <div className="bg-[var(--bg-secondary)] border border-[var(--text-primary)]/10 p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Password</label>
                                <Link href="/forgot-password" className="text-xs text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors">Forgot Password?</Link>
                            </div>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="bg-[var(--text-primary)]/5 border border-[var(--text-primary)]/10 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                            />
                        </div>

                        {errorMessage && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center font-medium">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[var(--accent-primary)] text-[var(--bg-primary)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-colors disabled:opacity-50 mt-2"
                        >
                            {isSubmitting ? 'Authenticating...' : 'Secure Sign In'}
                        </button>

                    </form>
                    
                    <div className="mt-6 text-center">
                        <Link href="/register" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                            Don&apos;t have an account? <span className="font-semibold text-[var(--text-primary)]">Request access</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}