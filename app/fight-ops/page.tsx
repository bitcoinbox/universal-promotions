import type { Metadata } from "next";
import { FightOpsView } from "@/components/pages/fight-ops-view";

export const metadata: Metadata = {
  alternates: { canonical: "/fight-ops" },
  title: "Fight Ops",
  description:
    "A fight-operations platform preview for Universal Promotions: event management, fighter pipeline, sponsor inventory, ticketing metrics, media assets, and post-event reports.",
};

export default function FightOpsPage() {
  return <FightOpsView />;
}
