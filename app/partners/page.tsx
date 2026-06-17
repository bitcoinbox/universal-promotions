import type { Metadata } from "next";
import { PartnersView } from "@/components/pages/partners-view";

export const metadata: Metadata = {
  alternates: { canonical: "/partners" },
  title: "Partners",
  description:
    "Sponsor Universal Promotions through event exposure, media reach, brand-safe placements, and post-event recap reporting.",
};

export default function PartnersPage() {
  return <PartnersView />;
}
