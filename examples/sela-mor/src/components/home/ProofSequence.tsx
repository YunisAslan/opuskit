'use client'
// "Proof, one at a time" (Home, Featured Work). Desktop: the chapter holds still for (works × 70vh) of scroll while
// the five works replace each other, each owning the screen, with a counter in the utility face. Moving the mouse
// over it leaves a trail of that work's photos (ImageTrail). Phones: no pin, the works stack, each at least a screen
// tall, the counter beside each. Reduced motion: the same plain stacked list everywhere.
// Every work is a real element in the DOM, in order, for screen readers.
import Link from 'next/link'
import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef, useState } from 'react'
import { ImageTrail } from '@/components/pieces/ImageTrail'
import type { Work } from '@/content/site'

const pad = (n: number) => String(n).padStart(2, '0')

export function ProofSequence({ works }: { works: Work[] }) {
  const block = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: block, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => setActive(Math.min(works.length - 1, Math.max(0, Math.floor(p * works.length)))))

  // Keyboard: tabbing to a work that is not on screen scrolls the pin to it.
  const show = (i: number) => {
    const el = block.current
    if (!el || i === active || !matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches) return
    const top = el.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + ((i + 0.5) / works.length) * (el.offsetHeight - innerHeight) })
  }

  return (
    <div ref={block} style={{ '--proof-h': `${works.length * 70 + 30}vh` } as never} className="motion-safe:md:h-(--proof-h)">
      <ImageTrail photos={works[active].trail} spacing={110} className="motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-svh">
        <ol className="motion-safe:md:relative motion-safe:md:h-svh">
          {works.map((w, i) => (
            <li key={w.slug} data-active={i === active || undefined} onFocus={() => show(i)}
              className="flex min-h-svh items-center px-5 py-16 md:px-8 motion-safe:md:absolute motion-safe:md:inset-0 motion-safe:md:min-h-0 motion-safe:md:translate-y-6 motion-safe:md:opacity-0 motion-safe:md:transition-[opacity,translate] motion-safe:md:duration-500 motion-safe:md:ease-(--ease-out-soft) motion-safe:md:data-active:translate-y-0 motion-safe:md:data-active:opacity-100 motion-safe:md:[&:not([data-active])]:pointer-events-none">
              <article className="mx-auto grid w-full max-w-[1440px] gap-8 md:grid-cols-12 md:items-center md:gap-8">
                <div className="md:col-span-6 md:col-start-7 md:row-start-1">
                  <img src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} loading="lazy"
                    className="aspect-[4/5] w-full rounded-media object-cover md:aspect-[3/4] md:max-h-[72svh] md:w-auto md:justify-self-end" />
                </div>
                <div className="md:col-span-5 md:row-start-1">
                  <p className="type-utility text-(--color-muted)" aria-hidden>{pad(i + 1)} / {pad(works.length)}</p>
                  <h3 className="type-heading mt-6">{w.title}</h3>
                  <p className="type-body mt-3 text-(--color-muted)">{w.kind}, <span className="type-utility">{w.year}</span></p>
                  <p className="type-body mt-6 max-w-[46ch]">{w.text}</p>
                  <Link href={`/works#${w.slug}`} className="type-body mt-8 inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 transition-opacity duration-150 hover:opacity-70">
                    More on {w.title}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </ImageTrail>
    </div>
  )
}
