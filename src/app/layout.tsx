import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'INFAB Semiconductor | Advanced MEMS & Microfluidic Solutions',
  description: 'Pioneering Indian deep-tech company specializing in advanced MEMS sensors, actuators, and medical microfluidic devices.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  const isLight = theme === 'light';

  return (
    <html lang="en" className={`scroll-smooth ${isLight ? 'light' : ''}`} data-scroll-behavior="smooth">
      <head>
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="lazyOnload" />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}