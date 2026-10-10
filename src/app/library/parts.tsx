'use client'
// Shared by Discover, a site's page, Pages and the Collection: how any item is drawn, and the button that collects it.
import { ArrowLeft, ArrowRight, Check, Layers, Plus, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { useGoogleFonts } from '@/components/FontLoader'
import { LinkDemo, type LinkPiece } from '@/components/LinkDemo'
import { OptionDemo } from '@/components/OptionDemo'
import { OPUSKIT_DARK, PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { examples } from '@/data/examples'
import { directions, motionLevels, kindName } from '@/data/taxonomy'
import { palettes, typography } from '@/data/ingredients'
import { TRAITS, TRAIT_IDS, purposeFrom, siteTraits, type Trait } from '@/features/library/inspire'
import { heroName } from '@/components/HeroPreview'
import { HeroPreview } from '@/components/HeroPreview'
import { lookOf } from '@/components/ProductVisual'
import { hasItem, itemKey, itemName, notes, removeItem, siteName, siteSpec, sitesWith, toggleItem, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { behaviours, pieces } from '@/data/pieces'
import { specToPlan } from '@/features/studio/plan'
import { composeRecipe } from '@/features/recipes/engine'
import { adoptPlan, readCollection, updateCollection, useCollection } from '@/lib/collection'
import { readPlan, usePlan } from '@/lib/plan'
import { KEYS, get, useHydrated } from '@/lib/store'
import type { StudioPlan, LayoutId, MediaPlacement, PurposeId, SectionTone } from '@/types/domain'

export type Look = ReturnType<typeof lookOf> & { plan: StudioPlan; world: ReturnType<typeof worldFor>; brand?: string; layout?: LayoutId }

/** A site's own look, for its page and for the parts it shows on the shelves. */
export function siteLook(ref: SiteRef, plan: StudioPlan, layout?: LayoutId): Look {
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
    const plan: StudioPlan = spec ? specToPlan(spec) : { pages: [], purpose: kind }
    looks.set(key, spec ? siteLook(site, plan) : { ...lookOf(plan), plan, world: worldFor(kind) })
  }
  return looks.get(key)!
}

/** The standard theme: a neutral look in OpusKit's own colours, for effects shown as pure components (the Library's
 *  Moments and Touches) — the same piece every site gets, before any site dresses it. */
let standard: Look | undefined
export function standardLook(): Look {
  // One accent only — OpusKit's orange — where a piece reads a colour chapter (the hopping arrow's box).
  standard ??= { ...sampleLook({ kind: 'effect', id: 'magnetic' }), colors: OPUSKIT_DARK, chapters: [OPUSKIT_DARK.accent, OPUSKIT_DARK.accent, OPUSKIT_DARK.accent] }
  return standard
}

/** The standard theme dressed in the world of the site that shows a design best — a food menu with dishes, a programme
 *  with screenings — for a section drawn pure. */
export function pureLook(item: CollectionItem): Look {
  const from = 'from' in item ? (item.from as SiteRef | undefined) : undefined
  return { ...standardLook(), world: worldFor(from ? siteSpec(from)?.purpose : undefined) }
}

export const exampleOf = (ref: SiteRef) => (ref.startsWith('example:') ? examples.find((e) => `example:${e.slug}` === ref) : undefined)

/** One item, drawn the way you would get it. Fixed 16:10, so a shelf reads as one grid. */
export function ItemPreview(p: { item: CollectionItem; look: Look; rhythm?: { tone?: SectionTone; media?: MediaPlacement }; sketch?: boolean; /** Drawn pure in a catalog card: closer, so its words read. */ pure?: boolean }) {
  useGoogleFonts(p.look.type.googleFamilies)
  // On the look's own ground, so a part shorter than the frame doesn't end in a white band.
  return <div className="size-full" style={{ background: p.look.colors.background }}><Drawn {...p} /></div>
}
function Drawn({ item, look, rhythm, sketch, pure }: { item: CollectionItem; look: Look; rhythm?: { tone?: SectionTone; media?: MediaPlacement }; sketch?: boolean; pure?: boolean }) {
  // A part drawn pure is laid out 900 wide, not 1280, so a card shows it larger; a footer sits at the card's foot.
  const close = pure ? 900 : undefined
  const pv = { colors: look.colors, type: look.type, shape: look.shape, chapters: look.chapters, world: look.world, brand: look.brand, layout: look.layout, sketch }
  switch (item.kind) {
    case 'site': return <SiteThumb site={item.site} />
    case 'like': return <TraitPicture what={item.what} site={item.site} />
    case 'section': return <SectionPreview id={item.id} variant={item.variant} {...pv} {...rhythm} width={close} className="aspect-[16/10]" />
    case 'footer': return <SectionPreview id="footer" footer={item.id} {...pv} width={close} anchor={pure ? 'bottom' : undefined} className="aspect-[16/10]" />
    case 'hero': return <div className={`aspect-[16/10] overflow-hidden ${sketch ? 'sketch' : ''}`}><HeroPreview plan={look.plan} id={item.id} /></div>
    case 'menu': return <OptionDemo id={`nav:${item.id}`} colors={look.colors} type={look.type} shape={look.shape} />
    case 'effect':
      // Links are too small on their own: they play on a drawn footer.
      if (behaviours.links.ids.includes(item.id)) return <div className="aspect-[16/10] overflow-hidden"><LinkDemo piece={item.id as LinkPiece} colors={look.colors} type={look.type} shape={look.shape} brand={look.brand} /></div>
      return <ScaledFrame width={420} className="aspect-[16/10]"><PieceDemo id={item.id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame>
  }
}

/** A built site shows its real homepage, and its recording over it — on hover, or (`auto`) playing whenever it is on
 *  screen; still with reduced motion. A recipe is drawn by the engine. */
export function SiteThumb({ site, auto }: { site: SiteRef; auto?: boolean }) {
  const e = exampleOf(site)
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const recipe = useMemo(() => (e ? undefined : composeRecipe(siteSpec(site)!)), [e, site])
  useEffect(() => {
    const v = video.current
    if (!auto || !v || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [auto])
  if (!e) return <SitePreview {...previewFromRecipe(recipe!)} />
  const play = () => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.play().catch(() => {}) }
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-paper-2" {...(auto ? {} : { onMouseEnter: play, onMouseLeave: () => video.current?.pause() })}>
      <Image src={`/examples/${e.slug}.jpg`} alt="" width={800} height={500} className="size-full object-cover object-top" />
      {/* Shown once it has frames, so the screenshot never blinks to black. */}
      {/* The whole landing page where it was recorded (the user, 2026-10-10: full, not the short loop), else the loop. */}
      {(e.fullClip ?? e.clip) && <video ref={video} src={e.fullClip ?? e.clip} muted loop playsInline preload={auto ? 'metadata' : 'none'} aria-hidden onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${auto ? (playing ? 'opacity-100' : 'opacity-0') : 'opacity-0 group-hover:opacity-100'}`} />}
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
    // Taking one of a set a site can only have one of (a link hover…) put back the one taken before: say which.
    const gone = before.items.filter((x) => !after.items.some((y) => itemKey(y) === itemKey(x)))
    if (gone.length) return toast(`${itemName(item)} replaced ${gone.map(itemName).join(', ')}`, { description: 'A site has only one of these.', action: { label: 'Undo', onClick: () => updateCollection(() => before) } })
    const had = new Set(notes(before).map((n) => n.text))
    const note = notes(after).find((n) => !had.has(n.text) && n.keys.includes(itemKey(item)))
    if (note) toast(note.text, { action: { label: 'Open', onClick: openCollection } })
    // The first thing in an empty Collection: say once where it went and what comes next.
    else if (!before.items.length) toast('Added to your Collection', { description: 'Keep browsing — Build my site waits at the top, beside your Collection.', action: { label: 'Open', onClick: openCollection } })
  }
  return { on, flip }
}

export function CollectButton({ item, label, quiet, className = '' }: { item: CollectionItem; label?: string; quiet?: boolean; className?: string }) {
  const { on, flip } = useCollect(item)
  // Quiet: a small round + over a picture, nothing more; ticked once collected.
  if (quiet) return (
    <button type="button" aria-pressed={on} title={on ? 'Collected — click to remove' : 'Collect'} onClick={(e) => { e.preventDefault(); e.stopPropagation(); flip() }}
      className={`grid size-8 shrink-0 place-items-center rounded-full shadow-sm backdrop-blur-sm transition-colors ${on ? 'bg-ink text-paper' : 'bg-white/90 text-ink hover:bg-white'} ${className}`}>
      {on ? <Check size={15} aria-hidden /> : <Plus size={15} aria-hidden />}
      <span className="sr-only">{on ? `Remove ${itemName(item)} from your Collection` : `Collect ${itemName(item)}`}</span>
    </button>
  )
  return (
    <button type="button" aria-pressed={on} onClick={(e) => { e.preventDefault(); e.stopPropagation(); flip() }}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border text-sm font-medium transition-colors ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'} ${label ? 'h-9 px-3.5' : 'size-9 justify-center'} ${className}`}>
      {on ? <Check size={15} aria-hidden /> : <Plus size={15} aria-hidden />}
      {label ? <span>{on ? 'Collected' : label}</span> : <span className="sr-only">{on ? `Remove ${itemName(item)} from your Collection` : `Collect ${itemName(item)}`}</span>}
    </button>
  )
}

/** Collection → building (decision 35): first the owner's own words (You), then Make it yours, started from what they liked. */
export function useToBuild() {
  const router = useRouter()
  return () => {
    toast.dismiss() // browsing's notes stay behind with browsing
    // Always the first step, filled with what is already known — never skipped to Direction because a name and a kind
    // are remembered: after clearing the Collection the user landed on Direction without seeing You (2026-10-10).
    router.push('/studio/you')
  }
}
/** Whether a site is being built from the Collection already (then the way on is "Continue building"). */
export const isBuilding = (plan: StudioPlan) => plan.via === 'studio' && plan.pages.length > 0
/** "Build my site" the first time, "Continue building" after. */
export function useBuildLabel() {
  return isBuilding(usePlan()) ? 'Continue building' : 'Build my site'
}

/** Next to the Collection in the header, once something is in it: Build my site (or Continue building). Hidden on
 *  the building steps themselves, which have their own Next. */
export function BuildButton() {
  const toBuild = useToBuild(), label = useBuildLabel(), path = usePathname()
  if (path.startsWith('/studio/')) return null
  return <button type="button" onClick={toBuild} className="btn btn-ink btn-sm"><span className="max-sm:hidden">{label}</span><span className="sm:hidden">Build</span><ArrowRight size={14} aria-hidden /></button>
}

const OPEN = 'opuskit:open-collection'
export const openCollection = () => window.dispatchEvent(new Event(OPEN))

const GROUPS: [string, (i: CollectionItem) => boolean][] = [
  ['Whole looks', (i) => i.kind === 'site'],
  ['Qualities', (i) => i.kind === 'like'],
  ['Parts', (i) => i.kind === 'section' || i.kind === 'hero' || i.kind === 'menu' || i.kind === 'footer'],
  ['Effects', (i) => i.kind === 'effect'],
]

/** The Collection — the cart (2026-10-05): in the site's header on every page, the last things collected and their
 *  count (a small bump when something goes in). Opened: everything in it, the quiet notes, remove — and the one way
 *  from browsing to building, **Build my site**, which starts You → Direction → Recipe. */
export function CollectionSheet() {
  const c = useCollection()
  const toBuild = useToBuild(), buildLabel = useBuildLabel()
  const n = c.items.length
  const [open, setOpen] = useState(false)
  const prev = useRef(n)
  const [bump, setBump] = useState(0)
  useEffect(() => { if (n > prev.current) setBump((b) => b + 1); prev.current = n }, [n])
  useEffect(() => { const f = () => setOpen(true); window.addEventListener(OPEN, f); return () => window.removeEventListener(OPEN, f) }, [])
  const all = notes(c)
  const remove = (i: CollectionItem) => { const before = readCollection(); updateCollection((x) => removeItem(x, itemKey(i))); toast(`Removed: ${itemName(i)}`, { action: { label: 'Undo', onClick: () => updateCollection(() => before) } }) }
  const clear = () => { const before = readCollection(); updateCollection((x) => ({ ...x, items: [] })); toast('Collection cleared', { action: { label: 'Undo', onClick: () => updateCollection(() => before) } }) }
  // What Build will make, in one line.
  const summary = `${c.name?.trim() || 'Your site'}${c.purpose ? ` · ${kindName(c.purpose)}` : ''} — made from ${n} ${n === 1 ? 'thing' : 'things'} you like`
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* The pictures sit beside the button, not inside it: a drawn part holds buttons of its own, which can't nest. */}
      {/* The whole button opens it: the pictures let clicks through to it (they are drawn parts with buttons of their own). */}
      <span onClick={() => setOpen(true)} className="flex h-9 shrink-0 cursor-pointer items-center rounded-[3px] border border-line bg-white text-sm hover:border-ink">
        {n > 0 && (
          <span className="pointer-events-none hidden -space-x-2.5 pl-1.5 sm:flex" aria-hidden inert>
            {c.items.slice(-3).map((i) => <span key={itemKey(i)} className="block w-9 overflow-hidden rounded-[5px] border-2 border-white bg-paper-2"><span className="pointer-events-none block aspect-[16/10] overflow-hidden"><TakenPicture item={i} /></span></span>)}
          </span>
        )}
        <SheetTrigger className="flex h-full items-center gap-1.5 rounded-[3px] pl-1 pr-2 sm:gap-2 sm:pl-2 sm:pr-3" aria-label={`Your Collection, ${n} ${n === 1 ? 'thing' : 'things'}`}>
          <Layers size={16} className={`ml-1 text-muted ${n ? 'sm:hidden' : ''}`} aria-hidden />
          <span className="hidden font-medium sm:inline">Collection</span>
          <span key={bump} className={`grid h-5 min-w-5 place-items-center rounded-[3px] px-1 text-[11px] font-medium tabular-nums ${n ? 'bg-pencil text-paper' : 'bg-paper-2 text-muted'} ${bump ? 'bump' : ''}`}>{n}</span>
        </SheetTrigger>
      </span>
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
            <p className="mt-1 text-sm text-muted">Tap + on a site you like — its whole look, or just its colours, lettering or first screen.</p>
          </div>
        ) : (
          <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6">
            {GROUPS.map(([name, test]) => {
              const items = c.items.filter(test)
              if (!items.length) return null
              const keys = new Set(items.map(itemKey))
              return (
                <section key={name} aria-label={name}>
                  <p className="flex items-baseline justify-between text-sm text-muted">{name}<span className="tabular-nums">{items.length}</span></p>
                  {all.filter((x) => x.keys.some((k) => keys.has(k))).map((x) => <p key={x.text} className="mt-2 rounded-md bg-paper-2 px-3 py-2 text-xs text-ink-2">{x.text}</p>)}
                  <ul className="mt-2 grid grid-cols-2 gap-3">
                    {items.map((i) => (
                      <li key={itemKey(i)} className="group relative">
                        <div className="overflow-hidden rounded-lg border border-line bg-white"><div className="pointer-events-none aspect-[16/10] overflow-hidden"><TakenPicture item={i} /></div></div>
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
            <button type="button" onClick={() => { setOpen(false); toBuild() }} className="btn btn-ink mt-3 h-14 w-full text-base">{buildLabel}<ArrowRight size={18} aria-hidden /></button>
            <ol className="mt-3 flex justify-center gap-4 text-xs text-muted" aria-label="What comes next">
              {['You', 'Direction', 'Recipe'].map((x, k) => <li key={x} className="flex items-center gap-1.5"><span className="grid size-4 place-items-center rounded-full border border-line text-[10px] tabular-nums">{k + 1}</span>{x}</li>)}
            </ol>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

/** Making a site, in three steps (decisions 35, 37). Each step is a ruled cell like the header's; the way walked so
 *  far is underlined in the signal colour. Any step can be opened at any time, except one there is nothing for yet:
 *  Direction wants a name and a kind of site, the Recipe a recipe. The Library before them is browsing, not a step. */
const STEPS = [['You', '/studio/you'], ['Direction', '/studio/direction'], ['Recipe', '']] as const
export type Step = (typeof STEPS)[number][0]
export function Steps({ at, onRecipe }: { at: Step; onRecipe?: () => void }) {
  const n = STEPS.findIndex(([s]) => s === at)
  const c = useCollection(), plan = usePlan(), ready = useHydrated()
  // A plan being built with an empty You (opened before decision 44): You takes its words, the plan is kept.
  useEffect(() => { if (ready && !c.name?.trim() && plan.via === 'studio' && plan.name?.trim() && plan.pages.length) adoptPlan(plan, plan.name) }, [ready, c.name, plan])
  const recipe = plan.via === 'studio' && plan.fromId ? `/result/${plan.fromId}` : undefined
  const open: Record<Step, string | undefined> = {
    You: '/studio/you',
    Direction: c.name?.trim() && (c.purpose ?? purposeFrom(c.about)) ? '/studio/direction' : undefined,
    Recipe: recipe,
  }
  const why: Record<Step, string> = { You: '', Direction: 'Give your site a name and say what it is first', Recipe: 'Pick a direction first — then your recipe is here' }
  return (
    <ol className="flex h-full min-w-0 border-l border-line" aria-label="Steps">
      {STEPS.map(([s], i) => {
        const here = i === n, walked = i <= n, href = ready ? open[s] : undefined
        const body = (
          <>
            <span className={`label tabular-nums ${here ? 'text-pencil' : 'text-muted'}`}>0{i + 1}</span>
            <span className={`hidden text-sm sm:inline ${here ? 'text-ink' : href ? 'text-ink-2' : 'text-muted'}`}>{s}</span>
            {/* The tick's place is kept on every step, so no cell changes size from step to step. */}
            <Check size={13} strokeWidth={2.2} className={`ml-auto hidden text-muted sm:block ${i < n && href ? '' : 'invisible'}`} aria-hidden />
          </>
        )
        const cell = `relative flex h-full w-12 items-center justify-center gap-2.5 transition-colors sm:w-44 sm:justify-start sm:px-5 ${walked ? 'after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-pencil' : ''}`
        return (
          <li key={s} className="h-full border-r border-line">
            {here ? <span aria-current="step" className={`${cell} bg-white`}>{body}</span>
              : !href ? <span aria-disabled title={why[s]} className={`${cell} cursor-not-allowed opacity-60`}>{body}</span>
              : s === 'Recipe' && onRecipe ? <button type="button" onClick={onRecipe} className={`${cell} hover:bg-paper-2`}>{body}</button>
              : <Link href={href} className={`${cell} hover:bg-paper-2`}>{body}</Link>}
          </li>
        )
      })}
    </ol>
  )
}

/** The bar under the site's header while building: the steps, and Next. `onRecipe` saves the plan as the recipe first,
 *  so the Recipe step always opens what was just picked. */
export const FLOW_BAR = 'h-14' // 56px with its line (it sticks at 56, over the header's line): it ends at 112. A sticky thing below it with a top border sits at top-[111px], so the two lines are one; without one, at top-[112px]
export function FlowBar({ at, next, onRecipe }: { at: Step; next?: ReactNode; onRecipe?: () => void }) {
  return (
    <div className={`sticky top-14 z-30 border-b border-line bg-paper/95 backdrop-blur-sm ${FLOW_BAR}`}>
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-3 pr-5 md:pr-8">
        <Steps at={at} onRecipe={onRecipe} />
        <div className="flex shrink-0 items-center gap-2">{next}</div>
      </div>
    </div>
  )
}

/** The other way in: nothing collected — start from your own words; the start comes from your kind of site. */
export function StartBlank({ className = '' }: { className?: string }) {
  return <Link href="/studio/you" className={`inline-flex items-center gap-1.5 text-sm text-ink-2 underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink ${className}`}>Or start with your own words</Link>
}

// ─── What you like in a site (decision 35) ─────────────────────────────────

/** One quality of a site, drawn: its colours as swatches, its lettering in itself, its first screen and movement named. */
export function TraitPicture({ what, site }: { what: Trait | 'look'; site: SiteRef }) {
  const t = siteTraits(site)!
  const pal = palettes[t.palette].colors, type = typography[t.typography]
  useGoogleFonts(what === 'lettering' ? type.googleFamilies : [])
  if (what === 'look') return <SiteThumb site={site} />
  if (what === 'colours') return <span className="grid size-full grid-cols-[2fr_1fr_1fr_1fr]" aria-hidden>{[pal.background, pal.text, pal.accent, pal.surface].map((x, i) => <span key={i} style={{ background: x }} />)}</span>
  if (what === 'lettering') return (
    <span className="grid size-full place-content-center px-3 text-center" style={{ background: pal.background, color: pal.text }} aria-hidden>
      <span className="block text-[2.4rem] leading-none" style={{ fontFamily: `'${type.display.family}'`, fontWeight: type.display.weight, fontStretch: type.display.stretch, fontStyle: type.display.italic ? 'italic' : undefined }}>Aa</span>
      <span className="mt-1.5 block truncate text-[11px] opacity-70">{type.display.family}</span>
    </span>
  )
  const e = exampleOf(site)
  if (what === 'opening') return (
    <span className="relative block size-full overflow-hidden" aria-hidden>
      {e ? <Image src={`/examples/${e.slug}.jpg`} alt="" width={400} height={250} className="size-full object-cover object-top" /> : <SiteThumb site={site} />}
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2.5 pb-1.5 pt-6 text-[11px] font-medium text-white">{heroName(t.hero)}</span>
    </span>
  )
  const level = ['still', 'subtle', 'dynamic', 'immersive'].indexOf(t.motion)
  return (
    <span className="grid size-full place-content-center gap-2 px-3" style={{ background: pal.background, color: pal.text }} aria-hidden>
      <span className="flex items-end justify-center gap-1">{[0, 1, 2, 3].map((k) => <span key={k} className="w-2 rounded-[1px]" style={{ height: 8 + k * 7, background: k <= level ? pal.accent : `color-mix(in oklab, ${pal.text} 15%, transparent)` }} />)}</span>
      <span className="text-center text-[11px] font-medium">{motionLevels[t.motion].name}</span>
    </span>
  )
}

// ─── What was taken, drawn the same everywhere (decision 35) ────────────────

// A site's own look and recipe, worked out once: a part taken from it is drawn as it is there.
const sites = new Map<SiteRef, { look: Look; recipe: ReturnType<typeof composeRecipe> }>()
function siteData(ref: SiteRef) {
  if (!sites.has(ref)) { const spec = siteSpec(ref)!, recipe = composeRecipe(spec); sites.set(ref, { look: siteLook(ref, specToPlan(spec), recipe.layoutSystem.id), recipe }) }
  return sites.get(ref)!
}

/** The recording of the very thing taken, on the site it was taken from — if that site was recorded there. */
function clipOf(i: CollectionItem): string | undefined {
  const ref = i.kind === 'site' || i.kind === 'like' ? i.site : i.from, e = ref && exampleOf(ref)
  if (!e) return undefined
  switch (i.kind) {
    case 'like': return i.what === 'opening' ? e.sectionClips?.hero ?? e.clip : undefined
    case 'hero': return e.sectionClips?.hero ?? e.clip
    case 'menu': return e.sectionClips?.navbar
    case 'footer': return e.sectionClips?.footer
    case 'section': return e.sectionClips?.[i.id]
    case 'effect': return e.pieceClips?.[i.id]
    default: return undefined
  }
}

/** One taken thing, drawn as it was taken: the site's recording of it where there is one, else drawn in that site's own
 *  look (its colours, lettering and the part's place on its page). The same picture in the take dialog, the Collection
 *  and the header, so what you took is what you see. */
/** A still of the very part, on the site it came from (`sectionStills`) — the site itself where there is no clip of it. */
function stillOf(i: CollectionItem): string | undefined {
  const ref = i.kind === 'like' ? i.site : i.kind === 'site' ? undefined : i.from, e = ref && exampleOf(ref)
  if (!e?.sectionStills) return undefined
  switch (i.kind) {
    case 'like': return i.what === 'opening' ? e.sectionStills.hero : undefined
    case 'menu': return e.sectionStills.navbar
    case 'footer': return e.sectionStills.footer
    case 'section': return e.sectionStills[i.id]
    default: return undefined
  }
}

export function TakenPicture({ item, auto }: { item: CollectionItem; auto?: boolean }) {
  if (item.kind === 'site') return <SiteThumb site={item.site} auto={auto} />
  const clip = clipOf(item)
  if (clip) return <Clip src={clip} />
  const still = stillOf(item)
  // eslint-disable-next-line @next/next/no-img-element -- a captured still of the live site, already sized
  if (still) return <img src={still} alt="" loading="lazy" className="pointer-events-none size-full object-cover object-top" />
  if (item.kind === 'like') return <TraitPicture what={item.what} site={item.site} />
  if (!item.from) return <div className="pointer-events-none size-full"><ItemPreview item={item} look={sampleLook(item)} /></div>
  const { look, recipe } = siteData(item.from as SiteRef)
  const at = item.kind === 'section' ? recipe.pages.flatMap((p) => p.sections).find((x) => x.id === item.id && (x.variant?.id ?? undefined) === item.variant) : undefined
  return <div className="pointer-events-none size-full"><ItemPreview item={item} look={look} rhythm={at ? { tone: at.tone, media: at.media } : undefined} /></div>
}

/** A few seconds of the real site, muted and looping (its first frame, still, under reduced motion). */
export function Clip({ src }: { src: string }) {
  const [still, setStill] = useState(true)
  useEffect(() => setStill(matchMedia('(prefers-reduced-motion: reduce)').matches), [])
  return <video src={`${src}#t=0.1`} muted loop playsInline autoPlay={!still} preload="metadata" aria-hidden className="pointer-events-none size-full object-cover" />
}
