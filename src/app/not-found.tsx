import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
};

const routes = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Material supply", href: "/material-supply" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <section className="bg-galv-100">
      <div className="container-wide grid min-h-[80svh] content-center gap-12 pb-20 pt-[calc(var(--header-h)+4rem)] lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="type-figure text-[clamp(5rem,14vw,11rem)] text-steel-300">404</p>
          <h1 className="type-h1 mt-2 max-w-[13ch]">This page isn&apos;t on the drawing</h1>
          <p className="type-lead mt-6 max-w-[44ch] text-steel-500">
            The link may be old or mistyped. Try one of these, or go back to the home page.
          </p>
          <Link href="/" className="btn btn-primary mt-10">
            Go to the home page
          </Link>
        </div>
        <ul className="self-end border-t border-foreground lg:col-span-4 lg:col-start-9">
          {routes.map((r) => (
            <li key={r.href} className="border-b border-zinc-line">
              <Link href={r.href} className="type-h4 block py-4 hover:text-arc">
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
