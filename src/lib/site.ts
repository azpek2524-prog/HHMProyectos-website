/**
 * Configuración central del sitio HHM Proyectos.
 * Edita estos datos con la información real de la empresa.
 * El número de WhatsApp puede sobreescribirse con la variable de entorno
 * NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos).
 */
export const site = {
  name: "HHM Proyectos",
  // Formato internacional sin "+" ni espacios. Ej. México: 52 + 10 dígitos.
  // TODO: reemplazar con el número real de HHM.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5210000000000",
  phoneDisplay: "+52 (000) 000 0000",
  email: "contacto@hhmproyectos.com",
  city: "México",
  whatsappMessage:
    "Hola HHM Proyectos, me gustaría solicitar información sobre sus servicios de plomería y electricidad.",
  /** Tiempo de respuesta que se promete en la cotización. */
  responseTime: "48 h",
  media: {
    // Video de obra para el hero de la Home (loop sin audio), p. ej. "/video/obra.mp4".
    // Mientras esté vacío se muestra un placeholder.
    heroVideo: undefined as string | undefined,
    // Imagen fija que se ve mientras carga el video (y con "reducir movimiento").
    heroPoster: undefined as string | undefined,
  },
} as const;

/** URL lista para abrir una conversación de WhatsApp con mensaje precargado. */
export function whatsappUrl(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
