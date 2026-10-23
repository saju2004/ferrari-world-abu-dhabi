export interface TicketPackage {
  id: string;
  name: string;
  badge: string;
  priceAdultAED: number;
  priceChildAED: number;
  fastTrackIncluded: boolean;
  tagline: string;
  description: string;
  perks: string[];
}

export const TICKET_PACKAGES: TicketPackage[] = [
  {
    id: "general-admission",
    name: "1-Day General Admission",
    badge: "Standard",
    priceAdultAED: 345,
    priceChildAED: 265,
    fastTrackIncluded: false,
    tagline: "Unlimited access to all rides & world-record coasters",
    description: "Full day access to over 40 high-octane rides, family attractions, live Italian shows, and the Ferrari car gallery.",
    perks: [
      "Access to Formula Rossa & Flying Aces",
      "Free park-wide high-speed Wi-Fi",
      "Complimentary luggage storage locker",
      "Valid on selected date with full re-entry",
    ],
  },
  {
    id: "express-pass",
    name: "1-Day Ticket + Fast Pass",
    badge: "Most Popular",
    priceAdultAED: 495,
    priceChildAED: 415,
    fastTrackIncluded: true,
    tagline: "Priority fast-track lane on top thrill rides",
    description: "Maximize your track time with dedicated priority queue jump at Formula Rossa, Flying Aces, Turbo Track, and simulators.",
    perks: [
      "Unlimited Fast-Track lane access on selected rides",
      "Save up to 75% wait times during peak hours",
      "Includes general admission full-day privileges",
      "Dedicated park entry fast-track turnstile",
    ],
  },
  {
    id: "yas-multi-park",
    name: "Yas 2-Park Combo Pass",
    badge: "Best Value",
    priceAdultAED: 475,
    priceChildAED: 395,
    fastTrackIncluded: false,
    tagline: "Ferrari World + Warner Bros. or Yas Waterworld",
    description: "Combine the thrill of Maranello with your choice of Yas Waterworld, Warner Bros. World, or SeaWorld Abu Dhabi within 14 days.",
    perks: [
      "Choose any 2 Yas Island world-class theme parks",
      "Flexible 14-day redemption window",
      "Free Yas Island Express shuttle transfers",
      "Exclusive 15% discount at official merchandise stores",
    ],
  },
  {
    id: "vip-scuderia-experience",
    name: "VIP Scuderia Experience",
    badge: "Exclusive",
    priceAdultAED: 1250,
    priceChildAED: 950,
    fastTrackIncluded: true,
    tagline: "Personal concierge, lounge access & roof walk",
    description: "The pinnacle Maranello hospitality package. Private host, VIP lounge dining, unlimited fast-track, and rooftop walk atop the iconic red canopy.",
    perks: [
      "Private VIP Concierge host for your party",
      "Rooftop Walk experience atop the 200,000m² red canopy",
      "Unlimited VIP priority access on all attractions",
      "Complimentary gourmet lunch at Ristorante Cavallino",
      "Valet parking & exclusive Ferrari World gift box",
    ],
  },
];

export interface TicketAddon {
  id: string;
  name: string;
  priceAED: number;
  description: string;
}

export const TICKET_ADDONS: TicketAddon[] = [
  {
    id: "meal-voucher",
    name: "Cavallino Italian Dining Voucher",
    priceAED: 95,
    description: "Combo meal + dessert + beverage at any dining venue inside the park.",
  },
  {
    id: "sim-experience",
    name: "Scuderia F1 Simulator 15-Min Slot",
    priceAED: 110,
    description: "Guaranteed scheduled session in the motion-base F1 driver training simulator.",
  },
  {
    id: "photo-pass",
    name: "Digital Ride Photo Pass (Unlimited)",
    priceAED: 85,
    description: "High-resolution on-ride captures from Formula Rossa, Flying Aces, and apex cameras.",
  },
];
