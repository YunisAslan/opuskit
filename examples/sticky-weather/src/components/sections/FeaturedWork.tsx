'use client'
import Link from 'next/link'
// (link defaults to next/link: this is a client component, so a server page cannot pass it.)
// OpusKit section — Featured Work as "names that reveal photos": a full-width list of titles in the display face; on a
// fine pointer the photo appears in a 4:5 frame that follows the cursor with a light lag (keyboard focus shows it too);
// on touch and on phones each row starts with a small thumbnail instead.
// Signature moment "Each item brings its own colours": as a project reaches the middle of the screen, the whole
// section takes that project's ground and ink (500ms). Reduced motion: colours switch at once, the frame doesn't travel.
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useRef, useState, type ElementType, type FocusEvent, type PointerEvent } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'

export type Project = { title: string; meta: string; image: string; alt: string; href?: string; id?: string; ground?: string; ink?: string; text?: string }

export function FeaturedWorkSection({ link: L = Link, title, titleAs = 'h2', eyebrow, projects }: {
  link?: ElementType; title: string; titleAs?: 'h1' | 'h2'; eyebrow?: string; projects: Project[]
}) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(-1)
  const [shown, setShown] = useState<number | null>(null)
  const list = useRef<HTMLUListElement>(null)
  const x = useSpring(0, { stiffness: 260, damping: 28, mass: 0.6 })
  const y = useSpring(0, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    const rows = [...(list.current?.querySelectorAll<HTMLElement>('[data-row]') ?? [])]
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const i = rows.indexOf(e.target as HTMLElement)
        if (e.isIntersecting) setActive(i)
        else if (i === 0 && e.boundingClientRect.top > (e.rootBounds?.bottom ?? 0)) setActive(-1) // scrolled back above the list
      }
    }, { rootMargin: '-45% 0px -45% 0px' })
    rows.forEach((r) => io.observe(r))
    return () => io.disconnect()
  }, [projects.length])

  const now = projects[active]
  const place = (cx: number, cy: number, jump = false) => { if (jump || reduce) { x.jump(cx); y.jump(cy) } else { x.set(cx); y.set(cy) } }

  return (
    <section className="field-y px-5 transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none md:px-6"
      style={{ backgroundColor: now?.ground ?? 'var(--color-background)', color: now?.ink ?? 'var(--color-text)' }}>
      <div className="mx-auto max-w-[1200px]">
        {eyebrow && <p className="type-body max-w-[40ch]">{eyebrow}</p>}
        <TextEffect as={titleAs} className={`${titleAs === 'h1' ? 'type-display' : 'type-heading'} mt-3 text-balance`}>{title}</TextEffect>
        <ul ref={list} className="relative mt-12 border-b border-current/25"
          onPointerMove={(e) => { if (e.pointerType !== 'mouse') return; const r = e.currentTarget.getBoundingClientRect(); place(e.clientX - r.left, e.clientY - r.top) }}
          onPointerLeave={() => setShown(null)}>
          {projects.map((p, i) => {
            const Row: ElementType = p.href ? L : 'div'
            return (
              <li key={p.title} id={p.id} data-row className="scroll-mt-28 border-t border-current/25">
                <Row {...(p.href ? { href: p.href } : { tabIndex: 0 })} className="group grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2 py-7 max-md:grid-cols-[4rem_1fr] max-md:gap-x-4 max-md:py-5 pointer-coarse:grid-cols-[4rem_1fr] pointer-coarse:gap-x-4"
                  onPointerEnter={(e: PointerEvent) => { if (e.pointerType === 'mouse') { if (shown === null) { const r = list.current!.getBoundingClientRect(); place(e.clientX - r.left, e.clientY - r.top, true) } setShown(i) } }}
                  onFocus={(e: FocusEvent<HTMLElement>) => { const r = list.current!.getBoundingClientRect(), b = e.currentTarget.getBoundingClientRect(); place(b.left - r.left + b.width * 0.72, b.top - r.top + b.height / 2, shown === null); setShown(i) }}
                  onBlur={() => setShown(null)}>
                  <img src={p.image} alt="" loading="lazy" decoding="async" className="row-span-2 hidden aspect-[4/5] w-16 self-start rounded-(--radius-media) object-cover max-md:block pointer-coarse:block" />
                  <div className="min-w-0">
                    <h3 className="type-display text-balance transition-transform duration-300 ease-out [font-size:clamp(2rem,5.5vw,4.75rem)] group-hover:translate-x-3 group-focus-visible:translate-x-3 group-focus-visible:underline group-focus-visible:decoration-2 group-focus-visible:underline-offset-8 motion-reduce:transform-none">{p.title}</h3>
                    {p.text && <p className="type-body mt-3 max-w-[52ch] opacity-90">{p.text}</p>}
                  </div>
                  <p className="type-utility self-start pt-3 max-md:self-auto max-md:pt-0 pointer-coarse:self-auto pointer-coarse:pt-0">{p.meta}</p>
                </Row>
              </li>
            )
          })}
          <motion.div aria-hidden className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[clamp(200px,19vw,280px)] -translate-x-1/2 -translate-y-1/2 md:block pointer-coarse:hidden" style={{ x, y }}>
            <AnimatePresence>
              {shown !== null && (
                <motion.div key="frame" className="relative aspect-[4/5] overflow-hidden rounded-(--radius-media)"
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.85, rotate: reduce ? 0 : -4 }} animate={{ opacity: 1, scale: 1, rotate: reduce ? 0 : 3 }} exit={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}>
                  {projects.map((p, i) => (
                    <img key={p.title} src={p.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200" style={{ opacity: shown === i ? 1 : 0 }} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ul>
      </div>
    </section>
  )
}
