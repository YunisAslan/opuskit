import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { notFound as copy } from '@/content/site'

// 404 — "You've walked off the map": the site's own big move, a map drawn in ink, here torn off at the edge of the
// sheet; the dashed trail runs out over the edge where this page should have been. It pencils in at first paint.
const s = (d: number, t = 900) => ({ '--d': `${d}ms`, '--t': `${t}ms` }) as React.CSSProperties
const pen = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const, pathLength: 1, 'data-stroke': '' }

export default function NotFound() {
  return (
    <section className="px-(--gutter) pb-(--section-y) pt-28 md:pt-36">
      <div className="grid-site items-center gap-y-10">
        <div className="col-span-full lg:col-span-6">
          <h1 className="type-display">{copy.title}</h1>
          <p className="type-body mt-6 max-w-[40ch] text-(--color-muted)">{copy.line}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/" className={buttonVariants({ size: 'lg' })}>{copy.home}</Link>
            <DrawnLink href="/contact" stroke="wave" className="type-utility py-3">{copy.action}</DrawnLink>
          </div>
        </div>
        <svg viewBox="0 0 600 500" aria-hidden className="draw-load col-span-full h-auto w-full overflow-visible lg:col-span-6">
          {/* the sheet, its right edge torn */}
          <path d="M20 20 L 470 20 L 462 60 L 480 96 L 458 140 L 476 190 L 452 236 L 474 280 L 450 330 L 470 380 L 448 430 L 464 480 L 20 480 Z" {...pen} className="text-(--color-text)" strokeWidth={1.4} style={s(0, 1400)} />
          <g className="text-(--color-muted)" strokeWidth={1}>
            <path d="M60 380 C 70 320, 150 300, 200 330 C 250 360, 230 430, 160 440 C 100 448, 54 430, 60 380 Z" {...pen} style={s(300)} />
            <path d="M96 382 C 104 346, 150 336, 180 352 C 208 368, 196 410, 156 414 C 120 418, 92 408, 96 382 Z" {...pen} style={s(400)} />
          </g>
          <g className="text-(--color-text)" strokeWidth={1.6}>
            <path d="M80 80 C 140 90, 200 84, 260 70 M100 140 C 160 146, 220 140, 290 128 M130 60 C 128 100, 134 140, 130 180 M210 56 C 214 96, 208 136, 214 176" {...pen} style={s(500, 700)} />
            <path d="M300 220 C 330 200, 380 206, 392 236 C 404 266, 372 290, 338 286 C 304 282, 284 248, 300 220 Z" {...pen} style={s(700)} />
          </g>
          {/* the trail: from the town, round the lake, and off the edge */}
          <path d="M170 180 C 180 220, 230 250, 290 262 C 330 290, 380 320, 430 300 C 470 284, 500 300, 540 330" {...pen} className="text-(--color-accent)" strokeWidth={2.2} strokeDasharray="1" style={s(1000, 1200)} />
          <path d="M520 316 L 548 344 M548 316 L 520 344" {...pen} className="text-(--color-accent)" strokeWidth={2.6} style={s(2100, 300)} />
          <text data-note x={482} y={392} className="font-(family-name:--font-heading) fill-(--color-accent) [font-size:30px] [font-weight:700]" style={s(2300)} transform="rotate(-5 482 392)">you are here</text>
          <text data-note x={300} y={470} className="font-(family-name:--font-heading) fill-(--color-muted) [font-size:22px]" style={s(1600)}>{copy.edge}</text>
        </svg>
      </div>
    </section>
  )
}
