"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { TicketsButton } from "@/components/site/tickets-button";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { useI18n } from "@/components/i18n/language-provider";
import { navItems } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change + lock body scroll while the mobile sheet is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={t.brand.name} className="rounded-md">
          <Logo />
        </Link>

        {/* desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-[length:var(--step--1)] font-medium transition-colors",
                isActive(item.href) ? "text-gold" : "text-fg-2 hover:text-fg",
              )}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <TicketsButton label={t.actions.tickets} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.actions.closeMenu : t.actions.openMenu}
            className="grid size-10 place-items-center rounded-token border border-line-2 bg-surface text-fg lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* mobile sheet — a disclosure menu (controlled by the toggle's aria-expanded/
          aria-controls), not a modal dialog; CSS grid-rows collapse, inert when closed */}
      <div
        id="mobile-nav"
        inert={!open || undefined}
        className={cn(
          "grid overflow-hidden bg-bg transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:hidden",
          open ? "grid-rows-[1fr] border-t border-line opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <Container className="flex flex-col gap-1 py-4">
            <nav aria-label="Primary" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "rounded-token px-3 py-3 text-[length:var(--step-1)] font-semibold",
                    isActive(item.href) ? "bg-surface text-gold" : "text-fg hover:bg-surface",
                  )}
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex items-center justify-between gap-3">
              <LanguageToggle />
              <TicketsButton label={t.actions.getTickets} className="flex-1" />
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}
