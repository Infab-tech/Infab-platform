'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  urls: string[];
  name: string;
  height?: string;
}

export default function ProductImageCarousel({ urls, name, height = 'h-48' }: Props) {
  const [idx, setIdx] = useState(0);

  if (urls.length === 0) {
    return (
      <div className={`w-full ${height} bg-[var(--bg-primary)] border-b border-[var(--border-primary)] flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 to-transparent" />
        <i className="ph ph-microchip text-5xl text-[var(--text-secondary)]/10" />
      </div>
    );
  }

  const prev = () => setIdx((i) => (i - 1 + urls.length) % urls.length);
  const next = () => setIdx((i) => (i + 1) % urls.length);

  return (
    <div className={`relative w-full ${height} bg-white dark:bg-[var(--bg-tertiary)] border-b border-[var(--border-primary)] overflow-hidden`}>
      <Image
        src={urls[idx]}
        alt={`${name} — image ${idx + 1} of ${urls.length}`}
        fill
        className="object-contain p-2"
        sizes="(max-width: 768px) 100vw, 320px"
      />

      {urls.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-colors z-10"
          >
            <i className="ph ph-caret-left text-sm" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 flex items-center justify-center text-white transition-colors z-10"
          >
            <i className="ph ph-caret-right text-sm" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
            {urls.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === idx
                    ? 'bg-[var(--accent-primary)] scale-125'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-mono z-10">
            {idx + 1}/{urls.length}
          </div>
        </>
      )}
    </div>
  );
}
