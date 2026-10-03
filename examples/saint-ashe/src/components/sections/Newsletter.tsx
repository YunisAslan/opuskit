// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
export function NewsletterSection({ title, text, placeholder, button, note, action, label = 'Email address', onSubmit }: { title: string; text: string; placeholder: string; button: string; note?: string; action?: string; label?: string; /** no provider yet: handle it in the page */ onSubmit?: (email: string) => void }) {
  return (
    <section data-reveal className="px-4 py-32 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>
        </div>
        <form action={action} method={action ? 'post' : undefined} onSubmit={onSubmit && ((e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget).get('email') as string) })} className="md:col-span-5 md:col-start-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="type-utility flex-1 text-(--color-muted)">{label}
              <input required type="email" name="email" autoComplete="email" placeholder={placeholder} className="type-body mt-2 block min-h-12 w-full rounded-(--radius-button) border border-(--color-muted) bg-(--color-surface) px-4 py-3 text-(--color-text) outline-none placeholder:text-(--color-muted) focus:border-(--color-text)" />
            </label>
            <button type="submit" className="type-body min-h-12 shrink-0 rounded-(--radius-button) bg-(--color-primary) px-6 py-3 text-(--color-background) transition-colors hover:bg-(--color-muted) focus-visible:bg-(--color-muted)">{button}</button>
          </div>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
        </form>
      </div>
    </section>
  )
}
