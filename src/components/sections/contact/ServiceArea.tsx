import { MapPin } from "lucide-react";
import { ServiceAreaMapWrapper } from "./ServiceAreaMapWrapper";

export function ServiceArea() {
  const cities = [
    "Indore",
    "Bhopal",
    "Ujjain",
    "Dewas",
    "Pithampur",
    "Mhow"
  ];

  return (
    <section className="py-10 lg:py-12 bg-background overflow-hidden border-t border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="block text-xs font-semibold tracking-[0.2em] text-accent uppercase mb-3">
              Across Madhya Pradesh.
            </span>
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4 uppercase">
              Indore & Beyond.
            </h2>
            <p className="text-base text-muted leading-relaxed max-w-lg mb-8">
              We undertake projects across Indore and major cities in Madhya Pradesh, bringing our expertise right to your site.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                    <MapPin className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{city}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative h-full min-h-[400px] flex items-center justify-center lg:justify-end">
            <ServiceAreaMapWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}
