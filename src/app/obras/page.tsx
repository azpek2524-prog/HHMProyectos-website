import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import PortfolioBrowser from "@/components/portfolio/PortfolioBrowser";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Obras",
  description:
    "Obras de plomería y electricidad entregadas para despachos de arquitectura y constructoras: residencial, corporativo, industrial y comercial.",
  path: "/obras",
});

export default function Obras() {
  return (
    <>
      <PortfolioBrowser />
      <section className="bg-navy px-5 py-12 text-white md:px-8 md:py-[72px]">
        <Reveal className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <h2 className="max-w-[700px] text-[clamp(26px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.04em]">
            Tu proyecto puede ser el siguiente.
          </h2>
          <ArrowLink href="/cotizar" variant="white">
            Cotizar proyecto
          </ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
