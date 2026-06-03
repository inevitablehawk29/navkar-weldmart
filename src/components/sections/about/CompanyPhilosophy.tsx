import { FadeIn } from "@/components/animations/fade-in";

export function CompanyPhilosophy() {
  return (
    <section className="py-24 lg:py-40 bg-background border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column - Large Statement */}
          <FadeIn
            viewTrigger
            direction="up"
            className="lg:col-span-5 flex flex-col w-full"
          >
            <p className="section-label mb-8">What Drives Us</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground leading-[0.95] tracking-tight mb-8">
              Turning dreams into reality through steel.
            </h2>
            <div className="accent-line mt-auto hidden lg:block" />
          </FadeIn>

          {/* Right Column - Philosophy */}
          <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-center space-y-16">
            
            {/* Mission Concept */}
            <FadeIn
              viewTrigger
              direction="up"
              delay={0.2}
              className="w-full"
            >
              <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-6">Our Mission</h3>
              <p className="text-2xl md:text-3xl text-foreground font-medium leading-snug">
                To engineer and deliver robust, high-quality structural steel solutions that form the backbone of modern infrastructure, ensuring safety, longevity, and exceptional value for every client.
              </p>
            </FadeIn>

            {/* Vision Concept */}
            <FadeIn
              viewTrigger
              direction="up"
              delay={0.4}
              className="w-full"
            >
              <h3 className="text-sm font-medium text-muted uppercase tracking-widest mb-6">Our Vision</h3>
              <p className="text-2xl md:text-3xl text-foreground font-medium leading-snug">
                To be the most trusted name in fabrication across Central India, recognized not just for the tonnage of steel we shape, but for the precision we bring and the relationships we build.
              </p>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}

