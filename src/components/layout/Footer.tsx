import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* WhatsApp Floating Widget */}
      <a
        href="https://wa.me/919008589371"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:scale-110"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 256 256">
          <path d="M187.58,144.84l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88,40,40,0,0,0,40-40A8,8,0,0,0,187.58,144.84ZM152,176a72.08,72.08,0,0,1-72-72,24,24,0,0,1,19.29-23.54l11.48,22.95L101,117.11a8,8,0,0,0-.73,7.65,56.38,56.38,0,0,0,30.15,30.15,8,8,0,0,0,7.65-.73l13.7-9.19,22.95,11.48A24,24,0,0,1,152,176ZM128,24A104,104,0,0,0,36.18,176.88L24.83,210.93a16,16,0,0,0,20.24,20.24l34.05-11.35A104,104,0,1,0,128,24Zm0,192a88,88,0,0,1-44.06-11.81,8,8,0,0,0-6.54-.67L40,216l12.47-37.4a8,8,0,0,0-.67-6.54A88,88,0,1,1,128,216Z"></path>
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-primary)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">

            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Image
                src="/assests/cropped-infab-logo.webp"
                alt="INFAB Semiconductor"
                width={180}
                height={60}
                style={{ width: 'auto', height: 'auto' }}
                className="mb-4 brand-logo-adaptive h-auto w-auto"
              />
              <p className="mb-6 text-sm leading-relaxed text-[var(--text-secondary)]">
                MEMS sensors, microfluidic chips, and semiconductor fabrication services designed and manufactured in Bengaluru. INCeNSE incubated. ISO 9001 & AS 9100D certified.
              </p>
              {/* Social Icons */}
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/infab-semiconductor-pvt-ltd/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v96a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0ZM216,208a8,8,0,0,1-8-8V160a36,36,0,0,0-72,0v40a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A52,52,0,0,1,216,160v40A8,8,0,0,1,216,208ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path></svg>
                </a>

                <a href="mailto:info@infab-tech.com" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-primary)] text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)]/50 hover:text-[var(--accent-primary)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z"></path></svg>
                </a>
              </div>
            </div>

            {/* Products Column */}
            <div className="lg:col-span-1">
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Products</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Aerospace & Defence', href: '/products#aerospace' },
                  { label: 'Healthcare & Life Sciences', href: '/products#healthcare' },
                ].map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-1">
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Services</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'MEMS', href: '/services#mems' },
                  { label: 'Microfluidics', href: '/services#microfluidics' },
                  { label: 'Facilities', href: '/services#facilities' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Company</h3>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'About Us', href: '/about' },
                  { label: 'Our Team', href: '/team' },
                  { label: 'Careers', href: '/careers' },
                  { label: 'Services & Facilities', href: '/services' },
                  { label: 'News & Events', href: '/news' },
                  { label: 'Contact Us', href: '/contact' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offices Column */}
            <div>
              <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Offices</h3>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">Incubation Lab</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    INCeNSE, IISc Bangalore 560012
                  </p>
                  <a href="tel:+918023607755" className="mt-1 block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">+91 80 2360 7755</a>
                  <a href="mailto:info@infabsemi.com" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">info@infabsemi.com</a>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[var(--accent-primary)]">Corporate Office</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    PVR Towers, 5th floor<br />1341, Venkateshwara Nagar main road<br />MCECHS layout, Dr. Shivaram Karanth Nagar<br />Jakkur, Bengaluru 560064
                  </p>
                  <a href="tel:+918045039946" className="mt-1 block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">+91 80 4503 9946</a>
                  <a href="mailto:info@infab-tech.com" className="block text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">info@infab-tech.com</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border-primary)]">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row">
            <p className="text-xs text-[var(--text-secondary)]">
              &copy; {currentYear} INFAB Semiconductor Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Terms of Service</Link>
              <Link href="/contact" className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
