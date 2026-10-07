import type { ElementType } from 'react'
// OpusKit section — Closing CTA: one headline in the brand voice (optionally two voices), one action, and a real way
// to reach you. `tone="inverse"` (or the older `inverse`) ends the page on the text colour. Three designs:
//   statement — the headline huge, one button and the email under it.
//   write     — a short letter to fill in: the sentence is the form ("Hi, I'm ___ and I'd like to talk about ___"),
//               sent to `action.href` (your form endpoint) — writing to you feels like talking.
//   details   — the headline on the left, the ways to reach you set large on the right (email, phone, address).
export function ContactCtaSection({ tone, variant = 'statement', link: L = 'a', headline, quiet, action, email, phone, address, inverse = false }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'statement' | 'write' | 'details'; link?: ElementType; headline: string; quiet?: string
  action: { label: string; href: string }; email?: string; phone?: string; address?: string; inverse?: boolean
}) {
  const t = inverse ? 'inverse' : tone === 'ground' ? undefined : tone
  const title = <h2 className="type-display text-balance [font-size:clamp(2.75rem,8vw,7.5rem)]">{headline}{quiet && <span className="block font-(family-name:--font-heading) [font-stretch:var(--type-heading-stretch)] [font-weight:var(--type-heading-weight)]">{quiet}</span>}</h2>
  const field = 'mx-1 inline-block min-w-[8ch] border-b border-(--color-text) bg-transparent px-1 align-baseline text-(--color-text) outline-none placeholder:text-(--color-muted) focus:border-(--color-accent)'

  if (variant === 'write') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-utility text-(--color-muted)">{headline}</h2>
        <form action={action.href} method="post" className="type-heading mt-8 max-w-[36ch] leading-[1.6] [font-size:clamp(1.5rem,3.4vw,2.9rem)]">
          Hi, I’m <input name="name" required aria-label="Your name" placeholder="your name" autoComplete="name" className={field} />
          and I’d like to talk about <input name="topic" required aria-label="What it is about" placeholder="a project" className={`${field} min-w-[12ch]`} />.
          You can reach me at <input name="email" type="email" required aria-label="Your email" placeholder="you@example.com" autoComplete="email" className={`${field} min-w-[14ch]`} />.
          <span className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 [font-size:1rem]">
            <button type="submit" className="type-body rounded-(--radius-button) bg-(--color-primary) px-7 py-3.5 text-(--color-background)">{action.label}</button>
            {email && <a href={`mailto:${email}`} className="type-body underline underline-offset-4">or write to {email}</a>}
          </span>
        </form>
      </div>
    </section>
  )
  if (variant === 'details') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">{title}</div>
        <div className="space-y-6 md:col-span-5">
          {email && <a href={`mailto:${email}`} className="type-heading block break-words underline-offset-4 hover:underline [font-size:clamp(1.4rem,2.6vw,2.2rem)]">{email}</a>}
          {phone && <a href={`tel:${phone.replace(/\s/g, '')}`} className="type-heading block underline-offset-4 hover:underline [font-size:clamp(1.4rem,2.6vw,2.2rem)]">{phone}</a>}
          {address && <p className="type-body text-(--color-muted)">{address}</p>}
          <L href={action.href} className="type-body inline-block rounded-(--radius-button) bg-(--color-primary) px-7 py-3.5 text-(--color-background)">{action.label}</L>
        </div>
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*1.25)]">
      <div className="mx-auto max-w-(--container)">
        {title}
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <L href={action.href} className="type-body rounded-(--radius-button) bg-(--color-primary) px-7 py-3.5 text-(--color-background)">{action.label}</L>
          {email && <a href={`mailto:${email}`} className="type-body underline underline-offset-4">{email}</a>}
        </div>
      </div>
    </section>
  )
}
