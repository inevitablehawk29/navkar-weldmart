"use client";

import { usePathname } from "next/navigation";
import { contactInfo, companyInfo } from "@/content";
import { FooterForm } from "./footer-form";

export function FooterCta() {
  const pathname = usePathname();
  // The contact page carries the full enquiry form; don't repeat a second one.
  if (pathname === "/contact") return null;

  return (
    <div className="container-wide section-y-sm grid gap-x-16 gap-y-14 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h2 className="type-h1 max-w-[11ch]">Tell us what you&apos;re building.</h2>
        <p className="type-lead mt-6 max-w-[40ch] text-steel-300">
          Send a drawing, a photo of the site or a few lines about the job. We&apos;ll call
          back to talk it through, and arrange a site visit if it needs one.
        </p>

        <dl className="mt-12 grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="type-label text-steel-400">Call</dt>
            <dd className="mt-2 space-y-1">
              {contactInfo.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="type-h3 block tabular hover:text-arc-light">
                  {p}
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt className="type-label text-steel-400">Message</dt>
            <dd className="mt-2 space-y-2 text-lg">
              <a href={companyInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="link-rule block w-fit">
                WhatsApp
              </a>
              <a href={`mailto:${contactInfo.email}`} className="link-rule block w-fit break-all">
                {contactInfo.email}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <FooterForm />
      </div>
    </div>
  );
}
