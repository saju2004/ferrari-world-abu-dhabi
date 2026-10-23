"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  asLink?: boolean;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 35,
  asLink = false,
  href,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power4.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power4.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      // Magnetic field within 80px
      if (distance < 80) {
        const deltaX = (e.clientX - centerX) * (strength / 100);
        const deltaY = (e.clientY - centerY) * (strength / 100);
        xTo(deltaX);
        yTo(deltaY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  const innerContent = (
    <>
      {/* Red Fill sweep on hover */}
      <span
        ref={fillRef}
        className="absolute inset-0 bg-[#D40000] -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 pointer-events-none"
      />
      <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
        {children}
      </span>
    </>
  );

  const baseStyles = `group relative overflow-hidden inline-flex items-center justify-center cursor-pointer select-none ${className}`;

  if (asLink && href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        data-cursor-text="GO"
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={baseStyles}
      {...props}
    >
      {innerContent}
    </button>
  );
}
