"use client";

import { useMemo, useState } from "react";
import { FighterCard } from "@/components/fighters/fighter-card";
import { useI18n } from "@/components/i18n/language-provider";
import { fighters } from "@/content/fighters";
import { divisions, divisionOrder } from "@/content/divisions";
import { pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { DivisionId, FighterStatus } from "@/types";

type StatusFilter = "all" | FighterStatus;
type DivisionFilter = "all" | DivisionId;

const statusWeight: Record<FighterStatus, number> = { champion: 0, prospect: 1, active: 2 };
const rosterPriority = new Map<string, number>([["orlando-gonzalez", 0]]);
const defaultRosterPriority = 1;
const representedDivisionOrder = divisionOrder.filter((id) => fighters.some((fighter) => fighter.division === id));
const representedStatuses = new Set(fighters.map((fighter) => fighter.status));

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-[length:var(--step--1)] font-medium transition-colors",
        active
          ? "border-gold bg-gold/15 text-gold"
          : "border-line-2 bg-surface text-fg-2 hover:border-gold/40 hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function Roster() {
  const { t, locale } = useI18n();
  const [status, setStatus] = useState<StatusFilter>("all");
  const [division, setDivision] = useState<DivisionFilter>("all");

  const filtered = useMemo(() => {
    return fighters
      .filter((f) => (status === "all" || f.status === status) && (division === "all" || f.division === division))
      .sort(
        (a, b) =>
          (rosterPriority.get(a.slug) ?? defaultRosterPriority) -
            (rosterPriority.get(b.slug) ?? defaultRosterPriority) ||
          statusWeight[a.status] - statusWeight[b.status] ||
          (b.record?.wins ?? -1) - (a.record?.wins ?? -1),
      );
  }, [status, division]);

  const allStatusOptions: { value: StatusFilter; label: string }[] = [
    { value: "all", label: t.common.all },
    { value: "champion", label: t.common.champion },
    { value: "prospect", label: t.common.prospect },
    { value: "active", label: t.common.active },
  ];
  const statusOptions = allStatusOptions.filter((option) => option.value === "all" || representedStatuses.has(option.value));

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-token-lg border border-line bg-surface p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="kicker mr-1 w-full sm:w-auto">{t.fighters.filterStatus}</span>
          {statusOptions.map((o) => (
            <Chip key={o.value} active={status === o.value} onClick={() => setStatus(o.value)}>
              {o.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
          <span className="kicker mr-1 w-full sm:w-auto">{t.fighters.filterDivision}</span>
          <Chip active={division === "all"} onClick={() => setDivision("all")}>
            {t.common.all}
          </Chip>
          {representedDivisionOrder.map((id) => (
            <Chip key={id} active={division === id} onClick={() => setDivision(id)}>
              {pick(divisions[id].label, locale)}
            </Chip>
          ))}
        </div>
      </div>

      <p className="mt-5 text-[length:var(--step--1)] text-fg-3" aria-live="polite">
        {t.fighters.countLabel} <span className="font-semibold text-fg">{filtered.length}</span> {t.common.fighters}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-10 text-fg-2">{t.fighters.empty}</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((fighter) => (
            <FighterCard key={fighter.slug} fighter={fighter} />
          ))}
        </div>
      )}
    </div>
  );
}
