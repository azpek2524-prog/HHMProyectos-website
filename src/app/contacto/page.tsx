import type { Metadata } from "next";
import QuoteWizard from "@/components/contact/QuoteWizard";

export const metadata: Metadata = {
  title: "Cotización",
  description:
    "Cuéntanos tu proyecto en 5 pasos y sube tus planos. Te respondemos con alcance y propuesta.",
};

export default function Contacto() {
  return <QuoteWizard />;
}
