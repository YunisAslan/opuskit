import type { ElementType, ReactNode } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `children` takes the place of the action link (here: the inline sign-up form).
export function ContactCtaSection({ link: L = 'a', id, headline, quiet, action, email, note, children }: { link?: ElementType; id?: string; headline: string; quiet?: string; action?: { label: string; href: string }; email?: string; note?: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className="border-t border-(--color-border) px-6 py-16 first:border-t-0 md:pt-24 md:pb-16">
      <div className="grid gap-x-4 gap-y-12 md:grid-cols-6 lg:grid-cols-12">
        <h2 className="type-display text-balance md:col-span-6 lg:col-span-12 [font-size:clamp(2.75rem,8vw,7.5rem)]">
          {headline}
          {quiet && <span className="type-heading mt-4 block text-(--color-muted) [font-size:clamp(1.5rem,3vw,2.75rem)]">{quiet}</span>}
        </h2>
        <div className="md:col-span-6 lg:col-span-6">
          {children ?? (action && <L href={action.href} className="type-utility inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-8 text-(--color-background) [font-size:1rem]">{action.label}</L>)}
        </div>
        {(email || note) && (
          <div className="type-body space-y-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
            {email && (
              <p>
                <span className="type-utility block text-(--color-muted)">Write to the editors</span>
                <a href={`mailto:${email}`} className="type-heading inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 [font-size:clamp(1.25rem,2vw,1.6rem)] hover:decoration-2">{email}</a>
              </p>
            )}
            {note}
          </div>
        )}
      </div>
    </section>
  )
}
