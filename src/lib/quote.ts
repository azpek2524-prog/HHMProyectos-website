/**
 * Reglas del cotizador compartidas por el navegador y el servidor.
 *
 * Los planos se adjuntan al correo del lead. El tope total de 4 MB deja
 * margen bajo el límite de 4.5 MB por solicitud de hostings como Vercel;
 * para archivos más pesados el formulario pide un enlace (Drive, WeTransfer).
 * Si cambias el tope, ajusta también `serverActions.bodySizeLimit` en
 * next.config.ts.
 */
export const UPLOAD = {
  maxTotalBytes: 4 * 1024 * 1024,
  maxFiles: 10,
  extensions: ["pdf", "dwg", "dxf", "rvt", "jpg", "jpeg", "png", "webp", "heic"],
  accept: ".pdf,.dwg,.dxf,.rvt,image/*",
} as const;

export function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
}

export function isAllowedFile(name: string): boolean {
  return (UPLOAD.extensions as readonly string[]).includes(fileExtension(name));
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
