// OpusKit piece — adapted from Magic UI "Grid Pattern" (MIT © Magic UI, https://magicui.design).
// Hairline grid behind a section, drawn in the border token; optional filled cells mark real positions (a seat map, a schedule).
import { useId } from 'react'

export function GridPattern({ size = 48, cells = [], fade = true, className }: { size?: number; cells?: [number, number][]; fade?: boolean; className?: string }) {
  const id = useId()
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 size-full stroke-(--color-border) ${className ?? ''}`}
      style={fade ? { maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' } : undefined}>
      <defs>
        <pattern id={id} width={size} height={size} patternUnits="userSpaceOnUse" x={-1} y={-1}>
          <path d={`M.5 ${size}V.5H${size}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {cells.map(([x, y]) => <rect key={`${x}-${y}`} className="fill-(--color-accent)/15" strokeWidth={0} width={size - 1} height={size - 1} x={x * size} y={y * size} />)}
    </svg>
  )
}
