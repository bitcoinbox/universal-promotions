"use client";

import { useEffect, useState } from "react";

/**
 * Tiny `prefers-reduced-motion` hook (replaces framer-motion's useReducedMotion so the
 * site ships no animation library). Returns false on the server + first paint, then the
 * real preference after mount — hydration-safe.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduce;
}
