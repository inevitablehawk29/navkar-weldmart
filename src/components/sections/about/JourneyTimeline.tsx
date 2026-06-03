import { FadeIn } from "@/components/animations/fade-in";
import { timeline } from "@/content";

export function JourneyTimeline() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden bg-surface-dark text-white">
      <div className="container-wide">
        <FadeIn
          viewTrigger
          direction="up"
          className="mb-16 lg:mb-24"
        >
          <p className="section-label text-accent mb-4">Our Evolution</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-white">
            A decade of growth.
          </h2>
        </FadeIn>

        {/* Desktop: Horizontal Grid Layout without overflow */}
        <div className="hidden lg:grid grid-cols-6 gap-6 relative">
          {/* Main Horizontal Line */}
          <div className="absolute top-8 left-0 right-0 h-[1px] bg-white/20" />

          {timeline.map((event, index) => (
            <FadeIn
              key={event.year}
              viewTrigger
              direction="up"
              delay={index * 0.1}
              className="relative pt-16 w-full"
            >
              {/* Dot on the line */}
              <div className="absolute top-[30px] left-0 w-3 h-3 bg-accent rounded-full" />
              
              <h3 className="text-4xl font-heading text-white mb-4">
                {event.year}
              </h3>
              <p className="text-sm text-gray-400 font-medium leading-relaxed pr-4">
                {event.title}
              </p>
            </FadeIn>
          ))}
        </div>

        {/* Mobile & Tablet: Vertical Stacked Layout */}
        <div className="lg:hidden relative border-l border-white/20 ml-4 pl-8 space-y-12">
          {timeline.map((event, index) => (
            <FadeIn
              key={event.year}
              viewTrigger
              direction="right"
              delay={index * 0.1}
              className="relative w-full"
            >
              {/* Dot on the line */}
              <div className="absolute top-2 -left-[39px] w-3 h-3 bg-accent rounded-full" />
              
              <h3 className="text-3xl font-heading text-white mb-2">
                {event.year}
              </h3>
              <p className="text-base text-gray-400 font-medium">
                {event.title}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

