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
        <div className="absolute inset-0 bg-gradient-to-t from-mill-950 via-mill-950/55 to-mill-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-mill-950/70 via-mill-950/20 to-transparent" />
      </div>

      <div className="container-wide flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+4rem)] lg:pb-14">
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
          className="animate-fade mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between"
          style={{ animationDelay: "750ms" }}
        >
          <p className="type-lead max-w-[46ch] text-white/80">
            Navkar Weldmart supplies, fabricates and installs steel for factories, warehouses,
            hotels and homes across Madhya Pradesh, from our workshop in Indore.
          </p>
          <div className="flex flex-wrap gap-3">
            <QuoteModal>
              <button className="btn btn-primary">Request a quote</button>
            </QuoteModal>
            <Link href="/projects" className="btn btn-outline text-white">
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
          className="container-wide animate-fade grid grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.6fr]"
          style={{ animationDelay: "1100ms" }}
        >
          {titleBlock.map((item, i) => (
            <div
              key={item.label}
              className={
                "flex flex-col gap-2 py-5 lg:py-6 " +
                (i % 2 === 1 ? "border-l border-white/15 pl-5 lg:pl-8 " : "lg:pr-8 ") +
                (i === 2 ? "border-t border-white/15 lg:border-l lg:border-t-0 lg:pl-8" : "")
              }
            >
              <dt className="type-label text-white/55">{item.label}</dt>
              <dd className="type-figure text-[2rem] lg:text-[2.5rem]">{item.value}</dd>
            </div>
          ))}
          <div className="flex flex-col gap-2 border-l border-t border-white/15 py-5 pl-5 lg:border-t-0 lg:py-6 lg:pl-8">
            <dt className="type-label text-white/55">Latest handover</dt>
            <dd>
              <Link
                href="/projects/indore-tennis-club"
                className="group inline-flex flex-col text-lg font-semibold leading-tight lg:text-xl"
              >
                <span className="link-rule self-start">Indore Tennis Club</span>
                <span className="mt-1 text-sm font-normal text-white/55">Roof structure, 5,000 sq ft</span>
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
