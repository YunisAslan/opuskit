// Home · First screen — Editorial image hero. A thin serif title in two staggered lines beside one tall photograph;
// a frosted card over the photo's corner holds the few facts that matter: the count, the next dive, the sea, the time
// on the quay. Headline and image fade up once on load (≤ 600ms) — CSS, so the screen is complete before script runs.
// Phones and tablets: headline first (re-broken by hand), the picture full width beneath at 4:5, the card tucked under its edge.
import type { ElementType } from 'react'
import { MediaAsset } from '@/components/media/MediaAsset'
import { Lines } from '@/components/motion/Lines'
import { buttonVariants } from '@/components/ui/button'
import { LocalTime } from '@/components/site/LocalTime'
import { count, home, site } from '@/content/site'
import { cn, number } from '@/lib/utils'

const i = (n: number) => ({ ['--i' as string]: n })

function CountCard({ className }: { className?: string }) {
  return (
    <aside aria-label="The count" className={cn('rise rounded-(--radius-card) border border-(--color-border)/60 bg-(--frost) p-5 backdrop-blur-xl backdrop-saturate-150 md:p-6', className)} style={i(4)}>
      <p className="type-caption text-(--color-muted)">Plants in the water</p>
      <p className="type-number mt-2 [font-size:clamp(2.4rem,3.4vw,3.1rem)]">{number(count.plants)}</p>
      <p className="type-caption mt-2 text-(--color-muted)">Counted by hand, {count.countedOn}</p>
      <dl className="type-caption mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-(--color-border) pt-4">
        <dt className="text-(--color-muted)">Next dive</dt><dd className="text-right tabular-nums">{count.nextDive}</dd>
        <dt className="text-(--color-muted)">Sea today</dt><dd className="text-right tabular-nums">{count.seaToday}</dd>
        <dt className="text-(--color-muted)">On the quay</dt><dd className="text-right"><LocalTime /></dd>
      </dl>
    </aside>
  )
}

export function HeroSection({ link: L = 'a' }: { link?: ElementType }) {
  const h = home.hero
  return (
    <section aria-labelledby="hero-title" className="px-(--gutter) pb-[calc(var(--section-y)*0.5)] pt-[calc(16px+56px+40px)] lg:min-h-[100svh] lg:pt-[calc(16px+56px+56px)]">
      <div className="frame grid gap-y-10 lg:grid-cols-12 lg:gap-x-(--gutter)">
        <div className="flex flex-col lg:col-span-7 lg:pt-[6vh]">
          <Lines as="h1" id="hero-title" onLoad indent lines={h.lines} className="type-hero" />
          <p className="type-lead rise mt-8 max-w-[40ch] text-(--color-muted) lg:mt-12" style={i(2)}>{h.line}</p>
          <div className="rise mt-8 flex flex-wrap gap-3 lg:mt-10" style={i(3)}>
            <L href={h.action.href} className={buttonVariants()}>{h.action.label}</L>
            <L href={h.second.href} className={buttonVariants({ variant: 'outline' })}>{h.second.label}</L>
          </div>
          <p className="type-caption rise mt-auto hidden max-w-[30ch] pt-16 text-(--color-muted) lg:block" style={i(5)}>
            {site.place}, on {site.coast}. {h.caption}
          </p>
        </div>
        <figure className="relative md:ml-auto md:w-[80%] lg:col-span-5 lg:col-start-8 lg:ml-0 lg:w-auto">
          <div className="rise" style={i(1)}>
            <MediaAsset id="hero" mobile="mobileHeroCrop" ratio="4 / 5" preload sizes="(min-width: 1024px) 42vw, 100vw" alt="Kelp reaching the surface over the north reef at Skerra Bay" />
          </div>
          <CountCard className="relative z-10 mx-3 -mt-12 md:max-w-[340px] lg:absolute lg:max-w-none lg:bottom-10 lg:-left-[clamp(48px,6vw,96px)] lg:mx-0 lg:mt-0 lg:w-[min(300px,80%)]" />
          <figcaption className="type-caption mt-4 text-(--color-muted) lg:hidden">{h.caption}</figcaption>
        </figure>
      </div>
    </section>
  )
}
