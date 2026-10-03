import Link from 'next/link'
import { MediaAsset } from '@/components/MediaAsset'
import { Button } from '@/components/ui/button'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { site } from '@/config/site'

// Editorial image hero: a restrained headline in the lower-left, one strong portrait photo in columns 6–12 with the
// stop's name as its caption, generous empty space. Phones: headline first, the photo full width beneath at 4:5.
// Both fade up once on load (CSS keyframes, ≤ 600ms) — readable before anything else moves.
export function Hero() {
  return (
    <section className="px-[5vw] pb-[clamp(60px,8vw,120px)] pt-10 md:pt-6">
      <div className="grid gap-x-[2vw] gap-y-10 md:min-h-[calc(100svh-var(--header-h)-48px)] md:grid-cols-12">
        <div className="rise md:col-span-5 md:self-end md:pb-6">
          <h1 className="type-display [font-size:clamp(3rem,5.6vw,6rem)]">
            <span className="block">Hands-on care,</span>
            <span className="block">then movement</span>
            <span className="block">you keep.</span>
          </h1>
          <p className="type-body mt-8 max-w-[44ch] text-(--color-muted)">
            A small physiotherapy and slow-movement studio in Islington. We treat what hurts, then teach you the few
            exercises that stop it coming back.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button asChild><Link href={site.book.href}>{site.book.label}</Link></Button>
            <UnderlineFill href={site.tel} className="type-utility">or call {site.phone}</UnderlineFill>
          </div>
        </div>
        <figure className="rise-late md:col-span-7 md:col-start-6 md:flex md:flex-col md:items-end md:justify-end">
          <MediaAsset id="hero" priority sizes="(min-width: 768px) 45vw, 100vw"
            className="aspect-[4/5] w-full rounded-(--radius-media) object-cover object-[50%_60%] md:h-[calc(100svh-var(--header-h)-88px)] md:w-auto md:max-w-full" />
          <figcaption className="type-utility mt-3 text-(--color-muted)">Room 2, late morning</figcaption>
        </figure>
      </div>
    </section>
  )
}
