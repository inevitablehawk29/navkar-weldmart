"use client";

import { CTASection } from "@/components/shared/cta-section";

export function ContactCTA() {
  return (
    <CTASection
      title={<>Built on trust.<br />Engineered to last.</>}
      description="Let's build something that stands strong for generations."
      actions={[
        { label: "Get a Quote", onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }), variant: "primary", icon: true },
        { label: "Call Us", href: "tel:+919669769760", variant: "secondary", icon: false },
      ]}
    />
  );
}
