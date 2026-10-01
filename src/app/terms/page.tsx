import { companyInfo } from "@/content";

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Navkar Weldmart services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    url: "/terms",
    title: "Terms & Conditions | Navkar Weldmart",
    description: "Terms and Conditions for Navkar Weldmart services.",
  },
  twitter: {
    title: "Terms & Conditions | Navkar Weldmart",
    description: "Terms and Conditions for Navkar Weldmart services.",
  },
};

export default function TermsPage() {
  return (
    <section className="bg-galv-100 pb-24 pt-[calc(var(--header-h)+4rem)] lg:pb-32 lg:pt-[calc(var(--header-h)+6rem)]">
      <div className="container-wide">
        <div className="max-w-[68ch]">
          <h1 className="type-h1 mb-12">
            Terms & Conditions
          </h1>
          
          <div className="space-y-4 text-[1.0625rem] leading-relaxed text-steel-500">
            <h2 className="type-h3 !mt-12 text-foreground">1. Agreement to Terms</h2>
            <p>
              By engaging {companyInfo.name} for any fabrication or material supply services, you agree to be bound by these Terms and Conditions. Please read them carefully.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">2. Minimum Order Quantity (MOQ)</h2>
            <p>
              {companyInfo.moq.note} Our standard MOQ is {companyInfo.moq.weight} or an equivalent value of {companyInfo.moq.value}. Exceptions are made on a case-by-case basis at our discretion.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">3. Quotations and Pricing</h2>
            <p>
              All quotations are valid for 15 days from the date of issue unless otherwise specified. Prices are subject to change due to fluctuations in raw steel and iron market rates. Final pricing will be confirmed before project commencement.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">4. Payment Terms</h2>
            <p>
              Standard payment terms involve an advance deposit prior to the procurement of materials and commencement of fabrication, followed by stage-wise payments as per the project agreement.
            </p>
            
            <h2 className="type-h3 !mt-12 text-foreground">5. Delivery and Installation</h2>
            <p>
              While we strive to meet all estimated timelines, {companyInfo.name} is not liable for delays caused by unforeseen circumstances, including but not limited to severe weather, supply chain disruptions, or site unreadiness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
