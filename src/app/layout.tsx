import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hhmproyectos.com"),
  title: {
    default: "HHM Proyectos | Plomería y Electricidad para Construcción",
    template: "%s | HHM Proyectos",
  },
  description:
    "Diseño, cálculo e instalación de plomería y electricidad para arquitectos y constructoras. Cumplimos tiempos, normativas y estándares de calidad. Solicita tu cotización.",
  keywords: [
    "plomería",
    "electricidad",
    "instalaciones",
    "arquitectos",
    "constructoras",
    "obra",
    "construcción",
  ],
  icons: {
    icon: "/logo.jpeg",
  },
  openGraph: {
    title: "HHM Proyectos | Plomería y Electricidad para Construcción",
    description:
      "El aliado en instalaciones de plomería y electricidad para arquitectos y constructoras.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${sora.variable} font-sans antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
