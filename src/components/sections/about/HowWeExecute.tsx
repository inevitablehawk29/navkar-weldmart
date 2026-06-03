import { FadeIn } from "@/components/animations/fade-in";
import { howWeExecuteSteps } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";

export function HowWeExecute() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30 border-b border-border">
      <div className="container-wide">
        <FadeIn
          viewTrigger
          direction="up"
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <p className="section-label mb-4">Our Process</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground mb-6">
            How We Execute
          </h2>
          <p className="text-lg text-muted">
            We control every step of the process. From the first sheet of steel to the final tightening of a bolt, our integrated approach ensures quality at every level.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {howWeExecuteSteps.map((step, index) => {
            return (
              <FadeIn
                key={step.title}
                viewTrigger
                direction="up"
                delay={index * 0.1}
                className="relative w-full"
              >
                {/* Connecting Line (Desktop only) */}
                {index !== howWeExecuteSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-16 right-0 h-[1px] bg-border z-0" />
                )}

                <div className="relative z-10 bg-background border border-border w-12 h-12 flex items-center justify-center mb-6">
                  <DynamicIcon name={step.icon} className="w-5 h-5 text-primary" />
                </div>
                
                <h3 className="text-lg font-heading text-foreground mb-3 uppercase tracking-wider">
                  <span className="text-accent mr-2">0{index + 1}.</span> {step.title}
                </h3>
                
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

