import { SectionLabel } from "@/components/shared/section-label";
import { companyInfo, contactInfo } from "@/content";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Navkar Weldmart.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    url: "/privacy",
    title: "Privacy Policy | Navkar Weldmart",
    description: "Privacy Policy for Navkar Weldmart.",
  },
  twitter: {
    title: "Privacy Policy | Navkar Weldmart",
    description: "Privacy Policy for Navkar Weldmart.",
  },
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <SectionLabel className="mb-6">Legal</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-heading text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-muted">
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">1. Information We Collect</h2>
            <p>
              When you contact {companyInfo.name} or use our services, we may collect your name, email address, phone number, and project details to respond to your enquiry and provide our services.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">2. How We Use Your Information</h2>
            <p>
              We use your information to understand your requirements, communicate with you, prepare estimates, and deliver our services. Our website also uses service providers for enquiry email delivery, security checks, and site analytics. We do not sell your personal data.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">3. Data Security</h2>
            <p>
              We take reasonable steps to protect personal information against unauthorized access or disclosure.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">4. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your information, email us at <a href={`mailto:${contactInfo.email}`} className="underline">{contactInfo.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
