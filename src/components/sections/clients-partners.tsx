"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { partners, testimonials } from "@/content";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function ClientsPartners() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="clients"
      className="py-20 lg:py-28 bg-surface-dark text-white"
      ref={ref}
    >
      <div className="container-wide">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-medium uppercase tracking-[0.15em] text-white/50 mb-10"
        >
          Trusted by Leading Clients & Partners
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Partner Logos + Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col justify-center"
          >
            {/* Partner Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-10 mb-16">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="relative flex items-center justify-center h-12 lg:h-16 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 120px, 160px"
                    />
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap text-white/40">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="relative bg-surface/5 p-8 rounded-lg border border-white/5">
              <Quote className="w-8 h-8 text-accent mb-6" />
              <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                  {testimonials.map((testimonial, idx) => (
                    <CarouselItem key={idx}>
                      <div className="flex flex-col h-full justify-between">
                        <blockquote className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 min-h-[120px]">
                          {testimonial.quote}
                        </blockquote>
                        <div className="flex items-center justify-between border-t border-white/10 pt-6">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              — {testimonial.author}
                            </p>
                            <p className="text-xs text-white/60 mt-1">
                              {testimonial.role}
                            </p>
                          </div>
                          <div className="w-24" /> {/* Spacer for static buttons */}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {testimonials.length > 1 && (
                  <div className="absolute bottom-0 right-0 flex gap-2 z-10 pointer-events-auto">
                    <CarouselPrevious className="static transform-none w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 bg-transparent flex items-center justify-center cursor-pointer" />
                    <CarouselNext className="static transform-none w-10 h-10 rounded-full border border-white/20 text-white/60 hover:text-white hover:border-white/50 hover:bg-white/5 bg-transparent flex items-center justify-center cursor-pointer" />
                  </div>
                )}
              </Carousel>
            </div>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex items-center justify-center lg:justify-end pt-8 lg:pt-0"
          >
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square">
              <Image
                src="/images/portfolio/intro-1.webp"
                alt="Navkar Weldmart Partners and Quality"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 1024px) 100vw, 512px"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
