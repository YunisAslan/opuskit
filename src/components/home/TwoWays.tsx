// Home: the two ways into OpusKit — a finished example (/examples) or a fresh start in the kit (/kit).
// Both end in the same Universal Recipe and Build Package, edited in one place (the kit); they differ in where you start.
import { ArrowRight, Copy, LayoutTemplate } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { examples } from '@/data/examples'

type Way = { href: string; icon: typeof LayoutTemplate; name: string; cta: string; rows: [string, string][]; picture: ReactNode; primary?: boolean }

const Chip = ({ children, on = false }: { children: ReactNode; on?: boolean }) =>
  <span className={`rounded-full border px-2.5 py-1 text-xs ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white text-ink-2'}`}>{children}</span>

const WAYS: Way[] = [
  {
    href: '/examples', icon: Copy, name: 'Start from a real site', cta: 'See the examples',
    rows: [
      ['Best if', 'One of the finished sites is close to what you want.'],
      ['How', 'Copy its code as it is, or open it in the kit and change the name, words, colours and sections to make it yours.'],
      ['Time', '1 minute to copy, 5–10 to make it yours'],
    ],
    picture: (
      <div className="space-y-1.5" aria-hidden>
        {examples.slice(0, 4).map((e) => (
          <div key={e.slug} className="flex items-center gap-2 rounded-md border border-line bg-white px-2.5 py-1.5 text-xs">
            <span className="h-5 w-8 shrink-0 rounded-sm bg-paper-2" /><span className="flex-1 truncate">{e.title.split(' — ')[0]}</span><span className="shrink-0 text-pencil">Copy · Customise</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    href: '/kit', icon: LayoutTemplate, name: 'Start fresh', cta: 'Start a site', primary: true,
    rows: [
      ['Best if', 'Nothing out there is close, or you want to decide every piece.'],
      ['How', 'Say what you’re making, pick one style for every page, then add ready-made sections and effects — all shown in your colours.'],
      ['Time', '10–20 minutes'],
    ],
    picture: (
      <div className="space-y-1.5" aria-hidden>
        {['First screen', 'Featured work', 'Menu', 'Book a table'].map((s, i) => (
          <div key={s} className={`flex items-center gap-2 rounded-md border bg-white px-2.5 py-1.5 text-xs ${i === 2 ? 'border-pencil ring-1 ring-pencil' : 'border-line'}`}>
            <span className="h-5 w-8 rounded-sm bg-paper-2" /><span className="flex-1">{s}</span>{i === 2 && <span className="text-pencil">+ effect</span>}
          </div>
        ))}
      </div>
    ),
  },
]

export function TwoWays() {
  return (
    <section className="border-y border-line bg-white/60 py-16 md:py-24" aria-labelledby="two-ways">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="grid gap-4 lg:grid-cols-2 lg:items-end">
          <h2 id="two-ways" className="display text-[clamp(2.2rem,4.4vw,4rem)]">Two ways to start. Same result.</h2>
          <p className="max-w-xl text-ink-2 lg:justify-self-end">Each ends with a design recipe and a Build Package for your AI tool, and you change it in the same place. Choose by where you want to start.</p>
        </div>
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
          {WAYS.map((w) => (
            <article key={w.href} className="flex min-w-0 flex-col rounded-xl border border-line bg-paper p-6 md:p-8">
              <div className="flex items-center gap-3"><w.icon size={22} strokeWidth={1.6} aria-hidden /><h3 className="text-2xl font-medium tracking-tight">{w.name}</h3></div>
              <div className="mt-6 rounded-lg border border-line bg-paper-2/60 p-4">{w.picture}</div>
              <dl className="mt-6 flex-1 divide-y divide-line border-y border-line">
                {w.rows.map(([k, v]) => <div key={k} className="grid gap-1 py-3 sm:grid-cols-[6rem_1fr]"><dt className="text-sm text-muted">{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <Link href={w.href} className={`btn mt-6 inline-flex w-fit items-center gap-2 ${w.primary ? 'btn-ink' : 'btn-line'}`}>{w.cta}<ArrowRight size={16} aria-hidden /></Link>
            </article>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">Not sure? Look at the examples first — nothing you pick is final.</p>
      </div>
    </section>
  )
}
