'use client';

import { useState, useRef } from 'react';
import { submitJobApplication } from '@/app/actions/careers';

export default function ApplyForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const result = await submitJobApplication(fd);
    if (result && !result.success) {
      setError(result.message);
      setSubmitting(false);
    }
    // Success → server action redirects to /careers/apply/success
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="hidden" name="jobId" value={jobId} />

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Full Name *</label>
          <input
            name="name" type="text" required autoComplete="name"
            placeholder="Jane Smith"
            className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/15 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Email Address *</label>
          <input
            name="email" type="email" required autoComplete="email"
            placeholder="jane@example.com"
            className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/15 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
          Phone <span className="normal-case font-normal">(optional)</span>
        </label>
        <input
          name="phone" type="tel" autoComplete="tel"
          placeholder="+91 98765 43210"
          className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/15 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
        />
      </div>

      {/* Cover Letter */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">
          Cover Letter <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          name="coverLetter" rows={5}
          placeholder={`Tell us why you're excited about this role and what makes you a great fit for ${jobTitle}…`}
          className="bg-[var(--text-primary)]/[0.03] border border-[var(--text-primary)]/15 rounded-lg px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-y"
        />
      </div>

      {/* Resume Upload */}
      <div className="flex flex-col gap-2">
        <label className="font-mono text-xs font-semibold uppercase text-[var(--text-secondary)]">Resume / CV *</label>
        <input ref={fileRef} name="resume" type="file" accept=".pdf,.doc,.docx" required className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 border-dashed text-sm text-left transition-colors
            ${fileName
              ? 'border-[var(--accent-primary)]/50 bg-[var(--accent-primary)]/5 text-[var(--accent-primary)]'
              : 'border-[var(--text-primary)]/15 hover:border-[var(--accent-primary)]/40 hover:bg-[var(--accent-primary)]/5 text-[var(--text-secondary)]'
            }`}
        >
          <i className={`ph text-xl ${fileName ? 'ph-file-pdf text-[var(--accent-primary)]' : 'ph-upload-simple'}`}></i>
          <span>{fileName ?? 'Click to upload PDF, DOC, or DOCX (max 5 MB)'}</span>
          {fileName && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setFileName(null); if (fileRef.current) fileRef.current.value = ''; }}
              className="ml-auto flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10"
            >
              <i className="ph ph-x text-xs"></i>
            </button>
          )}
        </button>
        <p className="text-xs text-[var(--text-secondary)]">Accepted formats: PDF, DOC, DOCX. Maximum size: 5 MB.</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400 font-medium flex items-center gap-3">
          <i className="ph ph-warning-circle text-lg flex-shrink-0"></i>
          {error}
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-xs text-[var(--text-secondary)]">
          Your details are kept confidential and only shared with the INFAB hiring team.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="flex-shrink-0 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent-primary)] px-8 text-sm font-bold uppercase tracking-wider text-[var(--bg-primary)] transition-all hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? (
            <><i className="ph ph-spinner-gap animate-spin"></i> Submitting…</>
          ) : (
            <><i className="ph ph-paper-plane-tilt"></i> Submit Application</>
          )}
        </button>
      </div>
    </form>
  );
}
