import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";

const images = [
  { src: "/images/portfolio/custom-8.webp", alt: "Custom structural steel fabrication workshop process in Indore" },
  { src: "/images/portfolio/warehouse-6.webp", alt: "Industrial warehouse shed steel framework assembly" },
  { src: "/images/portfolio/elevation-2.webp", alt: "Building elevation architectural metalwork fabrication" },
  { src: "/images/portfolio/gates-2.webp", alt: "Heavy-duty residential gate precision welding and fabrication" },
  { src: "/images/portfolio/railings-3.webp", alt: "Precision steel railings fabrication" },
  { src: "/images/portfolio/grills-2.webp", alt: "Custom safety grills welding and assembly" },
];

export function WorkshopGallery() {
  return (
    <section className="py-24 bg-background">
      <div className="container-wide">
        <FadeIn
          viewTrigger
          direction="up"
          className="mb-12"
        >
          <p className="section-label mb-4">Our Workshop</p>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground">
            Where precision takes shape.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {images.map((img, index) => (
            <FadeIn
              key={index}
              viewTrigger
              direction="none"
              delay={index * 0.1}
              className="relative aspect-[4/5] w-full overflow-hidden bg-muted/10 rounded-sm"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

