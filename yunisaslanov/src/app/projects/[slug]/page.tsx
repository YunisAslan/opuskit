import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Lines } from '@/components/Lines'
import { MediaAsset } from '@/components/MediaAsset'
import { SiteLink } from '@/components/SiteLink'
import { GallerySection } from '@/components/sections/Gallery'
import { assets } from '@/config/assets'
import { projects, site } from '@/config/site'

export const dynamicParams = false
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }))

export async function generateMetadata({ params }: PageProps<'/projects/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const p = projects.find((x) => x.slug === slug)
  return { title: p?.title, description: p?.intro[0] }
}

export default async function Project({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) notFound()
  const p = projects[i], next = projects[(i + 1) % projects.length]
  const facts = [['Client', p.client], ['Place', p.place], ['Year', p.year], ['Role', p.role]]

  return (
    <article>
      {/* Cover: full-bleed photo, the title set large over it */}
      <header className="relative isolate flex min-h-[92svh] items-end overflow-hidden px-(--gutter) pb-[clamp(32px,5vw,72px)]">
        <MediaAsset id={p.cover} fill preload className="-z-10 object-cover opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-(--color-background)/80 via-transparent to-(--color-background)/30" />
        <div className="w-full">
          <p className="type-utility mb-4 md:ml-[calc(1/24*100%)]">{p.kind}, {p.year}</p>
          <Lines as="h1" now text={p.title} mobile={p.title.split(' ')} desktop={[p.title]}
            style={{ '--n': Math.max(...p.title.split(' ').map((w) => w.length)) } as CSSProperties}
            className="type-display [font-size:min(16vw,calc(88vw/(var(--n)*0.78)))] md:ml-[calc(1/24*100%)] md:[font-size:clamp(4rem,11vw,11rem)]" />
        </div>
      </header>

      {/* The calm column: facts in a narrow rail, the story beside it */}
      <div data-reveal="cut">
        <section className="px-(--gutter) py-[clamp(80px,10vw,160px)]">
          <div className="mx-auto grid max-w-(--container) gap-12 md:grid-cols-24 md:gap-x-[1vw]">
            <dl className="type-utility grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-5 md:col-start-3 md:grid-cols-1">
              {facts.map(([k, v]) => <div key={k}><dt className="text-(--color-muted)">{k}</dt><dd className="mt-1">{v}</dd></div>)}
            </dl>
            <div className="type-body space-y-5 md:col-span-11 md:col-start-10 [&>p:first-child]:[font-size:1.15em]">
              {p.intro.map((t) => <p key={t} className="max-w-[60ch]">{t}</p>)}
            </div>
          </div>
        </section>
      </div>

      <GallerySection photos={p.photos.map((ph) => ({ src: assets[ph.key].src, alt: assets[ph.key].alt, caption: ph.caption, tall: assets[ph.key].h > assets[ph.key].w, focus: ph.focus }))} />

      {/* A direct line at the end of every case study */}
      <p className="type-body mx-auto max-w-(--container) px-(--gutter) md:pl-[calc(9/24*100%+var(--gutter))]">
        Want something made with this kind of care? Write to <SiteLink href={`mailto:${site.email}`}>{site.email}</SiteLink>
      </p>

      {/* The last cover: the next project */}
      <Link href={`/projects/${next.slug}`} className="group relative isolate mt-[clamp(96px,12vw,200px)] flex aspect-[4/5] items-end overflow-hidden px-(--gutter) pb-[clamp(24px,4vw,56px)] md:aspect-[21/9]">
        <MediaAsset id={next.cover} fill className="-z-10 object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
        <span className="md:ml-[calc(1/24*100%)]">
          <span className="type-utility block">Next project</span>
          <span className="type-display mt-2 block [font-size:clamp(2.5rem,7vw,6rem)]">{next.title}</span>
        </span>
      </Link>
    </article>
  )
}
