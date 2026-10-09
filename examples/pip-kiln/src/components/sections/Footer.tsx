// OpusKit section — Footer, "Signature columns" (the variant this site uses): a dark band in the text colour, the logo
// large on the left (5 of 12 columns), link columns with headings, then a hairline and one row: copyright left, legal
// links right. Pip & Kiln: the band starts on a glaze-drip edge (the yellow page drips into the ink), links draw the
// wavy underline, and a sticker cracks the last joke.
import type { ReactNode } from 'react'
import { WaveLink } from '@/components/parts/WaveLink'

export type FooterColumn = { title: string; links: { label: string; href: string; current?: boolean }[] }
type Link = { label: string; href: string }

// Drips of the page's yellow hanging into the ink band: [centre x, width, length] on a 1440 × 90 box.
const DRIPS: [number, number, number][] = [[70, 34, 46], [190, 22, 70], [330, 40, 36], [520, 26, 82], [640, 18, 40], [810, 36, 58], [990, 24, 30], [1110, 30, 76], [1290, 20, 44], [1390, 34, 60]]
const dripPath = (() => {
  const b = 14
  let d = `M0 0 H1440 V${b}`
  for (const [x, w, l] of [...DRIPS].reverse()) {
    const a = x + w / 2, z = x - w / 2
    d += ` L${a + 10} ${b} Q${a} ${b} ${a} ${b + 10} V${b + l - w / 2} A${w / 2} ${w / 2} 0 0 1 ${z} ${b + l - w / 2} V${b + 10} Q${z} ${b} ${z - 10} ${b}`
  }
  return d + ` L0 ${b} Z`
})()

export function FooterSection({ logo, columns, legal, copyright, line, sticker }: {
  logo: ReactNode; columns: FooterColumn[]; legal?: Link[]; copyright: string; line?: string; sticker?: string
}) {
  return (
    <footer data-tone="inverse" className="relative mt-auto overflow-hidden px-(--gutter) pb-[calc(32px+env(safe-area-inset-bottom,0px))]">
      <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full text-(--inv-text) md:h-20">
        <path d={dripPath} fill="currentColor" />
      </svg>
      <div className="relative mx-auto grid max-w-(--container) gap-12 pt-28 md:grid-cols-12 md:gap-6 md:pt-40">
        <div className="md:col-span-5">
          {logo}
          {sticker && (
            <p className="t-action mt-8 inline-block max-w-[22ch] -rotate-3 rounded-(--radius-card) bg-(--color-text) px-5 py-3 text-(--color-background)">{sticker}</p>
          )}
        </div>
        <div className="grid gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7 md:gap-6">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="min-w-0">
              <h2 className="t-card">{col.title}</h2>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label} className="min-w-0">
                    <WaveLink href={l.href} current={l.current} className="t-action [overflow-wrap:anywhere] opacity-90">{l.label}</WaveLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="relative mx-auto mt-20 flex max-w-(--container) flex-col gap-4 border-t border-current/25 pt-6 md:mt-28 md:flex-row md:items-baseline md:justify-between">
        <p className="type-caption">{copyright}{line && <span className="block text-(--color-muted) md:ml-4 md:inline">{line}</span>}</p>
        {legal && (
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legal.map((l) => <li key={l.href}><WaveLink href={l.href} className="type-caption">{l.label}</WaveLink></li>)}
          </ul>
        )}
      </div>
    </footer>
  )
}
