"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Filter, Zap, Gauge, Wind } from "lucide-react";
import { FERRARI_CARS } from "@/data/cars";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import CounterNumber from "@/components/ui/CounterNumber";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CarsArchive() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEngine, setSelectedEngine] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement | null>(null);

  const categories = ["All", "Current Range", "Icona", "Classiche/Heritage", "Racing/F1"];
  const engineFilters = ["All", "V12", "V8", "V6 / Hybrid"];

  const filteredCars = FERRARI_CARS.filter((car) => {
    const matchesCategory = selectedCategory === "All" || car.category === selectedCategory;
    const matchesEngine =
      selectedEngine === "All" ||
      (selectedEngine === "V12" && car.engine.includes("V12")) ||
      (selectedEngine === "V8" && car.engine.includes("V8")) ||
      (selectedEngine === "V6 / Hybrid" &&
        (car.engine.includes("V6") ||
          car.engine.includes("Hybrid") ||
          car.engine.includes("PHEV")));
    return matchesCategory && matchesEngine;
  });

  // Staggered entry animation for grid cards
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".car-grid-card");
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.set(cards, { y: 60, opacity: 0 });

    const anim = gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [selectedCategory, selectedEngine]);

  // Card mouse tilt handler
  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <section
      id="cars-archive"
      className="relative w-full bg-[#080808] text-white py-24 px-6 md:px-12 border-t border-white/10"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono-spec text-sm text-[#D40000] font-bold">04 //</span>
              <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
                THE COMPLETE MARANELLO RANGE
              </AnimatedHeading>
            </div>
            <p className="font-sans-editorial text-sm sm:text-base text-white/60 max-w-xl mt-2">
              Explore the pinnacle of Italian racing pedigree. Filter by era, cylinder architecture,
              and motorsport heritage.
            </p>
          </div>

          <div className="font-mono-spec text-xs text-white/50">
            TOTAL CATALOGUED:{" "}
            <span className="text-white font-bold">
              <CounterNumber value={FERRARI_CARS.length} /> VEHICLES
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-6 border-b border-white/5">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-spec text-[11px] text-white/40 uppercase tracking-widest mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#D40000]" /> ERA:
            </span>
            {categories.map((cat) => (
              <MagneticButton
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 font-mono-spec text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#D40000] text-white font-bold"
                    : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                <span>{cat}</span>
              </MagneticButton>
            ))}
          </div>

          {/* Engine Powertrain Filter */}
          <div className="flex items-center gap-2">
            <span className="font-mono-spec text-[11px] text-white/40 uppercase tracking-widest mr-2">
              CYLINDERS:
            </span>
            {engineFilters.map((eng) => (
              <button
                key={eng}
                onClick={() => setSelectedEngine(eng)}
                className={`px-3 py-1 font-mono-spec text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  selectedEngine === eng
                    ? "border-b-2 border-[#FFF200] text-[#FFF200] font-bold"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {eng}
              </button>
            ))}
          </div>
        </div>

        {/* Cars Grid with Staggered Entry and Hover 3D Tilt */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filteredCars.map((car, idx) => (
            <Link
              key={car.slug}
              href={`/cars/${car.slug}`}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="car-grid-card group relative bg-[#111111] border border-white/10 hover:border-[#D40000] p-6 flex flex-col justify-between transition-all duration-300 ease-out will-change-transform overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
              data-cursor-text="INSPECT"
            >
              {/* Subtle Red Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-[#D40000]/20 to-transparent pointer-events-none" />

              {/* Top Meta */}
              <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                <div>
                  <span className="font-mono-spec text-[10px] uppercase tracking-widest text-[#D40000] font-bold">
                    {car.category}
                  </span>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white mt-1 group-hover:text-[#FFF200] transition-colors">
                    {car.name}
                  </h3>
                  <div className="font-mono-spec text-[11px] text-white/40">
                    YEAR {car.year} • {car.chassisCode || "MARANELLO"}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D40000] group-hover:text-[#D40000] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Car Graphic with Zoom on Hover */}
              <div className="relative w-full h-[190px] my-4 flex items-center justify-center overflow-hidden">
                <div className="absolute w-[70%] h-[70%] bg-[#D40000]/10 rounded-full blur-2xl group-hover:bg-[#D40000]/30 transition-colors" />
                <div className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-108">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Spec Overlay Sliding Up */}
              <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-white/10 font-mono-spec text-center bg-black/40 p-2.5 transform transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase">POWER</span>
                  <span className="text-xs font-bold text-white mt-0.5">
                    {car.power.split(" ")[0]} CV
                  </span>
                </div>
                <div className="flex flex-col border-x border-white/10">
                  <span className="text-[9px] text-white/40 uppercase">0–100</span>
                  <span className="text-xs font-bold text-[#FFF200] mt-0.5">
                    {car.zeroToHundred}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/40 uppercase">TOP SPEED</span>
                  <span className="text-xs font-bold text-white mt-0.5">
                    {car.topSpeed.split(" ")[0]}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
