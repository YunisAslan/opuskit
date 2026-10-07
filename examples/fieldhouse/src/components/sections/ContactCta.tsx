import type { ElementType, ReactNode } from 'react'
import { Lines, Reveal } from '@/components/motion'
// Closing CTA — Ways to reach you: the headline on the left (a second line in the heading face), the ways to reach
// you set large on the right — email, phone, address — and one action. `children` (the enquiry form) sits under the
// headline; `actionSlot` replaces the plain action link (Home opens the form in a Sheet).
export function ContactCtaSection({ id, tone, link: L = 'a', h1 = false, headline, quiet, action, actionSlot, email, phone, address, children }: {
  id?: string; tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; h1?: boolean; headline: string; quiet?: string
  action?: { label: string; href: string }; actionSlot?: ReactNode; email?: string; phone?: string; address?: string; children?: ReactNode
}) {
  const t = tone === 'ground' ? undefined : tone
  const big = 'type-heading block w-fit break-words underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-[text-decoration-color] duration-150 hover:decoration-current focus-visible:decoration-current [font-size:clamp(1.5rem,2.6vw,2.25rem)]'
  return (
    <section id={id} data-tone={t} className="section-y px-(--gutter)">
      <div className={`mx-auto grid max-w-(--container) gap-x-8 gap-y-14 md:grid-cols-12 ${children ? 'md:items-start' : 'md:items-end'}`}>
        <div className="md:col-span-7">
          <Lines as={h1 ? 'h1' : 'h2'} lines={[headline]} className="type-display text-balance [font-size:clamp(3rem,7vw,6.5rem)]" />
          {quiet && <Reveal delay={0.15}><p className="type-heading mt-4 [font-size:clamp(1.75rem,3.4vw,3rem)]">{quiet}</p></Reveal>}
          {children && <div className="mt-14 md:mt-20">{children}</div>}
        </div>
        <Reveal inner="space-y-5" className={`md:col-span-4 md:col-start-9 ${children ? 'md:sticky md:top-24 md:mt-4' : ''}`} delay={0.1}>
          {email && <a href={`mailto:${email}`} className={big}>{email}</a>}
          {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className={big}>{phone}</a>}
          {address && <p className="type-body whitespace-pre-line pt-1 text-(--color-muted)">{address}</p>}
          {(actionSlot || action) && (
            <div className="pt-4">
              {actionSlot ?? (action && <L href={action.href} className="type-utility inline-flex h-12 items-center rounded-button bg-(--color-primary) px-7 text-(--color-background) transition-opacity duration-150 hover:opacity-85 focus-visible:underline">{action.label}</L>)}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
