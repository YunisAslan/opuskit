import type { ElementType, ReactNode } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close. `children` follows the action.
export function ContactCtaSection({ link: L = 'a', as: H = 'h2', headline, quiet, action, email, inverse = false, spot, children }: { link?: ElementType; as?: 'h1' | 'h2'; headline: ReactNode; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean; spot?: ReactNode; children?: ReactNode }) {
  return (
    <section className={`px-5 py-28 md:px-10 md:py-40 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1440px] md:pl-[4%]">
        {spot}
        <H className="type-display mt-2 text-[clamp(2.75rem,8vw,6.5rem)]">{headline}{quiet && <span className="rise mt-6 block font-(family-name:--font-heading) [font-size:clamp(1.25rem,2.2vw,1.9rem)] [font-weight:var(--type-heading-weight)] leading-[1.2]"><span>{quiet}</span></span>}</H>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
          <L href={action.href} className={`type-body inline-flex min-h-14 items-center rounded-(--radius-button) px-8 transition-colors duration-150 ${inverse ? 'bg-(--color-background) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background) hover:bg-(--color-text)'}`}>{action.label}</L>
          {email && <a href={`mailto:${email}`} className="type-body inline-flex min-h-11 items-center underline underline-offset-4">{email}</a>}
        </div>
        {children}
      </div>
    </section>
  )
}
