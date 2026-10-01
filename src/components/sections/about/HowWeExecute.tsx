import { howWeExecuteSteps } from "@/content";

export function HowWeExecute() {
  return (
    <section className="section-y bg-galv-50">
      <div className="container-wide">
        <div className="grid gap-x-16 gap-y-6 lg:grid-cols-12">
          <h2 className="type-h2 max-w-[12ch] lg:col-span-5">Every step stays in-house</h2>
          <p className="type-lead max-w-[46ch] self-end text-steel-500 lg:col-span-6 lg:col-start-7">
            From the first sheet of steel to the last bolt, the same team is responsible. That&apos;s
            how we keep quality consistent and dates honest.
          </p>
        </div>
        <ol className="mt-14 grid border-t border-foreground sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {howWeExecuteSteps.map((step, i) => (
            <li
              key={step.title}
              className="border-b border-zinc-line py-6 pr-6 lg:border-b-0 lg:border-r lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <span className="type-figure text-2xl text-steel-400">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="type-h4 mt-3">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-steel-500">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
