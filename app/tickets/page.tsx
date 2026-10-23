import Link from "next/link";
import { ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import BookingWidget from "@/components/sections/BookingWidget";

export const metadata = {
  title: "Official Ticket Configurator — Ferrari World Abu Dhabi",
  description:
    "Configure your 1-Day, Fast-Track, and Yas Theme Parks passes for Ferrari World Abu Dhabi.",
};

export default function TicketsPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-16 flex-1">
        {/* Breadcrumb banner */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 border-b border-white/10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono-spec text-xs uppercase tracking-wider text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#D40000]" />
            <span>RETURN TO MAIN PARK OVERVIEW</span>
          </Link>

          <div className="flex items-center gap-2 font-mono-spec text-xs text-[#FFF200]">
            <ShieldCheck className="w-4 h-4 text-[#FFF200]" />
            <span>OFFICIAL CONCEPT TICKETING PORTAL</span>
          </div>
        </div>

        {/* Embedded Booking Engine */}
        <BookingWidget />
      </main>

      <Footer />
    </div>
  );
}
