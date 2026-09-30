'use client'
// Kit pieces branch on the reduced-motion preference while rendering, which can't match the server HTML.
// These wrappers render a static twin with the same layout until hydration, then mount the real piece.
import type { ComponentProps } from 'react'
import { TiltedGrid } from '@/components/pieces/TiltedGrid'
import { VelocityBand } from '@/components/pieces/VelocityBand'
import { useHydrated } from '@/lib/use-media'

export function Band(props: ComponentProps<typeof VelocityBand>) {
  const ready = useHydrated()
  if (ready) return <VelocityBand {...props} />
  return <div role="img" aria-label={props.text} className={`overflow-hidden whitespace-nowrap ${props.className ?? ''}`}><div aria-hidden className="flex w-max -translate-x-1/2">{[0, 1, 2, 3].map((k) => <span key={k} className="pr-[0.5em]">{props.text}</span>)}</div></div>
}

export function Grid(props: ComponentProps<typeof TiltedGrid>) {
  const ready = useHydrated()
  if (ready) return <TiltedGrid {...props} />
  return (
    <div className={`overflow-hidden ${props.className ?? ''}`}>
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${props.columns ?? 5}, minmax(0, 1fr))` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- mirrors the kit piece markup */}
        {props.photos.map((p, i) => <img key={p.src + i} src={p.src} alt={p.alt} className="aspect-[3/4] w-full object-cover" />)}
      </div>
    </div>
  )
}
