"use client";

import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

/* ---------------------------------------------------------------------------
   Utilidades de movimiento compartidas por todos los efectos del sitio.
   --------------------------------------------------------------------------- */

/** Suscribe a una media query. En el servidor siempre devuelve false. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** true si el usuario pidió "reducir movimiento" en su sistema. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Indica si el elemento está (o ya estuvo, con `once`) dentro del viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = false, rootMargin = "0px" }: { once?: boolean; rootMargin?: string } = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin]);

  return inView;
}

/* Observador único para todas las apariciones (fade-in / slide-up). */
const REVEAL_MARGIN = "0px 0px -8% 0px";
let revealObserver: IntersectionObserver | null = null;
const revealHandlers = new Map<Element, () => void>();

/** Ejecuta `onShow` una sola vez cuando el elemento entra en pantalla. */
export function observeOnce(el: Element, onShow: () => void): () => void {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          revealHandlers.get(entry.target)?.();
          revealHandlers.delete(entry.target);
          revealObserver?.unobserve(entry.target);
        }
      },
      { rootMargin: REVEAL_MARGIN },
    );
  }
  revealHandlers.set(el, onShow);
  revealObserver.observe(el);
  return () => {
    revealHandlers.delete(el);
    revealObserver?.unobserve(el);
  };
}

/** true cuando el script inline activó las animaciones (JS + sin reduced motion). */
export function motionEnabled(): boolean {
  return document.documentElement.hasAttribute("data-motion");
}
