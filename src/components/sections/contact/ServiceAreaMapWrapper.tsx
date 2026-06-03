"use client";

import dynamic from "next/dynamic";

const ServiceAreaMap = dynamic(
  () => import("./ServiceAreaMap").then((mod) => mod.ServiceAreaMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-[4/3] max-w-[800px] mx-auto bg-foreground/[0.02] border border-border/40 animate-pulse flex items-center justify-center rounded-sm">
        <span className="text-xs text-muted font-mono uppercase tracking-widest">
          Loading interactive map...
        </span>
      </div>
    ),
  }
);

export function ServiceAreaMapWrapper() {
  return <ServiceAreaMap />;
}
