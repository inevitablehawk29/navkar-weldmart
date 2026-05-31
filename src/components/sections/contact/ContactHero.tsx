"use client";

import { ProjectEnquiryForm } from "./ProjectEnquiryForm";

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
            className="w-full max-w-3xl pr-0 lg:pr-8"
          >
            <p className="section-label mb-4">GET IN TOUCH</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-foreground leading-[1] tracking-tight mb-6">
              Let&apos;s discuss your project.
            </h1>
            <div className="accent-line mb-6" />
            <p className="text-sm md:text-base text-muted mb-3 leading-relaxed max-w-2xl">
              Whether you&apos;re planning a warehouse structure, architectural metalwork, residential fabrication, or material procurement, we&apos;re ready to help.
            </p>
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.15em] mb-6">
              Trusted by contractors, builders, and manufacturers across Central India.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
              <a href={`tel:${contactInfo.phones[0].replace(/\s/g, "")}`} className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 shrink-0 mt-1">
                  <Phone className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Direct Line</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{contactInfo.phones[0]}</p>
                </div>
              </a>
              
              <a href={`https://wa.me/${contactInfo.phones[0].replace(/\s/g, "").replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors duration-300 shrink-0 mt-1">
                  <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">WhatsApp</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-[#25D366] transition-colors">{contactInfo.phones[0]}</p>
                </div>
              </a>

              <a href={`mailto:${contactInfo.email}`} className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 shrink-0 mt-1">
                  <Mail className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Email Support</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">{contactInfo.email}</p>
                </div>
              </a>

              <a href="https://maps.google.com/?q=Navkar+Weldmart+Indore" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 shrink-0 mt-1">
                  <MapPin className="w-4 h-4 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Office Location</p>
                  <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">Indore, MP</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl mx-auto lg:ml-auto"
          >
            <ProjectEnquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
