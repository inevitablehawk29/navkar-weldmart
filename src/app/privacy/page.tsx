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
    <section className="bg-galv-100 pb-24 pt-[calc(var(--header-h)+4rem)] lg:pb-32 lg:pt-[calc(var(--header-h)+6rem)]">
      <div className="container-wide">
        <div className="max-w-[68ch]">
          <h1 className="type-h1 mb-12">
            Privacy Policy
          </h1>
          
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-steel-500">
            <h2 className="type-h3 !mt-12 text-foreground">1. Information We Collect</h2>
            <p>
              When you contact {companyInfo.name} or use our services, we may collect your name, email address, phone number, and project details to respond to your enquiry and provide our services.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">2. How We Use Your Information</h2>
            <p>
              We use your information to understand your requirements, communicate with you, prepare estimates, and deliver our services. Our website also uses service providers for enquiry email delivery, security checks, and site analytics. We do not sell your personal data.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">3. Data Security</h2>
            <p>
              We take reasonable steps to protect personal information against unauthorized access or disclosure.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">4. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or your information, email us at <a href={`mailto:${contactInfo.email}`} className="underline">{contactInfo.email}</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
