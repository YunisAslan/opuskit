import type { Metadata } from 'next'
import Link from 'next/link'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { GallerySection } from '@/components/sections/Gallery'
import { projects, workPage } from '@/content/site'

export const metadata: Metadata = { title: 'Work', description: 'Barns Fieldhouse has turned into houses, keeping the timber, the stone and the light.' }

// Work: Featured Work → Gallery.
export default function Work() {
  return (
    <>
      <FeaturedWorkSection
        id="barns"
        h1
        link={Link}
        title={workPage.barns.title}
        projects={projects.map((p) => ({ title: p.title, meta: `${p.place}, ${p.year}`, image: p.image, slug: p.slug, href: `/work/${p.slug}` }))}
      />
      <GallerySection id="details" title={workPage.details.title} photos={workPage.details.photos} />
    </>
  )
}
