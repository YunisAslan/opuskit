'use client'
import * as React from 'react'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { cn } from '@/lib/utils'

// shadcn/ui Carousel (Embla): a swipeable row with a quiet position counter in the utility face.
type Api = UseEmblaCarouselType[1]

const Ctx = React.createContext<{ api: Api; index: number; count: number } | null>(null)

function Carousel({ className, children, label, after, ...props }: React.ComponentProps<'div'> & { label: string; /** Rendered under the row (e.g. the counter). */ after?: React.ReactNode }) {
  const [ref, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' })
  const [index, setIndex] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) return
    const sync = () => { setIndex(api.selectedScrollSnap()); setCount(api.scrollSnapList().length) }
    sync()
    api.on('select', sync).on('reInit', sync)
    return () => { api.off('select', sync).off('reInit', sync) }
  }, [api])
  return (
    <Ctx.Provider value={{ api, index, count }}>
      <div role="region" aria-roledescription="carousel" aria-label={label} className={cn('relative', className)} {...props}>
        <div ref={ref} className="overflow-hidden">{children}</div>
        {after}
      </div>
    </Ctx.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex gap-3', className)} {...props} />
}
function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div role="group" aria-roledescription="slide" className={cn('min-w-0 shrink-0 grow-0', className)} {...props} />
}
function CarouselCounter({ className }: { className?: string }) {
  const c = React.useContext(Ctx)
  if (!c || c.count < 2) return null
  const pad = (n: number) => String(n).padStart(2, '0')
  return <p aria-live="polite" className={cn('type-caption tabular-nums text-(--color-muted)', className)}>{pad(c.index + 1)} / {pad(c.count)}</p>
}

export { Carousel, CarouselContent, CarouselItem, CarouselCounter }
