"use client";

import React, { useEffect, useRef } from "react";

export default function SpeedLinesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Speed lines pool
    const lineCount = 35;
    const lines = Array.from({ length: lineCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 140 + 60,
      speed: Math.random() * 8 + 6,
      opacity: Math.random() * 0.35 + 0.05,
      width: Math.random() * 1.5 + 0.5,
      isRed: Math.random() > 0.4, // mix of Rosso Corsa and faint white
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.lineWidth = line.width;
        ctx.strokeStyle = line.isRed
          ? `rgba(212, 0, 0, ${line.opacity})`
          : `rgba(255, 255, 255, ${line.opacity * 0.4})`;

        // Draw horizontal high-speed streak with slant
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x - line.length, line.y + line.length * 0.15);
        ctx.stroke();

        // Advance line position
        line.x += line.speed;
        line.y += line.speed * 0.15;

        // Wrap around when off screen
        if (line.x - line.length > width || line.y > height) {
          line.x = -Math.random() * 100;
          line.y = Math.random() * height;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-40 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
