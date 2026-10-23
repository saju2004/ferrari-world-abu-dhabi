"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    // Live Abu Dhabi GST Time (UTC+4)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navLinks = [
    { num: "01", label: "Rides & Thrills", href: "#rides" },
    { num: "02", label: "Cars Showcase", href: "#cars-showcase" },
    { num: "03", label: "360° Studio", href: "#studio-360" },
    { num: "04", label: "F1 Heritage", href: "#f1-heritage" },
    { num: "05", label: "Plan Your Visit", href: "#plan-visit" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#0B0B0B]/90 backdrop-blur-md py-3 border-b border-white/10"
            : "bg-gradient-to-b from-[#0B0B0B]/80 to-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Identity / Shield Logo */}
          <Link
            href="/"
            className="group flex items-center gap-4 transition-transform duration-300 hover:scale-[1.02]"
            data-cursor-text="MARANELLO"
          >
            <div className="relative w-8 h-10 md:w-9 md:h-11">
              <Image
                src="/assets/logos/ferrari-shield.png"
                alt="Ferrari Shield"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg md:text-xl tracking-wider text-white leading-none">
                FERRARI WORLD
              </span>
              <span className="font-mono-spec text-[9px] uppercase tracking-[0.25em] text-[#D40000] font-bold">
                ABU DHABI • YAS ISLAND
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative flex items-center gap-1.5 py-1 text-xs font-mono-spec tracking-wider text-white/70 hover:text-white transition-colors"
                data-cursor-text="EXPLORE"
              >
                <span className="text-[10px] text-[#D40000] font-mono-spec opacity-80 group-hover:opacity-100">
                  {link.num}
                </span>
                <span className="uppercase">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D40000] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Local Time Telemetry & Book Tickets CTA */}
          <div className="hidden sm:flex items-center gap-6">
            <div className="hidden xl:flex flex-col text-right font-mono-spec text-[10px] tracking-wider text-white/50">
              <span className="text-white/80 font-bold">{currentTime} GST</span>
              <span className="text-[#FFF200]">OPEN TODAY • 11:00–20:00</span>
            </div>

            <MagneticButton
              asLink
              href="/tickets"
              className="px-5 py-2.5 bg-[#D40000] text-white font-mono-spec text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(212,0,0,0.5)]"
            >
              <span>Book Tickets</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ml-1" />
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-3">
            <Link
              href="/tickets"
              className="px-3 py-1.5 bg-[#D40000] text-white font-mono-spec text-[11px] uppercase tracking-wider font-bold"
            >
              Tickets
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0B0B] flex flex-col justify-between px-8 py-24 sm:hidden">
          <div className="flex flex-col gap-6">
            <div className="font-mono-spec text-xs tracking-widest text-[#D40000] uppercase">
              // INDEX NAVIGATION
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-baseline gap-4 py-2 border-b border-white/10"
              >
                <span className="font-mono-spec text-sm text-[#D40000]">{link.num}</span>
                <span className="font-display text-3xl tracking-wide text-white uppercase">
                  {link.label}
                </span>
              </a>
            ))}
            <Link
              href="/tickets"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-between p-4 bg-[#D40000] text-white font-mono-spec text-sm uppercase tracking-wider font-bold"
            >
              <span>Instant Ticket Booking</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-col gap-2 font-mono-spec text-xs text-white/40 border-t border-white/10 pt-4">
            <div className="text-white/80">YAS ISLAND, ABU DHABI, UAE</div>
            <div>LOCAL TIME: {currentTime} GST</div>
            <div className="text-[10px] text-[#FFF200]">
              Concept / fan project. Not the official Ferrari World Abu Dhabi website.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
