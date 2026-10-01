const steps = [
  {
    num: "01",
    title: "We call you back",
    description: "We go over what you need, the site, and the timeline you're working to.",
  },
  {
    num: "02",
    title: "Site visit and estimate",
    description: "We measure on site, then send an itemised quotation: material, fabrication, transport and erection.",
  },
  {
    num: "03",
    title: "Fabrication and erection",
    description: "Once you approve, we order steel, fabricate in our workshop and install on site.",
  },
];

export function NextSteps() {
  return (
    <section className="section-y-sm bg-galv-50">
      <div className="container-wide grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <h2 className="type-h2 max-w-[10ch] lg:col-span-4">After you get in touch</h2>
        <ol className="grid border-t border-foreground sm:grid-cols-3 lg:col-span-8">
          {steps.map((step) => (
            <li key={step.num} className="border-b border-zinc-line py-6 pr-6 sm:border-b-0 sm:border-r sm:pl-6 sm:first:pl-0 sm:last:border-r-0">
              <span className="type-figure text-2xl text-steel-400">{step.num}</span>
              <h3 className="type-h4 mt-3">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel-500">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
