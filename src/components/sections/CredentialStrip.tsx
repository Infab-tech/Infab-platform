const credentials = [
  { icon: 'ph-seal-check', label: 'ISO 9001:2015' },
  { icon: 'ph-shield-check', label: 'AS 9100D' },
  { icon: 'ph-buildings', label: 'InCeNSE Incubated' },
  { icon: 'ph-flask', label: 'BIRAC Supported' },
  { icon: 'ph-flag', label: 'Made in India' },
  { icon: 'ph-cpu', label: '3 Market Verticals' },
];

export default function CredentialStrip() {
  return (
    <div className="bg-[var(--bg-secondary)] border-y border-[var(--border-primary)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-3.5">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:justify-between">
          {credentials.map((item) => (
            <div key={item.label} className="flex items-center gap-2 group">
              <i
                className={`ph ${item.icon} text-base text-[var(--accent-primary)] transition-transform group-hover:scale-110`}
              ></i>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
