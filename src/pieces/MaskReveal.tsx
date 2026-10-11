'use client'
// OpusKit piece — a window that opens onto the picture: the section starts as the page's own colour with a small
// shaped window in the middle (an arch, a circle or a rounded frame) showing the picture; scrolling holds the section
// and opens the window until the picture fills the screen, while the words beside it draw apart. GSAP ScrollTrigger
// pins and scrubs it (gsap, its own standard licence). Reduced motion: the picture full width, the words above it.
// Original OpusKit code (MIT).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type ReactNode } from 'react'

// Start and end of the window, as clip-paths with the same parts (so GSAP can tween between them).
const SHAPES = {
  arch: ['inset(22% 37% 9% 37% round 50vw 50vw 0px 0px)', 'inset(0% 0% 0% 0% round 0vw 0vw 0px 0px)'],
  circle: ['circle(16% at 50% 55%)', 'circle(75% at 50% 50%)'],
  frame: ['inset(24% 30% 16% 30% round 24px)', 'inset(0% 0% 0% 0% round 0px)'],
} as const

export function MaskReveal({ src, alt, shape = 'arch', left, right, children, className }: {
  src: string; alt: string
  /** The window's shape. */ shape?: keyof typeof SHAPES
  /** Words either side of the window, drawn apart as it opens ("Costa" · "del Sol"). */ left?: ReactNode; right?: ReactNode
  /** The title over the start, fading as the picture takes over. */ children?: ReactNode
  className?: string
}) {
  const root = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      const [from, to] = SHAPES[shape]
      gsap.timeline({ scrollTrigger: { trigger: root.current, pin: true, scrub: 0.6, end: '+=120%' } })
        .fromTo(q('[data-window]'), { clipPath: from }, { clipPath: to, ease: 'power2.inOut', duration: 1 }, 0)
        .fromTo(q('[data-window] img'), { scale: 1.25 }, { scale: 1, ease: 'power2.inOut', duration: 1 }, 0)
        .to(q('[data-left]'), { xPercent: -140, opacity: 0, ease: 'power2.in', duration: 0.7 }, 0)
        .to(q('[data-right]'), { xPercent: 140, opacity: 0, ease: 'power2.in', duration: 0.7 }, 0)
        .to(q('[data-title]'), { opacity: 0, y: -40, ease: 'power1.in', duration: 0.45 }, 0)
    })
    return () => mm.revert()
  }, [shape])

  return (
    <section ref={root} className={`relative h-svh overflow-hidden ${className ?? ''}`}>
      <div data-window className="absolute inset-0 motion-reduce:relative motion-reduce:inset-auto motion-reduce:mt-[40svh] motion-reduce:h-[60svh] motion-reduce:[clip-path:none]!" style={{ clipPath: SHAPES[shape][0] }}>
        <img src={src} alt={alt} className="size-full object-cover" />
      </div>
      {children && <div data-title className="pointer-events-none absolute inset-x-0 top-[8%] flex justify-center px-(--gutter,24px) text-center">{children}</div>}
      {left && <div data-left className="absolute left-(--gutter,24px) top-1/2 -translate-y-1/2 font-(family-name:--font-utility) text-sm tracking-[0.3em] uppercase">{left}</div>}
      {right && <div data-right className="absolute right-(--gutter,24px) top-1/2 -translate-y-1/2 font-(family-name:--font-utility) text-sm tracking-[0.3em] uppercase">{right}</div>}
    </section>
  )
}
