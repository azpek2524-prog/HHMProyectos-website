import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import type { Testimonial } from "@/lib/data";

/** "Arq. Ana López" → "AL" (se ignoran títulos como Arq., Ing., Lic.). */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^\p{L}/u.test(w) && !/^(arq|ing|lic|dr|dra|sr|sra)\.?$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

/* Retícula de plano en la tarjeta destacada (el mismo motivo del hero). */
const blueprint = {
  backgroundImage:
    "linear-gradient(to right, rgba(190,219,255,.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(190,219,255,.07) 1px, transparent 1px)",
  backgroundSize: "32px 32px",
};

/* Ancho en escritorio de las tarjetas de la última fila, según cuántas haya. */
const lastRowSpan: Record<number, string> = {
  1: "lg:col-span-12",
  2: "lg:col-span-6",
  3: "lg:col-span-4",
};

/**
 * Testimonios de la Home como cuadrícula asimétrica, sin carrusel: todo se
 * lee de un vistazo. Escritorio (12 columnas):
 *   [ título · 5 ] [ destacado · 7, dos filas ]
 *   [ cita · 5   ] [                          ]
 *   [ resto de citas repartidas en la última fila ]
 * Tablet en 2 columnas y celular en una. Las líneas entre tarjetas son el
 * fondo de la cuadrícula asomando por `gap-px`, como en un plano.
 * `draft` marca cada tarjeta como borrador (vistas previas, nunca producción).
 */
export default function TestimonialWall({
  testimonials,
  draft = false,
}: {
  testimonials: Testimonial[];
  draft?: boolean;
}) {
  const [featured, second, ...rest] = testimonials;
  // En tablet, las citas después de la destacada van de dos en dos; si quedan
  // impares, la última ocupa el ancho completo para no dejar un hueco.
  const pairs = (second ? 1 : 0) + rest.length;

  return (
    // Aparece completa de una vez: si cada tarjeta entrara por separado, el
    // fondo de las líneas se vería como bloques grises mientras tanto.
    <Reveal className="mx-auto grid max-w-7xl gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-12">
      <div className="flex flex-col justify-between gap-10 bg-night p-7 md:col-span-2 md:p-10 lg:col-span-5">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="light">Testimonios</Eyebrow>
          <h2 className="text-[clamp(30px,3.6vw,48px)] font-extrabold leading-[1.02] tracking-[-0.04em] text-balance">
            Lo que dicen quienes ya construyeron con nosotros.
          </h2>
          <p className="max-w-[420px] leading-[1.6] text-gray-300">
            Despachos de arquitectura, marcas y desarrolladores que nos confiaron
            la electricidad y plomería de sus obras.
          </p>
        </div>
        <Link
          href="/obras"
          className="group inline-flex w-fit items-center gap-3 font-semibold underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
        >
          Ver obras entregadas
          <span aria-hidden="true" className="transition-transform duration-300 ease-smooth group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </div>

      {featured && (
        <div
          style={blueprint}
          className={`bg-navy p-7 md:col-span-2 md:p-10 lg:col-span-7 lg:p-12 ${second ? "lg:row-span-2" : ""}`}
        >
          <Quote t={featured} draft={draft} featured />
        </div>
      )}

      {second && (
        <div
          className={`bg-night p-7 md:p-9 lg:col-span-5 ${pairs === 1 ? "md:col-span-2" : ""}`}
        >
          <Quote t={second} draft={draft} />
        </div>
      )}

      {rest.map((t, i) => (
        <div
          key={t.text}
          className={`bg-night p-7 md:p-9 ${lastRowSpan[rest.length] ?? "lg:col-span-4"} ${
            pairs % 2 === 1 && i === rest.length - 1 ? "md:col-span-2" : ""
          }`}
        >
          <Quote t={t} draft={draft} />
        </div>
      ))}
    </Reveal>
  );
}

function Quote({ t, draft, featured = false }: { t: Testimonial; draft: boolean; featured?: boolean }) {
  const label = (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-200">{t.tag}</span>
      {draft && (
        <span className="shrink-0 border border-white/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
          Borrador
        </span>
      )}
    </div>
  );
  const quote = (
    <blockquote>
      <p
        className={
          featured
            ? "text-[clamp(22px,2.6vw,36px)] font-semibold leading-[1.25] tracking-[-0.02em] text-pretty"
            : "text-[17px] leading-[1.6] text-white/90 text-pretty"
        }
      >
        “{t.text}”
      </p>
    </blockquote>
  );
  const caption = (
    <figcaption className="flex items-center gap-4 border-t border-white/15 pt-5">
      {t.image ? (
        <Image src={t.image} alt="" width={44} height={44} className="h-11 w-11 shrink-0 object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className={`grid h-11 w-11 shrink-0 place-items-center font-mono text-sm font-semibold ${
            featured ? "bg-white text-navy" : "bg-navy-600 text-white"
          }`}
        >
          {initials(t.who ?? t.company)}
        </span>
      )}
      <span className="flex min-w-0 flex-col">
        <span className="font-semibold">{t.who ?? "Nombre por confirmar"}</span>
        <span className="text-sm leading-snug text-navy-100/70">
          {t.role} · {t.company}
        </span>
      </span>
    </figcaption>
  );

  // Destacada: etiqueta arriba; cita y firma abajo, como el cuadro de datos
  // de un plano. Las demás: etiqueta y cita arriba, firma abajo.
  return featured ? (
    <figure className="flex h-full flex-col justify-between gap-10">
      {label}
      <div className="flex flex-col gap-8">
        {quote}
        {caption}
      </div>
    </figure>
  ) : (
    <figure className="flex h-full flex-col justify-between gap-10">
      <div className="flex flex-col gap-5">
        {label}
        {quote}
      </div>
      {caption}
    </figure>
  );
}
