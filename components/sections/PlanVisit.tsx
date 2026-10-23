"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, Navigation, AlertTriangle, ChevronDown } from "lucide-react";
import AnimatedHeading from "@/components/ui/AnimatedHeading";

export default function PlanVisit() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const faqs = [
    {
      q: "What are the standard operating hours?",
      a: "Ferrari World Abu Dhabi is open daily from 11:00 AM to 8:00 PM GST. Operating hours during UAE public holidays or special motorsport race weeks may be extended until 10:00 PM.",
    },
    {
      q: "What is the dress code inside the park?",
      a: "Guests are required to wear respectful casual clothing suitable for a family theme park in the UAE. Loose clothing and sandals without heel straps may need to be secured before riding high-speed thrill coasters.",
    },
    {
      q: "Are protective goggles required for Formula Rossa?",
      a: "Yes. Due to the 240 km/h peak velocity and desert air currents, custom shatterproof protective goggles are provided to every rider and must be worn during the launch sequence.",
    },
    {
      q: "How does the Fast Pass queue system work?",
      a: "The Fast Pass grants unlimited priority access through dedicated express queues at major attractions including Formula Rossa, Flying Aces, and Turbo Track, bypassing regular wait lines.",
    },
    {
      q: "Is there complimentary shuttle transportation across Yas Island?",
      a: "Yes. The Yas Express operates daily complimentary air-conditioned shuttle services connecting Ferrari World, Yas Mall, Yas Waterworld, Warner Bros. World, and major Yas Island luxury hotels.",
    },
  ];

  const heightRules = [
    { ride: "Formula Rossa", min: "140 cm", max: "195 cm", restriction: "Protective eyewear required" },
    { ride: "Flying Aces", min: "130 cm", max: "196 cm", restriction: "51° climb harness restraint" },
    { ride: "Turbo Track", min: "130 cm", max: "196 cm", restriction: "Vertical reverse launch" },
    { ride: "Junior Grand Prix", min: "110 cm", max: "140 cm", restriction: "Supervised kart racing" },
    { ride: "Bell'Italia", min: "All Ages", max: "None", restriction: "Children accompanied by adult" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current?.querySelectorAll(".visit-card");
    if (!cards || !cards.length) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.set(cards, { y: 40, opacity: 0 });

    const anim = gsap.to(cards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardsRef.current,
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
      id="plan-visit"
      className="relative w-full bg-[#080808] text-white py-24 px-6 md:px-12 border-t border-white/10"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono-spec text-sm text-[#D40000] font-bold">07 //</span>
              <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
                PLAN YOUR EXPEDITION
              </AnimatedHeading>
            </div>
            <p className="font-sans-editorial text-sm sm:text-base text-white/60 max-w-xl mt-2">
              Everything you need for an unforgettable day at Yas Island: operating schedules,
              height restrictions, and transport logistics.
            </p>
          </div>

          <div className="font-mono-spec text-xs text-[#FFF200]">
            LOCATION: YAS ISLAND • ABU DHABI • UAE
          </div>
        </div>

        {/* Top 3 Info Cards with Staggered Entrance */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-b border-white/10">
          {/* Card 1: Hours */}
          <div className="visit-card bg-[#111111] border border-white/10 p-8 flex flex-col justify-between hover:border-[#D40000] transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 font-mono-spec text-xs text-[#D40000] font-bold uppercase mb-4">
                <Clock className="w-4 h-4" />
                <span>OPERATING HOURS</span>
              </div>
              <div className="font-display text-3xl text-white uppercase">11:00 AM – 8:00 PM</div>
              <div className="font-mono-spec text-xs text-[#FFF200] mt-1">OPEN 365 DAYS A YEAR</div>
              <p className="font-sans-editorial text-xs text-white/60 mt-4 leading-relaxed">
                Park gates open at 10:45 AM for pre-show boarding. Ride queues close 15 minutes before
                official closing time.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono-spec text-[11px] text-white/40">
              TIMEZONE: GULF STANDARD TIME (GST / UTC+4)
            </div>
          </div>

          {/* Card 2: Getting There */}
          <div className="visit-card bg-[#111111] border border-white/10 p-8 flex flex-col justify-between hover:border-[#D40000] transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 font-mono-spec text-xs text-[#D40000] font-bold uppercase mb-4">
                <Navigation className="w-4 h-4" />
                <span>GETTING HERE</span>
              </div>
              <div className="font-display text-3xl text-white uppercase">YAS ISLAND HIGHWAY</div>
              <div className="font-mono-spec text-xs text-white/60 mt-1">E11 SHEIKH ZAYED ROAD</div>
              <ul className="font-mono-spec text-xs text-white/70 mt-4 space-y-2">
                <li>• 10 mins from Abu Dhabi Int&apos;l Airport</li>
                <li>• 50 mins from Downtown Dubai</li>
                <li>• Free valet parking at Yas Mall Fashion Gate</li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono-spec text-[11px] text-[#FFF200]">
              YAS EXPRESS SHUTTLE COMPLIMENTARY
            </div>
          </div>

          {/* Card 3: Interactive GPS & Map */}
          <div className="visit-card bg-[#111111] border border-white/10 p-8 flex flex-col justify-between hover:border-[#D40000] transition-all duration-300">
            <div>
              <div className="flex items-center gap-2 font-mono-spec text-xs text-[#D40000] font-bold uppercase mb-4">
                <MapPin className="w-4 h-4" />
                <span>GPS TELEMETRY</span>
              </div>
              <div className="font-mono-spec text-xl text-white font-bold">24°29&apos;01&quot;N 54°36&apos;25&quot;E</div>
              <div className="font-mono-spec text-xs text-white/60 mt-1">CONNECTED DIRECTLY TO YAS MALL</div>
              <p className="font-sans-editorial text-xs text-white/60 mt-4 leading-relaxed">
                Direct indoor air-conditioned bridge connection through Yas Mall luxury boulevard.
                Drop-off zone at Ferrari World Main Plaza.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 font-mono-spec text-[11px] text-white/40">
              VALET & STANDARD PARKING: 2,500+ SPACES
            </div>
          </div>
        </div>

        {/* Height & Safety Restrictions Table */}
        <div className="py-16 border-b border-white/10">
          <div className="flex items-center gap-2 font-mono-spec text-xs text-[#D40000] font-bold uppercase mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>// SAFETY PROTOCOLS & RIDER CRITERIA</span>
          </div>
          <h3 className="font-display text-3xl uppercase tracking-wide text-white mb-6">
            HEIGHT RESTRICTIONS MATRIX
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono-spec text-xs border border-white/10">
              <thead className="bg-[#171717] text-white/50 border-b border-white/10">
                <tr>
                  <th className="p-4 uppercase">Attraction</th>
                  <th className="p-4 uppercase">Min Height</th>
                  <th className="p-4 uppercase">Max Height</th>
                  <th className="p-4 uppercase">Safety Restraint & Guidelines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {heightRules.map((rule) => (
                  <tr key={rule.ride} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-white">{rule.ride}</td>
                    <td className="p-4 text-[#FFF200]">{rule.min}</td>
                    <td className="p-4 text-white/70">{rule.max}</td>
                    <td className="p-4 text-white/60">{rule.restriction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="pt-16">
          <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold tracking-widest block mb-2">
            // FREQUENTLY ASKED QUESTIONS
          </span>
          <h3 className="font-display text-3xl uppercase tracking-wide text-white mb-8">
            VISITOR ESSENTIALS & POLICIES
          </h3>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-5">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left font-sans-editorial text-base sm:text-lg text-white font-medium hover:text-[#FFF200] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/40 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180 text-[#D40000]" : ""
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="pt-3 pb-2 font-sans-editorial text-sm text-white/70 leading-relaxed max-w-3xl animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
