import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalView } from "@/components/pages/legal-view";
import { legalDocs, getLegalDoc } from "@/content/legal";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return { title: "Not found" };
  return {
    title: doc.title.en,
    description: `${doc.title.en} — ${doc.summary.en} Sample prototype document.`,
    alternates: { canonical: `/legal/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getLegalDoc(slug)) notFound();
  return <LegalView slug={slug} />;
}
