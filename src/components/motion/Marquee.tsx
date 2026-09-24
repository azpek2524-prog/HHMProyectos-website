"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Cinta en movimiento continuo de borde a borde (logos, especialidades).
 *
 * Mide su ancho y el de un grupo de elementos y repite el grupo las veces
 * necesarias para cubrir cualquier pantalla (laptop, monitor ultrawide o
 * celular); la animación avanza exactamente el ancho de un grupo, así el
 * ciclo no tiene costura. Se pausa al pasar el cursor y se detiene con
 * "reducir movimiento". Las copias se ocultan a lectores de pantalla.
 */
export default function Marquee({
  children,
  reverse = false,
  speed = 40,
  className = "",
  groupClassName = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  /** Velocidad en píxeles por segundo (constante sin importar cuántos elementos haya). */
  speed?: number;
  className?: string;
  /** Clases de cada grupo; el espacio entre elementos va como gap + padding derecho (p. ej. "gap-20 pr-20"). */
  groupClassName?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ copies: 2, distance: 0 });

  useEffect(() => {
    const root = rootRef.current;
    const group = groupRef.current;
    if (!root || !group) return;
    // ResizeObserver avisa al observar y en cada cambio (ventana, fuentes, imágenes).
    const ro = new ResizeObserver(() => {
      const distance = group.getBoundingClientRect().width;
      if (!distance) return;
      const copies = Math.max(2, Math.ceil(root.clientWidth / distance) + 1);
      setLayout((prev) =>
        prev.copies === copies && Math.abs(prev.distance - distance) < 0.5
          ? prev
          : { copies, distance },
      );
    });
    ro.observe(root);
    ro.observe(group);
    return () => ro.disconnect();
  }, []);

  const { copies, distance } = layout;
  const style = distance
    ? ({
        "--marquee-distance": `${distance}px`,
        animationDuration: `${distance / speed}s`,
        animationDirection: reverse ? "reverse" : "normal",
      } as CSSProperties)
    : undefined;

  return (
    <div ref={rootRef} className={`marquee overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${distance ? "animate-marquee" : ""}`}
        style={style}
      >
        {Array.from({ length: copies }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? groupRef : undefined}
            aria-hidden={i > 0 ? true : undefined}
            className={`flex shrink-0 items-center ${groupClassName}`}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
