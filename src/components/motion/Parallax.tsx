"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * Parallax sutil para medios grandes (fotos/videos de fondo).
 * El contenido se desplaza más lento que el scroll dentro de su marco.
 * - Solo trabaja mientras el marco está en pantalla (IntersectionObserver).
 * - Usa transform + requestAnimationFrame (sin re-renders de React).
 * - El desplazamiento se limita al sobrante del zoom: nunca se ven bordes.
 * El padre debe ser `relative overflow-hidden`.
 */
export default function Parallax({
  children,
  speed = 0.18,
  scale = 1.15,
}: {
  children: ReactNode;
  /** Fracción del scroll que se compensa (0.1 sutil – 0.3 marcado). */
  speed?: number;
  /** Zoom base que crea margen para moverse. */
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const frame = el?.parentElement;
    if (!el || !frame || reduced) return;

    let raf = 0;
    let visible = false;

    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      const limit = ((scale - 1) / 2) * rect.height;
      const y = Math.max(-limit, Math.min(limit, -fromCenter * speed));
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale})`;
    };
    const schedule = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    io.observe(frame);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [speed, scale, reduced]);

  return (
    <div
      ref={ref}
      className="absolute inset-0"
      style={{ transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
}
