"use client";

import { motion } from "framer-motion";
import { howWeExecuteSteps } from "@/content";
import { DynamicIcon } from "@/components/shared/dynamic-icon";

export function HowWeExecute() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/30 border-b border-border">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 lg:mb-24"
        >
          <p className="section-label mb-4">Our Process</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground mb-6">
            How We Execute
          </h2>
          <p className="text-lg text-muted">
            We control every step of the process. From the first sheet of steel to the final tightening of a bolt, our integrated approach ensures quality at every level.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {howWeExecuteSteps.map((step, index) => {
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                {/* Connecting Line (Desktop only) */}
                {index !== howWeExecuteSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-16 right-0 h-[1px] bg-border z-0" />
                )}

                <div className="relative z-10 bg-background border border-border w-12 h-12 flex items-center justify-center mb-6">
                  <DynamicIcon name={step.icon} className="w-5 h-5 text-primary" />
                </div>
                
                <h3 className="text-lg font-heading text-foreground mb-3 uppercase tracking-wider">
                  <span className="text-accent mr-2">0{index + 1}.</span> {step.title}
                </h3>
                
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
