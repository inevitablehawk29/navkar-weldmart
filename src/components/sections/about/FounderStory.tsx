"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function FounderStory() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 relative"
          >
            <Quote className="absolute -top-10 -left-6 lg:-left-12 w-20 h-20 text-primary/10 rotate-180" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-heading text-foreground relative z-10">
              &quot;What started as a hardware business grew into a full-service fabrication company built on uncompromising quality.&quot;
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg prose-p:text-muted"
            >
              <p>
                When Navkar Hardware first opened its doors, our vision was simple: supply the best quality materials to the builders and fabricators of Madhya Pradesh. But as we worked closely with our clients, we noticed a recurring gap in the market. 
              </p>
              <p>
                While good materials were available, consistent execution and reliable fabrication were hard to find. Projects were delayed, quality was compromised, and clients were often left frustrated.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg prose-p:text-muted"
            >
              <p>
                That realization marked a turning point. We didn&apos;t just want to supply the steel; we wanted to shape it. We set up our own fabrication workshop, bringing together skilled craftsmen and investing in modern equipment.
              </p>
              <p>
                Today, as Navkar Weldmart, we handle end-to-end structural projects. From the initial material estimation to the final coat of paint, we take full ownership. It&apos;s not just about building structures; it&apos;s about building trust that lasts for generations.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
