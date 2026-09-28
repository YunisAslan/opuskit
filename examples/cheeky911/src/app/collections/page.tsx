import type { Metadata } from 'next'
import MediaAsset from '@/components/MediaAsset'
import Lines from '@/components/Lines'
import ProductCard from '@/components/ProductCard'
import PhotoRows from '@/components/PhotoRows'
import Lookbook from '@/components/Lookbook'
import TitleCard from '@/components/TitleCard'
import { products } from '@/config/products'

export const metadata: Metadata = { title: 'Collections' }

const keyPieces = ['gt3-rs-obsidian', 'gt3-carmine-red', 'gt3-rs-racing-yellow'].map((s) => products.find((p) => p.slug === s)!)

export default function Collections() {
  return (
    <>
      <section aria-labelledby="collection-title">
        <div data-hero className="relative h-svh overflow-hidden">
          <div data-reveal="clip" className="absolute inset-0">
            <MediaAsset id="yourPhotos" index={6} priority sizes="100vw" className="object-[60%_center]" />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-[1200px] items-end px-6 pb-16 md:pb-24">
            <div className="md:w-7/12">
              <p className="type-utility mb-4 text-muted">Autumn and winter 2026</p>
              <h1 id="collection-title" data-reveal="lines" className="type-display">
                <Lines lines={[['The', 'stretch-wide'], ['Rooftop', 'stretch-narrow'], ['collection', 'stretch-narrow']]} />
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-32 md:grid-cols-12 md:gap-6 md:py-40">
          <div data-reveal="rise" className="md:col-span-5">
            <h2 className="type-heading">Ten cars, chosen for how they sit in low light</h2>
            <p className="type-body mt-6 max-w-[52ch] text-muted">
              This season is mostly black, with one red and two yellows for courage. Every car was shot at dusk,
              on a rooftop or in a garage, with nothing added afterwards. Three of them anchor the collection.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-6 md:col-span-7 md:grid-cols-3">
            {keyPieces.map((p, i) => (
              <li key={p.slug} className={i === 2 ? 'max-md:hidden' : ''}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
        <PhotoRows rows={2} offset={2} label="The full collection" />
      </section>
      <TitleCard label="Five looks" lines={[['Shot as', 'stretch-wide'], ['they were found', 'stretch-narrow']]} />
      <Lookbook />
    </>
  )
}
