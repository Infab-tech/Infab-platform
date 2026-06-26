'use client';

import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    
    // Check if system prefers dark and no theme is saved
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
      if (!document.cookie.includes('theme=dark')) {
        document.cookie = "theme=dark; path=/; max-age=31536000";
      }
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      if (!document.cookie.includes('theme=light')) {
        document.cookie = "theme=light; path=/; max-age=31536000";
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.cookie = "theme=light; path=/; max-age=31536000";
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.cookie = "theme=dark; path=/; max-age=31536000";
      setIsDark(true);
    }
  };

  // Prevent hydration mismatch by not rendering the icon until mounted
  if (!mounted) {
    return <div className={`w-10 h-10 ${className}`} />; 
  }

  return (
    <button 
      onClick={toggleTheme}
      className={`flex items-center justify-center hover:bg-[var(--text-secondary)]/10 text-[var(--text-primary)] transition-all ${className}`}
      aria-label="Toggle Theme Mode"
      title="Toggle Theme Mode"
    >
      {isDark ? (
        // Moon Icon (shows when dark mode is ON)
        <i className="ph-fill ph-moon text-xl"></i>
      ) : (
        // Sun Icon (shows when light mode is ON)
        <i className="ph-fill ph-sun text-xl"></i>
      )}
    </button>
  );
}
