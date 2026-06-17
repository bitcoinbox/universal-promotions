"use client";

import { Badge, type BadgeProps } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/language-provider";
import type { RightsStatus } from "@/types";

const tone: Record<RightsStatus, NonNullable<BadgeProps["tone"]>> = {
  owned: "ok",
  public_reference: "accent",
  permission_needed: "warn",
  embed_only: "accent",
  generated: "neutral",
  unknown: "outline",
};

/** Shows an asset's usage/rights posture — every media record carries one. */
export function RightsBadge({ status, size = "sm" }: { status: RightsStatus; size?: BadgeProps["size"] }) {
  const { t } = useI18n();
  return (
    <Badge tone={tone[status]} size={size} title={t.media.rights}>
      {t.media.rightsLabels[status]}
    </Badge>
  );
}
