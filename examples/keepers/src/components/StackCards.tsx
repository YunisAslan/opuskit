'use client'
import { useEffect, useRef, useState } from 'react'
import type { AssetKey } from '@/config/assets'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import MediaAsset from './MediaAsset'

export type Feature = { title: string; body: string; proof: string; image: AssetKey }

// Signature moment: sticky cards with rising top offsets; as the next card
// arrives the previous one scales to 0.94 and dims. Reduced motion: plain list.
export default function StackCards({ items }: { items: Feature[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const [stack, setStack] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStack(false)
      return
    }
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]')
      cards.slice(0, -1).forEach((card, i) => {
        gsap.to(card.querySelector('[data-card-inner]'), {
          scale: mobile ? 0.97 : 0.94,
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: 0.5 },
        })
        gsap.to(card.querySelector('[data-card-dim]'), {
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: 0.5 },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <ol ref={ref} className="flex flex-col gap-6 md:gap-12">
      {items.map((f, i) => (
        <li
          key={f.title}
          data-card
          className={stack ? 'sticky md:[--stack-step:24px]' : ''}
          style={stack ? { top: `calc(96px + ${i} * var(--stack-step, 12px))` } : undefined}
        >
          <div data-card-inner className="relative origin-top border-2 border-border bg-surface">
            <div className="grid md:grid-cols-12">
              <div className="flex flex-col gap-4 p-6 md:col-span-5 md:p-8">
                <h2 className="type-heading">{f.title}</h2>
                <p className="type-body">{f.body}</p>
                <p className="type-utility mt-auto border-t border-border pt-4 text-muted">{f.proof}</p>
              </div>
              <div className="relative aspect-[4/3] bg-text md:col-span-7 md:aspect-auto md:min-h-[420px]">
                <MediaAsset id={f.image} sizes="(min-width: 768px) 60vw, 100vw" />
              </div>
            </div>
            <span data-card-dim aria-hidden="true" className="pointer-events-none absolute inset-0 bg-text opacity-0" />
          </div>
        </li>
      ))}
    </ol>
  )
}
