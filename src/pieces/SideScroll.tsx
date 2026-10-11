'use client'
// OpusKit piece — a sideways strip: the section holds still while scrolling down moves its row of pictures sideways,
// like walking past a gallery wall, then the page carries on. GSAP ScrollTrigger pins and scrubs it (gsap, its own
// standard licence). Phones and reduced motion get a native swipe row with snap instead — no pin. Every item stays a
// real element in order, and tabbing to one scrolls the page to where it is in view.
// Original OpusKit code (MIT).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type ReactNode } from 'react'

export function SideScroll({ children, label, className }: {
  /** One node per item: a figure with its picture and caption. */ children: ReactNode[]
  /** What the items are, for the region and the progress line (e.g. "Rooms"). */ label?: string
  className?: string
}) {
  const root = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null), bar = useRef<HTMLSpanElement>(null)

  // A layout effect, so GSAP takes its pin out before React removes the section.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const t = track.current!, distance = () => Math.max(0, t.scrollWidth - root.current!.clientWidth)
      const tween = gsap.to(t, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: root.current, pin: true, scrub: 0.6, end: () => `+=${distance()}`, invalidateOnRefresh: true,
          onUpdate: (st) => { if (bar.current) bar.current.style.transform = `scaleX(${st.progress})` },
        },
      })
      // Keyboard: an item reached by Tab is brought into view by scrolling the page, not the row.
      const onFocus = (e: FocusEvent) => {
        const st = tween.scrollTrigger!, item = [...t.children].find((c) => c.contains(e.target as Node)) as HTMLElement | undefined
        if (!item || !distance()) return
        const at = Math.min(1, Math.max(0, (item.offsetLeft + item.offsetWidth / 2 - root.current!.clientWidth / 2) / distance()))
        window.scrollTo({ top: st.start + at * (st.end - st.start) })
      }
      t.addEventListener('focusin', onFocus)
      return () => t.removeEventListener('focusin', onFocus)
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-label={label} className={`relative flex flex-col justify-center overflow-hidden md:motion-safe:h-svh ${className ?? ''}`}>
      <div ref={track} className="flex snap-x snap-mandatory gap-(--gutter,24px) overflow-x-auto px-(--gutter,24px) pb-4 md:motion-safe:snap-none md:motion-safe:overflow-visible md:motion-safe:pb-0 [&>*]:shrink-0 [&>*]:snap-start">
        {children}
      </div>
      <div aria-hidden className="mx-(--gutter,24px) mt-6 hidden items-center gap-4 font-(family-name:--font-utility) text-sm text-(--color-muted) md:motion-safe:flex">
        {label && <span>{label}</span>}
        <span className="relative h-px flex-1 bg-(--color-border)"><span ref={bar} className="absolute inset-0 origin-left bg-(--color-text)" style={{ transform: 'scaleX(0)' }} /></span>
      </div>
    </section>
  )
}
