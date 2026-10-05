import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Parallax from "@/components/motion/Parallax";
import Marquee from "@/components/motion/Marquee";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import ProjectCard from "@/components/ui/ProjectCard";
import HeroBlueprint, { HeroBlueprintMobile } from "@/components/home/HeroBlueprint";
import StatsCounter from "@/components/home/StatsCounter";
import ServicePanels from "@/components/home/ServicePanels";
import TestimonialWall from "@/components/home/TestimonialWall";
import QuoteCta from "@/components/home/QuoteCta";
import JsonLd from "@/components/seo/JsonLd";
import Faq from "@/components/Faq";
import { categories, clientLogos, credentials, projects, specialties, stats, testimonialDrafts, testimonials } from "@/lib/data";
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
  image: `${site.url}/opengraph-image.jpg`,
  description:
    "Contratista de electricidad y plomería: más de 18 años y más de 280 obras para agencias automotrices, residencias, comercios e industria.",
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

const inlineLink =
  "font-semibold text-navy underline decoration-navy/30 underline-offset-4 transition-colors hover:decoration-navy";

/*
 * Testimonios: en el sitio oficial solo los reales y aprobados. Mientras no
 * haya, las vistas previas de Vercel y el desarrollo local muestran los
 * borradores (marcados como tales) para revisar el diseño.
 */
const showDrafts = process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";
const homeTestimonials = testimonials.length ? testimonials : showDrafts ? testimonialDrafts : [];

/* Obras destacadas en la Home (por slug). */
const featured = ["torre-invex-oficinas", "agencia-kia", "residencia"]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p !== undefined);

export default function Home() {
  return (
    <>
      <JsonLd data={business} />

      {/* ============ HERO · plano que se dibuja solo + entrada escalonada ============ */}
      <section className="relative overflow-hidden bg-navy md:h-[clamp(560px,52vw,720px)]">
        <Parallax speed={0.1} scale={1.04}>
          <HeroBlueprint />
        </Parallax>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(22,36,86,0)_0%,rgba(22,36,86,0)_38%,rgba(3,7,18,.82)_100%)]" />
        {/* Móvil: el plano va en su propia franja y el titular debajo */}
        <div className="relative md:hidden">
          <HeroBlueprintMobile />
        </div>
        <div className="relative px-5 pb-10 pt-3 md:absolute md:inset-x-0 md:bottom-0 md:px-8 md:py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 text-white">
            <Eyebrow tone="light" className="animate-rise">
              Contratista de instalaciones para obra · Monterrey
            </Eyebrow>
            <h1 className="max-w-[1100px] animate-rise text-[clamp(42px,7.2vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-balance [animation-delay:80ms]">
              Electricidad y plomería sin sorpresas en obra.
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <p className="max-w-[540px] animate-rise text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-gray-200 [animation-delay:150ms]">
                Un solo equipo calcula, instala y entrega tus instalaciones, con
                reportes de avance en cada etapa. Así tu obra avanza a tiempo,
                sin retrabajos ni pendientes al cierre.
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
            <div className="mx-auto mt-8 max-w-7xl md:mt-10">
              <Link href="/nosotros" className="font-semibold text-navy underline-offset-4 hover:underline">
                Conoce nuestra historia y cómo trabajamos →
              </Link>
            </div>
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
        <Reveal className="mx-auto mt-6 max-w-7xl md:mt-8">
          <p className="max-w-[760px] text-[clamp(16px,1.5vw,18px)] leading-[1.55] text-gray-600">
            También hacemos el{" "}
            <Link href="/servicios/proyecto-ejecutivo" className={inlineLink}>
              proyecto ejecutivo de instalaciones
            </Link>{" "}
            (cálculo, planos y BIM) y el{" "}
            <Link href="/servicios/mantenimiento" className={inlineLink}>
              mantenimiento de las obras que entregamos
            </Link>
            .
          </p>
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

      {/* ============ TESTIMONIOS · cuadrícula asimétrica, sin carrusel ============ */}
      {homeTestimonials.length > 0 && (
        <section className="bg-night px-5 py-14 text-white md:px-8 md:py-[104px]">
          <TestimonialWall testimonials={homeTestimonials} draft={testimonials.length === 0} />
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

      {/* ============ COTIZACIÓN + PREGUNTAS FRECUENTES · lado a lado ============ */}
      <section className="px-5 py-14 md:px-8 md:py-[104px]">
        {/* En móvil, tarjeta y preguntas van separadas (sin el marco común) */}
        <Reveal className="mx-auto grid max-w-7xl overflow-hidden border border-ink max-md:gap-12 max-md:overflow-visible max-md:border-0 lg:grid-cols-[5fr_7fr]">
          <QuoteCta />
          <div className="flex flex-col gap-10 bg-gray-50 p-7 max-md:bg-transparent max-md:p-0 md:p-12">
            <Faq structuredData />
            {/* Respaldo: en escritorio equilibra el alto con la tarjeta de pasos */}
            <ul className="mt-auto hidden grid-cols-2 gap-x-8 gap-y-5 border-t border-ink pt-6 lg:grid">
              {credentials.map((c) => (
                <li key={c.title} className="flex flex-col gap-1">
                  <span className="text-[15px] font-bold tracking-[-0.01em]">{c.title}</span>
                  <span className="text-sm leading-snug text-gray-600">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
