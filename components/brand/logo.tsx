import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Universal Promotions wordmark using the public channel logo pulled from their
 * owned social/video profile.
 */
export function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "mark";
  className?: string;
}) {
  const mark = (
    <span
      aria-hidden
      className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-token-sm bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      <Image
        src="/media/universal/logo/universal-promotions-logo.jpg"
        alt=""
        fill
        sizes="40px"
        className="object-cover"
        priority
      />
    </span>
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex", className)}>{mark}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-bold tracking-tight text-fg">Universal</span>
        <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.34em] text-fg-3">
          Promotions
        </span>
      </span>
    </span>
  );
}
