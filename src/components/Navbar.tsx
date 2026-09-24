"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import { categories } from "@/lib/data";

type NavLink = { href: string; label: string; children?: { href: string; label: string }[] };

const navLinks: NavLink[] = [
  {
    href: "/servicios",
    label: "Servicios",
    children: categories.map((c) => ({ href: `/servicios/${c.id}`, label: c.name })),
  },
  { href: "/obras", label: "Obras" },
  { href: "/quienes-somos", label: "Quiénes somos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={`sticky top-0 z-50 border-b bg-white transition-shadow duration-300 ${
        scrolled || open
          ? "border-gray-200 shadow-[0_6px_24px_-12px_rgba(16,24,40,0.18)]"
          : "border-gray-200"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[84px] md:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="HHM Proyectos · Inicio"
          className="shrink-0 text-ink"
        >
          <Logo variant="horizontal" className="h-9 w-auto md:h-12" />
        </Link>

        {/* Escritorio */}
        <div className="hidden items-center gap-9 text-[15px] font-medium md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const item = (
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`relative flex items-center gap-2 py-1 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-navy after:transition-transform after:duration-300 after:ease-smooth hover:text-navy hover:after:scale-x-100 ${
                  active ? "text-navy" : "text-gray-600"
                }`}
              >
                {active && <span className="h-1.5 w-1.5 bg-navy" />}
                {link.label}
                {link.children && (
                  <span aria-hidden="true" className="text-[10px] transition-transform duration-300 group-hover:rotate-180">
                    ▾
                  </span>
                )}
              </Link>
            );
            if (!link.children) return <div key={link.href}>{item}</div>;
            // Desplegable: se abre al pasar el cursor o al llegar con el teclado
            // (:focus-visible, para que no se quede abierto tras un clic).
            return (
              <div key={link.href} className="group relative">
                {item}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-5 opacity-0 transition-[opacity,visibility] duration-300 group-hover:visible group-hover:opacity-100 group-has-[:focus-visible]:visible group-has-[:focus-visible]:opacity-100">
                  <ul className="w-64 border border-gray-200 bg-white py-2 shadow-[0_16px_40px_-16px_rgba(16,24,40,0.28)]">
                    {link.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          aria-current={pathname === c.href ? "page" : undefined}
                          className={`group/item flex items-center justify-between px-5 py-3 transition-colors duration-300 hover:bg-gray-50 hover:text-navy ${
                            pathname === c.href ? "text-navy" : "text-gray-700"
                          }`}
                        >
                          {c.label}
                          <span
                            aria-hidden="true"
                            className="text-gray-400 transition-transform duration-300 ease-smooth group-hover/item:translate-x-1 group-hover/item:text-navy"
                          >
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <Link
            href="/cotizar"
            className="group flex items-center gap-2.5 bg-navy px-5 py-[11px] font-semibold text-white transition-colors duration-300 hover:bg-navy-600"
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

        {/* Móvil */}
        <div className="flex items-center gap-2.5 md:hidden">
          <Link
            href="/cotizar"
            onClick={() => setOpen(false)}
            className="bg-navy px-3.5 py-2 text-sm font-semibold text-white"
          >
            Cotizar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="relative flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`absolute h-0.5 w-[22px] bg-ink transition-transform duration-300 ease-smooth ${
                open ? "rotate-45" : "-translate-y-[3.5px]"
              }`}
            />
            <span
              className={`absolute h-0.5 w-[22px] bg-ink transition-transform duration-300 ease-smooth ${
                open ? "-rotate-45" : "translate-y-[3.5px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menú móvil: se despliega con altura animada */}
      <div
        id="menu-movil"
        className={`grid transition-[grid-template-rows] duration-500 ease-smooth md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-gray-200 px-5 pb-6 pt-2">
            {navLinks.map((link, i) => (
              <div
                key={link.href}
                className={`border-b border-gray-200 transition-[opacity,transform] duration-500 ease-smooth ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-center justify-between py-4 text-2xl font-bold tracking-tight ${
                    isActive(link.href) ? "text-navy" : "text-ink"
                  }`}
                >
                  {link.label}
                  <span aria-hidden="true" className="text-gray-400">
                    →
                  </span>
                </Link>
                {link.children && (
                  <div className="grid grid-cols-2 gap-x-4 pb-4">
                    {link.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setOpen(false)}
                        tabIndex={open ? 0 : -1}
                        className={`py-2 text-base font-semibold ${
                          pathname === c.href ? "text-navy" : "text-gray-600"
                        }`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
