import { unstable_cache } from "next/cache";
import { testimonials as fallback, type Testimonial } from "@/lib/data";

/**
 * Testimonios de la página de inicio, desde Notion
 * (página "Sitio web · HHM Proyectos" › base "Testimonios").
 *
 * Solo se muestran las filas con "Publicado" y "Autoriza publicar", en el
 * orden de la columna "Orden". El resultado se guarda 10 minutos: un
 * testimonio nuevo aparece en el sitio a más tardar 10 minutos después.
 *
 * Variables de entorno (ver .env.example):
 *   NOTION_TOKEN            Token de una integración interna de Notion con
 *                           acceso a la base.
 *   NOTION_TESTIMONIOS_ID   ID de la base (data source) de testimonios.
 *
 * Sin esas variables, o si Notion falla, se usan los de src/lib/data.ts.
 */

const NOTION_VERSION = "2025-09-03";

type RichText = { plain_text: string }[];
type NotionProperty = {
  title?: RichText;
  rich_text?: RichText;
  select?: { name: string } | null;
};
type NotionPage = { properties: Record<string, NotionProperty | undefined> };

const text = (p?: NotionProperty) =>
  (p?.title ?? p?.rich_text ?? []).map((t) => t.plain_text).join("").trim();

function toTestimonial(page: NotionPage): Testimonial {
  const props = page.properties;
  return {
    who: text(props["Nombre"]),
    role: [text(props["Cargo"]), text(props["Empresa"])].filter(Boolean).join(" · "),
    tag: props["Tipo de obra"]?.select?.name ?? "Cliente",
    text: text(props["Testimonio"]),
  };
}

async function fetchFromNotion(token: string, dataSourceId: string): Promise<Testimonial[]> {
  const res = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: {
        and: [
          { property: "Publicado", checkbox: { equals: true } },
          { property: "Autoriza publicar", checkbox: { equals: true } },
        ],
      },
      sorts: [{ property: "Orden", direction: "ascending" }],
      page_size: 50,
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Notion respondió ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { results: NotionPage[] };
  return data.results.map(toTestimonial).filter((t) => t.text && t.who);
}

export const getTestimonials = unstable_cache(
  async (): Promise<Testimonial[]> => {
    const token = process.env.NOTION_TOKEN;
    const dataSourceId = process.env.NOTION_TESTIMONIOS_ID;
    if (!token || !dataSourceId) return fallback;
    try {
      return await fetchFromNotion(token, dataSourceId);
    } catch (err) {
      console.error("[HHM] No se pudieron leer los testimonios de Notion:", err);
      return fallback;
    }
  },
  ["testimonios"],
  { revalidate: 600, tags: ["testimonios"] },
);
