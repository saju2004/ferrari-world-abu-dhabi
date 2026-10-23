import type { Metadata, Viewport } from "next";
import { Bebas_Neue, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import SpeedLinesBackground from "@/components/ui/SpeedLinesBackground";
import PageTransition from "@/components/ui/PageTransition";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ferrari World Abu Dhabi — Yas Island | Feel the Speed",
  description:
    "Experience the world's fastest roller coaster, legendary Maranello supercars, 360° interactive showroom, and Scuderia Ferrari F1 heritage at Yas Island, Abu Dhabi.",
  keywords: [
    "Ferrari World",
    "Abu Dhabi",
    "Yas Island",
    "Formula Rossa",
    "Flying Aces",
    "Scuderia Ferrari",
    "Supercars",
    "Roller Coaster",
  ],
  authors: [{ name: "Creative Studio Concept" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${spaceMono.variable} dark`}
    >
      <body className="bg-[#0B0B0B] text-[#F2EFEA] antialiased selection:bg-[#D40000] selection:text-white relative">
        <SmoothScroll>
          <div className="noise-overlay" aria-hidden="true" />
          <SpeedLinesBackground />
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
