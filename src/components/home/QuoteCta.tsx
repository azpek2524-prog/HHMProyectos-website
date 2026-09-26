"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "@/lib/motion";
import { quoteSteps } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

const STEP_MS = 1400;
// Etiquetas cortas: la columna es angosta y deben caber también en móvil.
const steps = ["Proyecto", "Alcance", "m²", "Etapa", "Planos"];

/**
 * CTA principal de conversión (columna izquierda del bloque de cotización y
 * preguntas frecuentes del inicio).
 * - Brillo radial que sigue al cursor (solo dispositivos con puntero).
 * - Los pasos de la cotización se llenan en secuencia mientras el bloque
 *   está en pantalla; fuera de pantalla o con "reducir movimiento" se quedan
 *   quietos.
 */
export default function QuoteCta() {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const inView = useInView(cardRef);
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const playing = inView && !reduced;
  const shown = reduced ? steps.length : step;

  useEffect(() => {
    if (!playing) return;
    // Recorre los pasos y mantiene todo lleno un momento antes de reiniciar.
    const t = window.setTimeout(
      () => setStep((s) => (s + 1) % (steps.length + 2)),
      STEP_MS,
    );
    return () => window.clearTimeout(t);
  }, [playing, step]);

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
          Cotización en {quoteSteps.length} pasos · Visitamos tu obra
        </p>
        <h2 className="text-[clamp(34px,4vw,56px)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          Sube tus planos.
          <br />
          Te cotizamos.
        </h2>
        <p className="max-w-[420px] text-[17px] leading-[1.55] text-navy-100/90">
          Cuéntanos tu proyecto y revisamos el alcance contigo. Si todavía no
          tienes planos, también podemos empezar con una visita.
        </p>
        <ol className="mt-auto grid grid-cols-5 gap-2" aria-label="Pasos de la cotización">
          {steps.map((label, i) => {
            const done = i < shown;
            const current = i === shown && playing;
            return (
              <li key={label} className="flex flex-col gap-2.5">
                <div className="relative h-[3px] overflow-hidden bg-white/20">
                  {done && <div className="absolute inset-0 bg-white" />}
                  {current && (
                    <div
                      key={`s-${step}`}
                      className="absolute inset-0 origin-left animate-progress bg-white"
                      style={{ "--progress-duration": `${STEP_MS}ms` } as CSSProperties}
                    />
                  )}
                </div>
                <span
                  className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                    done || current ? "text-white" : "text-navy-200/70"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  lang="es"
                  className={`text-[11px] font-semibold leading-tight transition-colors duration-300 [overflow-wrap:anywhere] sm:text-[13px] ${
                    current ? "text-white" : "text-navy-200/70"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
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

      <div className="grid border-t border-white/20 sm:grid-cols-2">
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
        border ? "border-t border-white/20 sm:border-l sm:border-t-0" : ""
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
