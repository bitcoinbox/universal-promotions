import type { Dictionary } from "@/content/dictionary";

export type NavItem = {
  href: string;
  /** Key into `dictionary.nav`. */
  key: keyof Dictionary["nav"];
};

/** Primary site navigation (Home is reached via the wordmark). */
export const navItems: NavItem[] = [
  { href: "/events", key: "events" },
  { href: "/fighters", key: "fighters" },
  { href: "/partners", key: "partners" },
  { href: "/media", key: "media" },
  { href: "/fight-ops", key: "fightOps" },
];
