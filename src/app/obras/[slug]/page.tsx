import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import MediaSlot from "@/components/ui/MediaSlot";
import type { ReactNode } from "react";
import ArrowLink from "@/components/ui/ArrowLink";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProjectGallery from "@/components/project/ProjectGallery";
import { getProject, projectCategories, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/obras/${project.slug}`,
    images: [{ url: project.cover.src, width: project.cover.w, height: project.cover.h, alt: project.cover.alt }],
  });
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const photos = project.gallery.reduce((n, g) => n + g.photos.length, 0);
  const videos = project.videos?.length ?? 0;
  const services = projectCategories(project);

  // El alcance enlaza a la página de cada servicio.
  const scope: ReactNode = services.length
    ? services.map((c, i) => (
        <span key={c.id}>
          {i > 0 && " + "}
          <Link href={`/servicios/${c.id}`} className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy">
            {c.name}
          </Link>
        </span>
      ))
    : project.scope;

  // Solo se muestran los datos que existen.
  const allFacts: [string, ReactNode | undefined][] = [
      ["Tipo de obra", project.type],
      ["Alcance", scope],
      ["Ubicación", project.place],
      ["Año", project.year],
      ["Entramos en", project.stage],
      ["Arquitectura", project.architect],
      ["Constructora", project.builder],
      ["Material", `${photos} fotos${videos ? ` · ${videos} videos` : ""}`],
  ];
  const facts = allFacts.filter((f): f is [string, ReactNode] => Boolean(f[1]));

  return (
    <>
      {/* ============ HERO · parallax ============ */}
      <section className="relative h-[clamp(420px,46vw,640px)] overflow-hidden bg-night">
        <Parallax speed={0.2}>
          <MediaSlot
            label="Foto principal de la obra"
            src={project.cover.src}
            alt={project.cover.alt}
            priority
            labelAt="top"
          />
        </Parallax>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,.1)_30%,rgba(3,7,18,.85))]" />
        <div className="absolute inset-x-0 bottom-0 px-5 py-6 text-white md:px-8 md:py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-3.5">
            <Breadcrumbs
              tone="dark"
              className="animate-rise"
              items={[
                { name: "Inicio", href: "/" },
                { name: "Obras", href: "/obras" },
                { name: project.title, href: `/obras/${project.slug}` },
              ]}
            />
            <p className="animate-rise font-mono text-xs font-semibold uppercase tracking-[0.06em]">
              Obra {String(index + 1).padStart(2, "0")} · {project.type}
              {project.year ? ` · ${project.year}` : ""}
            </p>
            <h1 className="max-w-[1000px] animate-rise text-[clamp(34px,5.6vw,80px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-balance [animation-delay:120ms]">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* ============ FICHA FIJA + GALERÍA ============ */}
      <section className="px-5 py-10 md:px-8 md:py-[72px]">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-3 lg:gap-16">
          <aside className="lg:sticky lg:top-[108px]">
            <Reveal className="flex flex-col border-t border-ink">
              <dl>
                {facts.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex justify-between gap-4 border-b border-gray-300 py-3.5 text-[15px]"
                  >
                    <dt className="text-gray-500">{k}</dt>
                    <dd className="text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="py-6 text-[17px] leading-[1.65] text-gray-700 text-pretty">
                {project.summary}
              </p>
              <ArrowLink
                href={services.length ? `/cotizar?alcance=${services.map((c) => c.id).join(",")}` : "/cotizar"}
                className="w-full justify-between"
              >
                Cotizar algo similar
              </ArrowLink>
            </Reveal>
          </aside>

          <div className="min-w-0 lg:col-span-2">
            <ProjectGallery project={project} />
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIO (solo si existe) ============ */}
      {project.quote && (
        <section className="bg-navy px-5 py-12 text-white md:px-8 md:py-24">
          <Reveal as="figure" className="mx-auto flex max-w-7xl flex-col gap-7">
            <blockquote className="max-w-[1000px] text-[clamp(24px,3.2vw,42px)] font-semibold leading-[1.18] tracking-[-0.03em] text-balance">
              “{project.quote.text}”
            </blockquote>
            <figcaption className="text-navy-200">{project.quote.who}</figcaption>
          </Reveal>
        </section>
      )}

      {/* ============ ANTERIOR / SIGUIENTE ============ */}
      <nav aria-label="Otras obras" className="grid border-t border-gray-200 md:grid-cols-2">
        {[
          { p: prev, label: "← Anterior", align: "" },
          { p: next, label: "Siguiente →", align: "md:text-right md:items-end" },
        ].map(({ p, label, align }, i) => (
          <Link
            key={label}
            href={`/obras/${p.slug}`}
            className={`group flex flex-col gap-1.5 border-gray-200 px-5 py-7 transition-colors duration-300 hover:bg-gray-50 md:px-8 md:py-12 ${align} ${
              i === 0 ? "border-b md:border-b-0 md:border-r" : ""
            }`}
          >
            <span className="text-[13px] text-gray-500">{label}</span>
            <span
              className={`text-[clamp(18px,2vw,24px)] font-bold tracking-[-0.02em] transition-transform duration-300 ease-smooth ${
                i === 0 ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
            >
              {p.title}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}
