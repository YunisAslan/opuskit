// Hero — Product stage. Desktop: the bottle on its 16:9 stage, the headline in the calm space on the left over a
// scrim, then the promise, the price and the action. Phones: the 4:5 crop first, the words beneath, the action
// sticky at the bottom of the screen while the hero is in view. The first screen is complete before anything moves:
// only the picture settles (scale 1.04 → 1), the words never wait.
import Link from 'next/link'
import type { AssetKey } from '@/config/assets'
import { ArtDirectedAsset } from '@/components/media/MediaAsset'
import { AddToBag } from '@/components/site/AddToBag'

export function HeroSection({ image, imageMobile, eyebrow, title, line, priceLine, action, secondary }: {
  image: AssetKey; imageMobile: AssetKey; eyebrow: string; title: { desktop: string[]; mobile: string[] }; line: string; priceLine: string
  action: { label: string; slug: string; size: string }; secondary: { label: string; href: string }
}) {
  const h1 = (set: string[], cls: string) => <span aria-hidden className={cls}>{set.map((l) => <span key={l} className="block">{l}</span>)}</span>
  return (
    <section aria-label="Salt Quay" className="relative md:flex md:h-[calc(100svh-var(--nav-h))] md:max-h-[1000px] md:min-h-[640px] md:items-end">
      <ArtDirectedAsset desktop={image} mobile={imageMobile} className="aspect-[4/5] md:absolute md:inset-0 md:aspect-auto" imgClassName="stage-in" />
      {/* Scrim: the words sit on the ground colour, never straight on the picture */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-[68%] bg-linear-to-r from-(--color-background)/85 via-(--color-background)/45 to-transparent md:block" />
      <div className="relative mx-auto w-full max-w-(--container) px-(--gutter) pt-10 md:pb-16 md:pt-0 lg:pb-24">
        <div className="md:grid md:grid-cols-12 md:gap-x-(--grid-gap)">
          <div className="md:col-span-8">
            <p className="type-caption text-(--color-muted)">{eyebrow}</p>
            <h1 className="type-display mt-4">
              <span className="sr-only">{title.desktop.join(' ')}</span>
              {h1(title.mobile, 'block md:hidden')}
              {h1(title.desktop, 'hidden md:block')}
            </h1>
          </div>
          <div className="mt-8 md:col-span-5 md:mt-10">
            <p className="type-body max-w-[46ch]">{line}</p>
          </div>
        </div>
        <div className="sticky bottom-0 z-10 -mx-(--gutter) mt-10 border-t border-(--color-border) bg-(--color-background) px-(--gutter) py-4 md:static md:mx-0 md:mt-10 md:border-0 md:bg-transparent md:p-0">
          <div className="flex items-center gap-4 md:gap-8">
            <p className="type-body shrink-0 tabular-nums">{priceLine}</p>
            <AddToBag slug={action.slug} size={action.size} label={action.label} className="flex-1 md:flex-none" />
            <Link href={secondary.href} className="type-body link-quiet hidden min-h-11 items-center md:inline-flex">{secondary.label}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
