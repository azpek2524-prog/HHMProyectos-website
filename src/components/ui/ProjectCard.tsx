"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import MediaSlot from "@/components/ui/MediaSlot";
import VideoSources from "@/components/ui/VideoSources";
import { useReducedMotion } from "@/lib/motion";
import type { Project } from "@/lib/data";

/**
 * Tarjeta de obra. Hover (y foco de teclado): zoom lento de la foto, barra
 * "Ver obra" que sube desde abajo y subrayado del título. Si la obra tiene
 * video, al pasar el cursor se reproduce una vista previa sin sonido (solo
 * con puntero y sin "reducir movimiento"; el video no se descarga hasta
 * que se necesita).
 */
export default function ProjectCard({
  project,
  tag,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  project: Project;
  /** Etiqueta de la esquina (tipo de obra o número). */
  tag: string;
  aspect?: string;
  sizes?: string;
}) {
  const preview = project.videos?.[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  const start = (e: React.PointerEvent) => {
    if (!preview || reduced || e.pointerType !== "mouse") return;
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    videoRef.current?.pause();
    setPlaying(false);
  };

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      onPointerEnter={start}
      onPointerLeave={stop}
      className="group flex flex-col gap-3.5 outline-none"
    >
      <div className={`relative overflow-hidden bg-gray-100 ${aspect}`}>
        <div className="absolute inset-0 transition-transform duration-[800ms] ease-smooth group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
          <MediaSlot
            label="Foto o video de obra"
            src={project.cover.src}
            alt={project.cover.alt}
            sizes={sizes}
          />
          {preview && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
            >
              <VideoSources clip={preview} />
            </video>
          )}
        </div>
        <span className="pointer-events-none absolute left-3 top-3 bg-white px-2 py-1 font-mono text-[11px] font-semibold uppercase text-night">
          {tag}
        </span>
        {preview && (
          <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 bg-night/70 px-2 py-1 font-mono text-[11px] font-semibold uppercase text-white backdrop-blur-sm">
            <span aria-hidden="true">▶</span> Video
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-[101%] justify-between bg-navy px-[18px] py-4 font-semibold text-white transition-transform duration-[450ms] ease-smooth group-hover:translate-y-0 group-focus-visible:translate-y-0">
          <span>Ver obra</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug tracking-[-0.01em] decoration-1 underline-offset-4 group-hover:underline group-focus-visible:underline">
          {project.title}
        </h3>
        <span className="whitespace-nowrap text-[13px] text-gray-500">
          {project.scope}
        </span>
      </div>
    </Link>
  );
}
