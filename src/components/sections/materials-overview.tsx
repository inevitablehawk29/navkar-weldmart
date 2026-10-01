import Link from "next/link";
import { companyInfo } from "@/content";
import { MaterialCatalogue, MillLogos } from "./material-catalogue";

export function MaterialsOverview() {
  return (
    <section id="materials" className="section-y bg-galv-100">
      <div className="container-wide">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="type-h2 max-w-[12ch]">Mill steel, stocked in Indore</h2>
            <p className="type-lead mt-6 max-w-[40ch] text-steel-500">
              We buy direct from the mills and keep common sections in stock, so fabrication
              starts on time and you can order material on its own.
            </p>

            <dl className="mt-10 grid max-w-sm grid-cols-2 border-t border-foreground">
              <div className="border-r border-zinc-line py-4 pr-4">
                <dt className="type-label text-steel-500">Minimum order</dt>
                <dd className="type-figure mt-2 text-[2rem]">{companyInfo.moq.weight.replace("Tons", "tonnes")}</dd>
              </div>
              <div className="py-4 pl-4">
                <dt className="type-label text-steel-500">or order value</dt>
                <dd className="type-figure mt-2 text-[2rem]">{companyInfo.moq.value.replace("Lacs", "lakh")}</dd>
              </div>
            </dl>

            <Link href="/material-supply" className="btn btn-ink mt-10">
              Material supply
            </Link>
          </div>

          <MaterialCatalogue className="lg:col-span-7" />
        </div>

        <div className="mt-20 grid gap-6 border-t border-zinc-line pt-8 lg:grid-cols-12 lg:gap-16">
          <p className="type-label text-steel-500 lg:col-span-3">Sourced from</p>
          <MillLogos className="lg:col-span-9" />
        </div>
      </div>
    </section>
  );
}
