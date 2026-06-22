'use client';

import { useState } from 'react';
import { submitInquiry } from '@/app/actions/contact';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Package the form data
    const formData = new FormData(e.currentTarget);

    // Call our backend Server Action
    const result = await submitInquiry(formData);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset(); // Clear the form

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else {
      setSubmitStatus('error');
    }
  };

  const inputClasses = "bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors";

  return (
    <section className="py-24 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-tertiary)]" id="contact">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="inline-block font-mono text-sm font-semibold tracking-widest uppercase text-[var(--accent-primary)] mb-4">
            Connect With Engineering
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
            Let&apos;s build the future.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Reach out to discuss your MEMS or microfluidics requirements, custom fabrication needs, or partnership opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">

          {/* Form Area */}
          <div className="lg:col-span-3 bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-8 md:p-10 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">First Name *</label>
                  <input type="text" id="firstName" name="firstName" required className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Last Name *</label>
                  <input type="text" id="lastName" name="lastName" required className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Email Address *</label>
                  <input type="email" id="email" name="email" required className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="organization" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Organization</label>
                  <input type="text" id="organization" name="organization" className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Area of Interest *</label>
                <select id="interest" name="interest" required defaultValue="" className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors appearance-none">
                  <option value="" disabled>Select a product or service category</option>
                  <option value="aerospace">Aerospace — Pressure Sensors</option>
                  <option value="healthcare">Healthcare — Microfluidic Chips</option>
                  <option value="mems">MEMS Fabrication Services</option>
                  <option value="other">Partnership / General Enquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Message *</label>
                <textarea id="message" name="message" rows={5} required className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-[var(--bg-tertiary)] transition-colors resize-none"></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[var(--accent-primary)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:brightness-110 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Transmitting...' : 'Submit Inquiry'}
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-sm text-center font-medium">
                  Thank you! Your message has been received securely.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 rounded-lg text-sm text-center font-medium">
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-8 rounded-2xl shadow-xl">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-primary)] pb-4">R&D Facility</h4>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                InCeNSE – Incubator @ CeNSE<br />
                Centre for Nano Science and Engineering<br />
                Indian Institute of Science<br />
                Bengaluru, Karnataka 560012
              </p>
              <a href="tel:918023607755" className="flex items-center gap-3 text-[var(--accent-primary)] text-sm font-medium hover:brightness-110 transition-colors">
                <i className="ph ph-phone text-lg"></i> +91 80 2360 7755
              </a>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-8 rounded-2xl shadow-xl">
              <h4 className="text-xl font-bold text-[var(--text-primary)] mb-6 border-b border-[var(--border-primary)] pb-4">Corporate Office</h4>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                1341, Venkateshwara Nagar main road,<br />
                MCECHS layout, Dr. Shivaram Karanth Nagar,<br />
                Jakkur, Bengaluru 560077
              </p>
              <div className="flex flex-col gap-3">
                <a href="tel:918045039946" className="flex items-center gap-3 text-[var(--accent-primary)] text-sm font-medium hover:brightness-110 transition-colors">
                  <i className="ph ph-phone text-lg"></i> +91 80 4503 9946
                </a>
                <a href="mailto:info@infab-tech.com" className="flex items-center gap-3 text-[var(--accent-primary)] text-sm font-medium hover:brightness-110 transition-colors">
                  <i className="ph ph-envelope text-lg"></i> info@infab-tech.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Maps Section */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* R&D Facility Map */}
          <div className="w-full rounded-2xl overflow-hidden border border-[var(--border-primary)] shadow-xl bg-[var(--bg-secondary)] p-2 flex flex-col">
            <div className="px-4 pt-3 pb-4">
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">R&D Facility</h4>
              <p className="text-xs text-[var(--text-secondary)]">InCeNSE, IISc Bengaluru</p>
            </div>
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=InCeNSE%20IISc%20Bengaluru&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="R&D Facility Location"
                className="opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>

          {/* Corporate Office Map */}
          <div className="w-full rounded-2xl overflow-hidden border border-[var(--border-primary)] shadow-xl bg-[var(--bg-secondary)] p-2 flex flex-col">
            <div className="px-4 pt-3 pb-4">
              <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">Corporate Office</h4>
              <p className="text-xs text-[var(--text-secondary)]">Jakkur, Bengaluru</p>
            </div>
            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=1341%20Venkateshwara%20Nagar%20main%20road%20MCECHS%20layout%20Dr%20Shivaram%20Karanth%20Nagar%20Jakkur%20Bengaluru%20560077&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Corporate Office Location"
                className="opacity-90 hover:opacity-100 transition-opacity"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
