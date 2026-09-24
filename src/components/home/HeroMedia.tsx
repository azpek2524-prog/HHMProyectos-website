"use client";

import { useEffect, useRef } from "react";
import MediaSlot from "@/components/ui/MediaSlot";
import { useReducedMotion } from "@/lib/motion";
import { site } from "@/lib/site";

/**
 * Fondo del hero: video de obra en loop (sin audio) si está configurado en
 * `site.media.heroVideo`; si no, un placeholder. Con "reducir movimiento"
 * el video se queda en pausa mostrando el póster.
 */
export default function HeroMedia() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const { heroVideo, heroPoster } = site.media;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (reduced) video.pause();
    else video.play().catch(() => {});
  }, [reduced]);

  if (!heroVideo) {
    return (
      <MediaSlot
        label="Video de obra a pantalla completa (loop sin audio)"
        src={heroPoster}
        priority
        labelAt="top"
      />
    );
  }

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={heroVideo}
      poster={heroPoster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
