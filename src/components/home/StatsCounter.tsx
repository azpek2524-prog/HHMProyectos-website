"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion";
import { stats } from "@/lib/data";

const DURATION = 1800;

/**
 * Cifras con contador animado + barra que se llena.
 * El HTML del servidor muestra las cifras finales (SEO / sin JavaScript);
 * al entrar en pantalla cuentan desde 0 una sola vez.
 */
export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, rootMargin: "0px 0px -8% 0px" });
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    if (!inView || reduced) return;
    const start = performance.now();
    let raf = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(1 - Math.pow(1 - t, 3)); // ease-out cúbico
      if (t < 1) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-10"
    >
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-3">
          <div className="relative h-0.5 overflow-hidden bg-gray-200">
            <div
              className="absolute inset-y-0 left-0 bg-navy"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="whitespace-nowrap text-[clamp(30px,4.4vw,64px)] font-extrabold leading-none tracking-[-0.05em] tabular-nums">
            {Math.round(s.value * progress).toLocaleString("es-MX")}
            <span className="ml-0.5 text-[0.55em] tracking-[-0.02em] text-navy-600">
              {s.suffix}
            </span>
          </p>
          <p className="max-w-[220px] text-[15px] leading-snug text-gray-600">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
