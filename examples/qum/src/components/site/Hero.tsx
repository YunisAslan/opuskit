import Link from 'next/link'
import { TextEffect } from '@/components/pieces/TextEffect'
import { MediaAsset } from '@/components/MediaAsset'
import { Button } from '@/components/ui/button'
import { TextLink } from './NavLink'
import { StopCard } from './Stop'

// Editorial image hero: a restrained, centred headline above one strong photograph.
// Mobile: the headline first, the photo full width beneath at 4:5, the stop card under it.
export function Hero() {
  return (
    <section className="px-(--gutter) pt-12 md:pt-16">
      <div className="mx-auto max-w-(--container) text-center">
        <TextEffect as="h1" className="type-display mx-auto max-w-[11ch] text-balance md:max-w-none md:whitespace-pre-line">{'Salt from the shore,\nsaffron from inland'}</TextEffect>
        <p className="rise type-body mx-auto mt-6 max-w-[44ch] text-(--color-muted) [animation-delay:150ms]">
          Six products made by hand in small batches in Mardakan, on the Absheron coast. One ritual, morning and night.
        </p>
        <Button asChild size="lg" className="rise mt-8 [animation-delay:250ms]"><Link href="/shop">Shop the six</Link></Button>
      </div>
      <figure className="rise relative mx-auto mt-12 max-w-(--container) [animation-delay:300ms] md:mt-14">
        <MediaAsset id="hero" priority sizes="(min-width: 1248px) 1200px, 100vw" className="aspect-[4/5] w-full rounded-(--radius-media) object-cover md:aspect-[16/9] lg:aspect-[2/1]" />
        <StopCard name="The shelf" className="mt-4 md:absolute md:bottom-6 md:left-6 md:mt-0">
          <p>Cleanser, serum, cream: the three most people start with, poured in batch No. 14 last month.</p>
          <p><TextLink href="/shop/saffron-serum" className="type-utility">Start with the serum</TextLink></p>
        </StopCard>
      </figure>
    </section>
  )
}
