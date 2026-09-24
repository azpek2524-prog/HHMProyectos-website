import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LogoSprite } from "@/components/brand/Logo";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HHM Proyectos | Plomería y Electricidad para Construcción",
    template: "%s | HHM Proyectos",
  },
  description:
    "Plomería y electricidad para arquitectos y constructoras: diseño, cálculo, instalación y mantenimiento, del plano a la entrega.",
  keywords: [
    "plomería",
    "electricidad",
    "instalaciones hidrosanitarias",
    "instalaciones eléctricas",
    "arquitectos",
    "constructoras",
    "proyecto ejecutivo",
  ],
  openGraph: {
    title: "HHM Proyectos | Plomería y Electricidad para Construcción",
    description:
      "Todo lo que corre por dentro de tu obra: agua, drenaje, gas, energía y datos.",
    type: "website",
    locale: "es_MX",
    siteName: site.name,
    url: "/",
  },
};

/*
 * Se ejecuta antes del primer pintado: activa las animaciones de aparición
 * solo si hay JavaScript y el usuario no pidió "reducir movimiento".
 * Sin este atributo todo el contenido se muestra de inmediato.
 */
const motionScript = `(function(){try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.setAttribute('data-motion','')}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body
        className={`${inter.variable} flex min-h-screen flex-col bg-white font-sans text-ink antialiased`}
      >
        <LogoSprite />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
