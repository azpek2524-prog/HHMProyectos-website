import Image from "next/image";

/**
 * Espacio para foto de obra. Si `src` existe muestra la imagen optimizada;
 * si no, un placeholder con la descripción de la foto que va ahí.
 * Ocupa todo su contenedor: el padre debe ser `relative` con tamaño definido.
 */
export default function MediaSlot({
  label,
  src,
  alt,
  tone = "dark",
  sizes = "100vw",
  priority = false,
  labelAt = "center",
  className = "",
}: {
  /** Qué foto va aquí (se muestra en el placeholder y como texto alternativo). */
  label: string;
  src?: string;
  alt?: string;
  tone?: "dark" | "light";
  sizes?: string;
  priority?: boolean;
  /** "top" cuando hay títulos encima de la foto, para que no se encimen. */
  labelAt?: "center" | "top";
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? label}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className}`}
      />
    );
  }

  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={label}
      className={`absolute inset-0 flex justify-center p-6 ${
        labelAt === "top" ? "items-start pt-[14%]" : "items-center"
      } ${
        dark ? "bg-night text-gray-500" : "bg-gray-100 text-gray-400"
      } ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${
          dark ? "rgba(255,255,255,.045)" : "rgba(16,24,40,.05)"
        } 1px, transparent 1px), linear-gradient(to bottom, ${
          dark ? "rgba(255,255,255,.045)" : "rgba(16,24,40,.05)"
        } 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    >
      <span
        className={`pointer-events-none absolute inset-3 border border-dashed ${
          dark ? "border-white/15" : "border-gray-300"
        }`}
      />
      <span className="relative max-w-[80%] text-center font-mono text-[11px] uppercase tracking-[0.08em]">
        {label}
      </span>
    </div>
  );
}
