import Link from "next/link";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { whatsappUrl } from "@/lib/site";

/* ---------------------------------------------------------------------------
   NOTA: Los textos, cifras y bloques marcados como "placeholder" están para
   que reacciones al diseño. Reemplázalos con el contenido real de HHM:
   fotos de obra, cifras verdaderas, testimonios y descripción de servicios.
   --------------------------------------------------------------------------- */

const stats = [
  { value: "+12", label: "años de experiencia" },
  { value: "+250", label: "obras entregadas" },
  { value: "98%", label: "entregas en tiempo" },
  { value: "100%", label: "materiales certificados" },
];

const services = [
  {
    title: "Plomería",
    description:
      "Diseño e instalación de redes hidráulicas, sanitarias y de gas para obra nueva y remodelación, con acabados y pruebas de estanqueidad.",
    icon: (
      <path d="M6 3v6a6 6 0 006 6v0a6 6 0 006-6V3M6 21h12M9 21v-3m6 3v-3" />
    ),
  },
  {
    title: "Electricidad",
    description:
      "Instalaciones eléctricas seguras conforme a normativa: tableros, canalizaciones, iluminación y sistemas de baja y media tensión.",
    icon: <path d="M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z" />,
  },
  {
    title: "Diseño y cálculo",
    description:
      "Planos, memorias de cálculo y coordinación con tu proyecto arquitectónico para evitar retrabajos y cumplir tiempos de obra.",
    icon: (
      <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-4M9 3l6 6M9 3v6h6m4-6l2 2-9 9-3 1 1-3 9-9z" />
    ),
  },
];

const differentiators = [
  {
    eyebrow: "Un solo proveedor",
    title: "Plomería y electricidad, sin coordinar dos cuadrillas",
    body: "Centralizas ambas instalaciones con un mismo responsable. Menos juntas, menos huecos entre oficios y una sola persona que rinde cuentas por el avance.",
    bullets: [
      "Un punto de contacto para toda la instalación",
      "Cronograma unificado con tu obra",
      "Responsabilidad clara de principio a fin",
    ],
  },
  {
    eyebrow: "Cumplimiento",
    title: "Tiempos y normativas que tu proyecto exige",
    body: "Trabajamos con la disciplina que piden arquitectos y constructoras: entregas medibles, apego a normativa y documentación lista para supervisión.",
    bullets: [
      "Apego a normas de instalación vigentes",
      "Reportes de avance para tu supervisión",
      "Pruebas y entrega documentada",
    ],
  },
];

const process = [
  {
    step: "01",
    title: "Cotización",
    body: "Nos cuentas tu proyecto y te entregamos una propuesta clara y desglosada.",
  },
  {
    step: "02",
    title: "Diseño y cálculo",
    body: "Planos y memorias coordinados con tu proyecto arquitectónico.",
  },
  {
    step: "03",
    title: "Instalación",
    body: "Ejecutamos en obra con cuadrilla especializada y avances reportados.",
  },
  {
    step: "04",
    title: "Pruebas y entrega",
    body: "Verificamos, documentamos y entregamos la instalación funcionando.",
  },
];

const projects = [
  { name: "Torre residencial", tag: "Plomería + Electricidad" },
  { name: "Nave industrial", tag: "Instalación eléctrica" },
  { name: "Desarrollo comercial", tag: "Redes hidrosanitarias" },
];

const testimonials = [
  {
    quote:
      "Cumplieron el cronograma sin excusas y la coordinación con el resto de la obra fue impecable.",
    author: "Arq. [Nombre]",
    role: "Despacho de arquitectura",
  },
  {
    quote:
      "Tener plomería y electricidad con un solo proveedor nos ahorró tiempo y problemas de coordinación.",
    author: "[Nombre]",
    role: "Constructora",
  },
];

export default function Home() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div className="bg-blueprint absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-accent-500/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
              Plomería &amp; Electricidad · Sector construcción
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Instalaciones que tu obra{" "}
              <span className="text-accent-400">entrega a tiempo</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              El aliado en el que confían arquitectos y constructoras para
              diseñar e instalar plomería y electricidad de forma rápida,
              eficiente y segura.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#cotizacion"
                className="inline-flex items-center justify-center rounded-lg bg-accent-500 px-8 py-4 text-base font-semibold text-brand-950 shadow-lg shadow-accent-500/25 transition hover:bg-accent-400"
              >
                Solicitar cotización
              </Link>
              <Link
                href="/proyectos"
                className="inline-flex items-center justify-center rounded-lg border border-white/25 px-8 py-4 text-base font-semibold text-white transition hover:bg-white hover:text-brand-950"
              >
                Ver proyectos
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate-400">
              Confían en nosotros arquitectos y constructoras en {""}
              proyectos residenciales, industriales y comerciales.
            </p>
          </div>

          {/* Placeholder de imagen del hero — reemplazar con foto de obra */}
          <Reveal className="relative hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-brand-900 to-brand-950 shadow-2xl">
              <div className="bg-blueprint absolute inset-0 opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400">
                <svg
                  className="h-12 w-12 text-accent-400/70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
                <span className="mt-3 text-sm font-medium">
                  Foto de obra destacada
                </span>
                <span className="text-xs text-slate-500">(placeholder)</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80} className="text-center">
              <div className="font-display text-4xl font-bold text-brand-900">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SERVICIOS ================= */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              Servicios
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Todo lo que tu instalación necesita
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Cubrimos el ciclo completo: del cálculo en plano a la instalación
              probada en obra.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {services.map((service, i) => (
              <Reveal
                key={service.title}
                delay={i * 100}
                className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-900 text-accent-400 transition group-hover:bg-brand-950">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </svg>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DIFERENCIADORES ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 lg:px-8">
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className="grid items-center gap-12 lg:grid-cols-2"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                  {item.eyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  {item.body}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 text-accent-400">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3 w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-slate-700">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Placeholder de imagen — reemplazar con foto real */}
              <Reveal
                delay={120}
                className={i % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-slate-400">
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="mt-3 text-sm font-medium">
                      Foto de obra / equipo
                    </span>
                    <span className="text-xs text-slate-400">(placeholder)</span>
                  </div>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROCESO ================= */}
      <section className="bg-brand-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">
              Cómo trabajamos
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              Un proceso claro, de la propuesta a la entrega
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, i) => (
              <Reveal
                key={item.step}
                delay={i * 90}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-7"
              >
                <span className="font-display text-4xl font-bold text-accent-400/80">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROYECTOS ================= */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent-600">
                Portafolio
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                Obras que hablan por nosotros
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Una muestra de proyectos donde ejecutamos instalaciones de
                principio a fin.
              </p>
            </div>
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 font-semibold text-brand-700 transition hover:text-brand-900"
            >
              Ver todo el portafolio
              <span aria-hidden="true">→</span>
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {projects.map((project, i) => (
              <Reveal
                key={project.name}
                delay={i * 100}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                {/* Placeholder de imagen — reemplazar con foto/video de obra */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-brand-900 to-brand-950">
                  <div className="bg-blueprint absolute inset-0 opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <span className="text-sm font-medium">Foto de obra</span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-600">
                    {project.tag}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-slate-900">
                    {project.name}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIOS ================= */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-600">
              Testimonios
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
              Lo que dicen quienes ya trabajaron con nosotros
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal
                key={t.author}
                delay={i * 100}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-8"
              >
                <svg
                  className="h-8 w-8 text-accent-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  {t.quote}
                </p>
                <div className="mt-6">
                  <p className="font-semibold text-slate-900">{t.author}</p>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-slate-400">
            (Testimonios de ejemplo — reemplazar con reseñas reales de clientes.)
          </p>
        </div>
      </section>

      {/* ================= CTA + FORMULARIO ================= */}
      <section
        id="cotizacion"
        className="scroll-mt-24 bg-brand-950 py-24 text-white"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-accent-400">
              Solicita tu cotización
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Cuéntanos tu proyecto y te respondemos el mismo día
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Déjanos los datos de tu obra y un especialista te contactará con
              una propuesta clara. ¿Prefieres algo más directo? Escríbenos por
              WhatsApp.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-brand-950"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207z" />
              </svg>
              Escríbenos por WhatsApp
            </a>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl bg-white p-6 sm:p-8">
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
