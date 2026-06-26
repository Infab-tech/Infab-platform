'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
        ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-[var(--border-color)] shadow-sm'
        : 'bg-[var(--bg-primary)] border-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo - Automatically turns white in dark mode! */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src="/assests/cropped-infab-logo.webp"
            alt="INFAB Semiconductor"
            width={180}
            height={55}
            className="object-contain w-auto h-16 md:h-20 brand-logo-adaptive"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-[var(--text-secondary)] text-[15px]">
          <Link href="/about" className="hover:text-[var(--accent-primary)] transition-colors">About Us</Link>
          <Link href="/products" className="hover:text-[var(--accent-primary)] transition-colors">Products</Link>
          <Link href="/services" className="hover:text-[var(--accent-primary)] transition-colors">Services</Link>
          <Link href="/services#facilities" className="hover:text-[var(--accent-primary)] transition-colors">Facilities</Link>
          <Link href="/team" className="hover:text-[var(--accent-primary)] transition-colors">Team</Link>
          <Link href="/news" className="hover:text-[var(--accent-primary)] transition-colors">News</Link>
          <Link href="/contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact</Link>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all" aria-label="Client Portal">
            <i className="ph ph-user text-lg"></i>
          </Link>
          <ThemeToggle className="w-10 h-10 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-transparent p-0" />
          <Link href="/contact" className="bg-[#007AC3] text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity ml-1">
            Request Quote
          </Link>
        </div>

      </div>
    </header>
  );
}
