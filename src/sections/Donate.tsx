// OpusKit section — Donate: preset gifts that each say what they pay for, beside the pledge form, then where the money
// goes. The form is the project's own, built from shadcn/ui (a ToggleGroup for once/monthly and the amounts, Inputs, a
// Button) and passed in as `form`; it hands off to the payment page or link — no fake "thank you, charged". This section
// only lays it out, so no plain browser radio or number input ships.
import type { ReactNode } from 'react'

export type Gift = { amount: string; what: string; detail?: string }
export type Spend = { label: string; share: number }

export function DonateSection({ tone, title, text, gifts, form, spend, spendTitle = 'Where the money goes', note }: { tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; text?: string; gifts: Gift[]; form: ReactNode; spend?: Spend[]; spendTitle?: string; note?: string }) {
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="px-(--gutter) py-(--section-y)">
      <div className="mx-auto max-w-(--container)">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="type-heading">{title}</h2>
            {text && <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{text}</p>}
            <ul className="mt-10 border-t border-(--color-border)">
              {gifts.map((g) => (
                <li key={g.amount} className="grid grid-cols-[minmax(5.5rem,auto)_1fr] items-baseline gap-x-6 border-b border-(--color-border) py-5">
                  <span className="type-display [font-size:clamp(1.8rem,3vw,2.6rem)]">{g.amount}</span>
                  <span><span className="type-body block">{g.what}</span>{g.detail && <span className="type-utility mt-1 block text-(--color-muted)">{g.detail}</span>}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 shadow-(--shadow-card) md:col-span-5 md:col-start-8 md:self-start">{form}</div>
        </div>
        {spend && spend.length > 0 && (
          <div className="mt-16">
            <p className="type-utility text-(--color-muted)">{spendTitle}</p>
            <div className="mt-4 flex h-3 overflow-hidden rounded-(--radius-button) border border-(--color-text)" aria-hidden>
              {spend.map((s, i) => <span key={s.label} style={{ width: `${s.share}%`, opacity: 1 - i * (0.7 / spend.length) }} className="border-r-2 border-(--color-background) bg-(--color-text) last:border-r-0" />)}
            </div>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {spend.map((s) => <li key={s.label}><span className="type-heading [font-size:1.4rem]">{s.share}%</span><span className="type-body mt-1 block text-(--color-muted)">{s.label}</span></li>)}
            </ul>
          </div>
        )}
        {note && <p className="type-utility mt-10 text-(--color-muted)">{note}</p>}
      </div>
    </section>
  )
}
