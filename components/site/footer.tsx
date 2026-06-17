"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Music2, Youtube } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { ExternalLink } from "@/components/ui/external-link";
import { useI18n } from "@/components/i18n/language-provider";
import { universalPromotionsTV } from "@/content/media";
import { navItems } from "@/content/navigation";
import { legalDocs, contact } from "@/content/legal";
import { pick } from "@/lib/i18n";

const socials = [
  {
    label: "Instagram",
    icon: Instagram,
    href: universalPromotionsTV.links.instagram,
    color: "#E4405F",
    className: "hover:border-[#E4405F]/45 hover:bg-[#E4405F]/10",
  },
  {
    label: "Facebook",
    icon: Facebook,
    href: universalPromotionsTV.links.facebook,
    color: "#1877F2",
    className: "hover:border-[#1877F2]/45 hover:bg-[#1877F2]/10",
  },
  {
    label: "YouTube",
    icon: Youtube,
    href: universalPromotionsTV.url,
    color: "#FF0033",
    className: "hover:border-[#FF0033]/45 hover:bg-[#FF0033]/10",
  },
  {
    label: "TikTok",
    icon: Music2,
    href: universalPromotionsTV.links.tiktok,
    color: "#25F4EE",
    className: "hover:border-[#25F4EE]/45 hover:bg-[#25F4EE]/10",
  },
];

const linkClass = "text-[length:var(--step--1)] text-fg-2 transition-colors hover:text-fg";

export function Footer() {
  const { t, locale } = useI18n();
  const year = 2026;

  return (
    <footer className="hairline mt-24 bg-bg-2">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
          {/* brand */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[length:var(--step--1)] text-fg-2">{t.footer.blurb}</p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, icon: Icon, href, color, className }) => (
                <ExternalLink
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`grid size-9 place-items-center rounded-token border border-line bg-surface transition-colors ${className}`}
                >
                  <Icon className="size-4" color={color} />
                </ExternalLink>
              ))}
            </div>
          </div>

          {/* explore */}
          <nav aria-label={t.footer.sections} className="flex flex-col gap-2.5">
            <span className="kicker mb-1">{t.footer.sections}</span>
            <Link href="/" className={linkClass}>
              {t.nav.home}
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          {/* company */}
          <nav aria-label={t.footer.company} className="flex flex-col gap-2.5">
            <span className="kicker mb-1">{t.footer.company}</span>
            <Link href="/contact" className={linkClass}>
              {t.footer.contact}
            </Link>
            <Link href="/contact" className={linkClass}>
              {t.footer.pressInquiries}
            </Link>
            <Link href="/partners" className={linkClass}>
              {t.actions.becomePartner}
            </Link>
            <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[length:var(--step--2)] text-fg-3">
              <Mail className="size-3" />
              {contact.press}
            </span>
          </nav>

          {/* legal */}
          <nav aria-label={t.footer.legal} className="flex flex-col gap-2.5">
            <span className="kicker mb-1">{t.footer.legal}</span>
            {legalDocs.map((doc) => (
              <Link key={doc.slug} href={`/legal/${doc.slug}`} className={linkClass}>
                {pick(doc.title, locale)}
              </Link>
            ))}
          </nav>
        </div>

        {/* prototype disclaimer */}
        <div className="hairline mt-12 pt-6">
          <p className="max-w-3xl text-[length:var(--step--2)] leading-relaxed text-fg-3">
            <span className="font-semibold text-fg-2">{t.footer.disclaimerTitle}.</span>{" "}
            {t.footer.disclaimer}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-[length:var(--step--2)] text-fg-3 sm:flex-row sm:items-center sm:justify-between">
            <span>© {year} {t.brand.name}</span>
            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span>{t.footer.rights}</span>
              <span aria-hidden className="hidden text-line-2 sm:inline">·</span>
              <ExternalLink href="https://islandlabs.studio" className="font-medium text-fg-2 transition-colors hover:text-gold">
                {t.footer.createdBy} <span className="text-gold">Island Labs</span>
              </ExternalLink>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
