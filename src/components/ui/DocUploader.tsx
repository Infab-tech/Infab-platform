'use client';

import { useState, useRef } from 'react';

interface DocUploaderProps {
  label: string;
  existingUrl?: string | null;
  onChange: (url: string | null) => void;
  accept?: string;
}

export default function DocUploader({
  label,
  existingUrl = null,
  onChange,
  accept = '.pdf,application/pdf',
}: DocUploaderProps) {
  const [url, setUrl] = useState<string | null>(existingUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('bucket', 'product-docs');

    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const json = await res.json();

    if (!res.ok || json.error) {
      setError(json.error ?? 'Upload failed.');
      setUploading(false);
      return;
    }

    setUrl(json.url);
    onChange(json.url);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = () => {
    setUrl(null);
    onChange(null);
  };

  const filename = url ? decodeURIComponent(url.split('/').pop()?.split('?')[0] ?? url) : null;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[10px] font-semibold uppercase text-[var(--text-secondary)]">{label}</span>

      {url ? (
        <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/5">
          <i className="ph ph-file-pdf text-xl text-[var(--accent-primary)] flex-shrink-0"></i>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--accent-primary)] hover:underline truncate flex-1"
          >
            {filename}
          </a>
          <button
            type="button"
            onClick={remove}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/10 transition-colors"
            title="Remove"
          >
            <i className="ph ph-x text-xs"></i>
          </button>
        </div>
      ) : (
        <label
          className={`flex items-center gap-3 p-3 rounded-lg border-2 border-dashed cursor-pointer transition-colors
            ${uploading
              ? 'opacity-50 pointer-events-none border-[var(--text-primary)]/20'
              : 'border-[var(--text-primary)]/20 hover:border-[var(--accent-primary)]/50 hover:bg-[var(--accent-primary)]/5'
            }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <i className={`ph text-xl text-[var(--accent-primary)] ${uploading ? 'ph-spinner-gap animate-spin' : 'ph-upload-simple'}`}></i>
          <span className="text-xs text-[var(--text-secondary)]">
            {uploading ? 'Uploading…' : `Upload ${label} (PDF)`}
          </span>
        </label>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  );
}
