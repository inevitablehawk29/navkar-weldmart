import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
  /** Tailwind aspect class for the photo plate */
  aspect?: string;
  sizes?: string;
  tone?: "light" | "dark";
  priority?: boolean;
}

export function ProjectCard({
  project,
  className,
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  tone = "light",
  priority,
}: ProjectCardProps) {
  const dark = tone === "dark";
  return (
    <Link href={`/projects/${project.id}`} className={cn("group block", className)}>
      <div className={cn("relative overflow-hidden", aspect, dark ? "bg-mill-800" : "bg-galv-200")}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority={priority}
          sizes={sizes}
          className="photo-grade object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.035]"
        />
      </div>
      <div
        className={cn(
          "mt-4 grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1 border-t pt-3",
          dark ? "border-white/15" : "border-zinc-line"
        )}
      >
        <h3 className="type-h4 text-[1.25rem]">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
            {project.title}
          </span>
        </h3>
        {project.year && (
          <span className={cn("text-sm tabular", dark ? "text-steel-300" : "text-steel-500")}>{project.year}</span>
        )}
        <p className={cn("col-span-2 text-sm", dark ? "text-steel-300" : "text-steel-500")}>
          {project.category}
          {project.location ? `, ${project.location}` : ""}
        </p>
      </div>
    </Link>
  );
}
