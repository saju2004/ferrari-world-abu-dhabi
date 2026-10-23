"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MarqueeStripProps {
  text?: string[];
  direction?: 1 | -1;
  baseSpeed?: number;
  className?: string;
}

export default function MarqueeStrip({
  text = [
    "FERRARI WORLD",
    "YAS ISLAND ABU DHABI",
    "FORMULA ROSSA 240 KM/H",
    "SCUDERIA RACING PEDIGREE",
    "FLYING ACES 51° INCLINE",
    "MARANELLO ENGINE SOUND",
  ],
  direction = 1,
  baseSpeed = 1,
  className = "",
}: MarqueeStripProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let xPos = 0;
    let velocityMultiplier = 1;

    // Observe scroll velocity via ScrollTrigger
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        // Boost velocity during fast scroll
        const velocity = Math.abs(self.getVelocity());
        velocityMultiplier = 1 + Math.min(velocity / 300, 4);
      },
    });

    const updateMarquee = () => {
      // Damping velocityMultiplier back to 1
      velocityMultiplier += (1 - velocityMultiplier) * 0.05;
      xPos -= baseSpeed * velocityMultiplier * direction;

      // Wrap around seamlessly
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(xPos) >= halfWidth) {
        xPos = 0;
      }

      track.style.transform = `translate3d(${xPos}px, 0, 0)`;
    };

    gsap.ticker.add(updateMarquee);

    return () => {
      gsap.ticker.remove(updateMarquee);
      st.kill();
    };
  }, [baseSpeed, direction]);

  const repeatedText = [...text, ...text, ...text, ...text];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-3 bg-[#0E0E0E] border-y border-white/10 select-none ${className}`}
    >
      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform font-mono-spec text-xs tracking-[0.25em] uppercase text-white/50"
      >
        {repeatedText.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="hover:text-[#FFF200] transition-colors font-bold text-white/70">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D40000]" />
          </div>
        ))}
      </div>
    </div>
  );
}
