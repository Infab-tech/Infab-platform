'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import ThemeToggle from '@/components/ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/services#facilities', label: 'Facilities' },
  { href: '/team', label: 'Team' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();

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

  // Close mobile menu on route change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  const navbarBase = scrolled
    ? 'bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--text-primary)]/10 text-[var(--text-primary)]'
    : isHome
      ? 'bg-transparent border-b-transparent text-white'
      : 'bg-transparent border-b-transparent text-[var(--text-primary)]';

  const iconClass = `flex items-center justify-center p-2.5 rounded-lg border bg-transparent cursor-pointer transition-all ${
    scrolled || !isHome
      ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100'
      : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100'
  }`;

  return (
    <>
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${navbarBase}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Brand */}
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

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">
                {label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className={iconClass} aria-label="Dashboard" title="Dashboard">
                  <i className="ph ph-squares-four text-lg"></i>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${iconClass} ${scrolled || !isHome ? 'text-red-500 hover:text-red-600' : 'text-red-400 hover:text-red-500'}`}
                  aria-label="Logout"
                  title="Logout"
                >
                  <i className="ph ph-sign-out text-lg"></i>
                </button>
              </>
            ) : (
              <Link href="/login" className={iconClass} aria-label="Client Portal Login" title="Client Portal Login">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                </svg>
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
              href={user ? '/catalog' : '/contact'}
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--accent-primary)] px-5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle
              className={
                scrolled || !isHome
                  ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100 text-[var(--text-primary)]'
                  : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100 text-white'
              }
            />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={iconClass}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <i className={`ph ${menuOpen ? 'ph-x' : 'ph-list'} text-xl`}></i>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Down Drawer */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-b border-[var(--text-primary)]/10 md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-[90vh] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-6 flex flex-col gap-3 border-t border-[var(--text-primary)]/10 pt-4 mt-1">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors"
              >
                <i className="ph ph-squares-four text-lg text-[var(--accent-primary)]"></i>
                My Dashboard
              </Link>
              <Link
                href="/catalog"
                className="flex items-center justify-center h-11 rounded-md bg-[var(--accent-primary)] text-xs font-semibold uppercase tracking-wider text-white hover:brightness-110 transition-all"
              >
                Request Quote
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <i className="ph ph-sign-out text-lg"></i>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5 transition-colors"
              >
                <i className="ph ph-user text-lg text-[var(--accent-primary)]"></i>
                Client Portal Login
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center h-11 rounded-md bg-[var(--accent-primary)] text-xs font-semibold uppercase tracking-wider text-white hover:brightness-110 transition-all"
              >
                Request Quote
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Tap outside to close */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
