import type { Metadata } from "next";
import QuoteWizard from "@/components/contact/QuoteWizard";
import Faq from "@/components/Faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cotizar proyecto",
  description:
    "Cuéntanos tu proyecto en 5 pasos y sube tus planos. Te respondemos con alcance y propuesta.",
  path: "/cotizar",
});

export default function Cotizar() {
  return (
    <>
      <QuoteWizard />
      <section className="border-t border-gray-200 px-5 py-14 md:px-8 md:py-[104px]">
        <Faq title="Antes de enviar tu solicitud" />
      </section>
    </>
  );
}
