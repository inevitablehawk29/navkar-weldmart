"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        "group relative block overflow-hidden bg-foreground flex-shrink-0",
        "w-[280px] sm:w-[320px] lg:w-[340px]",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 340px"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-heading text-xl sm:text-2xl text-white leading-tight tracking-wide uppercase">
          {project.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-white/70 uppercase tracking-wider">
            {project.category}
          </span>
          <ArrowRight className="w-4 h-4 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
        </div>
      </div>
    </Link>
  );
}
