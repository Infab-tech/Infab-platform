'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    tag: "Smart Microfluidics",
    title: "Empowering Healthcare with Microfluidics",
    titleHighlight: "Microfluidics",
    titleBase: "Empowering Healthcare with ",
    description: "Advanced silicon, glass, and polymer chips processed in our state of the art cleanroom facilities, supporting organ on chip, droplet generation, and cell sorting.",
    image: "/assests/products/microfluidics.jpeg",

  },
  {
    id: 2,
    tag: "Advanced MEMS Foundry",
    title: "Pioneering the Semiconductor Industry",
    titleHighlight: "Semiconductor Industry",
    titleBase: "Pioneering the ",
    description: "Comprehensive design, fabrication, and custom foundry services for next-generation MEMS sensors and microfluidic technologies, engineered and made in India.",
    image: "/assests/20250705_1153_Silicon-Wafer-Display_simple_compose_01jzckzd3ne35tdbmce9r7nwjh1.png",

  },
  {
    id: 3,
    tag: "Aerospace & Defense",
    title: "High-Reliability Sensors for Aerospace",
    titleHighlight: "Aerospace.",
    titleBase: "High-Reliability Sensors for ",
    description: "Ruggedized MEMS pressure transducers, differential pressure switches, flow transmitters, and Hall sensors engineered to withstand extreme aerospace environments.",
    image: "/assests/20250705_1443_Aircraft-with-Components_remix_01jzcxnjvreztrntxrzbayry8n.png",

  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full pt-24 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300 min-h-[90vh] flex items-center">

      {/* Subtle lab grid background (Enterprise touch) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(var(--accent-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">

        {/* LEFT COLUMN: Clean, readable typography */}
        <div className="flex flex-col items-start text-left h-[420px] sm:h-[380px] lg:h-[400px]">

          <h1 key={`title-${currentSlide}`} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.15] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {slides[currentSlide].titleBase} <span className="text-[var(--accent-primary)]">{slides[currentSlide].titleHighlight}</span>
          </h1>

          <p key={`desc-${currentSlide}`} className="text-lg text-[var(--text-secondary)] mb-10 leading-relaxed max-w-lg animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {slides[currentSlide].description}
          </p>

          <div className="mt-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/products" className="inline-flex items-center justify-center gap-2 bg-[var(--accent-primary)] text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Discover Products
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--text-primary)] border border-[var(--border-color)] font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-all">
              Services
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: 100% Visible, vibrant photography */}
        <div className="relative w-full aspect-[4/3]">
          {/* Subtle colored glow behind the image box */}
          <div className="absolute inset-0 bg-[var(--accent-primary)]/10 rounded-3xl blur-3xl transform translate-x-4 translate-y-4"></div>

          <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--border-color)] shadow-2xl">

            {/* The actual image slider */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover ${index === 0 ? '-scale-x-100' : ''}`}
                  priority={index === 0}
                />
              </div>
            ))}


          </div>
        </div>

      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${index === currentSlide
              ? 'w-10 h-2 bg-[var(--accent-primary)]'
              : 'w-2 h-2 bg-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/60'
              }`}
          />
        ))}
      </div>

    </section>
  );
}
