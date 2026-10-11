'use client'
// The site's motion system (recipe/motion.md): hard cut, image clip reveal, line-by-line headline reveal, pencil
// strokes drawing in, and parallax drift. Every entrance is "armed" only if it starts below the fold, so the first
// screen is complete and readable before anything moves, and nothing is hidden without JavaScript. Plays once.
import { motion, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useRef, useState, type ElementType, type ReactNode, type CSSProperties } from 'react'

type State = 'idle' | 'armed' | 'in'

/** Arms an element that is still below the fold, then lets it in once it is 20% into view. */
export function useEntrance<T extends HTMLElement | SVGElement>(threshold = 0.2, always = false) {
  const ref = useRef<T>(null)
  const [state, setState] = useState<State>('idle')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top
    if (!always && top < innerHeight * 0.92) return // already on the first screen: leave it whole
    setState('armed')
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { raf = requestAnimationFrame(() => requestAnimationFrame(() => setState('in'))); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [threshold, always])
  return [ref, state === 'idle' ? undefined : state] as const
}

/** Hard cut: the children land like paper on a table, 50ms apart. */
export function Cut({ as: Tag = 'div', className, children, style }: { as?: ElementType; className?: string; children: ReactNode; style?: CSSProperties }) {
  const [ref, state] = useEntrance<HTMLDivElement>()
  return <Tag ref={ref} data-cut={state} className={className} style={style}>{children}</Tag>
}

/** Image clip reveal: the frame opens from the bottom like a curtain; the picture inside settles from 1.15. */
export function ClipReveal({ className, children }: { className?: string; children: ReactNode }) {
  const [ref, state] = useEntrance<HTMLDivElement>(0.15)
  // The observer watches this unclipped frame: a clip-path on the target itself would read as zero area.
  return <div ref={ref} className={`overflow-clip ${className ?? ""}`}><div data-clip={state ?? ''} className="relative size-full">{children}</div></div>
}

/** Line-by-line headline: one masked line per entry, 80ms apart. */
export function Lines({ as: Tag = 'h2', lines, className, id }: { as?: ElementType; lines: ReactNode[]; className?: string; id?: string }) {
  const [ref, state] = useEntrance<HTMLHeadingElement>(0.3)
  return (
    <Tag ref={ref} id={id} data-lines={state} className={className}>
      {lines.map((l, i) => <span key={i} className="line-mask"><span style={{ '--line': i } as CSSProperties}>{l}</span></span>)}
    </Tag>
  )
}

/** A drawing whose strokes (paths with data-stroke + pathLength="1") pencil themselves in once. */
export function Draw({ as: Tag = 'div', className, children, always = false, style }: { as?: ElementType; className?: string; children: ReactNode; always?: boolean; style?: CSSProperties }) {
  const [ref, state] = useEntrance<HTMLDivElement>(0.25, always)
  return <Tag ref={ref} data-draw={state} className={className} style={style}>{children}</Tag>
}

/** Parallax drift: the picture travels 8% of its frame (4% on phones, set in CSS) inside an overflow-hidden frame at 1.1. */
export function Drift({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div className={`absolute inset-0 ${reduce ? '' : 'drift'}`} style={reduce ? undefined : ({ '--p': scrollYProgress } as never)}>{children}</motion.div>
    </div>
  )
}
