import type { Metadata } from 'next'
import { ContactCtaSection } from '@/components/sections/ContactCta'
import { Chapter } from '@/components/site/Chapter'
import { MagneticLink, RollLink } from '@/components/site/links'
import { Reveal } from '@/components/site/Reveal'
import { CutReveal } from '@/components/pieces/CutReveal'
import { contact, journal } from '@/content/site'

export const dynamicParams = false
export const generateStaticParams = () => journal.map((e) => ({ slug: e.slug }))

const find = async (params: PageProps<'/journal/[slug]'>['params']) => {
  const { slug } = await params
  return journal.find((e) => e.slug === slug)!
}

export async function generateMetadata({ params }: PageProps<'/journal/[slug]'>): Promise<Metadata> {
  const e = await find(params)
  return { title: e.title, description: e.paragraphs[0] }
}

export default async function Entry({ params }: PageProps<'/journal/[slug]'>) {
  const e = await find(params)
  return (
    <>
      <Chapter word="Journal" />
      <article className="mx-auto grid max-w-[1440px] gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-8">
          <p className="type-utility text-(--color-muted)"><time>{e.date}</time>, {e.category}</p>
          <CutReveal as="h1" className="type-heading mt-4">{e.title}</CutReveal>
        </div>
        <Reveal className="type-body space-y-5 md:col-span-5 md:col-start-2">
          {e.paragraphs.map((t) => <p key={t} className="max-w-[62ch]">{t}</p>)}
          <p><RollLink href="/" className="type-utility inline-flex min-h-11 items-center text-[0.9375rem]">Back to the studio</RollLink></p>
        </Reveal>
      </article>
      <ContactCtaSection link={MagneticLink} headline="Agree? Disagree?" quiet="Tell us anyway."
        action={{ label: 'Say hello', href: '/contact' }} email={contact.email} />
    </>
  )
}
