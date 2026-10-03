'use client'
// Signature moment — a walk through named stops (Venue & travel). Each stop is a full-viewport panel: the photo stays
// pinned while its small card arrives, holds and leaves, then the next stop slides up over it. A stop index sits at the
// right (current one marked; hovering a name previews that stop in a fixed slot; clicking walks there). Phones: taller
// stacked panels, the index is a row of names at the top of the section, and proximity snapping is on while the walk is
// on screen. Reduced motion: no snapping, no scaling, cards shown in place. Any photo opens larger in a dialog carousel.
import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { MediaAsset } from './MediaAsset'
import { StopCard } from './StopCard'
import { walk } from '@/content/site'
import { assets } from '@/config/assets'
import { scrollToY, useReducedMotionSafe } from '@/lib/motion'

type WalkStop = (typeof walk)[number]

function Panel({ stop, onOpen }: { stop: WalkStop; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const scale = useTransform(p, [0, 1], [1.08, 1])
  const opacity = useTransform(p, [0.04, 0.22, 0.82, 1], [0, 1, 1, 0])
  const y = useTransform(p, [0.04, 0.22], [24, 0])
  const card = (
    <StopCard name={stop.name} text={stop.text} link={stop.link}>
      <Button type="button" variant="outline" size="sm" onClick={onOpen} className="type-utility mt-4 h-11 gap-2 border-(--color-border) px-3"><Expand className="size-3.5" aria-hidden />See it larger</Button>
    </StopCard>
  )
  return (
    <div ref={ref} id={stop.id} data-walk-stop className="relative h-[150svh] snap-start md:h-[200svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
          <MediaAsset id={stop.image} className="h-full w-full object-cover" />
        </motion.div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_0%_100%,color-mix(in_srgb,var(--color-background)_70%,transparent),transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-10 md:px-10 md:pb-16">
          <div className="mx-auto max-w-[1440px]">
            {reduce ? card : <motion.div style={{ opacity, y }}>{card}</motion.div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Walk() {
  const section = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotionSafe()
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    const panels = [...section.current!.querySelectorAll<HTMLElement>('[data-walk-stop]')]
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setCurrent(panels.indexOf(e.target as HTMLElement))
    }, { rootMargin: '-50% 0px -50% 0px' })
    panels.forEach((el) => io.observe(el))
    // Proximity snapping on touch screens only (Lenis drives the scroll on a fine pointer), and only inside the walk.
    const snappy = !reduce && !matchMedia('(pointer: fine)').matches
    const html = document.documentElement
    const inside = new IntersectionObserver(([e]) => { if (snappy) html.style.scrollSnapType = e.isIntersecting ? 'y proximity' : '' })
    inside.observe(section.current!)
    return () => { io.disconnect(); inside.disconnect(); html.style.scrollSnapType = '' }
  }, [reduce])

  const go = (i: number) => {
    const el = document.getElementById(walk[i].id)
    if (el) scrollToY(el.getBoundingClientRect().top + scrollY + innerHeight * 0.3)
  }
  const names = (row: boolean) => walk.map((s, i) => (
    <li key={s.id}>
      <button type="button" onClick={() => go(i)} onPointerEnter={() => setHovered(i)} onPointerLeave={() => setHovered(null)} aria-current={i === current ? 'location' : undefined}
        className={`type-utility flex min-h-11 items-center gap-3 whitespace-nowrap text-(--color-muted) transition-colors duration-150 hover:text-(--color-text) focus-visible:text-(--color-text) focus-visible:underline aria-[current=location]:text-(--color-text) ${row ? 'px-3' : 'justify-end'}`}>
        {s.name}
        {!row && <span aria-hidden className={`h-px w-6 origin-right transition-[transform,background-color] duration-300 ${i === current ? 'bg-(--color-accent)' : 'scale-x-50 bg-(--color-muted)'}`} />}
      </button>
    </li>
  ))

  return (
    <div ref={section} className="relative">
      <nav aria-label="Stops in the hangar" className="sticky top-16 z-20 bg-(--color-background)/90 md:hidden">
        <ol className="flex overflow-x-auto px-2">{names(true)}</ol>
      </nav>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden md:block">
        <nav aria-label="Stops in the hangar" className="pointer-events-auto sticky top-[calc(50svh-6rem)] flex items-start gap-4 pr-6">
          {/* Hover preview, pointer devices only: a fixed slot that crossfades to the stop under the pointer. */}
          <div aria-hidden className="relative hidden aspect-[4/3] w-40 [@media(hover:hover)_and_(pointer:fine)]:block">
            {walk.map((s, i) => (
              <img key={s.id} src={assets[s.image].src} alt="" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[250ms] ease-out ${hovered === i ? 'opacity-100' : 'opacity-0'}`} />
            ))}
          </div>
          <ol className="bg-(--color-background)/70 px-3 py-1">{names(false)}</ol>
        </nav>
      </div>
      {walk.map((s, i) => <Panel key={s.id} stop={s} onOpen={() => setOpen(i)} />)}

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="w-[min(1200px,calc(100vw-2rem))] max-w-none border border-(--color-border) bg-(--color-background) p-4 ring-0 sm:max-w-none md:p-8">
          <DialogTitle className="type-heading font-semibold [font-size:1.25rem]">Inside Lowfield</DialogTitle>
          <DialogDescription className="sr-only">Photos of the four stops, one at a time. Use the arrows or swipe.</DialogDescription>
          {open !== null && (
            <Carousel opts={{ startIndex: open, loop: true }} className="mx-auto w-full">
              <CarouselContent>
                {walk.map((s) => (
                  <CarouselItem key={s.id}>
                    <figure>
                      <MediaAsset id={s.image} className="mx-auto max-h-[70svh] w-auto object-contain" />
                      <figcaption className="type-utility mt-3 text-(--color-muted)">{s.name}. {s.text}</figcaption>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex justify-end gap-2">
                <CarouselPrevious className="static size-11 translate-y-0" />
                <CarouselNext className="static size-11 translate-y-0" />
              </div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
