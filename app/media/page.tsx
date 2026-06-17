import type { Metadata } from "next";
import { MediaView } from "@/components/pages/media-view";

export const metadata: Metadata = {
  alternates: { canonical: "/media" },
  title: "Fight Media Vault",
  description:
    "Universal Promotions' fight media vault: searchable full fights, reels, photos, posters, podcast clips, sponsor moments, and press-ready event assets.",
};

export default function MediaPage() {
  return <MediaView />;
}
