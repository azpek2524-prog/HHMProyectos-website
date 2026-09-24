"use client";

import { useState } from "react";
import Link from "next/link";
import MediaSlot from "@/components/ui/MediaSlot";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects, type Project } from "@/lib/data";

const scopes = ["Todo", "Plomería", "Electricidad", "Ambos"] as const;
type Scope = (typeof scopes)[number];

const matches = (p: Project, s: Scope) =>
  s === "Todo" || (s === "Ambos" ? p.scope.includes("+") : p.scope.includes(s));

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Filtro por instalación + vista Galería / Lista.
 * Al cambiar filtro o vista, las obras vuelven a entrar escalonadas
 * (60 ms entre cada una, con tope) para que el cambio se lea sin marear.
 */
export default function PortfolioBrowser() {
  const [scope, setScope] = useState<Scope>("Todo");
  const [view, setView] = useState<"grid" | "list">("grid");
  const list = projects.filter((p) => matches(p, scope));
  const stagger = (i: number) => ({ animationDelay: `${Math.min(i, 6) * 60}ms` });

  return (
    <>
      <section className="px-5 pb-7 pt-12 md:px-8 md:pb-10 md:pt-[104px]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <div className="flex items-baseline gap-4">
            <h1 className="animate-rise text-[clamp(44px,8vw,120px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
              Obras
            </h1>
            <span
              aria-live="polite"
              className="animate-rise font-mono text-sm font-semibold text-gray-500 [animation-delay:80ms]"
            >
              {pad(list.length)}
            </span>
          </div>
          <div className="flex animate-rise flex-wrap items-center gap-4 [animation-delay:160ms] md:gap-6">
            <div className="flex border border-ink" role="group" aria-label="Filtrar por instalación">
              {scopes.map((s) => {
                const on = s === scope;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setScope(s)}
                    className={`-mr-px border-r border-ink px-3.5 py-2.5 text-sm font-semibold transition-colors duration-300 last:mr-0 last:border-r-0 ${
                      on ? "bg-ink text-white" : "bg-white text-ink hover:bg-gray-100"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="flex gap-1" role="group" aria-label="Vista">
              {(["grid", "list"] as const).map((v) => {
                const on = v === view;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setView(v)}
                    className={`border border-gray-300 px-3 py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
                      on ? "border-ink bg-ink text-white" : "bg-white text-ink hover:border-ink"
                    }`}
                  >
                    {v === "grid" ? "Galería" : "Lista"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 md:px-8 md:pb-[104px]">
        <div key={`${scope}-${view}`} className="mx-auto max-w-7xl">
          {list.length === 0 && (
            <p className="border-t border-ink py-10 text-gray-500">
              Aún no hay obras publicadas con este filtro.
            </p>
          )}

          {view === "grid" ? (
            <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {list.map((p, i) => {
                const wide = i % 3 === 0;
                return (
                  <div
                    key={p.slug}
                    className={`animate-enter ${wide ? "md:col-span-2" : ""}`}
                    style={stagger(i)}
                  >
                    <ProjectCard
                      project={p}
                      tag={pad(i + 1)}
                      aspect={wide ? "aspect-[4/3] md:aspect-[16/8]" : "aspect-[4/3]"}
                      sizes={wide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border-t border-ink">
              {list.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/proyectos/${p.slug}`}
                  style={stagger(i)}
                  className="group grid animate-enter items-center gap-x-8 gap-y-4 border-b border-gray-300 py-5 transition-colors duration-300 hover:bg-gray-50 md:grid-cols-2"
                >
                  <div className="flex items-center gap-5">
                    <div className="relative aspect-[4/3] w-[120px] shrink-0 overflow-hidden">
                      <div className="absolute inset-0 transition-transform duration-700 ease-smooth group-hover:scale-110">
                        <MediaSlot label="Foto" src={p.image} alt={p.title} sizes="120px" />
                      </div>
                    </div>
                    <h2 className="text-[clamp(18px,2vw,26px)] font-bold leading-tight tracking-[-0.02em] transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                      {p.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap justify-between gap-3 text-sm text-gray-600 md:pr-4">
                    <span>{p.type}</span>
                    <span>{p.scope}</span>
                    <span className="font-mono">
                      {p.year}{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
