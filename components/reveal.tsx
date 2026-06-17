"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Reveal-on-scroll — fades + rises content in when it enters the viewport, once.
 * CSS transition + IntersectionObserver (no animation library). Honors reduced motion
 * (renders static, fully visible). Use a small `delay` per item to stagger a group.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);
  // The rendered element is whatever `as` is at runtime; treating the tag as a div keeps
  // the ref types simple (an IntersectionObserver target works for any element).
  const Tag = as as "div";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "-12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const style = reduce
    ? undefined
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 600ms cubic-bezier(0.2,0.8,0.2,1) ${delay}s, transform 600ms cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
      };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
