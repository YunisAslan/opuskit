'use client'
// OpusKit piece — a story told while you read: chapters of text scroll by on one side while a picture beside them
// stays in view, and each new chapter's picture wipes up over the last as that chapter arrives — the wipe follows the
// scroll exactly (GSAP ScrollTrigger scrub; gsap, its own standard licence). Phones and reduced motion: each chapter
// simply carries its own picture above its text, nothing held or wiped.
// Original OpusKit code (MIT). Fitted to this site: pictures come in as nodes (next/image via the asset layer), and
// `overlay(active)` draws on top of the held picture — the chapter in the middle of the screen is `active`;
// `inline(i)` adds a node under each chapter's own picture on phones.
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

type Chapter = { picture: ReactNode; body: ReactNode }

export function ScrollStory({ chapters, side = 'right', overlay, inline, className }: {
  /** 3–6 chapters: a picture each (filling its box), and its text (a heading and a short paragraph). */ chapters: Chapter[]
  /** Where the held picture sits. */ side?: 'left' | 'right'
  overlay?: (active: number) => ReactNode
  inline?: (i: number) => ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const pics = gsap.utils.toArray<HTMLElement>('[data-story-pic]', root.current)
      const texts = gsap.utils.toArray<HTMLElement>('[data-story-text]', root.current)
      pics.forEach((pic, i) => {
        if (!i) return
        const scrollTrigger = { trigger: texts[i], start: 'top bottom', end: 'top 40%', scrub: true }
        gsap.fromTo(pic, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger })
        gsap.fromTo(pic.querySelector('img'), { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger })
        gsap.to(pics[i - 1].querySelector('img'), { scale: 0.94, ease: 'none', scrollTrigger }) // the old picture steps back
      })
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    const texts = [...(root.current?.querySelectorAll('[data-story-text]') ?? [])]
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(texts.indexOf(e.target))
    }, { rootMargin: '-40% 0px -40% 0px' })
    texts.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={root} className={`grid gap-(--gutter) lg:grid-cols-2 ${className ?? ''}`}>
      <div className={`hidden lg:motion-safe:block ${side === 'left' ? '' : 'lg:order-2'}`}>
        <div className="sticky top-0 flex h-svh items-center py-[8svh]">
          <div className="relative size-full overflow-hidden rounded-(--radius-media)">
            {chapters.map((c, i) => (
              <div key={i} aria-hidden data-story-pic className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>{c.picture}</div>
            ))}
            {overlay && <div className="absolute inset-x-0 bottom-0 z-10 p-4">{overlay(active)}</div>}
          </div>
        </div>
      </div>
      <div>
        {chapters.map((c, i) => (
          <article key={i} data-story-text className="flex flex-col justify-center gap-6 py-10 lg:motion-safe:min-h-svh lg:motion-safe:py-0">
            <div className="lg:motion-safe:hidden">
              <div className="relative aspect-[4/3] overflow-hidden rounded-(--radius-media)">{c.picture}</div>
              {inline?.(i)}
            </div>
            <div className="max-w-[44ch]">{c.body}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
