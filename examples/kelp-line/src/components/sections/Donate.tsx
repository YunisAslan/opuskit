'use client'
// OpusKit section — Donate, fitted to Kelp Line (the first screen of Donate): preset gifts that each say what they pay
// for, beside the pledge form (once or monthly), then where the money goes. The gift rows and the form's amounts are
// one choice: picking a row picks that amount in the form. Phones: gifts stacked above the form; the spending split as
// a 2 × 2 grid.
import { useState } from 'react'
import { Lines } from '@/components/motion/Lines'
import { PledgeForm, type Frequency } from '@/components/forms/PledgeForm'
import { cn, pounds } from '@/lib/utils'

export type Gift = { amount: number; what: string; detail?: string }
export type Spend = { label: string; share: number }

export function DonateSection({ tone, title, mobileTitle, text, gifts, spend, spendTitle = 'Where the money goes', note }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string[]; mobileTitle?: string[]; text?: string; gifts: Gift[]; spend?: Spend[]; spendTitle?: string; note?: string
}) {
  const [amount, setAmount] = useState<number | 'other'>(gifts[1]?.amount ?? gifts[0]?.amount ?? 'other')
  const [other, setOther] = useState('')
  const [frequency, setFrequency] = useState<Frequency>('monthly')
  const s = (n: number) => ({ ['--i' as string]: n })
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="section-pad first-pad">
      <div className="frame">
        <div className="grid gap-12 md:grid-cols-12 md:gap-x-(--gutter)">
          <div className="md:col-span-6">
            <Lines as="h1" onLoad lines={title} mobile={mobileTitle} className="type-display-2" />
            {text && <p className="type-lead rise mt-8 max-w-[44ch] text-(--color-muted)" style={s(2)}>{text}</p>}
            <ul className="rise mt-12 border-t border-(--color-border)" style={s(3)} aria-label="Gifts and what they pay for">
              {gifts.map((g) => {
                const on = amount === g.amount
                return (
                  <li key={g.amount} className="border-b border-(--color-border)">
                    <button type="button" aria-pressed={on} onClick={() => setAmount(g.amount)}
                      className={cn('press grid w-full grid-cols-[minmax(5.5rem,auto)_minmax(0,1fr)] items-baseline gap-x-6 rounded-(--radius-button) px-3 py-5 text-left hover:bg-(--color-surface) focus-visible:bg-(--color-surface) active:scale-[0.99]', on && 'bg-(--color-surface)')}>
                      <span className="type-number flex items-baseline gap-3">
                        {pounds(g.amount)}
                      </span>
                      <span className="min-w-0">
                        <span className="type-body flex items-center gap-3">{g.what}{on && <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-(--color-accent)" />}</span>
                        {g.detail && <span className="type-caption mt-1 block text-(--color-muted)">{g.detail}</span>}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="rise rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-6 md:col-span-5 md:col-start-8 md:self-start md:p-8 lg:sticky lg:top-28" style={s(2)}>
            <PledgeForm amount={amount} setAmount={setAmount} other={other} setOther={setOther} frequency={frequency} setFrequency={setFrequency} />
          </div>
        </div>
        {spend && spend.length > 0 && (
          <div data-fade className="mt-20 md:mt-28">
            <h2 className="type-heading">{spendTitle}</h2>
            <div className="mt-8 flex h-3 overflow-hidden rounded-(--radius-button)" aria-hidden>
              {spend.map((x, i) => <span key={x.label} style={{ width: `${x.share}%`, opacity: 1 - i * (0.75 / spend.length) }} className="border-r-2 border-(--color-background) bg-(--color-text) last:border-r-0" />)}
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-(--gutter)">
              {spend.map((x, i) => (
                <li key={x.label} className="flex flex-col gap-2">
                  <span aria-hidden className="h-1 w-6 rounded-full bg-(--color-text)" style={{ opacity: 1 - i * (0.75 / spend.length) }} />
                  <span className="type-number">{x.share}%</span>
                  <span className="type-body text-(--color-muted)">{x.label}</span>
                </li>
              ))}
            </ul>
            {note && <p className="type-caption mt-10 max-w-[60ch] text-(--color-muted)">{note}</p>}
          </div>
        )}
      </div>
    </section>
  )
}
