"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { TICKET_PACKAGES, TICKET_ADDONS } from "@/data/tickets";
import AnimatedHeading from "@/components/ui/AnimatedHeading";
import CounterNumber from "@/components/ui/CounterNumber";
import MagneticButton from "@/components/ui/MagneticButton";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid contact phone number"),
  country: z.string().min(2, "Please enter your country of residence"),
  specialRequests: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function BookingWidget() {
  const {
    currentStep,
    setStep,
    nextStep,
    prevStep,
    selectedPackageId,
    selectPackage,
    selectedDate,
    setDate,
    adultsCount,
    setAdults,
    childrenCount,
    setChildren,
    selectedAddonIds,
    toggleAddon,
    setContactDetails,
    confirmBooking,
    resetBooking,
    bookingReference,
    calculateTotalAED,
  } = useBookingStore();

  const [stepDirection, setStepDirection] = useState(1);
  const [typedRef, setTypedRef] = useState("");

  const selectedPkg =
    TICKET_PACKAGES.find((p) => p.id === selectedPackageId) || TICKET_PACKAGES[0];

  const totals = calculateTotalAED();

  // Contact form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "United Arab Emirates",
      specialRequests: "",
    },
  });

  const onSubmitContact = (data: ContactFormData) => {
    setContactDetails(data);
    const ref = confirmBooking();
    setStepDirection(1);

    // Trigger celebratory confetti speed bursts
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D40000", "#FFF200", "#FFFFFF"],
      });
    } catch {
      // Ignored if canvas not supported
    }
  };

  // Typewriter effect for booking reference on final screen
  useEffect(() => {
    if (currentStep === 5 && bookingReference) {
      setTypedRef("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < bookingReference.length) {
          setTypedRef((prev) => prev + bookingReference.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [currentStep, bookingReference]);

  // Calendar dates
  const [upcomingDates, setUpcomingDates] = useState<
    { iso: string; dayName: string; dayNum: number; month: string; isWeekend: boolean }[]
  >([]);

  useEffect(() => {
    const dates = Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      const iso = d.toISOString().split("T")[0];
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const isWeekend = d.getDay() === 5 || d.getDay() === 6 || d.getDay() === 0;
      return { iso, dayName, dayNum, month, isWeekend };
    });
    setUpcomingDates(dates);
  }, []);

  const handleNext = () => {
    setStepDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setStepDirection(-1);
    prevStep();
  };

  const officialBookingUrl =
    process.env.NEXT_PUBLIC_OFFICIAL_BOOKING_URL ||
    "https://www.ferrariworldabudhabi.com/en/booking";

  // Step progress percentage for moving car icon
  const stepPercent = ((currentStep - 1) / 3) * 100;

  return (
    <section
      id="booking-flow"
      className="relative w-full bg-[#0A0A0A] text-white py-24 px-6 md:px-12 border-t border-white/10"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 font-mono-spec text-xs uppercase tracking-widest text-[#D40000] font-bold mb-2">
            <Sparkles className="w-4 h-4 text-[#FFF200]" />
            <span>CONCEPT TICKETING ENGINE</span>
          </div>
          <AnimatedHeading as="h2" className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
            RESERVE YOUR SPEED EXPERIENCE
          </AnimatedHeading>
          <p className="font-sans-editorial text-sm sm:text-base text-white/60 mt-3">
            Select your preferred ticket tier, date, and party size. Instant voucher reservation
            with live rolling AED rate calculation.
          </p>
        </div>

        {/* Step Progress Bar With Moving Ferrari Car Icon */}
        {currentStep < 5 && (
          <div className="mb-12 relative">
            {/* Step Track */}
            <div className="relative h-1 bg-white/10 mb-8 rounded-full overflow-visible">
              <div
                className="h-full bg-[#D40000] shadow-[0_0_15px_#D40000] transition-all duration-500 ease-out"
                style={{ width: `${Math.min(stepPercent, 100)}%` }}
              />
              {/* Moving Car Icon along the bar */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -ml-3 w-7 h-5 flex items-center justify-center transition-all duration-500 ease-out"
                style={{ left: `${Math.min(stepPercent, 100)}%` }}
              >
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFF200] shadow-[0_0_12px_#FFF200] border-2 border-[#D40000] animate-pulse" />
              </div>
            </div>

            {/* Step Labels */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 font-mono-spec text-[10px] sm:text-xs">
              {[
                { num: 1, title: "1. TICKET TIER" },
                { num: 2, title: "2. DATE SELECTION" },
                { num: 3, title: "3. GUESTS & ADDONS" },
                { num: 4, title: "4. REVIEW & DETAILS" },
              ].map((step) => (
                <button
                  key={step.num}
                  onClick={() => {
                    if (step.num < currentStep) {
                      setStepDirection(-1);
                      setStep(step.num);
                    }
                  }}
                  disabled={step.num > currentStep}
                  className={`py-3 px-2 border-b-2 text-center transition-all cursor-pointer ${
                    step.num === currentStep
                      ? "border-[#D40000] text-white font-bold bg-white/5"
                      : step.num < currentStep
                      ? "border-[#FFF200] text-[#FFF200]"
                      : "border-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <span className="truncate block">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Directional Animated Step Transitions */}
        <AnimatePresence mode="wait">
          {/* Step 1: Choose Ticket Tier */}
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: stepDirection * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -stepDirection * 50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {TICKET_PACKAGES.map((pkg, idx) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onClick={() => selectPackage(pkg.id)}
                    className={`p-6 bg-[#121212] border flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "border-[#D40000] bg-[#D40000]/15 shadow-[0_0_35px_rgba(212,0,0,0.5)] scale-[1.03] -translate-y-2 ring-1 ring-[#D40000]"
                        : "border-white/10 hover:border-white/30 hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono-spec text-[10px] mb-3">
                        <span className="px-2 py-0.5 bg-white/10 text-[#FFF200] uppercase font-bold">
                          {pkg.badge}
                        </span>
                        {pkg.fastTrackIncluded && (
                          <span className="text-[#D40000] font-bold">FAST-TRACK INCLUDED</span>
                        )}
                      </div>

                      <h3 className="font-display text-2xl uppercase tracking-wide text-white mb-2">
                        {pkg.name}
                      </h3>

                      <div className="font-mono-spec text-3xl font-bold text-white tracking-tight my-4">
                        <CounterNumber value={pkg.priceAdultAED} />{" "}
                        <span className="text-sm font-normal text-white/50">AED</span>
                      </div>

                      <p className="font-sans-editorial text-xs text-white/60 mb-6 leading-relaxed">
                        {pkg.description}
                      </p>

                      <ul className="space-y-2 border-t border-white/10 pt-4 mb-6 font-mono-spec text-[11px] text-white/70">
                        {pkg.perks.map((perk, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D40000] shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      className={`w-full py-3 font-mono-spec text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#D40000] text-white shadow-lg"
                          : "bg-white/5 hover:bg-white/15 text-white/80"
                      }`}
                    >
                      {isSelected ? "TIER SELECTED" : "SELECT TIER"}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Step 2: Custom Date Selector with Ripple Selection */}
          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: stepDirection * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -stepDirection * 50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212] border border-white/10 p-8"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div>
                  <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold">
                    // PARK CALENDAR
                  </span>
                  <h3 className="font-display text-3xl uppercase tracking-wide text-white mt-1">
                    CHOOSE YOUR EXPEDITION DATE
                  </h3>
                </div>
                <div className="font-mono-spec text-xs text-[#FFF200]">
                  ALL ATTRACTIONS OPERATIONAL DAILY
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {upcomingDates.map((item, idx) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <motion.button
                      key={item.iso}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setDate(item.iso)}
                      className={`p-4 border text-center font-mono-spec flex flex-col items-center justify-between transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? "border-[#D40000] bg-[#D40000]/25 shadow-[0_0_20px_rgba(212,0,0,0.5)] ring-1 ring-[#D40000]"
                          : "border-white/10 bg-black/40 hover:border-white/30"
                      }`}
                    >
                      {/* Ripple highlight on selected */}
                      {isSelected && (
                        <span className="absolute inset-0 bg-[#D40000]/20 animate-ping pointer-events-none" />
                      )}
                      <span className="text-[10px] text-white/50 uppercase">{item.dayName}</span>
                      <span className="text-2xl font-bold text-white my-2">{item.dayNum}</span>
                      <span className="text-[10px] text-white/60">{item.month}</span>
                      <span
                        className={`text-[9px] mt-2 font-bold ${
                          item.isWeekend ? "text-[#FFF200]" : "text-white/40"
                        }`}
                      >
                        {item.isWeekend ? "WEEKEND" : "FAST TRACK"}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3: Guests & Addons with Rolling Totals */}
          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: stepDirection * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -stepDirection * 50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Guest Counters */}
              <div className="lg:col-span-6 bg-[#121212] border border-white/10 p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold">
                    // PARTY SPECIFICATIONS
                  </span>
                  <h3 className="font-display text-3xl uppercase tracking-wide text-white mt-1 mb-8">
                    SELECT GUESTS
                  </h3>

                  {/* Adults Counter */}
                  <div className="flex items-center justify-between py-6 border-y border-white/10">
                    <div>
                      <div className="font-mono-spec text-base font-bold text-white uppercase">
                        Adult Guests (12+ YRS)
                      </div>
                      <div className="font-mono-spec text-xs text-white/50 mt-0.5">
                        {selectedPkg.priceAdultAED} AED per guest
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setAdults(adultsCount - 1)}
                        className="w-10 h-10 border border-white/20 hover:border-white flex items-center justify-center transition-colors cursor-pointer"
                        disabled={adultsCount <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-mono-spec text-2xl font-bold text-white w-6 text-center">
                        <CounterNumber value={adultsCount} duration={0.4} />
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults(adultsCount + 1)}
                        className="w-10 h-10 border border-white/20 hover:border-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Children Counter */}
                  <div className="flex items-center justify-between py-6 border-b border-white/10">
                    <div>
                      <div className="font-mono-spec text-base font-bold text-white uppercase">
                        Junior Guests (3–11 YRS)
                      </div>
                      <div className="font-mono-spec text-xs text-white/50 mt-0.5">
                        {selectedPkg.priceChildAED} AED per guest (Under 3 free)
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setChildren(childrenCount - 1)}
                        className="w-10 h-10 border border-white/20 hover:border-white flex items-center justify-center transition-colors cursor-pointer"
                        disabled={childrenCount <= 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-mono-spec text-2xl font-bold text-white w-6 text-center">
                        <CounterNumber value={childrenCount} duration={0.4} />
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren(childrenCount + 1)}
                        className="w-10 h-10 border border-white/20 hover:border-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="lg:col-span-6 bg-[#121212] border border-white/10 p-8">
                <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold">
                  // UPGRADES & HOSPITALITY
                </span>
                <h3 className="font-display text-3xl uppercase tracking-wide text-white mt-1 mb-6">
                  OPTIONAL MOTORSPORT ADD-ONS
                </h3>

                <div className="space-y-4">
                  {TICKET_ADDONS.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-4 border flex items-center justify-between gap-4 transition-all cursor-pointer ${
                          isChecked
                            ? "border-[#D40000] bg-[#D40000]/15 shadow-[0_0_15px_rgba(212,0,0,0.3)]"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center ${
                              isChecked ? "bg-[#D40000] border-[#D40000]" : "border-white/30"
                            }`}
                          >
                            {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <div className="font-mono-spec text-sm font-bold text-white">
                              {addon.name}
                            </div>
                            <div className="font-sans-editorial text-xs text-white/60">
                              {addon.description}
                            </div>
                          </div>
                        </div>

                        <div className="font-mono-spec text-sm font-bold text-[#FFF200] shrink-0">
                          +{addon.priceAED} AED
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact Details & Validation */}
          {currentStep === 4 && (
            <motion.form
              key="step-4"
              initial={{ opacity: 0, x: stepDirection * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -stepDirection * 50 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit(onSubmitContact)}
              className="bg-[#121212] border border-white/10 p-8 md:p-12"
            >
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 pb-6 border-b border-white/10">
                  <span className="font-mono-spec text-xs text-[#D40000] uppercase font-bold">
                    // GUEST CREDENTIALS
                  </span>
                  <h3 className="font-display text-4xl uppercase tracking-tight text-white mt-1">
                    FINAL PASS RESERVATION
                  </h3>
                  <p className="font-sans-editorial text-xs text-white/50 mt-1">
                    Your electronic entry confirmation voucher will be generated immediately.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block font-mono-spec text-xs uppercase tracking-wider text-white/80 mb-2">
                      Primary Guest Full Name *
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="e.g. Charles Leclerc"
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 font-mono-spec text-sm text-white focus:outline-none focus:border-[#D40000]"
                    />
                    {errors.fullName && (
                      <span className="text-xs text-[#D40000] font-mono-spec mt-1 block">
                        {errors.fullName.message}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono-spec text-xs uppercase tracking-wider text-white/80 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="e.g. c.leclerc@scuderia.com"
                        className="w-full bg-black/50 border border-white/15 px-4 py-3 font-mono-spec text-sm text-white focus:outline-none focus:border-[#D40000]"
                      />
                      {errors.email && (
                        <span className="text-xs text-[#D40000] font-mono-spec mt-1 block">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono-spec text-xs uppercase tracking-wider text-white/80 mb-2">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-black/50 border border-white/15 px-4 py-3 font-mono-spec text-sm text-white focus:outline-none focus:border-[#D40000]"
                      />
                      {errors.phone && (
                        <span className="text-xs text-[#D40000] font-mono-spec mt-1 block">
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono-spec text-xs uppercase tracking-wider text-white/80 mb-2">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      {...register("country")}
                      placeholder="United Arab Emirates"
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 font-mono-spec text-sm text-white focus:outline-none focus:border-[#D40000]"
                    />
                    {errors.country && (
                      <span className="text-xs text-[#D40000] font-mono-spec mt-1 block">
                        {errors.country.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono-spec text-xs uppercase tracking-wider text-white/80 mb-2">
                      Special Inquiries or Accessibility Requests (Optional)
                    </label>
                    <textarea
                      {...register("specialRequests")}
                      rows={2}
                      placeholder="Wheelchair assistance, VIP parking notes, or dietary preferences..."
                      className="w-full bg-black/50 border border-white/15 px-4 py-3 font-mono-spec text-sm text-white focus:outline-none focus:border-[#D40000]"
                    />
                  </div>

                  <div className="pt-4">
                    <MagneticButton
                      type="submit"
                      className="w-full py-4 bg-[#D40000] text-white font-mono-spec text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(212,0,0,0.5)] cursor-pointer"
                    >
                      CONFIRM RESERVATION & GENERATE PASS
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </motion.form>
          )}

          {/* Step 5: Final Screen with Typewriter Reference */}
          {currentStep === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#121212] border border-[#D40000] p-8 md:p-12 text-center max-w-3xl mx-auto shadow-[0_0_60px_rgba(212,0,0,0.3)]"
            >
              <div className="w-16 h-16 rounded-full bg-[#D40000]/20 border border-[#D40000] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#D40000]" />
              </div>

              <span className="font-mono-spec text-xs text-[#FFF200] font-bold uppercase tracking-widest">
                // RESERVATION VOUCHER GENERATED
              </span>

              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white mt-1 mb-3">
                YOUR PASS IS PREPARED
              </h3>

              {/* Typewritten Booking Reference */}
              <div className="bg-black/70 border border-white/15 p-6 my-6 max-w-md mx-auto font-mono-spec">
                <div className="text-[11px] text-white/50 uppercase">OFFICIAL BOOKING REFERENCE</div>
                <div className="text-3xl sm:text-4xl font-bold text-[#FFF200] tracking-wider my-1 font-mono">
                  {typedRef || "..."}
                  <span className="animate-ping text-[#D40000]">_</span>
                </div>
                <div className="text-xs text-white/70">
                  DATE: {selectedDate} • {adultsCount} ADULTS
                  {childrenCount > 0 ? `, ${childrenCount} JUNIORS` : ""}
                </div>
              </div>

              <p className="font-sans-editorial text-sm text-white/80 max-w-lg mx-auto leading-relaxed mb-8">
                This concept booking has successfully recorded your reservation parameters. To finalize
                your tickets with official payment processing, proceed to the official Ferrari World Abu
                Dhabi portal.
              </p>

              {/* Official Ticketing Portal Link */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton
                  asLink
                  href={officialBookingUrl}
                  className="px-8 py-4 bg-[#D40000] text-white font-mono-spec text-sm uppercase tracking-wider font-bold shadow-[0_0_30px_rgba(212,0,0,0.6)]"
                >
                  <span>Complete on Official Ferrari World Website</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </MagneticButton>

                <MagneticButton
                  onClick={resetBooking}
                  className="px-6 py-4 border border-white/20 text-white font-mono-spec text-xs uppercase tracking-wider"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Configure Another Ticket</span>
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Bottom Summary Bar with Rolling Totals */}
        {currentStep < 4 && (
          <div className="mt-8 bg-[#161616] border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 font-mono-spec text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase">SELECTED TIER</span>
                <span className="text-white font-bold">{selectedPkg.name}</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-white/40 block text-[10px] uppercase">EXPEDITION DATE</span>
                <span className="text-white font-bold">{selectedDate}</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-white/40 block text-[10px] uppercase">GUESTS</span>
                <span className="text-white font-bold">
                  {adultsCount} Adult{adultsCount > 1 ? "s" : ""}
                  {childrenCount > 0 ? `, ${childrenCount} Junior` : ""}
                </span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div>
                <span className="text-white/40 block text-[10px] uppercase">ESTIMATED TOTAL</span>
                <span className="text-[#FFF200] font-bold text-base">
                  <CounterNumber value={totals.grandTotalAED} /> AED{" "}
                  <span className="text-[10px] font-normal text-white/50">(INCL. 5% VAT)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              {currentStep > 1 && (
                <MagneticButton
                  onClick={handlePrev}
                  className="px-5 py-3 border border-white/20 font-mono-spec text-xs uppercase tracking-wider text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                  <span>BACK</span>
                </MagneticButton>
              )}

              <MagneticButton
                onClick={handleNext}
                className="px-8 py-3 bg-[#D40000] font-mono-spec text-xs uppercase tracking-wider text-white font-bold shadow-[0_0_20px_rgba(212,0,0,0.4)]"
              >
                <span>CONTINUE</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
