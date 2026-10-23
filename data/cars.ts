export interface CarHotspot {
  id: string;
  title: string;
  category: "Engine" | "Aerodynamics" | "Chassis" | "Cockpit";
  description: string;
  position: [number, number, number]; // 3D coordinates in canvas
  specs?: string;
}

export interface CarColorOption {
  name: string;
  hex: string;
  finish: "Gloss" | "Metallic" | "Matte" | "Historical";
}

export interface CarModel {
  slug: string;
  name: string;
  tagline: string;
  year: number;
  category: "Current Range" | "Icona" | "Classiche/Heritage" | "Racing/F1";
  engine: string;
  displacement: string;
  power: string;
  torque: string;
  zeroToHundred: string;
  topSpeed: string;
  dryWeight: string;
  gearbox: string;
  layout: string;
  image: string;
  badgeYear?: string;
  story: string;
  chassisCode?: string;
  audioFrequency?: string;
  colorOptions: CarColorOption[];
  hotspots: CarHotspot[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const FERRARI_CARS: CarModel[] = [
  // --- CURRENT RANGE ---
  {
    slug: "ferrari-296-gtb",
    name: "Ferrari 296 GTB",
    tagline: "Defining Fun to Drive",
    year: 2022,
    category: "Current Range",
    engine: "2.9L 120° V6 Twin-Turbo + Rear Electric Motor (MGU-K)",
    displacement: "2,992 cc",
    power: "830 cv @ 8,000 rpm",
    torque: "740 Nm @ 6,250 rpm",
    zeroToHundred: "2.9 s",
    topSpeed: "> 330 km/h (205 mph)",
    dryWeight: "1,470 kg",
    gearbox: "8-speed dual-clutch F1 DCT",
    layout: "Mid-rear engine, Rear-wheel drive PHEV",
    image: "/assets/cars/ferrari-296-gtb.png",
    chassisCode: "Type F171",
    audioFrequency: "8,500 RPM Piccolo V12 Harmonics",
    story:
      "The 296 GTB introduces Ferrari's revolutionary 120° V6 plug-in hybrid architecture. Nicknamed the 'piccolo V12', its wide vee angle allows the turbochargers to sit inside the cylinder banks, lowering the center of gravity while unleashing an astonishing 830 metric horsepower.",
    colorOptions: [
      { name: "Rosso Corsa", hex: "#D40000", finish: "Gloss" },
      { name: "Giallo Modena", hex: "#FFF200", finish: "Gloss" },
      { name: "Nero Daytona", hex: "#0E0E0E", finish: "Metallic" },
      { name: "Bianco Avus", hex: "#F3F3F3", finish: "Gloss" },
      { name: "Blu Tour de France", hex: "#002868", finish: "Metallic" },
    ],
    hotspots: [
      {
        id: "v6-powertrain",
        title: "120° V6 Turbo + MGU-K",
        category: "Engine",
        description:
          "Wide 120° cylinder bank angle with turbos mounted inside the 'hot vee' for immediate spool and optimal weight distribution.",
        position: [0, 0.4, -0.6],
        specs: "221 cv/litre specific output",
      },
      {
        id: "active-spoiler",
        title: "Active Mobile Rear Wing",
        category: "Aerodynamics",
        description:
          "High-downforce configuration activates under hard braking and high-speed cornering, generating up to 360 kg of downforce at 250 km/h.",
        position: [0, 0.6, -1.8],
        specs: "360 kg downforce @ 250 km/h",
      },
      {
        id: "carbon-brakes",
        title: "Aero-Cooled Carbon Ceramic CCM-R",
        category: "Chassis",
        description:
          "Brembo aero-calipers integrated with brake-by-wire and 6-way Chassis Dynamic Sensor (6w-CDS) for precise threshold braking.",
        position: [0.95, -0.2, 1.2],
        specs: "100-0 km/h in 29.5 m",
      },
    ],
    specs: [
      { label: "Engine Type", value: "120° V6 Twin-Turbo PHEV" },
      { label: "Max System Power", value: "830 cv (610 kW)" },
      { label: "Internal Combustion Power", value: "663 cv" },
      { label: "Electric Motor Power", value: "167 cv (122 kW)" },
      { label: "0–100 km/h", value: "2.9 seconds" },
      { label: "0–200 km/h", value: "7.3 seconds" },
      { label: "Top Speed", value: "> 330 km/h" },
      { label: "Fiorano Lap Time", value: "1' 21.00\"" },
      { label: "Weight-to-Power", value: "1.77 kg/cv" },
    ],
  },
  {
    slug: "ferrari-sf90-xx-stradale",
    name: "Ferrari SF90 XX Stradale",
    tagline: "The First Road-Legal XX Programme Hypercar",
    year: 2024,
    category: "Current Range",
    engine: "4.0L 90° Twin-Turbo V8 + 3 Electric Motors",
    displacement: "3,990 cc",
    power: "1,030 cv (757 kW)",
    torque: "804 Nm + 350 Nm e-drive",
    zeroToHundred: "2.3 s",
    topSpeed: "320 km/h (199 mph)",
    dryWeight: "1,560 kg",
    gearbox: "8-speed dual-clutch F1 gearbox",
    layout: "Mid-engine, All-wheel drive (e-4WD)",
    image: "/assets/cars/ferrari-sf90-xx.png",
    chassisCode: "Type F173XX",
    audioFrequency: "Hot-tube resonated V8 crescendo",
    story:
      "Pushing the boundaries of Maranello's track-only XX programme into a road-legal format. Featuring a fixed rear wing reminiscent of the F40, radical louvred wheel arches, and 1,030 cv with an extra-boost telemetry system.",
    colorOptions: [
      { name: "Rosso Corsa / Carbon", hex: "#D40000", finish: "Gloss" },
      { name: "Bianco Artico", hex: "#EAEAEA", finish: "Matte" },
      { name: "Nero DS", hex: "#111111", finish: "Gloss" },
      { name: "Giallo Modena", hex: "#FFF200", finish: "Gloss" },
    ],
    hotspots: [
      {
        id: "fixed-wing",
        title: "Fixed Biplane Rear Wing",
        category: "Aerodynamics",
        description:
          "First fixed rear wing on a road-legal Ferrari since the iconic F50, delivering 530 kg of downforce at 250 km/h.",
        position: [0, 0.8, -2.1],
        specs: "530 kg downforce @ 250 km/h",
      },
      {
        id: "boost-telemetry",
        title: "Qualifying Extra Boost System",
        category: "Cockpit",
        description:
          "Derives directly from Formula 1 ERS deployment, granting 30 short bursts of maximum hybrid torque out of apex exits.",
        position: [0, 0.2, 0],
        specs: "30 e-boost tokens available per lap",
      },
    ],
    specs: [
      { label: "Engine Type", value: "90° V8 Twin-Turbo + 3 Motors" },
      { label: "Max Total Power", value: "1,030 cv" },
      { label: "0–100 km/h", value: "2.3 seconds" },
      { label: "0–200 km/h", value: "6.5 seconds" },
      { label: "Downforce @ 250 km/h", value: "530 kg" },
      { label: "Fiorano Lap Time", value: "1' 17.30\"" },
      { label: "Electric Range", value: "25 km" },
    ],
  },
  {
    slug: "ferrari-12cilindri",
    name: "Ferrari 12Cilindri",
    tagline: "Pure Atmospheric V12 Symphony",
    year: 2024,
    category: "Current Range",
    engine: "6.5L Naturally Aspirated 65° V12 (F140HD)",
    displacement: "6,496 cc",
    power: "830 cv @ 9,250 rpm",
    torque: "678 Nm @ 7,250 rpm",
    zeroToHundred: "2.9 s",
    topSpeed: "> 340 km/h (211 mph)",
    dryWeight: "1,560 kg",
    gearbox: "8-speed dual-clutch F1 DCT",
    layout: "Front-mid engine, Rear-wheel drive",
    image: "/assets/cars/ferrari-12cilindri.png",
    chassisCode: "Type F167",
    audioFrequency: "9,500 RPM Free-Breathing V12",
    story:
      "A tribute to the grand tradition of front-mounted Maranello V12 grand tourers that began with the 125 S. Revving to 9,500 rpm with Formula 1 derived titanium connecting rods and sliding finger followers.",
    colorOptions: [
      { name: "Rosso Imola", hex: "#8A0000", finish: "Metallic" },
      { name: "Verde Toscana", hex: "#1C3524", finish: "Metallic" },
      { name: "Grigio Scuro", hex: "#3A3D40", finish: "Gloss" },
      { name: "Giallo Montecarlo", hex: "#FFEA00", finish: "Metallic" },
    ],
    hotspots: [
      {
        id: "atmospheric-v12",
        title: "Naturally Aspirated F140HD V12",
        category: "Engine",
        description:
          "9,500 RPM maximum engine speed with Formula 1 titanium valvetrain geometry and diamond-like carbon (DLC) coated finger followers.",
        position: [0, 0.3, 1.2],
        specs: "9,500 rpm redline, zero forced induction",
      },
    ],
    specs: [
      { label: "Engine Type", value: "65° Atmospheric V12" },
      { label: "Power Output", value: "830 cv @ 9,250 rpm" },
      { label: "0–100 km/h", value: "2.9 seconds" },
      { label: "0–200 km/h", value: "< 7.9 seconds" },
      { label: "Top Speed", value: "> 340 km/h" },
      { label: "Weight Distribution", value: "48.4% Front / 51.6% Rear" },
    ],
  },
  {
    slug: "ferrari-roma-spider",
    name: "Ferrari Roma Spider",
    tagline: "La Nuova Dolce Vita in Plain Air",
    year: 2023,
    category: "Current Range",
    engine: "3.9L 90° Twin-Turbo V8",
    displacement: "3,855 cc",
    power: "620 cv @ 5,750 - 7,500 rpm",
    torque: "760 Nm @ 3,000 - 5,750 rpm",
    zeroToHundred: "3.4 s",
    topSpeed: "320 km/h (199 mph)",
    dryWeight: "1,556 kg",
    gearbox: "8-speed dual-clutch transmission",
    layout: "Front-mid engine, 2+ soft top spider",
    image: "/assets/cars/ferrari-roma-spider.png",
    chassisCode: "Type F164",
    story:
      "A contemporary representation of the carefree, pleasurable Italian lifestyle of the 1950s and 60s. The Roma Spider reintroduces a bespoke soft top to a front-engined Ferrari 54 years after the 1969 365 GTS4.",
    colorOptions: [
      { name: "Celeste Trevi", hex: "#7E99A3", finish: "Metallic" },
      { name: "Rosso Corsa", hex: "#D40000", finish: "Gloss" },
      { name: "Blu Roma", hex: "#1A324B", finish: "Metallic" },
      { name: "Grigio Titanio", hex: "#5D636B", finish: "Metallic" },
    ],
    hotspots: [],
    specs: [
      { label: "Engine Type", value: "90° Twin-Turbo V8" },
      { label: "Max Power", value: "620 cv" },
      { label: "0–100 km/h", value: "3.4 seconds" },
      { label: "Soft Top Deployment", value: "13.5 seconds @ up to 60 km/h" },
      { label: "Top Speed", value: "320 km/h" },
    ],
  },

  // --- ICONA SERIES ---
  {
    slug: "ferrari-daytona-sp3",
    name: "Ferrari Daytona SP3",
    tagline: "Homage to the 1967 24 Hours of Daytona 1-2-3 Triumph",
    year: 2022,
    category: "Icona",
    engine: "6.5L Naturally Aspirated 65° V12 (F140HC)",
    displacement: "6,496 cc",
    power: "840 cv @ 9,250 rpm",
    torque: "697 Nm @ 7,250 rpm",
    zeroToHundred: "2.85 s",
    topSpeed: "> 340 km/h (211 mph)",
    dryWeight: "1,485 kg",
    gearbox: "7-speed dual-clutch F1 transmission",
    layout: "Mid-rear engine, Targa body with composite tub",
    image: "/assets/cars/ferrari-daytona-sp3.png",
    chassisCode: "Icona SP3",
    audioFrequency: "Unadulterated high-compression V12 roar",
    story:
      "Part of the ultra-exclusive 'Icona' series, inspired by legendary 1960s sports prototypes (330 P3/4, 330 P4, 412 P). Wraparound windscreen, butterfly doors, and horizontal blade rear slats creating the most aerodynamically efficient passive design ever built in Maranello.",
    colorOptions: [
      { name: "Rosso Magma", hex: "#9E0000", finish: "Metallic" },
      { name: "Giallo Modena", hex: "#FFF200", finish: "Gloss" },
      { name: "Bianco King", hex: "#F5F5F5", finish: "Gloss" },
      { name: "Nero Carbonio", hex: "#141414", finish: "Gloss" },
    ],
    hotspots: [
      {
        id: "slatted-rear",
        title: "Horizontal Aerodynamic Blades",
        category: "Aerodynamics",
        description:
          "Horizontal blade styling evokes the classic 330 P4 prototype while channeling engine cooling heat without requiring active wings.",
        position: [0, 0.5, -1.9],
        specs: "500 kg passive downforce @ 200 km/h",
      },
      {
        id: "chassis-tub",
        title: "Formula 1 T800 Carbon Monocoque",
        category: "Chassis",
        description:
          "Cockpit seats are molded directly into the structural carbon tub, lowering seat height and creating a pure single-seater driving posture.",
        position: [0, 0.1, 0.1],
        specs: "Seats integrated directly into tub",
      },
    ],
    specs: [
      { label: "Production", value: "Limited to 599 examples" },
      { label: "Engine Type", value: "Mid-rear 65° V12" },
      { label: "Power", value: "840 cv @ 9,250 rpm" },
      { label: "0–100 km/h", value: "2.85 seconds" },
      { label: "0–200 km/h", value: "7.4 seconds" },
      { label: "Top Speed", value: "> 340 km/h" },
    ],
  },

  // --- CLASSICHE / HERITAGE ---
  {
    slug: "ferrari-f40",
    name: "Ferrari F40",
    tagline: "The Last Masterpiece Commissioned by Enzo Ferrari",
    year: 1987,
    category: "Classiche/Heritage",
    engine: "2.9L Twin-Turbo Tipo F120A 90° V8",
    displacement: "2,936 cc",
    power: "478 cv @ 7,000 rpm",
    torque: "577 Nm @ 4,000 rpm",
    zeroToHundred: "4.1 s",
    topSpeed: "324 km/h (201 mph)",
    dryWeight: "1,100 kg",
    gearbox: "5-speed manual gated dogleg shifter",
    layout: "Mid-engine, Kevlar and carbon-fiber tubular spaceframe",
    image: "/assets/cars/ferrari-f40.png",
    chassisCode: "Type F120",
    audioFrequency: "Raw mechanical turbo whistle & wastegate chatter",
    story:
      "Created to celebrate Ferrari's 40th anniversary and the final car approved personally by Enzo Ferrari. Constructed without power steering, ABS, or electronic assists—a pure visceral connection between driver, kevlar chassis, and twin IHI turbos.",
    colorOptions: [
      { name: "Rosso Corsa", hex: "#D40000", finish: "Historical" },
    ],
    hotspots: [
      {
        id: "gated-shifter",
        title: "Dogleg Gated Manual Shifter",
        category: "Cockpit",
        description:
          "Open-gate manual with reverse lockout and mechanical linkage directly operating the synchronized 5-speed transaxle.",
        position: [0, 0.1, 0.2],
        specs: "5-speed manual, no electronic nannies",
      },
      {
        id: "twin-turbo-v8",
        title: "Tipo F120A Twin IHI Turbo V8",
        category: "Engine",
        description:
          "Twin Behr intercoolers and dual IHI water-cooled turbos producing 1.1 bar boost and explosive acceleration above 3,500 rpm.",
        position: [0, 0.4, -0.8],
        specs: "478 cv, first production car to exceed 200 mph",
      },
    ],
    specs: [
      { label: "Launch Year", value: "1987" },
      { label: "Engine Type", value: "90° V8 Twin-Turbocharged" },
      { label: "Power Output", value: "478 cv (352 kW)" },
      { label: "Top Speed", value: "324 km/h (First >200 mph production car)" },
      { label: "Dry Weight", value: "1,100 kg" },
      { label: "0–100 km/h", value: "4.1 seconds" },
    ],
  },
  {
    slug: "ferrari-laferrari",
    name: "Ferrari LaFerrari",
    tagline: "The Definitive Maranello Hypercar",
    year: 2013,
    category: "Classiche/Heritage",
    engine: "6.3L Naturally Aspirated V12 + HY-KERS Electric Motor",
    displacement: "6,262 cc",
    power: "963 cv (800 cv V12 + 163 cv KERS)",
    torque: "> 900 Nm",
    zeroToHundred: "< 2.6 s",
    topSpeed: "> 350 km/h (217 mph)",
    dryWeight: "1,255 kg",
    gearbox: "7-speed dual-clutch F1 transmission",
    layout: "Mid-rear engine, carbon-fiber monocoque",
    image: "/assets/cars/ferrari-laferrari.png",
    chassisCode: "Type F150",
    story:
      "Ferrari's first hybrid hypercar, combining a spine-tingling 800 cv naturally aspirated V12 that screams to 9,250 rpm with a 163 cv Formula 1 HY-KERS electric motor for instant torque fill.",
    colorOptions: [
      { name: "Rosso Corsa", hex: "#D40000", finish: "Gloss" },
      { name: "Giallo Modena", hex: "#FFF200", finish: "Gloss" },
      { name: "Nero Daytona", hex: "#0F0F0F", finish: "Metallic" },
    ],
    hotspots: [],
    specs: [
      { label: "Total Combined Power", value: "963 cv" },
      { label: "V12 Atmospheric Power", value: "800 cv @ 9,000 rpm" },
      { label: "HY-KERS Electric Boost", value: "163 cv" },
      { label: "0–100 km/h", value: "< 2.6 seconds" },
      { label: "0–200 km/h", value: "< 6.9 seconds" },
      { label: "0–300 km/h", value: "15.0 seconds" },
      { label: "Fiorano Lap Record", value: "1' 19.70\"" },
    ],
  },

  // --- RACING / F1 ---
  {
    slug: "scuderia-ferrari-f1-75",
    name: "Scuderia Ferrari F1-75",
    tagline: "Celebrating 75 Years of Maranello Racing",
    year: 2022,
    category: "Racing/F1",
    engine: "1.6L 90° V6 Turbo Hybrid (Ferrari 066/7)",
    displacement: "1,600 cc",
    power: "~ 1,025 cv combined",
    torque: "Instantaneous hybrid telemetry delivery",
    zeroToHundred: "1.9 s",
    topSpeed: "355 km/h (220 mph)",
    dryWeight: "798 kg (with driver)",
    gearbox: "8-speed sequential semi-automatic paddle shift",
    layout: "Single-seater ground effect carbon honeycomb chassis",
    image: "/assets/f1/f1-75-scuderia.png",
    chassisCode: "F1-75 (Chassis 673)",
    audioFrequency: "Turbocharged Hybrid V6 + MGU-H Whine",
    story:
      "Engineered for the ground-effect regulatory revolution of 2022. Driven to triumphant 1-2 victory at the season opener in Bahrain by Charles Leclerc and Carlos Sainz. Features sculpted sidepod 'bathtubs' and a distinctive matte Rosso Corsa livery with carbon black accents.",
    colorOptions: [
      { name: "Rosso Scuderia Matte", hex: "#B80000", finish: "Matte" },
      { name: "Carbon Weave Black", hex: "#111111", finish: "Matte" },
    ],
    hotspots: [
      {
        id: "ground-effect-floor",
        title: "Venturi Vent Floor Tunnels",
        category: "Aerodynamics",
        description:
          "Twin underfloor Venturi tunnels generating suction downforce directly to the asphalt, dramatically reducing dirty air turbulence.",
        position: [0, -0.2, 0],
        specs: "Underfloor suction ground effect",
      },
      {
        id: "hybrid-power-unit",
        title: "066/7 Power Unit + MGU-K / MGU-H",
        category: "Engine",
        description:
          "Internal combustion engine revving to 15,000 RPM coupled with energy recovery systems recovering heat from turbo and kinetic energy from rear brakes.",
        position: [0, 0.3, -0.5],
        specs: ">50% thermal efficiency",
      },
      {
        id: "halo-safety",
        title: "Titanium Grade 5 Halo Cockpit",
        category: "Chassis",
        description:
          "Withstands 125 kN (equivalent to 12 metric tonnes) of vertical and lateral impact loads to protect the driver.",
        position: [0, 0.45, 0.3],
        specs: "12-tonne structural load rating",
      },
    ],
    specs: [
      { label: "Season", value: "2022 FIA Formula One World Championship" },
      { label: "Championship Finishes", value: "4 Wins, 12 Pole Positions, 20 Podiums" },
      { label: "Engine Code", value: "Ferrari 066/7 V6 Turbo Hybrid" },
      { label: "0–100 km/h", value: "1.9 seconds" },
      { label: "0–200 km/h", value: "4.2 seconds" },
      { label: "Lateral G-Force", value: "Up to 5.4G in high-speed corners" },
    ],
  },
  {
    slug: "scuderia-ferrari-f2004",
    name: "Scuderia Ferrari F2004",
    tagline: "The Most Dominant Formula 1 Car in History",
    year: 2004,
    category: "Racing/F1",
    engine: "3.0L Naturally Aspirated 90° V10 (Tipo 053)",
    displacement: "2,997 cc",
    power: "920 cv @ 19,000 rpm",
    torque: "380 Nm @ 15,000 rpm",
    zeroToHundred: "2.1 s",
    topSpeed: "360 km/h (224 mph)",
    dryWeight: "605 kg (including driver & ballast)",
    gearbox: "Ferrari 7-speed longitudinal sequential semi-automatic",
    layout: "Carbon-fiber and honeycomb composite monocoque",
    image: "/assets/f1/f1-f2004.png",
    chassisCode: "Chassis 655",
    audioFrequency: "19,000 RPM V10 Piercing Screamer",
    story:
      "Michael Schumacher and Rubens Barrichello steered the F2004 to 15 victories out of 18 races, sealing both Drivers' and Constructors' World Championships. Still holds multiple all-time lap records twenty years later.",
    colorOptions: [
      { name: "Rosso Corsa F1", hex: "#D40000", finish: "Gloss" },
    ],
    hotspots: [
      {
        id: "v10-screamer",
        title: "Tipo 053 90° V10 Engine",
        category: "Engine",
        description:
          "Pneumatic valve springs operating at 19,000 RPM, producing over 920 metric horsepower from just 3.0 liters without forced induction.",
        position: [0, 0.3, -0.5],
        specs: "19,000 RPM scream, 920 cv",
      },
    ],
    specs: [
      { label: "Championship Record", value: "15 Wins out of 18 Races (83.3% win rate)" },
      { label: "Drivers' Champion", value: "Michael Schumacher (7th World Title)" },
      { label: "Engine Max RPM", value: "19,000 RPM" },
      { label: "Power-to-Weight", value: "1.52 cv/kg" },
      { label: "Monza Lap Record", value: "1' 19.525\" (Unbroken for 14 years)" },
    ],
  },
];
