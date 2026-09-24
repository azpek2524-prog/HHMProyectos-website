import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";

export const metadata: Metadata = {
  title: "Portafolio",
  description:
    "Obras de plomería y electricidad entregadas para despachos de arquitectura y constructoras: residencial, corporativo, industrial y comercial.",
};

export default function Proyectos() {
  return (
    <>
      <PortfolioBrowser />
      <section className="bg-navy px-5 py-12 text-white md:px-8 md:py-[72px]">
        <Reveal className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-[700px] text-[clamp(26px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.04em]">
            Tu proyecto puede ser el siguiente.
          </h2>
          <ArrowLink href="/contacto" variant="white">
            Cotizar proyecto
          </ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
