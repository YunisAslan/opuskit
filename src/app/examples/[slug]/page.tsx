import type { Metadata } from 'next'
import { Download, ExternalLink, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { examples, exampleBySlug } from '@/data/examples'
import { sectionGuide } from '@/data/section-guide'
import { jobOf } from '@/features/kit/plan'
import { signaturePatterns } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import type { PieceId, SectionId } from '@/types/domain'

// The kit's words for a part: the menu is "Menu" there, not "Navbar".
const partName = (id: SectionId) => (id === 'navbar' ? 'Menu' : jobOf(id))

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
  const effects: [string, string, string][] = [
    ...(Object.entries(e.pieceClips ?? {}) as [PieceId, string][]).map(([id, src]): [string, string, string] => [pieces[id].name, pieces[id].line, src]),
    ...Object.entries(e.signatureClips ?? {}).map(([id, src]): [string, string, string] => { const p = signaturePatterns.find((x) => x.id === id); return [p?.name ?? id, 'Big-idea moment', src] }),
  ]

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <p className="label">Example · {e.mood.join(' · ')}</p>
      <h1 className="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)]">{e.title}</h1>
      <p className="prose-serif mt-5 max-w-xl text-ink-2">{e.summary}</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={e.livePath} target="_blank" rel="noreferrer" className="btn btn-ink inline-flex items-center gap-2"><ExternalLink size={16} aria-hidden />Visit the live site</a>
        <Link href={`/studio/open?from=example:${e.slug}&to=brand`} className="btn btn-line inline-flex items-center gap-2"><SlidersHorizontal size={16} aria-hidden />Make it yours</Link>
        <a href={`/downloads/${e.slug}.zip`} download className="btn btn-line inline-flex items-center gap-2"><Download size={16} aria-hidden />Copy the code</a>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-muted">Copy the code: the site exactly as built, ready to run — photos and videos are placeholders of the same size (they belong to the original site). Make it yours: its recipe opens in Brand and Pages — change the name, colours, lettering and parts, and get your own Build Package.</p>
      <div className="mt-10 overflow-hidden rounded-lg border border-line">
        {e.hero.kind === 'video'
          ? <video src={e.hero.src} poster={e.hero.poster} autoPlay muted loop playsInline preload="metadata" className="w-full" aria-label={`${e.title} — hero footage`} />
          : e.clip
            // A first screen that isn't film (type, product…): its own clip shows how it moves, the still is the poster.
            ? <video src={e.clip} poster={e.hero.src} autoPlay muted loop playsInline preload="metadata" className="w-full" aria-label={`${e.title} — a few seconds of the site`} />
            // eslint-disable-next-line @next/next/no-img-element -- real per-example asset with no fixed aspect ratio; plain img matches the <video> case above
            : <img src={e.hero.src} alt={`${e.title} — hero`} className="w-full" />}
      </div>

      {e.sectionClips && (
        <section className="mt-14" aria-labelledby="by-section">
          <h2 id="by-section" className="text-2xl tracking-tight">Section by section</h2>
          <p className="mt-2 text-ink-2">Each part as it arrives on screen. The kit shows these next to the same part of your page.</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(Object.entries(e.sectionClips) as [SectionId, string][]).map(([id, src]) => (
              <li key={id}>
                <video src={src} autoPlay muted loop playsInline preload="metadata" className="block h-auto w-full rounded-lg border border-line bg-paper-2" aria-label={`${e.title} — ${partName(id)}`} />
                <p className="mt-2 text-sm">{partName(id)}</p>
                {sectionGuide[id] && <p className="text-xs text-muted">{sectionGuide[id].look.charAt(0).toUpperCase() + sectionGuide[id].look.slice(1)}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {effects.length > 0 && (
        <section className="mt-14" aria-labelledby="effects">
          <h2 id="effects" className="text-2xl tracking-tight">Effects</h2>
          <p className="mt-2 text-ink-2">The kit’s effects and big-idea moments as this site uses them. The kit shows these next to the same effect.</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {effects.map(([name, line, src]) => (
              <li key={src}>
                <video src={src} autoPlay muted loop playsInline preload="metadata" className="block h-auto w-full rounded-lg border border-line bg-paper-2" aria-label={`${e.title} — ${name}`} />
                <p className="mt-2 text-sm">{name}</p>
                <p className="text-xs text-muted">{line}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14 max-w-3xl" aria-labelledby="made-with">
        <h2 id="made-with" className="text-2xl tracking-tight">How it was made</h2>
        <p className="mt-2 text-ink-2">The exact choices picked in OpusKit to create this site.</p>
        <dl className="mt-6 divide-y divide-line border-y border-line">
          {e.choices.map((c) => (
            <div key={c.label} className="flex gap-4 py-3">
              <dt className="w-36 shrink-0 text-sm text-muted">{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
        </dl>
        {e.note && <p className="mt-4 text-sm text-muted">{e.note}</p>}
      </section>
    </article>
  )
}
