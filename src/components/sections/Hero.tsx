'use client';

import { useState, useEffect, useCallback, type ReactNode } from 'react';

interface Slide {
  id: number;
  tag: string;
  tagIcon: ReactNode;
  title: string;
  highlight: string;
  description: string;
  bgImage: string;
  primaryAction: string;
  primaryLink: string;
  secondaryAction: string;
  secondaryLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    tag: 'Medical Microfluidics',
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M240,104a8,8,0,0,1-8,8H181.65l-24.9,58.11A8,8,0,0,1,149.38,176h-.51a8,8,0,0,1-7.3-5.26L103.88,71l-25.2,50.39A8,8,0,0,1,71.53,128H16a8,8,0,0,1,0-16H66l31-62a8,8,0,0,1,14.63.48l37.05,98.81,17.76-41.45A8,8,0,0,1,173.81,96H232A8,8,0,0,1,240,104Z"/></svg>
    ),
    title: 'Empowering Healthcare with',
    highlight: 'Microfluidics',
    description: 'Glass-bonded mRNA delivery chips. Organ-on-chip platforms. Droplet generators — fabricated in our cleanroom, to your specifications, on your timeline.',
    bgImage: '/assests/20250705_1247_Microfluidic-Chips-Display_remix_01jzcq1w50ebgbqtaapdw33fcb.png',
    primaryAction: 'Discover Solutions',
    primaryLink: '/products',
    secondaryAction: 'Get In Touch',
    secondaryLink: '/contact',
  },
  {
    id: 2,
    tag: 'Aerospace & Defense',
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M246.61,154.26,200,169.8A62.59,62.59,0,0,1,180.26,173h-77.9L64,211.52A16,16,0,0,1,36.56,200L44,168.32a63.58,63.58,0,0,1-12.78-9.49l-22-22A16,16,0,0,1,20.51,110L59,103.58a64.21,64.21,0,0,1,16.63-22.18A81.33,81.33,0,0,1,133.15,64H136V40a16,16,0,0,1,32,0V64h4.48a62.58,62.58,0,0,1,19.5,3.13l46.61,15.54A16,16,0,0,1,246.61,154.26Z"/></svg>
    ),
    title: 'High-Reliability Sensors for',
    highlight: 'Aerospace',
    description: 'Pressure transducers, differential switches, and Hall sensors that survive thermal shock, vibration, and altitude extremes. ISO 9001 and AS 9100D certified.',
    bgImage: '/assests/20250705_1443_Aircraft-with-Components_remix_01jzcxnjvreztrntxrzbayry8n.png',
    primaryAction: 'Explore Products',
    primaryLink: '/products',
    secondaryAction: 'Consult an Engineer',
    secondaryLink: '/contact',
  },
  {
    id: 3,
    tag: 'Semiconductor MEMS',
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M216,80v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200A16,16,0,0,1,216,80Zm-32-8H72a8,8,0,0,0-8,8v80a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V80A8,8,0,0,0,184,72Z"/></svg>
    ),
    title: 'Pioneering the',
    highlight: 'Semiconductor Industry',
    description: 'From device concept to qualified prototype — no overseas foundry, no IP exposure. End-to-end MEMS design and fabrication, entirely in India.',
    bgImage: '/assests/20250705_1153_Silicon-Wafer-Display_simple_compose_01jzckzd3ne35tdbmce9r7nwjh1.png',
    primaryAction: 'Our Services',
    primaryLink: '/services',
    secondaryAction: 'View Cleanroom',
    secondaryLink: '/services#facilities',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#05080f]">

      {/* ── Mobile background images (behind content) ─────────────────── */}
      <div className="absolute inset-0 z-0 lg:hidden">
        {slides.map((slide, i) => (
          <div key={slide.id} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
            <div
              className="absolute inset-0"
              style={{ backgroundImage: `url('${slide.bgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center right' }}
            />
            {/* Lighter overlay on mobile — image is visible */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #05080fdd 45%, #05080f99 100%)' }} />
          </div>
        ))}
      </div>

      {/* ── Split grid: Left text | Right image ───────────────────────── */}
      <div className="relative z-10 grid h-full grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* ════════════ LEFT PANEL ════════════ */}
        <div className="relative flex flex-col justify-center overflow-hidden">

          {/* Glow blobs */}
          <div
            className="pointer-events-none absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.13) 0%, transparent 68%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 right-4 h-72 w-72 rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.07) 0%, transparent 70%)' }}
          />

          {/* Left-edge accent line */}
          <div
            className="pointer-events-none absolute left-0 top-1/4 z-10 h-1/2 w-[2px]"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,212,255,0.6), transparent)' }}
          />

          {/* Slide content — all rendered, only active is visible */}
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 flex flex-col justify-center px-10 pb-28 pt-28 lg:px-14 xl:px-20"
              style={{
                opacity: i === current ? 1 : 0,
                transform: i === current ? 'translateY(0px)' : 'translateY(18px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                pointerEvents: i === current ? 'auto' : 'none',
              }}
            >
              {/* Tag */}
              <div className="mb-7">
                <span
                  className="inline-flex items-center gap-2 border font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{
                    borderColor: 'rgba(0,212,255,0.35)',
                    background: 'rgba(0,212,255,0.08)',
                    color: '#00d4ff',
                    padding: '5px 14px',
                    borderRadius: '3px',
                  }}
                >
                  {slide.tagIcon}
                  {slide.tag}
                </span>
              </div>

              {/* Headline */}
              <h1 className="mb-5 max-w-lg text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl xl:text-[3.4rem]">
                {slide.title}
                <span
                  className="mt-2 block"
                  style={{ color: '#00d4ff' }}
                >
                  {slide.highlight}
                </span>
              </h1>

              {/* Accent rule */}
              <div className="mb-6 h-[2px] w-10" style={{ background: 'rgba(0,212,255,0.45)' }} />

              {/* Description */}
              <p className="mb-10 max-w-sm text-[0.95rem] leading-relaxed text-white/60 md:max-w-md md:text-base">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={slide.primaryLink}
                  className="inline-flex h-11 items-center justify-center px-7 text-sm font-semibold transition-all hover:brightness-110 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background: '#00d4ff',
                    color: '#05080f',
                    borderRadius: '3px',
                    boxShadow: '0 0 28px rgba(0,212,255,0.3)',
                  }}
                >
                  {slide.primaryAction}
                </a>
                <a
                  href={slide.secondaryLink}
                  className="inline-flex h-11 items-center justify-center px-7 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all hover:text-white"
                  style={{
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '3px',
                  }}
                >
                  {slide.secondaryAction}
                </a>
              </div>
            </div>
          ))}

          {/* ── Slide controls ── */}
          <div className="absolute bottom-9 left-10 z-20 flex items-center gap-4 lg:left-14 xl:left-20">
            <button
              onClick={prev}
              aria-label="Previous Slide"
              className="flex h-8 w-8 items-center justify-center text-white/40 transition-all hover:text-[#00d4ff]"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', borderRadius: '3px' }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"/></svg>
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="transition-all duration-500"
                  style={{
                    height: '2px',
                    width: i === current ? '28px' : '14px',
                    background: i === current ? '#00d4ff' : 'rgba(255,255,255,0.22)',
                    borderRadius: '2px',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next Slide"
              className="flex h-8 w-8 items-center justify-center text-white/40 transition-all hover:text-[#00d4ff]"
              style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', borderRadius: '3px' }}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"/></svg>
            </button>

            <span className="ml-1 font-mono text-[11px] tracking-widest text-white/20">
              {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ════════════ RIGHT PANEL ════════════ */}
        <div className="relative hidden overflow-hidden lg:block">

          {/* Cyan dot grid — adds depth without heaviness */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              backgroundImage: 'radial-gradient(rgba(0,212,255,0.22) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              opacity: 0.35,
            }}
          />

          {/* Slide images — fully visible, no dark overlay */}
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${slide.bgImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}

          {/* Left edge: seamless blend into left content panel */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-36"
            style={{ background: 'linear-gradient(to right, #05080f 0%, transparent 100%)' }}
          />

          {/* Top edge: blend under navbar */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28"
            style={{ background: 'linear-gradient(to bottom, #05080f 0%, transparent 100%)' }}
          />

          {/* Bottom edge: merge into the next section below */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48"
            style={{ background: 'linear-gradient(to top, #05080f 0%, transparent 100%)' }}
          />

          {/* Slide counter — bottom-right corner */}
          <div className="absolute bottom-10 right-8 z-30 flex flex-col items-end gap-1">
            <span className="font-mono text-[11px] tracking-widest text-white/20">
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="h-px w-8" style={{ background: 'rgba(0,212,255,0.3)' }} />
          </div>
        </div>

      </div>

      {/* ── Full-width bottom fade (both mobile & desktop) ─────────────── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-20"
        style={{ background: 'linear-gradient(to top, #05080f 0%, transparent 100%)' }}
      />

    </section>
  );
}
