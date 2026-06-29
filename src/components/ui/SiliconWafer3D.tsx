'use client';

import { useEffect, useState } from 'react';

interface WaferColors {
  waferBg: string;
  waferBorder: string;
  resistBg: string;
  resistBorder: string;
  patternFill: string;
  uvGlow: string;
  label: string;
  legendText: string;
  hintDot: string;
  hintText: string;
}

function getDarkColors(): WaferColors {
  return {
    waferBg: 'linear-gradient(150deg,#1e2433,#0a0d14)',
    waferBorder: 'rgba(255,255,255,0.2)',
    resistBg: 'rgba(255,107,53,0.35)', // Photoresist orange/amber
    resistBorder: 'rgba(255,107,53,0.5)',
    patternFill: 'rgba(255,107,53,0.7)',
    uvGlow: 'rgba(0,136,204,0.6)', // Deep tech blue UV light
    label: 'rgba(255,255,255,0.4)',
    legendText: 'rgba(255,255,255,0.5)',
    hintDot: '#0088cc',
    hintText: 'rgba(255,255,255,0.4)'
  };
}

function getLightColors(): WaferColors {
  return {
    waferBg: 'linear-gradient(150deg,#e2e8f0,#cbd5e1)',
    waferBorder: 'rgba(71,85,105,0.3)',
    resistBg: 'rgba(255,107,53,0.45)', // Photoresist orange/amber
    resistBorder: 'rgba(255,107,53,0.6)',
    patternFill: 'rgba(255,107,53,0.85)',
    uvGlow: 'rgba(0,87,168,0.7)', // Deep tech blue UV light
    label: 'rgba(0,87,168,0.6)',
    legendText: 'rgba(71,85,105,0.8)',
    hintDot: '#0057A8',
    hintText: 'rgba(71,85,105,0.6)'
  };
}

const LAYER_W = 280;
const LAYER_H = 280;

const layerBase: React.CSSProperties = {
  position: 'absolute',
  width: LAYER_W,
  height: LAYER_H,
  borderRadius: '50%',
  backfaceVisibility: 'hidden',
};

export default function SiliconWafer3D() {
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
    { bg: c.uvGlow, border: 'transparent', label: 'UV Exposure' },
    { bg: c.resistBg, border: c.resistBorder, label: 'Photoresist' },
    { bg: isDark ? '#1a1e2e' : '#cbd5e1', border: c.waferBorder, label: 'Si Wafer' },
  ];

  return (
    <div className="relative flex flex-col items-center w-full">
      <style>{`
        @keyframes infab-wafer-tilt {
          0%   { transform: rotateX(35deg) rotateZ(-15deg); }
          100% { transform: rotateX(35deg) rotateZ(15deg); }
        }
        @keyframes infab-uv-scan {
          0%, 10% { transform: translateY(-50px) translateZ(30px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          90%, 100% { transform: translateY(330px) translateZ(30px); opacity: 0; }
        }
        @keyframes infab-develop {
          0%, 30% { opacity: 0.1; }
          70%, 100% { opacity: 1; }
        }
        .infab-wafer-group {
          width: ${LAYER_W}px;
          height: ${LAYER_H}px;
          position: relative;
          transform-style: preserve-3d;
          animation: infab-wafer-tilt 12s ease-in-out infinite alternate;
        }
        .infab-uv-beam {
          position: absolute;
          width: 320px;
          height: 15px;
          left: -20px;
          background: ${c.uvGlow};
          filter: blur(8px);
          animation: infab-uv-scan 6s linear infinite;
        }
      `}</style>

      <div className="relative w-full p-5 select-none overflow-hidden transition-colors duration-300">
        
        {/* 3D scene */}
        <div className="relative z-10 flex justify-center items-center">
          <div style={{ perspective: '800px', perspectiveOrigin: '50% -20%', flexShrink: 0, padding: '40px 20px 40px' }}>
            <div className="infab-wafer-group">

              {/* ── 1. BOTTOM LAYER: Silicon Wafer ── */}
              <div style={{
                ...layerBase,
                background: c.waferBg,
                border: `1px solid ${c.waferBorder}`,
                transform: 'translateZ(0px)',
                boxShadow: isDark ? 'inset 0 0 40px rgba(0,0,0,0.6)' : 'inset 0 0 30px rgba(255,255,255,0.5)',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  {/* Flat edge of wafer (primary flat) */}
                  <path d="M 50 240 L 230 240" stroke={c.waferBorder} strokeWidth="2" fill="none" />
                  
                  {/* Etch grid background */}
                  <g stroke={c.label} strokeWidth="0.5" opacity="0.3">
                    <line x1="80" y1="40" x2="80" y2="240" />
                    <line x1="140" y1="20" x2="140" y2="260" />
                    <line x1="200" y1="40" x2="200" y2="240" />
                    <line x1="40" y1="80" x2="240" y2="80" />
                    <line x1="20" y1="140" x2="260" y2="140" />
                    <line x1="40" y1="200" x2="240" y2="200" />
                  </g>
                </svg>
              </div>

              {/* ── 2. MIDDLE LAYER: Photoresist with developing pattern ── */}
              <div style={{
                ...layerBase,
                background: c.resistBg,
                border: `1px solid ${c.resistBorder}`,
                transform: 'translateZ(8px)',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <g style={{ animation: 'infab-develop 6s infinite' }}>
                    {/* Simulated MEMS chip patterns repeating across the wafer */}
                    {[80, 140, 200].map(x => (
                      [80, 140, 200].map(y => (
                        <rect key={`${x}-${y}`} x={x - 15} y={y - 15} width="30" height="30" fill={c.patternFill} stroke="none" rx="2" />
                      ))
                    ))}
                  </g>
                </svg>
              </div>

              {/* ── 3. TOP LAYER: UV Laser Scan Beam ── */}
              <div className="infab-uv-beam" />
              <div className="infab-uv-beam" style={{ height: '3px', filter: 'blur(1px)', background: '#fff' }} />

            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-4 mb-2">
          <span style={{ fontFamily: 'monospace', fontSize: 8.5, letterSpacing: '2px', textTransform: 'uppercase', color: c.hintText }}>
            Wafer Process  ·  Photolithography
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
