/**
 * Configuración central del sitio HHM Proyectos.
 * Edita estos datos con la información real de la empresa.
 * El número de WhatsApp/teléfono puede sobreescribirse con la variable
 * de entorno NEXT_PUBLIC_WHATSAPP_NUMBER (formato internacional, solo dígitos).
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
} as const;

/** URL lista para abrir una conversación de WhatsApp con mensaje precargado. */
export function whatsappUrl(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
