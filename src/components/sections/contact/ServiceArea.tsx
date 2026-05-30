import { MapPin } from "lucide-react";

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
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
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
            <div className="w-full max-w-[500px] aspect-square rounded-full border border-border flex items-center justify-center p-12 relative opacity-20 hover:opacity-100 transition-opacity duration-700">
              {/* Decorative concentric circles to suggest reach/radius */}
              <div className="w-full h-full rounded-full border border-accent/30 flex items-center justify-center">
                <div className="w-[70%] h-[70%] rounded-full border border-accent/50 flex items-center justify-center">
                  <div className="w-[40%] h-[40%] rounded-full bg-accent flex items-center justify-center text-white">
                    <MapPin className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
