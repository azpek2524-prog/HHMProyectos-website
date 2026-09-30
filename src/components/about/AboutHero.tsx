import Reveal from "@/components/motion/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import MediaSlot from "@/components/ui/MediaSlot";
import { aboutPhotos, type AboutPhoto } from "@/lib/data";

/**
 * Cabecera de /nosotros: titular con dos pesos (lo que somos en tinta, lo que
 * prometemos en azul), entrada con la primera frase destacada y un mosaico
 * de fotos: equipo al frente, fundador y una obra entregada a un lado.
 * Las fotos se configuran en `aboutPhotos` (src/lib/data.ts).
 */
export default function AboutHero() {
  return (
    <>
      <section className="px-5 pb-10 pt-12 md:px-8 md:pb-14 md:pt-[104px]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:gap-8">
          <Eyebrow className="animate-rise">Nosotros</Eyebrow>
          <h1 className="max-w-[1180px] animate-rise text-[clamp(38px,6.4vw,92px)] font-extrabold leading-[0.96] tracking-[-0.045em] text-balance [animation-delay:80ms]">
            15 años respondiendo
            <br />
            <span className="font-medium text-navy-600">por cada instalación.</span>
          </h1>
          <p className="max-w-[560px] animate-rise text-[clamp(17px,1.5vw,19px)] leading-[1.6] text-ink/65 [animation-delay:160ms] lg:ml-auto">
            <strong className="font-semibold text-ink">
              Somos un contratista de electricidad y plomería con base en Monterrey.
            </strong>{" "}
            Nuestro equipo propio de 40 personas ha entregado más de 280 obras,
            del cálculo a la puesta en marcha.
          </p>
        </div>
      </section>

      {/* Mosaico: el equipo al frente; el fundador y una obra entregada a un lado */}
      <section className="px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:h-[clamp(420px,44vw,600px)] md:grid-cols-12">
          <Shot
            photo={aboutPhotos.team}
            preload
            sizes="(min-width: 768px) 66vw, 100vw"
            className="aspect-[4/3] md:col-span-8 md:aspect-auto"
          />
          <div className="grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1 md:grid-rows-2">
            <Shot
              photo={aboutPhotos.founder}
              delay={120}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="aspect-[4/5] md:aspect-auto"
            />
            <Shot
              photo={aboutPhotos.work}
              delay={240}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="aspect-[4/5] md:aspect-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Foto del mosaico: aparece con un leve alejamiento, se acerca al pasar el
 * cursor y lleva su pie en mono sobre un degradado.
 */
function Shot({
  photo,
  sizes,
  className,
  delay = 0,
  preload = false,
}: {
  photo: AboutPhoto;
  sizes: string;
  className: string;
  delay?: number;
  preload?: boolean;
}) {
  return (
    <Reveal delay={delay} className={`about-shot group relative overflow-hidden bg-night ${className}`}>
      <div data-shot className="absolute inset-0">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-smooth group-hover:scale-[1.04]">
          <MediaSlot
            label={photo.label}
            src={photo.src}
            alt={photo.alt}
            sizes={sizes}
            labelAt="top"
            preload={preload && Boolean(photo.src)}
          />
        </div>
      </div>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-night/85 to-transparent px-4 pb-4 pt-12 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white/85 md:px-5 md:text-[11px] md:tracking-[0.18em]">
        <span aria-hidden="true" className="hidden h-px w-6 shrink-0 bg-white/60 md:block" />
        {photo.caption}
      </span>
    </Reveal>
  );
}
