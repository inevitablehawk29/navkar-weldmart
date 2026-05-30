"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end pb-16 pt-32 lg:items-center lg:pb-0 lg:pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/homepage_hero_bg.webp"
          alt="Industrial steel structure fabricated by Navkar Weldmart"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/20 lg:via-background/80 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/30 lg:hidden" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="text-sm md:text-base font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Navkar Weldmart
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-foreground mb-5">
              Precision steel
              <br />
              fabrication built
              <br />
              for strength
              <br />
              and scale<span className="text-primary">.</span>
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6 text-xs font-medium text-foreground">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">13+</span>
                <span className="text-muted">Years Experience</span>
              </div>
              <div className="hidden sm:block w-px bg-border"></div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">50+</span>
                <span className="text-muted">Projects Delivered</span>
              </div>
              <div className="hidden sm:block w-px bg-border"></div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">100%</span>
                <span className="text-muted">Custom Fabrication</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 text-sm font-medium hover:bg-primary/90 transition-colors duration-300 group rounded-md"
              >
                View Our Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-input bg-background px-8 py-4 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300 group rounded-md"
              >
                Let&apos;s Talk
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right side — Project label (visible on lg+) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-end"
          >
            <div className="bg-surface/90 backdrop-blur-sm border border-border px-6 py-4 max-w-xs relative overflow-hidden group cursor-default">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted mb-2">
                Recently Completed
              </p>
              <p className="text-lg text-foreground font-semibold leading-tight mb-1">
                Industrial Shed
              </p>
              <div className="flex items-center gap-2 text-sm text-muted">
                <span>10,000 Sq.Ft</span>
                <span className="w-1 h-1 rounded-full bg-accent"></span>
                <span>Indore, MP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
