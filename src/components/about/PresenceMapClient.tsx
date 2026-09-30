"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import type { Place } from "@/lib/data";
import { mexicoMap } from "@/lib/mexico-map";

export type MapPlace = Place & { x: number; y: number; arc?: string };

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

/** Posición de la etiqueta respecto al punto de la ciudad. */
const labelOffset: Record<Place["label"], string> = {
  right: "translate(16px, -50%)",
  left: "translate(calc(-100% - 16px), -50%)",
  below: "translate(-50%, 14px)",
};

/**
 * Parte interactiva del mapa de /nosotros: arcos, ciudades y lista. Al pasar
 * el cursor por una ciudad de la lista se resalta en el mapa. La retícula
 * llega ya dibujada desde el servidor (`dots`).
 */
export default function PresenceMapClient({ places, dots }: { places: MapPlace[]; dots: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const others = places.filter((p) => !p.base);
  const summary = `Mapa de México: base en ${places.find((p) => p.base)?.name ?? "Monterrey"}, obras en ${others.map((p) => p.name).join(" y ")}.`;

  // Orden de aparición: base, luego cada arco y al final su ciudad.
  const arcDelay = (i: number) => 900 + i * 250;
  const delay = (p: MapPlace) => (p.base ? 250 : arcDelay(others.indexOf(p)) + 900);

  return (
    <div className="grid gap-8 border-t border-ink pt-8 md:pt-10 lg:grid-cols-3 lg:gap-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
            Dónde hemos trabajado
          </p>
          <h3 className="text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.02] tracking-[-0.035em] text-balance">
            De Monterrey a donde esté tu obra.
          </h3>
        </div>
        <ul className="border-t border-gray-300 text-[15px]">
          {places.map((p) => (
            <li
              key={p.name}
              onMouseEnter={() => setActive(p.name)}
              onMouseLeave={() => setActive(null)}
              className={`flex items-center gap-4 border-b border-gray-300 py-3.5 transition-colors duration-300 ${
                active === p.name ? "text-navy" : ""
              }`}
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 ${p.base ? "bg-navy" : "bg-navy-600"}`} />
              <span className="flex-1">
                <span className="font-semibold">{p.name}</span>
                <span className="text-gray-500"> · {p.region}</span>
              </span>
              <span className="text-right text-sm text-gray-600">{p.note}</span>
            </li>
          ))}
          <li className="flex items-center gap-4 border-b border-gray-300 py-3.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 border border-gray-400" />
            <span className="flex-1">
              <span className="font-semibold">Otras ciudades</span>
              <span className="text-gray-500"> · México o extranjero</span>
            </span>
            <span className="text-right text-sm text-gray-600">Lo revisamos al cotizar</span>
          </li>
        </ul>
      </div>

      <Reveal className="presence-map lg:col-span-2">
        <div
          role="img"
          aria-label={summary}
          className="relative w-full"
          style={{ aspectRatio: `${mexicoMap.width} / ${mexicoMap.height}` }}
        >
          {dots}
          <svg
            viewBox={`0 0 ${mexicoMap.width} ${mexicoMap.height}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden="true"
          >
            {others.map((p, i) =>
              p.arc ? (
                <path
                  key={p.name}
                  d={p.arc}
                  pathLength={1}
                  strokeDasharray="1"
                  className={`presence-arc fill-none stroke-navy-600 ${
                    active === p.name ? "[stroke-width:8] sm:[stroke-width:5]" : "[stroke-width:5] sm:[stroke-width:3]"
                  }`}
                  strokeLinecap="square"
                  style={{ "--d": `${arcDelay(i)}ms` } as CSSProperties}
                />
              ) : null,
            )}
            {places.map((p) => {
              const size = p.base ? 20 : 14;
              return (
                <g key={p.name}>
                  {p.base &&
                    [0, 1200].map((d) => (
                      <rect
                        key={d}
                        x={p.x - size / 2}
                        y={p.y - size / 2}
                        width={size}
                        height={size}
                        opacity={0}
                        className="presence-pulse fill-none stroke-navy"
                        strokeWidth={1.5}
                        style={{ "--d": `${1600 + d}ms` } as CSSProperties}
                      />
                    ))}
                  <g className="presence-marker" style={{ "--d": `${delay(p)}ms` } as CSSProperties}>
                    <rect
                      x={p.x - size / 2}
                      y={p.y - size / 2}
                      width={size}
                      height={size}
                      className={`transition-transform duration-300 ease-smooth ${p.base ? "fill-navy" : "fill-navy-600"}`}
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        transform: active === p.name ? "scale(1.6)" : undefined,
                      }}
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {places.map((p) => (
            <span
              key={p.name}
              className={`presence-label pointer-events-none absolute whitespace-nowrap px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase transition-colors duration-300 sm:text-[11px] ${
                p.base || active === p.name ? "bg-navy text-white" : "bg-white text-ink"
              }`}
              style={
                {
                  left: pct(p.x, mexicoMap.width),
                  top: pct(p.y, mexicoMap.height),
                  transform: labelOffset[p.label],
                  "--d": `${delay(p)}ms`,
                } as CSSProperties
              }
            >
              {p.name}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
