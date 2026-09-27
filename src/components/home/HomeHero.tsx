'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SitePreview, previewFromDirection } from '@/components/SitePreview'
import { Swatches } from '@/components/ui'
import { directions, motionLevels } from '@/data/taxonomy'
import { layouts } from '@/data/ingredients'
import type { DirectionId } from '@/types/domain'

const DEMO: { id: DirectionId; label: string; brand: string; title: string }[] = [
  { id: 'japanese-minimal', label: 'Quiet', brand: 'Hara', title: 'Objects for slow mornings' },
  { id: 'luxury-editorial', label: 'Editorial', brand: 'Maison Vey', title: 'The Autumn Collection' },
  { id: 'dark-cinematic', label: 'Cinematic', brand: 'Nocturne', title: 'Light, held still' },
  { id: 'neo-brutalist', label: 'Raw', brand: 'GOODS®', title: 'Good stuff. Fair price.' },
  { id: 'organic-modern', label: 'Organic', brand: 'Terra', title: 'Shaped by hand' },
]

export function HomeHero() {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((n) => (n + 1) % DEMO.length), 3600)
    return () => clearInterval(t)
  }, [auto])

  const demo = DEMO[i]
  const d = directions[demo.id]
  const p = previewFromDirection(demo.id, { brand: demo.brand, title: demo.title })

  return (
    <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[5fr_7fr] lg:gap-16 lg:pb-28 lg:pt-20">
      <div>
        <h1 className="display text-[clamp(3.2rem,7.4vw,7.2rem)]">Build websites worth remembering.</h1>
        <p className="mt-7 max-w-md text-lg text-ink-2">Tell us what you want your website to feel like. We&apos;ll turn it into a buildable design recipe — for your AI tool or your own code.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/create" className="btn btn-ink">Create your recipe</Link>
          <Link href="/explore" className="btn btn-line">Explore recipes</Link>
        </div>
      </div>

      <figure>
        <div className="relative lg:pr-40">
          <SitePreview {...p} className="rounded-lg shadow-[0_1px_0_var(--color-line),0_30px_60px_-30px_rgba(21,20,19,.35)]" />
          {/* blue-pencil annotations, desktop */}
          <Annot className="right-0 top-[8%]" label="Type" value={`${p.type.display.family} + ${p.type.body.family}`} />
          <Annot className="right-0 top-[32%]" label="Palette" value={<Swatches colors={Object.values(p.colors).slice(0, 6)} />} />
          <Annot className="right-0 top-[56%]" label="Layout" value={layouts[p.layout].name} />
          <Annot className="right-0 top-[78%]" label="Motion" value={motionLevels[p.motion].name} />
        </div>
        <figcaption className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-sm text-muted">Same website, different direction:</span>
          <div role="radiogroup" aria-label="Preview direction" className="flex flex-wrap gap-1.5">
            {DEMO.map((x, n) => (
              <button key={x.id} role="radio" aria-checked={n === i} onClick={() => { setI(n); setAuto(false) }}
                className="rounded-full border border-line px-3 py-1.5 text-sm transition-colors hover:border-ink aria-checked:border-ink aria-checked:bg-ink aria-checked:text-paper">{x.label}</button>
            ))}
          </div>
          <span className="w-full text-sm text-muted lg:hidden">{d.name}: {p.type.display.family} + {p.type.body.family}, {layouts[p.layout].name.toLowerCase()} layout, {motionLevels[p.motion].name.toLowerCase()} motion.</span>
        </figcaption>
      </figure>
    </section>
  )
}

function Annot({ label, value, className }: { label: string; value: React.ReactNode; className: string }) {
  return (
    <div className={`pencil absolute hidden w-36 lg:block ${className}`}>
      <span className="pencil-line absolute -left-10 top-2 h-px w-8" aria-hidden />
      <span className="block opacity-70">{label}</span>
      <span className="block text-[.85rem] leading-tight">{value}</span>
    </div>
  )
}
