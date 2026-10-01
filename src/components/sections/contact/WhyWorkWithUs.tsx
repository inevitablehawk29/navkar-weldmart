const benefits = [
  {
    title: "Itemised quotations",
    description: "Every quote breaks down material, fabrication, transport and erection, so you can see where the money goes.",
  },
  {
    title: "Measured on site",
    description: "We visit and measure before we price, so the estimate matches the ground.",
  },
  {
    title: "One team, start to finish",
    description: "The people who fabricate your steel are the people who put it up.",
  },
  {
    title: "Material and fabrication together",
    description: "We source the steel ourselves, which keeps quality and timing in our hands.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section className="section-y-sm bg-galv-100">
      <div className="container-wide">
        <h2 className="type-h2 max-w-[14ch]">What you can expect from us</h2>
        <ul className="mt-12 grid gap-x-10 border-t border-foreground sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <li key={b.title} className="border-b border-zinc-line py-6 lg:border-b-0">
              <h3 className="type-h4">{b.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel-500">{b.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
