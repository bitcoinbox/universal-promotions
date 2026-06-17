"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/language-provider";
import type { BadgeProps } from "@/components/ui/badge";
import type { TicketStatus } from "@/types";

const config: Record<TicketStatus, { tone: NonNullable<BadgeProps["tone"]>; key: "onSale" | "limited" | "soldOut" | "announced"; dot: boolean }> = {
  "on-sale": { tone: "ok", key: "onSale", dot: true },
  limited: { tone: "warn", key: "limited", dot: true },
  "sold-out": { tone: "neutral", key: "soldOut", dot: false },
  announced: { tone: "outline", key: "announced", dot: false },
};

export function TicketBadge({ status, size }: { status: TicketStatus; size?: BadgeProps["size"] }) {
  const { t } = useI18n();
  const c = config[status];
  return (
    <Badge tone={c.tone} size={size} dot={c.dot}>
      {t.common[c.key]}
    </Badge>
  );
}
