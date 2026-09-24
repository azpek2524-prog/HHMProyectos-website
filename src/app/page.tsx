import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { clientLogos, projects, specialties } from "@/lib/data";

/* Obras destacadas en la Home (por slug). */
const featured = [
  "edificio-departamentos-12-niveles",
  "oficinas-corporativas-planta-libre",
  "nave-industrial-subestacion",
]
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p) => p !== undefined);

export default function Home() {
  return (
    <>
      {/* ============ HERO · parallax + entrada escalonada ============ */}
      <section className="relative h-[clamp(560px,52vw,720px)] overflow-hidden bg-night">
        <Parallax speed={0.22} scale={1.18}>
          <HeroMedia />
        </Parallax>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0)_30%,rgba(3,7,18,.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 px-5 py-8 md:px-8 md:py-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 text-white">
            <h1 className="max-w-[1100px] animate-rise text-[clamp(42px,7.2vw,104px)] font-extrabold leading-[0.95] tracking-[-0.045em] text-balance">
              Todo lo que corre por dentro de tu obra.
            </h1>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <p className="max-w-[520px] animate-rise text-[clamp(16px,1.5vw,19px)] leading-[1.55] text-gray-200 [animation-delay:150ms]">
                Agua, drenaje, gas, energía y datos. Plomería y electricidad
                para arquitectos y constructoras, del plano a la entrega.
              </p>
              <div className="flex animate-rise flex-wrap gap-2.5 [animation-delay:300ms]">
                <ArrowLink href="/contacto" variant="white">
                  Cotizar proyecto
                </ArrowLink>
                <ArrowLink href="/proyectos" variant="outline">
                  Ver obras
                </ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ LOGOS · marquee lento, pausa al pasar el cursor ============ */}
      <section className="flex items-center border-b border-gray-200">
        <p className="hidden shrink-0 self-stretch border-r border-gray-200 px-8 font-mono text-xs font-semibold uppercase tracking-[0.08em] text-gray-500 md:flex md:items-center">
          Confían en HHM
        </p>
        <Marquee className="min-w-0 flex-1 py-[26px]" groupClassName="gap-14 pr-14">
          {clientLogos.map((logo) => (
            <div key={logo.name} className="relative h-10 w-[140px]">
              {logo.image ? (
                <Image
                  src={logo.image}
                  alt={logo.name}
                  fill
                  sizes="140px"
                  className="object-contain opacity-60 grayscale transition duration-500 hover:opacity-100 hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full items-center justify-center border border-dashed border-gray-300 bg-gray-50 font-mono text-[10px] uppercase tracking-wider text-gray-400">
                  Logo
                </div>
              )}
            </div>
          ))}
        </Marquee>
      </section>

      {/* ============ CIFRAS · contadores ============ */}
      <section className="px-5 pt-12 md:px-8 md:pt-[88px]">
        <Reveal>
          <StatsCounter />
        </Reveal>
      </section>

      {/* ============ SERVICIOS · paneles que se expanden ============ */}
      <section className="px-5 pb-10 pt-14 md:px-8 md:pb-16 md:pt-[120px]">
        <Reveal className="mx-auto mb-6 flex max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-4 md:mb-10">
          <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
            Dos especialidades.
            <br />
            Un solo responsable.
          </h2>
          <p className="max-w-[440px] text-[clamp(16px,1.5vw,18px)] leading-[1.55] text-gray-600">
            Diseño, cálculo, instalación y mantenimiento. Menos coordinación
            para tu despacho, menos sorpresas en obra.
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
            <p className="max-w-[360px] text-base leading-normal text-gray-600">
              Instalaciones entregadas para despachos y constructoras.
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
              href="/proyectos"
              className="group flex items-center justify-between gap-4 bg-night px-5 py-[22px] text-white transition-colors duration-300 hover:bg-navy md:px-9 md:py-8"
            >
              <span className="text-[clamp(20px,2.2vw,28px)] font-bold tracking-[-0.02em]">
                Ver portafolio completo
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

      {/* ============ TESTIMONIOS · carrusel ============ */}
      <section className="bg-navy px-5 py-12 text-white md:px-8 md:py-20">
        <TestimonialCarousel />
      </section>

      {/* ============ ESPECIALIDADES · marquee tipográfico ============ */}
      <section className="border-b border-gray-200 py-7 md:py-12">
        <Marquee reverse groupClassName="gap-6 pr-6 md:gap-12 md:pr-12">
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
