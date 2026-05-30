import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { SectionLabel } from "@/components/shared/section-label";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-surface border-b border-border py-24 text-center">
      <div className="container-wide flex flex-col items-center">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-8">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <SectionLabel className="mb-4">Error 404</SectionLabel>
        
        <h1 className="text-5xl md:text-7xl font-heading text-foreground mb-6">
          Page Not Found
        </h1>
        
        <p className="text-lg md:text-xl text-muted max-w-lg mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:bg-primary/90 transition-colors duration-300 rounded-md group"
        >
          Return to Homepage
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
