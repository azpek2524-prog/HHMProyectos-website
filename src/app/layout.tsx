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
    default: "HHM Proyectos | Electricidad y plomería para construcción en Monterrey",
    template: "%s | HHM Proyectos",
  },
  description:
    "Contratista de electricidad y plomería en Monterrey: 15 años y más de 280 obras para agencias automotrices, residencias, comercios e industria. Del cálculo a la entrega, con equipo propio.",
  keywords: [
    "contratista eléctrico Monterrey",
    "instalaciones eléctricas Monterrey",
    "plomería",
    "electricidad",
    "instalaciones hidrosanitarias",
    "instalaciones eléctricas",
    "arquitectos",
    "constructoras",
    "proyecto ejecutivo",
  ],
  openGraph: {
    title: "HHM Proyectos | Electricidad y plomería para construcción en Monterrey",
    description:
      "Electricidad y plomería que cuidan tu patrimonio. 15 años y más de 280 obras.",
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
