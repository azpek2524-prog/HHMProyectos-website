import JsonLd from "@/components/seo/JsonLd";
import Reveal from "@/components/motion/Reveal";
import { faqs } from "@/lib/data";

/**
 * Preguntas frecuentes en acordeón. Usa <details>: funciona sin JavaScript
 * y las respuestas quedan en el HTML (buscadores y asistentes de IA las leen).
 * `structuredData` agrega el FAQPage de schema.org; úsalo en una sola página.
 */
export default function Faq({
  title = "Preguntas frecuentes",
  structuredData = false,
}: {
  title?: string;
  structuredData?: boolean;
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3 lg:gap-16">
      {structuredData && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
      <Reveal as="h2" className="text-[clamp(30px,4vw,52px)] font-extrabold leading-none tracking-[-0.04em]">
        {title}
      </Reveal>
      <Reveal delay={120} className="border-t border-ink lg:col-span-2">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-gray-300">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-[22px] text-left [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-[clamp(17px,1.7vw,21px)] font-bold tracking-[-0.015em] transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                {f.q}
              </span>
              <span aria-hidden="true" className="relative h-6 w-6 shrink-0">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 bg-ink" />
                <span className="absolute left-1/2 top-1/2 h-4 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-ink transition-transform duration-300 ease-smooth group-open:rotate-90" />
              </span>
            </summary>
            <p className="max-w-[640px] pb-6 pr-11 text-base leading-relaxed text-gray-600">{f.a}</p>
          </details>
        ))}
      </Reveal>
    </div>
  );
}
