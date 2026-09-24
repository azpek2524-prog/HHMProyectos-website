import nodemailer from "nodemailer";
import { formatBytes } from "@/lib/quote";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Envío de solicitudes de cotización por correo (SMTP).
 *
 * Variables de entorno (ver .env.example):
 *   SMTP_USER / SMTP_PASS  Cuenta que envía. Con Gmail, SMTP_PASS es una
 *                          "contraseña de aplicación", no la contraseña normal.
 *   SMTP_HOST / SMTP_PORT  Opcionales; por defecto smtp.gmail.com:465.
 *   LEADS_TO               Opcional; a quién llegan los leads (por defecto site.email).
 */

export type Lead = {
  tipo: string;
  instalaciones: string;
  superficie: string;
  etapa: string;
  enlace: string;
  nombre: string;
  empresa: string;
  correo: string;
  whatsapp: string;
  recibidoEn: Date;
};

export function mailerConfigured(): boolean {
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  return Boolean(SMTP_HOST || (SMTP_USER && SMTP_PASS));
}

function createTransport() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Una línea: evita saltos en asuntos y encabezados. */
const oneLine = (s: string) => s.replace(/\s+/g, " ").trim();

/** Enlace de WhatsApp al número del cliente (10 dígitos = México). */
function clientWhatsappUrl(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) return undefined;
  return `https://wa.me/${digits.length === 10 ? `52${digits}` : digits}`;
}

function projectRows(lead: Lead): [string, string][] {
  const rows: [string, string][] = [
    ["Proyecto", lead.tipo],
    ["Instalaciones", lead.instalaciones],
    ["Superficie", lead.superficie],
    ["Etapa", lead.etapa],
  ];
  return rows.map(([k, v]): [string, string] => [k, v || "—"]);
}

function table(rows: [string, string, string?][]): string {
  const cells = rows
    .map(
      ([k, v, href]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#667085;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td>` +
        `<td style="padding:8px 0;font-weight:600;color:#101828">${
          href ? `<a href="${escapeHtml(href)}" style="color:#1c398e">${escapeHtml(v)}</a>` : escapeHtml(v)
        }</td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font:15px/1.4 Arial,sans-serif">${cells}</table>`;
}

const layout = (title: string, body: string) =>
  `<div style="font:15px/1.5 Arial,sans-serif;color:#101828;max-width:600px">` +
  `<h1 style="font-size:22px;margin:0 0 16px">${escapeHtml(title)}</h1>${body}</div>`;

/**
 * Manda el lead al equipo (con planos adjuntos) y, si el cliente dejó
 * correo, una confirmación de recibido. Si falla el correo al equipo se
 * lanza el error; la confirmación al cliente nunca bloquea la solicitud.
 */
export async function sendLeadEmails(lead: Lead, files: File[]): Promise<void> {
  const transport = createTransport();
  const sender = process.env.SMTP_USER ?? site.email;
  const to = process.env.LEADS_TO ?? site.email;
  const when = lead.recibidoEn.toLocaleString("es-MX", {
    timeZone: "America/Mexico_City",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const clientWa = clientWhatsappUrl(lead.whatsapp);
  const who = lead.nombre || lead.empresa || lead.correo || lead.whatsapp;

  const contactRows: [string, string, string?][] = [
    ["Nombre", lead.nombre || "—"],
    ["Despacho o constructora", lead.empresa || "—"],
    ["Correo", lead.correo || "—", lead.correo ? `mailto:${lead.correo}` : undefined],
    ["WhatsApp", lead.whatsapp || "—", clientWa],
  ];
  const fileRows: [string, string, string?][] = [
    [
      "Planos adjuntos",
      files.length ? files.map((f) => `${f.name} (${formatBytes(f.size)})`).join(", ") : "—",
    ],
    ["Enlace a planos", lead.enlace || "—", lead.enlace || undefined],
  ];

  const attachments = await Promise.all(
    files.map(async (f) => ({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
      contentType: f.type || undefined,
    })),
  );

  const asText = (rows: [string, string, string?][]) =>
    rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  await transport.sendMail({
    from: { name: `${site.name} · Sitio web`, address: sender },
    to,
    replyTo: lead.correo || undefined,
    subject: oneLine(`Nueva cotización · ${lead.tipo || "Proyecto"} · ${who}`),
    text: [
      asText(projectRows(lead)),
      asText(fileRows),
      asText(contactRows),
      `Recibido: ${when}`,
    ].join("\n\n"),
    html: layout(
      "Nueva solicitud de cotización",
      [
        table(projectRows(lead)),
        `<hr style="border:0;border-top:1px solid #e4e7ec;margin:16px 0">`,
        table(fileRows),
        `<hr style="border:0;border-top:1px solid #e4e7ec;margin:16px 0">`,
        table(contactRows),
        `<p style="color:#667085;font-size:13px;margin-top:24px">Recibido el ${escapeHtml(when)} desde el formulario de ${escapeHtml(site.url)}.` +
          `${lead.correo ? " Responde a este correo para contestarle directamente." : ""}</p>`,
      ].join(""),
    ),
    attachments,
  });

  if (!lead.correo) return;
  try {
    const greeting = lead.nombre ? `Hola ${oneLine(lead.nombre)},` : "Hola,";
    const intro = `Recibimos tu solicitud de cotización${files.length ? " y tus planos" : ""}. Te contactamos en menos de ${site.responseTime} con alcance y propuesta.`;
    await transport.sendMail({
      from: { name: site.name, address: sender },
      to: lead.correo,
      replyTo: to,
      subject: "Recibimos tu solicitud de cotización",
      text: [
        greeting,
        intro,
        asText(projectRows(lead)),
        `¿Necesitas algo antes? Escríbenos por WhatsApp: ${whatsappUrl()}`,
        site.name,
      ].join("\n\n"),
      html: layout(
        "Recibimos tu solicitud",
        `<p>${escapeHtml(greeting)}</p><p>${escapeHtml(intro)}</p>` +
          table(projectRows(lead)) +
          `<p style="margin-top:24px">¿Necesitas algo antes? <a href="${escapeHtml(whatsappUrl())}" style="color:#1c398e">Escríbenos por WhatsApp</a> al ${escapeHtml(site.phoneDisplay)}.</p>` +
          `<p style="color:#667085">${escapeHtml(site.name)} · Plomería y electricidad para construcción</p>`,
      ),
    });
  } catch (err) {
    console.error("[HHM] No se pudo enviar la confirmación al cliente:", err);
  }
}
