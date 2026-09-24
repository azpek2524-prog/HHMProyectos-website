import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MediaSlot from "@/components/ui/MediaSlot";
import ArrowLink from "@/components/ui/ArrowLink";
import ProjectCard from "@/components/ui/ProjectCard";
import JsonLd from "@/components/seo/JsonLd";
import { categories, getCategory, projects } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.id }));
}

/** Filtros del portafolio que existen para cada servicio (/obras?instalacion=…). */
const portfolioFilter: Record<string, string | undefined> = {
  plomeria: "plomeria",
  electricidad: "electricidad",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return pageMetadata({
    title: cat.title,
    description: `${cat.lead} ${cat.items.map(([t]) => t).join(", ")}.`,
    path: `/servicios/${cat.id}`,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();

  const related = projects.filter((p) => p.scope.includes(cat.name));
  const shown = (related.length ? related : projects).slice(0, 3);
  const filter = portfolioFilter[cat.id];
  const others = categories.filter((c) => c.id !== cat.id);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: cat.title,
          serviceType: cat.name,
          description: cat.lead,
          url: `${site.url}/servicios/${cat.id}`,
          provider: { "@type": "HomeAndConstructionBusiness", name: site.name, url: site.url },
          areaServed: { "@type": "Country", name: "México" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: cat.name,
            itemListElement: cat.items.map(([name, description]) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name, description },
            })),
          },
        }}
      />

      <PageHeader
        eyebrow={
          <Breadcrumbs
            items={[
              { name: "Inicio", href: "/" },
              { name: "Servicios", href: "/servicios" },
              { name: cat.name, href: `/servicios/${cat.id}` },
            ]}
          />
        }
        title={cat.title}
        lead={cat.lead}
      />

      {/* Foto + alcance completo (todo visible: se lee y se indexa sin clics) */}
      <section className="px-5 pb-14 md:px-8 md:pb-[104px]">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-16">
          <Reveal variant="clip" className="relative aspect-[4/3] overflow-hidden bg-night lg:sticky lg:top-[108px]">
            <div className="absolute inset-0">
              <MediaSlot
                label={`Foto de ${cat.name} en obra`}
                src={cat.image}
                alt={cat.imageAlt}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </Reveal>

          <div className="flex flex-col">
            <p className="mb-5 font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
              Qué incluye
            </p>
            <ol className="border-t border-ink">
              {cat.items.map(([title, text], i) => (
                <Reveal as="li" key={title} delay={i * 60} className="flex gap-5 border-b border-gray-300 py-5">
                  <span className="w-7 shrink-0 pt-1 font-mono text-[13px] font-semibold text-navy-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h2 className="text-[clamp(18px,1.8vw,22px)] font-bold tracking-[-0.015em]">{title}</h2>
                    <p className="leading-relaxed text-gray-600">{text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowLink href={`/cotizar?alcance=${cat.id}`}>Cotizar {cat.name.toLowerCase()}</ArrowLink>
              <ArrowLink href={whatsappUrl(`Hola HHM Proyectos, me interesa su servicio de ${cat.name.toLowerCase()}.`)} variant="ink" external>
                WhatsApp
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Obras relacionadas */}
      <section className="px-5 pb-14 md:px-8 md:pb-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-t border-ink pt-6">
            <h2 className="text-[clamp(28px,3.6vw,48px)] font-extrabold leading-none tracking-[-0.04em]">
              {related.length ? `Obras con ${cat.name.toLowerCase()}` : "Obras recientes"}
            </h2>
            <Link
              href={filter ? `/obras?instalacion=${filter}` : "/obras"}
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              Ver todas las obras →
            </Link>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProjectCard project={p} tag={p.type} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="bg-night px-5 py-14 text-white md:px-8 md:py-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <Reveal as="h2" className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
            Un solo responsable para toda la obra.
          </Reveal>
          <div className="grid gap-px bg-gray-800 md:grid-cols-3">
            {others.map((c, i) => (
              <Reveal key={c.id} delay={i * 100} className="bg-night">
                <Link
                  href={`/servicios/${c.id}`}
                  className="group flex h-full flex-col gap-3 p-6 transition-colors duration-300 hover:bg-navy md:p-8"
                >
                  <span className="font-mono text-xs font-semibold text-navy-200">{c.n}</span>
                  <span className="text-[clamp(22px,2.2vw,28px)] font-bold tracking-[-0.02em]">
                    {c.name}
                  </span>
                  <span className="leading-[1.55] text-gray-300">{c.lead}</span>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-2 text-xl transition-transform duration-300 ease-smooth group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
