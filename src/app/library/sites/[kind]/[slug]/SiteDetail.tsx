'use client'
// One site on the shelf: start from all of it, or take single parts — every part drawn in this site's own look, next to
// a few seconds of the real site where there is a recording. Real sites are the shop window for sections.
import { ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { LazyMount } from '@/components/LazyMount'
import { DualShot } from '@/components/RealSiteClip'
import { EFFECTS, sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { seedBySlug } from '@/data/recipes'
import { directions, motionLevels, purposes } from '@/data/taxonomy'
import { jobOf, specToPlan } from '@/features/kit/plan'
import { itemKey, siteName, siteSpec, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { composeRecipe } from '@/features/recipes/engine'
import type { MediaPlacement, SectionTone } from '@/types/domain'
import { CollectButton, ItemPreview, SiteThumb, exampleOf, siteLook } from '../../../parts'

type Part = { item: CollectionItem; title: string; sub: string; where: string; clip?: string; rhythm?: { tone?: SectionTone; media?: MediaPlacement } }

export function SiteDetail({ site }: { site: SiteRef }) {
  const e = exampleOf(site)
  const { spec, recipe, look } = useMemo(() => {
    const spec = siteSpec(site)!, recipe = composeRecipe(spec)
    return { spec, recipe, look: siteLook(site, specToPlan(spec), recipe.layoutSystem.id) }
  }, [site])
  useGoogleFonts(look.type.googleFamilies)
  const summary = e?.summary ?? seedBySlug[site.split(':')[1]]?.summary

  // Its parts, top of the site to the bottom: first screen and menu, each page's sections (each design once), footer, effects.
  const parts = useMemo(() => {
    const out: Part[] = []
    const seen = new Set<string>()
    const push = (p: Part) => { const k = itemKey(p.item); if (!seen.has(k)) { seen.add(k); out.push(p) } }
    const hero = EFFECTS.find((x) => x.hero === recipe.media.hero.id)
    if (hero) push({ item: { kind: 'hero', id: hero.hero, from: site }, title: 'First screen', sub: hero.name, where: recipe.pages[0]?.label ?? 'Home', clip: e?.clip })
    push({ item: { kind: 'menu', id: recipe.chrome.nav.id, from: site }, title: 'Menu', sub: recipe.chrome.nav.name, where: 'Every page', clip: e?.sectionClips?.navbar })
    for (const pg of recipe.pages) for (const s of pg.sections) {
      if (s.id === 'hero' || s.id === 'navbar' || s.id === 'footer') continue
      push({ item: { kind: 'section', id: s.id, ...(s.variant ? { variant: s.variant.id } : {}), from: site }, title: jobOf(s.id), sub: s.variant ? `${sections[s.id].name} — ${s.variant.name}` : sections[s.id].name, where: pg.label, clip: e?.sectionClips?.[s.id], rhythm: { tone: s.tone, media: s.media } })
    }
    push({ item: { kind: 'footer', id: recipe.chrome.footerStyle.id, from: site }, title: 'Footer', sub: recipe.chrome.footerStyle.name, where: 'Every page', clip: e?.sectionClips?.footer })
    for (const p of recipe.pieces) push({ item: { kind: 'effect', id: p.id, from: site }, title: 'Effect', sub: pieces[p.id].name, where: p.where.split(' — ')[0], clip: e?.pieceClips?.[p.id] })
    return out
  }, [recipe, site, e])

  const match = (clip?: string) => (e && clip ? { example: e, clip, score: 0 } : undefined)

  return (
    <>
    <article className="mx-auto max-w-[1440px] px-5 pb-24 pt-8 md:px-8">
      <Link href="/library" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><ArrowLeft size={14} aria-hidden />Library</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div>
          <p className="text-sm text-muted">{e ? 'Built site' : 'Recipe — drawn by OpusKit, not built yet'} · {purposes[spec.purpose].name}</p>
          <h1 className="display mt-3 text-[clamp(2.2rem,4.5vw,4rem)]">{siteName(site)}</h1>
          {summary && <p className="prose-serif mt-4 max-w-xl text-ink-2">{summary}</p>}
          <p className="mt-4 text-sm text-muted">{directions[spec.direction].name} · {recipe.visualSystem.palette.name} · {look.type.name} · {motionLevels[spec.motion].name} motion</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <CollectButton item={{ kind: 'site', site }} label="Start from this site" className="h-12 px-5" />
            {e && <a href={e.livePath} target="_blank" rel="noreferrer" className="btn btn-line btn-sm inline-flex items-center gap-1.5"><ExternalLink size={14} aria-hidden />Visit the live site</a>}
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-line"><SiteThumb site={site} /></div>
      </div>

      <section className="mt-16" aria-labelledby="parts">
        <h2 id="parts" className="border-t border-ink pt-3 text-2xl font-medium tracking-tight">Take a part</h2>
        <ul className="mt-6 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((p) => (
            <li key={itemKey(p.item)}>
              <div className="overflow-hidden rounded-lg border border-line bg-white">
                <LazyMount className="aspect-[16/10] overflow-hidden">
                  <DualShot real={match(p.clip)} drawn={<div className="pointer-events-none size-full"><ItemPreview item={p.item} look={look} rhythm={p.rhythm} /></div>} />
                </LazyMount>
              </div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-medium leading-snug">{p.title}</h3>
                  <p className="mt-0.5 text-sm text-ink-2">{p.sub}</p>
                  <p className="mt-1 text-xs text-muted">{p.where}</p>
                </div>
                <CollectButton item={p.item} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
    </>
  )
}
