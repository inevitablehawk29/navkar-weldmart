import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  crumbs: Crumb[];
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Right-hand column on desktop (facts, actions) */
  aside?: React.ReactNode;
  /** Content shown under the lead (actions, facts) */
  below?: React.ReactNode;
  image?: { src: string; alt: string; position?: string };
  /** "side" keeps lower-resolution photos at roughly native size */
  imageLayout?: "bleed" | "side";
  className?: string;
}

export function PageHeader({
  crumbs,
  title,
  lead,
  aside,
  below,
  image,
  imageLayout = "bleed",
  className,
}: PageHeaderProps) {
  const side = image && imageLayout === "side";
  const right = side ? (
    <div className="relative aspect-[4/3] overflow-hidden bg-mill-900 lg:aspect-[4/5]">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(min-width: 1024px) 34vw, 100vw"
        className="animate-settle photo-grade object-cover"
        style={{ objectPosition: image.position ?? "center" }}
      />
    </div>
  ) : (
    aside
  );

  return (
    <header className={cn("bg-galv-100", className)}>
      <div className="container-wide pb-12 pt-[calc(var(--header-h)+3rem)] lg:pb-16 lg:pt-[calc(var(--header-h)+5rem)]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-steel-500">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="text-steel-300">/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-arc">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-foreground">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 grid gap-x-16 gap-y-10 lg:mt-10 lg:grid-cols-12">
          <div className={right ? "lg:col-span-7" : "lg:col-span-10"}>
            <h1 className="type-h1 max-w-[16ch]">{title}</h1>
            {lead && <div className="type-lead mt-6 max-w-[54ch] text-steel-500 lg:mt-8">{lead}</div>}
            {below && <div className="mt-10">{below}</div>}
          </div>
          {right && <div className={side ? "lg:col-span-5 lg:col-start-8" : "self-end lg:col-span-4 lg:col-start-9"}>{right}</div>}
        </div>
      </div>

      {image && !side && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-mill-900 sm:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="animate-settle photo-grade object-cover"
            style={{ objectPosition: image.position ?? "center" }}
          />
        </div>
      )}
    </header>
  );
}

/** A two-column facts table, the same device as the hero title block. */
export function FactTable({ rows, className }: { rows: { label: string; value: React.ReactNode }[]; className?: string }) {
  return (
    <dl className={cn("border-t border-foreground", className)}>
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-zinc-line py-3 text-[0.9375rem]">
          <dt className="text-steel-500">{r.label}</dt>
          <dd className="font-medium">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
