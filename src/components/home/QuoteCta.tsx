"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useInView, useMediaQuery, useReducedMotion } from "@/lib/motion";
import { processSteps as steps } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

// Tiempo por paso: alcanza para leer su descripción. En móvil se muestra
// una descripción a la vez, así que cada paso dura un poco más.
const STEP_MS = 2400;
const STEP_MS_MOBILE = 3800;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * CTA principal de conversión (columna izquierda del bloque de cotización y
 * preguntas frecuentes del inicio).
 * - Brillo radial que sigue al cursor (solo dispositivos con puntero).
 * - Los 5 pasos de cómo trabajamos (src/lib/data.ts) se iluminan en
 *   secuencia mientras el bloque está en pantalla; fuera de pantalla o con
 *   "reducir movimiento" se quedan quietos. Las descripciones siempre están
 *   en el HTML.
 * - En móvil los pasos son una barra de 5 segmentos y solo se lee la
 *   descripción del paso activo, para no ocupar toda la pantalla.
 */
export default function QuoteCta() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(cardRef);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const wide = useMediaQuery("(min-width: 768px)");
  const stepMs = wide ? STEP_MS : STEP_MS_MOBILE;
  const playing = inView && !reduced;
  const shown = reduced ? steps.length : step;
  // Móvil: paso cuya descripción se muestra (al final se queda en el último).
  const focus = steps[Math.min(shown, steps.length - 1)];
  const focusIndex = Math.min(shown, steps.length - 1);

  useEffect(() => {
    if (!playing) return;
    // Recorre los pasos y mantiene todo lleno un momento antes de reiniciar.
    const t = window.setTimeout(
      () => setStep((s) => (s + 1) % (steps.length + 2)),
      stepMs,
    );
    return () => window.clearTimeout(t);
  }, [playing, step, stepMs]);

  const setGlow = (x: number, y: number) => {
    cardRef.current?.style.setProperty("--mx", `${x}px`);
    cardRef.current?.style.setProperty("--my", `${y}px`);
  };

  return (
    <div className="flex flex-col bg-navy text-white">
      <Link
        ref={cardRef}
        href="/cotizar"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlow(Math.round(e.clientX - r.left), Math.round(e.clientY - r.top));
        }}
        onMouseLeave={() => setGlow(-999, -999)}
        className="group flex flex-1 flex-col gap-7 p-7 md:p-12"
        style={
          {
            "--mx": "-999px",
            "--my": "-999px",
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(190,219,255,.18), rgba(22,36,86,0) 60%)",
          } as CSSProperties
        }
      >
        <p className="font-mono text-[13px] font-semibold uppercase text-navy-200">
          Cómo trabajamos · {steps.length} pasos
        </p>
        <h2 className="text-[clamp(34px,4vw,56px)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          Sube tus planos.
          <br />
          Te cotizamos.
        </h2>
        {/* Lista completa. En móvil queda solo para lectores de pantalla (salvo
            con "reducir movimiento") y se ve la versión compacta de abajo. */}
        <ol
          className={`mt-auto flex flex-col border-b border-white/15 ${reduced ? "" : "max-md:sr-only"}`}
          aria-label="Cómo trabajamos, paso a paso"
        >
          {steps.map((s, i) => {
            const done = i < shown;
            const current = i === shown && playing;
            const lit = done || current;
            return (
              <li key={s.title} className="relative flex gap-4 py-3.5">
                {/* Línea superior: se llena al avanzar el paso */}
                <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/15">
                  {done && <div className="absolute inset-0 bg-white/60" />}
                  {current && (
                    <div
                      key={`s-${step}`}
                      className="absolute inset-0 origin-left animate-progress bg-white"
                      style={{ "--progress-duration": `${stepMs}ms` } as CSSProperties}
                    />
                  )}
                </div>
                <span
                  className={`w-6 shrink-0 pt-[3px] font-mono text-xs font-semibold transition-colors duration-300 ${
                    lit ? "text-white" : "text-navy-200/60"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="flex min-w-0 flex-col gap-1">
                  <span
                    className={`text-[15px] font-bold tracking-[-0.01em] transition-colors duration-300 ${
                      lit ? "text-white" : "text-navy-100/70"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`max-w-[440px] text-[13.5px] leading-snug transition-colors duration-300 ${
                      current ? "text-navy-100" : "text-navy-200/75"
                    }`}
                  >
                    {s.text}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Móvil: barra de 5 segmentos y la descripción del paso activo */}
        {!reduced && (
          <div aria-hidden="true" className="mt-auto flex flex-col gap-4 md:hidden">
            <ol className="grid grid-cols-5 gap-1.5">
              {steps.map((s, i) => {
                const done = i < shown;
                const current = i === shown && playing;
                return (
                  <li key={s.title} className="flex flex-col gap-2">
                    <div className="relative h-[3px] overflow-hidden bg-white/20">
                      {done && <div className="absolute inset-0 bg-white/70" />}
                      {current && (
                        <div
                          key={`m-${step}`}
                          className="absolute inset-0 origin-left animate-progress bg-white"
                          style={{ "--progress-duration": `${stepMs}ms` } as CSSProperties}
                        />
                      )}
                    </div>
                    <span
                      className={`font-mono text-[11px] font-semibold transition-colors duration-300 ${
                        done || current ? "text-white" : "text-navy-200/60"
                      }`}
                    >
                      {pad(i + 1)}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div key={`d-${focusIndex}`} className="flex min-h-[124px] animate-enter flex-col gap-1.5 border-t border-white/15 pt-4">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-navy-200">
                Paso {pad(focusIndex + 1)} de {pad(steps.length)}
              </span>
              <span className="text-xl font-bold tracking-[-0.01em]">{focus.title}</span>
              <span className="text-[15px] leading-snug text-navy-100/90">{focus.text}</span>
            </div>
          </div>
        )}

        <span className="flex w-fit items-center gap-3 bg-white px-6 py-4 font-semibold text-navy transition-colors duration-300 group-hover:bg-navy-100">
          Empezar cotización
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-smooth group-hover:translate-x-2"
          >
            →
          </span>
        </span>
      </Link>

      <div className="grid border-t border-white/20 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <ContactRow label="Respuesta directa" value="WhatsApp" href={whatsappUrl()} />
        <ContactRow label="Correo" value={site.email} href={`mailto:${site.email}`} border />
      </div>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  border = false,
}: {
  label: string;
  value: string;
  href: string;
  border?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative flex items-center justify-between gap-4 overflow-hidden px-7 py-5 transition-colors duration-[350ms] hover:text-navy md:px-12 ${
        border
          ? "border-t border-white/20 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t xl:border-l xl:border-t-0"
          : ""
      }`}
    >
      {/* Relleno que sube al pasar el cursor */}
      <span className="pointer-events-none absolute inset-0 translate-y-[101%] bg-white transition-transform duration-[450ms] ease-smooth group-hover:translate-y-0" />
      <span className="relative min-w-0">
        <span className="mb-1 block text-[13px] opacity-70">{label}</span>
        <span className="block break-all text-[17px] font-bold tracking-[-0.01em]">{value}</span>
      </span>
      <span
        aria-hidden="true"
        className="relative text-xl transition-transform duration-[350ms] ease-smooth group-hover:-rotate-45"
      >
        →
      </span>
    </a>
  );
}
