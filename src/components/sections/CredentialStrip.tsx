const credentials = [
  { icon: 'ph-seal-check', label: 'ISO 9001:2015' },
  { icon: 'ph-shield-check', label: 'AS 9100D' },
  { icon: 'ph-buildings', label: 'INCeNSE Incubated' },
  { icon: 'ph-flask', label: 'BIRAC Supported' },
  { icon: 'ph-flag', label: 'Made in India' },
  { icon: 'ph-cpu', label: '3 Market Verticals' },
];

export default function CredentialStrip() {
  return (
    <div
      className="overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #060e1f, #05091a)',
        borderBottom: '1px solid rgba(0,180,255,0.12)',
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 md:justify-between">
          {credentials.map((item) => (
            <div key={item.label} className="flex items-center gap-2 group">
              <i
                className={`ph ${item.icon} text-base`}
                style={{ color: '#00d4ff' }}
              />
              <span
                className="font-mono text-[11px] font-semibold uppercase tracking-widest transition-colors group-hover:text-white"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
