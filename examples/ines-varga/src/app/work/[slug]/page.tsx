import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { GallerySection, type GalleryItem } from '@/components/sections/Gallery'
import { SpecsSection } from '@/components/sections/Specs'
import { media, type MediaId, type ProjectSlug } from '@/config/assets'
import { galleryStandIns, project as copy, projects } from '@/content/site'

export const dynamicParams = false
export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })) }

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const n = projects.findIndex((p) => p.slug === slug)
  if (n < 0) return {}
  const p = projects[n], a = media(`featuredWork-${n + 1}` as MediaId)
  const description = `${p.kind}, ${p.year}. ${p.line}`
  return { title: p.title, description, openGraph: { title: p.title, description, images: [{ url: a.src, width: a.width, height: a.height, alt: a.alt }] } }
}

// Gallery slots 3 and 6 show the owner's studio photos until the project's own set exists; the rest are the
// shot list's labelled placeholders (assets/manifest.json → projectPageGallery).
const STAND_IN_CAPTIONS: Record<string, string> = {
  processPath: 'Walking it first', processSupplies: 'Paint, brushes and the board', processPalette: 'The studio desk mid-map', workVintageStack: 'Old maps kept for reference',
}

export default async function ProjectPage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const n = projects.findIndex((p) => p.slug === slug)
  if (n < 0) notFound()
  const p = projects[n]
  const standIns = [galleryStandIns[n % 4], galleryStandIns[(n + 1) % 4]]
  const gallery: GalleryItem[] = p.gallery.map((caption, i) => {
    if (i === 2) return { id: standIns[0], caption: STAND_IN_CAPTIONS[standIns[0]] }
    if (i === 5) return { id: standIns[1], caption: STAND_IN_CAPTIONS[standIns[1]] }
    return { id: `gallery:${slug as ProjectSlug}:${i + 1}`, caption }
  })
  const more = [1, 2, 3].map((k) => (n + k) % projects.length).map((i) => ({ ...projects[i], n: i }))
  return (
    <>
      <CaseStudySection p={p} n={n} />
      <GallerySection title={copy.gallery.title} items={gallery} open={copy.gallery.open} />
      <SpecsSection title={copy.specs.title} text={copy.specs.text} specs={p.specs} note={copy.specs.note} />
      <section className="px-(--gutter) py-(--section-y)">
        <FeaturedWorkSection variant="held" title={copy.more.title} items={more} />
      </section>
    </>
  )
}
