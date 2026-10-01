import { testimonials } from "@/content";

export function ClientsPartners() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="clients" aria-labelledby="clients-title" className="section-y bg-galv-50">
      <div className="container-wide">
        <h2 id="clients-title" className="type-h2 max-w-[16ch]">
          From the architects and owners we build for
        </h2>

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <figure className="lg:col-span-7">
            <blockquote className="type-h3 text-[clamp(1.625rem,2.6vw,2.375rem)] font-[560] leading-[1.18]">
              <span aria-hidden className="-ml-[0.45em] text-steel-300">“</span>
              {lead.quote}
            </blockquote>
            <figcaption className="mt-8 border-t border-foreground pt-3">
              <span className="block font-semibold">{lead.author}</span>
              <span className="text-sm text-steel-500">{lead.role}</span>
            </figcaption>
          </figure>

          <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
            {rest.map((t) => (
              <figure key={t.author}>
                <blockquote className="type-lead text-foreground/90">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-zinc-line pt-3">
                  <span className="block font-semibold">{t.author}</span>
                  <span className="text-sm text-steel-500">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
