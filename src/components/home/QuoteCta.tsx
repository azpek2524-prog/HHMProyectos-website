"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useInView, useReducedMotion } from "@/lib/motion";
import { quoteSteps } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

const STEP_MS = 1400;
const steps = ["Tipo de proyecto", "Instalaciones", "m²", "Etapa", "Planos"];

/**
 * CTA principal de conversión.
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
    <div className="mx-auto grid max-w-7xl gap-px border border-ink bg-ink lg:grid-cols-2">
      <Link
        ref={cardRef}
        href="/cotizar"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setGlow(Math.round(e.clientX - r.left), Math.round(e.clientY - r.top));
        }}
        onMouseLeave={() => setGlow(-999, -999)}
        className="group flex flex-col gap-7 p-7 md:p-14"
        style={
          {
            "--mx": "-999px",
            "--my": "-999px",
            background:
              "radial-gradient(460px circle at var(--mx) var(--my), rgba(190,219,255,.6), rgba(255,255,255,0) 60%), #fff",
          } as CSSProperties
        }
      >
        <p className="font-mono text-[13px] font-semibold uppercase text-gray-500">
          Cotización en {quoteSteps.length} pasos · Visitamos tu obra
        </p>
        <h2 className="text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          Sube tus planos.
          <br />
          Te cotizamos.
        </h2>
        <ol className="grid grid-cols-5 gap-2" aria-label="Pasos de la cotización">
          {steps.map((label, i) => {
            const done = i < shown;
            const current = i === shown && playing;
            return (
              <li key={label} className="flex flex-col gap-2.5">
                <div className="relative h-[3px] overflow-hidden bg-gray-200">
                  {done && <div className="absolute inset-0 bg-navy" />}
                  {current && (
                    <div
                      key={`s-${step}`}
                      className="absolute inset-0 origin-left animate-progress bg-navy"
                      style={{ "--progress-duration": `${STEP_MS}ms` } as CSSProperties}
                    />
                  )}
                </div>
                <span
                  className={`font-mono text-xs font-semibold transition-colors duration-300 ${
                    done || current ? "text-navy" : "text-gray-400"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  lang="es"
                  className={`hyphens-auto text-[clamp(12px,1.2vw,15px)] font-semibold leading-tight transition-colors duration-300 ${
                    current ? "text-ink" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
        <span className="flex w-fit items-center gap-3 bg-navy px-6 py-4 font-semibold text-white transition-colors duration-300 group-hover:bg-navy-600">
          Empezar cotización
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-smooth group-hover:translate-x-2"
          >
            →
          </span>
        </span>
      </Link>

      <div className="grid grid-rows-2 bg-white">
        <ContactRow
          label="Respuesta directa"
          value="WhatsApp"
          href={whatsappUrl()}
          border
        />
        <ContactRow
          label="Para enviar documentación"
          value={site.email}
          href={`mailto:${site.email}`}
        />
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
      className={`group relative flex items-center justify-between gap-4 overflow-hidden p-6 text-ink transition-colors duration-[350ms] hover:text-white md:p-10 ${
        border ? "border-b border-ink" : ""
      }`}
    >
      {/* Relleno que sube al pasar el cursor */}
      <span className="pointer-events-none absolute inset-0 translate-y-[101%] bg-navy transition-transform duration-[450ms] ease-smooth group-hover:translate-y-0" />
      <span className="relative">
        <span className="mb-1.5 block text-sm opacity-70">{label}</span>
        <span className="block break-all text-[clamp(18px,2.2vw,28px)] font-bold tracking-[-0.02em]">
          {value}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="relative text-2xl transition-transform duration-[350ms] ease-smooth group-hover:-rotate-45"
      >
        →
      </span>
    </a>
  );
}
