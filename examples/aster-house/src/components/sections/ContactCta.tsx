import type { ElementType, ReactNode } from 'react'
import { TextLink } from '@/components/InkLinks'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close. `children` replaces the action
// with something richer (the booking form).
export function ContactCtaSection({ link: L = 'a', level: H = 'h2', id, headline, quiet, action, email, inverse = false, children }: { link?: ElementType; level?: 'h1' | 'h2'; id?: string; headline: ReactNode; quiet?: ReactNode; action?: { label: string; href: string }; email?: string; inverse?: boolean; children?: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-16 px-5 py-30 md:px-10 md:py-40 ${inverse ? 'ink-inverse bg-(--color-background) text-(--color-text)' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <H className="type-display [font-size:clamp(2.75rem,8vw,7.5rem)] leading-[0.98]">{headline}{quiet && <span className="mt-3 block font-(family-name:--font-heading) [font-size:clamp(1.4rem,2.6vw,2.2rem)] [font-weight:var(--type-heading-weight)] leading-[1.2] tracking-normal text-(--color-muted)">{quiet}</span>}</H>
        {children ?? (
          <div data-reveal="rise" className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            {action && <L href={action.href} className="type-body inline-flex min-h-14 items-center rounded-(--radius-button) bg-(--color-primary) px-8 text-(--color-background) transition-opacity duration-150 hover:opacity-85 focus-visible:underline">{action.label}</L>}
            {email && <span className="type-body"><TextLink href={`mailto:${email}`}>{email}</TextLink></span>}
          </div>
        )}
      </div>
    </section>
  )
}
