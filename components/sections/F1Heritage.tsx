"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Flag, Gauge, Sparkles, ChevronRight, Activity } from "lucide-react";
import { F1_STATS, F1_TIMELINE, YAS_CIRCUIT_POINTS } from "@/data/f1";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import CounterNumber from "@/components/ui/CounterNumber";
import MagneticButton from "@/components/ui/MagneticButton";

export default function F1Heritage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackLineRef = useRef<SVGPathElement | null>(null);
  const carIndicatorRef = useRef<HTMLDivElement | null>(null);

  const [selectedYear, setSelectedYear] = useState<number>(2022);
  const [flashActive, setFlashActive] = useState(false);

  const activeTimelineItem =
    F1_TIMELINE.find((t) => t.year === selectedYear) || F1_TIMELINE[3];

  const handleYearChange = (year: number) => {
    setFlashActive(true);
    setSelectedYear(year);
    setTimeout(() => setFlashActive(false), 400);
  };

  // Pinned timeline where F1 car travels along racing line tied to scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const path = trackLineRef.current;
    const carIndicator = carIndicatorRef.current;
    if (!section || !path || !carIndicator) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const pathLength = path.getTotalLength();
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate point along SVG line
          const point = path.getPointAtLength(progress * pathLength);
          gsap.set(carIndicator, { x: point.x, y: point.y });

          // Auto-swap era based on progress if user hasn't locked a selection
          const eraIndex = Math.min(
            Math.floor(progress * F1_TIMELINE.length),
            F1_TIMELINE.length - 1
          );
          const autoYear = F1_TIMELINE[eraIndex].year;
          setSelectedYear(autoYear);
        },
      },
    });

    tl.to(path, { strokeDashoffset: 0, ease: "none" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      id="f1-heritage"
      ref={sectionRef}
      className="relative w-full bg-[#060606] text-white py-24 px-6 md:px-12 carbon-weave border-t border-white/10 overflow-hidden"
    >
      {/* Scuderia Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-[#D40000]/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Screen Flash Flare on Era Transition */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none bg-white/20 transition-opacity duration-300 ${
          flashActive ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono-spec text-sm text-[#D40000] font-bold">05 //</span>
              <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
                SCUDERIA FERRARI PADDOCK
              </AnimatedHeading>
            </div>
            <p className="font-sans-editorial text-sm sm:text-base text-white/60 max-w-xl mt-2">
              The only team to have contested every Formula 1 World Championship since 1950.
              Relive championship triumphs across 75 years of Maranello racing.
            </p>
          </div>

          <div className="font-mono-spec text-xs text-[#FFF200] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FFF200] animate-pulse" />
            <span>RACING PEDIGREE SINCE 1929</span>
          </div>
        </div>

        {/* Animated Championship Counters Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-b border-white/10">
          {F1_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#0F0F0F] border border-white/10 p-6 flex flex-col justify-between hover:border-[#D40000] transition-colors"
            >
              <div className="flex items-center justify-between font-mono-spec text-xs text-white/40 mb-4">
                <span>METRIC // 0{i + 1}</span>
                <Trophy className="w-4 h-4 text-[#FFF200]" />
              </div>

              <div>
                <div className="font-display text-5xl md:text-6xl text-[#D40000] tracking-tight">
                  <CounterNumber value={stat.numeric} suffix={stat.suffix || ""} />
                </div>
                <div className="font-mono-spec text-xs uppercase tracking-wider text-white font-bold mt-1">
                  {stat.label}
                </div>
              </div>

              <p className="font-sans-editorial text-xs text-white/50 mt-4 leading-relaxed">
                {stat.caption}
              </p>
            </div>
          ))}
        </div>

        {/* SVG Racing Line Animation Path */}
        <div className="relative w-full py-8 my-4 overflow-hidden hidden md:block">
          <svg className="w-full h-24 overflow-visible" viewBox="0 0 1000 100">
            {/* Guide line */}
            <path
              d="M 20,50 Q 250,90 500,50 T 980,50"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {/* Active red animated racing line */}
            <path
              ref={trackLineRef}
              d="M 20,50 Q 250,90 500,50 T 980,50"
              fill="none"
              stroke="#D40000"
              strokeWidth="3"
            />
          </svg>

          {/* Traveling F1 Car Marker on the line */}
          <div
            ref={carIndicatorRef}
            className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 flex items-center justify-center pointer-events-none will-change-transform"
          >
            <div className="w-4 h-4 rounded-full bg-[#FFF200] shadow-[0_0_15px_#FFF200] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#D40000]" />
            </div>
          </div>
        </div>

        {/* Main F1 Challenger Stage */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Timeline Year Buttons & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold tracking-widest mb-4">
              // CHAMPIONSHIP CHRONOLOGY
            </span>

            {/* Year Selector Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {F1_TIMELINE.map((item) => (
                <MagneticButton
                  key={item.year}
                  onClick={() => handleYearChange(item.year)}
                  className={`px-4 py-2 font-mono-spec text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    item.year === selectedYear
                      ? "bg-[#D40000] text-white font-bold shadow-[0_0_15px_rgba(212,0,0,0.5)]"
                      : "bg-[#141414] text-white/50 hover:text-white border border-white/10"
                  }`}
                  data-cursor-text={String(item.year)}
                >
                  <span>{item.year}</span>
                </MagneticButton>
              ))}
            </div>

            <div className="font-mono-spec text-xs text-[#FFF200] font-bold uppercase mb-1">
              {activeTimelineItem.driver}
            </div>

            <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
              {activeTimelineItem.car}
            </h3>

            <p className="font-sans-editorial text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              {activeTimelineItem.achievement}
            </p>

            <div className="bg-[#121212] border-l-2 border-[#D40000] p-4 font-mono-spec text-xs text-white/70">
              <span className="text-white/40 block text-[10px] uppercase tracking-widest mb-1">
                ENGINEERING INNOVATION
              </span>
              {activeTimelineItem.techInnovation}
            </div>
          </div>

          {/* Right Column: F1 Car Graphic with Flash Transition */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[340px] md:min-h-[460px]">
            <div className="absolute w-[80%] h-[70%] bg-gradient-to-t from-[#D40000]/25 to-transparent rounded-full blur-[100px] pointer-events-none" />

            <div
              className={`relative w-full h-[280px] sm:h-[360px] md:h-[440px] transition-all duration-300 ${
                flashActive ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              <Image
                src={activeTimelineItem.image}
                alt={activeTimelineItem.car}
                fill
                priority
                className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>
        </div>

        {/* Yas Marina Circuit Sector Speeds Telemetry */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold tracking-widest">
                // ABU DHABI GRAND PRIX TELEMETRY
              </span>
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-white mt-1">
                YAS MARINA CIRCUIT SECTOR SPEEDS
              </h3>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono-spec text-xs text-white/50">
              <Activity className="w-4 h-4 text-[#FFF200]" />
              <span>5.281 KM CIRCUIT DISTANCE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {YAS_CIRCUIT_POINTS.map((point) => (
              <div
                key={point.turn}
                className="bg-[#111111] border border-white/10 p-4 font-mono-spec hover:border-[#D40000] transition-colors"
              >
                <div className="text-[10px] text-[#D40000] font-bold uppercase">{point.turn}</div>
                <div className="text-xs text-white/80 font-bold mt-1 truncate">{point.name}</div>
                <div className="mt-3 flex items-baseline justify-between border-t border-white/10 pt-2">
                  <span className="text-[10px] text-white/40">VELOCITY</span>
                  <span className="text-xs font-bold text-[#FFF200]">{point.speed}</span>
                </div>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-[10px] text-white/40">G-FORCE</span>
                  <span className="text-xs font-bold text-white">{point.gForce}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
