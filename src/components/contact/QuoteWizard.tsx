"use client";

import {
  useActionState,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useFormStatus } from "react-dom";
import { submitQuote, type QuoteState } from "@/app/actions";
import { quoteSteps } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

type Answers = {
  tipo: string | null;
  alcance: string[];
  m2: string | null;
  etapa: string | null;
};

const EMPTY: Answers = { tipo: null, alcance: [], m2: null, etapa: null };
const KEYS = "ABCDEF";
const LAST = quoteSteps.length - 1;
const INITIAL: QuoteState = { status: "idle", message: "" };

/** Reinicia todo el asistente (incluido el estado del envío) al pedir una nueva solicitud. */
export default function QuoteWizard() {
  const [round, setRound] = useState(0);
  return <Wizard key={round} onReset={() => setRound((r) => r + 1)} />;
}

function Wizard({ onReset }: { onReset: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [files, setFiles] = useState<string[]>([]);
  const [contact, setContact] = useState({ nombre: "", empresa: "", correo: "", whatsapp: "" });
  const [dragging, setDragging] = useState(false);
  const [state, formAction] = useActionState(submitQuote, INITIAL);
  const advanceTimer = useRef<number | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  const done = state.status === "success";
  const cur = quoteSteps[step];

  const goTo = (s: number) => {
    window.clearTimeout(advanceTimer.current);
    setStep(Math.max(0, Math.min(LAST, s)));
  };

  const pick = (label: string) => {
    if (cur.key === "planos") return;
    if (cur.key === "alcance") {
      setAnswers((a) => ({
        ...a,
        alcance: a.alcance.includes(label)
          ? a.alcance.filter((x) => x !== label)
          : [...a.alcance, label],
      }));
      return;
    }
    const key = cur.key;
    setAnswers((a) => ({ ...a, [key]: label }));
    // Selección única: avanza sola tras un instante para confirmar visualmente.
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => setStep((s) => Math.min(LAST, s + 1)), 220);
  };

  // Atajos: A–F elige opción, Enter continúa (fuera de campos de texto).
  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (done || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
    const i = KEYS.indexOf(e.key.toUpperCase());
    if (e.key.length === 1 && i >= 0 && i < cur.options.length) {
      e.preventDefault();
      pick(cur.options[i]);
    } else if (e.key === "Enter" && step < LAST && !target?.closest("button, a")) {
      e.preventDefault();
      goTo(step + 1);
    }
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.clearTimeout(advanceTimer.current);
    };
  }, []);

  // Accesibilidad: al cambiar de pregunta, el foco va al enunciado.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step, done]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const names = Array.from(list, (f) => f.name);
    setFiles((prev) => [...prev, ...names.filter((n) => !prev.includes(n))]);
  };

  const show = (v: string | string[] | null) =>
    (Array.isArray(v) ? v.join(", ") : v) || "Pendiente";
  const summary = [
    { k: "Proyecto", v: show(answers.tipo) },
    { k: "Instalaciones", v: show(answers.alcance) },
    { k: "Superficie", v: show(answers.m2) },
    { k: "Etapa", v: show(answers.etapa) },
    { k: "Planos", v: files.length ? `${files.length} archivo(s)` : "Pendiente" },
  ];

  const body: ReactNode = done ? (
    <div className="flex animate-enter flex-col gap-6">
      <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-navy-600">
        Enviado
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="text-[clamp(34px,5vw,72px)] font-extrabold leading-none tracking-[-0.045em] outline-none"
      >
        Gracias. Ya estamos revisando {files.length ? "tus planos" : "tu solicitud"}.
      </h1>
      <p className="max-w-[520px] text-lg leading-[1.55] text-gray-600">{state.message}</p>
      <button
        type="button"
        onClick={onReset}
        className="w-fit border border-ink bg-white px-[18px] py-3 font-semibold transition-colors duration-300 hover:bg-ink hover:text-white"
      >
        Nueva solicitud
      </button>
    </div>
  ) : (
    <>
      <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
        Cotización · {step + 1} / {quoteSteps.length}
      </p>
      <h1
        key={`q-${step}`}
        ref={headingRef}
        tabIndex={-1}
        className="animate-enter text-[clamp(32px,4.6vw,64px)] font-extrabold leading-none tracking-[-0.045em] text-balance outline-none"
      >
        {cur.question}
      </h1>

      {cur.options.length > 0 && (
        <div
          key={`o-${step}`}
          role="group"
          aria-label={cur.question}
          className="flex animate-enter flex-col border-t border-ink [animation-delay:60ms]"
        >
          {cur.options.map((label, i) => {
            const value = cur.key === "alcance" ? answers.alcance : answers[cur.key as "tipo" | "m2" | "etapa"];
            const on = Array.isArray(value) ? value.includes(label) : value === label;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => pick(label)}
                className={`flex items-center gap-[18px] border-b border-gray-300 px-4 py-[18px] text-left transition-[padding,background-color,color] duration-300 ease-smooth hover:pl-6 ${
                  on ? "bg-navy text-white" : "bg-white text-ink hover:bg-gray-50"
                }`}
              >
                <kbd
                  className={`flex h-7 w-7 shrink-0 items-center justify-center border font-mono text-xs font-semibold ${
                    on ? "border-white" : "border-ink"
                  }`}
                >
                  {KEYS[i]}
                </kbd>
                <span className="flex-1 text-[clamp(18px,1.8vw,22px)] font-semibold tracking-[-0.01em]">
                  {label}
                </span>
                <span aria-hidden="true" className="w-5 text-lg">
                  {on && <span className="inline-block animate-enter">✓</span>}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {cur.key === "planos" && (
        <div key="planos" className="flex animate-enter flex-col gap-3.5 [animation-delay:60ms]">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`flex cursor-pointer flex-col gap-2 border border-dashed border-ink p-6 transition-colors duration-300 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-navy md:p-11 ${
              dragging ? "bg-navy-100" : "bg-gray-50 hover:bg-navy-100/50"
            }`}
          >
            <input
              type="file"
              multiple
              accept=".pdf,.dwg,.rvt,image/*"
              className="sr-only"
              onChange={(e) => addFiles(e.target.files)}
            />
            <span className="text-[clamp(18px,1.8vw,22px)] font-bold">
              {dragging ? "Suelta tus archivos aquí" : "+ Subir planos"}
            </span>
            <span className="text-sm text-gray-500">PDF, DWG, RVT o imágenes · arrástralos o haz clic</span>
          </label>

          {files.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {files.map((f) => (
                <li key={f} className="flex animate-enter items-center gap-2 bg-ink py-1.5 pl-2.5 pr-1.5 text-[13px] text-white">
                  {f}
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                    aria-label={`Quitar ${f}`}
                    className="px-1 text-gray-400 transition-colors hover:text-white"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="grid gap-x-5 sm:grid-cols-2">
            <Field label="Nombre" name="nombre" value={contact.nombre} onChange={(v) => setContact((c) => ({ ...c, nombre: v }))} autoComplete="name" />
            <Field label="Despacho o constructora" name="empresa" value={contact.empresa} onChange={(v) => setContact((c) => ({ ...c, empresa: v }))} autoComplete="organization" />
            <Field label="Correo" name="correo" type="email" value={contact.correo} onChange={(v) => setContact((c) => ({ ...c, correo: v }))} autoComplete="email" />
            <Field label="WhatsApp" name="whatsapp" type="tel" value={contact.whatsapp} onChange={(v) => setContact((c) => ({ ...c, whatsapp: v }))} autoComplete="tel" />
          </div>
        </div>
      )}

      {state.status === "error" && (
        <p role="alert" className="animate-enter border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3">
        {step < LAST ? (
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            className="group flex items-center gap-3 bg-navy px-6 py-4 font-semibold text-white transition-colors duration-300 hover:bg-navy-600"
          >
            Siguiente
            <span aria-hidden="true" className="transition-transform duration-300 ease-smooth group-hover:translate-x-1.5">
              →
            </span>
          </button>
        ) : (
          <SubmitButton />
        )}
        {step > 0 && (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="px-2 py-4 font-semibold text-gray-600 transition-colors hover:text-ink"
          >
            Atrás
          </button>
        )}
        <span className="ml-auto hidden text-[13px] text-gray-400 md:inline">
          Puedes saltar cualquier pregunta · Atajos: A–F y Enter
        </span>
      </div>
    </>
  );

  const questionClass =
    "flex min-h-[clamp(420px,40vw,520px)] flex-col gap-6 md:gap-9 lg:col-span-2";

  return (
    <>
      {/* Progreso: cada tramo se llena al avanzar */}
      <div className="grid grid-cols-5 gap-1 px-5 pt-5 md:px-8" aria-hidden="true">
        {quoteSteps.map((s, i) => (
          <span key={s.key} className="relative h-[3px] overflow-hidden bg-gray-200">
            <span
              className={`absolute inset-0 origin-left bg-navy transition-transform duration-500 ease-smooth ${
                done || i <= step ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </span>
        ))}
      </div>

      <section className="px-5 pb-14 pt-8 md:px-8 md:pb-[88px] md:pt-[72px]">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-3 lg:gap-20">
          {!done && cur.key === "planos" ? (
            <form action={formAction} className={questionClass}>
              <input type="hidden" name="tipo" value={answers.tipo ?? ""} />
              <input type="hidden" name="alcance" value={answers.alcance.join(", ")} />
              <input type="hidden" name="m2" value={answers.m2 ?? ""} />
              <input type="hidden" name="etapa" value={answers.etapa ?? ""} />
              <input type="hidden" name="archivos" value={files.join(", ")} />
              {body}
            </form>
          ) : (
            <div className={questionClass}>{body}</div>
          )}

          <aside className="flex flex-col gap-1.5 bg-night p-6 text-white md:p-9 lg:sticky lg:top-[108px]">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-navy-200">
              Tu solicitud
            </p>
            {summary.map((r) => {
              const set = r.v !== "Pendiente";
              return (
                <div key={r.k} className="flex flex-col gap-1 border-b border-gray-800 py-3">
                  <span className="text-xs text-gray-400">{r.k}</span>
                  <span
                    key={r.v}
                    className={`text-[17px] font-semibold ${set ? "animate-enter text-white" : "text-gray-500"}`}
                  >
                    {r.v}
                  </span>
                </div>
              );
            })}
            <div className="mt-5 flex flex-col gap-2.5">
              <SideLink href={whatsappUrl()}>Mejor por WhatsApp</SideLink>
              <SideLink href={`mailto:${site.email}`} small>
                {site.email}
              </SideLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex items-center gap-3 bg-navy px-6 py-4 font-semibold text-white transition-colors duration-300 hover:bg-navy-600 disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Enviando…" : "Enviar solicitud"}
      <span aria-hidden="true" className="transition-transform duration-300 ease-smooth group-hover:translate-x-1.5">
        →
      </span>
    </button>
  );
}

/** Campo con línea inferior que se "dibuja" en azul al enfocarlo. */
function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        className="peer w-full border-b border-gray-300 bg-transparent py-4 text-[17px] outline-none placeholder:text-gray-400"
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-navy transition-transform duration-500 ease-smooth peer-focus:scale-x-100" />
    </label>
  );
}

function SideLink({ href, children, small = false }: { href: string; children: ReactNode; small?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group flex justify-between gap-3 border border-gray-700 px-4 py-3.5 font-semibold transition-colors duration-300 hover:bg-ink ${
        small ? "text-sm" : ""
      }`}
    >
      <span className="break-all">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
