import { cn } from "@/lib/utils";

/** Centered content column with consistent responsive gutters. */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "main" | "header" | "footer" | "nav";
}) {
  return <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>{children}</Tag>;
}
