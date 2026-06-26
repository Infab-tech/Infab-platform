import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'INFAB Semiconductor | Advanced MEMS & Microfluidic Solutions',
  description: 'MEMS sensors, microfluidic chips, and semiconductor fabrication services — designed and built in India. INCeNSE incubated. ISO 9001 & AS 9100D certified.',
  keywords: ['MEMS', 'microfluidics', 'semiconductor', 'INFAB', 'INCeNSE', 'pressure sensor', 'cleanroom', 'India'],
  authors: [{ name: 'INFAB Semiconductor Pvt. Ltd.' }],
  openGraph: {
    title: 'INFAB Semiconductor | Advanced MEMS & Microfluidic Solutions',
    description: 'MEMS sensors, microfluidic chips, and semiconductor fabrication — designed and built in India. INCeNSE incubated. ISO 9001 & AS 9100D certified.',
    url: 'https://infabsemi.com',
    siteName: 'INFAB Semiconductor',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INFAB Semiconductor | Advanced MEMS & Microfluidic Solutions',
    description: 'Pioneering Indian deep-tech company specializing in MEMS sensors, actuators, and microfluidic devices.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value;
  const isDark = theme === 'dark';

  return (
    <html lang="en" className={`scroll-smooth ${isDark ? 'dark' : ''}`} data-scroll-behavior="smooth">
      <head>
        <Script src="https://unpkg.com/@phosphor-icons/web" strategy="lazyOnload" />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-[var(--accent-primary)] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-[var(--bg-primary)]"
        >
          Skip to main content
        </a>
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}