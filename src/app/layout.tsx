import './globals.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    template: '%s | InFAB',
    default: 'InFAB Advanced MEMS & Microfluidics Foundry',
  },
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'INFAB Semiconductor Pvt. Ltd.',
    url: 'https://infabsemi.com',
    logo: 'https://infabsemi.com/images/logo.png',
    description: 'India\'s deep-tech MEMS and microfluidics company, incubated at INCeNSE, IISc Bengaluru.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'PVR Towers, 5th floor, 1341, Venkateshwara Nagar Main Road, MCECHS Layout',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560064',
      addressCountry: 'IN',
    },
    contactPoint: [
      { '@type': 'ContactPoint', telephone: '+91-80-4503-9946', contactType: 'customer service', areaServed: 'IN' },
      { '@type': 'ContactPoint', telephone: '+91-80-2360-7755', contactType: 'technical support', areaServed: 'IN' },
    ],
    sameAs: ['https://www.linkedin.com/company/infab-semiconductor-pvt-ltd/'],
  };

  return (
    <html lang="en" className={`scroll-smooth ${isDark ? 'dark' : ''}`} data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css" />
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                window.sessionStorage.getItem('test');
              } catch (e) {
                const mockStorage = {
                  getItem: function() { return null; },
                  setItem: function() {},
                  removeItem: function() {},
                  clear: function() {},
                  length: 0,
                  key: function() { return null; }
                };
                Object.defineProperty(window, 'sessionStorage', { value: mockStorage, writable: true, configurable: true });
                Object.defineProperty(window, 'localStorage', { value: mockStorage, writable: true, configurable: true });
              }
            `,
          }}
        />
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
        <Analytics />
      </body>
    </html>
  );
}