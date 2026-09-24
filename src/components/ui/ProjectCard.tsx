import Link from "next/link";
import MediaSlot from "@/components/ui/MediaSlot";
import type { Project } from "@/lib/data";

/**
 * Tarjeta de obra. Hover (y foco de teclado): zoom lento de la foto, barra
 * "Ver obra" que sube desde abajo y subrayado del título.
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
  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group flex flex-col gap-3.5 outline-none"
    >
      <div className={`relative overflow-hidden bg-gray-100 ${aspect}`}>
        <div className="absolute inset-0 transition-transform duration-[800ms] ease-smooth group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
          <MediaSlot
            label="Foto o video de obra"
            src={project.image}
            alt={project.title}
            sizes={sizes}
          />
        </div>
        <span className="pointer-events-none absolute left-3 top-3 bg-white px-2 py-1 font-mono text-[11px] font-semibold uppercase text-night">
          {tag}
        </span>
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
