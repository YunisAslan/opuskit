import type { ElementType, ReactNode } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close. `children`: e.g. a short form.
export function ContactCtaSection({ link: L = 'a', headline, quiet, action, email, inverse = false, children }: { link?: ElementType; headline: string; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean; children?: ReactNode }) {
  return (
    <section className={`px-[5vw] section-y ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="grid gap-x-[2vw] gap-y-12 md:grid-cols-12">
        <div className={children ? 'md:col-span-5' : 'md:col-span-10'}>
          <h2 className="type-display text-balance">{headline}{quiet && <span className="type-heading mt-4 block text-(--color-muted)">{quiet}</span>}</h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <L href={action.href} className={`type-utility inline-flex h-11 items-center rounded-(--radius-button) px-5 transition-opacity duration-150 hover:opacity-90 ${inverse ? 'bg-(--color-chapter-2,var(--color-accent)) text-(--color-text)' : 'bg-(--color-primary) text-(--color-background)'}`}>{action.label}</L>
            {email && <a href={`mailto:${email}`} className="type-body underline underline-offset-4">{email}</a>}
          </div>
        </div>
        {children && <div className="md:col-span-6 md:col-start-7">{children}</div>}
      </div>
    </section>
  )
}
