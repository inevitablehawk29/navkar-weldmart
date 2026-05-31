import { ContactInfo, TimelineEvent, TrustMetric } from '@/types';

export const contactInfo: ContactInfo = {
  phones: ["+91 96697 69760", "+91 62637 21818"],
  email: "navkarweldmart@gmail.com",
  city: "Indore",
  state: "Madhya Pradesh",
  owner: "Jinesh Jain",
};

export const trustMetrics: TrustMetric[] = [
  {
    value: "13+",
    label: "Years Experience",
    sublabel: "Since 2012",
    icon: "Building2",
  },
  {
    value: "200+",
    label: "Projects Completed",
    sublabel: "Across MP",
    icon: "Hammer",
  },
  {
    value: "100%",
    label: "Custom Fabrication",
    sublabel: "Built to specification",
    icon: "Settings",
  },
  {
    value: "20+",
    label: "Cities Served",
    sublabel: "Across MP",
    icon: "MapPin",
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: "2012",
    title: "Started as Navkar Hardware",
    description:
      "Founded with a vision to supply quality iron and steel materials.",
    milestone: 1,
  },
  {
    year: "2015",
    title: "Started Fabrication Workshop",
    description:
      "Expanded operations by setting up our own fabrication workshop.",
    milestone: 2,
  },
  {
    year: "2017",
    title: "Expanded into Steel Structures",
    description:
      "Took on large-scale steel structural projects including warehouses and industrial sheds.",
    milestone: 3,
  },
  {
    year: "2021",
    title: "Rebranded as Navkar Weldmart",
    description:
      "Unified our vision — all fabrication needs under one roof.",
    milestone: 4,
  },
  {
    year: "2022",
    title: "Opened in Indore",
    description:
      "Established our primary operations base in Indore, serving the growing construction market.",
    milestone: 5,
  },
  {
    year: "2025",
    title: "200+ Projects Completed",
    description:
      "Completed over 200 projects across MP. Joined BNI Evolve chapter for wider business network.",
    milestone: 6,
  },
];

export const companyInfo = {
  name: "Navkar Weldmart",
  tagline: "Steel Solutions. Built to Last.",
  founded: 2012,
  description:
    "Navkar Weldmart is a trusted provider of premium iron and steel fabrication services, turning visions into reality with precision and passion.",
  mission:
    "Fostering innovation in iron & steel, cultivating enduring connections, and ensuring unparalleled quality in our deliverables.",
  vision:
    "Turning dreams into reality through our iron and steel expertise, unlocking limitless possibilities together.",
  moq: {
    weight: "2 Tons",
    value: "₹2 Lacs",
    note: "We follow a minimum order quantity (MOQ) — it helps us keep site operations smooth, timely and efficient.",
  },
  social: {
    facebook: "#",
    instagram: "https://www.instagram.com/navkarweldmart/",
    whatsapp: "https://wa.me/919669769760",
  },
} as const;
