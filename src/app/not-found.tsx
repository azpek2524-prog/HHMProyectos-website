import ArrowLink from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <p className="animate-rise font-mono text-[13px] font-semibold uppercase tracking-[0.06em] text-gray-500">
          Error 404
        </p>
        <h1 className="max-w-[900px] animate-rise text-[clamp(38px,6.4vw,92px)] font-extrabold leading-[0.96] tracking-[-0.045em] text-balance [animation-delay:80ms]">
          Esta página no está en los planos.
        </h1>
        <div className="flex animate-rise flex-wrap gap-3 [animation-delay:160ms]">
          <ArrowLink href="/">Volver al inicio</ArrowLink>
          <ArrowLink href="/proyectos" variant="ink">
            Ver obras
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
