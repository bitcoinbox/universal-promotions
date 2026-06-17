import type { Metadata } from "next";
import { FightersView } from "@/components/pages/fighters-view";

export const metadata: Metadata = {
  alternates: { canonical: "/fighters" },
  title: "Universal Promotions Roster",
  description: "Twelve Universal Promotions roster profiles with fighter photos, records, bios, media paths, and event context.",
};

export default function FightersPage() {
  return <FightersView />;
}
