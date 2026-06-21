'use client';

import { useState, useRef } from 'react';

interface ImageUploaderProps {
  existingUrls?: string[];
  onChange: (urls: string[]) => void;
  bucket?: string;
}

export default function ImageUploader({ existingUrls = [], onChange, bucket = 'product-images' }: ImageUploaderProps) {
  const [urls, setUrls] = useState<string[]>(existingUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    setError(null);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue;

      const fd = new FormData();
      fd.append('file', file);
      fd.append('bucket', bucket);

      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error ?? 'Upload failed.');
        continue;
      }

      newUrls.push(json.url);
    }

    const updated = [...urls, ...newUrls];
    setUrls(updated);
    onChange(updated);
    setUploading(false);

    if (inputRef.current) inputRef.current.value = '';
  };

  const remove = (index: number) => {
    const updated = urls.filter((_, i) => i !== index);
    setUrls(updated);
    onChange(updated);
  };

  const moveLeft = (index: number) => {
    if (index === 0) return;
    const updated = [...urls];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setUrls(updated);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Drop zone / file picker */}
      <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors
        ${uploading ? 'opacity-50 pointer-events-none' : 'border-[var(--text-primary)]/20 hover:border-[var(--accent-primary)]/60 hover:bg-[var(--accent-primary)]/5'}`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={uploading}
        />
        <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 flex items-center justify-center">
          {uploading
            ? <i className="ph ph-spinner-gap text-2xl text-[var(--accent-primary)] animate-spin"></i>
            : <i className="ph ph-image-square text-2xl text-[var(--accent-primary)]"></i>
          }
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {uploading ? 'Uploading…' : 'Click to upload images'}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            PNG, JPG, WEBP — single or multiple. First image becomes the thumbnail.
          </p>
        </div>
      </label>

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
      )}

      {/* Image previews */}
      {urls.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {urls.map((url, i) => (
            <div key={url} className="relative group rounded-lg overflow-hidden border border-[var(--border-primary)] aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Product image ${i + 1}`} className="w-full h-full object-cover" />

              {i === 0 && (
                <span className="absolute top-1 left-1 text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-[var(--accent-primary)] text-white rounded">
                  Cover
                </span>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => moveLeft(i)}
                    title="Move left (set as cover)"
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                  >
                    <i className="ph ph-arrow-left text-xs"></i>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  title="Remove"
                  className="w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white transition-colors"
                >
                  <i className="ph ph-trash text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
