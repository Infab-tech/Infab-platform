import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | INFAB Semiconductor',
  description: 'Privacy Policy for INFAB Semiconductor Pvt. Ltd. — how we collect, use, and protect your personal information submitted through infabsemi.com.',
};

export default function PrivacyPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">

      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
            Privacy Policy
          </h1>
          <div className="w-12 h-1 bg-[var(--accent-primary)] mb-6" />
          <p className="text-[var(--text-secondary)] font-mono text-sm">
            Last Updated: June 26, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-6 py-20">

        {/* Intro */}
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8 mb-12">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            INFAB Semiconductor Pvt. Ltd. (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information of visitors to our website at{' '}
            <span className="text-[var(--accent-primary)] font-mono">https://infabsemi.com</span>{' '}
            (the &ldquo;Site&rdquo;), including business contacts submitting inquiries/RFQs and individual customers requesting fabrication or design services. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information.
          </p>
          <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
            By using the Site, you consent to the practices described in this Privacy Policy. If you do not agree, please do not use the Site.
          </p>
        </div>

        <div className="space-y-12">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">1. Information We Collect</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              We may collect the following categories of information:
            </p>

            <div className="space-y-6">
              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">a) Information you provide directly</h3>
                <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed">
                  {[
                    'Name, job title, company/organization name',
                    'Email address, phone number, mailing/billing address',
                    'Inquiry or RFQ details, technical specifications, design files, and other content you submit through contact forms',
                    'Account information if you register on the Site (e.g., "My Account")',
                    'Payment information (if/when online checkout is available), processed via a third-party payment processor — we do not store full payment card details',
                    'Any other information you choose to provide through email, WhatsApp, or other communication channels listed on the Site',
                  ].map(item => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">b) Information collected automatically</h3>
                <ul className="space-y-2 text-[var(--text-secondary)] text-sm leading-relaxed">
                  {[
                    'IP address, browser type, device information, operating system',
                    'Pages visited, time spent on pages, referring/exit URLs',
                    'Cookies and similar tracking technologies (see Section 5)',
                  ].map(item => (
                    <li key={item} className="flex gap-3">
                      <span className="text-[var(--accent-primary)] mt-0.5 flex-shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">c) Information from third parties</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Information shared by partners, distributors, or business contacts in connection with an inquiry or referral.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">2. How We Use Your Information</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">We use the information we collect to:</p>
            <ul className="space-y-3 ml-4 text-[var(--text-secondary)]">
              {[
                'Respond to inquiries, RFQs, and requests for fabrication/design services',
                'Prepare and deliver quotations, order confirmations, and invoices',
                'Process orders and provide customer support',
                'Communicate with you about your account, orders, or inquiries',
                'Improve our Site, products, and services',
                'Send updates about our products, services, or company news (only where you have opted in or as permitted by applicable law; you may opt out at any time)',
                'Comply with legal, regulatory, contractual, and export control obligations',
                'Detect, prevent, and address fraud, security, or technical issues',
              ].map(item => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">3. Legal Basis for Processing</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Where applicable data protection law requires a legal basis for processing (e.g., under India&apos;s Digital Personal Data Protection Act, 2023, or other applicable frameworks), we process personal information on the basis of:
            </p>
            <ul className="space-y-3 ml-4 text-[var(--text-secondary)]">
              {[
                'Your consent (e.g., when you submit an inquiry or sign up for updates);',
                'Performance of a contract or to take steps toward entering a contract (e.g., processing an order or quotation);',
                'Compliance with a legal obligation (e.g., export control, tax, or regulatory recordkeeping); or',
                'Our legitimate business interests, balanced against your rights (e.g., improving the Site, preventing fraud).',
              ].map(item => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">4. How We Share Your Information</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="space-y-3 ml-4 text-[var(--text-secondary)]">
              {[
                { bold: 'Service providers', rest: ' who perform functions on our behalf (e.g., website hosting, payment processing, email/communication tools, analytics providers), under appropriate confidentiality and data protection obligations' },
                { bold: 'Logistics and fabrication partners', rest: ' as necessary to fulfill custom fabrication, design, or shipping requests' },
                { bold: 'Regulatory and government authorities', rest: ' where required by law, including in connection with export control, customs, or other compliance obligations (particularly relevant for aerospace-related products and components)' },
                { bold: 'Professional advisors', rest: ' (e.g., legal, accounting) as needed' },
                { bold: 'Business transferees', rest: ' in the event of a merger, acquisition, restructuring, or sale of assets, subject to standard confidentiality protections' },
              ].map(item => (
                <li key={item.bold} className="flex gap-3 leading-relaxed">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span><strong className="text-[var(--text-primary)]">{item.bold}</strong>{item.rest}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-4">
              We may also share aggregated or de-identified information that cannot reasonably be used to identify you.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">5. Cookies and Tracking Technologies</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The Site may use cookies and similar technologies to:
            </p>
            <ul className="space-y-3 ml-4 text-[var(--text-secondary)] mb-4">
              {[
                'Enable core site functionality (e.g., cart, checkout, account login)',
                'Analyze site traffic and usage patterns',
                'Remember your preferences',
              ].map(item => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              You can control or disable cookies through your browser settings. Disabling certain cookies may affect Site functionality (e.g., login or checkout features).
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">6. Data Retention</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We retain personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, including to satisfy legal, accounting, regulatory, or export-control recordkeeping requirements, and to resolve disputes. Inquiry, quotation, and order records are typically retained in accordance with applicable commercial and tax recordkeeping requirements in India.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">7. Data Security</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We implement reasonable technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">8. International Data Transfers</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              As an India-based company serving customers and partners globally (including in aerospace, healthcare, and semiconductor sectors), your information may be transferred to, stored, and processed in India or other countries where we or our service providers operate. Where required by applicable law, we will take appropriate measures to protect personal information transferred internationally.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">9. Your Rights</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Depending on applicable law and your location, you may have the right to:
            </p>
            <ul className="space-y-3 ml-4 text-[var(--text-secondary)] mb-4">
              {[
                'Access the personal information we hold about you',
                'Request correction of inaccurate or incomplete information',
                'Request deletion of your personal information, subject to legal/contractual retention requirements',
                'Withdraw consent where processing is based on consent (e.g., opt out of marketing communications)',
                'Object to or request restriction of certain processing',
                'Request a copy of your information in a portable format, where applicable',
              ].map(item => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              To exercise these rights, please contact us using the details in Section 12 below. We may need to verify your identity before fulfilling certain requests.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">10. Children&apos;s Privacy</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Site is intended for business use and individual adult customers. We do not knowingly collect personal information from individuals under 18 years of age. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">11. Third-Party Links</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Site may contain links to third-party websites (including WhatsApp and other communication platforms). We are not responsible for the privacy practices of third-party sites, and we encourage you to review their privacy policies.
            </p>
          </section>

          {/* Section 12 — Contact card */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">12. Contact Us</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact:
            </p>
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center flex-shrink-0">
                  <i className="ph ph-buildings text-2xl text-[var(--accent-primary)]"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">INFAB Semiconductor Pvt. Ltd.</h3>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--accent-primary)] mt-0.5">Bengaluru, Karnataka</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[var(--border-primary)] pt-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Corporate Office</p>
                  <address className="not-italic text-sm text-[var(--text-secondary)] leading-relaxed">
                    PVR Towers, 5th floor<br />
                    1341, Venkateshwara Nagar main road<br />
                    MCECHS layout, Dr. Shivaram Karanth Nagar<br />
                    Jakkur, Bengaluru — 560064
                  </address>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Registered Office</p>
                  <address className="not-italic text-sm text-[var(--text-secondary)] leading-relaxed">
                    InCeNSE – Incubator @ CeNSE<br />
                    Centre for Nano Science and Engineering (CeNSE)<br />
                    Indian Institute of Science<br />
                    Bangalore, Karnataka 560012, India
                  </address>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-6 border-t border-[var(--border-primary)] pt-6">
                <a href="mailto:info@infab-tech.com" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  <i className="ph ph-envelope text-[var(--accent-primary)]"></i>
                  info@infab-tech.com
                </a>
                <a href="tel:+918045039946" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  <i className="ph ph-phone text-[var(--accent-primary)]"></i>
                  +91 80 4503 9946
                </a>
                <a href="tel:+918023607755" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
                  <i className="ph ph-phone text-[var(--accent-primary)]"></i>
                  +91 80 2360 7755
                </a>
              </div>
            </div>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">13. Changes to This Privacy Policy</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. The &ldquo;Last Updated&rdquo; date at the top of this policy indicates when it was last revised. Continued use of the Site after changes are posted constitutes acceptance of the revised policy.
            </p>
          </section>

        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[var(--border-primary)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-sm text-[var(--text-secondary)] font-mono">
            © {new Date().getFullYear()} INFAB Semiconductor Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Terms and Conditions
            </Link>
            <Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
