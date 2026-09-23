"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Portafolio" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-brand-950/90 text-white backdrop-blur supports-[backdrop-filter]:bg-brand-950/75">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="HHM Proyectos"
              width={48}
              height={48}
              className="h-12 w-12 rounded-md bg-white object-contain p-1"
            />
            <span className="font-display text-lg font-bold tracking-tight">
              HHM Proyectos
            </span>
          </Link>

          {/* Navegación de escritorio */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200 transition hover:text-accent-400"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-brand-950 shadow-sm transition hover:bg-accent-400"
            >
              Solicitar cotización
            </Link>
          </div>

          {/* Botón menú móvil */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-200 transition hover:bg-white/10 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="border-t border-white/10 bg-brand-950 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-lg bg-accent-500 px-3 py-2.5 text-center text-base font-semibold text-brand-950"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
