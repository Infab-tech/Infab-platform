'use client';

import { useState, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface TeamPhotoUploaderProps {
  existingUrl?: string | null;
  onChange: (url: string | null) => void;
  memberName?: string;
}

const BUCKET = 'team-photos';

function getInitials(name: string) {
  return (name || '?')
    .replace(/^(Dr\.|Mr\.|Ms\.|Prof\.)\s+/, '')
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function TeamPhotoUploader({ existingUrl, onChange, memberName = '' }: TeamPhotoUploaderProps) {
  const [url, setUrl] = useState<string | null>(existingUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    setUploading(true);
    setError(null);

    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: false });

    if (uploadError) {
      setError(`Upload failed: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    setUrl(data.publicUrl);
    onChange(data.publicUrl);
    setUploading(false);

    if (inputRef.current) inputRef.current.value = '';
  }, [supabase, onChange]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const remove = () => {
    setUrl(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {url ? (
        /* ── Preview ── */
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Team member photo"
              className="w-24 h-24 rounded-full object-cover object-top border-2 border-[var(--accent-primary)]/30"
            />
            <button
              type="button"
              onClick={remove}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-400 transition-colors"
              title="Remove photo"
            >
              <i className="ph ph-x text-xs"></i>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Photo uploaded</p>
            <label className={`inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border border-[var(--text-primary)]/20 text-sm text-[var(--text-secondary)] hover:bg-[var(--text-primary)]/5 transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
                disabled={uploading}
              />
              <i className="ph ph-arrow-counter-clockwise text-sm"></i>
              {uploading ? 'Uploading…' : 'Replace photo'}
            </label>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all
            ${uploading ? 'opacity-50 pointer-events-none border-[var(--text-primary)]/20' : ''}
            ${dragging ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 scale-[1.01]' : 'border-[var(--text-primary)]/20 hover:border-[var(--accent-primary)]/60 hover:bg-[var(--accent-primary)]/5'}
          `}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
            disabled={uploading}
          />

          {/* Avatar placeholder */}
          <div className="w-20 h-20 rounded-full bg-[var(--accent-primary)]/10 border-2 border-dashed border-[var(--accent-primary)]/30 flex items-center justify-center text-2xl font-bold text-[var(--accent-primary)]/50">
            {memberName ? getInitials(memberName) : <i className="ph ph-user text-3xl"></i>}
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {uploading ? (
                <span className="flex items-center gap-2 justify-center">
                  <i className="ph ph-spinner-gap animate-spin"></i> Uploading…
                </span>
              ) : (
                <>
                  {dragging ? 'Drop to upload' : 'Drag & drop or click to upload'}
                </>
              )}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">JPG, PNG, WEBP — portrait photos work best</p>
          </div>
        </label>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>
      )}
    </div>
  );
}
