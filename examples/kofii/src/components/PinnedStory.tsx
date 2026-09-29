'use client'
import { useEffect, useRef } from 'react'
import { gsap, useReducedMotionSafe } from '@/lib/motion'
import { MediaAsset } from './MediaAsset'

type Chapter = { title: string; text: string; photo: number }

// Pinned story sequence: the visual stays while text chapters advance; photos crossfade per chapter.
// Reduced motion: unpinned, chapters as a plain list with static media.
export function PinnedStory({ chapters }: { chapters: Chapter[] }) {
  const reduce = useReducedMotionSafe()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      const el = root.current!
      const texts = gsap.utils.toArray<HTMLElement>('[data-chapter]', el)
      const media = gsap.utils.toArray<HTMLElement>('[data-chapter-media]', el)
      gsap.set([...texts.slice(1), ...media.slice(1)], { autoAlpha: 0 })
      gsap.set(texts.slice(1), { y: 24 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top top', end: `+=${chapters.length * 100}%`, pin: true, scrub: 0.5 },
      })
      texts.forEach((t, i) => {
        if (i === 0) return
        tl.to(texts[i - 1], { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' }, i)
          .to(media[i - 1], { autoAlpha: 0, duration: 0.6 }, i)
          .to(media[i], { autoAlpha: 1, duration: 0.6 }, i)
          .to(t, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, i + 0.3)
      })
      tl.to({}, { duration: 0.6 }) // hold the last chapter
    })
    return () => mm.revert()
  }, [reduce, chapters.length])

  if (reduce)
    return (
      <div className="container-text grid gap-16 py-32">
        {chapters.map((c) => (
          <div key={c.title} className="grid items-center gap-8 md:grid-cols-2">
            <MediaAsset photo={c.photo} fit="contain" className="aspect-[4/5]" sizes="(min-width: 768px) 50vw, 100vw" />
            <ChapterText c={c} />
          </div>
        ))}
      </div>
    )

  return (
    <div ref={root} className="container-text grid gap-16 py-32 md:h-[100svh] md:grid-cols-2 md:items-center md:gap-24 md:py-0">
      <div className="relative hidden aspect-[4/5] max-h-[76svh] md:block">
        {chapters.map((c) => (
          <div key={c.title} data-chapter-media className="absolute inset-0">
            <MediaAsset photo={c.photo} fit="contain" className="h-full w-full" sizes="50vw" />
          </div>
        ))}
      </div>
      {/* Mobile: chapters stack with their own photo; desktop: they share one slot */}
      <div className="grid gap-16 md:[&>*]:col-start-1 md:[&>*]:row-start-1">
        {chapters.map((c) => (
          <div key={c.title} data-chapter>
            <MediaAsset photo={c.photo} fit="contain" className="mb-8 aspect-[4/5] md:hidden" sizes="100vw" reveal="clip" />
            <ChapterText c={c} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ChapterText({ c }: { c: Chapter }) {
  return (
    <div>
      <h3 className="type-statement">{c.title}</h3>
      <p className="mt-6 max-w-[44ch] text-lg">{c.text}</p>
    </div>
  )
}
