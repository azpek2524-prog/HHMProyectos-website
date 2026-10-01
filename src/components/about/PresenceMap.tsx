import type { CSSProperties } from "react";
import PresenceMapClient, { type MapPlace } from "@/components/about/PresenceMapClient";
import { places } from "@/lib/data";
import { MEXICO_DOTS, mexicoMap, project } from "@/lib/mexico-map";

/** Capas de la onda: cada una aparece un poco después que la anterior. */
const BANDS = 14;
const DOT = 6;

const base = places.find((p) => p.base) ?? places[0];
const [bx, by] = project(base.lon, base.lat);

/*
 * Los puntos se agrupan por distancia a la base en BANDS trazos (uno por
 * capa) en lugar de un elemento por punto: el HTML queda ligero y la onda se
 * logra con el retraso de cada capa.
 */
const groups: [number, number][][] = Array.from({ length: BANDS }, () => []);
let maxDist = 0;
for (let i = 0; i < MEXICO_DOTS.length; i += 2) {
  maxDist = Math.max(maxDist, Math.hypot(MEXICO_DOTS[i] - bx, MEXICO_DOTS[i + 1] - by));
}
for (let i = 0; i < MEXICO_DOTS.length; i += 2) {
  const x = MEXICO_DOTS[i];
  const y = MEXICO_DOTS[i + 1];
  const band = Math.min(BANDS - 1, Math.floor((Math.hypot(x - bx, y - by) / maxDist) * BANDS));
  groups[band].push([x - DOT / 2, y - DOT / 2]);
}
// Cada cuadro se mueve relativo al anterior ("m14 0"): el trazo pesa la mitad.
const round = (v: number) => +v.toFixed(1);
const bands = groups.map((pts) => {
  let d = "";
  let px = 0;
  let py = 0;
  for (const [x, y] of pts) {
    d += d ? `m${round(x - px)} ${round(y - py)}` : `M${round(x)} ${round(y)}`;
    d += `h${DOT}v${DOT}h-${DOT}z`;
    [px, py] = [x, y];
  }
  return d;
});

/**
 * Arco de la base a una ciudad, curvado hacia arriba. Si la ciudad queda más
 * al sur que al lado (CDMX), se curva hacia el este para no cruzar las
 * etiquetas de las ciudades del oeste.
 */
function arc(x: number, y: number) {
  const mx = (bx + x) / 2;
  const my = (by + y) / 2;
  const dist = Math.hypot(x - bx, y - by);
  const south = Math.abs(y - by) > Math.abs(x - bx);
  const [cx, cy] = south ? [mx + dist * 0.6, my] : [mx, my - dist * 0.35];
  return `M${bx.toFixed(1)} ${by.toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
}

const mapPlaces: MapPlace[] = places.map((p) => {
  const [x, y] = project(p.lon, p.lat);
  return { ...p, x, y, arc: p.base ? undefined : arc(x, y) };
});

/**
 * Mapa de /nosotros: México como retícula de cuadros que aparece en ondas
 * desde Monterrey, con arcos hacia las ciudades donde HHM ya tuvo obra.
 * Las ciudades salen de `places` en src/lib/data.ts.
 */
export default function PresenceMap() {
  return (
    <PresenceMapClient
      places={mapPlaces}
      dots={
        <svg
          viewBox={`0 0 ${mexicoMap.width} ${mexicoMap.height}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {bands.map((d, i) => (
            <path
              key={i}
              d={d}
              className="presence-band fill-navy-200 max-md:stroke-navy-200 max-md:[stroke-width:3]"
              style={{ "--d": `${150 + i * 80}ms` } as CSSProperties}
            />
          ))}
        </svg>
      }
    />
  );
}
