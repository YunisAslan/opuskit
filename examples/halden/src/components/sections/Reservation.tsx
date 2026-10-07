'use client'
// Reservation — a short invitation and the practical facts (hours, group policy, the phone), the booking form beside
// them on the surface. Phones: the words, then the form full width with 48 px fields; the sticky bar keeps Reserve
// and Call under the thumb (src/components/site/SiteChrome.tsx).
import type { ReactNode } from 'react'
import { Lines, Reveal } from '@/components/motion/Reveal'
import { Opening, PageIntro, type Intro } from '@/components/sections/PageIntro'

export function ReservationSection({ tone, title, text, hours, phone, phoneLead, form, intro, id }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text: string; hours: readonly string[]; phone: string; phoneLead: string; form: ReactNode; intro?: Intro; id?: string
}) {
  return (
    <section id={id} data-tone={tone === 'ground' ? undefined : tone} className="scroll-mt-(--nav-h) px-(--gutter) py-(--section-y)">
      <Opening on={!!intro}>
      <div className="mx-auto max-w-(--container)">
        {intro && <PageIntro intro={intro} />}
        <div className="grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-5">
            <Lines lines={[title]} className="type-heading" />
            <Reveal delay={0.3}>
              <p className="type-body mt-6 max-w-[40ch] text-(--color-muted)">{text}</p>
              <ul className="type-body mt-8">{hours.map((h) => <li key={h}>{h}</li>)}</ul>
              <p className="type-body mt-6">{phoneLead} <a href={`tel:${phone.replace(/\s/g, '')}`} className="link-line underline decoration-current">{phone}</a></p>
            </Reveal>
          </div>
          <Reveal delay={0.4} className="border border-(--color-border) bg-(--color-surface) p-6 md:col-span-6 md:col-start-7 md:self-start md:p-10">{form}</Reveal>
        </div>
      </div>
      </Opening>
    </section>
  )
}
