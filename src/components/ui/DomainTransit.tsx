'use client';

const AEROSPACE_STATS = ['-54°C to 135°C', 'AS9100 Rev D', 'MIL-STD-810'];
const HEALTHCARE_STATS = ['Biocompatible', 'Sterilizable', 'Low-Volume Microfluidics'];

export default function DomainTransit() {
  return (
    <div className="relative flex flex-col items-center w-full">
      <style>{`
        @keyframes infab-domain-slide {
          0%   { transform: translateX(0%); }
          32%  { transform: translateX(0%); }
          42%  { transform: translateX(-50%); }
          78%  { transform: translateX(-50%); }
          88%  { transform: translateX(0%); }
          100% { transform: translateX(0%); }
        }
        @keyframes infab-radar-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes infab-blip-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes infab-tape-scroll {
          from { transform: translateY(0%); }
          to   { transform: translateY(-50%); }
        }
        @keyframes infab-ecg-scroll {
          from { transform: translateX(0%); }
          to   { transform: translateX(-50%); }
        }
        @keyframes infab-droplet-bounce {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.6; }
        }
        @keyframes infab-dot-a {
          0%, 32% { opacity: 1; width: 16px; }
          42%, 78% { opacity: 0.3; width: 6px; }
          88%, 100% { opacity: 1; width: 16px; }
        }
        @keyframes infab-dot-b {
          0%, 32% { opacity: 0.3; width: 6px; }
          42%, 78% { opacity: 1; width: 16px; }
          88%, 100% { opacity: 0.3; width: 6px; }
        }
        .infab-domain-track {
          animation: infab-domain-slide 11s ease-in-out infinite;
        }
        .infab-radar-sweep {
          animation: infab-radar-spin 4s linear infinite;
        }
        .infab-blip-1 { animation: infab-blip-pulse 2.2s ease-in-out infinite; }
        .infab-blip-2 { animation: infab-blip-pulse 2.2s ease-in-out infinite 0.7s; }
        .infab-blip-3 { animation: infab-blip-pulse 2.2s ease-in-out infinite 1.4s; }
        .infab-tape-inner {
          animation: infab-tape-scroll 3s linear infinite;
        }
        .infab-ecg-inner {
          animation: infab-ecg-scroll 2.4s linear infinite;
        }
        .infab-droplet {
          animation: infab-droplet-bounce 1.8s ease-in-out infinite;
        }
        .infab-dot-a { animation: infab-dot-a 11s ease-in-out infinite; }
        .infab-dot-b { animation: infab-dot-b 11s ease-in-out infinite; }
      `}</style>

      <div className="relative w-full p-5 select-none">
        <div className="relative aspect-[4/3] w-full rounded-2xl border border-[var(--border-primary)] overflow-hidden bg-[var(--bg-secondary)]">
          <div className="infab-domain-track flex h-full" style={{ width: '200%' }}>

            {/* ── Panel 1: Aerospace & Defence ── */}
            <div className="relative flex flex-col items-center justify-center gap-3 px-6 py-5 shrink-0" style={{ width: '50%' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 to-transparent" />

              {/* Altitude tape */}
              <div className="absolute left-3 top-3 bottom-3 w-6 overflow-hidden opacity-60">
                <div className="infab-tape-inner flex flex-col" style={{ height: '200%' }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="flex-1 flex items-center justify-center border-b border-[var(--accent-primary)]/25">
                      <span className="w-2 h-px bg-[var(--accent-primary)]/50" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-[var(--accent-primary)]/25" />
                <div className="absolute inset-3 rounded-full border border-[var(--accent-primary)]/20" />
                <div className="absolute inset-6 rounded-full border border-[var(--accent-primary)]/15" />
                <div
                  className="infab-radar-sweep absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, var(--accent-primary) 0deg, transparent 55deg, transparent 360deg)',
                    opacity: 0.35,
                  }}
                />
                <span className="infab-blip-1 absolute w-1 h-1 rounded-full bg-[var(--accent-warm)]" style={{ top: '22%', left: '68%' }} />
                <span className="infab-blip-2 absolute w-1 h-1 rounded-full bg-[var(--accent-warm)]" style={{ top: '65%', left: '30%' }} />
                <span className="infab-blip-3 absolute w-1 h-1 rounded-full bg-[var(--accent-warm)]" style={{ top: '38%', left: '45%' }} />

                {/* Jet silhouette */}
                <svg viewBox="0 0 64 64" className="relative w-10 h-10">
                  <path
                    d="M32 6 L36 26 L54 38 L54 42 L36 36 L34 50 L42 56 L42 59 L32 56 L22 59 L22 56 L30 50 L28 36 L10 42 L10 38 L28 26 Z"
                    fill="var(--accent-primary)"
                  />
                </svg>
              </div>

              <div className="text-center relative z-10">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)]">Aerospace &amp; Defence</h3>
                <p className="mt-1 text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wide">Pressure · Altitude · Mission-Critical</p>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 relative z-10">
                {AEROSPACE_STATS.map((s) => (
                  <span key={s} className="text-[9px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Panel 2: Healthcare & Life Sciences ── */}
            <div className="relative flex flex-col items-center justify-center gap-3 px-6 py-5 shrink-0" style={{ width: '50%' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-warm)]/5 to-transparent" />

              {/* DNA helix */}
              <svg viewBox="0 0 100 90" className="w-20 h-16">
                {Array.from({ length: 9 }).map((_, i) => {
                  const y = 6 + i * 9.5;
                  const phase = (i / 8) * Math.PI * 2;
                  const xLeft = 50 - Math.sin(phase) * 26;
                  const xRight = 50 + Math.sin(phase) * 26;
                  return (
                    <g key={i}>
                      <line x1={xLeft} y1={y} x2={xRight} y2={y} stroke="var(--accent-warm)" strokeWidth="1" opacity="0.35" />
                      <circle cx={xLeft} cy={y} r="2.4" fill="var(--accent-primary)" />
                      <circle cx={xRight} cy={y} r="2.4" fill="var(--accent-warm)" />
                    </g>
                  );
                })}
              </svg>

              {/* Droplet */}
              <svg viewBox="0 0 24 28" className="infab-droplet w-4 h-5 -mt-2">
                <path d="M12 1 C 12 1 3 13 3 19 A 9 9 0 0 0 21 19 C 21 13 12 1 12 1 Z" fill="var(--accent-primary)" />
              </svg>

              <div className="text-center relative z-10">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--accent-warm)]">Healthcare &amp; Life Sciences</h3>
                <p className="mt-1 text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wide">Microfluidics · Diagnostics · Biocompatible</p>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 relative z-10">
                {HEALTHCARE_STATS.map((s) => (
                  <span key={s} className="text-[9px] font-mono font-semibold uppercase tracking-wider text-[var(--accent-warm)] bg-[var(--accent-warm)]/10 border border-[var(--accent-warm)]/20 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>

              {/* ECG trace */}
              <div className="absolute bottom-3 left-3 right-3 h-6 overflow-hidden opacity-70">
                <div className="infab-ecg-inner flex" style={{ width: '200%' }}>
                  <svg viewBox="0 0 200 24" className="w-1/2 h-full" preserveAspectRatio="none">
                    <path d="M0 12 L30 12 L36 2 L42 22 L48 12 L60 12 L66 8 L72 12 L100 12" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" />
                  </svg>
                  <svg viewBox="0 0 200 24" className="w-1/2 h-full" preserveAspectRatio="none">
                    <path d="M0 12 L30 12 L36 2 L42 22 L48 12 L60 12 L66 8 L72 12 L100 12" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-4">
          <span className="infab-dot-a h-1.5 rounded-full bg-[var(--accent-primary)]" />
          <span className="infab-dot-b h-1.5 rounded-full bg-[var(--accent-warm)]" />
        </div>
      </div>
    </div>
  );
}
