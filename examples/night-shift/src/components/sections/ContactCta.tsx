import type { ComponentType, ReactNode } from 'react'
type LinkLike = 'a' | ComponentType<{ href: string; className?: string; children?: ReactNode; 'aria-current'?: 'page' }>
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `meta` sits beside the action (price and start date). Headline lines are masked for the line reveal.
export function ContactCtaSection({ link: L = 'a', headline, quiet, action, meta, email, inverse = false }: { link?: LinkLike; headline: string; quiet?: string; action: { label: string; href: string }; meta?: string; email?: string; inverse?: boolean }) {
  return (
    <section className={`px-6 py-28 md:py-40 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-display text-balance [font-size:clamp(2.5rem,7vw,6rem)]">
          <span className="line"><span>{headline}</span></span>
          {quiet && <span className="line font-(family-name:--font-heading) [font-size:0.5em] [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]"><span className="pt-3">{quiet}</span></span>}
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <L href={action.href} className={`type-utility inline-flex min-h-12 items-center rounded-(--radius-button) px-7 text-[1rem] transition-colors duration-150 ${inverse ? 'bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background) hover:bg-(--color-muted)'}`}>{action.label}</L>
          {meta && <span className="type-utility text-(--color-muted)">{meta}</span>}
          {email && <a href={`mailto:${email}`} className="type-body underline decoration-1 underline-offset-4">{email}</a>}
        </div>
      </div>
    </section>
  )
}
