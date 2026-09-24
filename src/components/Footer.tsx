import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { site, whatsappUrl } from "@/lib/site";

const siteLinks = [
  { href: "/empresa", label: "Empresa" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Portafolio" },
  { href: "/contacto", label: "Contacto" },
];

const linkClass = "w-fit transition-colors duration-300 hover:text-white";

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-7 pt-12 md:px-8 md:pt-[72px]">
        <div className="grid gap-10 border-b border-gray-800 pb-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Logo variant="horizontal" title="HHM Proyectos" className="h-11 w-auto self-start text-white" />
            <p className="max-w-[260px] text-sm leading-relaxed">
              Especialistas en plomería y electricidad para el sector
              construcción.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
              Sitio
            </h2>
            {siteLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-white">
              Contacto
            </h2>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              WhatsApp · {site.phoneDisplay}
            </a>
            <a href={`mailto:${site.email}`} className={linkClass}>
              {site.email}
            </a>
            <Link
              href="/contacto"
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
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 pt-6 text-[13px] text-gray-400">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos
            reservados.
          </p>
          <p>Plomería · Electricidad · Proyecto ejecutivo</p>
        </div>
      </div>
    </footer>
  );
}
