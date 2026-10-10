'use client'
// One site on the shelf, with everything it has to take (`TakeList`, the same as the + on its card): its whole look,
// one of its qualities, its parts in their designs, its effects. Real sites are the shop window for sections.
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { LazyMount } from '@/components/LazyMount'
import { DualShot } from '@/components/RealSiteClip'
import { EFFECTS, sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { seedBySlug } from '@/data/recipes'
import { directions, motionLevels, kindName } from '@/data/taxonomy'
import { jobOf, specToPlan } from '@/features/studio/plan'
import { itemKey, siteName, siteSpec, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { composeRecipe } from '@/features/recipes/engine'
import type { MediaPlacement, SectionTone } from '@/types/domain'
import { SiteThumb, exampleOf, siteLook } from '../../../parts'
import { LikeButton, TakeList } from '../../../SiteTake'

type Part = { item: CollectionItem; title: string; sub: string; where: string; clip?: string; rhythm?: { tone?: SectionTone; media?: MediaPlacement } }

export function SiteDetail({ site }: { site: SiteRef }) {
  const e = exampleOf(site)
  const { spec, recipe, look } = useMemo(() => {
    const spec = siteSpec(site)!, recipe = composeRecipe(spec)
    return { spec, recipe, look: siteLook(site, specToPlan(spec), recipe.layoutSystem.id) }
  }, [site])
  useGoogleFonts(look.type.googleFamilies)
  const summary = e?.summary ?? seedBySlug[site.split(':')[1]]?.summary

  return (
    <>
    <article className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 md:px-8">
      <Link href="/library" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft size={14} aria-hidden />Library</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div>
          <p className="text-sm text-muted">{e ? 'Built site' : 'Recipe — drawn by OpusKit, not built yet'} · {kindName(spec.purpose)}</p>
          <h1 className="display mt-3 text-[clamp(2.2rem,4.5vw,4rem)]">{siteName(site)}</h1>
          {summary && <p className="prose-serif mt-4 max-w-xl text-ink-2">{summary}</p>}
          <p className="mt-4 text-sm text-muted">{directions[spec.direction].name} · {recipe.visualSystem.palette.name} · {look.type.name} · {motionLevels[spec.motion].name} motion</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <LikeButton site={site} label="I like this site" />
            {e && <a href={e.livePath} target="_blank" rel="noreferrer" className="btn btn-line btn-sm inline-flex items-center gap-1.5"><ExternalLink size={14} aria-hidden />Visit the live site</a>}
          </div>
        </div>
        {/* The whole landing page, recorded top to footer, where there is one; else the site's thumbnail. */}
        <div className="overflow-hidden rounded-lg border border-line">
          {e?.fullClip
            ? <video src={e.fullClip} poster={`/examples/${e.slug}.jpg`} muted loop playsInline autoPlay controls preload="metadata" className="block aspect-[16/10] w-full bg-black object-cover object-top" />
            : <SiteThumb site={site} />}
        </div>
      </div>

      <section className="mt-16" aria-labelledby="take">
        <h2 id="take" className="display text-[clamp(1.6rem,2.4vw,2.2rem)]">Take what you like</h2>
        <p className="mt-2 text-sm text-ink-2">Only how it looks comes along — your site stays yours.</p>
        <div className="mt-6"><TakeList site={site} /></div>
      </section>
    </article>
    </>
  )
}
