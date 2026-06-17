"use client";

import { useEffect } from "react";

/**
 * Root error boundary — replaces the whole document when the layout itself throws, so it
 * must render its own <html>/<body> and cannot rely on globals.css/components.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0a0b0e",
          color: "#f4f2ea",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <main style={{ textAlign: "center", padding: "2rem", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ color: "#a7adba", marginBottom: "1.5rem" }}>Please reload the page.</p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#e3b34e",
              color: "#1c1505",
              border: 0,
              borderRadius: "0.5rem",
              padding: "0.6rem 1.3rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}
