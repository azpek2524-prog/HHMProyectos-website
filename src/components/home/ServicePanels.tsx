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
 * Móvil y tablet: tarjetas con foto que se deslizan de lado (la siguiente
 * se asoma para invitar a deslizar), con indicador de avance.
 */
export default function ServicePanels() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const rotating = desktop && inView && !hovering && !reduced;

  // Móvil: tarjeta visible en el carrusel deslizable.
  const trackRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const cardStep = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 12 : 1;
  };
  const onTrackScroll = () => {
    const track = trackRef.current;
    if (track) setSlide(Math.min(homeServices.length - 1, Math.round(track.scrollLeft / cardStep())));
  };
  const goToSlide = (i: number) => {
    trackRef.current?.scrollTo({ left: i * cardStep(), behavior: reduced ? "auto" : "smooth" });
  };

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
                    Ver {s.name} →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Móvil / tablet: tarjetas que se deslizan ---------- */}
      <div className="lg:hidden">
        <div
          ref={trackRef}
          onScroll={onTrackScroll}
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden"
        >
          {homeServices.map((s) => (
            <article
              key={s.id}
              className="relative flex min-h-[500px] w-[86%] shrink-0 snap-start flex-col justify-end overflow-hidden bg-night text-white md:w-[calc(50%-6px)]"
            >
              <div className="absolute inset-0">
                <MediaSlot label={s.media} src={s.image} sizes="(min-width: 768px) 50vw, 86vw" labelAt="top" />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,.1)_0%,rgba(3,7,18,.5)_42%,rgba(3,7,18,.95)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-5">
                <span className="bg-white px-2 py-1 font-mono text-xs font-semibold text-night">{s.n}</span>
                <span className="font-mono text-[11px] font-semibold text-gray-200">
                  {String(s.items.length).padStart(2, "0")} SERVICIOS
                </span>
              </div>
              <div className="relative flex flex-col gap-4 p-5">
                <h3 className="text-[40px] font-extrabold leading-none tracking-[-0.045em]">{s.name}</h3>
                <p className="text-[15px] leading-normal text-gray-200">{s.lead}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <li key={item} className="border border-white/25 bg-white/5 px-2.5 py-1 text-[13px] font-medium">
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/servicios/${s.id}`}
                  className="mt-1 flex w-fit items-center gap-2.5 bg-white px-[18px] py-3.5 font-semibold text-night"
                >
                  Ver {s.name} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Indicador: cuál tarjeta se ve y cuántas hay */}
        <div className="mt-4 flex items-center justify-between md:hidden">
          <div className="flex gap-1">
            {homeServices.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Ver ${s.name}`}
                aria-current={slide === i}
                onClick={() => goToSlide(i)}
                className="py-3 pr-1"
              >
                <span
                  className={`block h-[3px] transition-all duration-500 ease-smooth ${
                    slide === i ? "w-10 bg-navy" : "w-5 bg-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="font-mono text-xs font-semibold text-gray-500">
            {String(slide + 1).padStart(2, "0")} / {String(homeServices.length).padStart(2, "0")} ·{" "}
            {slide === homeServices.length - 1 ? "← Desliza" : "Desliza →"}
          </span>
        </div>
      </div>
    </div>
  );
}
