"use client";

import { Info } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { UpcomingEventCard } from "@/components/events/upcoming-event-card";
import { PastEventCard } from "@/components/events/past-event-card";
import { useI18n } from "@/components/i18n/language-provider";
import { upcomingEvents, pastEvents } from "@/content/events";

export function EventsView() {
  const { t } = useI18n();

  return (
    <>
      <PageHero
        kicker={t.events.kicker}
        title={t.events.title}
        intro={t.events.intro}
        backgroundSrc="/media/universal/sections/up-page-events.png"
      />

      {/* Upcoming */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading kicker={t.common.upcoming} title={t.events.upcomingTitle} />
          {upcomingEvents.length === 0 ? (
            <p className="mt-8 text-fg-2">{t.events.emptyUpcoming}</p>
          ) : (
            <div className="mt-8 flex flex-col gap-6">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.slug} delay={i * 0.04}>
                  <UpcomingEventCard event={event} />
                </Reveal>
              ))}
            </div>
          )}
          <p className="mt-6 flex items-start gap-2 text-[length:var(--step--2)] text-fg-3">
            <Info className="size-3.5" />
            {t.events.attendanceNote}
          </p>
        </Container>
      </section>

      {/* Past — only shown once there are real recaps to display */}
      {pastEvents.length > 0 && (
        <section className="border-t border-line bg-bg-2 py-16 sm:py-20">
          <Container>
            <SectionHeading kicker={t.common.past} title={t.events.pastTitle} intro={t.events.pastIntro} />
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {pastEvents.map((event, i) => (
                <Reveal key={event.slug} delay={(i % 2) * 0.05}>
                  <PastEventCard event={event} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
