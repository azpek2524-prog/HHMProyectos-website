"use client";

import { useEffect, useEffectEvent, useRef } from "react";
import Image from "next/image";
import VideoSources from "@/components/ui/VideoSources";

export type LightboxItem =
  | { kind: "photo"; src: string; alt: string; w: number; h: number; group?: string }
  | { kind: "video"; src: string; webm?: string; poster: string; alt: string; w: number; h: number; group?: string };

/**
 * Visor a pantalla completa para fotos y videos de una obra.
 * Teclado: ← → para navegar, Esc para cerrar. En táctil: deslizar.
 * Bloquea el scroll de la página y devuelve el foco al cerrar.
 */
export default function Lightbox({
  items,
  index,
  title,
  onIndex,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  title: string;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];
  const n = items.length;
  const go = (d: number) => onIndex((index + d + n) % n);

  const onKey = useEffectEvent((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  });

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => onKey(e);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      root.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de ${title}`}
      className="fixed inset-0 z-[70] flex animate-fade flex-col bg-night/95 text-white backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.06em] text-gray-400">
          {item.group ? `${item.group} · ` : ""}
          <span className="tabular-nums text-white">
            {String(index + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="flex h-11 w-11 items-center justify-center border border-white/30 text-xl transition-colors hover:bg-white hover:text-night"
        >
          ×
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <div key={index} className="relative h-full w-full animate-enter">
          {item.kind === "photo" ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          ) : (
            <video
              poster={item.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            >
              <VideoSources clip={item} />
            </video>
          )}
        </div>

        {n > 1 &&
          ([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              aria-label={d === -1 ? "Anterior" : "Siguiente"}
              className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/30 text-lg transition-colors hover:bg-white hover:text-night md:flex ${
                d === -1 ? "left-5" : "right-5"
              }`}
            >
              {d === -1 ? "←" : "→"}
            </button>
          ))}
      </div>

      <p className="px-5 pb-6 pt-4 text-center text-sm text-gray-300 md:px-8">
        {item.alt}
      </p>
    </div>
  );
}
