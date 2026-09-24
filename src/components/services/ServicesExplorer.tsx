"use client";

import { useEffect, useState } from "react";
import MediaSlot from "@/components/ui/MediaSlot";
import ArrowLink from "@/components/ui/ArrowLink";
import { categories } from "@/lib/data";

/**
 * Pestañas por categoría + acordeón de servicios.
 * - La pestaña activa se refleja en la URL (#plomeria…) para poder enlazarla.
 * - Al cambiar de pestaña, foto y lista entran con una transición corta.
 * - El acordeón anima su altura (sin saltos).
 */
export default function ServicesExplorer() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(0);
  const cur = categories[tab];

  useEffect(() => {
    const syncFromHash = () => {
      const i = categories.findIndex((c) => `#${c.id}` === window.location.hash);
      if (i >= 0) {
        setTab(i);
        setOpen(0);
      }
    };
    const id = requestAnimationFrame(syncFromHash);
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const pick = (i: number) => {
    setTab(i);
    setOpen(0);
    window.history.replaceState(null, "", `#${categories[i].id}`);
  };

  return (
    <>
      <section className="px-5 md:px-8">
        {/* Anclas estables para enlaces como /servicios#electricidad */}
        {categories.map((c) => (
          <span key={c.id} id={c.id} aria-hidden="true" className="block scroll-mt-28" />
        ))}
        <div
          role="tablist"
          aria-label="Categorías de servicio"
          className="mx-auto grid max-w-7xl animate-rise grid-cols-2 border border-ink [animation-delay:240ms] lg:grid-cols-4"
        >
          {categories.map((c, i) => {
            const on = i === tab;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                className={`-mb-px -mr-px flex flex-col gap-1.5 border-b border-r border-ink px-5 py-[18px] text-left transition-colors duration-300 ${
                  on ? "bg-navy text-white" : "bg-white text-ink hover:bg-navy-100/50"
                }`}
              >
                <span className="font-mono text-xs font-semibold opacity-70">{c.n}</span>
                <span className="text-[clamp(16px,1.6vw,20px)] font-bold tracking-[-0.01em]">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        role="tabpanel"
        aria-label={cur.name}
        className="px-5 pb-14 pt-8 md:px-8 md:pb-[104px] md:pt-14"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <div key={`media-${cur.id}`} className="flex animate-enter flex-col gap-5">
            <div className="relative aspect-[4/3] overflow-hidden bg-night">
              <MediaSlot
                label={`Foto de ${cur.name} en obra`}
                src={cur.image}
                alt={cur.imageAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            <p className="text-[clamp(18px,1.8vw,22px)] font-medium leading-[1.45] tracking-[-0.01em] text-pretty">
              {cur.lead}
            </p>
          </div>

          <div key={`list-${cur.id}`} className="animate-enter border-t border-ink [animation-delay:80ms]">
            {cur.items.map(([title, text], i) => {
              const isOpen = open === i;
              return (
                <div key={title} className="border-b border-gray-300">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`svc-${cur.id}-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center gap-5 py-[22px] text-left"
                  >
                    <span className="w-7 font-mono text-[13px] font-semibold text-navy-600">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[clamp(18px,1.8vw,22px)] font-bold tracking-[-0.015em] transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                      {title}
                    </span>
                    <PlusMinus open={isOpen} />
                  </button>
                  <div
                    id={`svc-${cur.id}-${i}`}
                    className={`grid transition-[grid-template-rows] duration-500 ease-smooth ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pl-12 pr-11 text-base leading-relaxed text-gray-600">
                        {text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <ArrowLink href="/contacto" className="mt-7">
              Cotizar {cur.name}
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}

/** Signo + que se convierte en − (la barra vertical gira hasta acostarse). */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative h-6 w-6 shrink-0">
      <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-ink" />
      <span
        className={`absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-300 ease-smooth ${
          open ? "rotate-90" : ""
        }`}
      />
    </span>
  );
}
