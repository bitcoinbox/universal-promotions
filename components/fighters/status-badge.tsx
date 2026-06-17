"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/language-provider";
import type { BadgeProps } from "@/components/ui/badge";
import type { FighterStatus } from "@/types";

const toneByStatus: Record<FighterStatus, NonNullable<BadgeProps["tone"]>> = {
  champion: "gold",
  prospect: "accent",
  active: "neutral",
};

export function FighterStatusBadge({
  status,
  className,
  size,
}: {
  status: FighterStatus;
  className?: string;
  size?: BadgeProps["size"];
}) {
  const { t } = useI18n();
  const label =
    status === "champion" ? t.common.champion : status === "prospect" ? t.common.prospect : t.common.active;
  return (
    <Badge tone={toneByStatus[status]} size={size} className={className} dot={status === "champion"}>
      {label}
    </Badge>
  );
}
