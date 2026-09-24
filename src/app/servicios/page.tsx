import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/motion/Reveal";
import ServicesExplorer from "@/components/services/ServicesExplorer";
import { stages } from "@/lib/data";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Plomería, electricidad, proyecto ejecutivo y mantenimiento para construcción: diseño, cálculo, instalación y pólizas.",
};

export default function Servicios() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title="Si va dentro de la obra, lo instalamos."
        lead="Plomería y electricidad completas para construcción: diseño, cálculo, instalación y mantenimiento."
      />

      <ServicesExplorer />

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
