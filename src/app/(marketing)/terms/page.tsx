import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms and Conditions | INFAB Semiconductor',
  description: 'Terms and Conditions governing access to and use of the INFAB Semiconductor website, including product inquiries, RFQs, and custom fabrication services.',
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">

      {/* Hero */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] pt-40 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4 leading-tight">
            Terms and Conditions
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
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the website located at{' '}
            <span className="text-[var(--accent-primary)] font-mono">https://infabsemi.com</span>{' '}
            (the &ldquo;Site&rdquo;), operated by INFAB Semiconductor Pvt. Ltd. (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Site, including submitting an inquiry or request for quote (&ldquo;RFQ&rdquo;), you agree to be bound by these Terms. If you do not agree, please do not use the Site.
          </p>
        </div>

        <div className="space-y-12">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">1. About This Site</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                This Site provides information about Company&apos;s products and services, including but not limited to pressure switches, transducers, and microfluidic devices/components, as well as custom fabrication and design services (&ldquo;Fab &amp; Design Services&rdquo;). The Site serves two categories of customers:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Business Customers (B2B):</strong>{' '}
                    Businesses, procurement professionals, engineers, and other authorized representatives seeking product information or submitting inquiries/requests for quote (&ldquo;RFQ&rdquo;) on behalf of an organization.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">Individual Customers (B2C):</strong>{' '}
                    Individual consumers seeking custom fabrication and/or design services for personal, non-commercial purposes.
                  </span>
                </li>
              </ul>
              <p>
                The Site does not support direct online purchase or checkout for standard products; all standard product transactions are subject to separate negotiated agreements, purchase orders, and/or quotations between Company and the customer. Custom Fab &amp; Design Services may be quoted and engaged through the Site&apos;s inquiry process, with final terms confirmed via a separate order confirmation, statement of work, or service agreement. Where these Terms refer to &ldquo;customer,&rdquo; &ldquo;you,&rdquo; or &ldquo;your,&rdquo; the applicable provisions apply to both B2B and B2C customers unless otherwise specified.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">2. Eligibility</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              By using this Site, you represent that:
            </p>
            <ul className="space-y-3 ml-4 text-[var(--text-secondary)]">
              {[
                'You are at least 18 years of age;',
                'You are authorized to act on behalf of the business or organization you represent (if applicable); and',
                'Your use of the Site complies with all applicable laws and regulations.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">3. Inquiries and Requests for Quote (RFQ)</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <ul className="space-y-4 ml-4 text-[var(--text-secondary)] leading-relaxed">
              {[
                'Submission of an inquiry, RFQ, or contact form through the Site does not constitute a binding offer, purchase order, or contract.',
                "All quotations provided by Company are valid only for the period stated in the quotation and are subject to Company's standard terms of sale, which will be provided separately upon request or as part of any formal quotation or purchase agreement.",
                'Company reserves the right to accept or decline any inquiry or RFQ at its sole discretion.',
                'Information submitted through inquiry/RFQ forms (e.g., company name, contact details, technical requirements) will be used solely to respond to your request and for related business communications, in accordance with our Privacy Policy.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">4. Custom Fabrication and Design Services (B2C)</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <ul className="space-y-4 ml-4 text-[var(--text-secondary)] leading-relaxed">
              {[
                'Company may offer custom fabrication and/or design services to individual customers for personal, non-commercial use ("Fab & Design Services").',
                "Submission of a request for Fab & Design Services through the Site is an inquiry only and does not constitute a binding order. A binding service agreement is formed only upon Company's written acceptance of the order (e.g., an order confirmation, invoice, or signed quote) and, where applicable, receipt of any required deposit or payment.",
                'Pricing, lead times, design revisions, materials, and deliverables for Fab & Design Services will be specified in the applicable quote or order confirmation. Custom or made-to-order items may not be eligible for return or refund once production has begun, except as required by applicable consumer protection law.',
                'Customers are responsible for providing accurate specifications, files, and requirements for any custom design or fabrication request. Company is not liable for delays, defects, or unsuitability of the final product arising from inaccurate, incomplete, or late information provided by the customer.',
                'Nothing in these Terms limits any statutory rights you may have as a consumer under applicable law (including rights relating to goods being of satisfactory quality, fit for purpose, and as described). Where any provision of these Terms conflicts with a mandatory consumer protection law applicable to you, that law will take precedence to the extent required.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">5. Product Information</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <ul className="space-y-4 ml-4 text-[var(--text-secondary)] leading-relaxed">
              {[
                'Product descriptions, specifications, images, and other content on the Site are provided for general informational purposes only and are subject to change without notice.',
                'Company makes reasonable efforts to ensure accuracy but does not warrant that product descriptions, specifications, pricing (if listed), or other content are complete, current, or error-free.',
                'Certain products, including those described for aerospace, airborne, or other specialized/regulated applications, may be subject to additional certification, qualification, export control, or regulatory requirements. Display of a product in connection with a particular application (e.g., aerospace) does not constitute a representation or warranty of suitability, certification, or compliance for that specific use. Customers are responsible for independently verifying that any product meets the applicable technical, regulatory, and certification requirements for their intended application.',
                'Nothing on this Site constitutes engineering, technical, or professional advice. Customers must independently verify product suitability for their specific application prior to purchase or use.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">6. Intellectual Property</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <ul className="space-y-4 ml-4 text-[var(--text-secondary)] leading-relaxed">
              {[
                'All content on the Site, including text, graphics, logos, images, product designs, and other materials, is the property of Company or its licensors and is protected by applicable intellectual property laws.',
                "You may not reproduce, distribute, modify, or create derivative works from any content on the Site without Company's prior written consent, except for personal, non-commercial reference in connection with a legitimate business inquiry.",
                'All trademarks, trade names, and logos displayed on the Site are the property of their respective owners.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">7. Export Control and Regulatory Compliance</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <ul className="space-y-4 ml-4 text-[var(--text-secondary)] leading-relaxed">
              {[
                'Certain products described on this Site may be subject to export control laws and regulations, including but not limited to those of India, and any other jurisdiction applicable to a specific export transaction (e.g., U.S. EAR/ITAR where applicable to components or technology of U.S. origin). Customers are responsible for ensuring compliance with all applicable export control, sanctions, and import/export laws in connection with any purchase, use, or resale of Company\'s products.',
                'Nothing on this Site shall be construed as authorization to export, re-export, or transfer any product or technical data in violation of applicable law.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[var(--accent-primary)] mt-1 flex-shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 8 — Disclaimer (highlighted box) */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">8. Disclaimer of Warranties</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 text-[var(--text-secondary)] leading-relaxed text-sm">
              <p className="mb-4">
                THE SITE AND ALL CONTENT ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY OF CONTENT. COMPANY DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
              </p>
              <p>
                Any warranties applicable to products purchased from Company will be set forth exclusively in Company&apos;s standard terms of sale or a separately executed agreement, and not in these Terms.
              </p>
            </div>
          </section>

          {/* Section 9 — Limitation (highlighted box) */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">9. Limitation of Liability</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 text-[var(--text-secondary)] leading-relaxed text-sm">
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE, EVEN IF COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </div>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">10. Third-Party Links</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The Site may contain links to third-party websites. Company does not control and is not responsible for the content, accuracy, or practices of any third-party site, and inclusion of any link does not imply endorsement.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">11. Privacy</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Your use of the Site is also governed by our{' '}
              <Link href="/privacy" className="text-[var(--accent-primary)] hover:underline">
                Privacy Policy
              </Link>
              , which describes how we collect, use, and protect information submitted through the Site. By using the Site, you consent to the practices described therein.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">12. Modifications to Terms</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Company reserves the right to modify these Terms at any time. Changes will be effective upon posting to the Site with an updated &ldquo;Last Updated&rdquo; date. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 13 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">13. Governing Law and Jurisdiction</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Any disputes arising out of or relating to these Terms or your use of the Site shall be subject to the exclusive jurisdiction of the courts located in Bengaluru, Karnataka, India.
            </p>
          </section>

          {/* Section 14 */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">14. Severability</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* Section 15 — Contact card */}
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">15. Contact Information</h2>
            <div className="w-8 h-0.5 bg-[var(--accent-primary)] mb-5" />
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              For questions regarding these Terms, please contact:
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

        </div>

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-[var(--border-primary)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <p className="text-sm text-[var(--text-secondary)] font-mono">
            © {new Date().getFullYear()} INFAB Semiconductor Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
              Privacy Policy
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
