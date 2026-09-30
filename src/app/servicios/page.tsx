import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import MediaSlot from "@/components/ui/MediaSlot";
import { categories, stages } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Servicios",
  description:
    "Electricidad, plomería y proyecto ejecutivo para construcción: diseño, cálculo e instalación con verificación UVIE y seguimiento en obra.",
  path: "/servicios",
});

export default function Servicios() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Electricidad y plomería, del cálculo a la entrega."
        lead="Diseñamos e instalamos las redes eléctricas, hidrosanitarias y de gas de tu proyecto, con verificación UVIE y seguimiento en obra hasta la entrega."
      />

      {/* Los 4 servicios: cada tarjeta lleva a su página y a cotizarlo */}
      <section className="px-5 pb-14 md:px-8 md:pb-[104px]">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 md:gap-6">
          {categories.map((c, i) => (
            <Reveal key={c.id} id={c.id} delay={(i % 2) * 120} className="scroll-mt-28">
              <article className="group relative flex h-full flex-col border border-ink bg-white">
                <div className="relative aspect-[16/10] overflow-hidden bg-night">
                  <div className="absolute inset-0 transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.04]">
                    <MediaSlot
                      label={`Foto de ${c.name} en obra`}
                      src={c.image}
                      alt={c.imageAlt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <span className="absolute left-4 top-4 bg-white px-2.5 py-1 font-mono text-xs font-semibold text-ink md:left-5 md:top-5">
                    {c.n}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                  <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold leading-none tracking-[-0.04em]">
                    {/* Toda la tarjeta es clicable; el enlace de cotizar queda encima */}
                    <Link href={`/servicios/${c.id}`} className="after:absolute after:inset-0">
                      {c.name}
                    </Link>
                  </h2>
                  <p className="max-w-[520px] leading-[1.55] text-gray-600">{c.lead}</p>
                  <ul className="flex flex-wrap gap-2">
                    {c.items.map(([title]) => (
                      <li key={title} className="border border-gray-300 px-3 py-1.5 text-[13px] text-ink">
                        {title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5">
                    <span aria-hidden="true" className="flex items-center gap-2 font-semibold text-navy">
                      Ver {c.name.toLowerCase()}
                      <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-1.5">→</span>
                    </span>
                    <Link
                      href={`/cotizar?alcance=${c.id}`}
                      className="relative z-10 font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy"
                    >
                      Cotizar {c.name.toLowerCase()}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Etapas: la línea superior de cada columna se llena en secuencia */}
      <section className="bg-night px-5 py-14 text-white md:px-8 md:py-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <Reveal as="h2" className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
            Entramos en cualquier etapa.
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {stages.map((s, i) => (
              <Reveal key={s.name} delay={i * 120} className="group flex flex-col gap-3">
                <div className="relative h-px bg-gray-700">
                  <span
                    className="absolute inset-0 origin-left scale-x-0 bg-navy-200 transition-transform duration-1000 ease-smooth group-data-[shown]:scale-x-100"
                    style={{ transitionDelay: `${300 + i * 180}ms` }}
                  />
                </div>
                <span className="pt-3 font-mono text-xs font-semibold uppercase text-navy-200">
                  {String(i + 1).padStart(2, "0")} · {s.name}
                </span>
                <p className="leading-[1.55] text-gray-300">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
