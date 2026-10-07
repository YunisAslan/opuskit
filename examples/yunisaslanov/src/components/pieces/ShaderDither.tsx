'use client'
// OpusKit piece — uses Paper Shaders "Dithering" (Apache-2.0 © Paper Design, https://shaders.paper.design).
// A 1-bit dithered pattern in two recipe colours, like an old screen or a risograph — graphic, never glossy.
import { Dithering } from '@paper-design/shaders-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const read = (el: Element, v: string) => getComputedStyle(el).getPropertyValue(v).trim()

export function ShaderDither({ shape = 'warp', size = 3, className }: { shape?: 'simplex' | 'warp' | 'dots' | 'wave' | 'ripple' | 'swirl' | 'sphere'; size?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [c, setC] = useState<{ back: string; front: string } | null>(null)
  useEffect(() => { const el = ref.current; if (el) setC({ back: read(el, '--color-background'), front: read(el, '--color-accent') }) }, [])
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className ?? ''}`}>
      {c && <Dithering style={{ width: '100%', height: '100%' }} colorBack={c.back} colorFront={c.front} shape={shape} type="4x4" size={size} speed={reduce ? 0 : 0.3} />}
    </div>
  )
}
