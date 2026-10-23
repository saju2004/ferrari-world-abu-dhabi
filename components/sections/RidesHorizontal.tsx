"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge, ArrowRight, ShieldCheck, Ruler, Clock, Zap } from "lucide-react";
import { ATTRACTIONS } from "@/data/rides";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import CounterNumber from "@/components/ui/CounterNumber";
import MagneticButton from "@/components/ui/MagneticButton";

export default function RidesHorizontal() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    const progressBar = progressBarRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;

    let st: ScrollTrigger | null = null;

    if (!prefersReducedMotion && !isMobile) {
      const totalScroll = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            if (progressBar) {
              progressBar.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      st = tween.scrollTrigger || null;

      // Inner image mask parallax for each card
      const imagePanels = track.querySelectorAll(".ride-img-parallax");
      imagePanels.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -15, scale: 1.25 },
          {
            xPercent: 15,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${totalScroll}`,
              scrub: 1,
            },
          }
        );
      });

      return () => {
        if (st) st.kill();
        tween.kill();
      };
    }
  }, []);

  return (
    <section
      id="rides"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-white overflow-hidden py-24 border-t border-white/10"
    >
      {/* Top Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono-spec text-sm text-[#D40000] font-bold">01 //</span>
            <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              RECORD-BREAKING SPEED STRIP
            </AnimatedHeading>
          </div>
          <p className="font-sans-editorial text-sm sm:text-base text-white/60 max-w-xl mt-2">
            Engineered with hydraulic launch catapults and record-shattering inversions. Home to the
            world&apos;s fastest roller coaster, Formula Rossa.
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono-spec text-xs text-white/50">
          <span className="text-[#FFF200] font-bold">PINNED HORIZONTAL TRACK</span>
          <span>• SCROLL TO PROPEL</span>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 lg:w-max overflow-x-auto lg:overflow-visible scrollbar-none will-change-transform pb-12"
      >
        {ATTRACTIONS.map((ride, idx) => (
          <div
            key={ride.id}
            className="w-full lg:w-[720px] xl:w-[780px] shrink-0 bg-[#111111] border border-white/10 flex flex-col justify-between p-8 md:p-10 relative overflow-hidden group hover:border-[#D40000] transition-colors duration-500"
            data-cursor-text="RIDE"
          >
            {/* Huge Outlined Velocity Number in Background */}
            <div
              className="absolute -top-4 right-4 font-display text-[9rem] md:text-[11rem] leading-none text-transparent select-none pointer-events-none uppercase opacity-20 group-hover:opacity-35 transition-opacity"
              style={{
                WebkitTextStroke: "2px rgba(212, 0, 0, 0.7)",
              }}
            >
              {ride.topSpeed}
            </div>

            {/* Top Header of the Card */}
            <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D40000] font-bold">
                  0{idx + 1} // {ride.category}
                </span>
                <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-white mt-1">
                  {ride.name}
                </h3>
                <div className="font-mono-spec text-xs text-[#FFF200] mt-0.5">
                  &ldquo;{ride.tagline}&rdquo;
                </div>
              </div>

              {/* Live Speed Dial Badge */}
              <div className="flex flex-col items-end text-right">
                <span className="font-mono-spec text-[9px] uppercase tracking-widest text-white/40">
                  PEAK VELOCITY
                </span>
                <div className="flex items-baseline gap-1.5 text-[#D40000]">
                  <span className="font-mono-spec text-4xl sm:text-5xl font-bold tracking-tight">
                    <CounterNumber value={ride.topSpeed} duration={1.8} />
                  </span>
                  <span className="font-mono-spec text-xs text-white/60">KM/H</span>
                </div>
              </div>
            </div>

            {/* Parallax Image Mask Slot */}
            <div className="relative z-10 w-full h-[220px] sm:h-[260px] bg-black/70 border border-white/10 mb-6 overflow-hidden flex items-center justify-center">
              {/* Fallback Neutral Technical Stamp */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none">
                <Gauge className="w-10 h-10 text-[#D40000]/60 mb-2" />
                <span className="font-mono-spec text-xs uppercase tracking-widest text-white font-bold">
                  {ride.name} // LAUNCH TELEMETRY
                </span>
                <span className="font-mono-spec text-[10px] text-white/40 mt-1">
                  {ride.acceleration}
                </span>
              </div>

              {/* Inner Parallax Image */}
              <div className="ride-img-parallax absolute inset-0 w-full h-full will-change-transform">
                <Image
                  src={ride.image}
                  alt={ride.name}
                  fill
                  className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>

            {/* Story Descriptor */}
            <p className="relative z-10 font-sans-editorial text-sm text-white/70 leading-relaxed mb-6">
              {ride.description}
            </p>

            {/* Telemetry Metric Grid */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-black/50 border border-white/5 p-4 mb-6 font-mono-spec">
              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5 text-[#D40000]" /> G-FORCE
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  {ride.maxGForce}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                  <Ruler className="w-2.5 h-2.5 text-[#FFF200]" /> ELEVATION
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  {ride.height}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5 text-white/60" /> MIN HEIGHT
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  {ride.minHeightReq}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-white/60" /> DURATION
                </span>
                <span className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  {ride.duration}
                </span>
              </div>
            </div>

            {/* Card Footer CTA with Magnetic Button */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono-spec text-[10px] text-white/40 uppercase tracking-wider">
                PRIORITY ACCESS QUALIFIED
              </span>
              <MagneticButton
                asLink
                href="/tickets"
                className="px-4 py-2 bg-white/5 hover:bg-[#D40000] border border-white/15 text-white font-mono-spec text-xs uppercase tracking-wider font-bold transition-all"
              >
                <span>Fast Pass Booking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar Filling Along Bottom */}
      <div className="relative w-full h-1 bg-white/10 mt-6 overflow-hidden">
        <div
          ref={progressBarRef}
          className="absolute top-0 left-0 bottom-0 w-full bg-[#D40000] shadow-[0_0_12px_#D40000] origin-left will-change-transform"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </section>
  );
}
