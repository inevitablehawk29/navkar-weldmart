import { cn } from "@/lib/utils";

const capabilities = [
  "Structural Steel Fabrication",
  "Industrial Sheds",
  "Material Supply",
  "Warehouse Structures",
  "Industrial Engineering",
  "Site Installation",
  "Custom Fabrication",
  "Steel Roofing Solutions",
  "MS Fabrication",
  "Structural Steel Work",
];

const Separator = () => (
  <span
    className="mx-12 md:mx-16 text-primary/30 select-none font-sans text-lg md:text-xl"
    aria-hidden="true"
  >
    •
  </span>
);

const MarqueeRow = ({ items }: { items: string[] }) => {
  // We duplicate the items array so the CSS animation can scroll seamlessly
  const content = (
    <>
      {items.map((item, idx) => (
        <span key={idx} className="inline-flex items-center">
          <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-foreground/80 whitespace-nowrap">
            {item}
          </span>
          <Separator />
        </span>
      ))}
      {items.map((item, idx) => (
        <span key={`dup-${idx}`} className="inline-flex items-center">
          <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-foreground/80 whitespace-nowrap">
            {item}
          </span>
          <Separator />
        </span>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden relative py-1 flex whitespace-nowrap">
      <div className="inline-flex shrink-0 items-center animate-scroll-left">
        {content}
      </div>
      <div
        className="inline-flex shrink-0 items-center animate-scroll-left"
        aria-hidden="true"
      >
        {content}
      </div>
    </div>
  );
};

export function CapabilityMarquee() {
  return (
    <section className="w-full bg-background border-y border-border/60 overflow-hidden flex flex-col py-4">
      <div className="flex flex-col">
        {/*
          Single continuous marquee row.
        */}
        <MarqueeRow items={capabilities} />
      </div>
    </section>
  );
}
