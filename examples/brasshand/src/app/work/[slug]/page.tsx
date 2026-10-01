import type { Metadata } from 'next'
import Link from 'next/link'
import { CaseStudySection } from '@/components/sections/CaseStudy'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { Chapter } from '@/components/site/Chapter'
import { MagneticLink, RollLink } from '@/components/site/links'
import { Reveal } from '@/components/site/Reveal'
import { assets } from '@/config/assets'
import { contact, projects } from '@/content/site'

export const dynamicParams = false
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))

const find = async (params: PageProps<'/work/[slug]'>['params']) => {
  const { slug } = await params
  return projects.findIndex((p) => p.slug === slug)
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const p = projects[await find(params)]
  return { title: `${p.client}, ${p.discipline.toLowerCase()}`, description: p.paragraphs[0] }
}

export default async function Project({ params }: PageProps<'/work/[slug]'>) {
  const i = await find(params)
  const p = projects[i], next = projects[(i + 1) % projects.length]
  return (
    <>
      <Chapter word={p.client} h1 />
      <Reveal>
        <CaseStudySection link={Link} title={`${p.discipline}, ${p.year}`} image={assets[p.image].src} alt={assets[p.image].alt}
          facts={p.facts} paragraphs={p.paragraphs} />
      </Reveal>
      <nav aria-label="More projects" className="mx-auto flex max-w-[1440px] flex-wrap items-baseline justify-between gap-4 border-t border-(--color-border) px-5 py-10 md:px-8">
        <RollLink href="/work" className="type-utility inline-flex min-h-11 items-center text-[0.9375rem]">All case studies</RollLink>
        <RollLink href={`/work/${next.slug}`} className="type-heading inline-flex min-h-11 items-center">{`Next: ${next.client}`}</RollLink>
      </nav>
      <ContactCtaSection link={MagneticLink} headline="Want one of these?" quiet="Tell us yours."
        action={{ label: 'Start a project', href: '/contact' }} email={contact.email} />
    </>
  )
}
