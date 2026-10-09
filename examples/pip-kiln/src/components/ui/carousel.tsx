'use client'
import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// shadcn/ui Carousel (Embla): swipe on touch, arrows and the keyboard elsewhere.
type CarouselApi = UseEmblaCarouselType[1]
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0]
type Ctx = { carouselRef: UseEmblaCarouselType[0]; api: CarouselApi; scrollPrev: () => void; scrollNext: () => void; canScrollPrev: boolean; canScrollNext: boolean; selected: number }
const CarouselContext = React.createContext<Ctx | null>(null)
function useCarousel() {
  const c = React.useContext(CarouselContext)
  if (!c) throw new Error('useCarousel must be used within a <Carousel />')
  return c
}

function Carousel({ opts, setApi, className, children, ...props }: React.ComponentProps<'div'> & { opts?: CarouselOptions; setApi?: (api: CarouselApi) => void }) {
  const [carouselRef, api] = useEmblaCarousel({ align: 'start', ...opts })
  const [canScrollPrev, setPrev] = React.useState(false)
  const [canScrollNext, setNext] = React.useState(false)
  const [selected, setSelected] = React.useState(0)
  const onSelect = React.useCallback((a: CarouselApi) => {
    if (!a) return
    setPrev(a.canScrollPrev()); setNext(a.canScrollNext()); setSelected(a.selectedScrollSnap())
  }, [])
  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api])
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api])
  const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollPrev() } else if (e.key === 'ArrowRight') { e.preventDefault(); scrollNext() }
  }, [scrollPrev, scrollNext])
  React.useEffect(() => { if (api && setApi) setApi(api) }, [api, setApi])
  React.useEffect(() => {
    if (!api) return
    onSelect(api) // eslint-disable-line react-hooks/set-state-in-effect -- read Embla's state once it exists
    api.on('reInit', onSelect); api.on('select', onSelect)
    return () => { api.off('select', onSelect); api.off('reInit', onSelect) }
  }, [api, onSelect])
  return (
    <CarouselContext.Provider value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext, selected }}>
      <div onKeyDownCapture={onKeyDown} className={cn('relative', className)} role="region" aria-roledescription="carousel" data-slot="carousel" {...props}>{children}</div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef } = useCarousel()
  return <div ref={carouselRef} className="overflow-hidden [touch-action:pan-y_pinch-zoom]" data-slot="carousel-content"><div className={cn('flex -ml-3', className)} {...props} /></div>
}
function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div role="group" aria-roledescription="slide" data-slot="carousel-item" className={cn('min-w-0 shrink-0 grow-0 basis-full pl-3', className)} {...props} />
}
function CarouselPrevious({ className, label = 'Previous', ...props }: React.ComponentProps<'button'> & { label?: string }) {
  const { scrollPrev, canScrollPrev } = useCarousel()
  return <button type="button" className={cn('btn btn-light size-12 min-h-12 px-0', className)} disabled={!canScrollPrev} onClick={scrollPrev} aria-label={label} {...props}><ArrowLeft className="size-5" /></button>
}
function CarouselNext({ className, label = 'Next', ...props }: React.ComponentProps<'button'> & { label?: string }) {
  const { scrollNext, canScrollNext } = useCarousel()
  return <button type="button" className={cn('btn btn-light size-12 min-h-12 px-0', className)} disabled={!canScrollNext} onClick={scrollNext} aria-label={label} {...props}><ArrowRight className="size-5" /></button>
}

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel }
