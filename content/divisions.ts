import type { Division, DivisionId } from "@/types";

/**
 * Boxing weight classes with bilingual labels. Weight limits are public, standardized
 * facts; nothing here is specific to a real fighter or event.
 */
export const divisions: Record<DivisionId, Division> = {
  flyweight: { id: "flyweight", limitLbs: 112, label: { en: "Flyweight", es: "Peso mosca" } },
  "super-flyweight": {
    id: "super-flyweight",
    limitLbs: 115,
    label: { en: "Super Flyweight", es: "Peso supermosca" },
  },
  bantamweight: { id: "bantamweight", limitLbs: 118, label: { en: "Bantamweight", es: "Peso gallo" } },
  "super-bantamweight": {
    id: "super-bantamweight",
    limitLbs: 122,
    label: { en: "Super Bantamweight", es: "Peso supergallo" },
  },
  featherweight: { id: "featherweight", limitLbs: 126, label: { en: "Featherweight", es: "Peso pluma" } },
  "super-featherweight": {
    id: "super-featherweight",
    limitLbs: 130,
    label: { en: "Super Featherweight", es: "Peso superpluma" },
  },
  lightweight: { id: "lightweight", limitLbs: 135, label: { en: "Lightweight", es: "Peso ligero" } },
  "super-lightweight": {
    id: "super-lightweight",
    limitLbs: 140,
    label: { en: "Super Lightweight", es: "Peso superligero" },
  },
  welterweight: { id: "welterweight", limitLbs: 147, label: { en: "Welterweight", es: "Peso wélter" } },
  middleweight: { id: "middleweight", limitLbs: 160, label: { en: "Middleweight", es: "Peso mediano" } },
};

/** Divisions in canonical (lightest → heaviest) order, for filters and listings. */
export const divisionOrder: DivisionId[] = [
  "flyweight",
  "super-flyweight",
  "bantamweight",
  "super-bantamweight",
  "featherweight",
  "super-featherweight",
  "lightweight",
  "super-lightweight",
  "welterweight",
  "middleweight",
];
