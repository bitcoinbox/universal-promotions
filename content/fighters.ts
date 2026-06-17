import type { Fighter, Bout, FightRecord } from "@/types";

/**
 * UNIVERSAL PROMOTIONS ROSTER.
 * Public-facing fighter profiles for the pitch site. Verified records/photos are included
 * where already sourced; otherwise the profile stays intentionally conservative instead of
 * inventing stats. Bios are short editorial hooks, not official copy.
 */
export const fighters: Fighter[] = [
  {
    slug: "olajuwon-acosta",
    name: "Olajuwon Acosta",
    tagline: {
      en: "Undefeated super flyweight champion out of Mayagüez.",
      es: "Campeón supermosca invicto de Mayagüez.",
    },
    status: "champion",
    division: "super-flyweight",
    hometown: "Mayagüez, PR",
    record: { wins: 14, losses: 0, draws: 0, ko: 9 },
    hue: 210,
    imageSrc: "/media/universal/fighters/olajuwon-acosta.jpg",
    imageFocus: "50% 14%",
    bio: {
      en: "Undefeated out of Mayagüez, Acosta captured the WBA Continental Americas super flyweight title with the performance of his career and has stopped nine opponents on the way up.",
      es: "Invicto y oriundo de Mayagüez, Acosta conquistó el título supermosca Continental Américas de la AMB con la mejor actuación de su carrera y ha noqueado a nueve rivales en su ascenso.",
    },
  },
  {
    slug: "orlando-gonzalez",
    name: "Orlando González",
    nickname: { en: "Capu", es: "Capu" },
    tagline: {
      en: "Aguadilla's golden southpaw at super featherweight.",
      es: "El zurdo de oro de Aguadilla en superpluma.",
    },
    status: "active",
    division: "super-featherweight",
    stance: "southpaw",
    hometown: "Aguadilla, PR",
    age: 30,
    record: { wins: 23, losses: 3, draws: 0, ko: 13 },
    hue: 40,
    imageSrc: "/media/universal/fighters/orlando-gonzalez.jpg",
    imageFocus: "46% 12%",
    bio: {
      en: "An Aguadilla southpaw with more than two dozen professional wins, González has held a WBA regional super featherweight title and shared the ring with world-level opposition.",
      es: "Zurdo de Aguadilla con más de dos docenas de victorias profesionales, González ha sido campeón regional superpluma de la AMB y ha compartido el ring con rivales de nivel mundial.",
    },
  },
  {
    slug: "stephanie-pineiro",
    name: "Stephanie Piñeiro",
    nickname: { en: "The Medicine", es: "La Medicina" },
    tagline: {
      en: "Bayamón's welterweight champion who fights anyone.",
      es: "La campeona wélter de Bayamón que pelea con cualquiera.",
    },
    status: "champion",
    division: "welterweight",
    stance: "southpaw",
    hometown: "Bayamón, PR",
    age: 35,
    record: { wins: 10, losses: 1, draws: 0, ko: 3 },
    hue: 286,
    imageSrc: "/media/universal/fighters/stephanie-pineiro.jpg",
    imageFocus: "52% 10%",
    bio: {
      en: "“La Medicina” turned pro in 2019 and ran to an interim WBA welterweight title before challenging at the very top of the division — a southpaw who brings pressure for a full ten rounds.",
      es: "“La Medicina” debutó como profesional en 2019 y llegó a ser campeona interina wélter de la AMB antes de retar en la cima de la división — una zurda que presiona los diez asaltos completos.",
    },
    social: { instagram: "https://www.instagram.com/spineiro20/" },
  },
  {
    slug: "kiria-tapia",
    name: "Kiria Tapia",
    tagline: {
      en: "Undefeated San Juan prospect on the rise.",
      es: "Prospecto invicto de San Juan en ascenso.",
    },
    status: "prospect",
    division: "super-featherweight",
    stance: "southpaw",
    hometown: "San Juan, PR",
    record: { wins: 9, losses: 0, draws: 0, ko: 1 },
    hue: 156,
    imageSrc: "/media/universal/fighters/kiria-tapia.jpg",
    imageFocus: "50% 24%",
    bio: {
      en: "An undefeated San Juan prospect climbing the WBA super featherweight rankings, Tapia fights at home with the island behind her.",
      es: "Prospecto invicto de San Juan que escala el escalafón superpluma de la AMB, Tapia pelea en casa con la isla a su lado.",
    },
    social: { instagram: "https://www.instagram.com/kiriatapia/" },
  },
  {
    slug: "bryan-perez",
    name: "Bryan Pérez",
    tagline: {
      en: "Puerto Rican fighter featured in Universal Promotions TV full-fight coverage.",
      es: "Boxeador puertorriqueño destacado en peleas completas de Universal Promotions TV.",
    },
    status: "active",
    division: "lightweight",
    hometown: "Puerto Rico",
    hue: 16,
    imageSrc: "/media/universal/fighters/bryan-perez.jpg",
    imageFocus: "48% 18%",
    bio: {
      en: "Pérez belongs in the public roster experience because fans already discover him through Universal's official fight archive. His profile can connect full fights, clips, and future booking details in one place.",
      es: "Pérez debe estar en la experiencia pública del roster porque los fanáticos ya lo descubren en el archivo oficial de peleas de Universal. Su perfil puede conectar peleas completas, clips y detalles de próximas carteleras en un solo lugar.",
    },
  },
  {
    slug: "johniel-ramos",
    name: "Johniel Ramos",
    tagline: {
      en: "Puerto Rican fighter with full-fight archive presence on Universal Promotions TV.",
      es: "Boxeador puertorriqueño con presencia en el archivo de peleas completas de Universal Promotions TV.",
    },
    status: "active",
    division: "super-featherweight",
    hometown: "Puerto Rico",
    hue: 34,
    imageSrc: "/media/universal/fighters/johniel-ramos.jpg",
    imageFocus: "50% 18%",
    bio: {
      en: "Ramos gives the roster page another real fight-night profile fans can browse from the official video library, with space for highlights, results, and ticket paths as the system grows.",
      es: "Ramos le da al roster otro perfil real de noche de pelea que los fanáticos pueden explorar desde la videoteca oficial, con espacio para highlights, resultados y boletos según crezca el sistema.",
    },
  },
  {
    slug: "giovan-melendez",
    name: "Giovan Meléndez",
    tagline: {
      en: "Action fighter represented in Universal Promotions TV's current full-fight catalog.",
      es: "Boxeador de acción representado en el catálogo actual de peleas completas de Universal Promotions TV.",
    },
    status: "active",
    division: "lightweight",
    hometown: "Puerto Rico",
    hue: 92,
    imageSrc: "/media/universal/fighters/giovan-melendez.jpg",
    imageFocus: "50% 16%",
    bio: {
      en: "Meléndez is part of the fight archive that can become a richer fighter database: profile, video, event history, and sponsor-ready storytelling tied together.",
      es: "Meléndez forma parte del archivo de peleas que puede convertirse en una base de datos más completa: perfil, video, historial de eventos e historias listas para auspiciadores.",
    },
  },
  {
    slug: "denis-caban",
    name: "Denis Cabán",
    tagline: {
      en: "Puerto Rican fighter from the Universal Promotions TV fight archive.",
      es: "Boxeador puertorriqueño del archivo de peleas de Universal Promotions TV.",
    },
    status: "active",
    division: "bantamweight",
    hometown: "Puerto Rico",
    hue: 178,
    imageSrc: "/media/universal/fighters/denis-caban.jpg",
    imageFocus: "42% 18%",
    bio: {
      en: "Cabán's profile turns a single full-fight upload into a reusable roster asset, giving fans and media a clean place to follow his appearances.",
      es: "El perfil de Cabán convierte una pelea completa en un activo reutilizable del roster, dándole a fanáticos y medios un lugar claro para seguir sus apariciones.",
    },
  },
  {
    slug: "mathew-soto",
    name: "Mathew Soto",
    nickname: { en: "Sugar Kid", es: "Sugar Kid" },
    tagline: {
      en: "Puerto Rican prospect featured across Universal Promotions fight content.",
      es: "Prospecto puertorriqueño destacado en contenido de pelea de Universal Promotions.",
    },
    status: "prospect",
    division: "welterweight",
    hometown: "Puerto Rico",
    hue: 202,
    imageSrc: "/media/universal/fighters/mathew-soto.jpg",
    imageFocus: "50% 14%",
    bio: {
      en: "Soto is built for a modern prospect profile: archive footage, sharp positioning, and a direct path from highlight discovery to future fight-night promotion.",
      es: "Soto encaja con un perfil moderno de prospecto: archivo de video, posicionamiento claro y un camino directo desde el highlight hasta la próxima noche de pelea.",
    },
  },
  {
    slug: "raul-sosa",
    name: "Raúl Sosa",
    tagline: {
      en: "Puerto Rican fighter featured on Universal Promotions TV.",
      es: "Boxeador puertorriqueño destacado en Universal Promotions TV.",
    },
    status: "active",
    division: "super-lightweight",
    hometown: "Puerto Rico",
    hue: 226,
    imageSrc: "/media/universal/fighters/raul-sosa.jpg",
    imageFocus: "50% 15%",
    bio: {
      en: "Sosa gives the roster another fight-video anchor: a profile that can pull together full fights, clips, results, and event context without burying him in a feed.",
      es: "Sosa suma otro punto de anclaje de video al roster: un perfil que puede unir peleas completas, clips, resultados y contexto de eventos sin perderlo dentro de un feed.",
    },
  },
  {
    slug: "yadriel-caban",
    name: "Yadriel Cabán",
    tagline: {
      en: "Puerto Rican fighter represented in Universal's official full-fight uploads.",
      es: "Boxeador puertorriqueño representado en las peleas completas oficiales de Universal.",
    },
    status: "active",
    division: "super-lightweight",
    hometown: "Puerto Rico",
    hue: 254,
    imageSrc: "/media/universal/fighters/yadriel-caban.jpg",
    imageFocus: "48% 18%",
    bio: {
      en: "Cabán's profile rounds out the public roster with a direct connection to Universal's owned video channel and future fight-night storytelling.",
      es: "El perfil de Cabán completa el roster público con una conexión directa al canal propio de Universal y a futuras historias de noche de pelea.",
    },
  },
  {
    slug: "william-colon",
    name: "William Colón",
    nickname: { en: "Yeyo", es: "Yeyo" },
    tagline: {
      en: "Puerto Rican fighter with a strong archive presence on Universal Promotions TV.",
      es: "Boxeador puertorriqueño con fuerte presencia de archivo en Universal Promotions TV.",
    },
    status: "active",
    division: "lightweight",
    hometown: "Puerto Rico",
    hue: 336,
    imageSrc: "/media/universal/fighters/william-colon.jpg",
    imageFocus: "50% 16%",
    bio: {
      en: "“Yeyo” is the kind of recognizable fight personality the site should make easy to follow: full fights, highlights, interviews, and event context under one clean profile.",
      es: "“Yeyo” es el tipo de personalidad boxística que el sitio debe hacer fácil de seguir: peleas completas, highlights, entrevistas y contexto de eventos bajo un perfil claro.",
    },
  },
];

const fightersBySlug = new Map(fighters.map((f) => [f.slug, f]));

export function getFighter(slug?: string): Fighter | undefined {
  if (!slug) return undefined;
  return fightersBySlug.get(slug);
}

/**
 * A resolved bout side: a roster fighter (with `slug`, links to a profile + photo) OR an
 * inline opponent (name + optional record, no profile). Lets events feature real opponents
 * without adding every opponent to the roster.
 */
export type BoutSide = {
  name: string;
  record?: FightRecord;
  slug?: string;
  imageSrc?: string;
  imageFocus?: string;
  hue: number;
};

export function boutSide(bout: Bout, corner: "red" | "blue"): BoutSide | undefined {
  const slug = corner === "red" ? bout.redSlug : bout.blueSlug;
  const f = slug ? getFighter(slug) : undefined;
  if (f) {
    return { name: f.name, record: f.record, slug: f.slug, imageSrc: f.imageSrc, imageFocus: f.imageFocus, hue: f.hue };
  }
  const name = corner === "red" ? bout.redName : bout.blueName;
  if (!name) return undefined;
  return {
    name,
    record: corner === "red" ? bout.redRecord : bout.blueRecord,
    hue: corner === "red" ? 222 : 354,
  };
}

/** Did this side win the bout? Works for roster (slug) and inline (name) winners. */
export function boutWon(bout: Bout, side: BoutSide): boolean {
  if (!bout.result) return false;
  if (side.slug && bout.result.winnerSlug) return bout.result.winnerSlug === side.slug;
  if (bout.result.winnerName) return bout.result.winnerName === side.name;
  return false;
}
