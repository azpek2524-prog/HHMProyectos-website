import type { ReactNode } from "react";
import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { categories } from "@/lib/data";
import { site, whatsappUrl } from "@/lib/site";

const siteLinks = [
  { href: "/obras", label: "Obras" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/cotizar", label: "Cotizar proyecto" },
];

const linkClass = "w-fit transition-colors duration-300 hover:text-white";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-7 pt-12 md:px-8 md:pt-[72px]">
        <div className="grid gap-10 border-b border-gray-800 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Logo variant="horizontal" title="HHM Proyectos" className="h-11 w-auto self-start text-white" />
            <p className="max-w-[260px] text-sm leading-relaxed">
              Electricidad y plomería para construcción. 15 años cuidando el
              patrimonio de nuestros clientes.
            </p>
          </div>

          <Column title="Servicios">
            {categories.map((c) => (
              <Link key={c.id} href={`/servicios/${c.id}`} className={linkClass}>
                {c.name}
              </Link>
            ))}
          </Column>

          <Column title="Sitio">
            {siteLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </Column>

          <Column title="Contacto">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              WhatsApp · {site.phoneDisplay}
            </a>
            <a href={`tel:${site.phoneE164}`} className={linkClass}>
              Llamar · {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <Link
              href="/cotizar"
              className="group mt-2 flex w-fit items-center gap-2 bg-white px-4 py-2.5 font-bold text-navy transition-colors duration-300 hover:bg-navy-100"
            >
              Solicitar cotización
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-smooth group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Column>
        </div>

        <div className="flex flex-wrap justify-between gap-3 pt-6 text-[13px] text-gray-400">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/aviso-de-privacidad" className="transition-colors duration-300 hover:text-white">
              Aviso de privacidad
            </Link>
            <p>Plomería · Electricidad · Proyecto ejecutivo</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
