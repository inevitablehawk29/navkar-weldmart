import Link from "next/link";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

interface CTAAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  icon?: boolean;
}

interface CTASectionProps {
  label?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  actions: CTAAction[];
}

export function CTASection({
  label = "Ready to Start?",
  title,
  description,
  actions,
}: CTASectionProps) {
  return (
    <section className="py-24 bg-surface-dark text-white text-center">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="section-label text-accent mb-6">{label}</p>
          <h2 className="text-5xl md:text-6xl font-heading text-white mb-8">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {actions.map((action, index) => {
              const baseClass = "inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors duration-300 group rounded-md";
              const primaryClass = `${baseClass} bg-primary text-primary-foreground hover:bg-primary/90`;
              const secondaryClass = `${baseClass} border border-white/20 bg-transparent text-white hover:bg-white/10`;
              
              const className = action.variant === "primary" ? primaryClass : secondaryClass;
              
              const Content = (
                <>
                  {action.label}
                  {action.icon && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </>
              );

              if (action.onClick) {
                return (
                  <Button key={index} onClick={action.onClick} className={className}>
                    {Content}
                  </Button>
                );
              }

              return (
                <Button key={index} asChild className={className}>
                  <Link href={action.href || "#"}>
                    {Content}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
