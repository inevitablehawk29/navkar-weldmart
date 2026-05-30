import {
  Building2,
  Hammer,
  Settings,
  MapPin,
  Calculator,
  FileText,
  Wrench,
  Truck,
  CheckCircle,
  Package,
  Factory,
  Ruler,
  Home,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

export type IconName = 
  | "Building2"
  | "Hammer"
  | "Settings"
  | "MapPin"
  | "Calculator"
  | "FileText"
  | "Wrench"
  | "Truck"
  | "CheckCircle"
  | "Package"
  | "Factory"
  | "Ruler"
  | "Home"
  | "ShieldCheck"
  | "CheckCircle2";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Hammer,
  Settings,
  MapPin,
  Calculator,
  FileText,
  Wrench,
  Truck,
  CheckCircle,
  Package,
  Factory,
  Ruler,
  Home,
  ShieldCheck,
  CheckCircle2,
};

interface DynamicIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

export function DynamicIcon({ name, className, strokeWidth }: DynamicIconProps) {
  const IconComponent = iconMap[name] || Settings; // Fallback to Settings icon
  return <IconComponent className={className} strokeWidth={strokeWidth} />;
}
