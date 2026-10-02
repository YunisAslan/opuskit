import type { ElementType, ReactNode } from 'react'
import { Lines } from '@/components/motion'
// OpusKit section — Closing CTA: one headline in the brand voice in two voices, one action, and a real way to reach
// you. `inverse` ends the page on the text colour — a dark close. `cta` replaces the plain action link (e.g. a button
// that opens the project form); `children` sits under it (the Contact page's form). `ground` lets the section take a
// colour chapter (the Contact page's project picker sets it).
export function ContactCtaSection({ link: L = 'a', headline, quiet, as = 'h2', eyebrow, action, cta, email, inverse = false, ground, children }: {
  link?: ElementType; headline: string; quiet?: string; as?: 'h1' | 'h2'; eyebrow?: string; action?: { label: string; href: string }; cta?: ReactNode
  email?: string; inverse?: boolean; ground?: string; children?: ReactNode
}) {
  return (
    <section className={`field-y px-5 transition-colors duration-500 motion-reduce:transition-none md:px-6 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`} style={ground ? { backgroundColor: ground } : undefined}>
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
        <Lines as={as} lines={quiet ? [headline, quiet] : [headline]} className="type-display mt-3 [font-size:clamp(2.75rem,8vw,7.5rem)] [&>span>span:nth-child(2)]:[font-weight:var(--type-heading-weight)]" />
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          {cta ?? (action && <L href={action.href} className={`type-body inline-flex min-h-12 items-center rounded-(--radius-button) px-7 ${inverse ? 'bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background)'}`}>{action.label}</L>)}
          {email && <a href={`mailto:${email}`} className="type-body underline decoration-1 underline-offset-4 transition-[text-decoration-color] hover:decoration-wavy">{email}</a>}
        </div>
        {children}
      </div>
    </section>
  )
}
