import { Service, ProcessStep, MaterialCategory } from '@/types';

export const services: Service[] = [
  {
    id: "material-supply",
    title: "Material Supply",
    description:
      "Structural steel, pipes, plates, channels, and all fabrication consumables.",
    icon: "Package",
    image: "/images/portfolio/material-supply-2.webp",
    slug: "material-supply",
    features: [
      "Pipes — RHS, SHS, CHS, Profile",
      "Sheets — Corrugated, Polycarbonate, HR/CR, Plates",
      "Bright Bars — Round, Square, Flat",
      "Structural Steel — Angle, Flat, Channel, Beam, Joist",
      "Consumables — Tools, Electrodes, Cutting Wheels, Screws",
    ],
  },
  {
    id: "structural-fabrication",
    title: "Structural Fabrication",
    description:
      "Industrial sheds, warehouses, structures and heavy steel fabrication.",
    icon: "Factory",
    image: "/images/portfolio/warehouse-1.webp",
    slug: "structural-fabrication",
    features: [
      "Warehouse Sheds",
      "Factory Sheds",
      "Tin Sheds",
      "Industrial Structures",
      "Heavy Steel Framework",
    ],
  },
  {
    id: "architectural-metalwork",
    title: "Architectural Metalwork",
    description:
      "Railings, facades, elevation solutions, canopies and custom metalwork.",
    icon: "Ruler",
    image: "/images/portfolio/elevation-1.webp",
    slug: "architectural-metalwork",
    features: [
      "Building Elevation",
      "Railings & Balustrades",
      "Signboards",
      "Gazebos & Canopies",
      "Restoration & Retro Fitting",
    ],
  },
  {
    id: "residential-fabrication",
    title: "Residential Fabrication",
    description:
      "Gates, grills, staircases, railings, pergolas and more custom solutions.",
    icon: "Home",
    image: "/images/portfolio/gates-1.webp",
    slug: "residential-fabrication",
    features: [
      "Custom Gates",
      "Security & Decorative Grills",
      "Staircase Railings",
      "Furniture & Interior Partitions",
      "Bespoke Fabrication",
    ],
  },
];

// ── Process Steps ───────────────────────────────────────────


export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Site Visit",
    description: "We understand your requirements on-site.",
    icon: "MapPin",
  },
  {
    number: "02",
    title: "Estimate",
    description: "Technical assessment and cost estimation.",
    icon: "Calculator",
  },
  {
    number: "03",
    title: "Quotation",
    description: "Transparent quotation with detailed scope.",
    icon: "FileText",
  },
  {
    number: "04",
    title: "Fabrication",
    description: "Precision fabrication at our facility.",
    icon: "Wrench",
  },
  {
    number: "05",
    title: "Installation",
    description: "On-site delivery and professional installation.",
    icon: "Truck",
  },
  {
    number: "06",
    title: "Handover",
    description: "Timely handover with quality assurance.",
    icon: "CheckCircle",
  },
];

// ── Featured Projects ───────────────────────────────────────


export const materialCategories: MaterialCategory[] = [
  {
    title: "Pipes",
    items: ["RHS", "SHS", "CHS", "Profile"],
    image: "/images/portfolio/material-supply-1.webp",
  },
  {
    title: "Sheets",
    items: ["Corrugated", "Polycarbonate", "HR/CR", "Plates"],
    image: "/images/portfolio/material-supply-2.webp",
  },
  {
    title: "Bright Bars",
    items: ["Round", "Square", "Flat"],
  },
  {
    title: "Structural Steel",
    items: ["Angle", "Flat", "Channel", "Beam", "Joist"],
  },
  {
    title: "Consumables",
    items: [
      "Tools and Machinery",
      "Electrodes",
      "Cutting Wheels",
      "Screws",
      "Fabrication Hardware",
    ],
  },
];

// ── Fabrication Categories ──────────────────────────────────


export const fabricationCategories = [
  { title: "Gates", image: "/images/portfolio/gates-1.webp", count: 6 },
  { title: "Grills", image: "/images/portfolio/grills-1.webp", count: 7 },
  { title: "Gazebo", image: "/images/portfolio/gazebo-1.webp", count: 4 },
  { title: "Elevation", image: "/images/portfolio/elevation-1.webp", count: 6 },
  { title: "Railings", image: "/images/portfolio/railings-1.webp", count: 6 },
  {
    title: "Restoration & Retro Fitting",
    image: "/images/portfolio/restoration-1.webp",
    count: 5,
  },
  { title: "Signboards", image: "/images/portfolio/signboards-1.webp", count: 4 },
  {
    title: "Warehouses & Factory Sheds",
    image: "/images/portfolio/warehouse-1.webp",
    count: 9,
  },
  {
    title: "Furniture & Interior",
    image: "/images/portfolio/custom-1.webp",
    count: 8,
  },
];

// ── Clients ─────────────────────────────────────────────────


export const howWeExecuteSteps = [
  {
    title: "Material Sourcing",
    description: "We source only premium grade steel directly from trusted manufacturers, ensuring the foundation of your structure is uncompromisingly strong.",
    icon: "Truck",
  },
  {
    title: "Fabrication Workshop",
    description: "Our dedicated workshop handles precision cutting, welding, and assembly in a controlled environment to minimize site disruption.",
    icon: "Factory",
  },
  {
    title: "Site Execution",
    description: "Experienced erection teams ensure safe, precise, and timely installation, coordinating with site constraints and project timelines.",
    icon: "Hammer",
  },
  {
    title: "Quality Checks",
    description: "Rigorous inspection at every weld and joint. We check for structural integrity, dimensional accuracy, and perfect alignment.",
    icon: "ShieldCheck",
  },
  {
    title: "Handover Process",
    description: "A seamless transition with all necessary documentation, final touch-ups, and a walk-through to ensure complete client satisfaction.",
    icon: "CheckCircle2",
  },
];
