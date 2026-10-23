"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function HeritageLogos() {
  const wallRef = useRef<HTMLDivElement | null>(null);

  const marks = [
    {
      year: "1929",
      name: "Scuderia Ferrari Racing Shield",
      provenance: "Alfa Romeo Racing Era",
      src: "/assets/logos/ferrari-shield.png",
      description:
        "The black prancing horse on a canary yellow background (the color of the city of Modena), topped by the Italian tricolor.",
    },
    {
      year: "1947",
      name: "First Maranello Road Mark",
      provenance: "Ferrari 125 S Inauguration",
      src: "/assets/logos/ferrari-shield.png",
      description:
        "Rectangular badge created for Enzo Ferrari's first independent competition car, built in Maranello.",
    },
    {
      year: "1960",
      name: "Formula 1 Scuderia Emblem",
      provenance: "Monoposto Grand Prix Livery",
      src: "/assets/logos/ferrari-shield.png",
      description:
        "Shield with 'S F' lettering affixed to all works Scuderia Ferrari Formula 1 and sports prototype racers.",
    },
    {
      year: "MODERN",
      name: "Ferrari World Yas Island Mark",
      provenance: "World's First Ferrari Theme Park",
      src: "/assets/logos/ferrari-shield.png",
      description:
        "Unified global theme park emblem resting atop the 200,000 square meter aerodynamic roof on Yas Island.",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wall = wallRef.current;
    if (!wall) return;

    const cards = wall.querySelectorAll(".mark-card");
    if (!cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.set(cards, { y: 50, opacity: 0 });

    const anim = gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wall,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      id="heritage-logos"
      className="relative w-full bg-[#090909] text-white py-24 px-6 md:px-12 border-t border-white/10"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono-spec text-sm text-[#D40000] font-bold">06 //</span>
              <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
                HERITAGE MARKS & PROVENANCE
              </AnimatedHeading>
            </div>
            <p className="font-sans-editorial text-sm sm:text-base text-white/60 max-w-xl mt-2">
              A respectful archive of the Cavallino Rampante insignia through the decades.
            </p>
          </div>

          <div className="bg-[#141414] border border-white/10 px-4 py-2 font-mono-spec text-xs text-[#FFF200] uppercase font-bold tracking-wider">
            Official marks – used with permission
          </div>
        </div>

        {/* Gallery Wall */}
        <div ref={wallRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {marks.map((mark, i) => (
            <div
              key={mark.year}
              className="mark-card bg-[#111111] border border-white/10 p-8 flex flex-col justify-between hover:border-[#D40000] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="flex items-center justify-between font-mono-spec text-xs text-white/40 mb-6">
                  <span className="text-[#D40000] font-bold">{mark.year}</span>
                  <span>PLATE // 0{i + 1}</span>
                </div>

                {/* Mark Image */}
                <div className="relative w-24 h-32 mx-auto my-6 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  <Image
                    src={mark.src}
                    alt={mark.name}
                    fill
                    className="object-contain transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-display text-xl uppercase tracking-wide text-white text-center mb-1">
                  {mark.name}
                </h3>
                <div className="font-mono-spec text-[10px] text-[#FFF200] uppercase text-center tracking-wider mb-4">
                  {mark.provenance}
                </div>
                <p className="font-sans-editorial text-xs text-white/60 text-center leading-relaxed">
                  {mark.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
