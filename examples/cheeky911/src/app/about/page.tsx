import type { Metadata } from 'next'
import MediaAsset from '@/components/MediaAsset'
import SectionHeader from '@/components/SectionHeader'
import TitleCard from '@/components/TitleCard'

export const metadata: Metadata = { title: 'About' }

export default function About() {
  return (
    <>
      <section aria-labelledby="about-title" className="mx-auto grid max-w-[1200px] gap-12 px-6 pb-32 pt-32 md:grid-cols-12 md:gap-6 md:pb-40 md:pt-40">
        <div className="relative aspect-[4/5] overflow-hidden bg-surface md:col-span-5">
          <MediaAsset id="yourPhotos" index={2} priority sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div className="flex flex-col justify-end md:col-span-6 md:col-start-7">
          <SectionHeader as="h1" display className="[font-size:clamp(3rem,7vw,6.5rem)]" label="About the house" lines={[['Two of us,', 'stretch-narrow'], ['one car', 'stretch-mid'], ['a season', 'stretch-narrow']]} />
          <div data-reveal="rise" className="type-body mt-8 max-w-[52ch]">
            <p>
              CHEEKY started in 2019 when Mara Lindqvist, a costume designer, and Idris Okafor, a race mechanic,
              bought the same black GT3 twice in one year. They decided the car deserved better pictures than a listing.
            </p>
            <p className="mt-4 text-muted">
              Mara styles and films every car. Idris inspects it, drives it and writes down what it is really like.
              The house has shown forty-one cars since, one small collection at a time.
            </p>
          </div>
        </div>
      </section>

      <TitleCard label="The story" lines={[['Why a fashion', 'stretch-mid'], ['house for cars', 'stretch-narrow']]} />

      <article aria-labelledby="story-title" className="mx-auto max-w-[1200px] px-6 pb-32 md:pb-40">
        <h2 id="story-title" data-reveal="rise" className="type-heading md:w-7/12"><span className="block">A 911 is cut, not built</span></h2>
        <div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-6">
          <aside className="type-utility text-muted md:col-span-3 md:pt-2">
            <p>Photographs by Mara Lindqvist, at dusk, without retouching.</p>
            <p className="mt-6 max-md:hidden">Opposite, a 2019 GT3 in Carmine Red, shot against the wall it was parked beside.</p>
          </aside>
          <div data-reveal="rise" className="type-body md:col-span-5 [&>p+p]:mt-4">
            <p>
              The first time we photographed a GT3 properly, we lit it the way you would light a coat. One lamp,
              low and to the side, so the shoulders did the talking. The car looked like it had been tailored.
            </p>
            <p>
              That idea stuck. A 911 has kept the same silhouette for sixty years, the way a good jacket keeps its
              lapel. What changes is the cloth: the paint, the wheels, the stitching on the seats, the wing.
              So we started treating each car as a piece in a collection rather than a stock number.
            </p>
            <p>
              Every season we choose around ten cars that belong together. We film them in one place, usually a
              rooftop or a garage at the edge of town, and we write about them honestly, including the scuffs.
            </p>
          </div>
        </div>

        <figure className="my-24 md:my-32">
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden bg-surface md:aspect-[21/9]">
            <MediaAsset id="yourPhotos" index={7} sizes="100vw" className="md:object-[center_35%]" />
          </div>
          <figcaption className="type-utility mt-4 text-muted">911 GT3, Carmine Red. The colour of this room.</figcaption>
        </figure>

        <blockquote data-reveal="rise" className="md:mx-auto md:w-8/12">
          <p className="type-heading md:[font-size:clamp(2rem,4vw,3.25rem)]">
            &ldquo;We light a car the way you would light a coat: one lamp, low and to the side.&rdquo;
          </p>
          <footer className="type-utility mt-6 text-muted">Mara Lindqvist</footer>
        </blockquote>

        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-12 md:gap-6">
          <div data-reveal="rise" className="type-body md:col-span-5 md:col-start-4 [&>p+p]:mt-4">
            <p>
              Idris drives every car before it is listed, at least three hundred kilometres. If something rattles,
              you will read about it. If a previous owner loved it too much, you will read about that as well.
            </p>
            <p>We are small on purpose. Two people, one car each season that we would keep ourselves.</p>
          </div>
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden bg-surface md:col-span-3 md:col-start-10">
            <MediaAsset id="yourPhotos" index={9} sizes="(min-width: 768px) 25vw, 100vw" />
          </div>
        </div>
      </article>
    </>
  )
}
