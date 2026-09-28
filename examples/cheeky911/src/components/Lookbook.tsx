'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { products } from '@/config/products'
import { loadScroll } from '@/lib/motion'
import MediaAsset from './MediaAsset'

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]))

const looks = [
  { large: 2, small: 3, note: 'Concrete, low light, a hand on the bonnet.', pieces: ['gt3-rs-obsidian', 'gt3-rs-weissach-jet-black'] },
  { large: 7, small: 6, note: 'Red on red, then black on black.', pieces: ['gt3-carmine-red', 'turbo-black'] },
  { large: 8, small: 9, note: 'Two yellows, two seasons.', pieces: ['gt3-rs-racing-yellow', 'carrera-signal-yellow'] },
  { large: 4, small: 5, note: 'A white room and a very large wing.', pieces: ['gt3-rs-night-blue', 'turbo-s-midnight'] },
  { large: 0, small: 1, note: 'Grey and blue, parked where they were left.', pieces: ['gt3-rs-arctic-grey', 'gt3-rs-gentian-blue'] },
]

// Sideways scrolling gallery: pinned on desktop, vertical scroll drives the track.
// Small screens and reduced motion get a native scroll-snap row instead.
export default function Lookbook() {
  // Pin an inner element, never the component root: GSAP wraps the pinned node in a
  // pin-spacer, and React must still find the root under its original parent on unmount.
  const pin = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let dead = false
    let revert = () => {}
    loadScroll().then(({ gsap }) => {
      if (dead) return
      const mm = gsap.matchMedia()
      revert = () => mm.revert()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const t = track.current!
        t.classList.add('is-pinned')
        const distance = () => t.scrollWidth - window.innerWidth
        gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: { trigger: pin.current, pin: true, start: 'top top', end: () => `+=${distance()}`, scrub: 1, invalidateOnRefresh: true },
        })
        return () => t.classList.remove('is-pinned')
      })
    })
    return () => {
      dead = true
      revert()
    }
  }, [])

  return (
    <section aria-labelledby="lookbook-title">
      <div ref={pin} className="flex min-h-svh flex-col justify-center overflow-hidden py-24 md:h-svh md:py-0">
        <div className="mx-auto w-full max-w-[1200px] px-6 pb-8 md:pb-12">
          <h2 id="lookbook-title" className="type-heading">The lookbook</h2>
          <p className="type-utility mt-2 text-muted">Five looks, shot as found. Swipe or scroll.</p>
        </div>
        <div
          ref={track}
          className="lookbook-track flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 [scrollbar-width:none] md:gap-24 md:px-[max(24px,calc((100vw-1200px)/2+24px))]"
        >
          {looks.map((look, i) => (
            <article key={i} className="flex w-[85vw] shrink-0 snap-start flex-col gap-6 md:w-auto md:flex-row md:items-end md:gap-8">
              <div data-reveal="clip" className="relative aspect-[4/5] w-full overflow-hidden bg-surface md:h-[62svh] md:w-auto">
                <MediaAsset id="yourPhotos" index={look.large} sizes="(min-width: 768px) 40vw, 85vw" />
              </div>
              <div className="flex gap-6 md:w-64 md:flex-col">
                <div data-reveal="clip" className="relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-surface md:w-full">
                  <MediaAsset id="yourPhotos" index={look.small} sizes="(min-width: 768px) 16rem, 7rem" />
                </div>
                <div>
                  <p className="whitespace-nowrap font-display text-4xl font-extrabold leading-none [font-stretch:150%]">Look {i + 1}</p>
                  <p className="type-utility mt-3 text-muted">{look.note}</p>
                  <ul className="mt-3">
                    {look.pieces.map((slug) => (
                      <li key={slug}>
                        <Link href={`/shop#${slug}`} className="text-link inline-flex min-h-11 items-center md:min-h-8">
                          {bySlug[slug].name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
