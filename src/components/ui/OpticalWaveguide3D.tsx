'use client';

import { useEffect, useState } from 'react';

interface WaveguideColors {
  chipBg: string;
  chipBorder: string;
  waveguideStroke: string;
  laserPulse: string;
  laserCore: string;
  label: string;
  legendText: string;
  hintDot: string;
  hintText: string;
}

function getDarkColors(): WaveguideColors {
  return {
    chipBg: 'linear-gradient(150deg,#1e2433,#0a0d14)',
    chipBorder: 'rgba(255,255,255,0.15)',
    waveguideStroke: 'rgba(255,255,255,0.1)',
    laserPulse: 'rgba(0,180,255,0.6)', // Bright cyan/blue laser glow
    laserCore: '#ffffff', // White hot center of laser
    label: 'rgba(255,255,255,0.4)',
    legendText: 'rgba(255,255,255,0.5)',
    hintDot: '#00b4ff',
    hintText: 'rgba(255,255,255,0.4)'
  };
}

function getLightColors(): WaveguideColors {
  return {
    chipBg: 'linear-gradient(150deg,#e2e8f0,#cbd5e1)',
    chipBorder: 'rgba(71,85,105,0.2)',
    waveguideStroke: 'rgba(71,85,105,0.15)',
    laserPulse: 'rgba(0,87,168,0.7)', // Deep tech blue laser glow
    laserCore: '#ffffff', // White hot center of laser
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

// Define the SVG path for the waveguide circuit
// It branches out to symbolize broadcasting news to multiple endpoints
const circuitPath = "M 20 110 L 80 110 L 100 70 L 160 70 L 180 40 L 260 40 M 80 110 L 100 150 L 160 150 L 180 180 L 260 180 M 130 70 L 150 110 L 260 110";

export default function OpticalWaveguide3D() {
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
    { bg: c.laserPulse, border: 'transparent', label: 'Data Pulse (Optical)' },
    { bg: 'transparent', border: c.waveguideStroke, label: 'Photonic Waveguide' },
    { bg: isDark ? '#1a1e2e' : '#cbd5e1', border: c.chipBorder, label: 'Si Photonics Chip' },
  ];

  return (
    <div className="relative flex flex-col items-center w-full">
      <style>{`
        @keyframes infab-waveguide-tilt {
          0%   { transform: rotateX(45deg) rotateY(-20deg) rotateZ(5deg); }
          100% { transform: rotateX(45deg) rotateY(20deg) rotateZ(-5deg); }
        }
        @keyframes infab-laser-shoot {
          0% { stroke-dashoffset: 400; opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        .infab-waveguide-group {
          width: ${LAYER_W}px;
          height: ${LAYER_H}px;
          position: relative;
          transform-style: preserve-3d;
          animation: infab-waveguide-tilt 10s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="relative w-full p-5 select-none overflow-hidden transition-colors duration-300">
        
        {/* 3D scene */}
        <div className="relative z-10 flex justify-center items-center">
          <div style={{ perspective: '800px', perspectiveOrigin: '50% 30%', flexShrink: 0, padding: '40px 20px' }}>
            <div className="infab-waveguide-group">

              {/* ── 1. BOTTOM LAYER: Silicon Substrate ── */}
              <div style={{
                ...layerBase,
                background: c.chipBg,
                border: `1px solid ${c.chipBorder}`,
                transform: 'translateZ(0px)',
                boxShadow: isDark ? 'inset 0 0 20px rgba(0,0,0,0.5)' : 'inset 0 0 20px rgba(0,0,0,0.05)',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <text x="20" y="200" fontSize="8" fontFamily="monospace" fill={c.label} letterSpacing="1">PHOTONIC IC</text>
                </svg>
              </div>

              {/* ── 2. TOP LAYER: Optical Waveguides & Laser Pulses ── */}
              <div style={{
                ...layerBase,
                background: 'transparent',
                border: `1px solid ${c.chipBorder}`,
                transform: 'translateZ(10px)',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  
                  {/* Waveguide tracks */}
                  <path 
                    d={circuitPath} 
                    stroke={c.waveguideStroke} 
                    strokeWidth="3" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                  />

                  {/* Laser Pulse Glow */}
                  <path 
                    d={circuitPath} 
                    stroke={c.laserPulse} 
                    strokeWidth="6" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeDasharray="40 360"
                    style={{ animation: 'infab-laser-shoot 3s linear infinite', filter: 'blur(3px)' }}
                  />

                  {/* Laser Pulse Core */}
                  <path 
                    d={circuitPath} 
                    stroke={c.laserCore} 
                    strokeWidth="2" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    strokeDasharray="40 360"
                    style={{ animation: 'infab-laser-shoot 3s linear infinite' }}
                  />
                  
                  {/* End node dots */}
                  <circle cx="260" cy="40" r="3" fill={c.laserPulse} />
                  <circle cx="260" cy="110" r="3" fill={c.laserPulse} />
                  <circle cx="260" cy="180" r="3" fill={c.laserPulse} />
                  
                  {/* Input node dot */}
                  <circle cx="20" cy="110" r="4" fill={c.laserCore} stroke={c.laserPulse} strokeWidth="2" />

                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-4 mb-2">
          <span style={{ fontFamily: 'monospace', fontSize: 8.5, letterSpacing: '2px', textTransform: 'uppercase', color: c.hintText }}>
            Optical Waveguide  ·  High-Speed Broadcast
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
