/**
 * Configuración central del sitio HHM Proyectos.
 * Edita estos datos con la información real de la empresa.
 * El número de WhatsApp puede sobreescribirse con la variable de entorno
 * NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos) y el
 * dominio con NEXT_PUBLIC_SITE_URL.
 */
export const site = {
  name: "HHM Proyectos",
  /** Dominio público (sin "/" final). Se usa en canónicas, sitemap y redes. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hhmproyectos.com").replace(/\/$/, ""),
  // Formato internacional sin "+" ni espacios. México: 52 + 10 dígitos.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "528123999979",
  phoneDisplay: "81 2399 9979",
  /** Para enlaces tel: y datos estructurados. */
  phoneE164: "+528123999979",
  email: "hhmproyectos@gmail.com",
  city: "Monterrey",
  /** Zona principal (confirmada por HHM); también toman proyectos en el resto del país. */
  serviceArea: "Monterrey y su área metropolitana",
  /*
   * Datos del responsable para el aviso de privacidad y los datos
   * estructurados. TODO (HHM): razón social y domicilio fiscal reales;
   * la ley pide el domicilio en el aviso antes de publicar el sitio.
   */
  legalName: "HHM Proyectos",
  address: undefined as string | undefined,
  whatsappMessage:
    "Hola HHM Proyectos, me gustaría solicitar información sobre sus servicios de plomería y electricidad.",
  media: {
    // Video de obra para el hero de la Home (loop sin audio), p. ej. "/video/obra.mp4".
    // Mientras esté vacío se muestra un placeholder.
    heroVideo: undefined as string | undefined,
    // Foto del hero (y póster del video si se agrega uno). Oficina de Torre
    // Invex con las instalaciones a la vista.
    heroPoster: "/obras/torre-invex-oficinas/05.jpg" as string | undefined,
  },
} as const;

/** URL lista para abrir una conversación de WhatsApp con mensaje precargado. */
export function whatsappUrl(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
