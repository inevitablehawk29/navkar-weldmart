"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/content";
import { cn } from "@/lib/utils";

// Fabrication first, supply last: that's the order most enquiries arrive in.
const ordered = [
  ...services.filter((s) => s.slug !== "material-supply"),
  ...services.filter((s) => s.slug === "material-supply"),
];

const hrefFor = (slug: string) => (slug === "material-supply" ? "/material-supply" : `/services/${slug}`);

export function ServicesOverview() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="section-y bg-galv-100">
      <div className="container-wide">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <header className="lg:col-span-5">
            <h2 className="type-h2 max-w-[12ch]">Supply, fabrication and erection under one contract.</h2>
          </header>
          <p className="type-lead max-w-[52ch] self-end text-steel-500 lg:col-span-6 lg:col-start-7">
            One team takes your job from the steel order to the last bolt on site, so there&apos;s
            no gap between the supplier, the workshop and the erection crew.
          </p>
        </div>

        <div className="mt-14 grid gap-x-16 lg:mt-20 lg:grid-cols-12">
          {/* Sticky photo plate — desktop only; rows carry their own photo on mobile */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]">
              <div className="relative aspect-[4/5] overflow-hidden bg-mill-900">
                {ordered.map((s, i) => (
                  <Image
                    key={s.id}
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 0px"
                    className={cn(
                      "photo-grade object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]",
                      i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                    )}
                  />
                ))}
              </div>
              <p className="type-label mt-3 flex justify-between text-steel-500">
                <span>{ordered[active].title}</span>
                <span className="tabular">
                  {active + 1}/{ordered.length}
                </span>
              </p>
            </div>
          </div>

          <ol className="border-t border-foreground lg:col-span-7">
            {ordered.map((s, i) => (
              <li key={s.id} className="border-b border-zinc-line">
                <Link
                  href={hrefFor(s.slug)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid gap-5 py-8 sm:grid-cols-[1fr_auto] lg:py-10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-mill-900 sm:col-span-2 lg:hidden">
                    <Image src={s.image} alt="" fill sizes="100vw" className="photo-grade object-cover" />
                  </div>

                  <div>
                    <h3
                      className={cn(
                        "type-h3 text-[clamp(1.75rem,3vw,2.5rem)] transition-colors duration-300",
                        i === active ? "lg:text-arc" : "",
                        "group-hover:text-arc"
                      )}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-steel-500">{s.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.9375rem] text-foreground/80">
                      {s.features.slice(0, 4).map((f) => (
                        <li key={f}>{f.split(" — ")[0]}</li>
                      ))}
                    </ul>
                  </div>

                  <span className="type-label self-start text-steel-500 transition-colors group-hover:text-arc sm:pt-3">
                    <span className="link-rule">View service</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
