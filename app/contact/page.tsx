import type { Metadata } from "next";
import { ContactView } from "@/components/pages/contact-view";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact & Press",
  description:
    "Contact Universal Promotions for tickets, sponsorship, media credentials, event coverage, or fighter management.",
};

export default function ContactPage() {
  return <ContactView />;
}
