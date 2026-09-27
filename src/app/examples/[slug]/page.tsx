import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { examples, exampleBySlug } from '@/data/examples'

export const generateStaticParams = () => examples.map((e) => ({ slug: e.slug }))
export const dynamicParams = false

export async function generateMetadata(props: PageProps<'/examples/[slug]'>): Promise<Metadata> {
  const e = exampleBySlug[(await props.params).slug]
  return e ? { title: e.title, description: e.summary } : {}
}

export default async function ExamplePage(props: PageProps<'/examples/[slug]'>) {
  const { slug } = await props.params
  const e = exampleBySlug[slug]
  if (!e) notFound()

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <p className="text-sm text-muted">{e.mood.join(' · ')}</p>
      <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)]">{e.title}</h1>
      <p className="prose-serif mt-5 max-w-xl text-ink-2">{e.summary}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={e.livePath} target="_blank" rel="noreferrer" className="btn btn-ink">Visit the live example</a>
        {e.recipeSlug && <Link href={`/recipe/${e.recipeSlug}`} className="btn btn-line">See its recipe</Link>}
        <span className="text-sm text-muted">Opens the real, working site — not a screenshot.</span>
      </div>
      <div className="mt-10 overflow-hidden rounded-lg border border-line">
        {e.hero.kind === 'video'
          ? <video src={e.hero.src} poster={e.hero.poster} autoPlay muted loop playsInline preload="metadata" className="w-full" aria-label={`${e.title} — hero footage`} />
          // eslint-disable-next-line @next/next/no-img-element -- real per-example asset with no fixed aspect ratio; plain img matches the <video> case above
          : <img src={e.hero.src} alt={`${e.title} — hero`} className="w-full" />}
      </div>
    </article>
  )
}
