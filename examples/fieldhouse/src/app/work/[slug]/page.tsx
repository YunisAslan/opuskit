import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NamesReveal } from '@/components/NamesReveal'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { GallerySection } from '@/components/sections/Gallery'
import { SpecsSection } from '@/components/sections/Specs'
import { projectPage, projects } from '@/content/site'

export const dynamicParams = false
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  return p ? { title: p.title, description: p.summary } : {}
}

// Project: Case Study → Gallery → Specs → Featured Work (the other barns, the way to the next one).
export default async function Project({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  if (!p) notFound()
  const i = projects.indexOf(p)
  const others = [...projects.slice(i + 1), ...projects.slice(0, i)]
  return (
    <>
      <CaseStudySection id="story" slug={p.slug} title={p.title} summary={p.summary} image={p.image} facts={p.facts} paragraphs={p.story} />
      <GallerySection id="pictures" title={projectPage.pictures} photos={p.pictures} />
      <SpecsSection id="facts" title={projectPage.facts.title} text={projectPage.facts.text} specs={p.specs} note={projectPage.facts.note} />
      <NamesReveal
        id="more"
        title={projectPage.more}
        items={others.map((o) => ({ title: o.title, kind: o.kind, where: `${o.place}, ${o.year}`, image: o.image, href: `/work/${o.slug}` }))}
      />
    </>
  )
}
