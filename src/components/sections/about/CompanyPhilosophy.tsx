import { companyInfo } from "@/content";

export function CompanyPhilosophy() {
  return (
    <section className="section-y-sm bg-galv-100">
      <div className="container-wide grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <h2 className="type-h2 max-w-[9ch] lg:col-span-4">What we hold to</h2>
        <dl className="grid gap-10 border-t border-foreground pt-8 sm:grid-cols-2 lg:col-span-8">
          <div>
            <dt className="type-label text-steel-500">Mission</dt>
            <dd className="type-lead mt-3">{companyInfo.mission}</dd>
          </div>
          <div>
            <dt className="type-label text-steel-500">Vision</dt>
            <dd className="type-lead mt-3">{companyInfo.vision}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
