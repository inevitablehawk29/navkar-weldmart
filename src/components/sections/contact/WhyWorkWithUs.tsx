import { Shield, Clock, HardHat, FileText } from "lucide-react";

export function WhyWorkWithUs() {
  const benefits = [
    {
      icon: FileText,
      title: "Detailed Quotation",
      description: "We provide comprehensive itemized quotes so you know exactly what you're paying for without hidden costs."
    },
    {
      icon: Clock,
      title: "Site Visit & Measurement",
      description: "Our engineers visit your site to understand the ground reality and ensure accurate execution."
    },
    {
      icon: HardHat,
      title: "Experienced Project Execution",
      description: "From fabrication to erection, our seasoned team ensures high-quality structural work done safely and on time."
    },
    {
      icon: Shield,
      title: "Material + Fabrication Under One Roof",
      description: "We source premium steel and fabricate it in-house, ensuring consistent quality control from start to finish."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-2xl">
        <h3 className="text-3xl font-heading text-foreground mb-6">Why work with us?</h3>
        <p className="text-base text-muted">
          We bring structural integrity, transparent pricing, and seamless execution to every project we undertake.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-surface flex items-center justify-center text-accent">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
