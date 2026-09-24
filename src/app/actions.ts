"use server";

import { mailerConfigured, sendLeadEmails, type Lead } from "@/lib/mailer";
import { UPLOAD, formatBytes, isAllowedFile } from "@/lib/quote";
import { site } from "@/lib/site";

export type QuoteState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/\S+$/i;

const SUCCESS: QuoteState = {
  status: "success",
  message: "Te contactamos por correo o WhatsApp con alcance y propuesta.",
};

const FALLBACK: QuoteState = {
  status: "error",
  message: `No pudimos enviar tu solicitud. Escríbenos por WhatsApp al ${site.phoneDisplay} o a ${site.email} y te atendemos.`,
};

/**
 * Procesa la solicitud de cotización (página /cotizar): valida los datos y
 * manda el lead por correo con los planos adjuntos (ver src/lib/mailer.ts).
 *
 * Sin SMTP configurado: en desarrollo el lead solo se registra en la consola;
 * en producción se responde con error para que el cliente use WhatsApp y el
 * lead no se pierda en silencio.
 */
export async function submitQuote(
  _prevState: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const field = (key: string) => String(formData.get(key) ?? "").trim();

  // Antispam: campo oculto que las personas no ven y los bots sí llenan.
  if (field("sitio_web")) return SUCCESS;

  const lead: Lead = {
    tipo: field("tipo"),
    instalaciones: field("alcance"),
    superficie: field("m2"),
    etapa: field("etapa"),
    enlace: field("enlace"),
    nombre: field("nombre"),
    empresa: field("empresa"),
    correo: field("correo"),
    whatsapp: field("whatsapp"),
    recibidoEn: new Date(),
  };
  const files = formData
    .getAll("planos")
    .filter((f): f is File => f instanceof File && f.size > 0);

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
  if (lead.enlace && !URL_RE.test(lead.enlace)) {
    return {
      status: "error",
      message: "El enlace a los planos debe empezar con https://",
    };
  }
  const total = files.reduce((n, f) => n + f.size, 0);
  if (
    files.length > UPLOAD.maxFiles ||
    total > UPLOAD.maxTotalBytes ||
    files.some((f) => !isAllowedFile(f.name))
  ) {
    return {
      status: "error",
      message: `Los planos deben ser PDF, DWG, DXF, RVT o imágenes, hasta ${formatBytes(UPLOAD.maxTotalBytes)} en total. Para archivos más grandes pega un enlace de Drive o WeTransfer.`,
    };
  }

  if (!mailerConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("[HHM] Cotización sin enviar: falta configurar SMTP.", lead);
      return FALLBACK;
    }
    console.info("[HHM] Nueva solicitud de cotización (desarrollo, sin SMTP):", {
      ...lead,
      planos: files.map((f) => `${f.name} (${formatBytes(f.size)})`),
    });
    return SUCCESS;
  }

  try {
    await sendLeadEmails(lead, files);
  } catch (err) {
    console.error("[HHM] No se pudo enviar la cotización:", err);
    return FALLBACK;
  }
  return SUCCESS;
}
