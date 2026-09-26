import type { MetadataRoute } from "next";
import { categories, projects } from "@/lib/data";
import { site } from "@/lib/site";

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/servicios", ...categories.map((c) => `/servicios/${c.id}`), "/obras", "/nosotros", "/cotizar", "/aviso-de-privacidad"];
  return [
    ...pages.map((path) => ({ url: abs(path) })),
    // Las obras incluyen sus fotos para que aparezcan en Google Imágenes.
    ...projects.map((p) => ({
      url: abs(`/obras/${p.slug}`),
      images: [...new Set([p.cover.src, ...p.gallery.flatMap((g) => g.photos.map((ph) => ph.src))])].map(abs),
    })),
  ];
}
