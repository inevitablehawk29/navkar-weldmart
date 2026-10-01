import { ServiceAreaMapWrapper } from "./ServiceAreaMapWrapper";

const cities = [
  "Indore",
  "Bhopal",
  "Ujjain",
  "Dewas",
  "Pithampur",
  "Mhow",
  "Khargone",
  "Maheshwar",
  "Dhar",
  "Aashta",
  "Badnawar",
  "Barwah",
  "Manawar",
];

export function ServiceArea() {
  return (
    <section className="section-y-sm bg-galv-100">
      <div className="container-wide grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="type-h2 max-w-[11ch]">Where we work</h2>
          <p className="type-lead mt-6 max-w-[40ch] text-steel-500">
            Based in Indore, working across western and central Madhya Pradesh. For larger
            jobs we travel further; ask us.
          </p>
          <ul className="mt-10 grid grid-cols-2 border-t border-foreground sm:grid-cols-3">
            {cities.map((city) => (
              <li key={city} className="border-b border-zinc-line py-2.5 text-[0.9375rem]">
                {city}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ServiceAreaMapWrapper />
        </div>
      </div>
    </section>
  );
}
