'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { products, type Product } from '@/config/products'
import { finePointer, prefersReducedMotion } from '@/lib/motion'
import MediaAsset from './MediaAsset'

const filters = ['All', 'Available', 'Reserved', 'Sold'] as const

// List with a floating preview: one 4:5 preview follows the cursor (rAF lerp 0.15) on fine pointers;
// reduced motion pins it beside the list; touch/small screens show inline thumbnails.
export default function ProductList() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [active, setActive] = useState<number | null>(null)
  const [mode, setMode] = useState<'follow' | 'fixed' | 'none'>('none')
  const list = useRef<HTMLDivElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const shown = products.filter((p) => filter === 'All' || p.availability === filter)

  useEffect(() => {
    if (!finePointer() || window.innerWidth < 768) return
    setMode(prefersReducedMotion() ? 'fixed' : 'follow')
  }, [])

  useEffect(() => {
    if (mode !== 'follow') return
    const el = list.current!, p = preview.current!
    const target = { x: 0, y: 0 }, pos = { x: 0, y: 0 }
    let raf = 0, first = true
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      target.x = Math.min(e.clientX - r.left + 32, r.width - p.offsetWidth)
      target.y = e.clientY - r.top - p.offsetHeight / 2
      if (first) { pos.x = target.x; pos.y = target.y; first = false }
    }
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.15
      pos.y += (target.y - pos.y) * 0.15
      p.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const leave = () => { first = true; setActive(null) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [mode])

  // Arriving on /shop#<slug> (hero, lookbook, cards) opens that car's details.
  useEffect(() => {
    const open = () => {
      const el = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el instanceof HTMLDetailsElement) el.open = true
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])

  const row = (p: Product) => (
    <li key={p.slug} className="border-b border-border">
      <details id={p.slug} className="scroll-mt-24">
        <summary
          onPointerEnter={() => setActive(p.photo)}
          onFocus={() => setActive(p.photo)}
          className="group grid min-h-11 grid-cols-[4rem_1fr_auto] items-center gap-x-4 py-4 md:grid-cols-[4rem_1fr_6rem_8rem_8rem] md:gap-x-6 md:py-6 md:pointer-fine:grid-cols-[1fr_6rem_8rem_8rem]"
        >
          <span className="relative aspect-[4/5] w-16 overflow-hidden bg-surface max-md:row-span-2 md:pointer-fine:hidden">
            <MediaAsset id="yourPhotos" index={p.photo} alt="" sizes="64px" />
          </span>
          <span className="font-heading text-xl font-bold leading-tight group-hover:text-muted md:text-3xl md:[font-stretch:120%]">{p.name}</span>
          <span className="type-utility text-muted max-md:hidden">{p.year}</span>
          <span className={`type-utility max-md:col-start-2 ${p.availability === 'Available' ? 'text-text' : 'text-muted'}`}>{p.availability}</span>
          <span className="text-right max-md:col-start-3 max-md:row-start-1">{p.price}</span>
        </summary>
        <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:gap-8">
          <div className="relative aspect-[4/5] w-40 shrink-0 overflow-hidden bg-surface md:w-56">
            <MediaAsset id="yourPhotos" index={p.photo} sizes="224px" />
          </div>
          <div>
            <p className="type-body max-w-[52ch]">{p.line}</p>
            <p className="type-utility mt-2 text-muted">{p.year}, {p.availability.toLowerCase()}, {p.price}</p>
            {p.availability !== 'Sold' && (
              <Link href="/contact" className="text-link mt-4 inline-flex min-h-11 items-center">Enquire about this car</Link>
            )}
          </div>
        </div>
      </details>
    </li>
  )

  return (
    <section aria-labelledby="shop-title" className="mx-auto max-w-[1200px] px-6 pb-40 pt-40 md:pt-48">
      <h1 id="shop-title" className="type-display [font-size:clamp(3rem,9vw,8rem)]">
        <span className="block stretch-wide">The cars</span>
      </h1>
      <p className="type-body mt-6 max-w-[52ch] text-muted">
        Every 911 we show is for sale, inspected and photographed as found. Choose one and start a conversation; viewings are by appointment.
      </p>
      <div role="group" aria-label="Filter by availability" className="mt-12 flex flex-wrap gap-x-6">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className="min-h-11 text-muted hover:text-text aria-pressed:text-accent"
          >
            {f}
          </button>
        ))}
      </div>
      <div className={`relative mt-6 ${mode === 'fixed' ? 'grid grid-cols-[1fr_14rem] gap-12' : ''}`} ref={list}>
        <ul className="border-t border-border">{shown.map(row)}</ul>
        {mode !== 'none' && (
          <div
            ref={preview}
            aria-hidden
            className={`pointer-events-none aspect-[4/5] w-56 overflow-hidden bg-surface transition-opacity duration-[250ms] ease-out ${
              mode === 'follow' ? 'absolute left-0 top-0 z-10' : 'sticky top-24'
            } ${active === null && mode === 'follow' ? 'opacity-0' : 'opacity-100'}`}
          >
            {products.map((p) => (
              <div key={p.slug} className={`absolute inset-0 transition-opacity duration-[250ms] ease-out ${active === p.photo || (active === null && mode === 'fixed' && p === shown[0]) ? 'opacity-100' : 'opacity-0'}`}>
                <MediaAsset id="yourPhotos" index={p.photo} alt="" sizes="224px" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
