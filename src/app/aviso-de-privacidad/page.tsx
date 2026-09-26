import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Aviso de privacidad",
  description: `Cómo ${site.name} usa y protege los datos que compartes en el formulario de cotización.`,
  path: "/aviso-de-privacidad",
});

/*
 * Texto base conforme a la ley mexicana de protección de datos personales en
 * posesión de particulares. TODO (HHM): completar razón social y domicilio en
 * src/lib/site.ts y pedir una revisión legal antes de publicar.
 */
const UPDATED = "24 de septiembre de 2026";

const sections: { title: string; body: ReactNode }[] = [
  {
    title: "Quién es responsable de tus datos",
    body: (
      <p>
        {site.legalName}
        {site.address ? `, con domicilio en ${site.address},` : ""} es responsable del uso y
        protección de los datos personales que nos compartes. Para cualquier tema relacionado
        con este aviso escríbenos a{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> o al {site.phoneDisplay}.
      </p>
    ),
  },
  {
    title: "Qué datos recabamos",
    body: (
      <>
        <p>Cuando solicitas una cotización en este sitio podemos recabar:</p>
        <ul>
          <li>Datos de contacto: nombre, despacho o empresa, correo electrónico y WhatsApp.</li>
          <li>Datos del proyecto: tipo de obra, instalaciones, superficie aproximada y etapa.</li>
          <li>Los planos, archivos o enlaces que decidas compartirnos.</li>
        </ul>
        <p>No te pedimos datos personales sensibles.</p>
      </>
    ),
  },
  {
    title: "Para qué los usamos",
    body: (
      <>
        <p>Usamos tus datos únicamente para:</p>
        <ul>
          <li>Atender tu solicitud y preparar una cotización.</li>
          <li>Contactarte por correo, WhatsApp o teléfono sobre esa solicitud.</li>
          <li>Dar seguimiento y, si nos contratas, ejecutar y administrar el servicio.</li>
        </ul>
        <p>No usamos tus datos para publicidad ni para fines distintos a los anteriores.</p>
      </>
    ),
  },
  {
    title: "Con quién los compartimos",
    body: (
      <p>
        No vendemos ni rentamos tus datos. Solo los tratan, por cuenta nuestra, los proveedores
        que nos dan servicios de correo y hospedaje del sitio, y las autoridades que lo requieran
        conforme a la ley.
      </p>
    ),
  },
  {
    title: "Tus derechos (ARCO) y cómo ejercerlos",
    body: (
      <>
        <p>
          Puedes acceder a tus datos, rectificarlos, cancelarlos u oponerte a su uso, así como
          revocar tu consentimiento. Para hacerlo, envía un correo a{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> con:
        </p>
        <ul>
          <li>Tu nombre y un medio para responderte.</li>
          <li>Un documento que acredite tu identidad (o la de tu representante).</li>
          <li>Qué derecho quieres ejercer y sobre qué datos.</li>
        </ul>
        <p>Te responderemos dentro de los plazos que establece la ley.</p>
      </>
    ),
  },
  {
    title: "Cookies y medición",
    body: (
      <p>
        Este sitio no usa cookies de publicidad. Si incorporamos herramientas de medición de
        visitas, lo indicaremos en este aviso.
      </p>
    ),
  },
  {
    title: "Cambios a este aviso",
    body: (
      <p>
        Cualquier cambio a este aviso se publicará en esta misma página. Última actualización:{" "}
        {UPDATED}.
      </p>
    ),
  },
];

export default function AvisoDePrivacidad() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Aviso de privacidad"
        lead="Qué datos recabamos cuando nos pides una cotización, para qué los usamos y cómo puedes ejercer tus derechos."
      />
      <section className="px-5 pb-14 md:px-8 md:pb-[104px]">
        <div className="mx-auto max-w-7xl">
          <div className="flex max-w-[760px] flex-col border-t border-ink">
            {sections.map((s, i) => (
              <div
                key={s.title}
                className="flex flex-col gap-3 border-b border-gray-300 py-7 text-[17px] leading-relaxed text-gray-700 [&_a]:font-semibold [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
              >
                <h2 className="flex items-baseline gap-4 text-[clamp(20px,2vw,24px)] font-bold tracking-[-0.02em] text-ink">
                  <span className="font-mono text-sm font-semibold text-navy-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                {s.body}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
