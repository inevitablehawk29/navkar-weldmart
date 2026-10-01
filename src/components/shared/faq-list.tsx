import { Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content";

export function FaqSection({ title = "Questions we get asked" }: { title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="section-y-sm bg-galv-100">
      <div className="container-wide grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <h2 id="faq-title" className="type-h2 max-w-[10ch] lg:col-span-4">
          {title}
        </h2>
        <Accordion type="single" collapsible className="border-t border-foreground lg:col-span-7 lg:col-start-6">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`} className="border-b border-zinc-line">
              <AccordionTrigger className="group/faq rounded-none py-5 text-left text-[1.0625rem] font-semibold hover:no-underline hover:text-arc focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden">
                <span className="pr-6">{faq.question}</span>
                <Plus
                  aria-hidden
                  className="mt-0.5 h-5 w-5 shrink-0 text-steel-500 transition-transform duration-300 ease-[var(--ease-out-expo)] group-aria-expanded/accordion-trigger:rotate-45"
                />
              </AccordionTrigger>
              <AccordionContent className="max-w-[60ch] pb-6 text-[0.9875rem] leading-relaxed text-steel-500">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
