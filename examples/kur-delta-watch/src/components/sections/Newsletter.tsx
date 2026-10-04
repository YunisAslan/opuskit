// OpusKit section — Newsletter: one reason to subscribe, an email field and a button, and a plain note on how often.
import type { FormEventHandler } from 'react'

export function NewsletterSection({ title, text, placeholder, button, note, action, onSubmit, label = 'Email address' }: { title: string; text: string; placeholder: string; button: string; note?: string; action?: string; onSubmit?: FormEventHandler<HTMLFormElement>; label?: string }) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-6">
          <h2 className="type-heading text-balance">{title}</h2>
          <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>
        </div>
        <form action={action} method={action ? 'post' : undefined} onSubmit={onSubmit} className="md:col-span-5 md:col-start-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label className="type-utility flex-1 text-(--color-muted)">{label}
              <input required type="email" name="email" autoComplete="email" placeholder={placeholder} className="type-body mt-2 block h-12 w-full rounded-(--radius-button) border-2 border-(--color-muted) bg-(--color-surface) px-4 text-(--color-text) outline-none placeholder:text-(--color-muted)/80 focus-visible:border-(--color-text)" />
            </label>
            <button type="submit" className="type-utility uppercase [font-size:1.05rem] h-12 shrink-0 cursor-pointer rounded-(--radius-button) bg-(--color-primary) px-7 text-(--color-background) focus-visible:underline focus-visible:underline-offset-4 border-2 border-(--color-border) shadow-(--shadow-card) transition-[transform,box-shadow] duration-150 active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:active:translate-0">{button}</button>
          </div>
          {note && <p className="type-utility mt-3 text-(--color-muted)">{note}</p>}
        </form>
      </div>
    </section>
  )
}
