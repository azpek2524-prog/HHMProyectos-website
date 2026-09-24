/**
 * Contenido del sitio HHM Proyectos (tomado de /mockups).
 *
 * Todo lo marcado como placeholder (nombres, cifras, testimonios, fichas de
 * obra) debe reemplazarse por información real.
 *
 * Fotos y videos: guarda el archivo en /public (p. ej. /public/obras/torre.jpg)
 * y escribe su ruta en el campo `image` correspondiente ("/obras/torre.jpg").
 * Mientras un campo `image` esté vacío se muestra un recuadro de placeholder.
 */

export type Category = {
  id: string;
  n: string;
  name: string;
  lead: string;
  image?: string;
  items: [title: string, description: string][];
};

export const categories: Category[] = [
  {
    id: "plomeria",
    n: "01",
    name: "Plomería",
    lead: "Redes de agua, drenaje y gas diseñadas e instaladas conforme a norma, coordinadas con estructura y acabados.",
    items: [
      ["Instalación hidrosanitaria", "Agua fría y caliente, desde toma municipal hasta cada mueble."],
      ["Drenaje sanitario y pluvial", "Bajadas, registros, cárcamos y captación de lluvia."],
      ["Redes de gas", "LP y natural, estacionario o medidor, con pruebas de hermeticidad."],
      ["Bombeo e hidroneumáticos", "Cisternas, tinacos, equipos de presión constante."],
      ["Calentamiento de agua", "Calentadores, boilers y sistemas solares."],
      ["Protección contra incendio", "Red de hidrantes, rociadores y gabinetes."],
    ],
  },
  {
    id: "electricidad",
    n: "02",
    name: "Electricidad",
    lead: "Desde la acometida hasta el último contacto: media y baja tensión, iluminación y sistemas especiales.",
    items: [
      ["Acometidas y subestaciones", "Trámite, obra civil y montaje en media tensión."],
      ["Tableros y distribución", "Tableros generales, derivados y balanceo de cargas."],
      ["Iluminación", "Interior, exterior, fachadas y control de escenas."],
      ["Voz, datos y CCTV", "Cableado estructurado, racks y videovigilancia."],
      ["Tierras físicas y pararrayos", "Sistemas de puesta a tierra y protección atmosférica."],
      ["Plantas de emergencia", "Transferencias automáticas y respaldo UPS."],
    ],
  },
  {
    id: "proyecto",
    n: "03",
    name: "Proyecto ejecutivo",
    lead: "Ingeniería lista para licencia y para obra, entregada en el formato de tu despacho.",
    items: [
      ["Memorias de cálculo", "Hidráulico, sanitario, gas y eléctrico."],
      ["Planos e isométricos", "Plantas, cortes, isométricos y unifilares."],
      ["Coordinación BIM", "Modelado MEP y detección de interferencias."],
      ["Planos as-built", "Registro final de lo instalado para el cliente."],
    ],
  },
  {
    id: "mantenimiento",
    n: "04",
    name: "Mantenimiento",
    lead: "Pólizas preventivas y atención correctiva para edificios ya entregados.",
    items: [
      ["Preventivo programado", "Revisión periódica de equipos, tableros y redes."],
      ["Correctivo y urgencias", "Detección de fugas, fallas y cortos."],
      ["Adecuaciones", "Ampliaciones de carga y remodelaciones."],
    ],
  },
];

/** Las dos especialidades destacadas en la Home. */
export const homeServices = [
  {
    id: "plomeria",
    n: "01",
    name: "Plomería",
    media: "Foto de instalación hidráulica",
    image: undefined as string | undefined,
    lead: "Redes de agua, drenaje y gas diseñadas e instaladas conforme a norma, coordinadas con estructura.",
    items: ["Hidrosanitaria", "Drenaje y pluviales", "Redes de gas", "Bombeo e hidroneumáticos", "Agua caliente", "Contra incendio"],
  },
  {
    id: "electricidad",
    n: "02",
    name: "Electricidad",
    media: "Foto de tablero o cableado",
    image: undefined as string | undefined,
    lead: "De la acometida al último contacto: media y baja tensión, iluminación y sistemas especiales.",
    items: ["Acometidas y subestaciones", "Tableros y distribución", "Iluminación", "Voz, datos y CCTV", "Tierras y pararrayos", "Plantas de emergencia"],
  },
];

export const stages = [
  { name: "Anteproyecto", text: "Factibilidad, cargas estimadas y trazos preliminares." },
  { name: "Proyecto ejecutivo", text: "Cálculo, planos y catálogo de conceptos para licencia." },
  { name: "Obra", text: "Instalación, supervisión y pruebas con tu residente." },
  { name: "Operación", text: "As-built, garantía y pólizas de mantenimiento." },
];

/* Placeholder: ajusta a las cifras reales de HHM. */
export const stats = [
  { value: 15, suffix: "+", label: "años instalando en obra" },
  { value: 120, suffix: "+", label: "obras entregadas" },
  { value: 85000, suffix: " m²", label: "de instalaciones ejecutadas" },
  { value: 90, suffix: "%", label: "de clientes que repiten con nosotros" },
];

/* Placeholder: reemplazar con reseñas reales (y foto en `image`). */
export const testimonials = [
  { tag: "Arquitectura", text: "Llegaron desde anteproyecto. Cuando empezó la obra, las instalaciones ya estaban resueltas.", who: "Arq. Nombre Apellido", role: "Despacho de arquitectura", image: undefined as string | undefined },
  { tag: "Constructora", text: "Un solo contratista para plomería y electricidad nos ahorró semanas de coordinación.", who: "Ing. Nombre Apellido", role: "Constructora", image: undefined as string | undefined },
  { tag: "Desarrollo", text: "Entregaron memorias, planos as-built y pruebas completas. Cero pendientes en la entrega.", who: "Nombre Apellido", role: "Desarrollador inmobiliario", image: undefined as string | undefined },
  { tag: "Industrial", text: "La subestación quedó energizada en fecha. Coordinaron directo con la compañía eléctrica.", who: "Ing. Nombre Apellido", role: "Gerente de planta", image: undefined as string | undefined },
  { tag: "Corporativo", text: "Planta libre de 2,000 m² con iluminación y datos listos antes de la mudanza.", who: "Nombre Apellido", role: "Facility manager", image: undefined as string | undefined },
  { tag: "Residencial", text: "Limpios, puntuales y con reporte semanal. Así da gusto supervisar una obra.", who: "Arq. Nombre Apellido", role: "Supervisión de obra", image: undefined as string | undefined },
];

export const specialties = [
  "Hidrosanitaria",
  "Tableros",
  "Drenaje pluvial",
  "Iluminación",
  "Redes de gas",
  "Subestaciones",
  "Contra incendio",
  "Voz y datos",
];

/* Placeholder: logos de clientes (ruta en /public o vacío). */
export const clientLogos: { name: string; image?: string }[] = [
  { name: "Cliente 1" },
  { name: "Cliente 2" },
  { name: "Cliente 3" },
  { name: "Cliente 4" },
  { name: "Cliente 5" },
  { name: "Cliente 6" },
];

/* ------------------------------ Obras ------------------------------ */

export type Project = {
  slug: string;
  type: "Residencial" | "Corporativo" | "Industrial" | "Comercial";
  scope: string;
  title: string;
  place: string;
  year: string;
  image?: string;
  architect: string;
  builder: string;
  /** Etapa en la que HHM entró al proyecto. */
  stage: string;
  summary: string;
  timeline: { week: string; title: string; text: string; media: string; image?: string }[];
  quote: { text: string; who: string };
};

/* Placeholder: fichas de ejemplo. Reemplaza con las obras reales de HHM. */
export const projects: Project[] = [
  {
    slug: "edificio-departamentos-12-niveles",
    type: "Residencial",
    scope: "Plomería + Electricidad",
    title: "Edificio de departamentos, 12 niveles",
    place: "Ciudad",
    year: "2025",
    architect: "Despacho",
    builder: "Constructora",
    stage: "Proyecto ejecutivo",
    summary: "Ductos hidrosanitarios y eléctricos coordinados en 12 niveles con losas postensadas, sin perforaciones posteriores y dentro del programa.",
    timeline: [
      { week: "SEM 01", title: "Revisión de planos", text: "Detectamos interferencias con estructura antes del colado de losas.", media: "Foto: revisión de planos" },
      { week: "SEM 06", title: "Preparaciones en losa", text: "Camisas y ductos dejados en cada nivel según isométricos.", media: "Foto: ductos y preparaciones" },
      { week: "SEM 18", title: "Subestación y tablero general", text: "Montaje, pruebas y liberación con la compañía suministradora.", media: "Video: montaje de subestación" },
      { week: "SEM 30", title: "Entrega", text: "Pruebas de presión y carga, planos as-built y garantía por escrito.", media: "Foto: entrega final" },
    ],
    quote: { text: "En obra no tuvimos que improvisar nada.", who: "Arq. Nombre Apellido · Despacho de arquitectura" },
  },
  {
    slug: "oficinas-corporativas-planta-libre",
    type: "Corporativo",
    scope: "Electricidad",
    title: "Oficinas corporativas, planta libre",
    place: "Ciudad",
    year: "2025",
    architect: "Despacho",
    builder: "Constructora",
    stage: "Obra",
    summary: "Iluminación, contactos en piso y cableado estructurado para una planta libre, listos antes de la mudanza del cliente.",
    timeline: [
      { week: "SEM 01", title: "Levantamiento", text: "Revisión de cargas existentes y capacidad del tablero del edificio.", media: "Foto: levantamiento en sitio" },
      { week: "SEM 04", title: "Canalizaciones", text: "Charolas y ductos en plafón coordinados con aire acondicionado.", media: "Foto: charolas en plafón" },
      { week: "SEM 09", title: "Voz, datos e iluminación", text: "Cableado estructurado certificado y control de escenas.", media: "Foto: rack y cableado" },
      { week: "SEM 12", title: "Entrega", text: "Pruebas, etiquetado de circuitos y planos as-built.", media: "Foto: oficina terminada" },
    ],
    quote: { text: "Todo quedó funcionando antes de que llegara el primer escritorio.", who: "Nombre Apellido · Facility manager" },
  },
  {
    slug: "casa-habitacion-sistema-pluvial",
    type: "Residencial",
    scope: "Plomería",
    title: "Casa habitación con sistema pluvial",
    place: "Ciudad",
    year: "2024",
    architect: "Despacho",
    builder: "Constructora",
    stage: "Anteproyecto",
    summary: "Red hidrosanitaria completa con captación y reúso de agua pluvial integrada al diseño arquitectónico.",
    timeline: [
      { week: "SEM 01", title: "Anteproyecto", text: "Cálculo de captación pluvial y ubicación de cisternas.", media: "Foto: planos de anteproyecto" },
      { week: "SEM 05", title: "Redes enterradas", text: "Drenajes, registros y cisterna pluvial antes de firmes.", media: "Foto: redes enterradas" },
      { week: "SEM 14", title: "Entrega", text: "Pruebas de presión, filtros y manual de operación.", media: "Foto: casa terminada" },
    ],
    quote: { text: "El sistema pluvial quedó integrado sin cambiar el diseño.", who: "Arq. Nombre Apellido · Despacho de arquitectura" },
  },
  {
    slug: "nave-industrial-subestacion",
    type: "Industrial",
    scope: "Electricidad",
    title: "Nave industrial con subestación",
    place: "Ciudad",
    year: "2024",
    architect: "Despacho",
    builder: "Constructora",
    stage: "Proyecto ejecutivo",
    summary: "Subestación en media tensión, tableros de fuerza e iluminación de nave, energizados en la fecha comprometida.",
    timeline: [
      { week: "SEM 01", title: "Proyecto y trámite", text: "Proyecto eléctrico y gestión con la compañía suministradora.", media: "Foto: proyecto eléctrico" },
      { week: "SEM 08", title: "Subestación", text: "Obra civil, montaje de transformador y celdas.", media: "Video: montaje de subestación" },
      { week: "SEM 16", title: "Energización", text: "Pruebas, liberación y puesta en servicio.", media: "Foto: tablero energizado" },
    ],
    quote: { text: "La subestación quedó energizada en fecha.", who: "Ing. Nombre Apellido · Gerente de planta" },
  },
  {
    slug: "restaurante-cocina-gas",
    type: "Comercial",
    scope: "Plomería + Electricidad",
    title: "Restaurante, cocina y gas",
    place: "Ciudad",
    year: "2024",
    architect: "Despacho",
    builder: "Constructora",
    stage: "Obra",
    summary: "Red de gas, trampas de grasa y alimentación eléctrica de equipos de cocina industrial.",
    timeline: [
      { week: "SEM 01", title: "Coordinación de equipos", text: "Cargas y consumos de cada equipo de cocina.", media: "Foto: layout de cocina" },
      { week: "SEM 04", title: "Gas y drenajes", text: "Red de gas con pruebas de hermeticidad y trampas de grasa.", media: "Foto: red de gas" },
      { week: "SEM 08", title: "Apertura", text: "Pruebas finales y dictámenes para apertura.", media: "Foto: restaurante terminado" },
    ],
    quote: { text: "Abrimos en fecha y con todos los dictámenes.", who: "Nombre Apellido · Propietario" },
  },
  {
    slug: "local-comercial-plaza",
    type: "Comercial",
    scope: "Plomería + Electricidad",
    title: "Local comercial en plaza",
    place: "Ciudad",
    year: "2023",
    architect: "Despacho",
    builder: "Constructora",
    stage: "Obra",
    summary: "Adecuación de instalaciones para local en plaza comercial, dentro de los lineamientos del centro comercial.",
    timeline: [
      { week: "SEM 01", title: "Lineamientos", text: "Revisión de reglamento de plaza y puntos de conexión.", media: "Foto: local en obra negra" },
      { week: "SEM 03", title: "Instalaciones", text: "Alimentación, iluminación y sanitarios del local.", media: "Foto: instalaciones en proceso" },
      { week: "SEM 06", title: "Entrega", text: "Liberación con administración de la plaza.", media: "Foto: local terminado" },
    ],
    quote: { text: "Pasamos la revisión de la plaza a la primera.", who: "Nombre Apellido · Arrendatario" },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/* ------------------------------ Empresa ------------------------------ */

export const principles = [
  { n: "01", title: "Entramos temprano.", text: "Revisar el arquitectónico antes de que se cuele la primera losa evita perforaciones, cambios y sobrecostos." },
  { n: "02", title: "Un solo responsable.", text: "Plomería y electricidad en el mismo contrato. Un interlocutor para tu residente y tu programa de obra." },
  { n: "03", title: "Todo por escrito.", text: "Memorias de cálculo, pruebas documentadas, planos as-built y garantía en cada entrega." },
];

/* Placeholder: nombres y retratos del equipo. */
export const team: { name: string; role: string; image?: string }[] = [
  { name: "Nombre Apellido", role: "Dirección" },
  { name: "Nombre Apellido", role: "Eléctrica" },
  { name: "Nombre Apellido", role: "Hidrosanitaria" },
  { name: "Nombre Apellido", role: "Obra" },
];

/* ---------------------------- Cotización ---------------------------- */

export const quoteSteps = [
  { key: "tipo", label: "Proyecto", question: "¿Qué vamos a construir?", options: ["Casa habitación", "Edificio residencial", "Oficinas", "Comercio o restaurante", "Industrial", "Remodelación"] },
  { key: "alcance", label: "Instalaciones", multi: true, question: "¿Qué instalaciones necesitas?", options: ["Plomería", "Electricidad", "Proyecto ejecutivo", "Mantenimiento"] },
  { key: "m2", label: "Superficie", question: "¿Cuántos m² de construcción, aprox.?", options: ["Menos de 500 m²", "500 – 2,000 m²", "2,000 – 10,000 m²", "Más de 10,000 m²"] },
  { key: "etapa", label: "Etapa", question: "¿En qué etapa está?", options: ["Anteproyecto", "Proyecto ejecutivo", "En obra", "Operación / mantenimiento"] },
  { key: "planos", label: "Planos", question: "Sube tus planos y dinos cómo contactarte.", options: [] },
] as const;
