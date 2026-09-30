import type { CSSProperties, ReactNode } from "react";

/**
 * Fondo del hero: un plano de instalaciones que se dibuja solo.
 * - Arriba a la izquierda, la planta con muros, luminarias, muebles de baño,
 *   cisterna y la línea de agua fría.
 * - Arriba al centro y a la derecha, el diagrama unifilar: acometida,
 *   transformador, interruptor general, tablero, circuitos y planta de
 *   emergencia.
 * - En la columna derecha, cuadro de cargas y cuadro de datos.
 * La zona del titular (abajo a la izquierda) y la de los botones (abajo a
 * la derecha) quedan despejadas.
 * El dibujo (x 0–1600) escala con la altura del hero y va centrado: en
 * pantallas anchas mantiene su tamaño y la cuadrícula se extiende a los
 * lados. En móvil se oculta: ahí se usa HeroBlueprintMobile, en su propia
 * franja arriba del titular.
 *
 * Solo SVG y CSS (clases .bp-* en globals.css): no usa JavaScript, se ve
 * nítido en cualquier pantalla y con "reducir movimiento" aparece completo.
 */
export default function HeroBlueprint() {
  return (
    <svg
      viewBox="-800 0 3200 800"
      className="absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 max-md:hidden"
      style={{ aspectRatio: "4 / 1" }}
      aria-hidden="true"
    >
      <defs>
        <pattern id="bp-minor" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="fill-none stroke-white/[0.05]" />
        </pattern>
        <pattern id="bp-major" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M100 0H0V100" className="fill-none stroke-white/[0.09]" />
        </pattern>
      </defs>
      <rect x="-800" width="3200" height="800" fill="url(#bp-minor)" />
      <rect x="-800" width="3200" height="800" fill="url(#bp-major)" />

      <FloorPlan />
      <SingleLine />
      <Schedules />

      {/* Pulsos: corriente y agua recorriendo las líneas una vez dibujadas */}
      <Pulse d="M720 24V180H1480" delay={3.4} period={3.2} />
      <Pulse d="M1180 180V256" delay={4.2} period={2.4} />
      <Pulse d="M1420 86V180" delay={5} period={4} />
      <Pulse d="M460 276H412V222H140" delay={3.8} period={3.6} />
    </svg>
  );
}

/* ------------------------------ Planta ------------------------------ */

const lights: [number, number][] = [
  [165, 100], [250, 100], [165, 150], [250, 150],
  [350, 100], [430, 100], [510, 100], [350, 150], [430, 150], [510, 150],
];

function FloorPlan() {
  return (
    <g>
      {/* Muros */}
      <Line d="M110 50H560V300H110Z" delay={0.1} time={1.4} className="stroke-white/45" />
      <Line d="M118 58H552V292H118Z" delay={0.25} time={1.4} className="stroke-white/45" />
      <Line d="M300 58V120M300 160V180" delay={0.5} time={0.6} className="stroke-white/45" />
      <Line d="M118 180H214M254 180H500M540 180H552" delay={0.6} time={0.9} className="stroke-white/45" />
      <Line d="M400 180V292" delay={0.7} time={0.6} className="stroke-white/45" />

      {/* Puertas: hoja y abatimiento */}
      <Line d="M300 160H340A40 40 0 0 0 300 120" delay={0.9} time={0.6} className="stroke-white/30" width={1} />
      <Line d="M214 180V220A40 40 0 0 0 254 180" delay={0.95} time={0.6} className="stroke-white/30" width={1} />
      <Line d="M540 180V220A40 40 0 0 1 500 180" delay={1} time={0.6} className="stroke-white/30" width={1} />

      {/* Luminarias y circuitos de alumbrado */}
      {lights.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <Circle cx={x} cy={y} r={7} delay={1.9 + i * 0.05} className="stroke-navy-200/80" />
          <Line d={`M${x - 5} ${y - 5}L${x + 5} ${y + 5}M${x + 5} ${y - 5}L${x - 5} ${y + 5}`} delay={2 + i * 0.05} time={0.4} className="stroke-navy-200/80" width={1} />
        </g>
      ))}
      <Dashed
        d="M165 100Q207 84 250 100M165 150Q207 134 250 150M165 100Q150 125 165 150M250 150Q300 170 350 150M350 100Q390 84 430 100M430 100Q470 84 510 100M350 150Q390 134 430 150M430 150Q470 134 510 150M510 150Q530 150 542 134"
        delay={2.5}
        className="stroke-navy-200/50"
      />
      <Line d="M542 112H550V138H542Z" delay={2.2} time={0.4} className="stroke-navy-200/80" />

      {/* Sanitarios: excusados, lavabos y regadera */}
      {[150, 200].map((x) => (
        <g key={x}>
          <Line d={`M${x - 14} 276H${x + 14}V286H${x - 14}Z`} delay={2.1} time={0.5} className="stroke-white/55" width={1.2} />
          <Ellipse cx={x} cy={262} rx={10} ry={14} delay={2.15} />
        </g>
      ))}
      {[270, 314].map((x) => (
        <g key={x}>
          <Line d={`M${x} 188H${x + 34}V206H${x}Z`} delay={2.2} time={0.5} className="stroke-white/55" width={1.2} />
          <Ellipse cx={x + 17} cy={197} rx={10} ry={6} delay={2.25} />
        </g>
      ))}
      <Line d="M344 236H392V284H344ZM344 236L392 284M392 236L344 284" delay={2.3} time={0.6} className="stroke-white/55" width={1.2} />

      {/* Cuarto de máquinas: cisterna y bomba */}
      <Dashed d="M412 208H540V256H412Z" delay={2.2} className="stroke-white/45" />
      <Circle cx={470} cy={276} r={10} delay={2.3} className="stroke-white/60" />
      <Text x={470} y={280} delay={2.6} anchor="middle" size={10}>B</Text>

      {/* Agua fría: de la bomba a cada mueble */}
      <Dashed d="M460 276H412V222H140M150 222V248M200 222V248M287 222V206M331 222V206M368 222V236" delay={2.4} className="stroke-navy-200/75" width={1.5} />

      {/* Cotas */}
      <Line d="M110 34H560M110 28V40M560 28V40" delay={1.2} time={0.8} className="stroke-white/30" width={1} />
      <Line d="M92 50V300M86 50H98M86 300H98" delay={1.3} time={0.8} className="stroke-white/30" width={1} />
      <Text x={335} y={26} delay={2.4} anchor="middle">20.00 M</Text>
      <Text x={84} y={175} delay={2.4} anchor="middle" rotate>12.00 M</Text>

      {/* Rótulos */}
      <Text x={126} y={74} delay={2.6}>01 · OFICINA</Text>
      <Text x={310} y={74} delay={2.65}>02 · ÁREA ABIERTA</Text>
      <Text x={126} y={198} delay={2.7}>03 · SANITARIOS</Text>
      <Text x={408} y={198} delay={2.75}>04 · MÁQUINAS</Text>
      <Text x={426} y={236} delay={2.8}>CISTERNA 10 M³</Text>
      <Text x={232} y={216} delay={2.85} className="fill-navy-200/70">AF Ø 1&quot;</Text>
    </g>
  );
}

/* ------------------------- Diagrama unifilar ------------------------- */

type Load = "lamp" | "outlet" | "motor";
const circuits: { x: number; id: string; amps: string; load: Load; mark?: string }[] = [
  { x: 780, id: "C-1", amps: "20 A", load: "lamp" },
  { x: 860, id: "C-2", amps: "20 A", load: "outlet" },
  { x: 940, id: "C-3", amps: "30 A", load: "motor", mark: "M" },
  { x: 1020, id: "C-4", amps: "20 A", load: "lamp" },
  { x: 1100, id: "C-5", amps: "20 A", load: "outlet" },
  { x: 1180, id: "C-6", amps: "40 A", load: "motor", mark: "B" },
  { x: 1260, id: "C-7", amps: "15 A", load: "outlet" },
];

function SingleLine() {
  const line = "stroke-navy-100/80";
  return (
    <g>
      {/* Acometida, transformador e interruptor general */}
      <Line d="M720 24V70" delay={0.3} time={0.5} className={line} />
      <Circle cx={720} cy={86} r={16} delay={0.55} className={line} />
      <Circle cx={720} cy={108} r={16} delay={0.65} className={line} />
      <Line d="M720 124V140" delay={0.8} time={0.3} className={line} />
      <Line d="M712 140H728V156H712ZM712 156L728 140" delay={0.9} time={0.4} className={line} />
      <Line d="M720 156V180" delay={1} time={0.3} className={line} />

      {/* Tablero general y tierra física */}
      <Line d="M680 180H1480" delay={1.1} time={1.1} className="stroke-white/80" width={3} />
      <Line d="M680 180V210M668 210H692M673 217H687M678 224H682" delay={1.6} time={0.5} className={line} />

      {/* Planta de emergencia y transferencia */}
      <Circle cx={1420} cy={70} r={16} delay={0.6} className={line} />
      <Text x={1420} y={74} delay={1.2} anchor="middle" size={11}>G</Text>
      <Line d="M1420 86V132" delay={0.9} time={0.4} className={line} />
      <Line d="M1410 132H1430V152H1410Z" delay={1.05} time={0.4} className={line} />
      <Text x={1420} y={145} delay={1.4} anchor="middle" size={8}>TA</Text>
      <Line d="M1420 152V180" delay={1.15} time={0.3} className={line} />

      {/* Circuitos derivados */}
      {circuits.map((c, i) => {
        const d0 = 1.7 + i * 0.08;
        return (
          <g key={c.id}>
            <Line d={`M${c.x} 180V200`} delay={d0} time={0.3} className={line} />
            <Line d={`M${c.x} 200a9 9 0 0 1 0 18`} delay={d0 + 0.1} time={0.3} className={line} />
            <Line d={`M${c.x} 218V256`} delay={d0 + 0.2} time={0.4} className={line} />
            <LoadSymbol x={c.x} y={268} load={c.load} mark={c.mark} delay={d0 + 0.5} />
            <Text x={c.x + 9} y={211} delay={d0 + 0.8} size={10}>{c.id}</Text>
            <Text x={c.x + 9} y={242} delay={d0 + 0.85} size={10} className="fill-white/35">{c.amps}</Text>
          </g>
        );
      })}

      {/* Rótulos */}
      <Text x={734} y={44} delay={1.8}>ACOMETIDA · 13.2 KV</Text>
      <Text x={744} y={101} delay={1.9}>TR-1 · 150 KVA</Text>
      <Text x={738} y={152} delay={2}>ITM 3×400 A</Text>
      <Text x={1010} y={170} delay={2.1}>TG-1 · 220/127 V · 3F-4H</Text>
      <Text x={1398} y={74} delay={2.2} anchor="end">PE-1 · 80 KW</Text>
    </g>
  );
}

function LoadSymbol({ x, y, load, mark, delay }: { x: number; y: number; load: Load; mark?: string; delay: number }) {
  const cls = "stroke-navy-200/80";
  if (load === "lamp") {
    return (
      <g>
        <Circle cx={x} cy={y} r={11} delay={delay} className={cls} />
        <Line d={`M${x - 8} ${y - 8}L${x + 8} ${y + 8}M${x + 8} ${y - 8}L${x - 8} ${y + 8}`} delay={delay + 0.1} time={0.4} className={cls} width={1} />
      </g>
    );
  }
  if (load === "outlet") {
    return (
      <g>
        <Circle cx={x} cy={y} r={10} delay={delay} className={cls} />
        <Line d={`M${x - 4} ${y - 5}V${y + 5}M${x + 4} ${y - 5}V${y + 5}`} delay={delay + 0.1} time={0.3} className={cls} width={1.2} />
      </g>
    );
  }
  return (
    <g>
      <Circle cx={x} cy={y} r={12} delay={delay} className={cls} />
      <Text x={x} y={y + 4} delay={delay + 0.2} anchor="middle" size={11} className="fill-navy-200/80">
        {mark}
      </Text>
    </g>
  );
}

/* ------------------- Cuadro de cargas y cuadro de datos ------------------- */

const schedule = [
  ["C-1", "ALUMBRADO", "1,800 W"],
  ["C-2", "CONTACTOS", "2,400 W"],
  ["C-3", "EQUIPOS", "3,500 W"],
  ["C-4", "ALUMB. EXT.", "1,200 W"],
  ["C-5", "CONTACTOS", "2,000 W"],
  ["C-6", "BOMBEO", "2,200 W"],
  ["C-7", "RESERVA", "—"],
];

function Schedules() {
  const frame = "stroke-white/35";
  return (
    <g>
      <Line d="M1300 230H1480V410H1300ZM1300 254H1480M1336 230V410M1418 230V410" delay={2.2} time={1} className={frame} width={1} />
      <Text x={1306} y={247} delay={2.8} size={9}>CTO</Text>
      <Text x={1342} y={247} delay={2.8} size={9}>DESCRIPCIÓN</Text>
      <Text x={1424} y={247} delay={2.8} size={9}>CARGA</Text>
      {schedule.map(([id, desc, load], i) => (
        <g key={id}>
          <Text x={1306} y={272 + i * 20} delay={2.9 + i * 0.05} size={9} className="fill-white/40">{id}</Text>
          <Text x={1342} y={272 + i * 20} delay={2.9 + i * 0.05} size={9} className="fill-white/40">{desc}</Text>
          <Text x={1424} y={272 + i * 20} delay={2.9 + i * 0.05} size={9} className="fill-white/40">{load}</Text>
        </g>
      ))}

      <Line d="M1300 430H1480V530H1300ZM1300 466H1480M1300 506H1480" delay={2.4} time={1} className={frame} width={1} />
      <Text x={1310} y={454} delay={3} size={12} className="fill-white/70 font-bold">HHM PROYECTOS</Text>
      <Text x={1310} y={482} delay={3.05} size={9}>INSTALACIONES ELÉCTRICAS</Text>
      <Text x={1310} y={495} delay={3.05} size={9}>E HIDROSANITARIAS</Text>
      <Text x={1310} y={522} delay={3.1} size={9}>IE-01 · ESC 1:100 · REV A</Text>
    </g>
  );
}

/* ------------------------------ Primitivas ------------------------------ */

const timing = (delay: number, time?: number) =>
  ({ "--d": `${delay}s`, ...(time ? { "--t": `${time}s` } : {}) }) as CSSProperties;

/** Trazo que se dibuja de principio a fin. */
function Line({
  d,
  delay,
  time = 1,
  className,
  width = 1.5,
}: {
  d: string;
  delay: number;
  time?: number;
  className: string;
  width?: number;
}) {
  return (
    <path
      d={d}
      pathLength={1}
      className={`bp-draw fill-none ${className}`}
      strokeWidth={width}
      strokeLinejoin="round"
      style={timing(delay, time)}
    />
  );
}

function Circle({ cx, cy, r, delay, className }: { cx: number; cy: number; r: number; delay: number; className: string }) {
  return (
    <circle cx={cx} cy={cy} r={r} pathLength={1} className={`bp-draw fill-none ${className}`} strokeWidth={1.5} style={timing(delay, 0.6)} />
  );
}

function Ellipse({ cx, cy, rx, ry, delay }: { cx: number; cy: number; rx: number; ry: number; delay: number }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      pathLength={1}
      className="bp-draw fill-none stroke-white/55"
      strokeWidth={1.2}
      style={timing(delay, 0.5)}
    />
  );
}

/** Línea punteada (tuberías y circuitos): aparece con un desvanecido. */
function Dashed({ d, delay, className, width = 1 }: { d: string; delay: number; className: string; width?: number }) {
  return (
    <path d={d} className={`bp-fade fill-none ${className}`} strokeWidth={width} strokeDasharray="4 4" style={timing(delay)} />
  );
}

function Text({
  x,
  y,
  delay,
  children,
  size = 11,
  anchor = "start",
  rotate = false,
  className = "fill-white/50",
}: {
  x: number;
  y: number;
  delay: number;
  children: ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  rotate?: boolean;
  className?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      letterSpacing={size >= 11 ? 1.5 : 1}
      textAnchor={anchor}
      transform={rotate ? `rotate(-90 ${x} ${y})` : undefined}
      className={`bp-fade font-mono ${className}`}
      style={timing(delay)}
    >
      {children}
    </text>
  );
}

/** Destello que recorre una línea en bucle. */
function Pulse({ d, delay, period }: { d: string; delay: number; period: number }) {
  return (
    <path
      d={d}
      pathLength={1}
      className="bp-pulse fill-none stroke-white"
      strokeWidth={2.5}
      strokeLinecap="round"
      style={timing(delay, period)}
    />
  );
}

/* ------------------------------ Versión móvil ------------------------------ */

/**
 * Plano compacto para móvil: va en su propia franja arriba del titular, a
 * intensidad completa, con el unifilar, una planta de sanitarios y el cuadro
 * de datos. Usa las mismas animaciones que la versión de escritorio.
 */
export function HeroBlueprintMobile() {
  const line = "stroke-navy-100/80";
  const loads: { x: number; id: string; amps: string; load: Load; mark?: string }[] = [
    { x: 104, id: "C-1", amps: "20 A", load: "lamp" },
    { x: 160, id: "C-2", amps: "20 A", load: "outlet" },
    { x: 216, id: "C-3", amps: "30 A", load: "motor", mark: "M" },
    { x: 272, id: "C-4", amps: "40 A", load: "motor", mark: "B" },
  ];
  return (
    <svg viewBox="0 0 400 262" className="block h-auto w-full" aria-hidden="true">
      <defs>
        <pattern id="bpm-minor" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M10 0H0V10" className="fill-none stroke-white/[0.05]" />
        </pattern>
        <pattern id="bpm-major" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M50 0H0V50" className="fill-none stroke-white/[0.09]" />
        </pattern>
      </defs>
      <rect width="400" height="262" fill="url(#bpm-minor)" />
      <rect width="400" height="262" fill="url(#bpm-major)" />

      {/* Unifilar: acometida, transformador, interruptor y tablero */}
      <Line d="M56 8V36" delay={0.2} time={0.4} className={line} />
      <Circle cx={56} cy={47} r={11} delay={0.45} className={line} />
      <Circle cx={56} cy={63} r={11} delay={0.55} className={line} />
      <Line d="M56 74V84" delay={0.7} time={0.2} className={line} />
      <Line d="M50 84H62V96H50ZM50 96L62 84" delay={0.8} time={0.3} className={line} />
      <Line d="M56 96V112" delay={0.9} time={0.2} className={line} />
      <Line d="M30 112H382" delay={1} time={1} className="stroke-white/80" width={2.5} />
      <Line d="M30 112V126M22 126H38M25.5 131H34.5M28.5 136H31.5" delay={1.4} time={0.4} className={line} width={1.2} />

      {/* Planta de emergencia */}
      <Circle cx={344} cy={34} r={11} delay={0.5} className={line} />
      <Text x={344} y={37.5} delay={1.1} anchor="middle" size={9}>G</Text>
      <Line d="M344 45V70" delay={0.8} time={0.3} className={line} />
      <Line d="M337 70H351V84H337Z" delay={0.95} time={0.3} className={line} />
      <Text x={344} y={79.5} delay={1.3} anchor="middle" size={6}>TA</Text>
      <Line d="M344 84V112" delay={1.05} time={0.2} className={line} />

      {/* Circuitos */}
      {loads.map((c, i) => {
        const d0 = 1.5 + i * 0.1;
        return (
          <g key={c.id}>
            <Line d={`M${c.x} 112V122`} delay={d0} time={0.2} className={line} />
            <Line d={`M${c.x} 122a6 6 0 0 1 0 12`} delay={d0 + 0.1} time={0.25} className={line} />
            <Line d={`M${c.x} 134V158`} delay={d0 + 0.2} time={0.3} className={line} />
            <MiniLoad x={c.x} y={167} load={c.load} mark={c.mark} delay={d0 + 0.45} />
            <Text x={c.x + 7} y={129} delay={d0 + 0.7} size={7}>{c.id}</Text>
            <Text x={c.x + 7} y={150} delay={d0 + 0.75} size={6.5} className="fill-white/35">{c.amps}</Text>
          </g>
        );
      })}

      {/* Rótulos del unifilar */}
      <Text x={70} y={22} delay={1.6} size={8}>ACOMETIDA · 13.2 KV</Text>
      <Text x={72} y={59} delay={1.7} size={8}>TR-1 · 150 KVA</Text>
      <Text x={68} y={93} delay={1.8} size={8}>ITM 3×400 A</Text>
      <Text x={104} y={105} delay={1.9} size={7.5}>TG-1 · 220/127 V</Text>
      <Text x={328} y={37.5} delay={2} anchor="end" size={8}>PE-1 · 80 KW</Text>

      {/* Planta de sanitarios */}
      <Line d="M16 192H206V252H16Z" delay={0.3} time={1.2} className="stroke-white/45" />
      <Line d="M21 197H201V247H21Z" delay={0.45} time={1.2} className="stroke-white/45" />
      <Line d="M120 197V214M120 234V247" delay={0.8} time={0.4} className="stroke-white/45" />
      <Line d="M120 234H140A20 20 0 0 0 120 214" delay={1} time={0.5} className="stroke-white/30" width={1} />
      {[40, 66].map((x) => (
        <g key={x}>
          <Line d={`M${x - 9} 241H${x + 9}V246H${x - 9}Z`} delay={2} time={0.4} className="stroke-white/55" width={1} />
          <Ellipse cx={x} cy={232} rx={6} ry={8} delay={2.05} />
        </g>
      ))}
      <Line d="M86 200H108V211H86Z" delay={2.1} time={0.4} className="stroke-white/55" width={1} />
      <Ellipse cx={97} cy={205.5} rx={6} ry={3.5} delay={2.15} />
      <Line d="M170 215H196V241H170ZM170 215L196 241M196 215L170 241" delay={2.2} time={0.5} className="stroke-white/55" width={1} />
      <Dashed d="M190 219H34M40 219V224M66 219V224M97 219V211" delay={2.3} className="stroke-navy-200/75" width={1.2} />
      <Text x={16} y={186} delay={2.4} size={7.5}>IH-01 · SANITARIOS</Text>

      {/* Cuadro de datos */}
      <Line d="M222 184H384V252H222ZM222 208H384M222 232H384" delay={1.6} time={0.8} className="stroke-white/35" width={1} />
      <Text x={230} y={200.5} delay={2.4} size={10.5} className="fill-white/75 font-bold">HHM PROYECTOS</Text>
      <Text x={230} y={224} delay={2.5} size={7}>INSTALACIONES ELÉCTRICAS</Text>
      <Text x={230} y={246} delay={2.55} size={7}>IE-01 · ESC 1:100 · REV A</Text>

      <Pulse d="M56 8V112H382" delay={3} period={3} />
      <Pulse d="M216 112V158" delay={3.6} period={2.2} />
      <Pulse d="M190 219H34" delay={3.3} period={3} />
    </svg>
  );
}

function MiniLoad({ x, y, load, mark, delay }: { x: number; y: number; load: Load; mark?: string; delay: number }) {
  const cls = "stroke-navy-200/80";
  if (load === "lamp") {
    return (
      <g>
        <Circle cx={x} cy={y} r={8} delay={delay} className={cls} />
        <Line d={`M${x - 5.5} ${y - 5.5}L${x + 5.5} ${y + 5.5}M${x + 5.5} ${y - 5.5}L${x - 5.5} ${y + 5.5}`} delay={delay + 0.1} time={0.3} className={cls} width={1} />
      </g>
    );
  }
  if (load === "outlet") {
    return (
      <g>
        <Circle cx={x} cy={y} r={8} delay={delay} className={cls} />
        <Line d={`M${x - 3} ${y - 4}V${y + 4}M${x + 3} ${y - 4}V${y + 4}`} delay={delay + 0.1} time={0.3} className={cls} width={1} />
      </g>
    );
  }
  return (
    <g>
      <Circle cx={x} cy={y} r={9} delay={delay} className={cls} />
      <Text x={x} y={y + 3} delay={delay + 0.2} anchor="middle" size={8.5} className="fill-navy-200/80">{mark}</Text>
    </g>
  );
}
