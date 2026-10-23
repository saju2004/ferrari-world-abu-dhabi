"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const bigWordmarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wordmark = bigWordmarkRef.current;
    if (!wordmark) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Red fill from bottom as it enters viewport
    const fillAnim = gsap.fromTo(
      wordmark,
      { "--fill-percent": "0%" },
      {
        "--fill-percent": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: wordmark,
          start: "top 95%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    return () => {
      fillAnim.scrollTrigger?.kill();
      fillAnim.kill();
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#060606] border-t border-white/10 pt-20 pb-12 overflow-hidden"
    >
      {/* Carbon Texture */}
      <div className="absolute inset-0 carbon-grid opacity-20 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top Grid: Newsletter, Navigation, Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column & Dispatch Signup */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-8 h-10">
                  <Image
                    src="/assets/logos/ferrari-shield.png"
                    alt="Ferrari Shield"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="font-display text-2xl tracking-wide text-white">
                  FERRARI WORLD ABU DHABI
                </div>
              </div>

              <p className="font-sans-editorial text-sm text-white/60 max-w-md leading-relaxed mb-8">
                The world’s first Ferrari-branded theme park on Yas Island. Home to the world’s
                fastest roller coaster, Formula Rossa, and over 40 record-breaking attractions.
              </p>
            </div>

            {/* Newsletter Dispatch Field */}
            <div>
              <div className="font-mono-spec text-[11px] uppercase tracking-widest text-[#D40000] mb-3 font-bold">
                // SCUDERIA DISPATCH & TRACK UPDATES
              </div>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-mono-spec text-[#FFF200] py-3">
                  <CheckCircle2 className="w-4 h-4 text-[#FFF200]" />
                  <span>TRANSMISSION CONFIRMED. WELCOME TO THE PADDOCK.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL FOR RACING BULLETINS"
                    required
                    className="flex-1 bg-white/5 border border-white/15 px-4 py-3 font-mono-spec text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D40000] transition-colors"
                  />
                  <MagneticButton
                    type="submit"
                    className="bg-[#D40000] text-white px-6 font-mono-spec text-xs uppercase tracking-wider font-bold"
                  >
                    <span>JOIN</span>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 sm:col-span-4">
            <div className="font-mono-spec text-[11px] uppercase tracking-widest text-white/40 mb-6 font-bold">
              // PARK SECTIONS
            </div>
            <ul className="flex flex-col gap-3 font-mono-spec text-xs tracking-wider text-white/70">
              <li>
                <a href="#rides" className="hover:text-white transition-colors">
                  01 Speed Strip
                </a>
              </li>
              <li>
                <a href="#cars-showcase" className="hover:text-white transition-colors">
                  02 Maranello Showcase
                </a>
              </li>
              <li>
                <a href="#studio-360" className="hover:text-white transition-colors">
                  03 360° Studio
                </a>
              </li>
              <li>
                <a href="#f1-heritage" className="hover:text-white transition-colors">
                  04 Scuderia Paddock
                </a>
              </li>
              <li>
                <a href="#heritage-logos" className="hover:text-white transition-colors">
                  05 Historical Marks
                </a>
              </li>
              <li>
                <Link href="/tickets" className="text-[#D40000] font-bold hover:underline">
                  06 Tickets & Passes
                </Link>
              </li>
            </ul>
          </div>

          {/* Yas Island Ecosystem */}
          <div className="lg:col-span-2 sm:col-span-4">
            <div className="font-mono-spec text-[11px] uppercase tracking-widest text-white/40 mb-6 font-bold">
              // YAS ISLAND ECOSYSTEM
            </div>
            <ul className="flex flex-col gap-3 font-mono-spec text-xs tracking-wider text-white/70">
              <li>
                <span className="text-white/40">Yas Marina Circuit</span>
              </li>
              <li>
                <span className="text-white/40">Yas Waterworld</span>
              </li>
              <li>
                <span className="text-white/40">Warner Bros. World</span>
              </li>
              <li>
                <span className="text-white/40">SeaWorld Abu Dhabi</span>
              </li>
              <li>
                <span className="text-white/40">Yas Mall Direct Link</span>
              </li>
            </ul>
          </div>

          {/* Location Telemetry */}
          <div className="lg:col-span-3 sm:col-span-4 flex flex-col justify-between">
            <div>
              <div className="font-mono-spec text-[11px] uppercase tracking-widest text-white/40 mb-6 font-bold">
                // LOCATION TELEMETRY
              </div>
              <div className="font-mono-spec text-xs text-white/70 space-y-2">
                <div>YAS ISLAND, ABU DHABI, UAE</div>
                <div className="text-white/40">24°29&apos;01&quot;N 54°36&apos;25&quot;E</div>
                <div className="text-[#FFF200]">HOURS: 11:00 AM – 8:00 PM GST</div>
                <div className="text-white/40">ROOF AREA: 200,000 M²</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <a
                href={process.env.NEXT_PUBLIC_OFFICIAL_BOOKING_URL || "https://www.ferrariworldabudhabi.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono-spec text-xs text-[#D40000] hover:text-white transition-colors uppercase font-bold"
              >
                <span>Official Ferrari World Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Giant Outlined Wordmark That Fills with Red From Bottom As It Enters Viewport */}
        <div className="py-12 select-none overflow-hidden flex items-center justify-center">
          <div
            ref={bigWordmarkRef}
            className="font-display text-[15vw] leading-none tracking-tighter uppercase whitespace-nowrap text-center transition-all duration-100 will-change-transform"
            style={{
              WebkitTextStroke: "1.5px rgba(242, 239, 234, 0.4)",
              background: `linear-gradient(to top, #D40000 var(--fill-percent, 0%), transparent var(--fill-percent, 0%))`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            FERRARI WORLD
          </div>
        </div>

        {/* Bottom Legal Disclaimer */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono-spec text-[11px] text-white/40">
          <div className="text-center md:text-left">
            <span className="text-[#FFF200] font-bold">DISCLAIMER: </span>
            Concept / fan project. Not the official Ferrari World Abu Dhabi website.
          </div>
          <div className="text-center md:text-right">
            OFFICIAL MARANELLO MARKS REFERENCED UNDER FAIR USE REVIEW • ABU DHABI, UAE
          </div>
        </div>
      </div>
    </footer>
  );
}
