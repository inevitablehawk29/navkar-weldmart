import { timeline } from "@/content";

export function JourneyTimeline() {
  return (
    <section aria-labelledby="timeline-title" className="section-y bg-mill-900 text-white">
      <div className="container-wide">
        <h2 id="timeline-title" className="type-h2">
          Since 2012
        </h2>

        <ol className="mt-14 grid lg:mt-20 lg:grid-cols-6 lg:border-t lg:border-white/20">
          {timeline.map((event) => (
            <li
              key={event.year}
              className="relative border-l border-white/20 pb-10 pl-6 last:pb-0 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pr-6 lg:pt-8"
            >
              <span
                aria-hidden
                className="absolute -left-[5px] top-2 h-[9px] w-[9px] bg-arc-light lg:-top-[5px] lg:left-0"
              />
              <p className="type-figure text-[2.75rem] lg:text-[3.25rem]">{event.year}</p>
              <h3 className="type-h4 mt-3">{event.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel-300">{event.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
