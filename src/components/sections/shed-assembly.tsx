"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/content";
import { cn } from "@/lib/utils";

/* ────────────────────────────────────────────────────────────────
   Geometry: a 5-bay portal-frame shed, 18 m span × 30 m long,
   7 m to the eaves, 9.5 m to the ridge. Units are metres; the
   projection turns them into SVG user units (≈ px at 800 wide).
   ──────────────────────────────────────────────────────────────── */

type V3 = [number, number, number]; // x (span), y (up), z (length)

const SPAN = 18;
const HALF = SPAN / 2;
const EAVE = 7;
const RIDGE = 9.5;
const BAY = 6;
const BAYS = 5;
const LEN = BAY * BAYS;
const frames = Array.from({ length: BAYS + 1 }, (_, i) => -LEN / 2 + i * BAY);

const THETA = (34 * Math.PI) / 180;
const PHI = (27 * Math.PI) / 180;
const SCALE = 20;

function project([x, y, z]: V3): [number, number] {
  const sx = x * Math.cos(THETA) + z * Math.sin(THETA);
  const d = -x * Math.sin(THETA) + z * Math.cos(THETA);
  const sy = -y * Math.cos(PHI) - d * Math.sin(PHI);
  return [+(sx * SCALE).toFixed(1), +(sy * SCALE).toFixed(1)];
}

const pts = (...vs: V3[]) => vs.map((v) => project(v).join(",")).join(" ");
const d = (...vs: V3[]) => "M" + vs.map((v) => project(v).join(",")).join("L");

const roofAt = (x: number) => EAVE + (RIDGE - EAVE) * (1 - Math.abs(x) / HALF);

/* ── Stage timing on scroll progress p ∈ [0, 1] ─────────────── */

const STEPS = processSteps.length; // 6
const at = (step: number, from: number, to: number) => ({
  "--a": (step + from) / STEPS,
  "--b": (step + to) / STEPS,
}) as React.CSSProperties;

/* ── Drawing primitives ──────────────────────────────────────── */

function Draw({ path, style, className }: { path: string; style: React.CSSProperties; className?: string }) {
  return <path d={path} pathLength={1} className={cn("draw", className)} style={style} />;
}

function Bubble({ at: p, label, style }: { at: V3; label: string; style: React.CSSProperties }) {
  const [x, y] = project(p);
  return (
    <g className="bubble" style={style}>
      <circle cx={x} cy={y} r={10} className="fill-galv-50 stroke-steel-400" strokeWidth={1} />
      <text x={x} y={y + 3.6} textAnchor="middle" className="fill-steel-500 text-[10px] font-semibold">
        {label}
      </text>
    </g>
  );
}

function Dimension({
  from,
  to,
  offset,
  label,
  step,
}: {
  from: V3;
  to: V3;
  offset: V3;
  label: string;
  step: number;
}) {
  const a: V3 = [from[0] + offset[0], from[1] + offset[1], from[2] + offset[2]];
  const b: V3 = [to[0] + offset[0], to[1] + offset[1], to[2] + offset[2]];
  const [ax, ay] = project(a);
  const [bx, by] = project(b);
  const [mx, my] = [(ax + bx) / 2, (ay + by) / 2];
  const angle = (Math.atan2(by - ay, bx - ax) * 180) / Math.PI;
  const upright = angle > 90 || angle < -90 ? angle + 180 : angle;
  const tick = (x: number, y: number) => `M${x - 4},${y + 4}L${x + 4},${y - 4}`;

  return (
    <g className="stroke-steel-400" strokeWidth={1}>
      <Draw path={d(from, a)} style={at(step, 0.1, 0.35)} />
      <Draw path={d(to, b)} style={at(step, 0.1, 0.35)} />
      <Draw path={d(a, b)} style={at(step, 0.25, 0.65)} />
      <path d={tick(ax, ay) + tick(bx, by)} className="fade stroke-foreground" strokeWidth={1.5} style={at(step, 0.55, 0.7)} />
      <g className="fade" style={at(step, 0.55, 0.8)}>
        <text
          transform={`translate(${mx} ${my}) rotate(${upright}) translate(0 -7)`}
          textAnchor="middle"
          className="fill-foreground stroke-none text-[11px] font-semibold tabular"
        >
          {label}
        </text>
      </g>
    </g>
  );
}

function ShedDrawing() {
  const purlinXs = [-HALF, -HALF * 0.66, -HALF * 0.33, 0, HALF * 0.33, HALF * 0.66, HALF];
  const girtYs = [2.4, 4.7];
  const sheetFrom = frames[2];
  const sheetTo = frames[BAYS];

  return (
    <svg viewBox="-420 -330 840 530" className="h-full w-full overflow-visible" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* 01 — Setting out: grid lines, bubbles, footings */}
      <g className="stroke-steel-300" strokeWidth={1} strokeDasharray="none">
        {[-HALF, HALF].map((x, i) => (
          <Draw key={`gx${x}`} path={d([x, 0, -LEN / 2 - 3], [x, 0, LEN / 2 + 2])} style={at(0, 0.1 + i * 0.1, 0.6 + i * 0.1)} className="grid-line" />
        ))}
        {frames.map((z, i) => (
          <Draw key={`gz${z}`} path={d([-HALF - 3, 0, z], [HALF + 2.5, 0, z])} style={at(0, 0.15 + i * 0.05, 0.55 + i * 0.05)} className="grid-line" />
        ))}
      </g>
      {["A", "B"].map((label, i) => (
        <Bubble key={label} label={label} at={[i === 0 ? -HALF : HALF, 0, -LEN / 2 - 4]} style={at(0, 0.5, 0.75)} />
      ))}
      {frames.map((z, i) => (
        <Bubble key={`b${z}`} label={String(i + 1)} at={[-HALF - 4, 0, z]} style={at(0, 0.55 + i * 0.04, 0.8 + i * 0.04)} />
      ))}
      {frames.flatMap((z) =>
        [-HALF, HALF].map((x) => (
          <polygon
            key={`f${x}${z}`}
            points={pts([x - 0.7, 0, z - 0.7], [x + 0.7, 0, z - 0.7], [x + 0.7, 0, z + 0.7], [x - 0.7, 0, z + 0.7])}
            className="fade fill-steel-300"
            style={at(0, 0.6, 0.95)}
          />
        ))
      )}

      {/* 02 — Estimate: the dimensions the quote is priced on */}
      <Dimension from={[-HALF, 0, -LEN / 2]} to={[HALF, 0, -LEN / 2]} offset={[0, 0, -2.2]} label="18.0 m span" step={1} />
      <Dimension from={[HALF, 0, -LEN / 2]} to={[HALF, 0, LEN / 2]} offset={[3.2, 0, 0]} label="5 bays × 6.0 m" step={1} />
      <Dimension from={[-HALF, 0, -LEN / 2]} to={[-HALF, EAVE, -LEN / 2]} offset={[-2.2, 0, 0]} label="7.0 m eave" step={1} />

      {/* Back-to-front so nearer members sit on top */}
      {/* 05 — Girts on the far wall */}
      <g className="stroke-steel-500" strokeWidth={1.5}>
        {girtYs.map((y, i) => (
          <Draw key={`gb${y}`} path={d([-HALF, y, -LEN / 2], [-HALF, y, LEN / 2])} style={at(4, 0.1 + i * 0.08, 0.45 + i * 0.08)} />
        ))}
      </g>

      {/* 03 — Fabricated members: columns rise, rafters land */}
      <g className="stroke-foreground" strokeWidth={3}>
        {[...frames].reverse().map((z, i) => (
          <g key={`fr${z}`}>
            <Draw path={d([-HALF, 0, z], [-HALF, EAVE, z])} style={at(2, 0.05 + i * 0.05, 0.35 + i * 0.05)} />
            <Draw path={d([HALF, 0, z], [HALF, EAVE, z])} style={at(2, 0.08 + i * 0.05, 0.38 + i * 0.05)} />
            <Draw
              path={d([-HALF, EAVE, z], [0, RIDGE, z], [HALF, EAVE, z])}
              style={at(2, 0.45 + i * 0.07, 0.75 + i * 0.05)}
            />
          </g>
        ))}
      </g>

      {/* 04 — Bracing in the end bays */}
      <g className="stroke-steel-500" strokeWidth={1.25}>
        {[0, BAYS - 1].flatMap((bay) => {
          const z0 = frames[bay];
          const z1 = frames[bay + 1];
          return [
            <Draw key={`wb${bay}a`} path={d([HALF, 0, z0], [HALF, EAVE, z1])} style={at(3, 0.05, 0.4)} />,
            <Draw key={`wb${bay}b`} path={d([HALF, EAVE, z0], [HALF, 0, z1])} style={at(3, 0.1, 0.45)} />,
            <Draw key={`rb${bay}a`} path={d([-HALF, EAVE, z0], [0, RIDGE, z1])} style={at(3, 0.15, 0.45)} />,
            <Draw key={`rb${bay}b`} path={d([0, RIDGE, z0], [-HALF, EAVE, z1])} style={at(3, 0.2, 0.5)} />,
            <Draw key={`rb${bay}c`} path={d([HALF, EAVE, z0], [0, RIDGE, z1])} style={at(3, 0.25, 0.55)} />,
            <Draw key={`rb${bay}d`} path={d([0, RIDGE, z0], [HALF, EAVE, z1])} style={at(3, 0.3, 0.6)} />,
          ];
        })}
      </g>

      {/* 05 — Purlins, near-side girts, roof sheeting over three bays */}
      <g className="stroke-steel-700" strokeWidth={1.5}>
        {purlinXs.map((x, i) => (
          <Draw key={`p${x}`} path={d([x, roofAt(x), -LEN / 2], [x, roofAt(x), LEN / 2])} style={at(4, 0.02 + i * 0.03, 0.3 + i * 0.03)} />
        ))}
        {girtYs.map((y, i) => (
          <Draw key={`gn${y}`} path={d([HALF, y, -LEN / 2], [HALF, y, LEN / 2])} style={at(4, 0.2 + i * 0.06, 0.5 + i * 0.06)} />
        ))}
      </g>
      {[-1, 1].map((side) => {
        const eave: V3 = [side * HALF, EAVE, 0];
        const ridge: V3 = [0, RIDGE, 0];
        const corrugations = Array.from({ length: 19 }, (_, k) => sheetFrom + ((sheetTo - sheetFrom) * (k + 0.5)) / 19);
        return (
          <g key={`roof${side}`} className="fade" style={at(4, 0.5, 0.9)}>
            <polygon
              points={pts(
                [eave[0], EAVE, sheetFrom],
                [0, RIDGE, sheetFrom],
                [0, RIDGE, sheetTo],
                [eave[0], EAVE, sheetTo]
              )}
              className={side < 0 ? "fill-galv-200" : "fill-[#CFD5D8]"}
              stroke="none"
            />
            <g className="stroke-steel-300" strokeWidth={0.75}>
              {corrugations.map((z) => (
                <path key={z} d={d([eave[0], EAVE, z], [ridge[0], RIDGE, z])} />
              ))}
            </g>
            <path
              d={d([eave[0], EAVE, sheetFrom], [eave[0], EAVE, sheetTo], [0, RIDGE, sheetTo])}
              className="stroke-foreground"
              strokeWidth={1.5}
            />
          </g>
        );
      })}

      {/* 04 — Connection checks: every haunch and apex gets looked at */}
      <g className="qc">
        {frames.flatMap((z) =>
          ([[-HALF, EAVE, z], [0, RIDGE, z], [HALF, EAVE, z]] as V3[]).map((p, k) => {
            const [x, y] = project(p);
            return (
              <g key={`qc${z}${k}`} className="qc-mark" style={at(3, 0.35 + (z + LEN / 2) / LEN * 0.35, 0.5 + (z + LEN / 2) / LEN * 0.35)}>
                <circle cx={x} cy={y} r={7} className="fill-none stroke-arc" strokeWidth={1.5} />
                <circle cx={x} cy={y} r={2} className="fill-arc" />
              </g>
            );
          })
        )}
      </g>
    </svg>
  );
}

export function ShedAssembly() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const stage = stageRef.current;
    if (!wrap || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (reduce.matches) {
        stage.style.setProperty("--p", "1");
        setStep(STEPS - 1);
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 1;
      stage.style.setProperty("--p", p.toFixed(4));
      setStep(Math.min(STEPS - 1, Math.floor(p * STEPS)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, []);

  const current = processSteps[step];

  return (
    <section id="process" aria-labelledby="process-title" className="bg-galv-50">
      <div ref={wrapRef} className="relative h-[calc(100svh+6*60svh)] motion-reduce:h-auto">
        <div
          ref={stageRef}
          className="shed-stage sticky top-0 flex h-[100svh] flex-col overflow-hidden motion-reduce:static motion-reduce:h-auto"
          style={{ "--p": 0 } as React.CSSProperties}
        >
          <div className="container-wide flex h-full flex-col pb-6 pt-[calc(var(--header-h)+1.5rem)] lg:grid lg:grid-cols-12 lg:gap-x-16 lg:pb-12 lg:pt-[calc(var(--header-h)+3rem)]">
            {/* Text column */}
            <div className="flex flex-col lg:col-span-5 lg:justify-between lg:py-4">
              <div>
                <h2 id="process-title" className="type-h2 max-w-[13ch]">
                  How a project goes up
                </h2>
                <p className="mt-4 hidden max-w-[42ch] text-steel-500 lg:block">
                  Six stages, one team: a portal-frame shed from the first site visit to
                  handover.
                </p>
              </div>

              {/* Desktop: full step list, current one in ink */}
              <ol className="mt-10 hidden border-t border-zinc-line lg:block">
                {processSteps.map((s, i) => (
                  <li
                    key={s.number}
                    aria-current={i === step ? "step" : undefined}
                    className={cn(
                      "grid grid-cols-[3rem_1fr] border-b border-zinc-line py-4 transition-colors duration-500 motion-reduce:text-foreground",
                      i === step ? "text-foreground" : i < step ? "text-steel-400" : "text-steel-300"
                    )}
                  >
                    <span className="type-figure pt-0.5 text-xl">{s.number}</span>
                    <div>
                      <h3 className="type-h4">{s.title}</h3>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] motion-reduce:grid-rows-[1fr] motion-reduce:opacity-100",
                          i === step ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <p className="overflow-hidden pt-1.5 text-[0.9375rem] leading-relaxed text-steel-500">
                          {s.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Drawing */}
            <div className="relative mt-4 min-h-0 flex-1 motion-reduce:aspect-[840/560] motion-reduce:flex-none lg:col-span-7 lg:mt-0 lg:motion-reduce:aspect-auto lg:motion-reduce:flex-1">
              <div className="absolute inset-0 flex items-center">
                <ShedDrawing />
              </div>
              <div className="absolute bottom-0 right-0 hidden border border-zinc-line bg-galv-50/90 text-xs sm:grid sm:grid-cols-[auto_auto]">
                <span className="border-b border-r border-zinc-line px-3 py-1.5 text-steel-500">Drawing</span>
                <span className="border-b border-zinc-line px-3 py-1.5 font-medium">Portal-frame shed, 5 bays</span>
                <span className="border-r border-zinc-line px-3 py-1.5 text-steel-500">Stage</span>
                <span className="px-3 py-1.5 font-medium tabular" aria-live="polite">
                  {current.number} {current.title}
                </span>
              </div>
            </div>

            {/* Mobile: current step only */}
            <div className="mt-4 border-t border-foreground pt-4 lg:hidden motion-reduce:hidden">
              <div className="flex items-baseline gap-3">
                <span className="type-figure text-2xl">{current.number}</span>
                <h3 className="type-h4">{current.title}</h3>
                <span className="ml-auto text-sm text-steel-400 tabular">of 0{STEPS}</span>
              </div>
              <p className="mt-2 min-h-[3lh] text-[0.9375rem] leading-relaxed text-steel-500">{current.description}</p>
            </div>

            {/* Reduced motion on mobile: plain list */}
            <ol className="mt-6 hidden border-t border-zinc-line motion-reduce:block lg:motion-reduce:hidden">
              {processSteps.map((s) => (
                <li key={s.number} className="grid grid-cols-[2.5rem_1fr] border-b border-zinc-line py-3">
                  <span className="type-figure text-lg">{s.number}</span>
                  <div>
                    <h3 className="type-h4">{s.title}</h3>
                    <p className="mt-1 text-[0.9375rem] text-steel-500">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
