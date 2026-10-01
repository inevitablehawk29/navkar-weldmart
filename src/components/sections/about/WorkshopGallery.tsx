import Image from "next/image";

const images = [
  { src: "/images/portfolio/intro-1.webp", alt: "Welding at night in the Navkar workshop", cls: "row-span-2" },
  { src: "/images/portfolio/custom-4.webp", alt: "Decorative steel piece being finished in the workshop", cls: "" },
  { src: "/images/portfolio/gates-2.webp", alt: "Fabricated residential gate", cls: "" },
  { src: "/images/portfolio/railings-3.webp", alt: "Steel staircase railing", cls: "row-span-2" },
  { src: "/images/portfolio/grills-1.webp", alt: "Fabricated grills stacked for dispatch", cls: "" },
  { src: "/images/portfolio/warehouse-4.webp", alt: "Steel structure on a commercial roof", cls: "" },
];

export function WorkshopGallery() {
  return (
    <section className="section-y-sm bg-galv-100">
      <div className="container-wide">
        <h2 className="type-h2">In the workshop and on site</h2>
        <ul className="mt-12 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] lg:auto-rows-[240px] lg:grid-cols-4 lg:gap-4">
          {images.map((img) => (
            <li key={img.src} className={`relative overflow-hidden bg-galv-200 ${img.cls}`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="photo-grade object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
