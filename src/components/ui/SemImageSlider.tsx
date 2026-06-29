'use client';

import Image from 'next/image';

export default function SemImageSlider({ images }: { images: string[] }) {
  // Duplicate the array to create a seamless infinite loop
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full bg-[var(--bg-secondary)] border-y border-[var(--border-primary)] py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-10 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
          Fabrication Gallery
        </h3>
        <p className="text-[var(--text-secondary)]">
          Scanning Electron Microscope (SEM) imagery of our fabricated MEMS devices and microstructures.
        </p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* CSS for infinite marquee animation */}
        <style>{`
          @keyframes infab-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .infab-animate-marquee {
            display: flex;
            width: max-content;
            animation: infab-marquee 100s linear infinite;
          }
          .infab-animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="infab-animate-marquee">
          {duplicatedImages.map((img, idx) => (
            <div
              key={`${img}-${idx}`}
              className="relative flex-shrink-0 group mx-4 overflow-hidden rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] shadow-lg"
              // Set width so that roughly 3 fit in a standard 1200px container (approx 360px each + margins)
              style={{ width: 'min(85vw, 400px)', aspectRatio: '4/3' }}
            >
              <Image
                src={`/images/sem/${encodeURIComponent(img)}`}
                alt={img.replace('.jpeg', '')}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 85vw, 400px"
              />
              {/* Overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white font-mono text-sm tracking-wider uppercase">
                  {img.replace('.jpeg', '').replace(/[-_]/g, ' ')}
                </span>
                <span className="text-white/70 text-xs mt-1">SEM Capture</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
