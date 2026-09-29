'use client'
// OpusKit piece — uses Paper Shaders "Grain Gradient" (Apache-2.0 © Paper Design, https://shaders.paper.design).
// A slow, grainy colour field drawn on the GPU from the recipe's own colours — a living background with the texture of print.
import { GrainGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const read = (el: Element, v: string) => getComputedStyle(el).getPropertyValue(v).trim()

export function ShaderGrain({ shape = 'wave', className }: { shape?: 'wave' | 'dots' | 'truchet' | 'corners' | 'ripple' | 'blob'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [c, setC] = useState<{ back: string; colors: string[] } | null>(null)
  useEffect(() => { const el = ref.current; if (el) setC({ back: read(el, '--color-background'), colors: [read(el, '--color-accent'), read(el, '--color-surface'), read(el, '--color-text')] }) }, [])
  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className ?? ''}`}>
      {c && <GrainGradient style={{ width: '100%', height: '100%' }} colorBack={c.back} colors={c.colors} softness={0.7} intensity={0.25} noise={0.35} shape={shape} speed={reduce ? 0 : 0.4} />}
    </div>
  )
}
