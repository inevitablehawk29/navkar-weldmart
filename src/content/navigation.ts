import { NavItem } from '@/types';

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Material Supply", href: "/material-supply" },
      { label: "Structural Fabrication", href: "/services/structural-fabrication" },
      { label: "Architectural Metalwork", href: "/services/architectural-metalwork" },
      { label: "Residential Fabrication", href: "/services/residential-fabrication" },
    ],
  },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

// ── Contact Information ─────────────────────────────────────