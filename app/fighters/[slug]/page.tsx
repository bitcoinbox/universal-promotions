import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FighterProfile } from "@/components/pages/fighter-profile";
import { fighters, getFighter } from "@/content/fighters";
import { divisions } from "@/content/divisions";
import { formatRecord } from "@/lib/utils";

export function generateStaticParams() {
  return fighters.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fighter = getFighter(slug);
  if (!fighter) return { title: "Fighter not found" };
  const division = fighter.division ? divisions[fighter.division].label.en : "Universal Promotions roster";
  const nick = fighter.nickname ? `“${fighter.nickname.en}” ` : "";
  const hometown = fighter.hometown ? `, ${fighter.hometown}` : "";
  const record = fighter.record ? ` Pro record ${formatRecord(fighter.record)} (${fighter.record.ko} KO).` : "";
  return {
    title: fighter.name,
    description: `${fighter.name} ${nick}— ${division}${hometown}.${record} Universal Promotions roster.`,
    alternates: { canonical: `/fighters/${slug}` },
  };
}

export default async function FighterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getFighter(slug)) notFound();
  return <FighterProfile slug={slug} />;
}
