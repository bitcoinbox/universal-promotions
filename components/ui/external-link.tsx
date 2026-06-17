import { cn } from "@/lib/utils";

/**
 * Anchor that is safe by construction. Any real external (http/https) link gets
 * `target="_blank"` + `rel="noopener noreferrer"` so it can never reach back into the
 * opener. Internal links render normally. Prototype placeholders (`#`) render as inert,
 * non-navigating anchors — honest about going nowhere yet (no dead jump-to-top).
 */
export function ExternalLink({
  href,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const isExternal = /^https?:\/\//i.test(href);
  const isPlaceholder = href === "#";

  if (isPlaceholder) {
    return (
      <a className={cn(className)} aria-disabled="true" role="link" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={cn(className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
