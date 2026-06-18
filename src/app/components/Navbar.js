'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Sync with user's local storage preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLight(true);
    }
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-[var(--bg-secondary)]/90 backdrop-blur-md border-b border-[var(--text-primary)]/10 text-[var(--text-primary)]' 
        : 'bg-transparent border-b-transparent text-white'
    }`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Brand Logo Wrapper */}
        <div className="flex items-center">
          <Image 
            src="/assests/cropped-infab-logo.webp" 
            alt="INFAB Semiconductor Logo" 
            width={160} 
            height={50} 
            className={`object-contain w-auto h-20 transition-all duration-300 ${!scrolled ? 'invert mix-blend-screen' : 'brand-logo-adaptive'}`}
            priority
          />
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">About Us</a>
          <a href="#products" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Products</a>
          <a href="#facilities" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Facilities</a>
          <a href="#contact" className="text-sm font-medium tracking-wide opacity-80 hover:opacity-100 transition-opacity">Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className={`p-2.5 rounded-lg border bg-transparent cursor-pointer transition-all ${
              scrolled 
                ? 'border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 opacity-80 hover:opacity-100' 
                : 'border-white/10 hover:bg-white/5 opacity-80 hover:opacity-100'
            }`}
            aria-label="Toggle Theme Mode"
          >
            {isLight ? (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23Z"></path></svg>
            ) : (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a72,72,0,1,1-72-72A72.08,72.08,0,0,1,192,128Zm24-8a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Zm-88,88v24a8,8,0,0,0,16,0V208a8,8,0,0,0-16,0ZM40,120H16a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16Zm148.49-61.51a8,8,0,0,0,11.31-11.32l-17-17a8,8,0,0,0-11.31,11.32Zm-113,113-17,17a8,8,0,0,0,11.31,11.32l17-17a8,8,0,0,0-11.31-11.32Zm113,0a8,8,0,0,0-11.31,11.32l17,17a8,8,0,0,0,11.31-11.32Zm-113-113-17-17a8,8,0,0,0-11.31,11.32l17,17a8,8,0,0,0,11.31-11.32Z"></path></svg>
            )}
          </button>
          
          <a 
            href="#contact" 
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-md bg-[var(--accent-primary)] px-5 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:brightness-110"
          >
            Request Quote
          </a>
        </div>

      </div>
    </header>
  );
}