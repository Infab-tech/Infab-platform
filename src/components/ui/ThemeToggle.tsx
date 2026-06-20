'use client';

import { useState, useEffect } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [isLight, setIsLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
      if (!document.cookie.includes('theme=light')) {
        document.cookie = "theme=light; path=/; max-age=31536000";
      }
    } else if (savedTheme === 'dark') {
      if (!document.cookie.includes('theme=dark')) {
        document.cookie = "theme=dark; path=/; max-age=31536000";
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isLight) {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      document.cookie = "theme=dark; path=/; max-age=31536000";
      setIsLight(false);
    } else {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      document.cookie = "theme=light; path=/; max-age=31536000";
      setIsLight(true);
    }
  };

  // Prevent hydration mismatch by not rendering the icon until mounted
  if (!mounted) {
    return <div className={`w-[42px] h-[42px] ${className}`} />; 
  }

  return (
    <button 
      onClick={toggleTheme}
      className={`flex items-center justify-center p-2.5 rounded-lg border bg-transparent cursor-pointer transition-all ${className}`}
      aria-label="Toggle Theme Mode"
      title="Toggle Theme Mode"
    >
      {isLight ? (
        // Moon Icon
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23Z"></path></svg>
      ) : (
        // Sun Icon
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a72,72,0,1,1-72-72A72.08,72.08,0,0,1,192,128Zm24-8a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Zm-88,88v24a8,8,0,0,0,16,0V208a8,8,0,0,0-16,0ZM40,120H16a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16Zm148.49-61.51a8,8,0,0,0,11.31-11.32l-17-17a8,8,0,0,0-11.31,11.32Zm-113,113-17,17a8,8,0,0,0,11.31,11.32l17-17a8,8,0,0,0-11.31-11.32Zm113,0a8,8,0,0,0-11.31,11.32l17,17a8,8,0,0,0,11.31-11.32Zm-113-113-17-17a8,8,0,0,0-11.31,11.32l17,17a8,8,0,0,0,11.31-11.32Z"></path></svg>
      )}
    </button>
  );
}
