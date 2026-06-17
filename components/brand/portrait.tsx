import Image from "next/image";
import { cn, initials } from "@/lib/utils";

const ratioClass = {
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[16/10]",
} as const;

/**
 * Fighter/event portrait. When `imageSrc` is given it renders the real (public-sourced)
 * photo, cropped with object-cover and `imageFocus`. Otherwise it falls back to a
 * deterministic duotone-gradient placeholder (hue seed + initials + a faint star) — no
 * external request, fixed aspect ratio (zero layout shift).
 */
export function Portrait({
  name,
  hue,
  ratio = "portrait",
  className,
  scrim = true,
  rounded = true,
  imageSrc,
  imageFocus = "50% 22%",
  sizes = "(min-width:1024px) 24vw, 50vw",
}: {
  name: string;
  hue: number;
  ratio?: keyof typeof ratioClass;
  className?: string;
  scrim?: boolean;
  rounded?: boolean;
  imageSrc?: string;
  imageFocus?: string;
  sizes?: string;
}) {
  const h2 = (hue + 26) % 360;
  return (
    <div
      role="img"
      aria-label={imageSrc ? name : `Portrait placeholder — ${name}`}
      className={cn(
        "relative isolate overflow-hidden @container",
        ratioClass[ratio],
        rounded && "rounded-token",
        className,
      )}
      style={{
        backgroundColor: `hsl(${hue} 38% 11%)`,
        backgroundImage: imageSrc
          ? undefined
          : [
              `radial-gradient(120% 85% at 50% -10%, hsl(${hue} 60% 32% / 0.55), transparent 62%)`,
              `radial-gradient(95% 70% at 82% 115%, hsl(${h2} 64% 30% / 0.5), transparent 60%)`,
              `linear-gradient(180deg, hsl(${hue} 30% 13%), hsl(${hue} 36% 7%))`,
            ].join(", "),
      }}
    >
      {imageSrc ? (
        <Image src={imageSrc} alt="" fill sizes={sizes} style={{ objectPosition: imageFocus }} className="object-cover" />
      ) : (
        <>
          {/* faint star watermark */}
          <svg aria-hidden viewBox="0 0 24 24" className="absolute right-[-6%] top-[-5%] w-[46cqw] opacity-[0.07]" fill="white">
            <path d="M12 2l2.9 6.26L22 9l-5 4.6L18.2 22 12 18.3 5.8 22 7 13.6 2 9l7.1-.74z" />
          </svg>
          {/* initials */}
          <span className="absolute inset-0 grid place-items-center">
            <span
              className="font-display text-[clamp(0.9rem,32cqw,7rem)] font-extrabold tracking-tight text-white/85"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}
            >
              {initials(name)}
            </span>
          </span>
        </>
      )}
      {/* bottom scrim so overlaid captions stay legible */}
      {scrim && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-2/3"
          style={{ background: "linear-gradient(to top, hsl(240 12% 4% / 0.92), transparent)" }}
        />
      )}
    </div>
  );
}
