import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetailView } from "@/components/pages/event-detail-view";
import { events, getEvent } from "@/content/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.name.en,
    description: `${event.name.en} — ${event.venue}, ${event.city}, ${event.date}. Card, tickets, broadcast, and coverage from Universal Promotions.`,
    alternates: { canonical: `/events/${slug}` },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getEvent(slug)) notFound();
  return <EventDetailView slug={slug} />;
}
