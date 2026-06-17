import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center gap-5 py-24 text-center">
      <span className="kicker text-gold">404</span>
      <h1 className="font-display text-[length:var(--step-4)] uppercase leading-[0.95]">Off the card</h1>
      <p className="max-w-md text-[length:var(--step-0)] text-fg-2">
        This page isn&rsquo;t on the schedule. Head back to the main event.
      </p>
      <Link href="/" className={buttonVariants({ variant: "primary", size: "md" })}>
        Back to home
      </Link>
    </Container>
  );
}
