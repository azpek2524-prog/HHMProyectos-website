import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  navy: "bg-navy text-white hover:bg-navy-600",
  white: "bg-white text-ink hover:bg-navy-100",
  outline: "border border-white/60 text-white hover:bg-white/10",
  ink: "bg-ink text-white hover:bg-navy",
} as const;

/**
 * Botón-enlace del sistema editorial: esquinas rectas y flecha que avanza
 * al pasar el cursor (microinteracción consistente en todo el sitio).
 */
export default function ArrowLink({
  href,
  children,
  variant = "navy",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
}) {
  const classes = `group inline-flex items-center gap-3 whitespace-nowrap px-6 py-4 font-semibold transition-colors duration-300 ${variants[variant]} ${className}`;
  const arrow = (
    <span
      aria-hidden="true"
      className="transition-transform duration-300 ease-smooth group-hover:translate-x-1.5"
    >
      →
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {arrow}
    </Link>
  );
}
