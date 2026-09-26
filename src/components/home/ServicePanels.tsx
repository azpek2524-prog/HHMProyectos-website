"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import MediaSlot from "@/components/ui/MediaSlot";
import { homeServices } from "@/lib/data";
import { useInView, useMediaQuery, useReducedMotion } from "@/lib/motion";

const ROTATE_MS = 5000;

/**
 * Escritorio: dos paneles con foto; el activo se expande. Rotan solos cada
 * 5 s con barra de progreso, y se pausan al pasar el cursor, fuera de
 * pantalla o con "reducir movimiento".
 * Móvil: pestañas con transición lateral, sin rotación automática.
 */
export default function ServicePanels() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const rotating = desktop && inView && !hovering && !reduced;

  useEffect(() => {
    if (!rotating) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % homeServices.length),
      ROTATE_MS,
    );
    return () => window.clearTimeout(t);
  }, [rotating, active]);

  return (
    <div ref={ref} className="mx-auto max-w-7xl">
      {/* ---------- Escritorio ---------- */}
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="hidden h-[600px] gap-3 lg:flex"
      >
        {homeServices.map((s, i) => {
          const open = active === i;
          return (
            <div
              key={s.id}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="relative min-w-0 basis-0 cursor-pointer overflow-hidden bg-night text-white transition-[flex-grow] duration-[600ms] ease-smooth"
              style={{ flexGrow: open ? 1.6 : 1 }}
            >
              <div
                className="absolute inset-0 transition-transform duration-[1200ms] ease-smooth"
                style={{ transform: `scale(${open ? 1 : 1.08})` }}
              >
                <MediaSlot label={s.media} src={s.image} sizes="60vw" labelAt="top" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,.15)_0%,rgba(3,7,18,.35)_40%,rgba(3,7,18,.92)_100%)]" />

              {open && rotating && (
                <div
                  key={`bar-${active}`}
                  className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left animate-progress bg-white"
                  style={{ "--progress-duration": `${ROTATE_MS}ms` } as CSSProperties}
                />
              )}

              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-7">
                <span className="bg-white px-2 py-1 font-mono text-[13px] font-semibold text-night">
                  {s.n}
                </span>
                <span className="font-mono text-xs font-semibold text-gray-200">
                  {String(s.items.length).padStart(2, "0")} SERVICIOS
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[18px] p-9">
                <h3
                  className="font-extrabold leading-[0.95] tracking-[-0.045em] transition-[font-size] duration-[600ms] ease-smooth"
                  style={{
                    fontSize: open
                      ? "clamp(38px,5.6vw,80px)"
                      : "clamp(32px,4vw,56px)",
                  }}
                >
                  {s.name}
                </h3>
                {open ? (
                  <div key={`open-${i}`} className="flex animate-enter flex-col gap-[18px]">
                    <p className="max-w-[460px] text-base leading-normal text-gray-200">
                      {s.lead}
                    </p>
                    <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-6 border-t border-white/30">
                      {s.items.map((item) => (
                        <li
                          key={item}
                          className="border-b border-white/20 py-2.5 text-[15px] font-medium"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/servicios/${s.id}`}
                      className="group/cta mt-1 flex w-fit items-center gap-2.5 bg-white px-[18px] py-[13px] font-semibold text-night transition-colors duration-300 hover:bg-navy-100"
                    >
                      Ver {s.name}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-smooth group-hover/cta:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={`/servicios/${s.id}`}
                    className="w-fit text-[15px] font-semibold text-gray-200"
                  >
                    Ver servicios →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Móvil / tablet ---------- */}
      <div className="border border-ink lg:hidden">
        <div className="grid grid-cols-2 border-b border-ink" role="tablist">
          {homeServices.map((s, i) => {
            const on = active === i;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`flex h-14 items-center justify-center gap-2 text-base font-bold tracking-[-0.01em] transition-colors duration-300 ${
                  on ? "bg-navy text-white" : "bg-white text-ink"
                }`}
              >
                <span className="font-mono text-[11px] font-semibold opacity-70">
                  {s.n}
                </span>
                {s.name}
              </button>
            );
          })}
        </div>
        <div className="grid overflow-hidden">
          {homeServices.map((s, i) => {
            const on = active === i;
            return (
              <div
                key={s.id}
                role="tabpanel"
                inert={!on}
                className="flex flex-col bg-white transition-[opacity,transform] duration-[450ms] ease-smooth [grid-area:1/1]"
                style={{
                  opacity: on ? 1 : 0,
                  transform: `translateX(${on ? 0 : i < active ? -24 : 24}px)`,
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-night">
                  <MediaSlot label={s.media} src={s.image} sizes="100vw" labelAt="top" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0)_45%,rgba(3,7,18,.85)_100%)]" />
                  <h3 className="pointer-events-none absolute bottom-[18px] left-5 text-[40px] font-extrabold leading-none tracking-[-0.045em] text-white">
                    {s.name}
                  </h3>
                </div>
                <div className="flex flex-col gap-[18px] p-5">
                  <p className="text-base leading-normal text-gray-600">{s.lead}</p>
                  <ul className="flex flex-col border-t border-gray-200">
                    {s.items.map((item) => (
                      <li
                        key={item}
                        className="flex justify-between border-b border-gray-200 py-3 text-[15px] font-medium"
                      >
                        {item}
                        <span className="text-gray-400">+</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/servicios/${s.id}`}
                    className="flex justify-between bg-navy px-[18px] py-4 font-semibold text-white"
                  >
                    Ver {s.name} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
