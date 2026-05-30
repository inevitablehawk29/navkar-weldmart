"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { contactInfo } from "@/content";

export function ContactHero() {
  return (
    <section className="pt-20 pb-8 lg:pt-24 lg:pb-10 overflow-hidden">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl"
          >
            <p className="section-label mb-4">GET IN TOUCH</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-foreground leading-[1] tracking-tight mb-6">
              Let&apos;s discuss your project.
            </h1>
            <div className="accent-line mb-6" />
            <p className="text-base md:text-lg text-muted mb-8 leading-relaxed font-medium">
              Whether you&apos;re planning a warehouse structure, architectural metalwork, residential fabrication, or material procurement, we&apos;re ready to help.
            </p>
            
            <div className="flex flex-wrap gap-2 lg:gap-3 pt-6">
              <a href={`tel:${contactInfo.phones[0].replace(/\s/g, "")}`} className="flex flex-col gap-0.5 group bg-background border border-border px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:border-accent/50 transition-all">
                <div className="flex items-center gap-1.5 text-muted group-hover:text-foreground transition-colors">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Phone</span>
                </div>
                <span className="text-xs font-medium text-foreground">{contactInfo.phones[0]}</span>
              </a>
              <a href={`https://wa.me/${contactInfo.phones[0].replace(/\s/g, "").replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="flex flex-col gap-0.5 group bg-background border border-border px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:border-[#25D366]/50 transition-all">
                <div className="flex items-center gap-1.5 text-muted group-hover:text-foreground transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
                </div>
                <span className="text-xs font-medium text-foreground">{contactInfo.phones[0]}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex flex-col gap-0.5 group bg-background border border-border px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:border-accent/50 transition-all">
                <div className="flex items-center gap-1.5 text-muted group-hover:text-foreground transition-colors">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
                </div>
                <span className="text-xs font-medium text-foreground">{contactInfo.email}</span>
              </a>
              <a href="https://maps.google.com/?q=Navkar+Weldmart+Indore" target="_blank" rel="noopener noreferrer" className="flex flex-col gap-0.5 group bg-background border border-border px-3 py-2 rounded-lg shadow-sm hover:shadow-md hover:border-accent/50 transition-all">
                <div className="flex items-center gap-1.5 text-muted group-hover:text-foreground transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Location</span>
                </div>
                <span className="text-xs font-medium text-foreground">Indore, MP</span>
              </a>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[250px] lg:h-[350px] w-full max-w-md mx-auto lg:ml-auto rounded-lg overflow-hidden group"
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
            <Image
              src="/images/portfolio/gates-1.webp"
              alt="Navkar Weldmart Project"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
