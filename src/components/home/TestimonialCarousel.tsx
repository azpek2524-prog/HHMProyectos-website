"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { testimonials } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");
const FADE_MS = 280;

/**
 * Carrusel de testimonios. La cuadrícula muestra solo la primera fila (tantas
 * tarjetas como quepan); las flechas o un deslizamiento rotan el orden.
 * Sin avance automático: el usuario controla el ritmo (menos fatiga visual).
 */
export default function TestimonialCarousel() {
  const n = testimonials.length;
  const [offset, setOffset] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [shifted, setShifted] = useState(false);
  const touchX = useRef<number | null>(null);

  const shift = (dir: 1 | -1) => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => {
      setOffset((o) => (o + dir + n) % n);
      setShifted(true);
      setLeaving(false);
    }, FADE_MS);
  };

  const cards = Array.from({ length: n }, (_, k) => testimonials[(offset + k) % n]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-7 md:gap-10">
      <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
          Lo que dicen
          <br />
          quienes construyen.
        </h2>
        <div className="flex items-center gap-4">
          <p
            aria-live="polite"
            className="whitespace-nowrap font-mono text-xs font-semibold tabular-nums text-navy-200"
          >
            {pad(offset + 1)} / {pad(n)}
          </p>
          <div className="flex gap-2">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => shift(dir)}
                aria-label={dir === -1 ? "Testimonio anterior" : "Siguiente testimonio"}
                className="h-12 w-12 border border-white/50 text-lg text-white transition-colors duration-300 hover:bg-white hover:text-navy"
              >
                {dir === -1 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) shift(dx < 0 ? 1 : -1);
          }}
          className="group -mt-2 grid auto-rows-[0] grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] grid-rows-[auto] gap-x-4 overflow-hidden pt-2"
        >
          {cards.map((q, k) => (
            <figure
              key={`${offset}-${k}`}
              className={`m-0 min-w-0 cursor-default border border-white/20 text-white transition-[background-color,color,opacity,translate] duration-[350ms] ease-smooth [@media(hover:hover)]:group-has-[figure:hover]:opacity-50 hover:-translate-y-1.5 hover:bg-white hover:text-ink hover:opacity-100! ${
                leaving ? "translate-y-3 opacity-0!" : ""
              }`}
            >
              <div
                className={`flex h-full flex-col justify-between gap-7 p-7 ${
                  shifted ? "animate-enter" : ""
                }`}
                style={shifted ? { animationDelay: `${k * 70}ms` } : undefined}
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[11px] font-semibold uppercase opacity-70">
                    {q.tag}
                  </span>
                  <blockquote className="text-lg font-semibold leading-[1.4] tracking-[-0.015em] text-pretty">
                    “{q.text}”
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white/15">
                    {q.image ? (
                      <Image src={q.image} alt="" fill sizes="44px" className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center font-mono text-[10px] opacity-60">
                        FOTO
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold">{q.who}</p>
                    <p className="text-[13px] opacity-75">{q.role}</p>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
