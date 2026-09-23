import Link from "next/link";
import { site, whatsappUrl } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Marca */}
          <div className="md:col-span-1">
            <span className="font-display text-lg font-bold text-white">
              HHM Proyectos
            </span>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Especialistas en plomería y electricidad para arquitectos y
              constructoras. Diseño, cálculo e instalación con estándares de
              calidad.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Servicios
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/servicios" className="transition hover:text-accent-400">
                  Plomería
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="transition hover:text-accent-400">
                  Electricidad
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="transition hover:text-accent-400">
                  Diseño y cálculo
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="transition hover:text-accent-400">
                  Portafolio de obras
                </Link>
              </li>
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Empresa
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-accent-400">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="transition hover:text-accent-400">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="transition hover:text-accent-400">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-accent-400"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition hover:text-accent-400"
                >
                  {site.email}
                </a>
              </li>
              <li className="text-slate-400">{site.phoneDisplay}</li>
              <li className="text-slate-400">{site.city}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>
            &copy; {year} {site.name}. Todos los derechos reservados.
          </p>
          <p>Plomería y electricidad para el sector construcción.</p>
        </div>
      </div>
    </footer>
  );
}
