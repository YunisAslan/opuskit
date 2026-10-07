'use client'
// OpusKit section — Product Grid: browse and choose. Even tiles at one ratio (4:5), a second angle on hover, honest
// availability. Fitted to Maison Vey: three calm columns (two on phones), the hovered tile stays sharp while the others
// dim slightly, the hour of each scent as a time-code in the accent, and a quick add on desktop only.
import Link from 'next/link'
import type { ElementType, ReactNode } from 'react'
import type { AssetKey } from '@/config/assets'
import { MediaAsset } from '@/components/media/MediaAsset'
import { RevealGroup, FadeRise } from '@/components/motion/Reveal'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/components/site/cart'
import { cn } from '@/lib/utils'

export type Product = {
  slug: string; name: string; price: string; image: AssetKey; alt: string; hoverImage?: AssetKey; href: string
  place?: string; hour?: string; availability?: string; badge?: string; soldOut?: boolean
  /** Desktop quick add: the size it adds. */ quickSize?: string
}

export function ProductGridSection({ tone, link: L = Link, title, heading, controls, products, empty, id, compact }: {
  tone?: 'ground' | 'surface' | 'inverse' | 'chapter'; link?: ElementType; title?: string
  /** Replaces the h2 with a page masthead (the page's h1). */ heading?: ReactNode
  /** Filters and sort, beside the title. */ controls?: ReactNode
  products: Product[]; empty?: string; id?: string
  /** Less space above (the first section under a masthead). */ compact?: boolean
}) {
  const { add } = useCart()
  return (
    <section id={id} data-tone={tone === 'ground' ? undefined : tone} className={cn('px-(--gutter)', compact ? 'pb-(--section-y)' : 'py-(--section-y)')}>
      <div className="mx-auto max-w-(--container)">
        {heading}
        {(title || controls) && (
          <div className="flex flex-wrap items-end justify-between gap-x-(--grid-gap) gap-y-6">
            {title && <h2 className="type-heading">{title}</h2>}
            {controls}
          </div>
        )}
        {products.length === 0 && empty ? (
          <p className="type-body mt-12 text-(--color-muted)">{empty}</p>
        ) : (
          <RevealGroup as="ul" amount={0.1} className="group/grid mt-12 grid grid-cols-2 gap-x-(--grid-gap) gap-y-16 md:grid-cols-3 md:gap-y-24">
            {products.map((p, i) => (
              <FadeRise as="li" key={p.href} i={i % 3}
                className={cn(products.length === 3 && i === 2 && 'max-md:hidden', 'transition-opacity duration-300 ease-out md:group-has-[a:hover]/grid:opacity-60 md:hover:opacity-100! md:has-[:focus-visible]:opacity-100!')}>
                <Card className="group/card">
                  <div className="relative">
                    <L href={p.href} tabIndex={-1} aria-hidden className="block overflow-hidden">
                      <MediaAsset id={p.image} alt={p.alt} sizes="(min-width: 768px) 30vw, 50vw"
                        imgClassName="transition-transform duration-700 ease-out md:group-hover/card:scale-[1.03]" />
                      {p.hoverImage && (
                        <MediaAsset id={p.hoverImage} decorative fill sizes="(min-width: 768px) 30vw, 50vw"
                          className="hidden opacity-0 transition-opacity duration-500 ease-out md:block md:group-hover/card:opacity-100" />
                      )}
                    </L>
                    {(p.soldOut || p.badge) && <Badge className="absolute left-3 top-3 z-10">{p.soldOut ? 'Sold out' : p.badge}</Badge>}
                    {p.quickSize && !p.soldOut && (
                      <button type="button" onClick={() => add(p.slug, p.quickSize!)}
                        className="type-caption pointer-events-none absolute bottom-3 left-3 z-10 hidden min-h-11 cursor-pointer items-center bg-(--color-background) px-4 opacity-0 transition-[opacity,background-color,color] duration-200 ease-out hover:bg-(--color-text) hover:text-(--color-background) focus-visible:pointer-events-auto focus-visible:opacity-100 md:inline-flex md:group-hover/card:pointer-events-auto md:group-hover/card:opacity-100">
                        Add {p.quickSize} to bag<span className="sr-only">: {p.name}</span>
                      </button>
                    )}
                  </div>
                  <CardContent className="mt-4">
                    <L href={p.href} className="block">
                      <CardFooter>
                        <span className="type-body link-quiet group-hover/card:decoration-current">{p.name}</span>
                        <span className="type-body tabular-nums">{p.price}</span>
                      </CardFooter>
                      {(p.place || p.hour) && (
                        <p className="type-caption mt-1 text-(--color-muted)">
                          {p.place}{p.hour && <>, <span className="tabular-nums text-(--color-accent)">{p.hour}</span></>}
                        </p>
                      )}
                    </L>
                  </CardContent>
                </Card>
              </FadeRise>
            ))}
          </RevealGroup>
        )}
      </div>
    </section>
  )
}
