export interface F1Statistic {
  label: string;
  value: string;
  numeric: number;
  suffix?: string;
  caption: string;
}

export interface F1TimelineItem {
  year: number;
  car: string;
  driver: string;
  achievement: string;
  techInnovation: string;
  image: string;
}

export const F1_STATS: F1Statistic[] = [
  {
    label: "Constructors' Championships",
    value: "16",
    numeric: 16,
    caption: "Most in Formula 1 history (1961, 1964, 1975–77, 1979, 1982–83, 1999–2004, 2007–08)",
  },
  {
    label: "Drivers' Championships",
    value: "15",
    numeric: 15,
    caption: "Ascari, Fangio, Hawthorn, Hill, Surtees, Lauda, Scheckter, Schumacher, Räikkönen",
  },
  {
    label: "Grand Prix Victories",
    value: "244+",
    numeric: 244,
    suffix: "+",
    caption: "From José Froilán González at Silverstone 1951 to the modern era",
  },
  {
    label: "Pole Positions",
    value: "253+",
    numeric: 253,
    suffix: "+",
    caption: "Leading qualifying record across more than 1,080 Grand Prix starts",
  },
];

export const F1_TIMELINE: F1TimelineItem[] = [
  {
    year: 1951,
    car: "Ferrari 375 F1",
    driver: "José Froilán González",
    achievement: "First World Championship Grand Prix Victory (Silverstone)",
    techInnovation: "4.5L Lampredi naturally aspirated V12, breaking Alfa Romeo supercharged supremacy.",
    image: "/assets/f1/f1-75-scuderia.png",
  },
  {
    year: 1975,
    car: "Ferrari 312T",
    driver: "Niki Lauda",
    achievement: "Drivers' & Constructors' World Champions",
    techInnovation: "Transverse 5-speed gearbox (the 'T') mounted ahead of the rear axle with flat-12 boxer engine.",
    image: "/assets/f1/f1-75-scuderia.png",
  },
  {
    year: 2004,
    car: "Ferrari F2004",
    driver: "Michael Schumacher",
    achievement: "15 Wins in 18 Races — Peak of the Golden Scuderia Era",
    techInnovation: "Tipo 053 V10 revving to 19,000 RPM with Bridgestone compound harmony.",
    image: "/assets/f1/f1-75-scuderia.png",
  },
  {
    year: 2022,
    car: "Ferrari F1-75",
    driver: "Charles Leclerc & Carlos Sainz",
    achievement: "Bahrain 1-2 Victory in the Ground Effect Era",
    techInnovation: "Sculpted sidepod bathtub channels with 066/7 turbo-hybrid power unit.",
    image: "/assets/f1/f1-75-scuderia.png",
  },
  {
    year: 2024,
    car: "Ferrari SF-24",
    driver: "Charles Leclerc & Carlos Sainz",
    achievement: "Monaco & Monza Grand Prix Triumphs",
    techInnovation: "Refined aerodynamic concept with redesigned pull-rod rear geometry.",
    image: "/assets/f1/f1-75-scuderia.png",
  },
];

export const YAS_CIRCUIT_POINTS = [
  { turn: "T1", name: "Etihad Turn 1", speed: "115 km/h", gear: "3rd", gForce: "3.2G" },
  { turn: "T5-T6", name: "North Grandstand Chicane", speed: "85 km/h", gear: "2nd", gForce: "4.1G" },
  { turn: "Back Straight", name: "1.2km DRS Acceleration", speed: "338 km/h", gear: "8th", gForce: "1.2G" },
  { turn: "T9", name: "Marsa Hairpin", speed: "128 km/h", gear: "3rd", gForce: "3.8G" },
  { turn: "T12-T14", name: "Marina Promenade Complex", speed: "165 km/h", gear: "4th", gForce: "4.4G" },
  { turn: "T16", name: "Ferrari World Apex", speed: "210 km/h", gear: "5th", gForce: "4.7G" },
];
