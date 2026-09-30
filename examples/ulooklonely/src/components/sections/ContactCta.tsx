// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `inverse` ends the page on the text colour — a dark full-screen close. `children` holds the brief form.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { buttonVariants } from '@/components/ui/button'

export function ContactCtaSection({ headline, quiet, action, email, inverse = false, level = 'h2', children }: { headline: string; quiet?: string; action: { label: string; href: string }; email?: string; inverse?: boolean; level?: 'h1' | 'h2'; children?: ReactNode }) {
  const H = level
  return (
    <section className={`px-6 pt-40 pb-32 md:px-10 md:pb-40 ${inverse ? 'bg-(--color-text) text-(--color-background)' : ''}`}>
      <div className="mx-auto max-w-[1200px]">
        <H className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">{headline}{quiet && <span className="mt-4 block font-(family-name:--font-heading) [font-size:var(--type-heading-size)] [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)] leading-[var(--type-heading-leading)] tracking-normal">{quiet}</span>}</H>
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
          <Link href={action.href} className={buttonVariants({ size: 'lg', className: 'w-full sm:w-auto' })}>{action.label}</Link>
          {email && <Link href={`mailto:${email}`} className="type-body inline-flex min-h-11 items-center underline underline-offset-4">{email}</Link>}
        </div>
        {children}
      </div>
    </section>
  )
}
