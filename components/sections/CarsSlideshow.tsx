"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, ArrowUpRight, Gauge, Zap, Wind, Play, Pause } from "lucide-react";
import { FERRARI_CARS, CarModel } from "@/data/cars";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CarsSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideContentRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Showcase cars selection
  const showcaseCars: (CarModel & { bgGradient: string; accentColor: string })[] = [
    {
      ...(FERRARI_CARS.find((c) => c.slug === "ferrari-296-gtb") || FERRARI_CARS[0]),
      bgGradient: "radial-gradient(circle at 60% 50%, #3d0000 0%, #0a0a0a 75%)",
      accentColor: "#D40000",
    },
    {
      ...(FERRARI_CARS.find((c) => c.slug === "ferrari-sf90-xx-stradale") || FERRARI_CARS[1]),
      bgGradient: "radial-gradient(circle at 60% 50%, #1e1e1e 0%, #080808 75%)",
      accentColor: "#FFF200",
    },
    {
      ...(FERRARI_CARS.find((c) => c.slug === "ferrari-daytona-sp3") || FERRARI_CARS[2]),
      bgGradient: "radial-gradient(circle at 60% 50%, #2e0808 0%, #0a0a0a 75%)",
      accentColor: "#FF3B30",
    },
    {
      ...(FERRARI_CARS.find((c) => c.slug === "ferrari-f40") || FERRARI_CARS[3]),
      bgGradient: "radial-gradient(circle at 60% 50%, #300000 0%, #070707 75%)",
      accentColor: "#D40000",
    },
    {
      ...(FERRARI_CARS.find((c) => c.slug === "scuderia-ferrari-f1-75") || FERRARI_CARS[4]),
      bgGradient: "radial-gradient(circle at 60% 50%, #280202 0%, #090909 75%)",
      accentColor: "#D40000",
    },
  ];

  const currentCar = showcaseCars[currentIndex];

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);

    // Circle-wipe transition animation
    const container = containerRef.current;
    if (container) {
      gsap.fromTo(
        container,
        { clipPath: "circle(0% at 70% 50%)" },
        { clipPath: "circle(150% at 70% 50%)", duration: 0.9, ease: "power4.out" }
      );
    }

    // Animate spec lines sliding in
    const specLines = container?.querySelectorAll(".spec-slide-in");
    if (specLines) {
      gsap.fromTo(
        specLines,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % showcaseCars.length);
  }, [currentIndex, goToSlide, showcaseCars.length]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + showcaseCars.length) % showcaseCars.length);
  }, [currentIndex, goToSlide, showcaseCars.length]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoplay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 60) nextSlide();
    if (distance < -60) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="cars-showcase"
      className="relative w-full min-h-[95vh] text-white overflow-hidden py-20 px-6 md:px-12 flex flex-col justify-between border-t border-white/10 transition-colors duration-1000 ease-out"
      style={{ background: currentCar.bgGradient }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
    >
      {/* Carbon Grid Overlay */}
      <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <span className="font-mono-spec text-sm text-[#D40000] font-bold">02 //</span>
          <AnimatedHeading as="h2" className="font-display text-2xl md:text-3xl tracking-wider uppercase text-white">
            MARANELLO SHOWCASE
          </AnimatedHeading>
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-white/10 border border-white/10 font-mono-spec text-[10px] uppercase tracking-widest text-[#FFF200]">
            {currentCar.category}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setAutoplay(!autoplay)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 font-mono-spec text-[11px] uppercase tracking-wider text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            {autoplay ? (
              <>
                <Pause className="w-3 h-3 text-[#D40000]" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-[#FFF200]" />
                <span>AUTO</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <MagneticButton
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-10 h-10 border border-white/20 text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-10 h-10 border border-white/20 text-white"
            >
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage with Giant Type Behind Car */}
      <div
        ref={containerRef}
        className="relative z-10 max-w-[1600px] w-full mx-auto my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center will-change-transform"
      >
        {/* Giant Outlined Background Type - The Car Overlaps this */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] leading-none text-transparent uppercase whitespace-nowrap select-none pointer-events-none z-0 opacity-25"
          style={{
            WebkitTextStroke: "2px rgba(242, 239, 234, 0.4)",
          }}
        >
          {currentCar.name.replace("Ferrari ", "")}
        </div>

        {/* Left Column: Model Narrative & Specs */}
        <div className="lg:col-span-5 relative z-10 flex flex-col justify-center">
          <div className="spec-slide-in font-mono-spec text-xs tracking-widest text-[#D40000] font-bold uppercase mb-2">
            MODEL YEAR {currentCar.year} • {currentCar.chassisCode || "HOMOLOGATION"}
          </div>

          <h3 className="spec-slide-in font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white leading-[0.92] tracking-tight mb-4">
            {currentCar.name}
          </h3>

          <p className="spec-slide-in font-mono-spec text-xs uppercase tracking-widest text-[#FFF200] mb-6">
            &ldquo;{currentCar.tagline}&rdquo;
          </p>

          <p className="spec-slide-in font-sans-editorial text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-lg">
            {currentCar.story}
          </p>

          <div className="spec-slide-in flex flex-wrap items-center gap-4">
            <MagneticButton
              asLink
              href={`/cars/${currentCar.slug}`}
              className="px-6 py-3.5 bg-[#D40000] text-white font-mono-spec text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(212,0,0,0.4)]"
            >
              <span>Technical Blueprint</span>
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </MagneticButton>

            <MagneticButton
              asLink
              href="#studio-360"
              className="px-5 py-3.5 border border-white/20 text-white font-mono-spec text-xs uppercase tracking-wider"
            >
              <span>Rotate 360°</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Car Image Layered In Front (z-10 Overlapping Giant Type) */}
        <div className="lg:col-span-7 relative z-10 flex items-center justify-center min-h-[340px] md:min-h-[460px]">
          <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] flex items-center justify-center">
            <Image
              src={currentCar.image}
              alt={currentCar.name}
              fill
              priority
              className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)] transition-all duration-700 ease-out"
            />
          </div>
        </div>
      </div>

      {/* Bottom Specs Strip & Thumbnail Rail */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto pt-6 border-t border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Sliding Spec Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono-spec">
          <div className="flex flex-col border-l-2 border-[#D40000] pl-3">
            <span className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-1">
              <Zap className="w-3 h-3 text-[#D40000]" /> POWER OUTPUT
            </span>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
              {currentCar.power.split("@")[0]}
            </span>
          </div>

          <div className="flex flex-col border-l-2 border-[#FFF200] pl-3">
            <span className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-1">
              <Gauge className="w-3 h-3 text-[#FFF200]" /> 0–100 KM/H
            </span>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
              {currentCar.zeroToHundred}
            </span>
          </div>

          <div className="flex flex-col border-l-2 border-white/20 pl-3">
            <span className="text-[10px] text-white/50 uppercase tracking-widest flex items-center gap-1">
              <Wind className="w-3 h-3 text-white/60" /> TOP VELOCITY
            </span>
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
              {currentCar.topSpeed.split("(")[0]}
            </span>
          </div>

          <div className="flex flex-col border-l-2 border-white/20 pl-3">
            <span className="text-[10px] text-white/50 uppercase tracking-widest">
              POWERTRAIN
            </span>
            <span className="text-xs md:text-sm font-bold text-white/90 tracking-tight mt-1 line-clamp-2">
              {currentCar.engine}
            </span>
          </div>
        </div>

        {/* Thumbnail Rail with Active State Progress Animation */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {showcaseCars.map((car, idx) => (
            <button
              key={car.slug}
              onClick={() => goToSlide(idx)}
              className={`relative px-3.5 py-2.5 flex flex-col text-left transition-all border cursor-pointer ${
                idx === currentIndex
                  ? "border-[#D40000] bg-[#D40000]/15"
                  : "border-white/10 hover:border-white/30 bg-black/50"
              }`}
              data-cursor-text={`0${idx + 1}`}
            >
              <div className="flex items-center justify-between gap-4 font-mono-spec text-[9px] text-white/50">
                <span>0{idx + 1}</span>
                <span className={idx === currentIndex ? "text-[#FFF200]" : "text-white/40"}>
                  {car.year}
                </span>
              </div>
              <span className="font-display text-sm tracking-wider uppercase text-white whitespace-nowrap mt-1">
                {car.name.replace("Ferrari ", "")}
              </span>
              {/* Active-state animated bar */}
              {idx === currentIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D40000] shadow-[0_0_10px_#D40000] animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
