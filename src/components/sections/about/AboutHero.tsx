import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Content */}
          <FadeIn
            direction="none"
            className="max-w-2xl"
          >
            <p className="section-label mb-6">About Navkar Weldmart</p>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-foreground mb-8">
              Built on trust.
              <br />
              <span className="text-muted">Engineered to last.</span>
            </h1>

            <div className="accent-line mb-8" />

            <div className="prose prose-lg prose-p:text-muted prose-p:leading-relaxed">
              <p className="text-lg md:text-xl text-foreground font-medium mb-4">
                What started as Navkar Hardware has grown into one of Madhya Pradesh&apos;s most trusted names in structural steel and fabrication.
              </p>
              <p>
                Through years of hands-on experience, expanding from a small fabrication workshop to executing large-scale industrial structures, we&apos;ve built our reputation on one simple principle: delivering exactly what we promise, without compromise.
              </p>
            </div>
          </FadeIn>

          {/* Image Content */}
          <FadeIn
            direction="left"
            delay={0.2}
            className="relative"
          >
            <div className="relative z-0 aspect-[4/5] w-full max-w-sm ml-auto lg:mr-0">
              <Image
                src="/images/jinesh-portrait-contact.jpg"
                alt="Jinesh Jain, Founder of Navkar Weldmart"
                fill
                className="object-cover object-[center_10%] grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Founder Label */}
              <div className="absolute -bottom-6 -left-6 md:-left-12 bg-surface p-6 border border-border shadow-xl">
                <p className="font-heading text-2xl mb-1">Jinesh Jain</p>
                <p className="text-sm text-muted uppercase tracking-widest font-medium">Founder, Navkar Weldmart</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -top-4 -right-4 w-full h-full border border-primary/20" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

