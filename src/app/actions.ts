"use server";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
};

/**
 * Procesa el formulario de solicitud de cotización.
 *
 * Por ahora valida los datos y los registra en el servidor. Para que los
 * leads lleguen a un correo o CRM, conecta aquí uno de estos:
 *   - Envío de email (p. ej. Resend, SendGrid, Nodemailer)
 *   - Una hoja de Google Sheets / Airtable
 *   - Un CRM (HubSpot, Pipedrive, etc.)
 * Ver el bloque "TODO: integrar destino del lead" más abajo.
 */
export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const empresa = String(formData.get("empresa") ?? "").trim();
  const contacto = String(formData.get("contacto") ?? "").trim();
  const tipoProyecto = String(formData.get("tipoProyecto") ?? "").trim();
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  // Validación mínima del lado del servidor.
  if (nombre.length < 2) {
    return { status: "error", message: "Por favor escribe tu nombre." };
  }
  if (contacto.length < 6) {
    return {
      status: "error",
      message: "Déjanos un teléfono o correo para poder responderte.",
    };
  }

  const lead = {
    nombre,
    empresa,
    contacto,
    tipoProyecto,
    mensaje,
    recibidoEn: new Date().toISOString(),
  };

  // TODO: integrar destino del lead (email / CRM / hoja de cálculo).
  // Mientras tanto lo registramos en el servidor para no perder solicitudes.
  console.log("[HHM] Nueva solicitud de cotización:", lead);

  return {
    status: "success",
    message:
      "¡Gracias! Recibimos tu solicitud. Un especialista de HHM te contactará muy pronto.",
  };
}
