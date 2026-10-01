import Link from "next/link";
import { contactInfo, companyInfo } from "@/content";
import { ProjectEnquiryForm } from "./ProjectEnquiryForm";

const locations = [
  { name: "Indore", href: "https://maps.google.com/?q=Navkar+Weldmart+Indore" },
  { name: "Maheshwar", href: "https://maps.google.com/?q=Navkar+Weldmart+Maheshwar" },
];

export function ContactHero() {
  return (
    <section className="bg-galv-100">
      <div className="container-wide pb-20 pt-[calc(var(--header-h)+3rem)] lg:pb-28 lg:pt-[calc(var(--header-h)+5rem)]">
        <nav aria-label="Breadcrumb" className="text-sm text-steel-500">
          <Link href="/" className="hover:text-arc">
            Home
          </Link>
          <span aria-hidden className="mx-2 text-steel-300">/</span>
          <span aria-current="page" className="text-foreground">
            Contact
          </span>
        </nav>

        <div className="mt-8 grid gap-x-16 gap-y-14 lg:mt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="type-h1 max-w-[11ch]">Tell us about your project</h1>
            <p className="type-lead mt-6 max-w-[40ch] text-steel-500">
              Warehouses, sheds, facades, gates or a material order. Fill in the form, or call
              if it&apos;s quicker. Either way you&apos;ll speak to someone who knows steel.
            </p>

            <dl className="mt-12 border-t border-foreground">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-zinc-line py-4">
                <dt className="text-steel-500">Call</dt>
                <dd className="space-y-1">
                  {contactInfo.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="type-h4 block tabular hover:text-arc">
                      {p}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-zinc-line py-4">
                <dt className="text-steel-500">WhatsApp</dt>
                <dd>
                  <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-arc">
                    {contactInfo.phones[0]}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-zinc-line py-4">
                <dt className="text-steel-500">Email</dt>
                <dd>
                  <a href={`mailto:${contactInfo.email}`} className="break-all font-medium hover:text-arc">
                    {contactInfo.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-zinc-line py-4">
                <dt className="text-steel-500">Offices</dt>
                <dd className="flex gap-5">
                  {locations.map((l) => (
                    <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" className="link-rule font-medium">
                      {l.name}, MP
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <ProjectEnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
