import { clients } from "@/content";

const groups = [
  { title: "Architects & engineers", key: "Architects & Engineers" },
  { title: "Commercial", key: "Commercial" },
  { title: "Homeowners", key: "Residential" },
  { title: "BNI members", key: "BNI Members" },
] as const;

export function ClientCategories() {
  return (
    <section className="section-y bg-galv-50">
      <div className="container-wide">
        <h2 className="type-h2 max-w-[14ch]">Some of the people we&apos;ve built for</h2>
        <div className="mt-14 grid gap-x-10 gap-y-12 border-t border-foreground pt-8 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <div key={g.key}>
              <h3 className="type-label text-steel-500">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {clients
                  .filter((c) => c.category === g.key)
                  .map((c) => (
                    <li key={c.name} className="text-[1.0625rem]">
                      {c.name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
