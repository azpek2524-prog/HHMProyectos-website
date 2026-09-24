import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * Imagen general de vista previa (src/app/opengraph-image.jpg, 1200×630;
 * JPEG ligero para que WhatsApp la muestre). Hay que repetirla aquí: una
 * página que define su propio `openGraph` reemplaza el del layout completo,
 * imagen incluida.
 */
const defaultImages = [
  { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.name} · Plomería y electricidad para arquitectos y constructoras` },
];

/**
 * Metadatos de una página: título, descripción, URL canónica y vista previa
 * para redes (WhatsApp, LinkedIn…). `images` sustituye la imagen general.
 */
export function pageMetadata({
  title,
  description,
  path,
  images,
}: {
  /** Sin el sufijo "| HHM Proyectos" (lo agrega la plantilla del layout). */
  title?: string;
  description: string;
  path: string;
  images?: { url: string; width: number; height: number; alt?: string }[];
}): Metadata {
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: site.name,
      url: path,
      title: title ? `${title} | ${site.name}` : undefined,
      description,
      images: images ?? defaultImages,
    },
  };
}
