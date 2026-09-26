/**
 * Contenido del sitio HHM Proyectos (tomado de /mockups).
 *
 * Todo lo marcado como placeholder (nombres, cifras, testimonios, fichas de
 * obra) debe reemplazarse por información real.
 *
 * Fotos y videos: viven en /public/obras/<obra>/ (salen de Google Drive ›
 * HHM-Proyectos). Para usar otra foto, cambia la ruta del campo `image`.
 * Si un campo `image` queda vacío se muestra un recuadro de placeholder.
 */

export type Category = {
  /** También es la URL: /servicios/<id>. */
  id: string;
  n: string;
  name: string;
  /** Título de su página (H1 y buscadores). */
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  items: [title: string, description: string][];
};

export const categories: Category[] = [
  {
    id: "plomeria",
    n: "01",
    name: "Plomería",
    title: "Instalaciones de plomería para construcción",
    image: "/obras/residencia/10.jpg",
    imageAlt: "Alberca interior de una residencia",
    lead: "Redes de agua, drenaje y gas diseñadas e instaladas conforme a norma, coordinadas con estructura y acabados.",
    items: [
      ["Instalación hidrosanitaria", "Agua fría y caliente, desde toma municipal hasta cada mueble."],
      ["Drenaje sanitario y pluvial", "Bajadas, registros, cárcamos y captación de lluvia."],
      ["Redes de gas", "LP y natural, estacionario o medidor, con pruebas de hermeticidad."],
      ["Bombeo e hidroneumáticos", "Cisternas, tinacos, equipos de presión constante."],
      ["Calentamiento de agua", "Calentadores, boilers y sistemas solares."],
    ],
  },
  {
    id: "electricidad",
    n: "02",
    name: "Electricidad",
    title: "Instalaciones eléctricas para construcción",
    image: "/obras/agencia-kia/03.jpg",
    imageAlt: "Plafón con iluminación lineal en agencia automotriz",
    lead: "Desde la acometida en media tensión hasta el último contacto, con verificación de unidad UVIE.",
    items: [
      ["Acometidas y subestaciones", "Trámite, obra civil y montaje en media tensión."],
      ["Tableros y distribución", "Tableros generales, derivados y balanceo de cargas."],
      ["Iluminación", "Interior, exterior, fachadas y control de escenas."],
      ["Canalizaciones para voz, datos y CCTV", "Tubería y charolas listas para el cableado de telecomunicaciones y videovigilancia."],
      ["Tierras físicas y pararrayos", "Sistemas de puesta a tierra y protección atmosférica."],
      ["Plantas de emergencia", "Transferencias automáticas y respaldo UPS."],
    ],
  },
  {
    id: "proyecto-ejecutivo",
    n: "03",
    name: "Proyecto ejecutivo",
    title: "Proyecto ejecutivo de instalaciones",
    image: "/obras/torre-invex-oficinas/19.jpg",
    imageAlt: "Drenaje y canalizaciones coordinados sobre losa reticular",
    lead: "Diseñamos las instalaciones sobre el proyecto de tu despacho: cálculo, planos y modelo BIM, listos para licencia y obra.",
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
    title: "Mantenimiento de instalaciones hidráulicas y eléctricas",
    image: "/obras/almacen/03.jpg",
    imageAlt: "Nave de almacenamiento con iluminación de altura",
    lead: "Para las obras que instalamos: revisiones preventivas, atención de urgencias y adecuaciones cuando tu proyecto crece.",
    items: [
      ["Preventivo programado", "Revisión periódica de equipos, tableros y redes."],
      ["Correctivo y urgencias", "Detección de fugas, fallas y cortos en instalaciones hechas por HHM."],
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
    media: "Tubería de PVC sobre losa reticular",
    image: "/obras/torre-invex-oficinas/08.jpg" as string | undefined,
    lead: "Agua, drenaje y gas diseñados e instalados conforme a norma, coordinados con estructura y acabados.",
    items: ["Hidrosanitaria", "Drenaje y pluviales", "Redes de gas", "Bombeo e hidroneumáticos", "Agua caliente"],
  },
  {
    id: "electricidad",
    n: "02",
    name: "Electricidad",
    media: "Plafón con iluminación lineal",
    image: "/obras/agencia-kia/02.jpg" as string | undefined,
    lead: "De la acometida en media tensión al último contacto, con verificación de unidad UVIE.",
    items: ["Acometidas y subestaciones", "Tableros y distribución", "Iluminación", "Canalizaciones de voz y datos", "Tierras y pararrayos", "Plantas de emergencia"],
  },
];

export const stages = [
  { name: "Anteproyecto", text: "Factibilidad, cargas estimadas y trazos preliminares." },
  { name: "Proyecto ejecutivo", text: "Cálculo, planos y catálogo de conceptos para licencia." },
  { name: "Obra", text: "Instalación, supervisión y pruebas con tu residente." },
  { name: "Operación", text: "As-built, garantía y pólizas de mantenimiento." },
];

/*
 * Cifras de la Home (entrevista con HHM, sep. 2026; salen de sus registros).
 * Vacío = la sección no se muestra. "Obras en paralelo" cambia con el tiempo:
 * actualízala cuando cambie.
 */
export type Stat = { value: number; suffix: string; label: string };
export const stats: Stat[] = [
  { value: 15, suffix: "", label: "años en obra" },
  { value: 280, suffix: "+", label: "obras entregadas" },
  { value: 40, suffix: "", label: "personas en equipo propio" },
  { value: 20, suffix: "", label: "obras en paralelo hoy" },
];

/*
 * Testimonios de la Home. Vacío = la sección no se muestra.
 * TODO (HHM): reseñas reales con nombre y cargo (con permiso del cliente).
 * Formato:
 *   { tag: "Arquitectura", text: "…", who: "Arq. Nombre Apellido", role: "Despacho", image: "/testimonios/nombre.jpg" },
 */
export type Testimonial = { tag: string; text: string; who: string; role: string; image?: string };
export const testimonials: Testimonial[] = [];

export const specialties = [
  "Hidrosanitaria",
  "Tableros",
  "Drenaje pluvial",
  "Iluminación",
  "Redes de gas",
  "Subestaciones",
  "Bombeo",
  "Tierras físicas",
];

/* Placeholder: logos de clientes (ruta en /public o vacío). */
export type ClientLogo = {
  name: string;
  /** SVG monocromo en /public/clientes (se pinta con el color del texto). */
  src: string;
  /** Ancho ÷ alto del SVG. */
  ratio: number;
  /** Alto en px: se ajusta por logo para que todos tengan el mismo peso visual. */
  height: number;
};

/*
 * Logos de marcas y clientes que HHM autorizó mostrar (entrevista, sep. 2026).
 * Nissan, Toyota, Chevrolet y KIA: Simple Icons. Geely: paquete
 * car-brand-logos (MIT). Chirey, Fertilità y Solanum: vectorizados de las
 * imágenes que envió HHM (de Solanum solo la palabra; conviene pedirles el
 * archivo oficial). TODO: agregar Invex cuando esté su logo.
 */
export const clientLogos: ClientLogo[] = [
  { name: "Nissan", src: "/clientes/nissan.svg", ratio: 1.194, height: 46 },
  { name: "KIA", src: "/clientes/kia.svg", ratio: 4.24, height: 21 },
  { name: "Solanum", src: "/clientes/solanum.svg", ratio: 4.907, height: 22 },
  { name: "Toyota", src: "/clientes/toyota.svg", ratio: 1.468, height: 34 },
  { name: "LCA Arquitectos", src: "/clientes/lca.svg", ratio: 1.995, height: 54 },
  { name: "Chevrolet", src: "/clientes/chevrolet.svg", ratio: 3.057, height: 24 },
  { name: "Fertilità", src: "/clientes/fertilita.svg", ratio: 1.911, height: 64 },
  { name: "Chirey", src: "/clientes/chirey.svg", ratio: 2.775, height: 34 },
  { name: "Zeekr", src: "/clientes/zeekr.svg", ratio: 1, height: 40 },
  { name: "Geely", src: "/clientes/geely.svg", ratio: 3.384, height: 21 },
];

/* ------------------------------ Obras ------------------------------ */

export type Photo = { src: string; alt: string; w: number; h: number };
/** Video: `src` en MP4 (H.264) y `webm` (VP9) como alternativa más ligera. */
export type Clip = { src: string; webm?: string; poster: string; alt: string; w: number; h: number };

export type Project = {
  slug: string;
  title: string;
  type: "Residencial" | "Corporativo" | "Industrial" | "Comercial";
  /** Instalaciones a cargo de HHM (define el filtro del portafolio). */
  scope: string;
  summary: string;
  cover: Photo;
  /* Datos opcionales de la ficha: solo se muestran si tienen valor. */
  place?: string;
  year?: string;
  stage?: string;
  architect?: string;
  builder?: string;
  gallery: { title: string; photos: Photo[] }[];
  videos?: Clip[];
  quote?: { text: string; who: string };
};

/*
 * Obras reales (fotos y videos de Google Drive › HHM-Proyectos).
 * TODO (HHM): confirmar el alcance (scope) de cada obra y, si se desea,
 * agregar ubicación, año, etapa, arquitectura, constructora y testimonio.
 */
export const projects: Project[] = [
  {
    slug: "torre-invex-oficinas",
    title: "Torre Invex · Oficinas",
    type: "Corporativo",
    scope: "Plomería + Electricidad",
    summary: "Oficinas corporativas con plafón abierto: tuberías, canalizaciones e iluminación quedan a la vista, así que su trazo es parte del diseño.",
    cover: { src: "/obras/torre-invex-oficinas/01.jpg", alt: "Área de trabajo con instalaciones aparentes", w: 1280, h: 892 },
    gallery: [
      {
        title: "Terminado",
        photos: [
          { src: "/obras/torre-invex-oficinas/05.jpg", alt: "Plafón abierto: red contra incendio, canalizaciones e iluminación a la vista", w: 1280, h: 960 },
          { src: "/obras/torre-invex-oficinas/01.jpg", alt: "Área de trabajo con instalaciones aparentes", w: 1280, h: 892 },
          { src: "/obras/torre-invex-oficinas/03.jpg", alt: "Luminarias suspendidas sobre estaciones de trabajo", w: 1280, h: 960 },
          { src: "/obras/torre-invex-oficinas/04.jpg", alt: "Iluminación en área abierta con vista a la ciudad", w: 1280, h: 960 },
          { src: "/obras/torre-invex-oficinas/06.jpg", alt: "Lámparas colgantes y ducto en plafón negro", w: 1280, h: 960 },
          { src: "/obras/torre-invex-oficinas/07.jpg", alt: "Recorrido de tuberías y luminarias a lo largo de la planta", w: 1280, h: 960 },
        ],
      },
      {
        title: "En obra",
        photos: [
          { src: "/obras/torre-invex-oficinas/19.jpg", alt: "Drenaje y canalizaciones sobre losa reticular", w: 1280, h: 960 },
          { src: "/obras/torre-invex-oficinas/13.jpg", alt: "Ductos y tuberías coordinados en losa", w: 960, h: 1280 },
          { src: "/obras/torre-invex-oficinas/14.jpg", alt: "Ductos y equipo en plafón, con red contra incendio", w: 1280, h: 960 },
          { src: "/obras/torre-invex-oficinas/08.jpg", alt: "Tubería de PVC sobre losa reticular", w: 960, h: 1280 },
          { src: "/obras/torre-invex-oficinas/17.jpg", alt: "Tubería junto a fachada de cristal", w: 960, h: 1280 },
        ],
      },
    ],
    videos: [
      { src: "/obras/torre-invex-oficinas/video-01.mp4", webm: "/obras/torre-invex-oficinas/video-01.webm", poster: "/obras/torre-invex-oficinas/video-01.jpg", alt: "Recorrido en video: Torre Invex · Oficinas", w: 576, h: 1024 },
      { src: "/obras/torre-invex-oficinas/video-02.mp4", webm: "/obras/torre-invex-oficinas/video-02.webm", poster: "/obras/torre-invex-oficinas/video-02.jpg", alt: "Recorrido en video: Torre Invex · Oficinas", w: 576, h: 1024 },
      { src: "/obras/torre-invex-oficinas/video-03.mp4", webm: "/obras/torre-invex-oficinas/video-03.webm", poster: "/obras/torre-invex-oficinas/video-03.jpg", alt: "Recorrido en video: Torre Invex · Oficinas", w: 576, h: 1024 },
      { src: "/obras/torre-invex-oficinas/video-04.mp4", webm: "/obras/torre-invex-oficinas/video-04.webm", poster: "/obras/torre-invex-oficinas/video-04.jpg", alt: "Recorrido en video: Torre Invex · Oficinas", w: 576, h: 1024 },
    ],
  },
  {
    slug: "agencia-kia",
    title: "Agencia KIA",
    type: "Comercial",
    scope: "Electricidad",
    summary: "Agencia automotriz con fachada de cristal y plafón de iluminación lineal en todo el piso de exhibición, de la obra en proceso a la apertura.",
    cover: { src: "/obras/agencia-kia/04.jpg", alt: "Fachada de cristal iluminada de noche", w: 1280, h: 960 },
    gallery: [
      {
        title: "Terminado",
        photos: [
          { src: "/obras/agencia-kia/04.jpg", alt: "Fachada de cristal iluminada de noche", w: 1280, h: 960 },
          { src: "/obras/agencia-kia/02.jpg", alt: "Plafón con iluminación lineal en piso de exhibición", w: 1280, h: 960 },
          { src: "/obras/agencia-kia/08.jpg", alt: "Fachada durante los últimos detalles de obra", w: 1024, h: 845 },
          { src: "/obras/agencia-kia/11.jpg", alt: "Vista nocturna del conjunto", w: 1024, h: 768 },
        ],
      },
      {
        title: "En obra",
        photos: [
          { src: "/obras/agencia-kia/05.jpg", alt: "Plafón lineal con obra aún en proceso", w: 960, h: 1280 },
          { src: "/obras/agencia-kia/07.jpg", alt: "Iluminación lineal y muros de madera en obra", w: 960, h: 1280 },
          { src: "/obras/agencia-kia/10.jpg", alt: "Líneas de luz a lo largo del plafón", w: 960, h: 1280 },
          { src: "/obras/agencia-kia/12.jpg", alt: "Plafón terminado con zona aún acordonada", w: 960, h: 1280 },
        ],
      },
    ],
  },
  {
    slug: "residencia",
    title: "Residencia",
    type: "Residencial",
    scope: "Plomería + Electricidad",
    summary: "Residencia con alberca interior, baños de mármol e iluminación arquitectónica en cada espacio: tiras LED empotradas, lámparas suspendidas y cine en casa.",
    cover: { src: "/obras/residencia/10.jpg", alt: "Alberca interior", w: 1280, h: 960 },
    gallery: [
      {
        title: "Agua y baños",
        photos: [
          { src: "/obras/residencia/10.jpg", alt: "Alberca interior", w: 1280, h: 960 },
          { src: "/obras/residencia/09.jpg", alt: "Alberca vista desde el nivel superior", w: 960, h: 1280 },
          { src: "/obras/residencia/22.jpg", alt: "Baño con espejo retroiluminado", w: 960, h: 1280 },
          { src: "/obras/residencia/03.jpg", alt: "Medio baño con lavabo de mármol", w: 960, h: 1280 },
          { src: "/obras/residencia/17.jpg", alt: "Baño con cancel de cristal y muros de mármol", w: 960, h: 1280 },
        ],
      },
      {
        title: "Iluminación",
        photos: [
          { src: "/obras/residencia/15.jpg", alt: "Escalera con pasamanos iluminado", w: 960, h: 1280 },
          { src: "/obras/residencia/12.jpg", alt: "Lámpara suspendida en cubo de escalera", w: 1280, h: 960 },
          { src: "/obras/residencia/07.jpg", alt: "Cajillo de luz indirecta en sala", w: 1280, h: 960 },
          { src: "/obras/residencia/18.jpg", alt: "Líneas de luz empotradas en recámara", w: 960, h: 1280 },
          { src: "/obras/residencia/14.jpg", alt: "Recámara con lámpara de anillos", w: 960, h: 1280 },
          { src: "/obras/residencia/25.jpg", alt: "Lámparas colgantes de luz continua", w: 960, h: 1280 },
          { src: "/obras/residencia/30.jpg", alt: "Cine en casa con iluminación perimetral", w: 1280, h: 960 },
          { src: "/obras/residencia/29.jpg", alt: "Sala de cine y bar con luz indirecta", w: 960, h: 1280 },
          { src: "/obras/residencia/01.jpg", alt: "Cocina con lámpara suspendida", w: 1280, h: 960 },
        ],
      },
    ],
  },
  {
    slug: "almacen",
    title: "Almacén",
    type: "Industrial",
    scope: "Electricidad",
    summary: "Nave de almacenamiento con iluminación de altura a todo lo largo, lista para operar con racks.",
    cover: { src: "/obras/almacen/02.jpg", alt: "Nave con racks e iluminación de altura", w: 960, h: 1280 },
    gallery: [
      {
        title: "Terminado",
        photos: [
          { src: "/obras/almacen/02.jpg", alt: "Nave con racks e iluminación de altura", w: 960, h: 1280 },
          { src: "/obras/almacen/01.jpg", alt: "Iluminación a lo largo de la nave", w: 960, h: 1280 },
          { src: "/obras/almacen/03.jpg", alt: "Nave lista para operación", w: 960, h: 1280 },
        ],
      },
    ],
    videos: [
      { src: "/obras/almacen/video-01.mp4", webm: "/obras/almacen/video-01.webm", poster: "/obras/almacen/video-01.jpg", alt: "Recorrido en video: Almacén", w: 576, h: 1024 },
    ],
  }
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

/** Servicios que cubre una obra, a partir de su alcance ("Plomería + Electricidad"). */
export function projectCategories(project: Project): Category[] {
  return project.scope
    .split("+")
    .map((name) => categories.find((c) => c.name === name.trim()))
    .filter((c): c is Category => c !== undefined);
}

/* ------------------------------ Empresa ------------------------------ */

export const principles = [
  { n: "01", title: "Tu patrimonio primero.", text: "No hacemos nada que ponga en riesgo la instalación o tu inversión, aunque nos lo pidan. Trabajamos con unidad de verificación (UVIE) y personal con constancias DC-3 y procedimientos LOTO." },
  { n: "02", title: "Seguimiento constante.", text: "Visitamos la obra antes de cotizar y, durante la ejecución, te enviamos reportes de avance y fotos y nos vemos en obra. Siempre sabes cómo va tu proyecto." },
  { n: "03", title: "Un solo equipo.", text: "Electricidad y plomería con ingenieros y cuadrillas propias. Un responsable para tu arquitecto y tu residente, sin pendientes entre oficios." },
];

/* Respaldo en /quienes-somos (entrevista con HHM, sep. 2026). */
export const credentials = [
  { title: "Unidad de verificación (UVIE)", text: "Las instalaciones eléctricas se verifican con una unidad acreditada." },
  { title: "Constancias DC-3", text: "Personal capacitado y con constancias de competencias laborales." },
  { title: "Procedimientos LOTO", text: "Bloqueo y etiquetado de energía para trabajar sin riesgos." },
  { title: "Facturación", text: "Cobro por anticipo y estimaciones, con factura." },
];

/*
 * Equipo en /quienes-somos. Vacío = la sección no se muestra.
 * TODO (HHM): nombres, puestos y retratos reales. Formato:
 *   { name: "Nombre Apellido", role: "Dirección", image: "/equipo/nombre.jpg" },
 */
export const team: { name: string; role: string; image?: string }[] = [];

/* ------------------------ Preguntas frecuentes ------------------------ */

/*
 * Respuestas basadas en la entrevista con HHM (sep. 2026). Aparecen en el
 * inicio (antes del CTA de cotización) y en /cotizar.
 */
export const faqs: { q: string; a: string }[] = [
  {
    q: "¿En qué zona trabajan?",
    a: "Nuestra base es el área metropolitana de Monterrey, pero también tomamos proyectos en el resto del país: cuéntanos dónde está tu obra y lo revisamos al cotizar. Ya hemos trabajado en ciudades como Saltillo y Mazatlán.",
  },
  {
    q: "¿Cuánto tardan en cotizar?",
    a: "Depende de la complejidad del proyecto: de unos días a algunas semanas. Antes de cotizar visitamos la obra para proponerte un alcance basado en lo que realmente hay.",
  },
  {
    q: "¿Qué necesito para pedir una cotización?",
    a: "Si tienes planos (PDF, DWG o RVT), súbelos en el cotizador o mándalos por WhatsApp. Si todavía no los tienes, cuéntanos el tipo de proyecto, los metros cuadrados aproximados y la etapa en la que está.",
  },
  {
    q: "¿Hacen electricidad y plomería en la misma obra?",
    a: "Sí. Las dos instalaciones las lleva el mismo equipo de ingenieros y cuadrillas propias, y también hacemos el proyecto ejecutivo: memorias de cálculo, planos, coordinación BIM y planos as-built.",
  },
  {
    q: "¿Trabajan con arquitectos y constructoras?",
    a: "Sí. La mayoría de nuestros proyectos llegan a través de despachos de arquitectura. Coordinamos con el arquitecto y con el residente de obra durante toda la ejecución.",
  },
  {
    q: "¿Cómo me mantienen informado durante la obra?",
    a: "Con reportes de avance, fotos y visitas o citas en obra. Siempre sabes cómo va tu proyecto y quién es el responsable.",
  },
  {
    q: "¿Cómo se paga? ¿Facturan?",
    a: "Trabajamos con anticipo y estimaciones conforme avanza la obra. Sí facturamos.",
  },
  {
    q: "¿Dan garantía?",
    a: "Sí. El plazo depende de la obra; por lo general es de 3 meses y te lo confirmamos al cotizar.",
  },
  {
    q: "¿Atienden urgencias y mantenimiento?",
    a: "Sí, para las instalaciones que hicimos nosotros: revisiones preventivas, urgencias y adecuaciones. Nuestro enfoque principal son los proyectos nuevos.",
  },
  {
    q: "¿Hacen instalaciones contra incendio?",
    a: "No. Nos especializamos en instalaciones eléctricas, hidrosanitarias y de gas.",
  },
];

/* ---------------------------- Cotización ---------------------------- */

export const quoteSteps = [
  { key: "tipo", label: "Proyecto", question: "¿Qué vamos a construir?", options: ["Casa habitación", "Edificio residencial", "Oficinas", "Comercio o restaurante", "Industrial", "Remodelación"] },
  { key: "alcance", label: "Instalaciones", multi: true, question: "¿Qué instalaciones necesitas?", options: ["Plomería", "Electricidad", "Proyecto ejecutivo", "Mantenimiento"] },
  { key: "m2", label: "Superficie", question: "¿Cuántos m² de construcción, aprox.?", options: ["Menos de 500 m²", "500 – 2,000 m²", "2,000 – 10,000 m²", "Más de 10,000 m²"] },
  { key: "etapa", label: "Etapa", question: "¿En qué etapa está?", options: ["Anteproyecto", "Proyecto ejecutivo", "En obra", "Operación / mantenimiento"] },
  { key: "planos", label: "Planos", question: "Sube tus planos y dinos cómo contactarte.", options: [] },
] as const;
