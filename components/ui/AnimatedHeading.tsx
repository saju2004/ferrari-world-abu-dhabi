"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

interface AnimatedHeadingProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  delay?: number;
  triggerHook?: string;
  splitBy?: "chars" | "words" | "lines";
}

export default function AnimatedHeading({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  triggerHook = "top 88%",
  splitBy = "chars",
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = headingRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize SplitType
    let splitInstance: SplitType | null = null;
    try {
      splitInstance = new SplitType(el, {
        types: splitBy === "chars" ? "chars,words" : splitBy === "words" ? "words" : "lines",
        tagName: "span",
      });
    } catch {
      return;
    }

    const targets =
      splitBy === "chars"
        ? splitInstance.chars
        : splitBy === "words"
        ? splitInstance.words
        : splitInstance.lines;

    if (!targets || targets.length === 0) return;

    // Wrap in overflow-hidden spans for clean mask clipping
    targets.forEach((target) => {
      target.style.display = "inline-block";
      target.style.overflow = "hidden";
      target.style.verticalAlign = "top";
    });

    gsap.set(targets, { yPercent: 110, opacity: 0 });

    const anim = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 0.85,
      stagger: 0.035,
      ease: "power4.out",
      delay: delay,
      scrollTrigger: {
        trigger: el,
        start: triggerHook,
        toggleActions: "play none none none",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
      if (splitInstance) splitInstance.revert();
    };
  }, [delay, triggerHook, splitBy]);

  return React.createElement(
    Component,
    {
      ref: headingRef,
      className: `select-none ${className}`,
    },
    children
  );
}
