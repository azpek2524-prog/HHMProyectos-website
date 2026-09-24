import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PageHeader from "@/components/ui/PageHeader";
import MediaSlot from "@/components/ui/MediaSlot";
import ArrowLink from "@/components/ui/ArrowLink";
import { principles, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "HHM Proyectos diseña e instala plomería y electricidad para arquitectos y constructoras. Entramos temprano, un solo responsable y todo por escrito.",
};

export default function Empresa() {
  return (
    <>
      <PageHeader
        eyebrow="Empresa"
        title={
          <>
            No se ven cuando la obra está terminada.{" "}
            <span className="text-gray-400">Por eso tienen que quedar bien.</span>
          </>
        }
        lead="HHM Proyectos diseña e instala plomería y electricidad para arquitectos y constructoras. Tuberías, cableado y tableros que nadie vuelve a ver — y que tienen que funcionar por décadas."
      />

      {/* Imágenes: se descubren como cortina al entrar en pantalla */}
      <section className="px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-3">
          <Reveal variant="clip" className="relative aspect-[16/10] overflow-hidden lg:col-span-2">
            <div className="absolute inset-0">
              <MediaSlot label="Foto del equipo en obra" sizes="(min-width: 1024px) 66vw, 100vw" />
            </div>
          </Reveal>
          <Reveal variant="clip" delay={150} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <div className="absolute inset-0">
              <MediaSlot label="Detalle: tubería o tablero" sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principios */}
      <section className="px-5 py-14 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-7xl">
          <Reveal as="p" className="mb-8 font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
            Cómo trabajamos
          </Reveal>
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="group relative grid gap-x-10 gap-y-3 border-t border-ink py-6 md:grid-cols-2 md:py-9">
                {/* Línea que se dibuja sobre el borde al pasar el cursor */}
                <span className="pointer-events-none absolute inset-x-0 -top-px h-[3px] origin-left scale-x-0 bg-navy transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-sm font-semibold text-navy-600">{p.n}</span>
                  <h3 className="text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.05] tracking-[-0.035em] transition-transform duration-500 ease-smooth group-hover:translate-x-2">
                    {p.title}
                  </h3>
                </div>
                <p className="max-w-[520px] pt-1.5 text-[17px] leading-relaxed text-gray-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink" />
        </div>
      </section>

      {/* Equipo: retratos en blanco y negro que toman color al pasar el cursor */}
      <section className="bg-night px-5 py-14 text-white md:px-8 md:py-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Reveal as="h2" className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
            Las personas detrás.
          </Reveal>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {team.map((t, i) => (
              <Reveal key={t.role} delay={i * 100}>
                <div className="group flex flex-col gap-3">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute inset-0 grayscale transition-[filter,scale] duration-700 ease-smooth group-hover:scale-[1.04] group-hover:grayscale-0">
                      <MediaSlot label="Retrato" src={t.image} alt={`${t.name}, ${t.role}`} sizes="(min-width: 1024px) 25vw, 50vw" />
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-x-3 text-[15px]">
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-gray-400">{t.role}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-14 md:px-8 md:py-[104px]">
        <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[760px] text-[clamp(30px,4.4vw,60px)] font-extrabold leading-none tracking-[-0.045em]">
            ¿Arrancas un proyecto? Llámanos desde el anteproyecto.
          </h2>
          <ArrowLink href="/contacto">Cotizar proyecto</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
