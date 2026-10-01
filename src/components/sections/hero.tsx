import Image from "next/image";
import Link from "next/link";
import { QuoteModal } from "@/components/layout/quote-modal";

const headline = ["Sheds, structures", "and steelwork,", "built to drawing."];

const titleBlock = [
  { label: "Established", value: "2012" },
  { label: "Projects delivered", value: "900+" },
  { label: "Cities served", value: "12+" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-mill-950 text-white"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/homepage_hero_bg.webp"
          alt="Steel portal frame of an industrial shed against the evening sky"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="animate-settle object-cover object-[62%_40%]"
        />
        {/* Scrims sit only where text sits, so the sky on the right keeps its light.
            Phones get an even wash because the text spans the full width there. */}
        <div className="absolute inset-0 bg-mill-950/35 lg:bg-transparent lg:bg-gradient-to-r lg:from-mill-950/85 lg:via-mill-950/35 lg:via-45% lg:to-transparent lg:to-70%" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-mill-950/90 via-mill-950/45 to-transparent" />
      </div>

      <div className="container-wide flex flex-1 flex-col justify-end pb-7 pt-[calc(var(--header-h)+2rem)] lg:pb-10">
        <h1 className="type-display max-w-[14ch]">
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span className="animate-rise block" style={{ animationDelay: `${250 + i * 110}ms` }}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          className="animate-fade mt-5 flex flex-col gap-6 sm:mt-7 lg:flex-row lg:items-end lg:justify-between lg:gap-8"
          style={{ animationDelay: "750ms" }}
        >
          <p className="max-w-[46ch] text-base leading-relaxed text-white sm:type-lead sm:text-white/85">
            Navkar Weldmart supplies, fabricates and installs steel for factories, warehouses,
            hotels and homes across Madhya Pradesh, from our workshop in Indore.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <QuoteModal>
              <button className="btn btn-primary px-3 sm:px-[1.375rem]">Request a quote</button>
            </QuoteModal>
            <Link href="/projects" className="btn btn-outline px-3 text-white sm:px-[1.375rem]">
              See our projects
            </Link>
          </div>
        </div>
      </div>

      {/* Title block: the facts panel a fabrication drawing carries in its corner. */}
      <div className="relative">
        <div
          aria-hidden
          className="animate-rule absolute inset-x-0 top-0 h-px bg-white/25"
          style={{ animationDelay: "900ms" }}
        />
        <dl
          className="container-wide animate-fade grid grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1.6fr]"
          style={{ animationDelay: "1100ms" }}
        >
          {titleBlock.map((item, i) => (
            <div
              key={item.label}
              className={
                "flex flex-col justify-between gap-1.5 py-4 lg:gap-2 lg:py-5 " +
                (i > 0 ? "border-l border-white/15 pl-4 lg:pl-8" : "pr-4 lg:pr-8")
              }
            >
              <dt className="type-label text-[0.75rem] text-white/60 sm:text-[0.8125rem]">{item.label}</dt>
              <dd className="type-figure text-[1.75rem] sm:text-[2rem] lg:text-[2.5rem]">{item.value}</dd>
            </div>
          ))}
          <div className="col-span-3 flex items-baseline justify-between gap-4 border-t border-white/15 py-3 lg:col-span-1 lg:flex-col lg:justify-start lg:gap-2 lg:border-l lg:border-t-0 lg:py-5 lg:pl-8">
            <dt className="type-label shrink-0 text-[0.75rem] text-white/60 sm:text-[0.8125rem]">Latest handover</dt>
            <dd className="min-w-0 text-right lg:text-left">
              <Link
                href="/projects/indore-tennis-club"
                className="group inline-flex flex-col font-semibold leading-tight lg:text-xl"
              >
                <span className="link-rule self-end lg:self-start">Indore Tennis Club</span>
                <span className="mt-1 hidden text-sm font-normal text-white/60 lg:block">Roof structure, 5,000 sq ft</span>
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
