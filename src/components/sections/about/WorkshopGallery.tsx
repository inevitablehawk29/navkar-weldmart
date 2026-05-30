"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/images/portfolio/custom-8.webp", alt: "Custom structural steel fabrication workshop process in Indore" },
  { src: "/images/portfolio/warehouse-6.webp", alt: "Industrial warehouse shed steel framework assembly" },
  { src: "/images/portfolio/elevation-2.webp", alt: "Building elevation architectural metalwork fabrication" },
  { src: "/images/portfolio/gates-2.webp", alt: "Heavy-duty residential gate precision welding and fabrication" },
];

export function WorkshopGallery() {
  return (
    <section className="py-24 bg-background">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="section-label mb-4">Our Workshop</p>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground">
            Where precision takes shape.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative aspect-[4/5] w-full overflow-hidden bg-muted/10 rounded-sm"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
