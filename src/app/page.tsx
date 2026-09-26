import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Marquee from "@/components/motion/Marquee";
import ArrowLink from "@/components/ui/ArrowLink";
import ProjectCard from "@/components/ui/ProjectCard";
import HeroMedia from "@/components/home/HeroMedia";
import StatsCounter from "@/components/home/StatsCounter";
import ServicePanels from "@/components/home/ServicePanels";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import QuoteCta from "@/components/home/QuoteCta";
import JsonLd from "@/components/seo/JsonLd";
import { categories, clientLogos, projects, specialties, stats, testimonials } from "@/lib/data";
import { site } from "@/lib/site";

// Título, descripción y vista previa vienen del layout.
export const metadata: Metadata = { alternates: { canonical: "/" } };

/* Ficha del negocio para buscadores (schema.org). */
const business = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${site.url}/#empresa`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/apple-icon.png`,
  image: `${site.url}${site.media.heroPoster ?? "/opengraph-image.jpg"}`,
  description:
    "Contratista de electricidad y plomería: 15 años y más de 280 obras para agencias automotrices, residencias, comercios e industria.",
  email: site.email,
  telephone: site.phoneE164,
  ...(site.address && { address: site.address }),
  areaServed: site.serviceArea,
  knowsAbout: specialties,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios",
    itemListElement: categories.map((c) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: c.title, url: `${site.url}/servicios/${c.id}` },
    })),
  },
};

/* Obras destacadas en la Home (por slug). */
const featured = ["torre-invex-oficinas", "agencia-kia", "residencia"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p !== undefined);

export default function Home() {
  return (
    <>
      <JsonLd data={business} />

      {/* ============ HERO · parallax + entrada escalonada ============ */}
      <section className="relative h-[clamp(560px,52vw,720px)] overflow-hidden bg-night">
        <Parallax speed={0.22} scale={1.18}>
          <HeroMedia />
        </Parallax>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,.2)_0%,rgba(3,7,18,.35)_35%,rgba(3,7,18,.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-5 py-8 md:px-8 md:py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 text-white">
            <h1 className="max-w-[1100px] animate-rise text-[clamp(42px,7.2vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-balance">
              Electricidad y plomería que cuidan tu patrimonio.
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <p className="max-w-[540px] animate-rise text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-gray-200 [animation-delay:150ms]">
                15 años y más de 280 obras para agencias automotrices,
                residencias, comercios e industria. Equipo propio en{" "}
                {site.serviceArea}, del cálculo a la entrega.
              </p>
              <div className="flex animate-rise flex-wrap gap-2.5 [animation-delay:300ms]">
                <ArrowLink href="/cotizar" variant="white">
                  Cotizar mi proyecto
                </ArrowLink>
                <ArrowLink href="/obras" variant="outline">
                  Ver obras
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENTES · cinta continua de borde a borde ============ */}
      <section aria-label="Clientes" className="border-b border-gray-200">
        <Marquee speed={45} className="py-7 md:py-9" groupClassName="gap-20 pr-20 md:gap-32 md:pr-32">
          {clientLogos.map((logo) => (
            <span
              key={logo.name}
              role="img"
              aria-label={logo.name}
              title={logo.name}
              className="block shrink-0 bg-current text-gray-500 transition-colors duration-500 hover:text-ink"
              style={{
                height: logo.height,
                width: Math.round(logo.height * logo.ratio),
                maskImage: `url(${logo.src})`,
                WebkitMaskImage: `url(${logo.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          ))}
        </Marquee>
      </section>

      {/* ============ CIFRAS · contadores (solo con cifras reales) ============ */}
      {stats.length > 0 && (
        <section className="px-5 pt-12 md:px-8 md:pt-[88px]">
          <Reveal>
            <StatsCounter />
          </Reveal>
        </section>
      )}

      {/* ============ SERVICIOS · paneles que se expanden ============ */}
      <section className="px-5 pb-10 pt-14 md:px-8 md:pb-16 md:pt-[120px]">
        <Reveal className="mx-auto mb-6 flex max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-4 md:mb-10">
          <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
            Dos especialidades.
            <br />
            Un solo responsable.
          </h2>
          <p className="max-w-[440px] text-[clamp(16px,1.5vw,18px)] leading-[1.55] text-gray-600">
            El mismo equipo de ingenieros y cuadrillas para las dos
            instalaciones, coordinado con tu arquitecto y tu residente. Menos
            pendientes entre oficios, menos sorpresas en obra.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ServicePanels />
        </Reveal>
      </section>

      {/* ============ OBRAS · hover con zoom y barra ============ */}
      <section className="px-5 pb-14 pt-10 md:px-8 md:pb-[104px] md:pt-[72px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 border-t border-ink pt-6">
            <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
              Obras recientes
            </h2>
            <p className="max-w-[380px] text-base leading-normal text-gray-600">
              Agencias, residencias, oficinas e industria, en Monterrey y en
              proyectos fuera del estado.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProjectCard project={p} tag={p.type} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              href="/obras"
              className="group flex items-center justify-between gap-4 bg-night px-5 py-[22px] text-white transition-colors duration-300 hover:bg-navy md:px-9 md:py-8"
            >
              <span className="text-[clamp(20px,2.2vw,28px)] font-bold tracking-[-0.02em]">
                Ver todas las obras
              </span>
              <span
                aria-hidden="true"
                className="text-[clamp(22px,2.4vw,32px)] transition-transform duration-[350ms] ease-smooth group-hover:translate-x-2"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ CASO REAL · capacidad para cumplir ============ */}
      <section className="bg-navy px-5 py-14 text-white md:px-8 md:py-24">
        <Reveal as="figure" className="mx-auto flex max-w-7xl flex-col gap-7">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.06em] text-navy-200">
            Caso real · Parque industrial
          </p>
          <blockquote className="max-w-[1050px] text-[clamp(24px,3.2vw,42px)] font-semibold leading-[1.18] tracking-[-0.03em] text-balance">
            Otro contratista eléctrico no pudo con un parque industrial: naves,
            talleres y dormitorios para una línea de tráileres. Entramos con
            todo el equipo y sacamos la obra adelante.
          </blockquote>
          <figcaption className="flex flex-wrap items-center justify-between gap-6">
            <span className="max-w-[560px] text-lg leading-[1.5] text-navy-200">
              Al terminar, el cliente nos encargó su siguiente parque.
            </span>
            <ArrowLink href="/cotizar" variant="white">
              Cotizar mi proyecto
            </ArrowLink>
          </figcaption>
        </Reveal>
      </section>

      {/* ============ TESTIMONIOS · carrusel (solo con reseñas reales) ============ */}
      {testimonials.length > 0 && (
        <section className="bg-navy px-5 py-12 text-white md:px-8 md:py-20">
          <TestimonialCarousel />
        </section>
      )}

      {/* ============ ESPECIALIDADES · marquee tipográfico ============ */}
      <section className="border-b border-gray-200 py-7 md:py-12">
        <Marquee reverse speed={90} groupClassName="gap-6 pr-6 md:gap-12 md:pr-12">
          {specialties.map((word, i) => (
            <Fragment key={word}>
              <span
                className={`whitespace-nowrap text-[clamp(40px,6.4vw,92px)] font-extrabold leading-none tracking-[-0.045em] transition-colors duration-300 hover:text-navy ${
                  i % 2 ? "text-outline hover:[-webkit-text-stroke-color:var(--color-navy)]" : "text-ink"
                }`}
              >
                {word}
              </span>
              <span className="h-[clamp(10px,1.2vw,16px)] w-[clamp(10px,1.2vw,16px)] shrink-0 bg-navy-600" />
            </Fragment>
          ))}
        </Marquee>
      </section>

      {/* ============ CTA DE COTIZACIÓN ============ */}
      <section className="px-5 py-14 md:px-8 md:py-[104px]">
        <Reveal>
          <QuoteCta />
        </Reveal>
      </section>
    </>
  );
}
