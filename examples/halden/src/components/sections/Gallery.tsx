'use client'
// Gallery — Photo story, made Halden's own. Photo and words in pairs that change sides and widths on the 12 columns
// (7/5, then 5/7), then one frame full-bleed at 100svh — so the rhythm never repeats twice. Each pair opens together
// (picture first, words after); the picture drifts a little slower than the page (≤ 8%). Any photo opens the set
// full-screen (Dialog + Carousel). Phones: photo then words, every photo full width, the same order.
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { ImageReveal, Lines, Reveal } from '@/components/motion/Reveal'
import { MediaAsset } from '@/components/MediaAsset'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { assets, type AssetKey } from '@/config/assets'
import { useStill } from '@/lib/motion'

export type Story = { image: AssetKey; heading: string; text: string }
type Labels = { open: string; close: string; previous: string; next: string }

// The rhythm: which stories pair (and how) and which go full-bleed.
const LAYOUT = ['pair-7-left', 'pair-5-right', 'bleed', 'pair-7-right', 'pair-5-left', 'bleed'] as const

export function GallerySection({ tone, title, stories, labels, playable = [] }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; title: string; stories: readonly Story[]; labels: Labels
  /** Films whose files exist (checked on the server); the rest show their still. */
  playable?: readonly AssetKey[]
}) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section data-tone={tone === 'ground' ? undefined : tone} className="pt-(--section-y)">
      <div className="px-(--gutter)">
        <div className="mx-auto max-w-(--container)">
          <Lines lines={[title]} className="type-heading" />
        </div>
      </div>
      <div className="mt-12 space-y-24 md:mt-16 md:space-y-40">
        {stories.map((s, i) => {
          const kind = LAYOUT[i % LAYOUT.length]
          return kind === 'bleed'
            ? <Bleed key={s.heading} story={s} play={playable.includes(s.image)} onOpen={() => setOpen(i)} label={labels.open} />
            : <Pair key={s.heading} story={s} kind={kind} onOpen={() => setOpen(i)} label={labels.open} />
        })}
      </div>
      <Lightbox stories={stories} playable={playable} index={open} onClose={() => setOpen(null)} labels={labels} />
    </section>
  )
}

/** The picture drifts at most 8% against the page while its pair crosses the screen. */
function Drift({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const still = useStill()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  return (
    <div ref={ref} className="h-full w-full overflow-hidden">
      <motion.div className="h-full w-full scale-[1.08]" style={still ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}

function Pair({ story, kind, onOpen, label }: { story: Story; kind: Exclude<(typeof LAYOUT)[number], 'bleed'>; onOpen: () => void; label: string }) {
  const wide = kind.startsWith('pair-7')
  const right = kind.endsWith('right')
  const ratio = wide ? 'aspect-[3/2]' : 'aspect-[4/5]'
  const photo = wide
    ? right ? 'md:col-span-7 md:col-start-6' : 'md:col-span-7'
    : right ? 'md:col-span-5 md:col-start-8' : 'md:col-span-5'
  const words = wide
    ? right ? 'md:col-span-4 md:col-start-1 md:row-start-1' : 'md:col-span-4 md:col-start-9'
    : right ? 'md:col-span-5 md:col-start-2 md:row-start-1' : 'md:col-span-5 md:col-start-7'
  return (
    <div className="px-(--gutter)">
      <div className="mx-auto grid max-w-(--container) gap-6 md:grid-cols-12 md:items-end">
        <button type="button" onClick={onOpen} aria-label={`${label}: ${story.heading}`} className={`group block w-full cursor-zoom-in text-left focus-visible:opacity-80 ${photo}`}>
          <ImageReveal className={`${ratio} w-full`}>
            <Drift><MediaAsset id={story.image} sizes={wide ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 42vw, 100vw'} className="h-full w-full" /></Drift>
          </ImageReveal>
        </button>
        <Reveal className={`pb-2 ${words}`}>
          <h3 className="type-title">{story.heading}</h3>
          {story.text && <p className="type-body mt-3 max-w-[36ch] text-(--color-muted)">{story.text}</p>}
        </Reveal>
      </div>
    </div>
  )
}

function Bleed({ story, play, onOpen, label }: { story: Story; play: boolean; onOpen: () => void; label: string }) {
  return (
    <figure className="relative h-svh">
      <button type="button" onClick={onOpen} aria-label={`${label}: ${story.heading}`} className="absolute inset-0 block cursor-zoom-in">
        <ImageReveal className="h-full w-full">
          <Drift><MediaAsset id={story.image} play={play} sizes="100vw" className="h-full w-full" /></Drift>
        </ImageReveal>
      </button>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--color-background)/85 to-transparent" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-(--gutter) pb-12 md:pb-24">
        <Reveal className="mx-auto max-w-(--container)">
          <p className="type-heading">{story.heading}</p>
          {story.text && <p className="type-body mt-3 max-w-[36ch]">{story.text}</p>}
        </Reveal>
      </figcaption>
    </figure>
  )
}

function Lightbox({ stories, playable, index, onClose, labels }: { stories: readonly Story[]; playable: readonly AssetKey[]; index: number | null; onClose: () => void; labels: Labels }) {
  return (
    <Dialog open={index !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent showCloseButton={false} className="block h-svh max-w-none border-0 bg-transparent p-0 sm:max-w-none">
        <DialogTitle className="sr-only">Halden, photographs</DialogTitle>
        <DialogDescription className="sr-only">Use the arrow keys or the buttons to move between photographs.</DialogDescription>
        {index !== null && (
          <Carousel opts={{ startIndex: index, loop: true }} className="flex h-full w-full min-w-0 flex-col justify-center px-(--gutter)">
            <CarouselContent className="items-center">
              {stories.map((s) => {
                const a = assets[s.image]
                return (
                  <CarouselItem key={s.heading}>
                    <figure className="mx-auto w-full max-w-(--container)">
                      <div className="relative mx-auto" style={{ aspectRatio: `${a.width} / ${a.height}`, height: `min(70svh, calc(${a.height / a.width} * (100vw - 2 * var(--gutter))))` }}>
                        <MediaAsset id={s.image} play={playable.includes(s.image)} sizes="100vw" className="h-full w-full" />
                      </div>
                      <figcaption className="type-utility mt-4 text-center text-(--color-muted)">{s.heading}</figcaption>
                    </figure>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <div className="mx-auto mt-8 flex w-full max-w-(--container) items-center justify-between">
              <div className="flex gap-2">
                <CarouselPrevious aria-label={labels.previous} className="static size-12 translate-none border-(--color-border) bg-transparent text-(--color-text) hover:bg-(--color-text) hover:text-(--color-background)" />
                <CarouselNext aria-label={labels.next} className="static size-12 translate-none border-(--color-border) bg-transparent text-(--color-text) hover:bg-(--color-text) hover:text-(--color-background)" />
              </div>
              <button type="button" onClick={onClose} className="btn btn-line">{labels.close}</button>
            </div>
          </Carousel>
        )}
      </DialogContent>
    </Dialog>
  )
}
