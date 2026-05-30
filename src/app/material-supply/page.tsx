
import { materialCategories } from "@/content";
import { SectionLabel } from "@/components/shared/section-label";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata = {
  title: "Material Supply",
  description: "Premium iron and steel materials for all your construction and fabrication needs.",
};

export default function MaterialSupplyPage() {
  return (
    <>
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-surface border-b border-border">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Intro Text */}
            <FadeIn className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-4">
              <SectionLabel className="mb-4">Material Supply</SectionLabel>
              <h1 className="text-4xl lg:text-5xl font-heading text-foreground leading-[1.1] tracking-tight mb-6">
                Premium steel <br />
                <span className="text-muted">for every build.</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-10">
                As a trusted supplier, we provide high-grade iron and steel materials directly from top manufacturers. Whether you need structural steel, pipes, or fabrication consumables, we ensure quality and competitive pricing.
              </p>
              
              <div className="pt-8 border-t border-border">
                <h2 className="text-2xl font-heading text-foreground mb-3">Our Inventory</h2>
                <p className="text-sm text-muted leading-relaxed">
                  A comprehensive range of raw materials to support projects of any scale, ready for rapid dispatch and delivery.
                </p>
              </div>
            </FadeIn>
            
            {/* Right Column: Inventory Grid */}
            <FadeIn delay={0.2} className="lg:col-span-7">
              <div className="flex flex-wrap gap-4 lg:gap-6">
                {materialCategories.map((category, idx) => (
                  <Card key={idx} className="w-full sm:w-[280px] bg-background border border-border rounded-2xl hover:border-accent hover:shadow-md transition-all duration-300 p-0 gap-0">
                    <CardContent className="py-6 px-6 lg:py-6 lg:px-7">
                      <h3 className="text-base font-semibold text-foreground leading-snug mb-5">
                        {category.title}
                      </h3>
                      <ul className="space-y-3">
                        {category.items.map((item: string, itemIdx: number) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                            <span className="text-sm text-muted font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
