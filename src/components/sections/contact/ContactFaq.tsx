"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/content";

export function ContactFaq() {

  return (
    <section className="py-10 lg:py-12 bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-base text-muted">
              Everything you need to know about working with Navkar Weldmart.
            </p>
          </div>
          
          <div className="lg:col-span-7">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-medium text-foreground hover:text-accent py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted leading-relaxed pb-4 pr-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
