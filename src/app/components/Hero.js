'use client';

import { useState, useEffect } from 'react';

// Define our slide data array
const slides = [
  {
    id: 1,
    tag: "Medical Microfluidics",
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M240,104a8,8,0,0,1-8,8H181.65l-24.9,58.11A8,8,0,0,1,149.38,176h-.51a8,8,0,0,1-7.3-5.26L103.88,71l-25.2,50.39A8,8,0,0,1,71.53,128H16a8,8,0,0,1,0-16H66l31-62a8,8,0,0,1,14.63.48l37.05,98.81,17.76-41.45A8,8,0,0,1,173.81,96H232A8,8,0,0,1,240,104Z"></path></svg>
    ),
    title: "Empowering Healthcare with",
    highlight: "Microfluidics",
    description: "Advanced silicon, glass, and polymer chips processed in our state-of-the-art cleanroom facilities, supporting organ-on-chip, droplet generation, and cell sorting.",
    bgImage: "/assests/20250705_1247_Microfluidic-Chips-Display_remix_01jzcq1w50ebgbqtaapdw33fcb.png",
    primaryAction: "Discover Solutions",
    primaryLink: "#healthcare",
    secondaryAction: "Get In Touch",
    secondaryLink: "#contact"
  },
  {
    id: 2,
    tag: "Aerospace & Defense",
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M246.61,154.26,200,169.8A62.59,62.59,0,0,1,180.26,173h-77.9L64,211.52A16,16,0,0,1,36.56,200L44,168.32a63.58,63.58,0,0,1-12.78-9.49l-22-22A16,16,0,0,1,20.51,110L59,103.58a64.21,64.21,0,0,1,16.63-22.18A81.33,81.33,0,0,1,133.15,64H136V40a16,16,0,0,1,32,0V64h4.48a62.58,62.58,0,0,1,19.5,3.13l46.61,15.54A16,16,0,0,1,246.61,154.26Z"></path></svg>
    ),
    title: "High-Reliability Sensors for",
    highlight: "Aerospace",
    description: "Ruggedized MEMS pressure transducers, differential pressure switches, flow transmitters, and Hall sensors engineered to withstand extreme aerospace environments.",
    bgImage: "/assests/20250705_1443_Aircraft-with-Components_remix_01jzcxnjvreztrntxrzbayry8n.png",
    primaryAction: "Explore Products",
    primaryLink: "#aerospace",
    secondaryAction: "Consult an Engineer",
    secondaryLink: "#contact"
  },
  {
    id: 3,
    tag: "Semiconductor MEMS",
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M216,80v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200A16,16,0,0,1,216,80Zm-32-8H72a8,8,0,0,0-8,8v80a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V80A8,8,0,0,0,184,72Z"></path></svg>
    ),
    title: "Pioneering the",
    highlight: "Semiconductor Industry",
    description: "Comprehensive design, fabrication, and custom foundry services for next-generation MEMS sensors and microfluidic technologies, engineered and made in India.",
    bgImage: "/assests/20250705_1153_Silicon-Wafer-Display_simple_compose_01jzckzd3ne35tdbmce9r7nwjh1.png",
    primaryAction: "Our Services",
    primaryLink: "#semiconductor",
    secondaryAction: "View Cleanroom",
    secondaryLink: "#facility"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(slideInterval); // Cleanup on unmount or slide change
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative flex h-screen min-h-[600px] w-full items-center overflow-hidden bg-[#05080f]" id="home">

      {/* Carousel Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center ${index === currentSlide ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url('${slide.bgImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}></div>

          {/* Background Overlay & Grid (Per Slide) */}
          <div className="absolute inset-0 bg-[#05080f]/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080f]/95 via-[#05080f]/70 to-[#05080f]/20"></div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

          {/* Content Wrapper */}
          <div className={`relative z-20 mx-auto w-full max-w-7xl px-6 transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>

            {/* Tag */}
            <div className="mb-6 flex items-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md shadow-sm">
                {slide.tagIcon} {slide.tag}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-5 max-w-3xl font-sans text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl drop-shadow-md">
              {slide.title} <span className="text-[var(--accent-primary)] font-extrabold block mt-2 drop-shadow-lg">{slide.highlight}</span>
            </h1>

            {/* Description */}
            <p className="mb-10 max-w-2xl text-lg text-white/90 md:text-xl leading-relaxed font-light drop-shadow">
              {slide.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <a href={slide.primaryLink} className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-semibold text-black transition-all hover:bg-gray-200 hover:scale-105 shadow-lg">
                {slide.primaryAction}
              </a>
              <a href={slide.secondaryLink} className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 bg-black/40 backdrop-blur-md px-8 text-sm font-semibold text-white transition-all hover:bg-white/20 hover:border-white shadow-lg">
                {slide.secondaryAction}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Hero Controls */}
      <div className="absolute bottom-12 left-0 z-30 flex w-full items-center justify-between px-6 md:px-12 lg:px-24">
        <button onClick={prevSlide} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white transition-all hover:border-white hover:bg-white/10" aria-label="Previous Slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
        </button>

        {/* Dots */}
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-white' : 'w-6 bg-white/30'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white transition-all hover:border-white hover:bg-white/10" aria-label="Next Slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
        </button>
      </div>

    </section>
  );
}