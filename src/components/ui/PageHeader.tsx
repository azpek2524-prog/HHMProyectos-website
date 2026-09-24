import type { ReactNode } from "react";

/**
 * Encabezado editorial de páginas internas: etiqueta mono, título grande y
 * entrada. La entrada escalonada es solo CSS (no espera a JavaScript) porque
 * siempre está arriba del pliegue.
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <section className="px-5 pb-8 pt-12 md:px-8 md:pb-14 md:pt-[104px]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
        <p className="animate-rise font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
          {eyebrow}
        </p>
        <h1 className="max-w-[1180px] animate-rise text-[clamp(38px,6.4vw,92px)] font-extrabold leading-[0.96] tracking-[-0.045em] text-balance [animation-delay:80ms]">
          {title}
        </h1>
        {lead && (
          <p className="max-w-[600px] animate-rise text-[clamp(16px,1.5vw,19px)] leading-[1.6] text-gray-600 [animation-delay:160ms]">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
