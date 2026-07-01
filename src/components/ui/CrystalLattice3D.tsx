'use client';

import { useEffect, useState } from 'react';

interface LatticeColors {
  planeBg: string;
  planeBorder: string;
  atomFill: string;
  atomGlow: string;
  bondStroke: string;
  activeBond: string;
  label: string;
  legendText: string;
  hintDot: string;
  hintText: string;
}

function getDarkColors(): LatticeColors {
  return {
    planeBg: 'transparent',
    planeBorder: 'rgba(255,255,255,0.05)',
    atomFill: '#1a1e2e',
    atomGlow: 'rgba(255,107,53,0.8)', // Orange accent
    bondStroke: 'rgba(255,255,255,0.15)',
    activeBond: 'rgba(255,107,53,0.9)',
    label: 'rgba(255,255,255,0.4)',
    legendText: 'rgba(255,255,255,0.5)',
    hintDot: '#ff6b35',
    hintText: 'rgba(255,255,255,0.4)'
  };
}

function getLightColors(): LatticeColors {
  return {
    planeBg: 'transparent',
    planeBorder: 'rgba(71,85,105,0.1)',
    atomFill: '#f8fafc',
    atomGlow: 'rgba(0,87,168,0.7)', // Blue accent
    bondStroke: 'rgba(71,85,105,0.2)',
    activeBond: 'rgba(0,87,168,0.9)',
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

// Generate a grid of points
const points: { x: number, y: number }[] = [];
const cols = 5;
const rows = 4;
for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    points.push({ x: 40 + i * 50, y: 35 + j * 50 });
  }
}

export default function CrystalLattice3D() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const c = isDark ? getDarkColors() : getLightColors();

  return (
    <div className="relative flex flex-col items-center w-full">
      <style>{`
        @keyframes infab-lattice-tilt {
          0%   { transform: rotateX(60deg) rotateZ(-30deg); }
          100% { transform: rotateX(60deg) rotateZ(30deg); }
        }
        @keyframes infab-pulse-bond {
          0%, 10% { stroke-dashoffset: 60; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          90%, 100% { stroke-dashoffset: -60; opacity: 0; }
        }
        @keyframes infab-node-glow {
          0%, 100% { filter: drop-shadow(0 0 2px ${c.atomGlow}); }
          50% { filter: drop-shadow(0 0 8px ${c.atomGlow}); }
        }
        .infab-lattice-group {
          width: ${LAYER_W}px;
          height: ${LAYER_H}px;
          position: relative;
          transform-style: preserve-3d;
          animation: infab-lattice-tilt 14s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="relative w-full p-5 select-none overflow-hidden transition-colors duration-300">
        
        {/* 3D scene */}
        <div className="relative z-10 flex justify-center items-center">
          <div style={{ perspective: '1000px', perspectiveOrigin: '50% 20%', flexShrink: 0, padding: '60px 20px' }}>
            <div className="infab-lattice-group">

              {/* Stack 3 layers of lattices */}
              {[0, 40, 80].map((z, layerIdx) => (
                <div key={z} style={{
                  ...layerBase,
                  background: c.planeBg,
                  border: `1px solid ${c.planeBorder}`,
                  transform: `translateZ(${z}px)`,
                }}>
                  <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                    
                    {/* Draw horizontal and vertical bonds */}
                    <g stroke={c.bondStroke} strokeWidth="2">
                      {points.map((p, i) => {
                        // connect right
                        const right = points.find(p2 => p2.y === p.y && p2.x === p.x + 50);
                        // connect down
                        const down = points.find(p2 => p2.x === p.x && p2.y === p.y + 50);
                        return (
                          <g key={`bond-${i}`}>
                            {right && <line x1={p.x} y1={p.y} x2={right.x} y2={right.y} />}
                            {down && <line x1={p.x} y1={p.y} x2={down.x} y2={down.y} />}
                          </g>
                        );
                      })}
                    </g>

                    {/* Animated active bonds (only on middle layer) */}
                    {layerIdx === 1 && (
                      <g stroke={c.activeBond} strokeWidth="3" strokeLinecap="round" strokeDasharray="30 100" style={{ animation: 'infab-pulse-bond 4s linear infinite' }}>
                        <line x1="40" y1="85" x2="240" y2="85" />
                        <line x1="140" y1="35" x2="140" y2="185" style={{ animationDelay: '2s' }} />
                      </g>
                    )}

                    {/* Draw atoms (nodes) */}
                    <g fill={c.atomFill} stroke={c.atomGlow} strokeWidth="2">
                      {points.map((p, i) => {
                        // Make a few nodes glow brighter
                        const isGlowing = (i % 7 === 0) && (layerIdx === 1);
                        return (
                          <circle 
                            key={`atom-${i}`} 
                            cx={p.x} cy={p.y} r="4" 
                            style={isGlowing ? { animation: 'infab-node-glow 3s ease-in-out infinite' } : {}} 
                          />
                        );
                      })}
                    </g>
                  </svg>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
