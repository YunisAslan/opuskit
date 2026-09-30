'use client'
// OpusKit section — Case Study preview: one project in depth — wide media, facts, then problem / approach / result.
// Desktop: pinned story sequence — the letterboxed frame holds while problem, approach and result advance one at a
// time and the image eases closer per chapter. Phones and reduced motion: a plain vertical read, facts under media.
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useMedia } from '@/lib/use-media'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/MediaAsset'
import { gsap, MOTION_OK } from '@/lib/motion'

export function CaseStudySection({ title, image, alt, facts, paragraphs, labels = ['Problem', 'Approach', 'Result'], href, hrefLabel = 'Next project', email }: { title: string; image: AssetKey; alt?: string; facts: { label: string; value: string }[]; paragraphs: string[]; labels?: string[]; href?: string; hrefLabel?: string; email?: string }) {
  const root = useRef<HTMLElement>(null)
  // Decide the layout first, then build the pin against the layout that is actually on screen.
  const pinned = useMedia(`(min-width: 1024px) and (min-height: 700px) and ${MOTION_OK}`)

  useEffect(() => {
    if (!pinned) return
    const ctx = gsap.context(() => {
      const el = root.current!
      const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]', el)
      const img = el.querySelector('[data-frame] img')
      gsap.set(chapters.slice(1), { autoAlpha: 0, y: 16 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: `+=${chapters.length * 100}%`, pin: true, scrub: 0.5 } })
      tl.to(img, { scale: 1.08, ease: 'none', duration: chapters.length }, 0)
      chapters.forEach((c, i) => {
        if (i === 0) return
        tl.to(chapters[i - 1], { autoAlpha: 0, y: -16, duration: 0.25, ease: 'power2.in' }, i - 0.3)
          .to(c, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i - 0.05)
      })
    }, root)
    return () => ctx.revert()
  }, [pinned])

  // React-owned wrapper: GSAP moves the section into a pin-spacer, so React must never remove the section itself.
  return (
    <div>
    <section ref={root} id="case-study" className={`px-6 md:px-10 ${pinned ? 'flex h-svh flex-col justify-center py-16' : 'py-32 md:py-40'}`}>
      <div className="mx-auto w-full max-w-[1200px]">
        <div data-frame className="overflow-hidden border-2 border-(--color-text)">
          <MediaAsset id={image} alt={alt} className={`w-full rounded-(--radius-media) object-cover ${pinned ? 'aspect-[2.39/1] max-h-[52svh]' : 'aspect-[4/5] md:aspect-[2.39/1]'}`} />
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <h2 className="type-heading">{title}</h2>
            <dl className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-1">
              {facts.map((f) => <div key={f.label}><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
            </dl>
          </div>
          <div className="type-body md:col-span-7 md:col-start-6">
            <div className={pinned ? 'grid [&>*]:[grid-area:1/1]' : 'space-y-8'}>
              {paragraphs.map((p, i) => (
                <div key={i} data-chapter>
                  <h3 className="type-utility text-(--color-muted)">{labels[i]}</h3>
                  <p className="mt-2 max-w-[62ch]">{p}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {href && <Link href={href} className="inline-flex min-h-11 items-center underline underline-offset-4">{hrefLabel}</Link>}
              {email && <Link href={`mailto:${email}`} className="inline-flex min-h-11 items-center underline underline-offset-4">{email}</Link>}
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
