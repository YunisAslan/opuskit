import type { ElementType } from 'react'
import { Magnetic } from '@/components/pieces/Magnetic'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close.
export function ContactCtaSection({ link: L = 'a', headline, quiet, action, email, inverse = false }: { link?: ElementType; headline: string; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean }) {
  return (
    <section className={`px-5 py-(--section-gap) md:px-8 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1440px]">
        <h2 className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">{headline}{quiet && <span className="type-heading mt-5 block text-(--color-muted)">{quiet}</span>}</h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic><L href={action.href} className={`type-body inline-flex min-h-12 items-center rounded-(--radius-button) px-7 font-semibold transition-opacity duration-150 hover:opacity-85 ${inverse ? 'bg-(--color-background) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background)'}`}>{action.label}</L></Magnetic>
          {email && <a href={`mailto:${email}`} className="type-body inline-flex min-h-11 items-center underline decoration-1 underline-offset-4">{email}</a>}
        </div>
      </div>
    </section>
  )
}
