'use client';

import { useEffect, useState } from 'react';

interface SensorColors {
  subBg: string;
  subBorder: string;
  cavityStroke: string;
  cavityFill: string;
  diaphBg: string;
  diaphBorder: string;
  trace: string;
  piezo: string;
  piezoActive: string;
  pad: string;
  label: string;
  legendText: string;
  hintDot: string;
  hintText: string;
}

function getDarkColors(): SensorColors {
  return {
    subBg: 'linear-gradient(150deg,#1e2433,#0a0d14)',
    subBorder: 'rgba(255,255,255,0.15)',
    cavityStroke: 'rgba(255,255,255,0.1)',
    cavityFill: 'rgba(0,0,0,0.4)',
    diaphBg: 'rgba(40,50,70,0.85)',
    diaphBorder: 'rgba(100,120,160,0.4)',
    trace: 'rgba(255,255,255,0.3)',
    piezo: '#ff6b35',
    piezoActive: '#ff8c60',
    pad: 'rgba(255,255,255,0.2)',
    label: 'rgba(255,255,255,0.4)',
    legendText: 'rgba(255,255,255,0.5)',
    hintDot: '#ff6b35',
    hintText: 'rgba(255,255,255,0.4)'
  };
}

function getLightColors(): SensorColors {
  return {
    subBg: 'linear-gradient(150deg,#e2e8f0,#cbd5e1)',
    subBorder: 'rgba(71,85,105,0.2)',
    cavityStroke: 'rgba(71,85,105,0.2)',
    cavityFill: 'rgba(0,0,0,0.05)',
    diaphBg: 'rgba(220,225,235,0.9)',
    diaphBorder: 'rgba(71,85,105,0.3)',
    trace: 'rgba(0,87,168,0.5)',
    piezo: '#ff6b35',
    piezoActive: '#ff4500',
    pad: 'rgba(0,87,168,0.2)',
    label: 'rgba(0,87,168,0.6)',
    legendText: 'rgba(71,85,105,0.8)',
    hintDot: '#0057A8',
    hintText: 'rgba(71,85,105,0.6)'
  };
}

const LAYER_W = 280;
const LAYER_H = 220;

const layerBase: React.CSSProperties = {
  position: 'absolute',
  width: LAYER_W,
  height: LAYER_H,
  borderRadius: 4,
  backfaceVisibility: 'hidden',
};

export default function MemsSensor3D() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const c = isDark ? getDarkColors() : getLightColors();

  const legendItems = [
    { bg: c.trace, border: 'transparent', label: 'Al Traces' },
    { bg: c.piezo, border: 'transparent', label: 'Piezo Resistors' },
    { bg: c.diaphBg, border: c.diaphBorder, label: 'Si Diaphragm' },
    { bg: isDark ? '#1a1e2e' : '#cbd5e1', border: c.subBorder, label: 'Si Substrate' },
  ];

  return (
    <div className="relative flex flex-col items-center w-full">
      <style>{`
        @keyframes infab-mems-tilt {
          0%   { transform: rotateX(25deg) rotateY(-25deg); }
          100% { transform: rotateX(25deg) rotateY(25deg); }
        }
        @keyframes infab-deflect {
          0%, 10% { transform: translateZ(20px) scale(1); }
          40%, 60% { transform: translateZ(5px) scale(0.98); }
          90%, 100% { transform: translateZ(20px) scale(1); }
        }
        @keyframes infab-piezo-glow {
          0%, 10% { filter: drop-shadow(0px 0px 0px ${c.piezoActive}); fill: ${c.piezo}; }
          40%, 60% { filter: drop-shadow(0px 0px 4px ${c.piezoActive}); fill: ${c.piezoActive}; }
          90%, 100% { filter: drop-shadow(0px 0px 0px ${c.piezoActive}); fill: ${c.piezo}; }
        }
        @keyframes infab-flow {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        .infab-mems-group {
          width: ${LAYER_W}px;
          height: ${LAYER_H}px;
          position: relative;
          transform-style: preserve-3d;
          animation: infab-mems-tilt 8s ease-in-out infinite alternate;
        }
        .infab-diaphragm {
          transform-style: preserve-3d;
          animation: infab-deflect 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative w-full p-5 select-none overflow-hidden transition-colors duration-300">
        
        {/* 3D scene */}
        <div className="relative z-10 flex justify-center items-center">
          <div style={{ perspective: '800px', perspectiveOrigin: '50% 30%', flexShrink: 0, padding: '40px 20px 40px' }}>
            <div className="infab-mems-group">

              {/* ── 1. BOTTOM LAYER: Si Substrate with Cavity ── */}
              <div style={{
                ...layerBase,
                background: c.subBg,
                border: `1px solid ${c.subBorder}`,
                transform: 'translateZ(0px)',
                boxShadow: isDark ? 'inset 0 0 20px rgba(0,0,0,0.5)' : 'inset 0 0 20px rgba(0,0,0,0.05)',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  {/* Etched Cavity in the center */}
                  <rect x="70" y="40" width="140" height="140" fill={c.cavityFill} stroke={c.cavityStroke} strokeWidth="1" />
                  <path d="M 70 40 L 90 60 L 190 60 L 210 40 M 210 180 L 190 160 L 190 60 M 70 180 L 90 160 L 90 60 M 70 180 L 90 160 L 190 160 L 210 180" stroke={c.cavityStroke} strokeWidth="1" fill="none" />
                  
                  <text x="20" y="200" fontSize="8" fontFamily="monospace" fill={c.label} letterSpacing="1">BULK Si</text>
                </svg>
              </div>

              {/* ── 2. TOP LAYER: Diaphragm + Wheatstone Bridge ── */}
              {/* Animates down into the cavity */}
              <div className="infab-diaphragm" style={{
                ...layerBase,
                background: c.diaphBg,
                border: `1px solid ${c.diaphBorder}`,
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  {/* Diaphragm outline (visual aid) */}
                  <rect x="70" y="40" width="140" height="140" fill="none" stroke={c.diaphBorder} strokeWidth="1" strokeDasharray="4 2" />
                  
                  {/* Aluminum Traces */}
                  <g stroke={c.trace} strokeWidth="2" fill="none">
                    {/* V+ line */}
                    <line x1="30" y1="20" x2="140" y2="20" />
                    <line x1="140" y1="20" x2="140" y2="40" />
                    
                    {/* V- line */}
                    <line x1="30" y1="200" x2="140" y2="200" />
                    <line x1="140" y1="200" x2="140" y2="180" />
                    
                    {/* Out+ line */}
                    <line x1="250" y1="60" x2="220" y2="60" />
                    <line x1="220" y1="60" x2="220" y2="110" />
                    <line x1="220" y1="110" x2="200" y2="110" />

                    {/* Out- line */}
                    <line x1="250" y1="160" x2="220" y2="160" />
                    <line x1="220" y1="160" x2="220" y2="110" />
                    <line x1="220" y1="110" x2="80" y2="110" />
                  </g>

                  {/* Flow animation on traces */}
                  <g stroke={c.piezoActive} strokeWidth="2" fill="none" strokeDasharray="10 30" style={{ animation: 'infab-flow 2s linear infinite' }}>
                    <path d="M 30 20 L 140 20 L 140 40" />
                    <path d="M 30 200 L 140 200 L 140 180" />
                  </g>

                  {/* Piezo Resistors (Wheatstone Bridge on edges of diaphragm) */}
                  <g style={{ animation: 'infab-piezo-glow 4s ease-in-out infinite' }}>
                    {/* Top resistor */}
                    <rect x="135" y="35" width="10" height="20" rx="2" />
                    {/* Bottom resistor */}
                    <rect x="135" y="165" width="10" height="20" rx="2" />
                    {/* Left resistor */}
                    <rect x="65" y="105" width="20" height="10" rx="2" />
                    {/* Right resistor */}
                    <rect x="195" y="105" width="20" height="10" rx="2" />
                  </g>

                  {/* Contact Pads */}
                  <g fill={c.pad} stroke={c.trace} strokeWidth="1">
                    <rect x="20" y="10" width="20" height="20" />
                    <text x="30" y="23" fontSize="8" fill={c.label} textAnchor="middle">V+</text>
                    
                    <rect x="20" y="190" width="20" height="20" />
                    <text x="30" y="203" fontSize="8" fill={c.label} textAnchor="middle">V-</text>
                    
                    <rect x="240" y="50" width="20" height="20" />
                    <text x="250" y="63" fontSize="8" fill={c.label} textAnchor="middle">O+</text>
                    
                    <rect x="240" y="150" width="20" height="20" />
                    <text x="250" y="163" fontSize="8" fill={c.label} textAnchor="middle">O-</text>
                  </g>
                  
                  <text x="140" y="125" fontSize="8" fontFamily="monospace" fill={c.label} textAnchor="middle" letterSpacing="1">DEFLECTING MEMBRANE</text>
                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-4 mb-2">
          <span style={{ fontFamily: 'monospace', fontSize: 8.5, letterSpacing: '2px', textTransform: 'uppercase', color: c.hintText }}>
            MEMS Pressure Sensor  ·  Simulated Deflection
          </span>
        </div>

        {/* Layer legend */}
        <div className="relative z-10 flex justify-center gap-5 flex-wrap mt-2">
          {legendItems.map(item => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div style={{ width: 9, height: 9, borderRadius: 2, background: item.bg, border: `1px solid ${item.border}`, flexShrink: 0 }} />
              <span style={{ fontFamily: 'monospace', fontSize: 8.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: c.legendText }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
