// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
// Three designs:
//   split — the reason on the left, the field and button on the right.
//   giant — the title huge across the page; the field is one ruled line under it, the button at its end.
//   card  — a small, calm card in the middle of the section, everything centred.
export function NewsletterSection({ tone, variant = 'split', title, text, placeholder, button, note, action, label = 'Email address' }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; variant?: 'split' | 'giant' | 'card'; title: string; text: string; placeholder: string; button: string; note?: string; action?: string; label?: string }) {
  const t = tone === 'ground' ? undefined : tone
  const method = action ? 'post' : undefined
  if (variant === 'giant') return (
    <section data-tone={t} className="px-(--gutter) py-[calc(var(--section-y)*1.2)]">
      <div className="mx-auto max-w-(--container)">
        <h2 className="type-display text-balance [font-size:clamp(2.6rem,8vw,7.5rem)] leading-[0.95]">{title}</h2>
        <p className="type-body mt-6 max-w-[52ch] text-(--color-muted)">{text}</p>
        <form action={action} method={method} className="mt-10">
          <label className="type-utility text-(--color-muted)" htmlFor="newsletter-email">{label}</label>
          <div className="mt-2 flex items-end gap-4 border-b-2 border-(--color-text) focus-within:border-(--color-accent)">
            <input id="newsletter-email" required type="email" name="email" autoComplete="email" placeholder={placeholder} className="type-heading min-w-0 flex-1 bg-transparent py-3 [font-size:clamp(1.3rem,2.6vw,2.2rem)] text-(--color-text) outline-none placeholder:text-(--color-muted)" />
            <button type="submit" className="type-body shrink-0 py-3 underline-offset-4 hover:underline">{button}</button>
          </div>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
        </form>
      </div>
    </section>
  )
  if (variant === 'card') return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-xl rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-8 text-center md:p-12">
        <h2 className="type-heading text-balance">{title}</h2>
        <p className="type-body mx-auto mt-4 max-w-[44ch] text-(--color-muted)">{text}</p>
        <form action={action} method={method} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">{label}</label>
          <input id="newsletter-email" required type="email" name="email" autoComplete="email" placeholder={placeholder} className="type-body min-w-0 flex-1 rounded-(--radius-button) border border-(--color-border) bg-(--color-background) px-4 py-3 text-(--color-text) placeholder:text-(--color-muted)" />
          <button type="submit" className="type-body shrink-0 rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-on-primary,var(--color-background))">{button}</button>
        </form>
        {note && <p className="type-utility mt-4 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
  return (
    <section data-tone={t} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>
        </div>
        <form action={action} method={method} className="md:col-span-5 md:col-start-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="type-utility flex-1 text-(--color-muted)">{label}
              <input required type="email" name="email" autoComplete="email" placeholder={placeholder} className="type-body mt-2 block w-full rounded-(--radius-button) border border-(--color-border) bg-(--color-surface) px-4 py-3 text-(--color-text) placeholder:text-(--color-muted)" />
            </label>
            <button type="submit" className="type-body shrink-0 rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-on-primary,var(--color-background))">{button}</button>
          </div>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
        </form>
      </div>
    </section>
  )
}
