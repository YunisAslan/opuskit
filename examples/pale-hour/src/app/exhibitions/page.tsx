import type { Metadata } from 'next'
import { ExhibitionIndex } from '@/components/sections/ExhibitionIndex'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { GallerySection } from '@/components/sections/Gallery'
import { TextEffect } from '@/components/pieces/TextEffect'
import { media } from '@/config/assets'
import { exhibitions, exhibitionsPage as c, galleryPhotos, lightbox } from '@/content/site'

export const metadata: Metadata = { title: 'Exhibitions', description: c.intro }

const works = exhibitions.map((e, n) => ({ ...e, image: media('featuredWork', n, e.alt), href: `/exhibitions#${e.slug}` }))

export default function Exhibitions() {
  return (
    <>
      <FeaturedWorkSection
        variant="staggered"
        header={
          <ExhibitionIndex
            title={<TextEffect as="h1" trigger="load" className="type-display" breaks={{ base: [2], md: [2] }}>{c.title}</TextEffect>}
            intro={c.intro}
            label={c.index}
            projects={works}
          />
        }
        projects={works}
      />
      <GallerySection
        title={<TextEffect as="h2" className="type-display [font-size:clamp(2.5rem,6vw,6rem)]" breaks={{ base: [1], md: [1] }}>{c.gallery.title}</TextEffect>}
        intro={c.gallery.intro}
        planLabel={c.gallery.planLabel}
        hint={c.gallery.hint}
        hintTouch={c.gallery.hintTouch}
        photos={galleryPhotos.map((p, n) => ({ ...p, image: media('gallery', n, p.alt) }))}
        lightbox={lightbox}
        closing={c.gallery.closing}
      />
    </>
  )
}
