import JsonLd from "@/components/seo/JsonLd";
import { faqs } from "@/lib/data";

/**
 * Preguntas frecuentes: título arriba y acordeón debajo (el contenedor define
 * el ancho y el fondo). Usa <details>: funciona sin JavaScript y las
 * respuestas quedan en el HTML (buscadores y asistentes de IA las leen).
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
    <div className="flex flex-col gap-6 md:gap-8">
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
      <h2 className="text-[clamp(28px,3.2vw,44px)] font-extrabold leading-none tracking-[-0.04em]">
        {title}
      </h2>
      <div className="border-t border-ink">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-gray-300">
            <summary className="flex cursor-pointer list-none items-center gap-5 py-5 text-left [&::-webkit-details-marker]:hidden">
              <span className="flex-1 text-[clamp(16px,1.4vw,18px)] font-bold tracking-[-0.01em] transition-colors duration-300 group-hover:text-navy group-open:text-navy">
                {f.q}
              </span>
              <span aria-hidden="true" className="relative h-5 w-5 shrink-0">
                <span className="absolute left-1/2 top-1/2 h-0.5 w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-3.5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ease-smooth group-open:rotate-90" />
              </span>
            </summary>
            <p className="pb-5 pr-10 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
