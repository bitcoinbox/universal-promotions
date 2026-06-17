import type { Metadata } from "next";
import { MediaView } from "@/components/pages/media-view";

export const metadata: Metadata = {
  alternates: { canonical: "/media" },
  title: "Media",
  description:
    "Press releases, fight-week photography, weigh-ins, post-fight highlights, and media resources from Universal Promotions.",
};

export default function MediaPage() {
  return <MediaView />;
}
