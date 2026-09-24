import type { Metadata } from "next";
import QuoteWizard from "@/components/contact/QuoteWizard";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cotizar proyecto",
  description:
    "Cuéntanos tu proyecto en 5 pasos y sube tus planos. Te respondemos con alcance y propuesta.",
  path: "/cotizar",
});

export default function Cotizar() {
  return <QuoteWizard />;
}
