import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck, Zap, Gauge, Wind, Scale } from "lucide-react";
import { FERRARI_CARS } from "@/data/cars";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Car360Viewer from "@/components/sections/Car360Viewer";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import MagneticButton from "@/components/ui/MagneticButton";

export function generateStaticParams() {
  return FERRARI_CARS.map((car) => ({
    slug: car.slug,
  }));
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = FERRARI_CARS.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <Header />

      <main className="pt-28 pb-20">
        {/* Top Breadcrumb & Return Nav */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-6 pb-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link
              href="/#cars-archive"
              className="inline-flex items-center gap-2 font-mono-spec text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#D40000]" />
              <span>RETURN TO MARANELLO ARCHIVE</span>
            </Link>

            <span className="font-mono-spec text-xs text-[#FFF200] uppercase font-bold">
              {car.category} // {car.year}
            </span>
          </div>
        </div>

        {/* Car Hero Editorial Section */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Title & Headline Info */}
            <div className="lg:col-span-6">
              <span className="font-mono-spec text-xs uppercase tracking-widest text-[#D40000] font-bold">
                SPECIFICATION BLUEPRINT // {car.chassisCode || "OFFICIAL REGISTRY"}
              </span>
              <AnimatedHeading as="h1" className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-white leading-[0.9] mt-2 mb-4">
                {car.name}
              </AnimatedHeading>
              <p className="font-mono-spec text-sm text-[#FFF200] uppercase tracking-wider mb-6">
                &ldquo;{car.tagline}&rdquo;
              </p>
              <p className="font-sans-editorial text-base sm:text-lg text-white/75 leading-relaxed mb-8">
                {car.story}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton
                  asLink
                  href="/tickets"
                  className="px-6 py-3.5 bg-[#D40000] text-white font-mono-spec text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(212,0,0,0.5)]"
                >
                  <span>Book Park Tickets To See Live</span>
                </MagneticButton>

                <MagneticButton
                  asLink
                  href="#spec-blueprint"
                  className="px-6 py-3.5 border border-white/20 text-white font-mono-spec text-xs uppercase tracking-wider"
                >
                  <span>View Full Specs</span>
                </MagneticButton>
              </div>
            </div>

            {/* High-Res Car Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[360px] md:min-h-[460px]">
              <div className="absolute w-[80%] h-[70%] bg-gradient-to-t from-[#D40000]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />
              <div className="relative w-full h-[320px] sm:h-[420px]">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 360 Interactive Viewer Integration */}
        <Car360Viewer carSlug={car.slug} />

        {/* Full Technical Blueprint Spec Table */}
        <section id="spec-blueprint" className="max-w-[1600px] mx-auto px-6 md:px-12 py-20">
          <div className="border-b border-white/10 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold tracking-widest">
                // FACTORY TELEMETRY DATA
              </span>
              <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white mt-1">
                ENGINEERING SPECIFICATIONS
              </AnimatedHeading>
            </div>
            <div className="font-mono-spec text-xs text-white/40">
              OFFICIAL MARANELLO HOMOLOGATION
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {car.specs.map((spec, i) => (
              <div
                key={spec.label}
                className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 font-mono-spec hover:border-white/20 transition-colors"
              >
                <span className="text-xs uppercase tracking-wider text-white/50">{spec.label}</span>
                <span className="text-xs sm:text-sm font-bold text-white text-right">
                  {spec.value}
                </span>
              </div>
            ))}

            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 font-mono-spec">
              <span className="text-xs uppercase tracking-wider text-white/50">Displacement</span>
              <span className="text-xs sm:text-sm font-bold text-white text-right">
                {car.displacement}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 font-mono-spec">
              <span className="text-xs uppercase tracking-wider text-white/50">Transmission</span>
              <span className="text-xs sm:text-sm font-bold text-white text-right">
                {car.gearbox}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 font-mono-spec">
              <span className="text-xs uppercase tracking-wider text-white/50">Chassis Layout</span>
              <span className="text-xs sm:text-sm font-bold text-white text-right">
                {car.layout}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#121212] border border-white/5 font-mono-spec">
              <span className="text-xs uppercase tracking-wider text-white/50">Dry Weight</span>
              <span className="text-xs sm:text-sm font-bold text-white text-right">
                {car.dryWeight}
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
