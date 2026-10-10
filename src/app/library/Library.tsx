'use client'
// Discover (docs/plan-library.md): sites only — whole sites are what people know how to judge. The + on a site asks
// what you like about it (decision 35): its whole look, or only its colours, lettering, first screen or movement; parts
// are taken on its own page. The Library is only browsing — no steps; Build my site (header, Collection) starts them.
// Four views (the user, 2026-10-10: what a site has to take must be pickable in the Library itself): Sites — whole sites,
// filtered by one kind and one feel — then Sections, Moments and Touches: every card of the catalog
// (src/data/takeables.ts) once, filtered by its category, each marked with the site it comes from. The view is kept in
// the address (#sections), so coming back from a site keeps it.
import { Check, Maximize2, Plus } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { Chip } from '@/components/ui'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { KIND_GROUPS, directions, families, kindName } from '@/data/taxonomy'
import { alternativesOf, hasItem, takeKeyOf, shelfSites, siteName, siteSpec, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { behaviourOf } from '@/data/pieces'
import type { BehaviourId, PieceId } from '@/types/domain'
import { useCollection } from '@/lib/collection'
import { useHydrated } from '@/lib/store'
import type { FamilyId, PurposeId } from '@/types/domain'
import DEMO_CLIPS from '@/data/demo-clips.generated.json'
import { Clip, ItemPreview, SiteThumb, StartBlank, TakenPicture, exampleOf, pureLook, standardLook, useCollect } from './parts'
import { LikeButton, catalogOf, type CatalogCard } from './SiteTake'
import { TAKE_CATEGORIES, shownPure, type TakeGroup } from '@/data/takeables'

const SITES = shelfSites.map((ref) => { const spec = siteSpec(ref)!; return { ref, spec, name: siteName(ref), families: directions[spec.direction].families } })
const KINDS = Object.keys(KIND_GROUPS).filter((g) => SITES.some((s) => KIND_GROUPS[g].kinds.includes(s.spec.purpose)))
const FEELS = (['quiet', 'minimal', 'editorial', 'organic', 'bold', 'raw', 'cinematic', 'experimental', 'futuristic'] as FamilyId[]).filter((f) => SITES.some((s) => s.families.includes(f)))

// No Style view: colours and lettering are taken with a site (its + and its page), not browsed on their own.
const VIEWS = [['sites', 'Sites'], ['sections', 'Sections'], ['moments', 'Moments'], ['touches', 'Touches']] as const
type View = (typeof VIEWS)[number][0]
const VIEW_LINE: Record<Exclude<View, 'sites'>, string> = {
  sections: 'First screens, menus, parts and footers — each design once, from the site that does it best.',
  moments: 'Things that happen on the page: welcomes, page changes, headlines, scroll, photos, sound.',
  touches: 'How a site answers the pointer: links, buttons and the cursor.',
}

export function Library() {
  const ready = useHydrated()
  const [view, setView] = useState<View>('sites')
  useEffect(() => {
    const read = () => { const h = location.hash.slice(1); setView(VIEWS.some(([id]) => id === h) ? (h as View) : 'sites') }
    read(); addEventListener('hashchange', read)
    return () => removeEventListener('hashchange', read)
  }, [])
  const pickView = (v: View) => { setView(v); history.replaceState(null, '', v === 'sites' ? location.pathname : `#${v}`) }
  const [feel, setFeel] = useState<FamilyId | null>(null)
  // Kinds of site: only a filter. Inspiration comes from any kind — a shop can take a restaurant's colours — so the
  // owner's own kind (You) is never set or read here.
  const [group, setGroup] = useState<string | null>(null)
  const kinds = group ? KIND_GROUPS[group].kinds : []
  const clear = () => { setGroup(null); setFeel(null) }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-8 md:pt-12">
      {/* One message: look at sites, take the pieces you like, your site is put together from them. */}
      <h1 className="display text-[clamp(2rem,3vw,2.75rem)]">Take what you like.</h1>
      <p className="mt-2 text-ink-2">Look through real sites and take the pieces you like — your site is put together from them.</p>

      {/* The views, as ruled cells like the recipe page's tabs (docs/design.md). */}
      <div role="tablist" aria-label="Library" className="mt-8 flex overflow-x-auto border-y border-line [scrollbar-width:none]">
        {VIEWS.map(([id, name]) => (
          <button key={id} type="button" role="tab" aria-selected={view === id} onClick={() => pickView(id)}
            className={`relative flex h-11 shrink-0 items-center border-r border-line px-5 text-sm transition-colors first:border-l ${view === id ? 'bg-white text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-pencil' : 'text-ink-2 hover:bg-paper-2 hover:text-ink'}`}>{name}</button>
        ))}
      </div>

      {view !== 'sites' ? <Catalog key={view} group={view} /> : <>
      {/* Two filters, both alike: a label, chips beside it — one of each (tap it again to clear). */}
      <div className="relative mt-6 space-y-2.5">
        {(!!group || !!feel) && <button type="button" onClick={clear} className="absolute right-0 top-0 text-[13px] text-muted hover:text-ink">Clear filters</button>}
        <Chips label="Kind" options={KINDS} name={(g) => KIND_GROUPS[g].name} value={group} onChange={setGroup} />
        <Chips label="Feel" options={FEELS} name={(f) => families[f as FamilyId].name} value={feel} onChange={(f) => setFeel(f as FamilyId | null)} />
      </div>

      <motion.div key={`${group}|${feel}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }} className="pt-10">
        {ready && <Sites kinds={kinds} feel={feel} onClear={clear} />}
      </motion.div>
      </>}
      <p className="mt-16 border-t border-line pt-6 text-sm text-muted">Nothing here for you? <StartBlank /></p>
    </div>
  )
}

// ─── A filter: chips, one to pick (the picked one again clears it) ───────

function Chips({ label, options, name, value, onChange }: { label: string; options: string[]; name: (id: string) => string; value: string | null; onChange: (v: string | null) => void }) {
  const flip = (id: string) => onChange(value === id ? null : id)
  return (
    <div role="group" aria-labelledby={`f-${label}`} className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
      <h2 id={`f-${label}`} className="label w-12 shrink-0 text-muted">{label}</h2>
      <div className="flex flex-wrap gap-1.5">
        {options.map((id) => <Chip key={id} small active={value === id} onClick={() => flip(id)}>{name(id)}</Chip>)}
      </div>
    </div>
  )
}

// ─── Style / Sections / Moments / Touches: the catalog, one category at a time ─

function Catalog({ group }: { group: TakeGroup }) {
  const ready = useHydrated()
  const [category, setCategory] = useState<string | null>(null)
  const all = catalogOf(group)
  const cats = TAKE_CATEGORIES[group].filter((c) => all.some((x) => x.category === c))
  const list = category ? all.filter((x) => x.category === category) : all
  return (
    <div className="mt-6">
      <p className="text-sm text-ink-2">{VIEW_LINE[group]}</p>
      <div className="mt-4"><Chips label="Show" options={cats} name={(c) => c} value={category} onChange={setCategory} /></div>
      <motion.ul key={category ?? 'all'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}
        className="grid gap-x-6 gap-y-10 pt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {ready && list.map((x) => <Part key={`${x.category}|${x.title}`} card={x} />)}
      </motion.ul>
    </div>
  )
}

/** A catalog card: the design as the site that shows it best has it; the + takes it. Opened: the design large, then its
 *  alternatives — other designs of the same thing (another menu, another link hover), never the same design recoloured
 *  on another site — then the sites it is used on, as the sites themselves, not their names (the user, 2026-10-10). */
function Part({ card: x }: { card: CatalogCard }) {
  const [open, setOpen] = useState(false)
  // Alternatives: for an effect, the ones a site can only have instead of it (a link hover among link hovers); for a
  // section, the other designs of its category (another menu, another way to show work).
  const others = x.item.kind === 'effect' ? alternativesOf(x.item.id) : []
  const alts = x.item.kind === 'effect'
    ? (others.length ? [...catalogOf('touches'), ...catalogOf('moments')].filter((y) => y.item.kind === 'effect' && others.includes(y.item.id)) : [])
    : catalogOf('sections').filter((y) => y.category === x.category && y.title !== x.title)
  const altTitle = x.item.kind === 'effect' ? `Or another ${ONE_OF[behaviourOf(x.item.id)!] ?? 'one'} — a site has one` : ANOTHER[x.category] ?? `Or another ${x.category.toLowerCase()}`
  return (
    <li className="group relative min-w-0">
      {/* The picture can hold controls of its own (a demo's buttons), so it is never inside a button: the name's button
          covers the whole card instead (as in the site's own list). */}
      <TakeFrame item={x.item}><CardPicture item={x.item} category={x.category} /></TakeFrame>
      <button type="button" onClick={() => setOpen(true)} aria-label={`${x.title} — see it`} className="mt-2 block w-full text-left after:absolute after:inset-0">
        <span className="block truncate text-sm font-medium">{x.title}</span>
        <span className="block truncate text-xs text-muted">{x.line}</span>
      </button>
      <TakePlus item={x.item} title={x.title} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[92vh] w-[min(96vw,80rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
          <div className="border-b border-line px-5 py-3.5 pr-14 md:px-6">
            <DialogTitle className="truncate text-xl font-medium tracking-tight">{x.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted">{x.line}</DialogDescription>
          </div>
          <div className="min-h-0 flex-1 space-y-10 overflow-y-auto p-5 md:p-6 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]">
            {/* The design top left, large; its alternatives around it — beside it, then below (the user, 2026-10-10). */}
            <section aria-label="Alternatives">
              {alts.length > 0 && <h3 className="label mb-4 text-muted">{altTitle}</h3>}
              <ul className="grid grid-flow-dense gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <li className={`relative ${alts.length ? 'sm:col-span-2 sm:row-span-2' : 'sm:col-span-2 lg:col-start-2'}`}>
                  <TakeFrame item={x.item}><CardPicture item={x.item} category={x.category} /></TakeFrame>
                  <p className="mt-2 truncate text-sm font-medium">{x.title}</p>
                  <TakePlus item={x.item} title={x.title} />
                </li>
                {alts.map((y) => (
                  <li key={y.title} className="relative">
                    <TakeFrame item={y.item}><CardPicture item={y.item} category={y.category} /></TakeFrame>
                    <p className="mt-2 truncate text-sm font-medium">{y.title}</p>
                    <TakePlus item={y.item} title={y.title} />
                  </li>
                ))}
              </ul>
            </section>
            <section aria-label="Used on">
              <h3 className="label mb-4 text-muted">Used on</h3>
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {x.styles.map((y) => (
                  <li key={y.site}>
                    <Link href={`/library/sites/${y.site.replace(':', '/')}`} aria-label={siteName(y.site)} title={siteName(y.site)}
                      className="block overflow-hidden rounded-[3px] border border-line transition-[border-color,translate] hover:-translate-y-0.5 hover:border-ink">
                      <LazyMount className="aspect-[16/10]"><SiteThumb site={y.site} auto /></LazyMount>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </li>
  )
}

/** "Or another link hover": what each set of one-of effects is called. */
const ONE_OF: Partial<Record<BehaviourId, string>> = { links: 'link hover', buttons: 'main button', transitions: 'page change', headlines: 'headline entrance' }
/** A section's alternatives, said plainly; a site has one first screen, one menu, one footer. */
const ANOTHER: Record<string, string> = {
  'First screen': 'Or another first screen — a site has one', Menu: 'Or another menu — a site has one', Footer: 'Or another footer — a site has one',
  Work: 'Other ways to show work', Products: 'Other ways to show products', Story: 'Other ways to tell the story', Listings: 'Other ways to list things',
}

/** What a catalog card shows: an effect as the pure component in OpusKit's standard theme, live and centred (the same
 *  piece every site gets); a section as the site that shows it best has it. */
// A moment that lives in a whole site (a section held while you scroll, photos on the page) shows the site's own
// recording where there is one; anything a component shows alone (a button, a link, a headline) is the component.
const SITE_MOMENTS = new Set(['Scroll', 'Photos'])
// A menu is a component too: all eight drawn the same way, in the standard theme, so they compare side by side.
// A piece that only moves when used (hovered, dragged, clicked, scrolled past) plays a clip of it being used, the Mac's
// own cursor doing it (scripts/capture/demo-clips.mjs): standing still it says nothing (the user, 2026-10-10).
const CardPicture = ({ item, category }: { item: CollectionItem; category: string }) => {
  const key = takeKeyOf(item)
  if (key && shownPure(key)) return <div className="pointer-events-none size-full"><ItemPreview item={item} look={pureLook(item)} pure /></div>
  const site = item.kind === 'effect' && SITE_MOMENTS.has(category) && exampleOf(item.from as SiteRef)?.pieceClips?.[item.id]
  const used = item.kind === 'effect' && !site && (DEMO_CLIPS as Record<string, { src: string }>)[item.id]
  if (used) return <Clip src={used.src} />
  return item.kind === 'effect' && !site
    ? <div className="pointer-events-none size-full"><ItemPreview item={item} look={standardLook()} /></div>
    : <TakenPicture item={item} />
}

/** A takeable picture's frame: ringed in pencil once it is in the Collection. */
function TakeFrame({ item, children }: { item: CollectionItem; children: ReactNode }) {
  const on = hasItem(useCollection(), item)
  return (
    <div className={`relative overflow-hidden rounded-[3px] border bg-[#18181B] transition-[border-color,box-shadow] ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line group-hover:border-ink'}`}>
      <LazyMount className="aspect-[16/10] overflow-hidden">{children}</LazyMount>
    </div>
  )
}

/** The + on a picture: takes that very style, or puts it back. */
function TakePlus({ item, title }: { item: CollectionItem; title: string }) {
  const { on, flip } = useCollect(item)
  return (
    <button type="button" aria-pressed={on} onClick={flip} aria-label={on ? `Put back ${title}` : `Take ${title}`}
      className={`absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full shadow-sm transition-colors ${on ? 'bg-pencil text-paper' : 'bg-white/90 text-ink hover:bg-ink hover:text-paper'}`}>{on ? <Check size={14} aria-hidden /> : <Plus size={15} aria-hidden />}</button>
  )
}

// ─── Sites ──────────────────────────────────────────────────────────────────

function Sites({ kinds, feel, onClear }: { kinds: PurposeId[]; feel: FamilyId | null; onClear: () => void }) {
  const list = SITES.filter((s) => (!kinds.length || kinds.includes(s.spec.purpose)) && (!feel || s.families.includes(feel)))
  if (!list.length) return <div className="py-20 text-center"><p className="text-xl">Nothing matches all of that.</p><button type="button" className="link mt-3" onClick={onClear}>Clear filters</button></div>
  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {list.map((s) => (
        <li key={s.ref} className="group relative">
          <Link href={`/library/sites/${s.ref.replace(':', '/')}`} className="block">
            <div className="overflow-hidden rounded-lg border border-line transition-[border-color,translate,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-ink group-hover:shadow-[0_16px_32px_-20px_rgb(0_0_0/.45)]"><LazyMount className="aspect-[16/10]"><SiteThumb site={s.ref} auto /></LazyMount></div>
            <h2 className="mt-3 text-lg font-medium tracking-tight group-hover:text-pencil">{s.name}</h2>
            <p className="mt-0.5 text-sm text-muted">{kindName(s.spec.purpose)} · {directions[s.spec.direction].name}</p>
          </Link>
          <div className="absolute right-2.5 top-2.5 flex gap-1.5">
            <Expand site={s} />
            <LikeButton site={s.ref} />
          </div>
        </li>
      ))}
    </ul>
  )
}

/** The site large: its recording with controls, or — for a site not recorded yet — the live site itself. */
function Expand({ site: s }: { site: (typeof SITES)[number] }) {
  const [open, setOpen] = useState(false)
  const e = exampleOf(s.ref)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} title="See it larger" aria-label={`See ${s.name} larger`}
        className="grid size-8 place-items-center rounded-full bg-white/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-white"><Maximize2 size={14} aria-hidden /></button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex w-[min(94vw,72rem)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
          <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 pr-14">
            <div className="min-w-0">
              <DialogTitle className="truncate text-lg font-medium tracking-tight">{s.name}</DialogTitle>
              <DialogDescription className="text-sm text-muted">{kindName(s.spec.purpose)} · {directions[s.spec.direction].name}</DialogDescription>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href={`/library/sites/${s.ref.replace(':', '/')}`} className="hidden h-9 items-center rounded-[3px] px-3.5 text-sm text-ink-2 hover:bg-paper-2 hover:text-ink sm:inline-flex">See its parts</Link>
              <LikeButton site={s.ref} label="I like…" className="h-9 px-3.5" />
            </div>
          </div>
          {/* The whole landing page where it was recorded, else the short loop. */}
          {e?.fullClip ?? e?.clip
            ? <video src={e.fullClip ?? e.clip} poster={`/examples/${e.slug}.jpg`} muted loop playsInline autoPlay controls className="block max-h-[78vh] w-full bg-black object-contain" />
            : e?.livePath ? <iframe src={e.livePath} title={`${s.name}, the live site`} className="block h-[78vh] w-full bg-white" />
            : <SiteThumb site={s.ref} />}
        </DialogContent>
      </Dialog>
    </>
  )
}
