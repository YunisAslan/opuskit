import type { ComponentProps, ElementType } from 'react'
import { Magnetic } from '@/components/pieces/Magnetic'
import { ChapterLabel } from '@/components/site/ChapterLabel'
import { Lines } from '@/components/site/Lines'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. The headline arrives line by line; the action is the page's magnetic main button.
export function ContactCtaSection({ link: L = 'a', label, headline, quiet, action, email }: { link?: ElementType<ComponentProps<'a'>>; label?: string; headline: string; quiet?: string; action: { label: string; href: string }; email?: string }) {
  return (
    <section className="console-grid-soft px-6 py-28 md:py-40">
      <div className="mx-auto max-w-[1440px]">
        {label && <ChapterLabel className="mb-6">{label}</ChapterLabel>}
        <Lines className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]"
          lines={[{ text: headline }, ...(quiet ? [{ text: quiet, className: 'font-(family-name:--font-heading) [font-weight:var(--type-heading-weight)] text-(--color-muted)' }] : [])]} />
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
          <Magnetic>
            <L href={action.href} className="type-body inline-flex min-h-14 items-center rounded-(--radius-button) bg-(--color-primary) px-8 font-medium text-(--color-background) transition-opacity duration-150 hover:opacity-90">{action.label}</L>
          </Magnetic>
          {email && <a href={`mailto:${email}`} className="type-body inline-flex min-h-11 items-center underline underline-offset-4 decoration-(--color-border) transition-colors duration-150 hover:decoration-(--color-text)">{email}</a>}
        </div>
      </div>
    </section>
  )
}
