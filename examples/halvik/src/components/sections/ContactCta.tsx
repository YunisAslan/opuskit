import type { ElementType, ReactNode } from 'react'
import { Magnetic } from '@/components/pieces/Magnetic'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `headline` may be a ready heading node; `children` (a form) follows the action.
export function ContactCtaSection({ link: L = 'a', headline, quiet, action, email, children, id, first = false }: { link?: ElementType; headline: ReactNode; quiet?: string; action?: { label: string; href: string }; email?: string; children?: ReactNode; id?: string; first?: boolean }) {
  return (
    <section id={id} className={`px-5 md:px-10 ${first ? 'pb-24 pt-32 md:pb-32 md:pt-44' : 'py-28 md:py-40'}`}>
      <div className="mx-auto max-w-[1440px]">
        {typeof headline === 'string'
          ? <h2 className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">{headline}{quiet && <span className="block font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>}</h2>
          : headline}
        {(action || email) && (
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            {action && <Magnetic><L href={action.href} className="type-body inline-flex min-h-13 items-center rounded-(--radius-button) bg-(--color-primary) px-7 py-3.5 text-(--color-background) transition-colors duration-150 hover:bg-(--color-muted)">{action.label}</L></Magnetic>}
            {email && <UnderlineFill href={`mailto:${email}`} className="type-body">{email}</UnderlineFill>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
