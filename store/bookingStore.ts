import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TICKET_PACKAGES, TICKET_ADDONS } from "@/data/tickets";

export interface BookingState {
  currentStep: number; // 1, 2, 3, 4, 5 (5 is confirmation)
  selectedPackageId: string;
  selectedDate: string; // ISO date string e.g. "2026-10-25"
  adultsCount: number;
  childrenCount: number;
  selectedAddonIds: string[];
  
  // Contact details
  fullName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;

  // Confirmation result
  bookingReference: string | null;
  confirmedAt: string | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  selectPackage: (id: string) => void;
  setDate: (date: string) => void;
  setAdults: (count: number) => void;
  setChildren: (count: number) => void;
  toggleAddon: (id: string) => void;
  setContactDetails: (details: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    specialRequests?: string;
  }) => void;
  confirmBooking: () => string; // returns booking reference
  resetBooking: () => void;

  // Computed helper
  calculateTotalAED: () => {
    ticketsTotal: number;
    addonsTotal: number;
    subtotal: number;
    vatAED: number; // 5% UAE VAT
    grandTotalAED: number;
  };
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      selectedPackageId: "express-pass",
      selectedDate: "2026-10-25",
      adultsCount: 2,
      childrenCount: 0,
      selectedAddonIds: [],
      fullName: "",
      email: "",
      phone: "",
      country: "United Arab Emirates",
      specialRequests: "",
      bookingReference: null,
      confirmedAt: null,

      setStep: (step) => set({ currentStep: Math.min(Math.max(step, 1), 5) }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 5) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

      selectPackage: (id) => set({ selectedPackageId: id }),
      setDate: (date) => set({ selectedDate: date }),
      setAdults: (count) => set({ adultsCount: Math.max(1, count) }),
      setChildren: (count) => set({ childrenCount: Math.max(0, count) }),
      
      toggleAddon: (id) =>
        set((state) => {
          const exists = state.selectedAddonIds.includes(id);
          return {
            selectedAddonIds: exists
              ? state.selectedAddonIds.filter((item) => item !== id)
              : [...state.selectedAddonIds, id],
          };
        }),

      setContactDetails: (details) =>
        set({
          fullName: details.fullName,
          email: details.email,
          phone: details.phone,
          country: details.country,
          specialRequests: details.specialRequests || "",
        }),

      confirmBooking: () => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        const char = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const ref = `FWAD-${rand}-${char}`;
        set({
          bookingReference: ref,
          confirmedAt: new Date().toISOString(),
          currentStep: 5,
        });
        return ref;
      },

      resetBooking: () =>
        set({
          currentStep: 1,
          selectedPackageId: "express-pass",
          selectedDate: "2026-10-25",
          adultsCount: 2,
          childrenCount: 0,
          selectedAddonIds: [],
          fullName: "",
          email: "",
          phone: "",
          country: "United Arab Emirates",
          specialRequests: "",
          bookingReference: null,
          confirmedAt: null,
        }),

      calculateTotalAED: () => {
        const state = get();
        const pkg = TICKET_PACKAGES.find((p) => p.id === state.selectedPackageId) || TICKET_PACKAGES[0];
        
        const ticketsTotal =
          state.adultsCount * pkg.priceAdultAED + state.childrenCount * pkg.priceChildAED;

        const totalGuests = state.adultsCount + state.childrenCount;
        const addonsTotal = state.selectedAddonIds.reduce((sum, addonId) => {
          const addon = TICKET_ADDONS.find((a) => a.id === addonId);
          return sum + (addon ? addon.priceAED * totalGuests : 0);
        }, 0);

        const subtotal = ticketsTotal + addonsTotal;
        const vatAED = Math.round(subtotal * 0.05); // 5% UAE VAT
        const grandTotalAED = subtotal + vatAED;

        return {
          ticketsTotal,
          addonsTotal,
          subtotal,
          vatAED,
          grandTotalAED,
        };
      },
    }),
    {
      name: "ferrari-world-booking-session",
      partialize: (state) => ({
        selectedPackageId: state.selectedPackageId,
        selectedDate: state.selectedDate,
        adultsCount: state.adultsCount,
        childrenCount: state.childrenCount,
        selectedAddonIds: state.selectedAddonIds,
      }),
    }
  )
);
