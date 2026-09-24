"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import Lightbox, { type LightboxItem } from "@/components/project/Lightbox";
import VideoSources from "@/components/ui/VideoSources";
import { useInView, useReducedMotion } from "@/lib/motion";
import type { Clip, Project } from "@/lib/data";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Galería de una obra: secciones de fotos en mosaico (cada foto conserva su
 * proporción) + videos verticales. Todo abre en un visor a pantalla completa.
 */
export default function ProjectGallery({ project }: { project: Project }) {
  const [open, setOpen] = useState<number | null>(null);
  const videos = project.videos ?? [];

  const items: LightboxItem[] = [
    ...project.gallery.flatMap((g) =>
      g.photos.map((p) => ({ kind: "photo" as const, ...p, group: g.title })),
    ),
    ...videos.map((v) => ({ kind: "video" as const, ...v, group: "Video" })),
  ];
  // Índice en el visor donde empieza cada sección.
  const starts = project.gallery.map((_, i) =>
    project.gallery.slice(0, i).reduce((n, g) => n + g.photos.length, 0),
  );
  const photoCount = project.gallery.reduce((n, g) => n + g.photos.length, 0);

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {project.gallery.map((g, gi) => (
        <section key={g.title} aria-label={g.title}>
          <SectionHeader title={g.title} count={`${pad(g.photos.length)} fotos`} />
          <div className="columns-1 gap-3 sm:columns-2">
            {g.photos.map((p, i) => (
              <Reveal
                key={p.src}
                variant="clip"
                delay={(i % 2) * 120}
                className="mb-3 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setOpen(starts[gi] + i)}
                  aria-label={`Ampliar: ${p.alt}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden bg-gray-100 outline-none"
                  style={{ aspectRatio: `${p.w} / ${p.h}` }}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-night/85 to-transparent px-4 pb-3.5 pt-10 text-left text-sm font-medium text-white transition-transform duration-[450ms] ease-smooth group-hover:translate-y-0 group-focus-visible:translate-y-0">
                    {p.alt}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {videos.length > 0 && (
        <section aria-label="Video">
          <SectionHeader title="Video" count={`${pad(videos.length)} clips`} />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {videos.map((v, i) => (
              <Reveal key={v.src} delay={i * 100}>
                <VideoTile clip={v} onOpen={() => setOpen(photoCount + i)} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {open !== null && (
        <Lightbox
          items={items}
          index={open}
          title={project.title}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </div>
  );
}

function SectionHeader({ title, count }: { title: string; count: string }) {
  return (
    <Reveal className="mb-5 flex items-baseline justify-between gap-4 border-t border-ink pt-4">
      <h2 className="text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-[-0.03em]">
        {title}
      </h2>
      <span className="font-mono text-xs font-semibold uppercase text-gray-500">
        {count}
      </span>
    </Reveal>
  );
}

/**
 * Video vertical que se reproduce solo, en silencio, únicamente mientras
 * está en pantalla (fuera de pantalla se pausa). No se descarga hasta que
 * se necesita. Con "reducir movimiento" se queda en su póster.
 */
function VideoTile({ clip, onOpen }: { clip: Clip; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { rootMargin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && !reduced) v.play().catch(() => {});
    else v.pause();
  }, [inView, reduced]);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver video: ${clip.alt}`}
      className="group relative block aspect-[9/16] w-full cursor-zoom-in overflow-hidden bg-night outline-none"
    >
      <video
        ref={ref}
        poster={clip.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
      >
        <VideoSources clip={clip} />
      </video>
      <span className="pointer-events-none absolute left-2.5 top-2.5 flex items-center gap-1.5 bg-night/70 px-2 py-1 font-mono text-[11px] font-semibold uppercase text-white backdrop-blur-sm">
        <span aria-hidden="true">▶</span> Video
      </span>
    </button>
  );
}
