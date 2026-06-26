'use client';

import { useState, useRef, useCallback } from 'react';

interface SingleImageUploaderProps {
  name?: string; // name for hidden input
  existingUrl?: string | null;
  onChange?: (url: string | null) => void;
  bucket?: string;
  label?: string;
}

export default function SingleImageUploader({
  name,
  existingUrl,
  onChange,
  bucket = 'images',
  label = 'Click or drag to upload image'
}: SingleImageUploaderProps) {
  const [url, setUrl] = useState<string | null>(existingUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    setUploading(true);
    setError(null);

    const fd = new FormData();
    fd.append('file', file);
    fd.append('bucket', bucket);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();

      if (!res.ok || json.error) {
        setError(json.error ?? 'Upload failed.');
        setUploading(false);
        return;
      }

      setUrl(json.url);
      if (onChange) onChange(json.url);
    } catch (err) {
      setError('Upload failed.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [onChange, bucket]);

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
    if (onChange) onChange(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {name && <input type="hidden" name={name} value={url || ''} />}
      
      {url ? (
        <div className="flex items-start gap-4">
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-[var(--border-primary)] flex-shrink-0 bg-[var(--bg-secondary)] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                type="button"
                onClick={remove}
                className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                title="Remove image"
              >
                <i className="ph ph-trash text-sm"></i>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-[var(--text-primary)]">Image uploaded</p>
            <label className={`inline-flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border border-[var(--border-primary)] text-xs font-semibold hover:bg-[var(--bg-secondary)] transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileInput}
                disabled={uploading}
              />
              <i className="ph ph-arrows-clockwise"></i>
              {uploading ? 'Uploading…' : 'Replace image'}
            </label>
          </div>
        </div>
      ) : (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-colors
            ${uploading ? 'opacity-50 pointer-events-none border-[var(--border-primary)]' : ''}
            ${dragging ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5 scale-[1.01]' : 'border-[var(--text-primary)]/20 hover:border-[var(--accent-primary)]/50 hover:bg-[var(--accent-primary)]/5'}
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
          <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)]">
            {uploading ? <i className="ph ph-spinner-gap animate-spin text-xl"></i> : <i className="ph ph-upload-simple text-xl"></i>}
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {uploading ? 'Uploading…' : (dragging ? 'Drop image here' : label)}
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">JPG, PNG, WEBP</p>
          </div>
        </label>
      )}

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
      )}
    </div>
  );
}
