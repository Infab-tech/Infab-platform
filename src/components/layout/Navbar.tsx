'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [supabase] = useState(() => createClient());
  // Sync with user's local storage preference and auth state on mount
  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Auth setup
    const fetchSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--text-primary)]/10 text-[var(--text-primary)]' 
        : isHome 
          ? 'bg-transparent border-b-transparent text-white' 
          : 'bg-transparent border-b-transparent text-[var(--text-primary)]'
    }`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo Wrapper */}
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/assests/cropped-infab-logo.webp" 
              alt="INFAB Semiconductor Logo" 
              width={160} 
              height={40} 
              priority
              className={`object-contain w-auto h-20 transition-all duration-300 ${(!scrolled && isHome) ? 'invert mix-blend-screen' : 'brand-logo-adaptive'}`}
            />
          </Link>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/about" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">About Us</Link>
          <Link href="/products" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Products</Link>
          <Link href="/services" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Services</Link>
          <Link href="/services#facilities" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Facilities</Link>
          <Link href="/team" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Team</Link>
          <Link href="/news" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">News</Link>
          <Link href="/contact" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Contact</Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center justify-center p-2.5 rounded-lg border bg-transparent cursor-pointer transition-all ${
                  scrolled || !isHome
                    ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100' 
                    : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100'
                }`}
                aria-label="Dashboard"
                title="Dashboard"
              >
                <i className="ph ph-squares-four text-lg"></i>
              </Link>
              <button
                onClick={handleLogout}
                className={`flex items-center justify-center p-2.5 rounded-lg border bg-transparent cursor-pointer transition-all ${
                  scrolled || !isHome
                    ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100 text-red-500 hover:text-red-600' 
                    : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100 text-red-400 hover:text-red-500'
                }`}
                aria-label="Logout"
                title="Logout"
              >
                <i className="ph ph-sign-out text-lg"></i>
              </button>
            </>
          ) : (
            <Link 
              href="/login"
              className={`flex items-center justify-center p-2.5 rounded-lg border bg-transparent cursor-pointer transition-all ${
                scrolled || !isHome
                  ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100' 
                  : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100'
              }`}
              aria-label="Client Portal Login"
              title="Client Portal Login"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>
            </Link>
          )}

          <ThemeToggle 
            className={
              scrolled || !isHome
                ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100 text-[var(--text-primary)]' 
                : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100 text-white'
            }
          />
          
          <Link 
            href="/contact" 
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-md bg-[var(--accent-primary)] px-5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
          >
            Request Quote
          </Link>
        </div>

      </div>
    </header>
  );
}