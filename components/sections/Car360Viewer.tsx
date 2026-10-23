"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RotateCw, X, ShieldAlert, Cpu, Wind, MousePointer, ArrowDown } from "lucide-react";
import { FERRARI_CARS, CarHotspot, CarColorOption } from "@/data/cars";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Car360Viewer({ carSlug = "ferrari-296-gtb" }: { carSlug?: string }) {
  const car = FERRARI_CARS.find((c) => c.slug === carSlug) || FERRARI_CARS[0];

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeColor, setActiveColor] = useState<CarColorOption>(car.colorOptions[0]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [scrollToRotateMode, setScrollToRotateMode] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<CarHotspot | null>(null);

  const lastXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Inertia physics & auto-spin loop
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isDragging && !scrollToRotateMode) {
        if (autoRotate) {
          setRotationAngle((prev) => (prev + 18 * delta) % 360);
        } else if (Math.abs(velocityRef.current) > 0.05) {
          setRotationAngle((prev) => (prev + velocityRef.current) % 360);
          velocityRef.current *= 0.92; // Friction damping
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDragging, autoRotate, scrollToRotateMode]);

  // "Scroll to rotate" mode with GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section || !scrollToRotateMode) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Pin section while scrolling rotates the car 360 degrees
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        setRotationAngle(self.progress * 360);
      },
    });

    return () => {
      st.kill();
    };
  }, [scrollToRotateMode]);

  // Pointer drag events
  const handlePointerDown = (e: React.PointerEvent) => {
    if (scrollToRotateMode) return;
    setIsDragging(true);
    setAutoRotate(false);
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || scrollToRotateMode) return;
    const deltaX = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;

    const sensitivity = 0.5;
    const rotationDelta = deltaX * sensitivity;
    velocityRef.current = rotationDelta;
    setRotationAngle((prev) => (prev + rotationDelta) % 360);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setAutoRotate(false);
        setRotationAngle((prev) => (prev - 10) % 360);
      } else if (e.key === "ArrowRight") {
        setAutoRotate(false);
        setRotationAngle((prev) => (prev + 10) % 360);
      }
    },
    []
  );

  const normalizedAngle = ((rotationAngle % 360) + 360) % 360;
  const yawAngle = Math.sin((normalizedAngle * Math.PI) / 180) * 18;
  const shadowScale = 0.9 + Math.cos((normalizedAngle * Math.PI) / 180) * 0.1;

  return (
    <section
      id="studio-360"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#090909] text-white py-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden border-t border-white/10 select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="360 Interactive Car Studio Viewer"
    >
      {/* Turntable Floor Radial Light Ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[480px] rounded-[100%] blur-[120px] pointer-events-none transition-colors duration-700 opacity-30"
        style={{ backgroundColor: activeColor.hex }}
      />
      <div className="absolute inset-0 carbon-grid opacity-15 pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono-spec text-sm text-[#D40000] font-bold">03 //</span>
            <AnimatedHeading as="h2" className="font-display text-2xl md:text-4xl tracking-wider uppercase text-white">
              360° CONFIGURATION STUDIO
            </AnimatedHeading>
          </div>
          <p className="font-mono-spec text-xs text-white/50 tracking-wider mt-1">
            DRAG INERTIA TURNTABLE • HOTSPOT TELEMETRY AUDIT
          </p>
        </div>

        {/* Studio Controls */}
        <div className="flex flex-wrap items-center gap-3 font-mono-spec text-xs">
          {/* Scroll to Rotate Toggle */}
          <button
            onClick={() => {
              setScrollToRotateMode(!scrollToRotateMode);
              if (!scrollToRotateMode) setAutoRotate(false);
            }}
            className={`flex items-center gap-2 px-3 py-2 border transition-all cursor-pointer ${
              scrollToRotateMode
                ? "border-[#FFF200] bg-[#FFF200]/15 text-[#FFF200]"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            <ArrowDown className="w-3.5 h-3.5" />
            <span>{scrollToRotateMode ? "PINNED SCROLL MODE ON" : "SCROLL TO ROTATE"}</span>
          </button>

          {/* Autoplay Spin */}
          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              if (scrollToRotateMode) setScrollToRotateMode(false);
            }}
            className={`flex items-center gap-2 px-3 py-2 border transition-all cursor-pointer ${
              autoRotate
                ? "border-[#D40000] bg-[#D40000]/15 text-white"
                : "border-white/20 text-white/60 hover:text-white"
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? "animate-spin text-[#D40000]" : ""}`} />
            <span>{autoRotate ? "SPINNING" : "AUTOPLAY"}</span>
          </button>

          <button
            onClick={() => {
              setRotationAngle(0);
              velocityRef.current = 0;
            }}
            className="px-3 py-2 border border-white/20 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            0° BEARING
          </button>
        </div>
      </div>

      {/* Turntable Floor & 360 Viewport Stage */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative z-10 w-full max-w-[1400px] mx-auto my-auto min-h-[440px] md:min-h-[560px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        data-cursor-text="DRAG"
      >
        {/* Turntable Glowing Light Ring Floor */}
        <div className="absolute bottom-8 w-[80%] max-w-[800px] h-32 rounded-[100%] border-2 border-white/10 flex items-center justify-center pointer-events-none">
          <div
            className="w-[94%] h-24 rounded-[100%] border border-[#D40000]/40 transition-colors duration-700 shadow-[0_0_25px_rgba(212,0,0,0.5)]"
            style={{
              borderColor: activeColor.hex,
              boxShadow: `0 0 35px ${activeColor.hex}44`,
            }}
          />
        </div>

        {/* Bearing Telemetry Overlay */}
        <div className="absolute top-4 left-4 font-mono-spec text-xs text-white/40 tracking-wider">
          ORIENTATION: <span className="text-white font-bold">{Math.round(normalizedAngle)}°</span>
        </div>

        {/* Pulsing Hotspot Callouts */}
        {car.hotspots.map((hotspot, idx) => {
          const hotspotAngleOffset = idx * 110;
          const currentHotspotDeg = (normalizedAngle + hotspotAngleOffset) % 360;
          const isVisibleSide = currentHotspotDeg > 280 || currentHotspotDeg < 80;
          const xOffset = Math.sin((currentHotspotDeg * Math.PI) / 180) * 230;
          const yOffset = Math.cos((currentHotspotDeg * Math.PI) / 180) * 45;

          return (
            <div
              key={hotspot.id}
              className={`absolute transition-all duration-300 pointer-events-auto ${
                isVisibleSide ? "opacity-100 scale-100 z-30" : "opacity-0 scale-75 pointer-events-none z-10"
              }`}
              style={{
                transform: `translate3d(${xOffset}px, ${yOffset - 35}px, 0)`,
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(hotspot);
                  setAutoRotate(false);
                }}
                className="group relative flex items-center justify-center w-8 h-8 rounded-full bg-[#181818]/90 border border-[#D40000] shadow-[0_0_15px_rgba(212,0,0,0.6)] hover:scale-125 transition-transform cursor-pointer"
                data-cursor-text="SPEC"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#D40000] animate-ping absolute" />
                <span className="w-2 h-2 rounded-full bg-white relative z-10" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-black/95 border border-white/20 whitespace-nowrap font-mono-spec text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {hotspot.title}
                </div>
              </button>
            </div>
          );
        })}

        {/* 360 Vehicle Display Graphic with Animated Perspective */}
        <div
          className="relative w-full max-w-[940px] h-[300px] sm:h-[400px] md:h-[480px] flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${yawAngle}deg)`,
          }}
        >
          {/* Floor Shadow Plane with dynamic scaling */}
          <div
            className="absolute bottom-8 w-[85%] h-12 bg-black/90 rounded-full blur-xl pointer-events-none"
            style={{ transform: `scaleX(${shadowScale})` }}
          />

          {/* Car Image with Material Paint Lighting Filter */}
          <div
            className="relative w-full h-full transition-all duration-500 ease-out flex items-center justify-center"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.95))",
            }}
          >
            <Image
              src={car.image}
              alt={`${car.name} 360 Turntable View`}
              fill
              priority
              className="object-contain transition-transform duration-75 select-none pointer-events-none"
              style={{
                filter:
                  activeColor.name === "Giallo Modena"
                    ? "hue-rotate(45deg) saturate(1.2)"
                    : activeColor.name === "Nero Daytona"
                    ? "grayscale(1) brightness(0.65) contrast(1.3)"
                    : activeColor.name === "Bianco Avus"
                    ? "brightness(1.5) contrast(1.1) grayscale(0.5)"
                    : activeColor.name === "Blu Tour de France"
                    ? "hue-rotate(210deg) saturate(1.1)"
                    : "none",
              }}
            />
          </div>
        </div>

        {/* Hotspot Expanded Card Modal */}
        {activeHotspot && (
          <div className="absolute bottom-6 right-6 z-40 max-w-sm w-full bg-[#121212]/95 border border-[#D40000] p-6 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D40000]" />
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#FFF200] font-bold">
                  {activeHotspot.category} INSPECTION
                </span>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-white/60 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="font-display text-xl uppercase tracking-wide text-white mb-2">
              {activeHotspot.title}
            </h4>

            <p className="font-sans-editorial text-xs text-white/70 leading-relaxed mb-4">
              {activeHotspot.description}
            </p>

            {activeHotspot.specs && (
              <div className="bg-black/70 border border-white/10 px-3 py-2 font-mono-spec text-[11px] text-[#FFF200]">
                TELEMETRY: {activeHotspot.specs}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Color Swatches & Specs Bar */}
      <div className="relative z-20 max-w-[1600px] w-full mx-auto pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Animated Color Swatches */}
        <div className="flex items-center gap-4">
          <span className="font-mono-spec text-xs text-white/50 uppercase tracking-widest">
            LIVERY:
          </span>

          <div className="flex items-center gap-3">
            {car.colorOptions.map((color) => (
              <MagneticButton
                key={color.name}
                onClick={() => setActiveColor(color)}
                className={`flex items-center gap-2 px-3 py-1.5 border transition-all ${
                  activeColor.name === color.name
                    ? "border-white bg-white/15 text-white"
                    : "border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-inner border border-white/30"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="font-mono-spec text-xs uppercase font-medium">{color.name}</span>
              </MagneticButton>
            ))}
          </div>
        </div>

        {/* Chassis Spec */}
        <div className="font-mono-spec text-xs text-white/60">
          CHASSIS REGISTRY:{" "}
          <span className="text-[#D40000] font-bold">{car.chassisCode || "T800 CARBON TUB"}</span>
        </div>
      </div>
    </section>
  );
}
