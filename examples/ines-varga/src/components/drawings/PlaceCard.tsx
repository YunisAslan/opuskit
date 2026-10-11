'use client'
// Contact's remembered moment — "Your place on the map": a small sheet beside the form. As the visitor types where
// their map is for, the place is lettered onto the sheet by a marker cross, and a dashed route draws itself from
// Ines's desk to it. Empty, the cross waits in pencil. Phones: the sheet sits above the form, shorter.
// Reduced motion: the route and the name fade in instead of drawing.
import { motion, useReducedMotion } from 'motion/react'

const ROUTE = 'M58 212 C 96 196, 104 160, 150 150 C 196 140, 214 172, 256 150 C 296 128, 296 86, 330 70'

export function PlaceCard({ place, labels }: { place: string; labels: { desk: string; yours: string; empty: string; title: string } }) {
  const reduce = useReducedMotion()
  const has = place.trim().length > 0
  const t = reduce ? { duration: 0.2 } : { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const }
  return (
    <figure aria-hidden className="relative rounded-wobbly border border-(--color-text) bg-(--color-surface) p-4">
      <figcaption className="type-utility text-(--color-muted)">{labels.title}</figcaption>
      <div className="relative mt-2 aspect-[16/10] sm:aspect-[4/3]">
        <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet" aria-hidden className="absolute inset-0 size-full overflow-visible">
          {/* pencil ground: a few contour lines and a river so it reads as a sheet, not a chart */}
          <g fill="none" stroke="currentColor" strokeLinecap="round" className="text-(--color-muted)" strokeWidth={0.8} opacity={0.7}>
            <path d="M20 60 C 60 30, 120 40, 150 70 C 170 92, 140 110, 100 104 C 60 98, 30 90, 20 60 Z" />
            <path d="M44 66 C 70 52, 110 58, 124 74 C 132 86, 110 92, 86 88 C 62 84, 46 80, 44 66 Z" />
            <path d="M230 250 C 260 214, 330 200, 400 210" />
            <path d="M226 260 C 254 226, 330 214, 400 222" />
          </g>
          {/* the desk */}
          <g fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="text-(--color-text)">
            <path d="M40 226 L 40 204 L 58 190 L 76 204 L 76 226 Z M52 226 L 52 214 L 64 214 L 64 226" />
          </g>
          {/* the route: pencil dots while it waits, marker dashes once there is a place */}
          <path d={ROUTE} fill="none" stroke="currentColor" strokeWidth={1.4} strokeDasharray="1 7" strokeLinecap="round" className="text-(--color-muted)" />
          <mask id="place-route" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="260">
            <motion.path d={ROUTE} fill="none" stroke="#fff" strokeWidth={10} initial={false} animate={{ pathLength: has ? 1 : 0, opacity: reduce ? (has ? 1 : 0) : 1 }} transition={t} />
          </mask>
          <path d={ROUTE} fill="none" stroke="currentColor" strokeWidth={2.4} strokeDasharray="7 8" strokeLinecap="round" className="text-(--color-accent)" mask="url(#place-route)" />
          {/* the cross */}
          <path d="M320 60 L 340 80 M340 60 L 320 80" fill="none" stroke="currentColor" strokeWidth={has ? 3 : 1.6} strokeLinecap="round" className={has ? 'text-(--color-accent)' : 'text-(--color-muted)'} />
        </svg>
        <span className="absolute bottom-[2%] left-[4%] font-(family-name:--font-heading) [font-size:1.2rem] [font-weight:700]">{labels.desk}</span>
        <span className="absolute right-[2%] top-[34%] max-w-[55%] text-right">
          {has
            ? <motion.span key={place.trim().slice(0, 1)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: reduce ? 'easeOut' : (p: number) => (p < 0.5 ? 0 : 1) }}
                className="type-note block [overflow-wrap:anywhere] [font-size:clamp(1.4rem,2.6vw,2rem)]">{place.trim().slice(0, 60)}</motion.span>
            : <span className="font-(family-name:--font-heading) block text-(--color-muted) [font-size:1.2rem] [font-weight:700]">{labels.empty}</span>}
        </span>
      </div>
    </figure>
  )
}
