import type { ElementType, ReactNode } from "react";

/**
 * Etiqueta de sección: mono en mayúsculas con tracking amplio, en azul marino
 * y precedida de una línea corta. Da jerarquía sin recurrir al gris.
 * `tone="light"` sobre fondos oscuros.
 */
export default function Eyebrow({
  children,
  as: Tag = "p",
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Tag
      className={`flex items-center gap-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] ${
        tone === "light" ? "text-navy-200" : "text-navy-600"
      } ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 shrink-0 bg-current" />
      {children}
    </Tag>
  );
}
