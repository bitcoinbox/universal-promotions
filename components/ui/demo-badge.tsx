"use client";

import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/i18n/language-provider";
import { cn } from "@/lib/utils";

/**
 * Consistent "demo data" marker. Used wherever illustrative figures appear so a viewer
 * is never misled into reading prototype numbers as official records.
 */
export function DemoBadge({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <Badge tone="warn" dot className={cn("uppercase tracking-wide", className)}>
      {t.common.demoData}
    </Badge>
  );
}
