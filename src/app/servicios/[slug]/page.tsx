import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/motion/Reveal";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import MediaSlot from "@/components/ui/MediaSlot";
import ArrowLink from "@/components/ui/ArrowLink";
import ProjectCard from "@/components/ui/ProjectCard";
import Eyebrow from "@/components/ui/Eyebrow";
import JsonLd from "@/components/seo/JsonLd";
import Faq from "@/components/Faq";
import { categories, credentials, getCategory, projects } from "@/lib/data";
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
          areaServed: site.serviceArea,
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
                preload
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

      {/* Cómo trabajamos: la línea superior de cada paso se llena en secuencia */}
      <section className="border-y border-gray-200 bg-gray-50 px-5 py-14 md:px-8 md:py-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 md:gap-14">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Proceso</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em] text-balance">
              Cómo trabajamos en {cat.name.toLowerCase()}.
            </h2>
          </Reveal>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {cat.process.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 120} className="group flex flex-col gap-3">
                <div className="relative h-px bg-gray-300">
                  <span
                    className="absolute inset-0 origin-left scale-x-0 bg-navy transition-transform duration-1000 ease-smooth group-data-[shown]:scale-x-100"
                    style={{ transitionDelay: `${300 + i * 180}ms` }}
                  />
                </div>
                <h3 className="pt-3 font-mono text-xs font-semibold uppercase text-navy-600">
                  {String(i + 1).padStart(2, "0")} · {step.title}
                </h3>
                <p className="leading-[1.55] text-gray-600">{step.text}</p>
              </Reveal>
            ))}
          </ol>

          {/* Respaldo: lo que garantiza que la instalación se hace bien (el propio del servicio, si lo tiene) */}
          <Reveal className="flex flex-col gap-6 border-t border-ink pt-8">
            <Eyebrow as="h3">Respaldo</Eyebrow>
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {(cat.credentials ?? credentials).map((c) => (
                <li key={c.title} className="flex flex-col gap-1">
                  <span className="font-bold tracking-[-0.01em]">{c.title}</span>
                  <span className="text-[14px] leading-snug text-gray-600">{c.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Obras relacionadas */}
      <section className="px-5 py-14 md:px-8 md:py-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-t border-ink pt-6">
            <h2 className="text-[clamp(28px,3.6vw,48px)] font-extrabold leading-none tracking-[-0.04em]">
              {related.length ? `Obras con ${cat.name.toLowerCase()}` : "Obras recientes"}
            </h2>
            <Link
              href={filter ? `/obras?instalacion=${filter}` : "/obras"}
              className="font-semibold text-navy underline-offset-4 hover:underline"
            >
              {filter ? `Ver obras con ${cat.name.toLowerCase()} →` : "Ver todas las obras →"}
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

      {/* Preguntas del servicio + contacto directo */}
      <section className="px-5 pb-14 md:px-8 md:pb-[104px]">
        <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <Faq title={`Preguntas sobre ${cat.name.toLowerCase()}`} items={cat.faqs} structuredData />
          <div className="flex flex-col gap-5 self-start bg-navy p-7 text-white md:p-10">
            <p className="font-mono text-[13px] font-semibold uppercase text-navy-200">¿Otra duda?</p>
            <p className="text-[clamp(24px,2.4vw,32px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
              Te responde un responsable de HHM.
            </p>
            <p className="leading-[1.55] text-navy-100/90">
              Escríbenos por WhatsApp o sube tus planos para cotizar {cat.name.toLowerCase()}.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2">
              <ArrowLink href={`/cotizar?alcance=${cat.id}`} variant="white">
                Cotizar {cat.name.toLowerCase()}
              </ArrowLink>
              <ArrowLink href={whatsappUrl(`Hola HHM Proyectos, tengo una duda sobre su servicio de ${cat.name.toLowerCase()}.`)} variant="outline" external>
                WhatsApp
              </ArrowLink>
            </div>
          </div>
        </Reveal>
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
