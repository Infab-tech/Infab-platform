'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Facilities', href: '/services#facilities' },
  { label: 'Team', href: '/team' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-[var(--border-color)] shadow-sm'
        : 'bg-[var(--bg-primary)] border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center" onClick={() => setMenuOpen(false)}>
          <Image
            src="/assests/cropped-infab-logo.webp"
            alt="INFAB Semiconductor"
            width={180}
            height={55}
            className="object-contain w-auto h-12 sm:h-14 md:h-16 brand-logo-adaptive"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-[var(--text-secondary)] text-[15px]">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-[var(--accent-primary)] transition-colors">{l.label}</Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/login" className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all" aria-label="Client Portal">
            <i className="ph ph-user text-lg"></i>
          </Link>
          <ThemeToggle className="w-10 h-10 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-transparent p-0" />
          <Link href="/contact" className="bg-[#007AC3] text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity ml-1">
            Request Quote
          </Link>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle className="w-9 h-9 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-transparent p-0" />
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="w-9 h-9 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <i className={`ph ${menuOpen ? 'ph-x' : 'ph-list'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-[var(--bg-primary)] border-t border-[var(--border-color)] shadow-xl">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-3 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-[var(--border-primary)] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="py-3 px-3 text-base font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="ph ph-user"></i> Client Portal
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 bg-[#007AC3] text-white py-3 px-4 rounded-lg text-sm font-bold uppercase tracking-wider text-center hover:opacity-90 transition-opacity"
              >
                Request Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
