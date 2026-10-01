import Link from 'next/link'
import { CutReveal } from '@/components/pieces/CutReveal'
import { Button } from '@/components/ui/button'

// Hero — Typographic statement: one sentence at display scale on the 12-column grid, a metadata row beneath in
// 4 × 3 columns. Lines are broken by hand: three on desktop, four on phones (~15vw). Each line is a CutReveal,
// 80 ms apart — the line-by-line reveal. Nothing else moves.
const DESKTOP = ['Stay long', 'enough to see', 'a place.']
const MOBILE = ['Stay long', 'enough', 'to see', 'a place.']

function Lines({ lines, className }: { lines: string[]; className: string }) {
  return (
    <span className={className}>
      {lines.map((l, i) => <CutReveal key={l} as="span" delay={0.15 + i * 0.08} className="block">{l}</CutReveal>)}
    </span>
  )
}

export function Hero({ issue, date, latest }: { issue: number; date: string; latest: { title: string; href: string } }) {
  return (
    <section className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-between px-6 pb-8 pt-12 md:pt-16">
      <h1 className="type-display [font-size:15vw] sm:[font-size:clamp(3rem,13vw,15rem)] sm:leading-[0.88]">
        <Lines lines={MOBILE} className="sm:hidden" />
        <Lines lines={DESKTOP} className="hidden sm:block" />
      </h1>
      <div className="type-utility mt-16 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-(--color-border) pt-5 md:grid-cols-12">
        <p className="md:col-span-3"><span className="block text-(--color-muted)">This issue</span>Issue {issue}, {date}</p>
        <p className="md:col-span-3"><span className="block text-(--color-muted)">The essay</span>
          <Link href={latest.href} className="underline decoration-(--color-border) underline-offset-4 hover:decoration-current">{latest.title}</Link></p>
        <p className="col-span-2 max-w-[38ch] md:col-span-3">Long-form travel essays, one place at a time, every second Sunday.</p>
        <div className="col-span-2 md:col-span-3 md:justify-self-end">
          <Button asChild size="lg" className="w-full md:w-auto"><Link href="/newsletter">Get the next issue</Link></Button>
        </div>
      </div>
    </section>
  )
}
