'use client'
// About's remembered moment — "The map builds with the story": beside the held picture, one small map gains a layer
// for each chapter of how a map gets made. The walk lays a dotted route, the pencil sketches the streets, the ink
// goes over them, the colour washes the lake and turns the route into marker. Each new layer pencils itself in
// (CSS transitions, so scrolling back takes it off again). Phones: each chapter shows the map as it stands after it.
// Reduced motion: layers fade instead of drawing.
import type { CSSProperties } from 'react'

const pen = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, pathLength: 1, 'data-stroke': '' }
const ROUTE = 'M18 132 C 40 120, 52 96, 74 92 C 98 88, 108 112, 132 108 C 156 104, 160 70, 182 58'
const STREETS = ['M50 30 C 80 34, 120 32, 160 26', 'M46 56 C 84 60, 118 58, 150 54', 'M70 18 C 72 40, 70 60, 74 78', 'M112 16 C 110 36, 114 56, 110 74', 'M146 20 C 148 34, 146 46, 150 58']
const LAKE = 'M120 118 C 132 104, 160 102, 172 114 C 184 126, 176 146, 156 148 C 136 150, 112 136, 120 118 Z'
const HILL = ['M14 70 C 16 52, 34 46, 44 58 C 52 68, 40 84, 26 82 C 18 81, 13 77, 14 70 Z', 'M22 68 C 24 60, 32 58, 36 64 C 38 70, 32 75, 26 74 C 23 73, 21 71, 22 68 Z']

const stage = (on: boolean, d = 0) => ({ 'data-on': on ? '' : undefined, style: { '--d': `${d}ms` } as CSSProperties })

export function MiniMap({ step, steps, still = false }: { step: number; steps: string[]; still?: boolean }) {
  return (
    <figure aria-hidden className={`mini w-[min(100%,300px)] rounded-wobbly border border-(--color-text) bg-(--color-surface) p-3 ${still ? 'mini-still' : ''}`}>
      <svg viewBox="0 0 200 160" className="block h-auto w-full overflow-visible">
        {/* colour — washes sit under everything */}
        <g data-layer {...stage(step >= 3)}>
          <path d={LAKE} className="fill-(--color-secondary)" data-wash />
          <path d="M60 22 L 104 20 L 106 52 L 62 54 Z" className="fill-(--color-secondary)" data-wash fillOpacity={0.6} />
        </g>
        {/* the walk — a dotted route and where it starts */}
        <g data-layer {...stage(step >= 0)} className="text-(--color-muted)">
          <path d={ROUTE} {...pen} strokeWidth={2} strokeDasharray="0.012 0.02" data-dotted />
          <path d="M12 126 L 24 138 M24 126 L 12 138" {...pen} strokeWidth={1.6} />
        </g>
        {/* the pencil — soft, doubled sketch lines */}
        <g data-layer {...stage(step >= 1)} className="text-(--color-muted)" strokeWidth={0.8}>
          {STREETS.map((d, i) => <path key={d} d={d} {...pen} transform={`translate(${i % 2 ? 1.5 : -1} ${i % 2 ? -1 : 1.2})`} style={{ '--i': i } as CSSProperties} />)}
          <path d={LAKE} {...pen} transform="translate(2 -1.5)" />
          {HILL.map((d) => <path key={d} d={d} {...pen} />)}
        </g>
        {/* the ink — one clean line over the pencil */}
        <g data-layer {...stage(step >= 2)} className="text-(--color-text)" strokeWidth={1.4}>
          {STREETS.map((d) => <path key={d} d={d} {...pen} />)}
          <path d={LAKE} {...pen} />
        </g>
        {/* colour — the route turns to marker */}
        <g data-layer {...stage(step >= 3, 300)} className="text-(--color-accent)">
          <path d={ROUTE} {...pen} strokeWidth={2.4} />
        </g>
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-3 font-(family-name:--font-heading) [font-size:1.15rem] [font-weight:700] leading-tight">
        {steps.map((s, i) => <span key={s} className={i === step ? 'text-(--color-text) underline decoration-(--color-accent) decoration-2 underline-offset-4' : i < step ? 'text-(--color-text)' : 'text-(--color-muted)'}>{s}</span>)}
      </figcaption>
    </figure>
  )
}
