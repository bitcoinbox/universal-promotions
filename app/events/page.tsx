import type { Metadata } from "next";
import { EventsView } from "@/components/pages/events-view";

export const metadata: Metadata = {
  alternates: { canonical: "/events" },
  title: "Events",
  description:
    "Upcoming Universal Promotions fight cards across Puerto Rico — main events, undercards, broadcast details, ticketing, and recaps from past events.",
};

export default function EventsPage() {
  return <EventsView />;
}
