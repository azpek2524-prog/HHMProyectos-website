"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitQuote, type QuoteState } from "@/app/actions";

const initialState: QuoteState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-lg bg-accent-500 px-6 py-3.5 text-base font-semibold text-brand-950 shadow-lg shadow-accent-500/20 transition hover:bg-accent-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-400/40 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Enviando…" : "Solicitar cotización"}
    </button>
  );
}

export default function QuoteForm() {
  const [state, formAction] = useActionState(submitQuote, initialState);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-display text-xl font-bold text-slate-900">
          Solicitud enviada
        </h3>
        <p className="text-slate-600">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" placeholder="Tu nombre" required />
        <Field
          label="Empresa / Despacho"
          name="empresa"
          placeholder="Opcional"
        />
      </div>

      <Field
        label="Teléfono o correo"
        name="contacto"
        placeholder="Para poder responderte"
        required
      />

      <div>
        <label
          htmlFor="tipoProyecto"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Tipo de proyecto
        </label>
        <select
          id="tipoProyecto"
          name="tipoProyecto"
          defaultValue=""
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          <option value="Plomería">Plomería</option>
          <option value="Electricidad">Electricidad</option>
          <option value="Plomería y electricidad">
            Plomería y electricidad
          </option>
          <option value="Diseño y cálculo">Diseño y cálculo</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="mensaje"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Cuéntanos sobre tu proyecto
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          placeholder="Tipo de obra, ubicación, alcance aproximado…"
          className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      <SubmitButton />
      <p className="text-center text-xs text-slate-500">
        Respondemos normalmente el mismo día hábil.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-slate-700"
      >
        {label}
        {required && <span className="text-accent-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 transition placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
      />
    </div>
  );
}
