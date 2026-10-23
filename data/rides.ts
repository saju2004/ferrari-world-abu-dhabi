export interface Attraction {
  id: string;
  name: string;
  category: "Thrill Coaster" | "Family Ride" | "F1 Simulator" | "Show & Experience";
  topSpeed: number; // in km/h for speed counters
  acceleration: string;
  maxGForce: string;
  height: string;
  incline?: string;
  minHeightReq: string; // e.g. "140 cm"
  duration: string;
  image: string;
  tagline: string;
  description: string;
  telemetry: {
    label: string;
    value: string;
  }[];
}

export const ATTRACTIONS: Attraction[] = [
  {
    id: "formula-rossa",
    name: "Formula Rossa",
    category: "Thrill Coaster",
    topSpeed: 240,
    acceleration: "0 to 240 km/h in 4.9 seconds",
    maxGForce: "4.8 G",
    height: "52 meters (171 ft)",
    minHeightReq: "140 cm – 195 cm",
    duration: "1 min 32 sec",
    image: "/assets/rides/formula-rossa.png",
    tagline: "The World's Fastest Roller Coaster",
    description:
      "Strap in, pull on your protective goggles, and feel 240 km/h propelled by a 20,800 horsepower hydraulic winch launch system matching the acceleration of an F1 car leaving the grid.",
    telemetry: [
      { label: "Peak Velocity", value: "240 km/h" },
      { label: "Launch Thrust", value: "1.7G instantaneous" },
      { label: "Track Length", value: "2,070 meters" },
      { label: "Hydraulic Power", value: "20,800 HP" },
    ],
  },
  {
    id: "flying-aces",
    name: "Flying Aces",
    category: "Thrill Coaster",
    topSpeed: 120,
    acceleration: "51° military climb in seconds",
    maxGForce: "5.1 G",
    height: "63 meters (207 ft)",
    incline: "51 degrees",
    minHeightReq: "130 cm – 196 cm",
    duration: "2 min 10 sec",
    image: "/assets/rides/flying-aces.png",
    tagline: "World's Highest Roller Coaster Inversion Loop",
    description:
      "Dedicated to Count Francesco Baracca—the legendary Italian World War I ace who painted the original prancing horse on his biplane. Features the world's steepest cable climb and a record-breaking 52m non-inverting loop.",
    telemetry: [
      { label: "Peak Velocity", value: "120 km/h" },
      { label: "Inversion Height", value: "52 meters" },
      { label: "Cable Lift Angle", value: "51° incline" },
      { label: "Airtime Hills", value: "10 zero-G moments" },
    ],
  },
  {
    id: "turbo-track",
    name: "Turbo Track",
    category: "Thrill Coaster",
    topSpeed: 102,
    acceleration: "0 to 102 km/h in vertical burst",
    maxGForce: "4.2 G",
    height: "64 meters (Apex through roof)",
    minHeightReq: "130 cm – 196 cm",
    duration: "45 seconds",
    image: "/assets/rides/turbo-track.png",
    tagline: "Vertical Launch Piercing the Red Iconic Roof",
    description:
      "A high-speed back-to-back launch coaster that shoots riders through the glass aperture in the center of the world-famous red roof, rising into zero-gravity vertical free-fall backward.",
    telemetry: [
      { label: "Peak Velocity", value: "102 km/h" },
      { label: "Vertical Angle", value: "90° straight up" },
      { label: "Roof Aperture", value: "64m above sea level" },
      { label: "Trajectory", value: "Dual launch forward & reverse" },
    ],
  },
  {
    id: "scuderia-challenge",
    name: "Scuderia Challenge",
    category: "F1 Simulator",
    topSpeed: 330,
    acceleration: "Hydraulic 6-DOF telemetry motion base",
    maxGForce: "3.5 G simulated",
    height: "Simulated Cockpit",
    minHeightReq: "130 cm minimum",
    duration: "10 min briefing & run",
    image: "/assets/rides/scuderia-challenge.png",
    tagline: "Official F1 Driver Training Simulators",
    description:
      "Step into real race-harnessed F1 steering cockpits mounted on motion-actuated hydraulic rams. Drive the Yas Marina circuit with actual vehicle dynamics mapped by Ferrari test drivers.",
    telemetry: [
      { label: "Motion Axes", value: "6-DOF hydraulic base" },
      { label: "Steering Torque", value: "25 Nm direct drive feedback" },
      { label: "Circuits", value: "Yas Marina, Monza, Spa" },
      { label: "Telemetry", value: "MoTeC live lap analysis" },
    ],
  },
  {
    id: "junior-gp",
    name: "Junior Grand Prix",
    category: "Family Ride",
    topSpeed: 35,
    acceleration: "Scaled 4-stroke racing karts",
    maxGForce: "1.2 G",
    height: "Track level",
    minHeightReq: "110 cm – 140 cm",
    duration: "6 minutes",
    image: "/assets/rides/junior-gp.png",
    tagline: "Maranello Racing Academy for Future Champions",
    description:
      "Young drivers receive instructions from expert coaches before piloting scaled Ferrari F1 racers around a realistic track complete with hairpin bends, telemetry boards, and pit lanes.",
    telemetry: [
      { label: "Kart Fleet", value: "Custom Ferrari mini-F1" },
      { label: "Track Width", value: "4.5 meters" },
      { label: "Chicane Count", value: "7 technical corners" },
      { label: "Certification", value: "Junior Scuderia License" },
    ],
  },
  {
    id: "bell-italia",
    name: "Bell'Italia",
    category: "Show & Experience",
    topSpeed: 15,
    acceleration: "Gentle historical tour",
    maxGForce: "1.0 G",
    height: "Ground tour",
    minHeightReq: "No minimum (all ages)",
    duration: "8 minutes",
    image: "/assets/rides/bell-italia.png",
    tagline: "An Enchanting Voyage Through Italian Splendor",
    description:
      "Drive a classic 1958 Ferrari 250 California Spider through 40,000 square meters of miniature Italian coastlines, the Colosseum, the Amalfi coast, and the historic gates of Maranello.",
    telemetry: [
      { label: "Scale Models", value: "40 handcrafted landmarks" },
      { label: "Vehicles", value: "Scaled 1958 250 California" },
      { label: "Flora", value: "Authentic Mediterranean olive grove" },
      { label: "Atmosphere", value: "Cinematic soundtrack & audio guide" },
    ],
  },
];
