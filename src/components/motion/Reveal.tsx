"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { motionEnabled, observeOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Etiqueta HTML a renderizar (div por defecto). */
  as?: ElementType;
  /** Retraso en ms para escalonar elementos hermanos (máx. recomendado ~300). */
  delay?: number;
  /** "fade" = aparece subiendo; "clip" = la imagen se descubre como cortina. */
  variant?: "fade" | "clip";
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Fade-in / slide-up al entrar en pantalla, una sola vez.
 * Importante: no pongas efectos hover con transform en el mismo elemento;
 * envuélvelo (Reveal controla su propia transición).
 */
export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "fade",
  className,
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => el.setAttribute("data-shown", "");
    if (!motionEnabled() || typeof IntersectionObserver === "undefined") {
      show();
      return;
    }
    return observeOnce(el, show);
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant === "clip" ? "clip" : ""}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
