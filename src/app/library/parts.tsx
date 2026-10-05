'use client'
// Shared by the Library's shelves, a site's page and the Collection: how any item is drawn, and the button that collects it.
import { ArrowRight, Check, Layers, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useGoogleFonts } from '@/components/FontLoader'
import { LinkDemo, type LinkPiece } from '@/components/LinkDemo'
import { OptionDemo } from '@/components/OptionDemo'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { examples } from '@/data/examples'
import { HeroPreview } from '@/app/kit/HeroPreview'
import { lookOf } from '@/app/kit/ProductVisual'
import { hasItem, itemKey, itemName, notes, removeItem, siteSpec, sitesWith, toggleItem, type CollectionItem, type SiteRef } from '@/features/library/collection'
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

const OPEN = 'opuskit:open-collection'
export const openCollection = () => window.dispatchEvent(new Event(OPEN))

const GROUPS: [string, (i: CollectionItem) => boolean][] = [
  ['Sites', (i) => i.kind === 'site'],
  ['Parts', (i) => i.kind === 'section' || i.kind === 'hero' || i.kind === 'menu' || i.kind === 'footer'],
  ['Effects', (i) => i.kind === 'effect'],
]

/** The Collection, from the header: its count (a small bump when something goes in) and, opened, what is in it and the
 *  way on to your pages. Not a step of its own — it is always one click away. */
export function CollectionSheet() {
  const c = useCollection()
  const router = useRouter()
  const n = c.items.length
  const [open, setOpen] = useState(false)
  const prev = useRef(n)
  const [bump, setBump] = useState(0)
  useEffect(() => { if (n > prev.current) setBump((b) => b + 1); prev.current = n }, [n])
  useEffect(() => { const f = () => setOpen(true); window.addEventListener(OPEN, f); return () => window.removeEventListener(OPEN, f) }, [])
  const all = notes(c)
  const remove = (i: CollectionItem) => { const before = readCollection(); updateCollection((x) => removeItem(x, itemKey(i))); toast(`Removed: ${itemName(i)}`, { action: { label: 'Undo', onClick: () => updateCollection(() => before) } }) }
  const build = () => {
    const r = planFromStudio()
    if (r.unplaced.length) toast(`${r.unplaced.map((id) => pieces[id].name).join(', ')} needs a part that can carry it.`)
    else if (r.rebuilt && r.undo) toast('Pages rebuilt from your Collection.', { action: { label: 'Undo', onClick: r.undo } })
    setOpen(false)
    router.push('/studio/pages')
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="relative grid size-10 place-items-center rounded-full text-ink-2 hover:bg-paper-2 hover:text-ink" aria-label={`Your Collection, ${n} ${n === 1 ? 'thing' : 'things'}`}>
        <Layers size={20} aria-hidden />
        {n > 0 && <span key={bump} className={`absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-pencil px-1 text-[11px] font-medium tabular-nums text-white ${bump ? 'bump' : ''}`}>{n}</span>}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 bg-paper p-0 sm:max-w-md">
        <SheetHeader className="border-b border-line px-5 py-4"><SheetTitle className="text-xl">Your Collection</SheetTitle></SheetHeader>
        {!n ? <p className="px-5 py-8 text-ink-2">Empty. Tap + on anything you like.</p> : (
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
            {GROUPS.map(([name, test]) => {
              const items = c.items.filter(test)
              if (!items.length) return null
              const keys = new Set(items.map(itemKey))
              return (
                <section key={name} aria-label={name}>
                  <h3 className="text-sm text-muted">{name}</h3>
                  {all.filter((x) => x.keys.some((k) => keys.has(k))).map((x) => <p key={x.text} className="mt-2 rounded-md bg-paper-2 px-3 py-2 text-xs text-ink-2">{x.text}</p>)}
                  <ul className="mt-2 space-y-2">
                    {items.map((i) => (
                      <li key={itemKey(i)} className="group flex items-center gap-3">
                        <div className="w-24 shrink-0 overflow-hidden rounded-md border border-line bg-white"><div className="pointer-events-none aspect-[16/10] overflow-hidden">{i.kind === 'site' ? <SiteThumb site={i.site} /> : <ItemPreview item={i} look={sampleLook(i, c.purpose)} />}</div></div>
                        <p className="min-w-0 flex-1 text-sm font-medium leading-snug">{itemName(i)}</p>
                        <button type="button" onClick={() => remove(i)} className="grid size-8 shrink-0 place-items-center rounded-full text-muted hover:bg-paper-2 hover:text-ink"><X size={15} aria-hidden /><span className="sr-only">Remove {itemName(i)}</span></button>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        )}
        {n > 0 && <div className="border-t border-line p-5"><button type="button" onClick={build} className="btn btn-ink w-full">Build my site<ArrowRight size={16} aria-hidden /></button></div>}
      </SheetContent>
    </Sheet>
  )
}

/** The road from browsing to a site, so every page says where you are; the steps before this one are links back. */
const FLOW = [['Discover', '/library'], ['Pages', '/studio/pages'], ['Style', '/studio/style'], ['Recipe', '']] as const
export function FlowLine({ at }: { at: (typeof FLOW)[number][0] }) {
  const n = FLOW.findIndex(([s]) => s === at)
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted" aria-label="From browsing to a site">
      {FLOW.map(([s, href], i) => (
        <li key={s} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden>→</span>}
          {i < n && href ? <Link href={href} className="hover:text-ink hover:underline">{s}</Link>
            : <span aria-current={i === n ? 'step' : undefined} className="aria-[current=step]:font-medium aria-[current=step]:text-ink">{s}</span>}
        </li>
      ))}
    </ol>
  )
}
