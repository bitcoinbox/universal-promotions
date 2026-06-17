"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";

/** Route-level error boundary. Renders inside the root layout (header/footer stay). */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surface for monitoring; no PII. Wire to an error service here in production.
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[62vh] flex-col items-center justify-center gap-5 py-24 text-center">
      <span className="kicker text-gold">Something went wrong</span>
      <h1 className="font-display text-[length:var(--step-3)] uppercase leading-[0.95]">Technical stoppage</h1>
      <p className="max-w-md text-[length:var(--step-0)] text-fg-2">
        An unexpected error interrupted this page. Try again, or head back home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className={buttonVariants({ variant: "primary", size: "md" })}>
          Try again
        </button>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "md" })}>
          Home
        </Link>
      </div>
    </Container>
  );
}
