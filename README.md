# Ferrari World Abu Dhabi (Yas Island) — Motion Studio Web Experience

A high-octane, award-level animated web experience for **Ferrari World Abu Dhabi (Yas Island)**. Built with Next.js App Router, TypeScript, GSAP, ScrollTrigger, Lenis, Framer Motion, and SplitType, designed like an editorial motion studio showcase.

> **Disclaimer**: Concept / fan project. Not the official Ferrari World Abu Dhabi website. Official marks and references are used under fair concept presentation.

---

## 🏎️ Key Features & Motion Architecture

* **Analog Rev-Counter Preloader**: Tachometer gauge counting 0–100% with redline vibration jitter, optional synthesized engine rev sound via Web Audio API, and dual split Rosso Corsa panel curtain exit.
* **Hero Experience with Pinned Scrub**: Letter-by-letter headline drop-in (`FEEL THE SPEED`), mouse-tracking 3D car perspective tilt, and pinned scroll scrub where the Ferrari accelerates off to the right while the headline slides left.
* **Speed Strip (Horizontal Pinned Coaster Track)**: GSAP ScrollTrigger pinned track across Formula Rossa (240 km/h in 4.9s), Flying Aces (51° incline, 63m loop), Turbo Track, and Junior GP with dynamic digital speedometers and image mask parallax.
* **Fullscreen Maranello Showcase**: Circle-wipe slide transitions, giant typography layered behind vehicle silhouettes, sliding spec telemetry, morphing background gradients, and thumbnail scrubber rail.
* **360° Configuration Studio**: Interactive turntable with inertia drag physics, floor light ring, paint color swatch morphing, pulsing hotspot inspection callouts, and pinned "scroll to rotate" mode.
* **Complete Ferrari Range Archive**: Filterable catalog by Era (*Current Range*, *Icona*, *Classiche/Heritage*, *Racing/F1*) and Powertrain (*V12*, *V8*, *V6/Hybrid*), featuring 3D hover perspective tilt and shared-element transitions.
* **Technical Homologation Blueprint Pages** (`/cars/[slug]`): Full technical spec tables, Fiorano lap times, power curves, and 360 viewer.
* **Scuderia Ferrari F1 Paddock**: Carbon-weave backdrop, scroll-linked SVG racing line with moving F1 car indicator, flash era transitions, and live counter roll-up for 16 Constructors' & 15 Drivers' Championships.
* **Concept Ticketing Engine** (`/tickets`): 4-step configurator with moving car progress bar, calendar ripple effects, rolling-digit guest totals in AED (incl. 5% UAE VAT), Zod contact validation, confetti bursts, and typewriter reference code.
* **Scroll-Driven Red Wordmark Footer**: Giant outlined `FERRARI WORLD` text that progressively fills with solid Rosso Corsa red from the bottom up on scroll entry.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
* **Styling**: Tailwind CSS + Custom Design System Tokens
* **Motion & Animation**:
  * GSAP + ScrollTrigger
  * Lenis (Normalized smooth scrolling)
  * Framer Motion (Route & Step transitions)
  * SplitType (Character & Line mask reveals)
* **Audio & Visual**:
  * Procedural Web Audio API Engine Synthesis
  * Canvas High-Speed Telemetry Streak Particles
* **Form & State**:
  * Zustand (Persisted booking store)
  * React Hook Form + Zod Schema Validation

---

## 🚀 Getting Started

### Prerequisites
* Node.js 18+ (tested on Node v20/v24)
* npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/saju2004/ferrari-world-abu-dhabi.git

# Navigate to project directory
cd ferrari-world-abu-dhabi

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 📁 Directory Structure
```text
├── app/
│   ├── layout.tsx              # Google fonts (Bebas Neue, DM Sans, Space Mono), Lenis, SpeedLines
│   ├── page.tsx                # Master home page assembly
│   ├── tickets/page.tsx        # Dedicated full-page booking experience
│   └── cars/[slug]/page.tsx    # Car detail specification blueprints
├── components/
│   ├── ui/
│   │   ├── CustomCursor.tsx    # Inertia cursor with dynamic text badges
│   │   ├── Preloader.tsx       # Tachometer dial 0-100 & dual split curtain
│   │   ├── Header.tsx          # Editorial sticky nav with Abu Dhabi GST time
│   │   ├── Footer.tsx          # Scroll-driven red fill wordmark
│   │   ├── MagneticButton.tsx  # Cursor magnetism button with fill sweep
│   │   ├── AnimatedHeading.tsx # SplitType line/character mask reveals
│   │   ├── AnimatedImage.tsx   # Clip-path mask reveal & scroll parallax
│   │   ├── CounterNumber.tsx   # GSAP scroll count-up numbers
│   │   ├── MarqueeStrip.tsx    # Scroll velocity-linked marquee
│   │   ├── SpeedLinesBackground.tsx # Canvas telemetry particle streaks
│   │   └── PageTransition.tsx  # Rosso Corsa route wipe
│   ├── sections/
│   │   ├── Hero.tsx            # Fullscreen hero with pinned scrub exit
│   │   ├── RidesHorizontal.tsx # Pinned horizontal scroll coaster strip
│   │   ├── CarsSlideshow.tsx   # Fullscreen slides with circle-wipe transitions
│   │   ├── Car360Viewer.tsx    # Turntable 360 viewer with light ring
│   │   ├── CarsArchive.tsx     # Filterable range with 3D hover tilt
│   │   ├── F1Heritage.tsx      # SVG racing line & timeline paddock
│   │   ├── HeritageLogos.tsx   # Respectful marks provenance wall
│   │   ├── PlanVisit.tsx       # Hours, heights, Yas Island guide & FAQ
│   │   └── BookingWidget.tsx   # 4-step animated ticket configurator
├── data/
│   ├── cars.ts                 # Ferrari car catalog & 360 hotspots
│   ├── rides.ts                # Attraction speeds, G-forces & restrictions
│   ├── f1.ts                   # Scuderia F1 milestones & Yas circuit sectors
│   └── tickets.ts              # Ticket tiers, pricing in AED & perks
├── public/assets/
│   ├── logos/                  # Official shields & marks
│   ├── cars/                   # Vehicle showroom assets
│   ├── f1/                     # Scuderia Formula 1 assets
│   ├── rides/                  # Attraction media slots
│   └── README.md               # Asset specifications & drop-in guidelines
```

---

## ⚖️ License
Concept project developed for creative demonstration and art direction study. All Ferrari trademarks, logos, and model names belong to Ferrari S.p.A. and Ferrari World Abu Dhabi.
