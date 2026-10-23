"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Engine sound synthesis (muted by default)
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(50, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscRef.current = osc;
        gainRef.current = gain;
        setSoundEnabled(true);
      } catch {
        setSoundEnabled(false);
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.2
        );
        setTimeout(() => {
          oscRef.current?.stop();
          audioCtxRef.current?.close();
        }, 250);
      }
      setSoundEnabled(false);
    }
  };

  // Modulate engine pitch with rev progress if sound enabled
  useEffect(() => {
    if (soundEnabled && oscRef.current && audioCtxRef.current) {
      const freq = 50 + (progress / 100) * 380; // 50Hz to 430Hz roar
      oscRef.current.frequency.setTargetAtTime(freq, audioCtxRef.current.currentTime, 0.05);
    }
  }, [progress, soundEnabled]);

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setProgress(100);
      setIsDone(true);
      setIsExited(true);
      if (onComplete) onComplete();
      return;
    }

    let start = 0;
    const interval = setInterval(() => {
      // Exponential rev curve
      const step = start < 60 ? 2 : start < 85 ? 3 : 5;
      start += step;
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        setProgress(100);
        setIsDone(true);

        // Curtain exit
        setTimeout(() => {
          setIsExited(true);
          if (onComplete) onComplete();
          // Fade audio
          if (gainRef.current && audioCtxRef.current) {
            gainRef.current.gain.exponentialRampToValueAtTime(
              0.0001,
              audioCtxRef.current.currentTime + 0.5
            );
            setTimeout(() => {
              oscRef.current?.stop();
              audioCtxRef.current?.close();
            }, 600);
          }
        }, 850);
      } else {
        setProgress(start);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (isExited) return null;

  // Rev counter needle angle: from -120deg (0) to +120deg (100)
  const baseAngle = -120 + (progress / 100) * 240;
  // Redline jitter
  const needleJitter = progress > 85 ? (Math.random() - 0.5) * 4 : 0;
  const needleAngle = baseAngle + needleJitter;

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-auto flex items-center justify-center overflow-hidden">
      {/* Top Split Curtain Panel in Rosso Corsa */}
      <div
        className={`absolute top-0 left-0 right-0 h-1/2 bg-[#0B0B0B] border-b-2 border-[#D40000] transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDone ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#D40000]/10 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Split Curtain Panel in Rosso Corsa */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#0B0B0B] border-t-2 border-[#D40000] transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDone ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#D40000]/10 to-transparent pointer-events-none" />
      </div>

      {/* Centerpiece Dial & Needle Content */}
      <div
        className={`relative z-20 flex flex-col items-center transition-all duration-500 ${
          isDone ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Ferrari Shield Mark */}
        <div className="relative w-12 h-16 mb-6 drop-shadow-[0_10px_25px_rgba(212,0,0,0.5)]">
          <Image
            src="/assets/logos/ferrari-shield.png"
            alt="Ferrari Shield"
            fill
            sizes="64px"
            className="object-contain"
            priority
          />
        </div>

        {/* Circular Rev Counter Tachometer Dial */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* Dial SVG Arcs */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
            {/* Background Arc */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="7"
              strokeDasharray="400"
              strokeDashoffset="100"
              strokeLinecap="round"
            />
            {/* Dynamic Sweeping Progress Arc */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke={progress > 85 ? "#FFF200" : "#D40000"}
              strokeWidth="7"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress / 100) * 300}
              strokeLinecap="round"
              className="transition-all duration-75 ease-out shadow-[0_0_15px_#D40000]"
            />
          </svg>

          {/* Dial Tick Marks & Needle */}
          <div className="absolute inset-4 rounded-full border border-white/10 flex items-center justify-center">
            {/* Redline Alert */}
            <div
              className={`absolute top-4 right-8 text-[10px] font-mono-spec tracking-widest uppercase font-bold transition-colors ${
                progress > 85 ? "text-[#FFF200] animate-pulse" : "text-white/30"
              }`}
            >
              REDLINE 8.5K
            </div>

            {/* Needle Pivot with Jitter */}
            <div
              className="absolute w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              <div className="w-1.5 h-26 bg-gradient-to-t from-[#D40000] to-[#FFF200] -translate-y-13 shadow-[0_0_15px_#D40000] rounded-t" />
            </div>

            {/* Central Dial Core */}
            <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 rounded-full bg-[#121212] border-2 border-[#D40000]/60 shadow-[0_0_30px_rgba(0,0,0,0.9)]">
              <span className="font-mono-spec text-4xl font-bold tracking-tight text-white">
                {progress}
              </span>
              <span className="font-mono-spec text-[9px] uppercase tracking-widest text-[#D40000] font-bold">
                RPM × 100
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Status Line */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D40000] animate-ping" />
            <span className="font-mono-spec text-xs tracking-widest uppercase text-white/80 font-bold">
              YAS ISLAND LAUNCH TELEMETRY
            </span>
          </div>
          <span className="font-mono-spec text-[10px] text-white/40 tracking-wider">
            24°29&apos;01&quot;N 54°36&apos;25&quot;E • ALL SYSTEMS NOMINAL
          </span>
        </div>

        {/* Audio Toggle & Skip */}
        <div className="mt-5 flex items-center gap-6">
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono-spec text-[10px] tracking-wider uppercase transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#FFF200]" />
                <span className="text-[#FFF200]">ENGINE REV ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
                <span>UNMUTE ENGINE REV</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setProgress(100);
              setIsDone(true);
              setTimeout(() => {
                setIsExited(true);
                if (onComplete) onComplete();
              }, 300);
            }}
            className="font-mono-spec text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            [ SKIP ]
          </button>
        </div>
      </div>
    </div>
  );
}
