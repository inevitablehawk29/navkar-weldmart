import { CTASection } from "@/components/shared/cta-section";

export function AboutCTA() {
  return (
    <CTASection
      title="Let's build something that lasts."
      description="Whether it's a large-scale industrial shed or a premium residential project, we have the experience and materials to bring your vision to life."
      actions={[
        { label: "Get a Quote", href: "/contact?subject=quote", variant: "primary", icon: true },
        { label: "Contact Us", href: "/contact", variant: "secondary", icon: true },
      ]}
    />
  );
}
