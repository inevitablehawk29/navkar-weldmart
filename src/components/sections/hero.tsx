import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { FadeIn } from "@/components/animations/fade-in";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] lg:min-h-screen flex items-center pt-24 pb-16 lg:pb-0 lg:pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <FadeIn 
        direction="none"
        className="absolute inset-0 z-0 bg-[#111111] w-full h-full"
      >
        <picture className="absolute inset-0 z-0 bg-[#111111] w-full h-full">
          {/* Mobile Devices: Max width 640px, compressed at quality 60 */}
          <source
            media="(max-width: 640px)"
            srcSet="/_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=640&q=60 640w, /_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=750&q=60 750w, /_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=828&q=60 828w, /_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=1080&q=60 1080w"
            sizes="100vw"
          />
          {/* Desktop/Tablet: Screens larger than 640px, compressed at quality 75 */}
          <source
            media="(min-width: 641px)"
            srcSet="/_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=1200&q=75 1200w, /_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=1920&q=75 1920w"
            sizes="100vw"
          />
          {/* Fallback image */}
          <img
            src="/_next/image?url=%2Fimages%2Fhero_indore_tennis_club.webp&w=1920&q=75"
            alt="Indore Tennis Club structural steel framework fabricated by Navkar Weldmart"
            className="object-cover object-center w-full h-full saturate-[80%]"
            fetchPriority="high"
            loading="eager"
          />
        </picture>
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20 lg:via-background/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30 lg:hidden" />
      </FadeIn>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <FadeIn
            direction="none"
            className="max-w-xl"
          >
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Navkar Weldmart
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-foreground mb-5">
              Precision steel
              <br />
              fabrication built
              <br />
              for strength
              <br />
              and scale<span className="text-primary">.</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6 text-xs font-medium text-foreground">
              <div className="flex flex-col">
                <CountUp target="13+" className="text-xl font-bold text-primary" />
                <span className="text-muted">Years Experience</span>
              </div>
              <div className="hidden sm:block w-px bg-border"></div>
              <div className="flex flex-col">
                <CountUp target="900+" className="text-xl font-bold text-primary" />
                <span className="text-muted">Projects Delivered</span>
              </div>
              <div className="hidden sm:block w-px bg-border"></div>
              <div className="flex flex-col">
                <CountUp target="10+" className="text-xl font-bold text-primary" />
                <span className="text-muted">Cities Served</span>
              </div>
            </div>

            <div className="flex flex-col items-start md:flex-row md:items-center flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:bg-primary/90 transition-colors duration-300 group rounded-md"
              >
                View Our Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-input bg-background px-8 py-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300 group rounded-md"
              >
                Let&apos;s Talk
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>

          {/* Right side — Project label (visible on lg+) */}
          <FadeIn
            direction="left"
            delay={0.3}
            className="hidden lg:flex justify-end"
          >
            <div className="bg-surface/90 backdrop-blur-sm border border-border px-6 py-4 max-w-xs relative overflow-hidden group cursor-default">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-2">
                Recently Completed
              </p>
              <p className="text-lg text-foreground font-semibold leading-tight mb-1">
                Indore Tennis Club
              </p>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span>5,000 Sq.Ft</span>
                <span className="w-1 h-1 rounded-full bg-accent"></span>
                <span>Indore, MP</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

