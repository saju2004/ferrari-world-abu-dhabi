"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  parallax?: boolean;
  aspectRatio?: string;
}

export default function AnimatedImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  priority = false,
  parallax = true,
  aspectRatio = "aspect-video",
}: AnimatedImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(container, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(inner, { scale: 1, yPercent: 0 });
      return;
    }

    // Initial state: clip from bottom to top & inner scale 1.3
    gsap.set(container, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(inner, { scale: 1.3 });

    // Entrance clip-path reveal
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    revealTl
      .to(container, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power4.out",
      })
      .to(
        inner,
        {
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        "<"
      );

    // Parallax animation tied to scroll scrub
    let parallaxAnim: gsap.core.Tween | null = null;
    if (parallax) {
      parallaxAnim = gsap.fromTo(
        inner,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    return () => {
      revealTl.scrollTrigger?.kill();
      revealTl.kill();
      if (parallaxAnim) {
        parallaxAnim.scrollTrigger?.kill();
        parallaxAnim.kill();
      }
    };
  }, [parallax]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${aspectRatio} ${className}`}
      style={{ willChange: "clip-path" }}
    >
      <div
        ref={innerRef}
        className="relative w-full h-full scale-105"
        style={{ willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-cover ${imgClassName}`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
