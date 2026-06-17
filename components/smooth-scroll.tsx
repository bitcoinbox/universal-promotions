"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/**
 * Buttery smooth scroll for marketing pages — lazy-loaded.
 *
 * Children render immediately (no wrapper, SSR-safe). Lenis itself is dynamically imported
 * after mount, so it stays out of the initial JS bundle and off the FCP/LCP path. Disabled
 * for `prefers-reduced-motion`.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let instance: Lenis | undefined;
    let raf = 0;
    let cancelled = false;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({ lerp: 0.1, smoothWheel: true });
      const loop = (time: number) => {
        instance?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      instance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
