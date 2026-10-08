'use client'
// Taking from a site (decision 35): the + on a site opens it large, with everything it has laid out to take — its whole
// look, each of its qualities (colours, lettering, first screen, movement), its parts in their designs (menu, every
// section, footer) and its effects. A tap takes one or puts it back. Only how it looks comes along: what the owner's
// site is (its kind, pages, words) stays theirs. The site's own page shows the same list (`TakeList`).
import { Check, ExternalLink, Plus } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { LazyMount } from '@/components/LazyMount'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { palettes, typography } from '@/data/ingredients'
import { sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { seedBySlug } from '@/data/recipes'
import { directions, motionLevels, purposes } from '@/data/taxonomy'
import { heroName } from '@/components/HeroPreview'
import { jobOf, specToPlan } from '@/features/kit/plan'
import { hasItem, itemKey, siteName, siteSpec, toggleItem, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { TRAITS, TRAIT_IDS, siteTraits } from '@/features/library/inspire'
import { composeRecipe } from '@/features/recipes/engine'
import { updateCollection, useCollection } from '@/lib/collection'
import { SiteThumb, TakenPicture, exampleOf, siteLook } from './parts'

type Takeable = { item: CollectionItem; title: string; sub: string; picture: ReactNode }

/** Everything a site has to take, top of the site to the bottom, each drawn in the site's own look (with a few seconds
 *  of the real site beside a part where it was recorded). */
function useTakeables(site: SiteRef) {
  const e = exampleOf(site)
  const data = useMemo(() => {
    const spec = siteSpec(site)!, recipe = composeRecipe(spec), look = siteLook(site, specToPlan(spec), recipe.layoutSystem.id), t = siteTraits(site)!
    // Drawn exactly as the Collection will show it once taken (`TakenPicture`).
    const drawn = (item: CollectionItem) => <TakenPicture item={item} />
    const value = { colours: palettes[t.palette].name, lettering: typography[t.typography].name, opening: heroName(t.hero), motion: motionLevels[t.motion].name }
    const qualities: Takeable[] = TRAIT_IDS.map((what) => ({ item: { kind: 'like', what, site }, title: TRAITS[what].name, sub: value[what],
      picture: drawn({ kind: 'like', what, site }) }))
    const parts: Takeable[] = [], seen = new Set<string>()
    const push = (p: Takeable) => { const k = itemKey(p.item); if (!seen.has(k)) { seen.add(k); parts.push(p) } }
    const nav: CollectionItem = { kind: 'menu', id: recipe.chrome.nav.id, from: site }
    push({ item: nav, title: 'Navigation', sub: recipe.chrome.nav.name, picture: drawn(nav) })
    for (const pg of recipe.pages) for (const s of pg.sections) {
      if (s.id === 'hero' || s.id === 'navbar' || s.id === 'footer') continue
      const item: CollectionItem = { kind: 'section', id: s.id, ...(s.variant ? { variant: s.variant.id } : {}), from: site }
      push({ item, title: sections[s.id].name, sub: `${jobOf(s.id)}${s.variant ? ` · ${s.variant.name}` : ''} · ${pg.label}`, picture: drawn(item) })
    }
    const foot: CollectionItem = { kind: 'footer', id: recipe.chrome.footerStyle.id, from: site }
    push({ item: foot, title: 'Footer', sub: recipe.chrome.footerStyle.name, picture: drawn(foot) })
    const effects: Takeable[] = recipe.pieces.map((p) => { const item: CollectionItem = { kind: 'effect', id: p.id, from: site }; return { item, title: pieces[p.id].name, sub: pieces[p.id].line, picture: drawn(item) } })
    return { spec, recipe, look, t, qualities, parts, effects }
  }, [site, e])
  useGoogleFonts(data.look.type.googleFamilies)
  return data
}

/** How many things the Collection holds from this site. */
const takenFrom = (items: CollectionItem[], site: SiteRef) => items.filter((i) => (i.kind === 'site' || i.kind === 'like' ? i.site === site : 'from' in i && i.from === site)).length

/** Everything to take from one site, in groups: its whole look, its qualities, its parts, its effects. */
export function TakeList({ site, cols = 'sm:grid-cols-2 lg:grid-cols-3', noLook }: { site: SiteRef; cols?: string; /** The whole look is taken beside it (the dialog's left column). */ noLook?: boolean }) {
  const { spec, qualities, parts, effects } = useTakeables(site)
  const look: CollectionItem = { kind: 'site', site }
  return (
    <div className="space-y-10">
      {!noLook && <Group title="Its whole look" line="Colours, lettering, corners, menu and footer together — mixed into your site with whatever else you like.">
        <ul className="grid gap-x-5 gap-y-6 sm:grid-cols-2"><Take item={look} title={directions[spec.direction].name} sub="The whole look" picture={<TakenPicture item={look} auto />} /></ul>
      </Group>}
      <Group title="Just one thing" line="Only this quality comes along. Your directions mix it with the rest.">
        <ul className="grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4">{qualities.map((x) => <Take key={itemKey(x.item)} {...x} />)}</ul>
      </Group>
      <Group title="Its parts" line="A part comes in this design, on the page of yours where it belongs.">
        <ul className={`grid gap-x-5 gap-y-6 ${cols}`}>{parts.map((x) => <Take key={itemKey(x.item)} {...x} />)}</ul>
      </Group>
      {!!effects.length && (
        <Group title="Its effects" line="Movement this site uses — on the part of yours that can carry it.">
          <ul className={`grid gap-x-5 gap-y-6 ${cols}`}>{effects.map((x) => <Take key={itemKey(x.item)} {...x} />)}</ul>
        </Group>
      )}
    </div>
  )
}

function Group({ title, line, children }: { title: string; line: string; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line pt-3">
        <h3 className="label">{title}</h3>
        <p className="text-xs text-muted">{line}</p>
      </div>
      {children}
    </section>
  )
}

/** One thing to take: its picture, its name; a tap anywhere on it takes it or puts it back. */
function Take({ item, title, sub, picture }: Takeable) {
  const on = hasItem(useCollection(), item)
  return (
    <li className="group relative min-w-0">
      <div className={`relative overflow-hidden rounded-[3px] border bg-white transition-[border-color,box-shadow] ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line group-hover:border-ink'}`}>
        <LazyMount className="aspect-[16/10] overflow-hidden">{picture}</LazyMount>
        <span aria-hidden className={`absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full shadow-sm transition-colors ${on ? 'bg-pencil text-paper' : 'bg-white/90 text-ink group-hover:bg-ink group-hover:text-paper'}`}>{on ? <Check size={14} /> : <Plus size={15} />}</span>
      </div>
      {/* The picture can hold controls of its own (real site / your style), so the button sits beside it and covers the card. */}
      <button type="button" aria-pressed={on} onClick={() => updateCollection((x) => toggleItem(x, item))} className="mt-2 block w-full text-left after:absolute after:inset-0">
        <span className="block truncate text-sm font-medium">{title}</span>
        <span className="block truncate text-xs text-muted">{sub}</span>
      </button>
    </li>
  )
}

/** The + on a site: opens it large, everything it has laid out to take. */
export function LikeButton({ site, label, className = '' }: { site: SiteRef; label?: string; className?: string }) {
  const c = useCollection()
  const [open, setOpen] = useState(false)
  const n = takenFrom(c.items, site)
  return (
    <>
      <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }} aria-label={n ? `${n} taken from ${siteName(site)} — open it` : `Take something from ${siteName(site)}`} title="Take what you like"
        className={label
          ? `inline-flex h-12 shrink-0 items-center gap-2 rounded-[3px] px-5 text-sm font-medium transition-colors ${n ? 'bg-ink text-paper hover:bg-ink-2' : 'border border-line bg-white hover:border-ink'} ${className}`
          : `grid size-8 shrink-0 place-items-center rounded-full shadow-sm backdrop-blur-sm transition-colors ${n ? 'bg-ink text-paper' : 'bg-white/90 text-ink hover:bg-white'} ${className}`}>
        {n ? (label ? <><Check size={15} aria-hidden />{n} taken</> : <span className="text-[12px] font-semibold tabular-nums">{n}</span>) : <><Plus size={15} aria-hidden />{label}</>}
      </button>
      {open && <TakeDialog site={site} onClose={() => setOpen(false)} />}
    </>
  )
}

function TakeDialog({ site, onClose }: { site: SiteRef; onClose: () => void }) {
  const c = useCollection()
  const { spec } = useTakeables(site)
  const e = exampleOf(site), n = takenFrom(c.items, site)
  const look: CollectionItem = { kind: 'site', site }, whole = hasItem(c, look)
  const summary = e?.summary ?? seedBySlug[site.split(':')[1]]?.summary
  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent onClick={(x) => x.stopPropagation()} className="flex h-[min(92vh,60rem)] w-[min(96vw,84rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5 pr-14 md:px-6">
          <div className="min-w-0">
            <DialogTitle className="truncate text-xl font-medium tracking-tight">Take what you like from {siteName(site)}</DialogTitle>
            <DialogDescription className="truncate text-sm text-muted">{purposes[spec.purpose].name} · {directions[spec.direction].name} — only how it looks comes along; your site stays yours.</DialogDescription>
          </div>
        </div>
        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[22rem_minmax(0,1fr)] lg:overflow-hidden">
          {/* The site itself, large, on the left (on phones, on top) — and taking its whole look is right under it. */}
          <aside className="border-b border-line p-5 md:p-6 lg:overflow-y-auto lg:border-b-0 lg:border-r">
            <div className={`overflow-hidden rounded-[3px] border transition-[border-color,box-shadow] ${whole ? 'border-pencil ring-2 ring-pencil' : 'border-line'}`}><SiteThumb site={site} auto /></div>
            <button type="button" aria-pressed={whole} onClick={() => updateCollection((x) => toggleItem(x, look))}
              className={`mt-3 flex w-full items-center justify-between gap-3 rounded-[3px] border px-4 py-3 text-left transition-colors ${whole ? 'border-pencil bg-pencil text-paper' : 'border-ink bg-white hover:bg-ink hover:text-paper'}`}>
              <span><span className="block text-sm font-medium">{whole ? 'Its whole look is taken' : 'Take its whole look'}</span><span className="block text-xs opacity-75">{directions[spec.direction].name} — colours, lettering, corners, menu, footer</span></span>
              {whole ? <Check size={18} aria-hidden /> : <Plus size={18} aria-hidden />}
            </button>
            {summary && <p className="mt-4 text-sm leading-relaxed text-ink-2">{summary}</p>}
            {e?.livePath && <a href={e.livePath} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink"><ExternalLink size={14} aria-hidden /><span className="ulink">Visit the live site</span></a>}
          </aside>
          <div className="p-5 md:p-6 lg:min-h-0 lg:overflow-y-auto [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]">
            <TakeList site={site} cols="sm:grid-cols-2 xl:grid-cols-3" noLook />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line bg-white px-5 py-3.5 md:px-6">
          <p className="text-sm text-ink-2">{n ? `${n} taken from ${siteName(site)}` : 'Nothing taken yet — tap anything you like.'}</p>
          <button type="button" onClick={onClose} className="btn btn-ink btn-sm">Done</button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

