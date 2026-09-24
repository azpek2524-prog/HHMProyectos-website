import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export type Crumb = { name: string; href: string };

/**
 * Migas de pan: reflejan la URL (Inicio / Servicios / Plomería). El último
 * elemento es la página actual y no es enlace. Incluye su BreadcrumbList
 * para buscadores.
 */
export default function Breadcrumbs({
  items,
  tone = "light",
  className = "",
}: {
  items: Crumb[];
  /** "dark" sobre fotos o fondos oscuros. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <>
      <nav
        aria-label="Ruta de navegación"
        className={`font-mono text-[13px] font-semibold uppercase tracking-[0.06em] ${
          dark ? "text-gray-300" : "text-gray-500"
        } ${className}`}
      >
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.href}
                      className={`transition-colors duration-300 ${dark ? "hover:text-white" : "hover:text-ink"}`}
                    >
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="opacity-50">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}
