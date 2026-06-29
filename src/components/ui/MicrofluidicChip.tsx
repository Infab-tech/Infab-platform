'use client';

import { useEffect, useState } from 'react';

// Serpentine x-positions (12 passes, 18px spacing) and y range
const SX = [80, 98, 116, 134, 152, 170, 188, 206, 224, 242, 260, 278];
const YTOP = 22;
const YBOT = 158;

// SVG animateMotion path — from IN1 port through chip to OUT
// Traces: IN1 → junction vertical bar → junction exit top → serpentine 12 passes → oval → OUT
const FLOW_PATH_A =
  `M 4,52 H 55 V 38 H 72 V 52 H 80 V ${YTOP}` +
  ` V ${YBOT} H 98 V ${YTOP} H 116 V ${YBOT} H 134 V ${YTOP} H 152 V ${YBOT}` +
  ` H 170 V ${YTOP} H 188 V ${YBOT} H 206 V ${YTOP} H 224 V ${YBOT}` +
  ` H 242 V ${YTOP} H 260 V ${YBOT} H 278 V ${YTOP}` +
  ` H 288 V 90 H 336`;

// From IN2 port — travels up through junction box, then same serpentine
const FLOW_PATH_B =
  `M 4,128 H 38 V 52 H 72 V 52 H 80 V ${YTOP}` +
  ` V ${YBOT} H 98 V ${YTOP} H 116 V ${YBOT} H 134 V ${YTOP} H 152 V ${YBOT}` +
  ` H 170 V ${YTOP} H 188 V ${YBOT} H 206 V ${YTOP} H 224 V ${YBOT}` +
  ` H 242 V ${YTOP} H 260 V ${YBOT} H 278 V ${YTOP}` +
  ` H 288 V 90 H 336`;

interface ChipColors {
  // Glass layer
  glassBg: string;
  glassBorder: string;
  glassPortFill: string;
  glassPortStroke: string;
  glassLabel: string;
  // PDMS layer
  pdmsBg: string;
  pdmsBorder: string;
  chanFill: string;
  chanWall: string;
  wallGlow: string;
  portStroke: string;
  ovalFill: string;
  ovalStroke: string;
  labelClr: string;
  dot1: string;
  dot2: string;
  dot3: string;
  // Silicon layer
  siBg: string;
  siBorder: string;
  siTrace: string;
  siPad: string;
  siLabel: string;
  // Card
  cardBg: string;
  dotGrid: string;
  hintDot: string;
  hintText: string;
  legendText: string;
}

function getDarkColors(): ChipColors {
  return {
    glassBg: 'rgba(255,255,255,0.03)',
    glassBorder: 'rgba(255,255,255,0.15)',
    glassPortFill: 'rgba(0,0,0,0.5)',
    glassPortStroke: 'rgba(255,255,255,0.2)',
    glassLabel: 'rgba(255,255,255,0.3)',
    pdmsBg: 'rgba(20,25,35,0.6)',
    pdmsBorder: 'rgba(0,136,204,0.3)',
    chanFill: 'rgba(0,136,204,0.15)',
    chanWall: 'rgba(0,136,204,0.4)',
    wallGlow: 'rgba(0,136,204,0.2)',
    portStroke: 'rgba(0,136,204,0.5)',
    ovalFill: 'rgba(255,107,53,0.1)',
    ovalStroke: 'rgba(255,107,53,0.5)',
    labelClr: 'rgba(0,136,204,0.4)',
    dot1: '#0088cc',
    dot2: '#ff6b35',
    dot3: '#ffffff',
    siBg: 'linear-gradient(150deg,#1e2433,#0a0d14)',
    siBorder: 'rgba(255,255,255,0.15)',
    siTrace: 'rgba(255,255,255,0.15)',
    siPad: 'rgba(255,255,255,0.1)',
    siLabel: 'rgba(255,255,255,0.2)',
    cardBg: 'transparent',
    dotGrid: 'transparent',
    hintDot: '#0088cc',
    hintText: 'rgba(255,255,255,0.4)',
    legendText: 'rgba(255,255,255,0.4)',
  };
}

function getLightColors(): ChipColors {
  return {
    glassBg: 'rgba(255,255,255,0.4)',
    glassBorder: 'rgba(0,87,168,0.2)',
    glassPortFill: 'rgba(255,255,255,0.8)',
    glassPortStroke: 'rgba(0,87,168,0.3)',
    glassLabel: 'rgba(0,87,168,0.4)',
    pdmsBg: 'rgba(241,245,249,0.7)',
    pdmsBorder: 'rgba(0,87,168,0.3)',
    chanFill: 'rgba(0,87,168,0.1)',
    chanWall: 'rgba(0,87,168,0.3)',
    wallGlow: 'rgba(0,87,168,0.15)',
    portStroke: 'rgba(0,87,168,0.4)',
    ovalFill: 'rgba(255,107,53,0.1)',
    ovalStroke: 'rgba(255,107,53,0.5)',
    labelClr: 'rgba(0,87,168,0.4)',
    dot1: '#0057A8',
    dot2: '#ff6b35',
    dot3: '#475569',
    siBg: 'linear-gradient(150deg,#e2e8f0,#cbd5e1)',
    siBorder: 'rgba(71,85,105,0.2)',
    siTrace: 'rgba(71,85,105,0.2)',
    siPad: 'rgba(71,85,105,0.15)',
    siLabel: 'rgba(71,85,105,0.4)',
    cardBg: 'transparent',
    dotGrid: 'transparent',
    hintDot: '#0057A8',
    hintText: 'rgba(71,85,105,0.6)',
    legendText: 'rgba(71,85,105,0.8)',
  };
}

const LAYER_W = 340;
const LAYER_H = 180;

const layerBase: React.CSSProperties = {
  position: 'absolute',
  width: LAYER_W,
  height: LAYER_H,
  borderRadius: 9,
  backfaceVisibility: 'hidden',
};

export default function MicrofluidicChip() {
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
    { bg: c.glassBg,  border: c.glassBorder, label: 'Glass · 500μm' },
    { bg: c.pdmsBg,   border: c.pdmsBorder,  label: 'PDMS · Channels' },
    { bg: isDark ? '#1a1e2e' : '#c4d0e4', border: c.siBorder, label: 'Silicon · 525μm' },
  ];

  // Build serpentine SVG lines
  const serpLines: React.ReactNode[] = [];
  // Vertical passes
  SX.forEach(x => {
    serpLines.push(<line key={`v${x}`} x1={x} y1={YTOP} x2={x} y2={YBOT} />);
  });
  // Bottom connections (even→odd passes)
  for (let i = 0; i < 12; i += 2) {
    if (i + 1 < 12)
      serpLines.push(<line key={`b${i}`} x1={SX[i]} y1={YBOT} x2={SX[i + 1]} y2={YBOT} />);
  }
  // Top connections (odd→even passes)
  for (let i = 1; i < 11; i += 2) {
    serpLines.push(<line key={`t${i}`} x1={SX[i]} y1={YTOP} x2={SX[i + 1]} y2={YTOP} />);
  }

  return (
    <div className="relative flex flex-col items-center w-full">
      <style>{`
        @keyframes infab-chip-tilt {
          0%   { transform: rotateX(22deg) rotateY(-28deg); }
          100% { transform: rotateX(22deg) rotateY(28deg); }
        }
        @keyframes infab-glass-shimmer {
          0%, 100% { opacity: 0.65; }
          50%       { opacity: 0.95; }
        }
        @keyframes infab-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        .infab-chip-group {
          width: ${LAYER_W}px;
          height: ${LAYER_H}px;
          position: relative;
          transform-style: preserve-3d;
          animation: infab-chip-tilt 9s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="relative w-full p-5 select-none transition-colors duration-300">
        {/* 3D scene */}
        <div className="relative z-10 flex justify-center items-center overflow-x-auto">
          <div style={{ perspective: '900px', perspectiveOrigin: '50% 38%', flexShrink: 0, padding: '30px 20px 34px' }}>
            <div className="infab-chip-group">

              {/* ── GLASS TOP ── */}
              <div style={{
                ...layerBase,
                background: c.glassBg,
                border: `1px solid ${c.glassBorder}`,
                transform: 'translateZ(72px)',
                animation: 'infab-glass-shimmer 4s ease-in-out infinite',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  {/* Port holes */}
                  <circle cx="4"   cy="52"  r="9" fill={c.glassPortFill} stroke={c.glassPortStroke} strokeWidth="1.5" />
                  <circle cx="4"   cy="52"  r="4" fill={isDark ? 'rgba(0,0,0,0.8)' : 'rgba(200,220,255,0.7)'} stroke={c.glassPortStroke} strokeWidth="0.8" />
                  <circle cx="4"   cy="128" r="9" fill={c.glassPortFill} stroke={c.glassPortStroke} strokeWidth="1.5" />
                  <circle cx="4"   cy="128" r="4" fill={isDark ? 'rgba(0,0,0,0.8)' : 'rgba(200,220,255,0.7)'} stroke={c.glassPortStroke} strokeWidth="0.8" />
                  <circle cx="336" cy="90"  r="9" fill={c.glassPortFill} stroke={c.glassPortStroke} strokeWidth="1.5" />
                  <circle cx="336" cy="90"  r="4" fill={isDark ? 'rgba(0,0,0,0.8)' : 'rgba(200,220,255,0.7)'} stroke={c.glassPortStroke} strokeWidth="0.8" />
                  <text x="170" y="174" fontSize="7.5" fontFamily="monospace" fill={c.glassLabel} textAnchor="middle" letterSpacing="2">GLASS COVER  ·  500μm</text>
                </svg>
              </div>

              {/* ── PDMS MIDDLE (actual chip channels) ── */}
              <div style={{
                ...layerBase,
                background: c.pdmsBg,
                border: `1px solid ${c.pdmsBorder}`,
                transform: 'translateZ(0px)',
                overflow: 'hidden',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <defs>
                    <filter id="infab-glow" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="2" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <path id="infab-flow-a" d={FLOW_PATH_A} />
                    <path id="infab-flow-b" d={FLOW_PATH_B} />
                  </defs>

                  {/* ── Channel fills (wide soft background) ── */}
                  <g stroke={c.chanFill} strokeWidth="14" strokeLinecap="round" fill="none">
                    <line x1="4" y1="52"  x2="38" y2="52" />
                    <line x1="4" y1="128" x2="38" y2="128" />
                    {/* Junction box fill (wide stroke as rect fill) */}
                    <rect x="38" y="38" width="34" height="104" rx="3" strokeWidth="34" />
                    {serpLines}
                    {/* Exit from serpentine */}
                    <line x1="278" y1={YTOP} x2="288" y2={YTOP} />
                    <line x1="288" y1={YTOP} x2="288" y2="90" />
                    <line x1="288" y1="90"  x2="304" y2="90" />
                    <line x1="336" y1="90"  x2="340" y2="90" />
                  </g>

                  {/* ── Channel walls (thin glow lines) ── */}
                  <g stroke={c.chanWall} strokeWidth="1" strokeLinecap="round" fill="none" filter="url(#infab-glow)">
                    <line x1="4" y1="52"  x2="38" y2="52" />
                    <line x1="4" y1="128" x2="38" y2="128" />
                    <rect x="38" y="38" width="34" height="104" rx="3" />
                    {/* Junction internal T */}
                    <line x1="55" y1="52"  x2="55" y2="128" />
                    <line x1="55" y1="38"  x2="72" y2="38" />
                    <line x1="72" y1="38"  x2="72" y2="52" />
                    <line x1="72" y1="52"  x2="80" y2="52" />
                    <line x1="80" y1="52"  x2="80" y2={YTOP} />
                    {serpLines}
                    <line x1="278" y1={YTOP} x2="288" y2={YTOP} />
                    <line x1="288" y1={YTOP} x2="288" y2="90" />
                    <line x1="288" y1="90"  x2="304" y2="90" />
                    <line x1="336" y1="90"  x2="340" y2="90" />
                  </g>

                  {/* Oval detector */}
                  <ellipse cx="320" cy="90" rx="16" ry="9"
                    fill={c.ovalFill} stroke={c.ovalStroke} strokeWidth="1.3"
                    filter="url(#infab-glow)" />

                  {/* Port circles */}
                  <circle cx="4"   cy="52"  r="7" fill="none" stroke={c.portStroke} strokeWidth="1.5" filter="url(#infab-glow)" />
                  <circle cx="4"   cy="128" r="7" fill="none" stroke={c.portStroke} strokeWidth="1.5" filter="url(#infab-glow)" />
                  <circle cx="336" cy="90"  r="7" fill="none" stroke={c.portStroke} strokeWidth="1.5" filter="url(#infab-glow)" />

                  {/* Animated droplets — SVG animateMotion */}
                  <circle r="4.5" fill={c.dot1} filter="url(#infab-glow)">
                    <animateMotion dur="10s" repeatCount="indefinite" begin="0s" calcMode="linear">
                      <mpath href="#infab-flow-a" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur="10s" repeatCount="indefinite" begin="0s" />
                  </circle>
                  <circle r="3.5" fill={c.dot2} filter="url(#infab-glow)">
                    <animateMotion dur="10s" repeatCount="indefinite" begin="3.5s" calcMode="linear">
                      <mpath href="#infab-flow-b" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur="10s" repeatCount="indefinite" begin="3.5s" />
                  </circle>
                  <circle r="4" fill={c.dot3} filter="url(#infab-glow)">
                    <animateMotion dur="10s" repeatCount="indefinite" begin="6.8s" calcMode="linear">
                      <mpath href="#infab-flow-a" />
                    </animateMotion>
                    <animate attributeName="opacity" values="0;1;1;0" dur="10s" repeatCount="indefinite" begin="6.8s" />
                  </circle>

                  {/* Labels */}
                  <text x="4"   y="39"  fontSize="7" fontFamily="monospace" fill={c.labelClr} textAnchor="middle" letterSpacing="1">IN₁</text>
                  <text x="4"   y="143" fontSize="7" fontFamily="monospace" fill={c.labelClr} textAnchor="middle" letterSpacing="1">IN₂</text>
                  <text x="336" y="80"  fontSize="7" fontFamily="monospace" fill={c.labelClr} textAnchor="middle" letterSpacing="1">OUT</text>
                  <text x="170" y="174" fontSize="7.5" fontFamily="monospace" fill={c.labelClr} textAnchor="middle" letterSpacing="1.5">
                    PDMS  ·  DROP GENERATOR  v0.1  ·  50μm
                  </text>
                </svg>
              </div>

              {/* ── SILICON BOTTOM ── */}
              <div style={{
                ...layerBase,
                background: c.siBg,
                border: `1px solid ${c.siBorder}`,
                transform: 'translateZ(-72px)',
              }}>
                <svg viewBox={`0 0 ${LAYER_W} ${LAYER_H}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  {/* Electrode traces */}
                  <g stroke={c.siTrace} strokeWidth="0.8" fill="none" strokeDasharray="4 3">
                    <line x1="40" y1="52"  x2="170" y2="52" />
                    <line x1="40" y1="128" x2="120" y2="128" />
                    <line x1="120" y1="128" x2="120" y2="90" />
                    <line x1="120" y1="90"  x2="200" y2="90" />
                    <line x1="200" y1="90"  x2="200" y2="40" />
                    <line x1="200" y1="40"  x2="300" y2="40" />
                    <line x1="300" y1="40"  x2="300" y2="90" />
                    <line x1="300" y1="90"  x2="334" y2="90" />
                  </g>
                  {/* Contact pads */}
                  <g fill={c.siPad} stroke={c.siTrace} strokeWidth="0.8">
                    <rect x="60"  y="44" width="12" height="8" rx="1" />
                    <rect x="100" y="120" width="12" height="8" rx="1" />
                    <rect x="280" y="84" width="12" height="8" rx="1" />
                    <rect x="180" y="44" width="12" height="8" rx="1" />
                  </g>
                  {/* Port holes */}
                  <circle cx="4"   cy="52"  r="9" fill={isDark ? 'rgba(0,0,0,0.7)' : 'rgba(180,195,220,0.6)'} stroke={c.siBorder} strokeWidth="1.2" />
                  <circle cx="4"   cy="128" r="9" fill={isDark ? 'rgba(0,0,0,0.7)' : 'rgba(180,195,220,0.6)'} stroke={c.siBorder} strokeWidth="1.2" />
                  <circle cx="336" cy="90"  r="9" fill={isDark ? 'rgba(0,0,0,0.7)' : 'rgba(180,195,220,0.6)'} stroke={c.siBorder} strokeWidth="1.2" />
                  <text x="170" y="174" fontSize="8" fontFamily="monospace" fill={c.siLabel} textAnchor="middle" letterSpacing="2">Si SUBSTRATE  ·  525μm</text>
                </svg>
              </div>

            </div>
          </div>
        </div>

        {/* Hint */}
        <div className="relative z-10 flex items-center justify-center gap-2 mt-1 mb-2">
          <span style={{ fontFamily: 'monospace', fontSize: 8.5, letterSpacing: '2px', textTransform: 'uppercase', color: c.hintText }}>
            Drop Generator v0.1  ·  Actual channel layout
          </span>
        </div>

        {/* Layer legend */}
        <div className="relative z-10 flex justify-center gap-5 flex-wrap">
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
