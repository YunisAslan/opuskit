import type { ElementType, ReactNode } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close.
export function ContactCtaSection({ link: L = 'a', as: H = 'h2', headline, quiet, action, email, inverse = false, children }: { link?: ElementType; as?: 'h1' | 'h2'; children?: ReactNode; headline: string; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean }) {
  return (
    <section className={`px-5 py-28 md:px-10 md:py-40 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <H className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">{headline}{quiet && <span className="block font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>}</H>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <L href={action.href} className={`type-utility uppercase [font-size:1.1rem] inline-flex min-h-14 items-center rounded-(--radius-button) px-8 border-2 border-(--color-border) shadow-(--shadow-card) transition-[transform,box-shadow] duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-0 ${inverse ? 'bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background)'}`}>{action.label}</L>
          {email && <a href={`mailto:${email}`} className="type-body underline underline-offset-4">{email}</a>}
        </div>
        {children}
      </div>
    </section>
  )
}
