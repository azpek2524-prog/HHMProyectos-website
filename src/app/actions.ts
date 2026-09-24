"use server";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Procesa la solicitud de cotización (página /contacto).
 *
 * Por ahora valida los datos y los registra en el servidor. Para que los
 * leads lleguen a un correo o CRM, conecta aquí uno de estos:
 *   - Envío de email (p. ej. Resend, SendGrid, Nodemailer)
 *   - Una hoja de Google Sheets / Airtable
 *   - Un CRM (HubSpot, Pipedrive, etc.)
 *
 * Nota: los planos todavía NO se suben; solo se reciben sus nombres. Subirlos
 * requiere un almacenamiento (p. ej. Vercel Blob o S3) o adjuntarlos al email.
 */
export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();

  const lead = {
    tipo: field("tipo"),
    instalaciones: field("alcance"),
    superficie: field("m2"),
    etapa: field("etapa"),
    planos: field("archivos"),
    nombre: field("nombre"),
    empresa: field("empresa"),
    correo: field("correo"),
    whatsapp: field("whatsapp"),
    recibidoEn: new Date().toISOString(),
  };

  if (!lead.correo && !lead.whatsapp) {
    return {
      status: "error",
      message: "Déjanos un correo o un WhatsApp para poder responderte.",
    };
  }
  if (lead.correo && !EMAIL_RE.test(lead.correo)) {
    return { status: "error", message: "Revisa el correo: parece incompleto." };
  }
  if (lead.whatsapp && lead.whatsapp.replace(/\D/g, "").length < 10) {
    return {
      status: "error",
      message: "El WhatsApp debe tener al menos 10 dígitos.",
    };
  }

  // TODO: integrar destino del lead (email / CRM / hoja de cálculo).
  console.log("[HHM] Nueva solicitud de cotización:", lead);

  return {
    status: "success",
    message: "Te contactamos por correo o WhatsApp con alcance y propuesta.",
  };
}
