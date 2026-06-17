"use client";

import { Tv, MonitorPlay } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Broadcast } from "@/types";

/** Inline list of where the card airs. Icon distinguishes TV from streaming. */
export function BroadcastRow({ broadcasts, className }: { broadcasts: Broadcast[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {broadcasts.map((b) => {
        const Icon = b.kind === "tv" ? Tv : MonitorPlay;
        return (
          <span
            key={b.name}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[length:var(--step--2)] text-fg-2"
          >
            <Icon className="size-3.5 text-fg-3" />
            {b.name}
          </span>
        );
      })}
    </div>
  );
}
