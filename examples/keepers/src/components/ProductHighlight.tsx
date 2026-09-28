'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { details, packs } from '@/config/product'
import { ScrollTrigger, prefersReducedMotion } from '@/lib/motion'
import MediaAsset from './MediaAsset'
import SectionHeader from './SectionHeader'
import TiltCard from './TiltCard'

// Home 02: the film keeps playing (glass pour, glass on ice) behind a sticky
// panel while four details advance. Reduced motion: unpinned static list.
export default function ProductHighlight() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPinned(false)
      return
    }
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setActive(Math.min(details.length - 1, Math.floor(self.progress * details.length))),
    })
    return () => st.kill()
  }, [])

  const d = details[active]
  return (
    <>
      <section
        ref={ref}
        aria-labelledby="product-title"
        className={`relative z-10 ${pinned ? 'h-[220svh] md:h-[300svh]' : ''}`}
      >
        <div className={`${pinned ? 'sticky top-0 h-svh' : ''} flex flex-col justify-end md:justify-center`}>
          <div className="container-text grid grid-cols-12 gap-6 pb-6 md:pb-0">
            <div className="col-span-12 bg-surface/90 p-6 md:col-span-6 md:p-8 lg:col-span-5">
              <h2 id="product-title" className="type-heading">Keepers Citrus Coffee Soda, in detail</h2>
              <ol className="mt-6 border-t border-border">
                {details.map((x, i) => (
                  <li
                    key={x.label}
                    aria-current={pinned && i === active ? 'step' : undefined}
                    className={`grid grid-cols-[96px_1fr] gap-4 border-b border-border py-4 transition-opacity duration-300 ${pinned && i !== active ? 'opacity-40' : ''}`}
                  >
                    <span className="type-utility">{x.label}</span>
                    <span>
                      <span className="type-heading block text-2xl">
                        {x.value} {x.unit}
                      </span>
                      <span className={`type-body mt-1 block ${pinned && i !== active ? 'hidden md:block' : ''}`}>{x.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {pinned && (
              <p aria-hidden="true" className="type-display pointer-events-none col-span-12 hidden self-end text-right text-background md:col-span-6 md:col-start-7 md:block lg:col-span-7 lg:col-start-6">
                <span key={active} className="line">
                  <span className="animate-[rise_600ms_cubic-bezier(0.22,1,0.36,1)] motion-reduce:animate-none">
                    {d.value}
                    <span className="block text-[0.4em] leading-none">{d.unit}</span>
                  </span>
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Packs and prices" className="relative z-10 bg-background/90 py-32 md:py-40">
        <div className="container-text">
          <SectionHeader label="Pre-order" title={['Pick a box.', 'First cans ship 3 November.']} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {packs.map((p) => (
              <li key={p.name}>
                <TiltCard className="h-full">
                  <Link href="/pricing" className="flex h-full flex-col bg-surface">
                    <span className="relative block aspect-[4/3] overflow-hidden bg-text">
                      <MediaAsset id={p.image} sizes="(min-width: 768px) 33vw, 100vw" />
                    </span>
                    <span className="flex flex-1 flex-col gap-2 border-x-2 border-b-2 border-border p-6">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="type-heading">{p.name}</span>
                        <span className="type-heading">{p.price}</span>
                      </span>
                      <span className="type-utility text-muted">{p.per}</span>
                      <span className="type-body">{p.note}</span>
                    </span>
                  </Link>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
