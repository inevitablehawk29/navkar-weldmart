import { SectionLabel } from "@/components/shared/section-label";
import { companyInfo } from "@/content";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Navkar Weldmart services.",
};

export default function TermsPage() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-background">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <SectionLabel className="mb-6">Legal</SectionLabel>
          <h1 className="text-4xl md:text-5xl font-heading text-foreground mb-8">
            Terms & Conditions
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-muted">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">1. Agreement to Terms</h2>
            <p>
              By engaging {companyInfo.name} for any fabrication or material supply services, you agree to be bound by these Terms and Conditions. Please read them carefully.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">2. Minimum Order Quantity (MOQ)</h2>
            <p>
              {companyInfo.moq.note} Our standard MOQ is {companyInfo.moq.weight} or an equivalent value of {companyInfo.moq.value}. Exceptions are made on a case-by-case basis at our discretion.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">3. Quotations and Pricing</h2>
            <p>
              All quotations are valid for 15 days from the date of issue unless otherwise specified. Prices are subject to change due to fluctuations in raw steel and iron market rates. Final pricing will be confirmed before project commencement.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">4. Payment Terms</h2>
            <p>
              Standard payment terms involve an advance deposit prior to the procurement of materials and commencement of fabrication, followed by stage-wise payments as per the project agreement.
            </p>
            
            <h2 className="text-foreground font-heading text-2xl mt-12 mb-4">5. Delivery and Installation</h2>
            <p>
              While we strive to meet all estimated timelines, {companyInfo.name} is not liable for delays caused by unforeseen circumstances, including but not limited to severe weather, supply chain disruptions, or site unreadiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
