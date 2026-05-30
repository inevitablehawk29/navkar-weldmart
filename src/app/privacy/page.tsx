import { SectionLabel } from "@/components/shared/section-label";
import { companyInfo } from "@/content";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Navkar Weldmart.",
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
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">1. Information We Collect</h2>
            <p>
              When you contact {companyInfo.name} or use our services, we may collect personal information such as your name, email address, phone number, and project details. We use this information solely to provide you with quotations, updates, and customer service.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">2. How We Use Your Information</h2>
            <p>
              Your information is used to understand your project requirements, facilitate communication, provide accurate estimates, and deliver our fabrication and supply services. We do not sell or share your personal data with third parties for marketing purposes.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">3. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at {companyInfo.social.whatsapp} or email us directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
