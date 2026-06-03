import { clients } from "@/content";
import { FadeIn } from "@/components/animations/fade-in";

// Group clients by category
const categoriesMap = clients.reduce((acc, client) => {
  if (!acc[client.category]) {
    acc[client.category] = [];
  }
  acc[client.category].push(client.name);
  return acc;
}, {} as Record<string, string[]>);


const categories = [
  {
    title: "Architects & Engineers",
    items: categoriesMap["Architects & Engineers"] || [],
  },
  {
    title: "Commercial Projects",
    items: categoriesMap["Commercial"] || [],
  },
  {
    title: "Residential Clients",
    items: categoriesMap["Residential"] || [],
  },
  {
    title: "BNI Members",
    items: categoriesMap["BNI Members"] || [],
  },
];

export function ClientCategories() {
  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="container-wide">
        <FadeIn
          viewTrigger
          direction="up"
          className="mb-16"
        >
          <p className="section-label mb-4">Who Trusts Us</p>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground max-w-2xl">
            Trusted by those who know steel best.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {categories.map((category, index) => (
            <FadeIn
              key={category.title}
              viewTrigger
              direction="up"
              delay={index * 0.1}
              className="flex flex-col w-full"
            >
              <div className="h-[2px] w-12 bg-accent mb-6" />
              <h3 className="text-xl font-heading text-foreground mb-6 uppercase tracking-wide">
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item: string, itemIndex: number) => (
                  <li key={itemIndex} className="text-muted text-sm font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

