'use client'
// A few seconds of a real site built with OpusKit, next to the live preview (docs/plan-for-fit.md §1, §8).
// Muted, looping; with reduced motion it waits for a tap.
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Match } from '@/features/kit/closest'

export function RealSiteClip({ match, label }: { match: Match; label: string }) {
  const [still, setStill] = useState<boolean>()
  useEffect(() => setStill(matchMedia('(prefers-reduced-motion: reduce)').matches), [])
  const { example: e, clip } = match
  return (
    <figure className="overflow-hidden rounded-lg border border-line bg-white">
      {/* Its own shape, never cropped: recordings aren't all 16:10. */}
      <div className="min-h-24 bg-paper-2">
        {still !== undefined && <video key={clip} src={clip} muted loop playsInline autoPlay={!still} controls={still} preload="metadata" className="block h-auto w-full" aria-label={`${e.title}, a few seconds of the real site`} />}
      </div>
      <figcaption className="px-3 py-2 text-xs text-muted">
        {label}: <Link href={`/examples/${e.slug}`} className="link">{e.title.split(' — ')[0]}</Link>, built with OpusKit. Colours and typefaces will follow your choices.
      </figcaption>
    </figure>
  )
}
