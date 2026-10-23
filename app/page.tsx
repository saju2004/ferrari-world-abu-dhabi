"use client";

import { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import RidesHorizontal from "@/components/sections/RidesHorizontal";
import CarsSlideshow from "@/components/sections/CarsSlideshow";
import Car360Viewer from "@/components/sections/Car360Viewer";
import CarsArchive from "@/components/sections/CarsArchive";
import F1Heritage from "@/components/sections/F1Heritage";
import HeritageLogos from "@/components/sections/HeritageLogos";
import PlanVisit from "@/components/sections/PlanVisit";
import BookingWidget from "@/components/sections/BookingWidget";

export default function HomePage() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-[#F2EFEA]">
      {/* Rev-Counter Analog/Digital Preloader */}
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* Editorial Sticky Navigation */}
      <Header />

      <main className="relative z-10 flex flex-col">
        {/* 01. Hero Experience */}
        <Hero />

        {/* 02. Pinned Horizontal Rides & Coasters */}
        <RidesHorizontal />

        {/* 03. Fullscreen Cars Showcase Slideshow */}
        <CarsSlideshow />

        {/* 04. Interactive 360° Configuration Studio */}
        <Car360Viewer />

        {/* 05. The Complete Maranello Archive Grid */}
        <CarsArchive />

        {/* 06. Scuderia Ferrari Formula 1 Paddock */}
        <F1Heritage />

        {/* 07. Respectful Heritage Marks Wall */}
        <HeritageLogos />

        {/* 08. Plan Your Visit Logistics & FAQ */}
        <PlanVisit />

        {/* 09. Pass & Ticket Configurator Flow */}
        <BookingWidget />
      </main>

      {/* 10. Large Outlined Branding & Legal Footer */}
      <Footer />
    </div>
  );
}
