import type { LegalDoc } from "@/types";

/**
 * PROTOTYPE LEGAL / COMPLIANCE DOCUMENTS — illustrative sample copy only.
 * These are placeholders to show a credible compliance footer; they are NOT binding legal
 * terms and have not been reviewed by counsel. Replace with real, reviewed policy before
 * production. Contact details use reserved `.example` addresses and are not live.
 */

export const contact = {
  general: "hello@universalpromotions.example",
  press: "press@universalpromotions.example",
  partnerships: "partnerships@universalpromotions.example",
  city: "San Juan, Puerto Rico",
};

const updated = "2026-06-01";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    updated,
    title: { en: "Privacy Policy", es: "Política de Privacidad" },
    summary: {
      en: "What this prototype would collect, how it would be used, and your choices.",
      es: "Qué recopilaría este prototipo, cómo se usaría y tus opciones.",
    },
    sections: [
      {
        heading: { en: "Information we would collect", es: "Información que recopilaríamos" },
        body: {
          en: "In production, contact and credential forms would collect the name, email, organization, and message you submit. This prototype does not transmit or store form submissions — they are validated in your browser and discarded.",
          es: "En producción, los formularios de contacto y credenciales recopilarían el nombre, correo, organización y mensaje que envíes. Este prototipo no transmite ni almacena envíos — se validan en tu navegador y se descartan.",
        },
      },
      {
        heading: { en: "Cookies and storage", es: "Cookies y almacenamiento" },
        body: {
          en: "We use no tracking cookies. Your language preference and the prototype-banner dismissal are stored only in your browser's local storage.",
          es: "No usamos cookies de rastreo. Tu preferencia de idioma y el cierre del aviso de prototipo se guardan solo en el almacenamiento local de tu navegador.",
        },
      },
      {
        heading: { en: "Sharing", es: "Compartir" },
        body: {
          en: "We would never sell your data. Information would be used only to respond to your inquiry.",
          es: "Nunca venderíamos tus datos. La información se usaría solo para responder tu solicitud.",
        },
      },
    ],
  },
  {
    slug: "terms",
    updated,
    title: { en: "Terms of Use", es: "Términos de Uso" },
    summary: {
      en: "The terms that would govern use of this website.",
      es: "Los términos que regirían el uso de este sitio.",
    },
    sections: [
      {
        heading: { en: "Prototype notice", es: "Aviso de prototipo" },
        body: {
          en: "This is an independent design prototype. Rosters, events, sponsors, metrics, and reports are illustrative demo data and are not official records or offers.",
          es: "Este es un prototipo de diseño independiente. Boxeadores, eventos, auspiciadores, métricas y reportes son datos demo ilustrativos y no constituyen registros u ofertas oficiales.",
        },
      },
      {
        heading: { en: "Acceptable use", es: "Uso aceptable" },
        body: {
          en: "Use the site lawfully. Do not attempt to disrupt it, scrape it at scale, or misrepresent its content as official.",
          es: "Usa el sitio de forma lícita. No intentes interrumpirlo, extraer datos a gran escala ni presentar su contenido como oficial.",
        },
      },
      {
        heading: { en: "Intellectual property", es: "Propiedad intelectual" },
        body: {
          en: "Brand names referenced for illustration belong to their owners. Generated visuals are placeholders, not licensed photography.",
          es: "Las marcas referenciadas con fines ilustrativos pertenecen a sus dueños. Los visuales generados son marcadores de posición, no fotografía licenciada.",
        },
      },
    ],
  },
  {
    slug: "event-terms",
    updated,
    title: { en: "Event Terms", es: "Términos de Evento" },
    summary: {
      en: "Sample admission, conduct, and likeness terms for live events.",
      es: "Términos de muestra de admisión, conducta e imagen para eventos en vivo.",
    },
    sections: [
      {
        heading: { en: "Admission", es: "Admisión" },
        body: {
          en: "A valid ticket would be required for entry. Promoters and venues reserve the right to refuse admission for safety or conduct reasons.",
          es: "Se requeriría un boleto válido para entrar. Promotores y sedes se reservan el derecho de admisión por motivos de seguridad o conducta.",
        },
      },
      {
        heading: { en: "Recording and likeness", es: "Grabación e imagen" },
        body: {
          en: "By attending, guests would consent to being filmed or photographed for broadcast and promotional use, consistent with venue policy.",
          es: "Al asistir, los invitados consentirían ser filmados o fotografiados para transmisión y uso promocional, conforme a la política de la sede.",
        },
      },
      {
        heading: { en: "Changes", es: "Cambios" },
        body: {
          en: "Cards are subject to change. Bout, fighter, and undercard changes do not constitute grounds for refund unless required by law.",
          es: "Las carteleras están sujetas a cambios. Los cambios de pelea, boxeador o preliminar no constituyen motivo de reembolso salvo que la ley lo exija.",
        },
      },
    ],
  },
  {
    slug: "media-policy",
    updated,
    title: { en: "Media Policy", es: "Política de Prensa" },
    summary: {
      en: "How credentials, embargoes, and asset rights would work.",
      es: "Cómo funcionarían las credenciales, embargos y derechos de material.",
    },
    sections: [
      {
        heading: { en: "Credentials", es: "Credenciales" },
        body: {
          en: "Accredited press would request credentials per event. Approval is at the promotion's discretion and subject to venue capacity.",
          es: "La prensa acreditada solicitaría credenciales por evento. La aprobación queda a discreción de la promotora y sujeta a la capacidad de la sede.",
        },
      },
      {
        heading: { en: "Asset usage and rights", es: "Uso de material y derechos" },
        body: {
          en: "Official assets would be provided with clear usage rights. Every media record carries a source and a rights status; assets marked reference-only may not be republished without permission.",
          es: "El material oficial se entregaría con derechos de uso claros. Cada registro lleva una fuente y un estatus de derechos; el material marcado solo-referencia no puede republicarse sin permiso.",
        },
      },
      {
        heading: { en: "Embargoes", es: "Embargos" },
        body: {
          en: "Some assets and announcements may carry an embargo time. Please honor it.",
          es: "Algunos materiales y anuncios pueden tener hora de embargo. Por favor respétala.",
        },
      },
    ],
  },
  {
    slug: "code-of-conduct",
    updated,
    title: { en: "Code of Conduct", es: "Código de Conducta" },
    summary: {
      en: "Expectations for fans, fighters, teams, and partners.",
      es: "Expectativas para fanáticos, boxeadores, equipos y socios.",
    },
    sections: [
      {
        heading: { en: "Respect", es: "Respeto" },
        body: {
          en: "Harassment, discrimination, and threats have no place at our events or online channels. Treat staff, fighters, and fans with respect.",
          es: "El acoso, la discriminación y las amenazas no tienen lugar en nuestros eventos ni canales. Trata con respeto al personal, boxeadores y fanáticos.",
        },
      },
      {
        heading: { en: "Integrity of competition", es: "Integridad de la competencia" },
        body: {
          en: "We support clean competition and would comply with the applicable commission's medical and anti-doping requirements.",
          es: "Apoyamos la competencia limpia y cumpliríamos los requisitos médicos y antidopaje de la comisión aplicable.",
        },
      },
      {
        heading: { en: "Venue rules", es: "Reglas de la sede" },
        body: {
          en: "Follow all venue safety rules and the instructions of event staff at all times.",
          es: "Sigue todas las reglas de seguridad de la sede y las instrucciones del personal en todo momento.",
        },
      },
    ],
  },
];

const legalBySlug = new Map(legalDocs.map((d) => [d.slug, d]));

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalBySlug.get(slug);
}
