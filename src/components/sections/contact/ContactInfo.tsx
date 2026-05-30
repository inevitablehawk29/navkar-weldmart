import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

import { contactInfo } from "@/content";

export function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Phone",
      content: contactInfo.phones[0],
      href: `tel:${contactInfo.phones[0].replace(/\s/g, "")}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: contactInfo.phones[0],
      href: `https://wa.me/${contactInfo.phones[0].replace(/\s/g, "").replace("+", "")}`,
    },
    {
      icon: Mail,
      title: "Email",
      content: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Indore, Madhya Pradesh",
      href: "https://maps.google.com/?q=Navkar+Weldmart+Indore",
    },
  ];

  return (
    <section className="py-8 bg-background border-b border-border">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <a
                key={index}
                href={detail.href}
                target={detail.icon === MapPin || detail.icon === MessageCircle ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col items-start p-6 rounded-xl bg-card hover:bg-surface-dark hover:text-white transition-all duration-300 border border-border shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-medium text-muted group-hover:text-gray-300 mb-2 uppercase tracking-wider">
                  {detail.title}
                </h3>
                <p className="text-base font-medium text-foreground group-hover:text-white">
                  {detail.content}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
