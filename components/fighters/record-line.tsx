import { cn, formatRecord } from "@/lib/utils";
import type { FightRecord } from "@/types";

/** Compact pro record: bold W-L-D in mono, muted KO count. "KO" is language-neutral. */
export function RecordLine({ record, className }: { record?: FightRecord; className?: string }) {
  return (
    <span className={cn("font-mono tabular text-[length:var(--step--1)]", className)}>
      <span className="font-semibold text-fg">{formatRecord(record)}</span>
      {record && <span className="text-fg-3"> · {record.ko} KO</span>}
    </span>
  );
}
