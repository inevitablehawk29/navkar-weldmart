import { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ProjectEnquiryForm } from "@/components/sections/contact/ProjectEnquiryForm";
import { WhyWorkWithUs } from "@/components/sections/contact/WhyWorkWithUs";
import { NextSteps } from "@/components/sections/contact/NextSteps";
import { ServiceArea } from "@/components/sections/contact/ServiceArea";
import { ContactFaq } from "@/components/sections/contact/ContactFaq";
import { ContactCTA } from "@/components/sections/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Navkar Weldmart for premium steel fabrication, structural solutions, and material supply. We serve Indore, Bhopal, and major cities in Madhya Pradesh.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      
      <section className="py-12 lg:py-16 bg-background border-t border-border" id="why-us">
        <div className="container-wide">
          <WhyWorkWithUs />
        </div>
      </section>

      <NextSteps />
      <ServiceArea />
      <ContactFaq />
      <ContactCTA />
    </>
  );
}
