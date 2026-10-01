import type { ElementType } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close.
export function ContactCtaSection({ link: L = 'a', headline, quiet, action, email, inverse = false }: { link?: ElementType; headline: string; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean }) {
  return (
    <section className={`px-5 py-28 md:px-8 md:py-40 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">{headline}{quiet && <span className="block font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>}</h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <L href={action.href} className={`type-body inline-flex min-h-12 items-center rounded-(--radius-button) px-7 ${inverse ? 'bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background)'}`}>{action.label}</L>
          {email && <a href={`mailto:${email}`} className="type-body inline-flex min-h-11 items-center underline underline-offset-4">{email}</a>}
        </div>
      </div>
    </section>
  )
}
