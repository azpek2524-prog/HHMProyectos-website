import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import MediaSlot from "@/components/ui/MediaSlot";
import Eyebrow from "@/components/ui/Eyebrow";
import ArrowLink from "@/components/ui/ArrowLink";
import AboutHero from "@/components/about/AboutHero";
import PresenceMap from "@/components/about/PresenceMap";
import { credentials, principles, team } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nosotros",
  description:
    "HHM Proyectos nació del oficio: 15+ años, 280+ obras y un equipo propio de 40+ personas en electricidad y plomería. No jugamos con el patrimonio de nuestros clientes.",
  path: "/nosotros",
});

export default function Nosotros() {
  return (
    <>
      <AboutHero />

      {/* Historia */}
      <section className="px-5 pt-14 md:px-8 md:pt-[120px]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3 lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <Eyebrow>Nuestra historia</Eyebrow>
            <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
              Nacimos del oficio.
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-5 text-[clamp(17px,1.5vw,19px)] leading-[1.65] text-gray-700 text-pretty lg:col-span-2">
            {/* Hilo: origen (el problema) → filosofía → capacidad y alcance → caso como prueba. */}
            <p>
              Nuestro fundador, Héctor Hugo Martínez, empezó a trabajar en
              instalaciones a los 17 años, junto a su padre. En cada obra veía el
              mismo problema: clientes sin un trato correcto, sin respuestas
              claras, pagando por una calidad que no recibían.
            </p>
            <p>
              Con esa experiencia fundó HHM bajo una regla que seguimos hasta hoy:
              nadie debería arriesgar su patrimonio por una instalación mal hecha.
              Por eso no tomamos atajos que pongan en riesgo tu instalación,
              aunque nos lo pidan. Para ti, eso significa instalaciones hechas
              conforme a norma, pensadas para funcionar durante años, no solo el
              día de la entrega.
            </p>
            <p>
              Hoy somos más de 40 personas, entre ingenieros y cuadrillas propias, con
              20 obras en paralelo. Entre los proyectos que hemos realizado se
              encuentran agencias automotrices de siete marcas, autolavados,
              residencias, oficinas corporativas y parques industriales. Desde
              nuestra base en Monterrey también hemos trabajado en Saltillo y
              Mazatlán. Cotizamos obras en todo México, incluso fuera del país.
            </p>
            <p>
              Esa capacidad se puso a prueba en un parque industrial para una
              línea de tráileres, con naves, talleres y dormitorios. El
              contratista eléctrico a cargo no pudo con la obra; entramos con todo
              nuestro equipo para sacarla adelante. Al terminar, el cliente nos
              encargó su siguiente parque. Por resultados así, hasta hoy nuestros
              proyectos llegan por recomendación de arquitectos. Muchos de sus
              clientes nos llaman después para sus propias obras.
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-14 max-w-7xl md:mt-20">
          <PresenceMap />
        </div>
      </section>

      {/* Principios */}
      <section className="px-5 py-14 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8">
            <Eyebrow as="h2">Cómo trabajamos</Eyebrow>
          </Reveal>
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 100}>
              <div className="group relative grid gap-x-10 gap-y-3 border-t border-ink py-6 md:grid-cols-2 md:py-9">
                {/* Línea que se dibuja sobre el borde al pasar el cursor */}
                <span className="pointer-events-none absolute inset-x-0 -top-px h-[3px] origin-left scale-x-0 bg-navy transition-transform duration-700 ease-smooth group-hover:scale-x-100" />
                <div className="flex items-baseline gap-5">
                  <span className="font-mono text-sm font-semibold text-navy-600">{p.n}</span>
                  <h3 className="text-[clamp(26px,3.2vw,42px)] font-extrabold leading-[1.05] tracking-[-0.035em] transition-transform duration-500 ease-smooth group-hover:translate-x-2">
                    {p.title}
                  </h3>
                </div>
                <p className="max-w-[520px] pt-1.5 text-[17px] leading-relaxed text-gray-600">{p.text}</p>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-ink" />
        </div>
      </section>

      {/* Respaldo: certificaciones */}
      <section className="bg-night px-5 py-14 text-white md:px-8 md:py-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-12">
          <Reveal as="h2" className="max-w-[760px] text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
            Respaldo para trabajar sin riesgos.
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {credentials.map((c, i) => (
              <Reveal key={c.title} delay={i * 100} className="flex flex-col gap-3 border-t border-gray-700 pt-5">
                <span className="font-mono text-xs font-semibold uppercase text-navy-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold tracking-[-0.02em]">{c.title}</h3>
                <p className="leading-[1.55] text-gray-300">{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo: retratos en blanco y negro que toman color al pasar el cursor (solo con datos reales) */}
      {team.length > 0 && (
        <section className="bg-night px-5 py-14 text-white md:px-8 md:py-[104px]">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            <Reveal as="h2" className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
              Las personas detrás.
            </Reveal>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {team.map((t, i) => (
                <Reveal key={t.role} delay={i * 100}>
                  <div className="group flex flex-col gap-3">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <div className="absolute inset-0 grayscale transition-[filter,scale] duration-700 ease-smooth group-hover:scale-[1.04] group-hover:grayscale-0">
                        <MediaSlot label="Retrato" src={t.image} alt={`${t.name}, ${t.role}`} sizes="(min-width: 1024px) 25vw, 50vw" />
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-between gap-x-3 text-[15px]">
                      <span className="font-semibold">{t.name}</span>
                      <span className="text-gray-400">{t.role}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-5 py-14 md:px-8 md:py-[104px]">
        <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[760px] text-[clamp(30px,4.4vw,60px)] font-extrabold leading-none tracking-[-0.045em]">
            ¿Tienes un proyecto en puerta? Platiquemos desde el anteproyecto.
          </h2>
          <div className="flex flex-wrap gap-3">
            <ArrowLink href="/cotizar">Cotizar mi proyecto</ArrowLink>
            <ArrowLink href="/obras" variant="ink">
              Ver obras
            </ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
