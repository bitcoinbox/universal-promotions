"use client";

import { Mail, MapPin, BadgeCheck } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/site/contact-form";
import { useI18n } from "@/components/i18n/language-provider";
import { contact } from "@/content/legal";

export function ContactView() {
  const { t } = useI18n();

  const channels = [
    { label: t.contact.topics.general, value: contact.general },
    { label: t.common.press, value: contact.press },
    { label: t.nav.partners, value: contact.partnerships },
  ];

  return (
    <>
      <PageHero
        kicker={t.contact.kicker}
        title={t.contact.title}
        intro={t.contact.intro}
        backgroundSrc="/media/universal/sections/up-page-contact.png"
      />

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            {/* form */}
            <div className="rounded-token-lg border border-line bg-surface p-6 sm:p-8">
              <h2 className="font-display text-[length:var(--step-1)] font-bold tracking-tight">{t.contact.formTitle}</h2>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>

            {/* reach us + credentials */}
            <div className="flex flex-col gap-5">
              <div className="rounded-token-lg border border-line bg-surface p-6">
                <span className="kicker">{t.contact.reachKicker}</span>
                <ul className="mt-4 flex flex-col gap-3">
                  {channels.map((c) => (
                    <li key={c.label} className="flex items-start gap-3">
                      <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                      <div className="min-w-0">
                        <div className="text-[length:var(--step--2)] uppercase tracking-wide text-fg-3">{c.label}</div>
                        <div className="break-all font-mono text-[length:var(--step--1)] text-fg">{c.value}</div>
                      </div>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 border-t border-line pt-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-fg-3" />
                    <div className="text-[length:var(--step--1)] text-fg-2">{contact.city}</div>
                  </li>
                </ul>
              </div>

              <div className="rounded-token-lg border border-gold/30 bg-gold/5 p-6">
                <span className="kicker inline-flex items-center gap-1.5 text-gold">
                  <BadgeCheck className="size-3.5" />
                  {t.contact.credentialsTitle}
                </span>
                <p className="mt-2 text-[length:var(--step--1)] text-fg-2">{t.contact.credentialsBody}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
