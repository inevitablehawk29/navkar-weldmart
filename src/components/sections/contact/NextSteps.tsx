export function NextSteps() {
  const steps = [
    {
      num: "01",
      title: "Initial Consultation",
      description: "We discuss your project requirements, scope, and timeline to understand your vision."
    },
    {
      num: "02",
      title: "Site Visit & Estimation",
      description: "Our team visits the site for precise measurements followed by a detailed, transparent quotation."
    },
    {
      num: "03",
      title: "Execution & Delivery",
      description: "Upon approval, we begin fabrication and ensure timely, high-quality erection on site."
    }
  ];

  return (
    <section className="py-10 lg:py-12 bg-background border-t border-border overflow-hidden">
      <div className="container-wide">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-3">What Happens Next?</h2>
          <p className="text-base text-muted">
            A simple, transparent process to get your project moving.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative z-0">
              <div className="w-8 h-8 bg-surface border border-border flex items-center justify-center text-sm font-bold text-accent mb-3 rounded-full shadow-sm">
                {step.num}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {step.description}
              </p>
              {/* Vertical line for mobile */}
              {index !== steps.length - 1 && (
                <div className="md:hidden absolute top-8 left-4 w-[1px] h-full bg-border -z-10" />
              )}
              {/* Horizontal line for desktop */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-4 left-10 w-[calc(100%-2rem)] h-[1px] bg-border -z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
