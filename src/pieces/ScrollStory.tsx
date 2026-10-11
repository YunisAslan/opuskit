'use client'
// OpusKit piece — a story told while you read: chapters of text scroll by on one side while a picture beside them
// stays in view, and each new chapter's picture wipes up over the last as that chapter arrives — the wipe follows the
// scroll exactly (GSAP ScrollTrigger scrub; gsap, its own standard licence). Phones and reduced motion: each chapter
// simply carries its own picture above its text, nothing held or wiped.
// Original OpusKit code (MIT).
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef, type ReactNode } from 'react'

type Chapter = { src: string; alt: string; body: ReactNode }

export function ScrollStory({ chapters, side = 'right', className }: {
  /** 3–6 chapters: a picture each, and its text (a heading and a short paragraph). */ chapters: Chapter[]
  /** Where the held picture sits. */ side?: 'left' | 'right'
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
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

  return (
    <div ref={root} className={`grid gap-(--gutter,24px) md:grid-cols-2 ${className ?? ''}`}>
      <div aria-hidden className={`hidden md:motion-safe:block ${side === 'left' ? '' : 'md:order-2'}`}>
        <div className="sticky top-0 h-svh overflow-hidden">
          {chapters.map((c, i) => (
            <div key={i} data-story-pic className="absolute inset-0 overflow-hidden" style={{ zIndex: i }}>
              <img src={c.src} alt="" className="size-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div>
        {chapters.map((c, i) => (
          <article key={i} data-story-text className="flex flex-col justify-center gap-6 py-12 md:motion-safe:min-h-svh md:motion-safe:py-0">
            <img src={c.src} alt={c.alt} loading="lazy" className="aspect-[4/3] w-full object-cover md:motion-safe:hidden" />
            <div className="max-w-md">{c.body}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
