import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import PageHeader from "@/components/ui/PageHeader";
import MediaSlot from "@/components/ui/MediaSlot";
import ArrowLink from "@/components/ui/ArrowLink";
import StatsCounter from "@/components/home/StatsCounter";
import { credentials, principles, stats, team } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Quiénes somos",
  description:
    "HHM Proyectos nació del oficio: 15 años, más de 280 obras y un equipo propio de 40 personas en electricidad y plomería. No jugamos con el patrimonio de nuestros clientes.",
  path: "/quienes-somos",
});

export default function QuienesSomos() {
  return (
    <>
      <PageHeader
        eyebrow="Quiénes somos"
        title={
          <>
            No jugamos con el patrimonio{" "}
            <span className="text-gray-400">de nuestros clientes.</span>
          </>
        }
        lead={`Somos un contratista de electricidad y plomería con 15 años en obra, más de 280 proyectos entregados y un equipo propio de 40 personas en ${site.serviceArea}.`}
      />

      {/* Imágenes: se descubren como cortina al entrar en pantalla */}
      <section className="px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-3">
          <Reveal variant="clip" className="relative aspect-[16/10] overflow-hidden lg:col-span-2">
            <div className="absolute inset-0">
              <MediaSlot label="Equipo instalando en Torre Invex" src="/obras/torre-invex-oficinas/20.jpg" sizes="(min-width: 1024px) 66vw, 100vw" />
            </div>
          </Reveal>
          <Reveal variant="clip" delay={150} className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
            <div className="absolute inset-0">
              <MediaSlot label="Ductos y tuberías coordinados en losa" src="/obras/torre-invex-oficinas/13.jpg" sizes="(min-width: 1024px) 33vw, 100vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Historia */}
      <section className="px-5 pt-14 md:px-8 md:pt-[120px]">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3 lg:gap-16">
          <Reveal className="flex flex-col gap-4">
            <p className="font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
              Nuestra historia
            </p>
            <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
              Nacimos del oficio.
            </h2>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-5 text-[clamp(17px,1.5vw,19px)] leading-[1.65] text-gray-700 text-pretty lg:col-span-2">
            <p>
              Héctor Hugo Martínez, la H, H y M de HHM, empezó a trabajar en
              instalaciones a los 17 años, junto a su padre. En obra vio lo mismo
              una y otra vez: clientes que no recibían un trato correcto ni
              respuestas claras, y trabajos que no estaban a la altura de lo que
              pagaban.
            </p>
            <p>
              Fundó HHM con una idea simple: nadie debería arriesgar su
              patrimonio por una instalación mal hecha. Por eso no aceptamos
              atajos que pongan en riesgo la instalación, aunque nos lo pidan.
            </p>
            <p>
              Hoy somos 40 personas, entre ingenieros y cuadrillas propias.
              Trabajamos en agencias automotrices, autolavados, residencias,
              oficinas y parques industriales, en Monterrey y en proyectos en
              Saltillo y Mazatlán. Casi todos nuestros clientes llegan por
              recomendación de arquitectos, y muchos de sus clientes nos vuelven a
              llamar para sus propios proyectos.
            </p>
            <p>
              Cuando otro contratista eléctrico no pudo con un parque industrial,
              con naves, talleres y dormitorios para una línea de tráileres,
              entramos con todo el equipo y sacamos la obra adelante. Al terminar,
              el cliente nos encargó su siguiente parque.
            </p>
          </Reveal>
        </div>
        {stats.length > 0 && (
          <Reveal className="mt-14 md:mt-20">
            <StatsCounter />
          </Reveal>
        )}
      </section>

      {/* Principios */}
      <section className="px-5 py-14 md:px-8 md:py-[120px]">
        <div className="mx-auto max-w-7xl">
          <Reveal as="p" className="mb-8 font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
            Cómo trabajamos
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
          <ArrowLink href="/cotizar">Cotizar mi proyecto</ArrowLink>
        </Reveal>
      </section>
    </>
  );
}
