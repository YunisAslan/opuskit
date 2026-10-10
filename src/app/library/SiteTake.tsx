'use client'
// Taking from a site (decision 35): the + on a site opens it large, with what it has to take in four groups — Style
// (its whole look, its colours, its lettering), Sections (first screen, menu, the parts that carry its design, footer),
// Moments (what happens on the page) and Touches (how it answers the hand). Each design shows once in the whole Library,
// on the site that shows it best, under its own name (src/data/takeables.ts, decision 58). A tap takes one or puts it
// back. Only how it looks comes along: what the owner's site is (its kind, pages, words) stays theirs. The site's own
// page shows the same list (`TakeList`).
import { Check, ExternalLink, Plus } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { LazyMount } from '@/components/LazyMount'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { palettes, typography } from '@/data/ingredients'
import { seedBySlug } from '@/data/recipes'
import { directions, kindName } from '@/data/taxonomy'
import { TAKEABLES, TAKE_BY_KEY, TAKE_CATEGORIES, type TakeGroup } from '@/data/takeables'
import { specToPlan } from '@/features/studio/plan'
import { designsOf, hasItem, itemKey, shelfSites, siteName, siteSpec, toggleItem, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { siteTraits } from '@/features/library/inspire'
import { composeRecipe } from '@/features/recipes/engine'
import { updateCollection, useCollection } from '@/lib/collection'
import { SiteThumb, TakenPicture, exampleOf, siteLook, useCollect } from './parts'

type Takeable = { item: CollectionItem; title: string; sub: string; picture: ReactNode; order?: number }

/** The first shelf site with this palette or lettering shows it; the others don't repeat it. */
const firstWith = (what: 'palette' | 'typography', id: string) => shelfSites.find((r) => siteTraits(r)?.[what] === id)

/** What a site has to take: its style (its colours and lettering only where no earlier site shows the same), and the
 *  designs the catalog shows on it, grouped and in category order — each drawn as the Collection will show it. */
function useTakeables(site: SiteRef) {
  const e = exampleOf(site)
  const data = useMemo(() => {
    const spec = siteSpec(site)!, recipe = composeRecipe(spec), look = siteLook(site, specToPlan(spec), recipe.layoutSystem.id), t = siteTraits(site)!
    const drawn = (item: CollectionItem) => <TakenPicture item={item} />
    const style: Takeable[] = []
    if (firstWith('palette', t.palette) === site) style.push({ item: { kind: 'like', what: 'colours', site }, title: palettes[t.palette].name, sub: 'Colours', picture: drawn({ kind: 'like', what: 'colours', site }) })
    if (firstWith('typography', t.typography) === site) style.push({ item: { kind: 'like', what: 'lettering', site }, title: typography[t.typography].name, sub: 'Lettering', picture: drawn({ kind: 'like', what: 'lettering', site }) })
    const groups: Record<TakeGroup, Takeable[]> = { sections: [], moments: [], touches: [] }
    for (const { key, item } of designsOf(site)) {
      const x = TAKE_BY_KEY.get(key)
      if (x && x.bestOn === site) groups[x.group].push({ item, title: x.name, sub: x.category, picture: drawn(item), order: TAKE_CATEGORIES[x.group].indexOf(x.category) })
    }
    for (const g of Object.values(groups)) g.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    return { spec, recipe, look, t, style, groups }
  }, [site, e])
  useGoogleFonts(data.look.type.googleFamilies)
  return data
}

/** How many things the Collection holds from this site. */
const takenFrom = (items: CollectionItem[], site: SiteRef) => items.filter((i) => (i.kind === 'site' || i.kind === 'like' ? i.site === site : 'from' in i && i.from === site)).length

const GROUP_TEXT: Record<TakeGroup, [string, string]> = {
  sections: ['Sections', 'Parts this site does best. Everything else your site needs is added for you.'],
  moments: ['Moments', 'Things that happen on the page — on the part of yours that can carry them.'],
  touches: ['Touches', 'How it answers the pointer: links, buttons, the cursor.'],
}

/** Everything to take from one site, in four groups: Style, Sections, Moments, Touches (an empty group is left out). */
export function TakeList({ site, cols = 'sm:grid-cols-2 lg:grid-cols-3', noLook }: { site: SiteRef; cols?: string; /** The whole look is taken beside it (the dialog's left column). */ noLook?: boolean }) {
  const { spec, style, groups } = useTakeables(site)
  const look: CollectionItem = { kind: 'site', site }
  return (
    <div className="space-y-10">
      {(!noLook || !!style.length) && <Group title="Style" line="Its whole look, or only its colours or its lettering.">
        <ul className={`grid gap-x-5 gap-y-6 ${cols}`}>
          {!noLook && <Take item={look} title={directions[spec.direction].name} sub="The whole look" picture={<TakenPicture item={look} auto />} />}
          {style.map((x) => <Take key={itemKey(x.item)} {...x} />)}
        </ul>
      </Group>}
      {(Object.keys(GROUP_TEXT) as TakeGroup[]).filter((g) => groups[g].length).map((g) => (
        <Group key={g} title={GROUP_TEXT[g][0]} line={GROUP_TEXT[g][1]}>
          <ul className={`grid gap-x-5 gap-y-6 ${cols}`}>{groups[g].map((x) => <Take key={itemKey(x.item)} {...x} />)}</ul>
        </Group>
      ))}
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

/** Every card of one group across the whole Library, in category order — the Library's Sections / Moments / Touches
 *  views. Each design on its `bestOn` site (src/data/takeables.ts). */
export type Style = { site: SiteRef; item: CollectionItem }
/** A design and the sites that have it (`styles`, its `bestOn` first) — shown as the sites it is used on. */
export type CatalogCard = { item: CollectionItem; title: string; category: string; line: string; site: SiteRef; styles: Style[] }
let bySite: Map<string, Style[]> | undefined
const stylesOf = (key: string) => {
  bySite ??= shelfSites.reduce((m, site) => { for (const d of designsOf(site)) m.set(d.key, [...(m.get(d.key) ?? []), { site, item: d.item }]); return m }, new Map<string, Style[]>())
  return bySite.get(key) ?? []
}
const catalogs = new Map<TakeGroup, CatalogCard[]>()
export function catalogOf(group: TakeGroup): CatalogCard[] {
  if (!catalogs.has(group)) catalogs.set(group, TAKE_CATEGORIES[group].flatMap((category) => TAKEABLES.filter((x) => x.group === group && x.category === category).flatMap((x) => {
    const all = stylesOf(x.key), main = all.find((y) => y.site === x.bestOn)
    return main ? [{ item: main.item, title: x.name, category, line: x.line, site: x.bestOn, styles: [main, ...all.filter((y) => y !== main)] }] : []
  })))
  return catalogs.get(group)!
}

/** One thing to take: its picture, its name; a tap anywhere on it takes it or puts it back. */
function Take({ item, title, sub, picture }: Takeable) {
  const { on, flip } = useCollect(item)
  return (
    <li className="group relative min-w-0">
      <div className={`relative overflow-hidden rounded-[3px] border bg-white transition-[border-color,box-shadow] ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line group-hover:border-ink'}`}>
        <LazyMount className="aspect-[16/10] overflow-hidden">{picture}</LazyMount>
        <span aria-hidden className={`absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full shadow-sm transition-colors ${on ? 'bg-pencil text-paper' : 'bg-white/90 text-ink group-hover:bg-ink group-hover:text-paper'}`}>{on ? <Check size={14} /> : <Plus size={15} />}</span>
      </div>
      {/* The picture can hold controls of its own (real site / your style), so the button sits beside it and covers the card. */}
      <button type="button" aria-pressed={on} onClick={flip} className="mt-2 block w-full text-left after:absolute after:inset-0">
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
            <DialogDescription className="truncate text-sm text-muted">{kindName(spec.purpose)} · {directions[spec.direction].name} — only how it looks comes along; your site stays yours.</DialogDescription>
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

