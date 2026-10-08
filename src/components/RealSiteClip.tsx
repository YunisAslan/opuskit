'use client'
// A few seconds of a real site built with OpusKit, next to the live preview (docs/plan-examples.md §1).
// Muted, looping; with reduced motion it waits for a tap.
import { Maximize2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import type { Match } from '@/features/kit/closest'

// The site's name as its title starts: "Halvik 65, a compact…" → "Halvik 65".
const siteName = (m: Match) => m.example.title.split(/ [—|] |, |: /)[0]

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
        {label}: <Link href={`/library/sites/example/${e.slug}`} className="link">{siteName(match)}</Link>, built with OpusKit. Colours and typefaces will follow your choices.
      </figcaption>
    </figure>
  )
}

/** The real site inside an option tile, so the options themselves show where each one leads. Plays while on screen
 *  (still with reduced motion). Small effects need a closer look: the corner button opens it large. It sits above the
 *  tile's own pick button (pointer-events back on, z-10), so a tile can still be a picture inside a button-covered card. */
export function TileClip({ match, className = 'aspect-video' }: { match: Match; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const v = ref.current
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [match.clip])
  const name = siteName(match)
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      <video ref={ref} key={match.clip} src={`${match.clip}#t=0.1`} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" aria-label={`${name}, a real site built with OpusKit`} />
      <button type="button" aria-label={`See ${name} larger`} onClick={(e) => { e.stopPropagation(); setOpen(true) }}
        className="pointer-events-auto absolute bottom-1.5 right-1.5 z-10 rounded-[3px] bg-white/90 p-1.5 text-ink shadow-sm hover:bg-white">
        <Maximize2 size={13} aria-hidden />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(92vw,1100px)] sm:max-w-[min(92vw,1100px)]">
          <DialogTitle className="sr-only">{name}</DialogTitle>
          <video src={match.clip} muted loop playsInline autoPlay controls className="block h-auto w-full rounded-md" />
          <DialogDescription className="text-xs">
            <Link href={`/library/sites/example/${match.example.slug}`} className="link">{name}</Link>, built with OpusKit. Colours and typefaces will follow your choices.
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}

/** Two ways to see one option: a real site built with OpusKit, and the same thing drawn in your own colours and type.
 *  Swipe (or tap the switch) between them; without a real site it is just the drawing. The switch sits above any
 *  covering pick button (pointer-events back on, z-10), like TileClip's. */
export function DualShot({ real, drawn, className = 'aspect-[16/10]' }: { real?: Match; drawn: ReactNode; className?: string }) {
  const strip = useRef<HTMLDivElement>(null)
  const [side, setSide] = useState(0)
  if (!real) return <>{drawn}</>
  const go = (i: number) => strip.current?.scrollTo({ left: i * strip.current.clientWidth, behavior: 'smooth' })
  return (
    <div className={`relative ${className}`}>
      <div ref={strip} onScroll={(e) => setSide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="pointer-events-auto flex size-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="size-full shrink-0 snap-start"><TileClip match={real} className="size-full" /></div>
        <div className="pointer-events-none size-full shrink-0 snap-start overflow-hidden">{drawn}</div>
      </div>
      <span role="group" aria-label="Show" className="pointer-events-auto absolute bottom-1.5 left-1.5 z-10 flex rounded-[3px] bg-white/90 p-0.5 text-[10px] font-medium shadow-sm">
        {['Real site', 'Your style'].map((l, i) => (
          <button key={l} type="button" aria-pressed={side === i} onClick={(e) => { e.stopPropagation(); go(i) }}
            className={`rounded-[3px] px-2 py-0.5 ${side === i ? 'bg-ink text-paper' : 'text-ink-2 hover:text-ink'}`}>{l}</button>
        ))}
      </span>
    </div>
  )
}
