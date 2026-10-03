import type { ElementType, ReactNode } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close.
export function ContactCtaSection({ link: L = 'a', as: H = 'h2', headline, quiet, action, email, inverse = false, children }: { link?: ElementType; as?: 'h1' | 'h2'; headline: ReactNode; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean; children?: ReactNode }) {
  return (
    <section className={`px-4 pb-32 pt-40 md:px-10 md:pb-40 md:pt-56 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <H className="type-display [font-size:clamp(3.5rem,11vw,10rem)]">{headline}{quiet && <span className="block font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>}</H>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <L href={action.href} className={`type-body rounded-(--radius-button) px-7 py-3.5 ${inverse ? 'bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background)'}`}>{action.label}</L>
          {email && <a href={`mailto:${email}`} className="type-body underline underline-offset-4">{email}</a>}
        </div>
        {children}
      </div>
    </section>
  )
}
