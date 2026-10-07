'use client'
// Gallery — Sideways strip: one row of large photos at a shared height, each at its own width, a small counter in the
// utility face. From 1024px the section pins and the vertical scroll carries the row sideways; on phones (and with
// reduced motion) it is a native swipe row with scroll-snap. Any photo opens full size in a Dialog with a Carousel.
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { Lines } from '@/components/motion'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { assets, type AssetKey } from '@/config/assets'

export type GalleryPhoto = { image: AssetKey; caption: string }
const two = (n: number) => String(n).padStart(2, '0')

export function GallerySection({ id, title, photos }: { id?: string; title: string; photos: GalleryPhoto[] }) {
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const row = useRef<HTMLUListElement>(null)
  const [pin, setPin] = useState(false)
  const [dist, setDist] = useState(0)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const [api, setApi] = useState<CarouselApi>()
  const [slide, setSlide] = useState(0)
  const n = photos.length

  useEffect(() => {
    const mq = matchMedia('(min-width: 1024px)')
    const measure = () => {
      setPin(mq.matches && !reduce)
      if (row.current) setDist(Math.max(0, row.current.scrollWidth - row.current.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (row.current) ro.observe(row.current)
    mq.addEventListener('change', measure)
    return () => { ro.disconnect(); mq.removeEventListener('change', measure) }
  }, [reduce])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, pin ? -dist : 0])
  useMotionValueEvent(scrollYProgress, 'change', (p) => { if (pin) setIndex(Math.round(p * (n - 1))) })

  useEffect(() => {
    if (!api) return
    const on = () => setSlide(api.selectedScrollSnap())
    on()
    api.on('select', on)
    return () => { api.off('select', on) }
  }, [api])

  // Keyboard: a focused photo in the pinned row is brought into view by scrolling the page to its place.
  const focusAt = (i: number) => {
    if (!pin || !section.current) return
    const top = section.current.getBoundingClientRect().top + scrollY
    scrollTo({ top: top + (i / (n - 1)) * dist, behavior: 'instant' })
  }

  return (
    <section ref={section} id={id} className={pin ? 'relative' : 'section-y'} style={pin ? { height: `calc(100svh + ${dist}px)` } : undefined}>
      <div className={pin ? 'sticky top-0 flex h-svh flex-col justify-center overflow-hidden' : ''}>
        <div className="mx-auto flex w-full max-w-(--container) items-baseline justify-between gap-6 px-(--gutter)">
          <Lines lines={[title]} className="type-heading" />
          <p className="type-utility shrink-0 tabular-nums text-(--color-muted)" aria-live="polite">{two(index + 1)} / {two(n)}</p>
        </div>
        <motion.ul
          ref={row}
          style={{ x }}
          onScroll={(e) => { if (!pin) { const el = e.currentTarget; setIndex(Math.round((el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth)) * (n - 1))) } }}
          className={`mt-10 flex gap-4 px-(--gutter) md:gap-8 ${pin ? '' : 'snap-x snap-mandatory scroll-px-(--gutter) overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'}`}
        >
          {photos.map((p, i) => {
            const a = assets[p.image]
            return (
              <li key={p.image} className="shrink-0 snap-start">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  onFocus={() => focusAt(i)}
                  aria-label={`${p.caption}: open full size`}
                  className="group relative block h-[52svh] max-w-[85vw] cursor-zoom-in overflow-hidden rounded-media focus-visible:outline-none lg:h-[64vh] lg:max-w-none"
                  style={{ aspectRatio: `${a.width} / ${a.height}` }}
                >
                  <MediaAsset id={p.image} fill sizes="(min-width: 1024px) 60vw, 85vw" className="transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]" />
                </button>
                <p className="type-utility mt-3 text-(--color-muted)">{p.caption}</p>
              </li>
            )
          })}
        </motion.ul>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="flex max-h-[96svh] flex-col gap-4 border-0 bg-background p-4 sm:max-w-[min(1200px,94vw)] md:p-6">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">Use the arrow keys or the buttons to move between photos.</DialogDescription>
          {open !== null && (
            <Carousel opts={{ startIndex: open, loop: true }} setApi={setApi}>
              <CarouselContent>
                {photos.map((p) => (
                  <CarouselItem key={p.image}>
                    <div className="relative h-[72svh] md:h-[78vh]">
                      <MediaAsset id={p.image} fill sizes="94vw" className="!object-contain" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="type-utility text-(--color-muted)">{photos[slide]?.caption} <span className="tabular-nums">{two(slide + 1)} / {two(n)}</span></p>
                <div className="flex gap-2">
                  <CarouselPrevious className="static my-0" />
                  <CarouselNext className="static my-0" />
                </div>
              </div>
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
