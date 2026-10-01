import Image from "next/image";
import { materialCategories, partners } from "@/content";
import { SectionProfile, type ProfileName } from "@/components/icons/section-profiles";
import { cn } from "@/lib/utils";

const profilesFor: Record<string, ProfileName[]> = {
  "Structural Steel": ["beam", "channel", "angle"],
  Pipes: ["rhs", "shs", "chs"],
  Sheets: ["sheet"],
  "Bright Bars": ["round", "square", "flat"],
  Consumables: ["electrode"],
};

// Heaviest sections first, the way a stock list reads.
const order = ["Structural Steel", "Pipes", "Sheets", "Bright Bars", "Consumables"];

export function MaterialCatalogue({ className }: { className?: string }) {
  const rows = order
    .map((title) => materialCategories.find((c) => c.title === title))
    .filter((c): c is (typeof materialCategories)[number] => Boolean(c));

  return (
    <div className={className}>
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Steel sections and materials in stock</caption>
        <thead>
          <tr className="border-b border-foreground text-sm text-steel-500">
            <th scope="col" className="w-[38%] pb-3 font-medium sm:w-[30%]">Section</th>
            <th scope="col" className="hidden pb-3 font-medium sm:table-cell sm:w-[26%]">Profile</th>
            <th scope="col" className="pb-3 font-medium">Stocked as</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.title} className="group border-b border-zinc-line align-top">
              <th scope="row" className="py-5 pr-4 font-normal">
                <span className="type-h4 block">{row.title}</span>
                <span className="mt-3 flex gap-2 text-steel-700 sm:hidden">
                  {profilesFor[row.title]?.map((p) => (
                    <SectionProfile key={p} name={p} className="h-7 w-7" />
                  ))}
                </span>
              </th>
              <td className="hidden py-5 pr-4 sm:table-cell">
                <span className="flex gap-3 text-steel-700 transition-colors duration-300 group-hover:text-arc">
                  {profilesFor[row.title]?.map((p) => (
                    <SectionProfile key={p} name={p} className="h-9 w-9" />
                  ))}
                </span>
              </td>
              <td className="py-5 text-[0.9375rem] leading-relaxed text-steel-500">
                {row.items.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MillLogos({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-3 items-center gap-x-8 gap-y-6 sm:grid-cols-6", className)}>
      {partners.map((p) => (
        <li key={p.name} className="relative h-10 lg:h-12">
          {p.logo && (
            <Image
              src={p.logo}
              alt={p.name}
              fill
              sizes="140px"
              className={cn(
                "object-contain object-left transition-opacity duration-300",
                tone === "light" ? "opacity-60 [filter:brightness(0)] hover:opacity-90" : "opacity-60 [filter:brightness(0)_invert(1)] hover:opacity-100"
              )}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
