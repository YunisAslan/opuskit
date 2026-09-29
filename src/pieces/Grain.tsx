// OpusKit piece — adapted from Magic UI "Noise Texture" (MIT © Magic UI, https://magicui.design).
// Film grain over a section or the whole page, generated in SVG (no image file). Keep it at ≤ 4–8% so it is felt, not seen.
import { useId } from 'react'

export function Grain({ opacity = 0.06, frequency = 0.75, fixed = false, className }: { opacity?: number; frequency?: number; fixed?: boolean; className?: string }) {
  const id = useId()
  return (
    <svg aria-hidden className={`pointer-events-none inset-0 z-40 size-full select-none mix-blend-multiply ${fixed ? 'fixed' : 'absolute'} ${className ?? ''}`} style={{ opacity }}>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={3} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  )
}
