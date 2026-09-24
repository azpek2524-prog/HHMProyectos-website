import { MARK_PATH, MARK_VIEWBOX, WORD_PATH, WORD_VIEWBOX } from "./logo-paths";

/*
 * Geometría de cada versión, en unidades del isotipo (706 × 730).
 * - stacked: el logo original (texto centrado debajo).
 * - horizontal: texto a la derecha, con altura de letra = 25 % del isotipo
 *   para que se lea en el menú.
 */
const WORD_W = 511;
const WORD_H = 35;
const H_SCALE = (730 * 0.25) / WORD_H;
const H_GAP = 730 * 0.3;

const variants = {
  mark: { viewBox: MARK_VIEWBOX, word: null },
  stacked: {
    viewBox: "0 0 706 807",
    word: { x: 93, y: 772, width: WORD_W, height: WORD_H },
  },
  horizontal: {
    viewBox: `0 0 ${Math.ceil(706 + H_GAP + WORD_W * H_SCALE)} 730`,
    word: {
      x: 706 + H_GAP,
      y: (730 - WORD_H * H_SCALE) / 2,
      width: WORD_W * H_SCALE,
      height: WORD_H * H_SCALE,
    },
  },
} as const;

/**
 * Logo vectorial de HHM Proyectos. Toma el color del texto (`currentColor`):
 * usa `text-ink` sobre fondos claros y `text-white` sobre oscuros.
 * Requiere <LogoSprite /> una vez en el documento (está en el layout).
 */
export default function Logo({
  variant = "horizontal",
  className,
  title,
}: {
  variant?: keyof typeof variants;
  className?: string;
  /** Texto accesible; omítelo si el contenedor ya tiene etiqueta (p. ej. un enlace). */
  title?: string;
}) {
  const v = variants[variant];
  return (
    <svg
      viewBox={v.viewBox}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#hhm-mark" width={706} height={730} />
      {v.word && <use href="#hhm-word" {...v.word} />}
    </svg>
  );
}

/** Define los trazos una sola vez por página; cada <Logo> los reutiliza. */
export function LogoSprite() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <symbol id="hhm-mark" viewBox={MARK_VIEWBOX}>
        <path fillRule="evenodd" d={MARK_PATH} />
      </symbol>
      <symbol id="hhm-word" viewBox={WORD_VIEWBOX}>
        <path fillRule="evenodd" d={WORD_PATH} />
      </symbol>
    </svg>
  );
}
