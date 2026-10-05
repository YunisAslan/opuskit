'use client'
// Shared by the Library's shelves, a site's page and the Collection: how any item is drawn, and the button that collects it.
import { ArrowRight, Check, Layers, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { useGoogleFonts } from '@/components/FontLoader'
import { LinkDemo, type LinkPiece } from '@/components/LinkDemo'
import { OptionDemo } from '@/components/OptionDemo'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { examples } from '@/data/examples'
import { directions, purposes } from '@/data/taxonomy'
import { HeroPreview } from '@/app/kit/HeroPreview'
import { lookOf } from '@/app/kit/ProductVisual'
import { hasItem, itemKey, itemName, notes, removeItem, siteName, siteSpec, sitesWith, startSite, toggleItem, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { behaviours, pieces } from '@/data/pieces'
import { specToPlan } from '@/features/kit/plan'
import { composeRecipe } from '@/features/recipes/engine'
import { planFromStudio, readCollection, updateCollection, useCollection } from '@/lib/collection'
import type { KitPlan, LayoutId, MediaPlacement, PurposeId, SectionTone } from '@/types/domain'

export type Look = ReturnType<typeof lookOf> & { plan: KitPlan; world: ReturnType<typeof worldFor>; brand?: string; layout?: LayoutId }

/** A site's own look, for its page and for the parts it shows on the shelves. */
export function siteLook(ref: SiteRef, plan: KitPlan, layout?: LayoutId): Look {
  return { ...lookOf(plan), plan, world: worldFor(siteSpec(ref)?.purpose), layout }
}
// Shelves are samples, never the visitor's own style (that is picked later): a part is drawn as on the first real site
// that has it, anything else in one neutral look dressed for the kind of site.
const looks = new Map<string, Look>()
export function sampleLook(item: CollectionItem, kind?: PurposeId): Look {
  const site = item.kind === 'section' ? sitesWith(item.id)[0] : undefined
  const key = site ?? `plain:${kind ?? ''}`
  if (!looks.has(key)) {
    const spec = site && siteSpec(site)
    const plan: KitPlan = spec ? specToPlan(spec) : { pages: [], purpose: kind }
    looks.set(key, spec ? siteLook(site, plan) : { ...lookOf(plan), plan, world: worldFor(kind) })
  }
  return looks.get(key)!
}

export const exampleOf = (ref: SiteRef) => (ref.startsWith('example:') ? examples.find((e) => `example:${e.slug}` === ref) : undefined)

/** One item, drawn the way you would get it. Fixed 16:10, so a shelf reads as one grid. */
export function ItemPreview(p: { item: CollectionItem; look: Look; rhythm?: { tone?: SectionTone; media?: MediaPlacement } }) {
  useGoogleFonts(p.look.type.googleFamilies)
  // On the look's own ground, so a part shorter than the frame doesn't end in a white band.
  return <div className="size-full" style={{ background: p.look.colors.background }}><Drawn {...p} /></div>
}
function Drawn({ item, look, rhythm }: { item: CollectionItem; look: Look; rhythm?: { tone?: SectionTone; media?: MediaPlacement } }) {
  const pv = { colors: look.colors, type: look.type, shape: look.shape, chapters: look.chapters, world: look.world, brand: look.brand, layout: look.layout }
  switch (item.kind) {
    case 'site': return <SiteThumb site={item.site} />
    case 'section': return <SectionPreview id={item.id} variant={item.variant} {...pv} {...rhythm} className="aspect-[16/10]" />
    case 'footer': return <SectionPreview id="footer" footer={item.id} {...pv} className="aspect-[16/10]" />
    case 'hero': return <div className="aspect-[16/10] overflow-hidden"><HeroPreview plan={look.plan} id={item.id} /></div>
    case 'menu': return <OptionDemo id={`nav:${item.id}`} colors={look.colors} type={look.type} shape={look.shape} />
    case 'effect':
      // Links are too small on their own: they play on a drawn footer.
      if (behaviours.links.ids.includes(item.id)) return <div className="aspect-[16/10] overflow-hidden"><LinkDemo piece={item.id as LinkPiece} colors={look.colors} type={look.type} shape={look.shape} brand={look.brand} /></div>
      return <ScaledFrame width={420} className="aspect-[16/10]"><PieceDemo id={item.id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame>
  }
}

/** A built site shows its real homepage (and a few seconds of it on hover); a recipe is drawn by the engine. */
export function SiteThumb({ site }: { site: SiteRef }) {
  const e = exampleOf(site)
  const video = useRef<HTMLVideoElement>(null)
  const recipe = useMemo(() => (e ? undefined : composeRecipe(siteSpec(site)!)), [e, site])
  if (!e) return <SitePreview {...previewFromRecipe(recipe!)} />
  const play = () => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.play().catch(() => {}) }
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-paper-2" onMouseEnter={play} onMouseLeave={() => video.current?.pause()}>
      <Image src={`/examples/${e.slug}.jpg`} alt="" width={800} height={500} className="size-full object-cover object-top" />
      {e.clip && <video ref={video} src={e.clip} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />}
    </div>
  )
}

/** Collecting one item (or putting it back). Never blocks: when the item makes a rule speak, a toast says so quietly. */
export function useCollect(item: CollectionItem) {
  const on = hasItem(useCollection(), item)
  const flip = () => {
    const before = readCollection(), after = toggleItem(before, item)
    updateCollection(() => after)
    if (on) return toast(`Removed: ${itemName(item)}`, { action: { label: 'Undo', onClick: () => updateCollection(() => before) } })
    const had = new Set(notes(before).map((n) => n.text))
    const note = notes(after).find((n) => !had.has(n.text) && n.keys.includes(itemKey(item)))
    if (note) toast(note.text, { action: { label: 'Open', onClick: openCollection } })
    // The first thing in an empty Collection: say once where it went and what comes next.
    else if (!before.items.length) toast('Added to your Collection', { description: 'Keep browsing. Build your site from the Collection when you’re ready.', action: { label: 'Open', onClick: openCollection } })
  }
  return { on, flip }
}

export function CollectButton({ item, label, className = '' }: { item: CollectionItem; label?: string; className?: string }) {
  const { on, flip } = useCollect(item)
  return (
    <button type="button" aria-pressed={on} onClick={(e) => { e.preventDefault(); e.stopPropagation(); flip() }}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border text-sm font-medium transition-colors ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'} ${label ? 'h-9 px-3.5' : 'size-9 justify-center'} ${className}`}>
      {on ? <Check size={15} aria-hidden /> : <Plus size={15} aria-hidden />}
      {label ? <span>{on ? 'Collected' : label}</span> : <span className="sr-only">{on ? `Remove ${itemName(item)} from your Collection` : `Collect ${itemName(item)}`}</span>}
    </button>
  )
}

/** Discover → Pages: the plan is built from the Collection (rebuilt only when it changed) and Pages opens. */
export function useToPages() {
  const router = useRouter()
  return () => {
    toast.dismiss() // browsing's notes stay behind with browsing
    const r = planFromStudio()
    if (r.unplaced.length) toast(`${r.unplaced.map((id) => pieces[id].name).join(', ')} needs a part that can carry it.`)
    else if (r.rebuilt && r.undo) toast('Pages rebuilt from your Collection.', { action: { label: 'Undo', onClick: r.undo } })
    router.push('/studio/pages')
  }
}

const OPEN = 'opuskit:open-collection'
export const openCollection = () => window.dispatchEvent(new Event(OPEN))

const GROUPS: [string, (i: CollectionItem) => boolean][] = [
  ['Sites', (i) => i.kind === 'site'],
  ['Parts', (i) => i.kind === 'section' || i.kind === 'hero' || i.kind === 'menu' || i.kind === 'footer'],
  ['Effects', (i) => i.kind === 'effect'],
]

/** The Collection — the cart (2026-10-05): in the site's header on every page, the last things collected and their
 *  count (a small bump when something goes in). Opened: everything in it, the quiet notes, remove — and the one way
 *  from browsing to building, **Build my site**, which starts Pages → Style → Recipe. */
export function CollectionSheet() {
  const c = useCollection()
  const toPages = useToPages()
  const n = c.items.length
  const [open, setOpen] = useState(false)
  const prev = useRef(n)
  const [bump, setBump] = useState(0)
  useEffect(() => { if (n > prev.current) setBump((b) => b + 1); prev.current = n }, [n])
  useEffect(() => { const f = () => setOpen(true); window.addEventListener(OPEN, f); return () => window.removeEventListener(OPEN, f) }, [])
  const all = notes(c)
  const remove = (i: CollectionItem) => { const before = readCollection(); updateCollection((x) => removeItem(x, itemKey(i))); toast(`Removed: ${itemName(i)}`, { action: { label: 'Undo', onClick: () => updateCollection(() => before) } }) }
  const clear = () => { const before = readCollection(); updateCollection((x) => ({ ...x, items: [] })); toast('Collection cleared', { action: { label: 'Undo', onClick: () => updateCollection(() => before) } }) }
  // What Build will make, in one line: the start's pages (or the kind of site's) and look, and how much rides along.
  const start = startSite(c), startSpec = start ? siteSpec(start) : undefined
  const parts = c.items.filter((i) => i.kind !== 'site' && i.kind !== 'effect').length, fx = c.items.filter((i) => i.kind === 'effect').length
  const kindPages = c.purpose ? purposes[c.purpose].pages.filter((p) => p.tier === 'recommended').length : 0
  const summary = [
    startSpec ? `${startSpec.pages.length} pages in ${directions[startSpec.direction].name}` : c.purpose ? `A ${purposes[c.purpose].name.toLowerCase()}, ${kindPages} pages` : 'Pages for your kind of site',
    parts && `${parts} ${parts === 1 ? 'part' : 'parts'}`, fx && `${fx} ${fx === 1 ? 'effect' : 'effects'}`,
  ].filter(Boolean).join(' · ')
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-line bg-white pl-1 pr-2 text-sm hover:border-ink sm:gap-2 sm:pl-1.5 sm:pr-3" aria-label={`Your Collection, ${n} ${n === 1 ? 'thing' : 'things'}`}>
        {n ? (
          <span className="hidden -space-x-2.5 sm:flex" aria-hidden>
            {c.items.slice(-3).map((i) => <span key={itemKey(i)} className="block w-9 overflow-hidden rounded-[5px] border-2 border-white bg-paper-2"><span className="pointer-events-none block aspect-[16/10] overflow-hidden">{i.kind === 'site' ? <SiteThumb site={i.site} /> : <ItemPreview item={i} look={sampleLook(i, c.purpose)} />}</span></span>)}
          </span>
        ) : null}
        <Layers size={16} className={`ml-1.5 text-muted ${n ? 'sm:hidden' : ''}`} aria-hidden />
        <span className="hidden font-medium sm:inline">Collection</span>
        <span key={bump} className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-medium tabular-nums ${n ? 'bg-pencil text-white' : 'bg-paper-2 text-muted'} ${bump ? 'bump' : ''}`}>{n}</span>
      </SheetTrigger>
      {/* Wide enough to look at what you picked (the sheet's own default is 24rem). */}
      <SheetContent className="flex w-full flex-col gap-0 bg-paper p-0 data-[side=right]:sm:max-w-[38rem]">
        <SheetHeader className="flex-row items-baseline gap-3 border-b border-line px-6 py-5 pr-14">
          <SheetTitle className="text-2xl font-medium tracking-tight">Your Collection</SheetTitle>
          <span className="text-sm text-muted">{n ? `${n} ${n === 1 ? 'thing' : 'things'}` : 'empty'}</span>
          {n > 0 && <button type="button" onClick={clear} className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><Trash2 size={14} aria-hidden />Clear all</button>}
        </SheetHeader>
        {!n ? (
          <div className="grid flex-1 place-content-center px-8 text-center">
            <Layers size={28} className="mx-auto text-muted" aria-hidden />
            <p className="mt-4 text-lg">Nothing collected yet.</p>
            <p className="mt-1 text-sm text-muted">Tap + on a site, a section or an effect you like.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            {start && (
              <section aria-label="Your start">
                <p className="text-sm text-muted">Your start</p>
                <div className="relative mt-2 overflow-hidden rounded-xl border border-line">
                  <SiteThumb site={start} />
                  <button type="button" onClick={() => remove({ kind: 'site', site: start })} className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-white/90 text-ink shadow-sm hover:bg-white"><X size={15} aria-hidden /><span className="sr-only">Remove {siteName(start)}</span></button>
                </div>
                <p className="mt-2.5 font-medium">{siteName(start)}</p>
                <p className="text-sm text-muted">Its {startSpec!.pages.length} pages and its look — you change both next.</p>
              </section>
            )}
            {GROUPS.map(([name, test]) => {
              const items = c.items.filter((i) => test(i) && !(i.kind === 'site' && i.site === start))
              if (!items.length) return null
              const keys = new Set(items.map(itemKey))
              return (
                <section key={name} aria-label={name}>
                  <p className="flex items-baseline justify-between text-sm text-muted">{name === 'Sites' ? 'Other sites' : name}<span className="tabular-nums">{items.length}</span></p>
                  {all.filter((x) => x.keys.some((k) => keys.has(k))).map((x) => <p key={x.text} className="mt-2 rounded-md bg-paper-2 px-3 py-2 text-xs text-ink-2">{x.text}</p>)}
                  <ul className="mt-2 grid grid-cols-2 gap-3">
                    {items.map((i) => (
                      <li key={itemKey(i)} className="group relative">
                        <div className="overflow-hidden rounded-lg border border-line bg-white"><div className="pointer-events-none aspect-[16/10] overflow-hidden">{i.kind === 'site' ? <SiteThumb site={i.site} /> : <ItemPreview item={i} look={sampleLook(i, c.purpose)} />}</div></div>
                        <p className="mt-1.5 truncate text-sm font-medium">{itemName(i)}</p>
                        <button type="button" onClick={() => remove(i)} className="absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full bg-white/90 text-ink opacity-100 shadow-sm transition-opacity hover:bg-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"><X size={14} aria-hidden /><span className="sr-only">Remove {itemName(i)}</span></button>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
            {all.filter((x) => !x.keys.length).map((x) => <p key={x.text} className="rounded-md bg-paper-2 px-3 py-2 text-xs text-ink-2">{x.text}</p>)}
          </div>
        )}
        {n > 0 && (
          <div className="border-t border-line bg-white px-6 py-5">
            <p className="text-sm text-ink-2">{summary}</p>
            <button type="button" onClick={() => { setOpen(false); toPages() }} className="btn btn-ink mt-3 h-14 w-full text-base">Build my site<ArrowRight size={18} aria-hidden /></button>
            <ol className="mt-3 flex justify-center gap-4 text-xs text-muted" aria-label="What comes next">
              {['Pages', 'Style', 'Recipe'].map((x, k) => <li key={x} className="flex items-center gap-1.5"><span className="grid size-4 place-items-center rounded-full border border-line text-[10px] tabular-nums">{k + 1}</span>{x}</li>)}
            </ol>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

/** Building, in three steps — numbered, the ones behind you are links back. Browsing (Discover) is not a step. */
const STEPS = [['Pages', '/studio/pages'], ['Style', '/studio/style'], ['Recipe', '']] as const
export type Step = (typeof STEPS)[number][0]
export function Steps({ at }: { at: Step }) {
  const n = STEPS.findIndex(([s]) => s === at)
  return (
    <ol className="flex min-w-0 items-center gap-1 text-sm sm:gap-1.5" aria-label="Steps">
      {STEPS.map(([s, href], i) => {
        const dot = <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs tabular-nums ${i === n ? 'bg-ink text-paper' : i < n ? 'bg-ink/10 text-ink' : 'border border-line text-muted'}`}>{i + 1}</span>
        return (
          <li key={s} className="flex items-center gap-1.5">
            {i > 0 && <span className={`hidden h-px w-3 sm:block md:w-6 ${i <= n ? 'bg-ink/40' : 'bg-line'}`} aria-hidden />}
            {i < n && href
              ? <Link href={href} className="flex items-center gap-1.5 text-ink-2 hover:text-ink">{dot}<span className="hidden sm:inline">{s}</span></Link>
              : <span aria-current={i === n ? 'step' : undefined} className={`flex items-center gap-1.5 ${i === n ? 'font-medium text-ink' : 'text-muted'}`}>{dot}<span className={i === n ? '' : 'hidden sm:inline'}>{s}</span></span>}
          </li>
        )
      })}
    </ol>
  )
}

/** The bar under the site's header while building: back to the Library, the steps, and Next. */
export const FLOW_BAR = 'h-14' // 56px: sticky things below it sit at top-[7.5rem] (header 64 + bar 56)
export function FlowBar({ at, next }: { at: Step; next?: ReactNode }) {
  return (
    <div className={`sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-sm ${FLOW_BAR}`}>
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-3 px-5 md:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link href="/library" className="hidden shrink-0 text-sm text-muted hover:text-ink sm:inline">← Library</Link>
          <span className="hidden h-5 w-px bg-line sm:block" aria-hidden />
          <Steps at={at} />
        </div>
        <div className="flex shrink-0 items-center gap-2">{next}</div>
      </div>
    </div>
  )
}
