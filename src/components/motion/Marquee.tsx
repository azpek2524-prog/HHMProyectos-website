import type { ReactNode } from "react";

/**
 * Cinta en movimiento continuo (logos, especialidades).
 * Solo CSS: se pausa al pasar el cursor y se detiene con "reducir movimiento".
 * El contenido se duplica para un bucle sin cortes; la copia se oculta a
 * lectores de pantalla.
 */
export default function Marquee({
  children,
  reverse = false,
  className = "",
  groupClassName = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  className?: string;
  /** Clases de cada copia (define el espacio entre elementos, p. ej. "gap-14 pr-14"). */
  groupClassName?: string;
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        <div className={`flex shrink-0 items-center ${groupClassName}`}>
          {children}
        </div>
        <div
          className={`flex shrink-0 items-center ${groupClassName}`}
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
