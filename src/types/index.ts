// ============================================================
// Navkar Weldmart — TypeScript Data Models
// Source: Portfolio PDF + V4 Mockup
// ============================================================

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  location?: string;
  year?: number;
  featured: boolean;
  coverImage: string;
  gallery: string[];
  description: string;
  client?: string;
  specs?: string;
}

export type ProjectCategory =
  | "Hospitality"
  | "Sports Infrastructure"
  | "Industrial"
  | "Architectural Metalwork"
  | "Residential"
  | "Commercial"
  | "Restoration";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  slug: string;
  features: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone: number;
}

export interface Client {
  name: string;
  category: ClientCategory;
}

export type ClientCategory =
  | "Commercial"
  | "Residential"
  | "Architects & Engineers"
  | "BNI Members";

export interface MaterialCategory {
  title: string;
  items: string[];
  image?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface Partner {
  name: string;
  logo?: string;
  className?: string;
}

export interface TrustMetric {
  value: string;
  label: string;
  sublabel: string;
  icon: string;
}

export interface ContactInfo {
  phones: string[];
  email: string;
  city: string;
  state: string;
  owner: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
