import Link from 'next/link'
import { Masthead } from '@/components/pieces/Masthead'
import { MediaAsset } from '@/components/media/MediaAsset'
import { notFound as copy } from '@/content/copy'

export default function NotFound() {
  return (
    <section className="px-(--gutter) pb-(--section-y)">
      <div className="mx-auto grid max-w-(--container) gap-x-(--grid-gap) md:grid-cols-12">
        <div className="md:col-span-7">
          <Masthead title={copy.title} intro={copy.text} className="md:pb-0">
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <Link href="/shop" className="btn-primary">{copy.action}</Link>
              <Link href="/" className="type-body link-quiet inline-flex min-h-11 items-center">{copy.home}</Link>
            </div>
          </Masthead>
        </div>
        <MediaAsset id="lifestyleImages" preload sizes="(min-width: 768px) 40vw, 100vw" className="mt-8 md:col-span-5 md:mt-32 md:self-start" />
      </div>
    </section>
  )
}
