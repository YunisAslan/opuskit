import Link from 'next/link'
import { home } from '@/content/copy'
import { featuredScent } from '@/content/products'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MediaAsset } from '@/components/pieces/MediaAsset'
import { Reveal, RevealImage, RevealLines } from '@/components/pieces/Reveal'
import { AddToBagButton } from '@/components/cart/AddToBagButton'
import { HeroStickyCta } from './HeroStickyCta'

// Home hero — Product stage: the bottle isolated on a clean surface, large and offset, with the name,
// one line on the hour and the price and buy action. Desktop: words left, product right.
// Mobile: product first, words beneath, and the buy action found at the thumb.
export function Hero() {
  const s = featuredScent
  return (
    <section
      id="home-hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-(--gutter) pb-[calc(var(--section-y)*0.8)] pt-10 lg:pb-(--section-y) lg:pt-16"
    >
      <MediaAsset
        id="heroStage"
        alt=""
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[72%] w-full object-cover opacity-[0.13]"
      />
      <div className="mx-auto grid max-w-(--container) items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Product — first on mobile, right column on desktop */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8">
          <RevealImage>
            <MediaAsset
              id="heroProduct"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="aspect-[4/5] w-full"
            />
          </RevealImage>
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-(--color-border) pt-5">
            <div className="min-w-0">
              <p className="type-heading [font-size:clamp(1.4rem,2.4vw,1.9rem)]">{s.name}</p>
              <p className="type-utility mt-1 text-(--color-muted)">{s.hour} — {s.family}</p>
            </div>
            <p className="type-body shrink-0 tabular-nums">{s.price}</p>
          </div>
          <Reveal delay={0.1}>
            <p className="type-body mt-4 max-w-[46ch] text-(--color-muted)">{home.hero.promise}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <AddToBagButton slug={s.slug} name={s.name} className="hidden lg:inline-flex" />
              <Button asChild variant="link" className="px-0">
                <Link href="/shop">{home.hero.secondary}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Words — beneath the product on mobile, left column on desktop */}
        <div id="hero-title" className="order-2 lg:order-1 lg:col-span-6 xl:col-span-7">
          <RevealLines as="h1" className="type-display text-balance" lines={home.hero.lines} />
          <Reveal delay={0.15}>
            <p className="type-body mt-6 max-w-[48ch] text-(--color-muted)">{home.hero.sub}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Badge variant="outline">{s.concentration}</Badge>
              <Badge variant="outline">{s.size}</Badge>
              <Badge variant="outline">Made in batches of forty</Badge>
            </div>
          </Reveal>
        </div>
      </div>

      <HeroStickyCta targetId="home-hero" slug={s.slug} name={s.name} price={s.price} />
    </section>
  )
}