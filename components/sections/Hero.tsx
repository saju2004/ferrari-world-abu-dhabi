"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Flame, Volume2, VolumeX } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import CounterNumber from "@/components/ui/CounterNumber";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const carWrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundActive, setSoundActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Mouse tracking for subtle 3D tilt reaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Web Audio engine hum
  const toggleSound = () => {
    if (!soundActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(42, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setSoundActive(true);
      } catch {
        setSoundActive(false);
      }
    } else {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioContextRef.current.currentTime + 0.3
        );
        setTimeout(() => {
          oscillatorRef.current?.stop();
          audioContextRef.current?.close();
        }, 350);
      }
      setSoundActive(false);
    }
  };

  // GSAP Headline Letter Drop-in & Pinned Scroll Animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = heroRef.current;
    const headline = headlineRef.current;
    const car = carWrapperRef.current;
    const content = contentRef.current;
    if (!hero || !headline || !car) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Split headline characters and animate in
    const chars = headline.querySelectorAll(".char-drop");
    if (!prefersReducedMotion && chars.length > 0) {
      gsap.fromTo(
        chars,
        { y: -120, opacity: 0, rotateX: 60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          stagger: 0.04,
          ease: "power4.out",
          delay: 0.4,
        }
      );
    }

    // Pinned scrub animation: car drives off to the right while headline slides left
    let pinTl: gsap.core.Timeline | null = null;
    if (!prefersReducedMotion && window.innerWidth > 768) {
      pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      pinTl
        .to(
          car,
          {
            xPercent: 140,
            scale: 1.15,
            ease: "power2.in",
          },
          0
        )
        .to(
          headline,
          {
            xPercent: -60,
            opacity: 0.2,
            ease: "power2.out",
          },
          0
        )
        .to(
          content,
          {
            opacity: 0,
            yPercent: 30,
            ease: "power1.out",
          },
          0
        );
    }

    return () => {
      if (pinTl) {
        pinTl.scrollTrigger?.kill();
        pinTl.kill();
      }
    };
  }, []);

  const headlineWord1 = "FEEL";
  const headlineWord2 = "THE SPEED";

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-[#0A0A0A] select-none"
    >
      {/* Background Aerial & Ambient Light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/assets/hero/ferrari-world-aerial.png"
          alt="Ferrari World Abu Dhabi Canopy"
          fill
          priority
          className="object-cover object-center opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/80" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#D40000]/15 rounded-full blur-[140px]" />
      </div>

      {/* Top Telemetry Stripe */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4 font-mono-spec text-[11px] tracking-widest text-white/60 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D40000] animate-ping" />
          <span className="text-white font-bold">SCUDERIA YAS TELEMETRY // 240 KM/H</span>
        </div>

        <div className="hidden sm:flex items-center gap-8 text-white/60">
          <div>
            COORDINATES: <span className="text-white">24°29&apos;01&quot;N 54°36&apos;25&quot;E</span>
          </div>
          <div>
            PEAK G-FORCE: <span className="text-[#FFF200] font-bold">4.8G</span>
          </div>
        </div>

        {/* Audio Toggle button */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-2 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono-spec text-[10px] tracking-wider transition-colors cursor-pointer"
          data-cursor-text={soundActive ? "MUTE" : "AUDIO"}
        >
          {soundActive ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#D40000]" />
              <span>MARANELLO IDLE ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-white/50" />
              <span>ENABLE ENGINE AUDIO</span>
            </>
          )}
        </button>
      </div>

      {/* Centerpiece Hero Layout */}
      <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 my-auto py-8">
        {/* Editorial Subheading */}
        <div className="flex items-center gap-3 font-mono-spec text-xs tracking-[0.3em] uppercase text-[#D40000] font-bold mb-4">
          <Flame className="w-4 h-4 text-[#D40000]" />
          <span>ABSOLUTE VELOCITY • YAS ISLAND ABU DHABI</span>
        </div>

        {/* Headline with Letter-by-Letter Drop In */}
        <h1
          ref={headlineRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[11vw] leading-[0.88] tracking-tight uppercase text-white font-normal will-change-transform"
        >
          <span className="inline-block overflow-hidden">
            {headlineWord1.split("").map((char, i) => (
              <span key={i} className="char-drop inline-block">
                {char}
              </span>
            ))}
          </span>
          <br />
          <span className="inline-block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-[#D40000] via-[#FF3B30] to-white">
            {headlineWord2.split("").map((char, i) => (
              <span key={i} className="char-drop inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* 3D Car Visual That Reacts to Mouse Position */}
        <div
          ref={carWrapperRef}
          className="relative w-full max-w-4xl h-[260px] sm:h-[340px] md:h-[420px] my-4 mx-auto flex items-center justify-center transition-transform duration-200 ease-out will-change-transform"
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${
              -mousePos.y * 6
            }deg)`,
          }}
        >
          {/* Underglow Sheen */}
          <div className="absolute w-[80%] h-14 bg-[#D40000]/25 rounded-full blur-2xl bottom-4 pointer-events-none" />
          <Image
            src="/assets/cars/ferrari-296-gtb.png"
            alt="Ferrari 296 GTB Hero"
            fill
            priority
            className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
          />
        </div>

        {/* Descriptive Copy & Magnetic Buttons */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end will-change-transform"
        >
          <div className="md:col-span-6 lg:col-span-5">
            <p className="font-sans-editorial text-base sm:text-lg text-white/80 leading-relaxed font-light">
              Formula Rossa catapults riders from 0 to 240 km/h in 4.9 seconds with 4.8G hydraulic
              thrust. Experience 40+ record-shattering attractions and Maranello supercars.
            </p>
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap items-center gap-4 sm:gap-6 justify-start md:justify-end">
            <MagneticButton
              asLink
              href="/tickets"
              className="px-8 py-4 bg-[#D40000] text-white font-mono-spec text-sm uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(212,0,0,0.4)]"
            >
              <span>Reserve Tickets</span>
              <span className="font-normal text-white/60 ml-2">From 345 AED</span>
            </MagneticButton>

            <MagneticButton
              asLink
              href="#rides"
              className="px-8 py-4 border border-white/20 text-white font-mono-spec text-sm uppercase tracking-wider bg-black/40 backdrop-blur-sm"
            >
              <span>Explore Attractions</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Bottom Speed Metric Counter & Marquee */}
      <div className="relative z-10 w-full pt-4">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="font-mono-spec text-[10px] tracking-widest text-[#D40000] uppercase font-bold">
                RECORD SPEED
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-mono-spec text-4xl sm:text-5xl font-bold text-white tracking-tight">
                  <CounterNumber value={240} duration={2} />
                </span>
                <span className="font-mono-spec text-sm text-white/60">KM/H</span>
              </div>
            </div>

            <div className="h-10 w-px bg-white/10 hidden sm:block" />

            <div className="hidden sm:flex flex-col font-mono-spec text-xs text-white/60 space-y-0.5">
              <div>0-100 KM/H IN 2.0S</div>
              <div>PEAK ELEVATION: 52M</div>
              <div>HYDRAULIC WINCH: 20,800 HP</div>
            </div>
          </div>

          <a
            href="#rides"
            className="group flex items-center gap-3 font-mono-spec text-xs text-white/60 hover:text-white transition-colors"
            data-cursor-text="SCROLL"
          >
            <span className="tracking-widest uppercase">SCROLL TO COMMENCE // 01 RIDES</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#D40000] group-hover:text-[#D40000] transition-colors animate-bounce">
              <ArrowDown className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>

        {/* Marquee velocity ticker */}
        <MarqueeStrip />
      </div>
    </section>
  );
}
