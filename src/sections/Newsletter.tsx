// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
export function NewsletterSection({ tone, title, text, placeholder, button, note, action, label = 'Email address' }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text: string; placeholder: string; button: string; note?: string; action?: string; label?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>
        </div>
        <form action={action} method={action ? 'post' : undefined} className="md:col-span-5 md:col-start-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="type-utility flex-1 text-(--color-muted)">{label}
              <input required type="email" name="email" autoComplete="email" placeholder={placeholder} className="type-body mt-2 block w-full rounded-(--radius-button) border border-(--color-border) bg-(--color-surface) px-4 py-3 text-(--color-text) placeholder:text-(--color-muted)" />
            </label>
            <button type="submit" className="type-body shrink-0 rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-background)">{button}</button>
          </div>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
        </form>
      </div>
    </section>
  )
}
