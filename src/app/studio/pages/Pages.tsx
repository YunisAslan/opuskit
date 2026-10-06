'use client'
// Pages (docs/plan-library.md): which pages the site has — one collected site's own, else the kind of site's — plus
// suggestions (in Add a page) and your own. Each page is a blend of the collected sites, or follows one ("Made from").
// In the middle, the picked page between its locked menu and footer: drag parts to reorder (or the arrows), remove,
// and on each part what belongs to it — an effect, your photos, your film. Pick a part and the right column offers its
// other designs. Below that, everything collected — parts, first screens, effects, menus and footers, each site's parts
// — and last All parts, for anything no collected site has — dragged onto the page or added with +; whatever lands scrolls into view and glows. Thumbnails keep their own
// colours (only Brand's example takes yours).
import { ArrowDown, ArrowLeftRight, ArrowRight, ArrowUp, Check, ChevronRight, Eye, EyeOff, Film, GripVertical, ImagePlus, Info, Lock, Plus, Search, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { toast } from 'sonner'
import { LazyMount } from '@/components/LazyMount'
import { Chip } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TileClip } from '@/components/RealSiteClip'
import { closestPiece } from '@/features/kit/closest'
import { heroName } from '@/app/kit/HeroPreview'
import { ItemPreview, exampleOf, sampleLook, siteLook, type Look } from '@/app/library/parts'
import { EFFECTS, footerStyles, navStyles, pageTypes, sections } from '@/data/patterns'
import { sectionVariants, variantFor } from '@/data/section-variants'
import { behaviours, isMoment, pieceSlots, pieces } from '@/data/pieces'
import { directions, purposes } from '@/data/taxonomy'
import { addPage, addSection, addSuggested, behaviourPick, effectOn, heroOf, isStandardPage, jobOf, missingPages, movePage, moveSection, pageGroups, piecesFor, placeSection, planToSpec, removePage, removeSection, renamePage, replaceSection, sectionGroups, setBehaviour, setPartHero, setSectionVariant, setStyle, specToPlan, toggleChrome, togglePiece, toggleSitePiece } from '@/features/kit/plan'
import { blendPage, itemKey, itemName, lookChoices, pageLike, placement, siteName, sitePageParts, siteSpec, sitesWithPage, startSite, type Collection, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { MEDIA_SECTIONS, PHOTO_SECTIONS, composeRecipe } from '@/features/recipes/engine'
import { planFromStudio, updateCollection, useCollection } from '@/lib/collection'
import { deleteFile, storeUpload } from '@/lib/files'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { BehaviourId, ChromeId, FooterStyleId, HeroId, KitPlan, NavStyleId, PageTypeId, PieceId, PlanPage, PlanSection, PurposeId, SectionId } from '@/types/domain'
import { NeedsStudio, StepFrame, usePlanLook, useToRecipe } from '../shared'

const FILM = new Set(EFFECTS.filter((e) => e.lead === 'video').map((e) => e.hero))

// Every change says what happened and can be undone.
const change = (message: string, f: (p: KitPlan) => KitPlan) => { const before = readPlan(); writePlan(f(before)); toast(message, { action: { label: 'Undo', onClick: () => writePlan(before) } }) }

/** The browser's own drag picture copies whatever overlaps the dragged item inside a scrolling column (its
 *  neighbours above and below). A clean copy of just the item, drawn off screen for a moment, is used instead. */
function ghost(e: DragEvent) {
  const el = e.currentTarget as HTMLElement, r = el.getBoundingClientRect()
  const copy = el.cloneNode(true) as HTMLElement
  Object.assign(copy.style, { position: 'fixed', top: '-10000px', left: '0', width: `${r.width}px`, background: 'white', borderRadius: '10px', boxShadow: '0 12px 32px rgb(0 0 0 / 0.18)', pointerEvents: 'none' })
  document.body.appendChild(copy)
  e.dataTransfer.setDragImage(copy, e.clientX - r.left, e.clientY - r.top)
  requestAnimationFrame(() => copy.remove())
}

/** What is being dragged: a part of the page (to move it), or something from the right (to add it). */
type Drag = { t: 'move'; key: string } | { t: 'part'; id: SectionId; variant?: string; from?: SiteRef } | { t: 'hero'; id: HeroId } | { t: 'effect'; id: PieceId }
const DRAG = 'application/x-opuskit'

// Thumbnails keep their own colours (only Brand's example takes yours): a part from a site in that site's look.
const siteLooks = new Map<SiteRef, Look>()
const lookOfSite = (r: SiteRef) => { if (!siteLooks.has(r)) siteLooks.set(r, siteLook(r, specToPlan(siteSpec(r)!))); return siteLooks.get(r)! }

export function Pages() {
  const ready = useHydrated()
  const plan = usePlan()
  const c = useCollection()
  const [pageId, setPageId] = useState<string>()
  const [own, setOwn] = useState('')
  const [selKey, setSelKey] = useState<string>()
  const [drag, setDrag] = useState<Drag | null>(null)
  const [dropAt, setDropAt] = useState<number | null>(null)
  const [fxOver, setFxOver] = useState<string>()
  const [flash, setFlash] = useState<string>()
  const { recipe, spec } = usePlanLook(plan)
  // The design a part will be built with: the one picked, else the one the engine picks for this look — so what is
  // shown here is what the site gets.
  const fam = directions[spec.direction].families[0]
  const designOf = (s: PlanSection) => (s.id === 'hero' ? undefined : s.variant ?? variantFor(s.id, fam))
  const toRecipe = useToRecipe()
  // A part just added, moved or changed: the page scrolls to it and it glows, so nothing lands out of sight.
  useEffect(() => {
    if (!flash) return
    requestAnimationFrame(() => document.querySelector(`[data-part="${flash}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
    const t = setTimeout(() => setFlash(undefined), 1800)
    return () => clearTimeout(t)
  }, [flash])
  if (!ready) return null
  if (plan.via !== 'studio' || !plan.pages.length) return <NeedsStudio />

  const page = plan.pages.find((p) => p.id === pageId) ?? plan.pages[0]
  const sel = page.sections.find((x) => x.key === selKey)
  // The menu or the footer picked (their rows are picked like parts; the panel then offers the other designs).
  const chromeSel = selKey === 'chrome:nav' ? 'nav' : selKey === 'chrome:footer' ? 'footer' : undefined
  const pickChrome = (k: 'nav' | 'footer') => setSelKey(selKey === `chrome:${k}` ? undefined : `chrome:${k}`)
  // A site-wide behaviour picked (links, headlines…): the panel then offers its options, each moving.
  const siteSel = selKey?.startsWith('site:') ? (selKey.slice(5) as BehaviourId) : undefined
  const sites = lookChoices(c), first = startSite(c)
  const base = first ? lookOfSite(first) : sampleLook({ kind: 'menu', id: recipe.chrome.nav.id }, plan.purpose)
  const partLook = (s: PlanSection): Look => (s.from ? lookOfSite(s.from as SiteRef) : s.id === 'hero' ? base : sampleLook({ kind: 'section', id: s.id }, plan.purpose))
  const collected = new Set(c.items.flatMap((i) => (i.kind === 'section' ? [i.id] : i.kind === 'hero' ? ['hero'] : [])))
  const add = (type: PageTypeId, label?: string) => { let id = ''; updatePlan((p) => { const r = addPage(p, type, label); id = r.id; return r.plan }); setPageId(id) }
  const where = placement(plan, c)
  const rebuild = (patch: { purpose?: PurposeId }) => { updateCollection((x) => ({ ...x, ...patch })); planFromStudio() }
  const likes = sitesWithPage(c, page.type), liked = c.like?.[page.type]
  const follow = (r?: SiteRef) => {
    updateCollection((x) => { const like = { ...x.like }; if (r) like[page.type] = r; else delete like[page.type]; return { ...x, like } })
    change(r ? `${page.label} now follows ${siteName(r)}` : `${page.label} is a mix again`, (p) => (r ? pageLike(p, page.id, r) : blendPage(p, page.id, sites)))
  }

  // ─── putting things on the page: by drop (at a spot) or by + (after the picked part, else before the closing parts) ───
  const keysOf = (p: KitPlan) => new Set(p.pages.find((x) => x.id === page.id)!.sections.map((s) => s.key))
  const placeNew = (d: Exclude<Drag, { t: 'move' } | { t: 'effect' }>, at?: number) => {
    const pos = at ?? (sel ? page.sections.indexOf(sel) + 1 : undefined)
    let k: string | undefined
    const name = d.t === 'hero' ? `First screen — ${heroName(d.id)}` : sections[d.id].name
    change(`${name} added to ${page.label}`, (p) => {
      const before = keysOf(p)
      let next = d.t === 'hero' ? addSection(p, page.id, 'hero', pos ?? 0) : pos !== undefined ? addSection(p, page.id, d.id, pos) : addSuggested(p, page.id, d.id)
      k = [...keysOf(next)].find((x) => !before.has(x))
      if (!k) return next
      if (d.t === 'hero') return setPartHero(next, page.id, k, d.id)
      if (d.variant) next = setSectionVariant(next, page.id, k, d.variant)
      if (d.from) next = { ...next, pages: next.pages.map((pg) => (pg.id !== page.id ? pg : { ...pg, sections: pg.sections.map((s) => (s.key === k ? { ...s, from: d.from } : s)) })) }
      return next
    })
    if (k) setFlash(k)
  }
  const putEffect = (id: PieceId, onKey?: string) => {
    const target = page.sections.find((s) => s.key === onKey) ?? (sel && pieces[id].sections.includes(sel.id) ? sel : page.sections.find((s) => pieces[id].sections.includes(s.id)))
    if (!target || !pieces[id].sections.includes(target.id)) return toast(`${pieces[id].name} doesn’t fit ${target ? jobOf(target.id).toLowerCase() : 'any part on this page'}`, { description: `It goes on: ${[...new Set(pieces[id].sections.map((x) => (x === 'hero' ? 'the first screen' : jobOf(x).toLowerCase())))].slice(0, 4).join(', ')}.` })
    if (target.pieces.includes(id)) return setFlash(target.key)
    const swap = target.pieces.find((x) => pieces[x].slot === pieces[id].slot)
    change(`${pieces[id].name} on ${target.id === 'hero' ? 'the first screen' : jobOf(target.id).toLowerCase()}`, (p) => togglePiece(swap ? togglePiece(p, page.id, target.key, swap) : p, page.id, target.key, id))
    setFlash(target.key)
  }
  const swapTo = (id: SectionId, variant?: string) => {
    if (!sel) return
    change(`${jobOf(sel.id)} now ${variant ? sectionVariants[id]?.options.find((o) => o.id === variant)?.name.toLowerCase() : sections[id].name}`, (p) => {
      const n = replaceSection(p, page.id, sel.key, id)
      return setSectionVariant(n, page.id, sel.key, variant)
    })
    setFlash(sel.key)
  }

  // ─── drag and drop ───
  const start = (e: DragEvent, d: Drag) => { e.dataTransfer.setData(DRAG, JSON.stringify(d)); e.dataTransfer.effectAllowed = d.t === 'move' ? 'move' : 'copy'; ghost(e); setDrag(d) }
  const end = () => { setDrag(null); setDropAt(null); setFxOver(undefined) }
  const over = (e: DragEvent, i: number, key: string) => {
    if (!drag) return
    e.preventDefault()
    if (drag.t === 'effect') { setFxOver(key); return }
    const r = e.currentTarget.getBoundingClientRect()
    setDropAt(e.clientY < r.top + r.height / 2 ? i : i + 1)
  }
  const drop = (e: DragEvent, onKey?: string) => {
    e.preventDefault()
    const d = drag ?? (() => { try { return JSON.parse(e.dataTransfer.getData(DRAG)) as Drag } catch { return null } })()
    const at = dropAt ?? page.sections.length
    end()
    if (!d) return
    if (d.t === 'move') { updatePlan((p) => placeSection(p, page.id, d.key, at)); setFlash(d.key); return }
    if (d.t === 'effect') return putEffect(d.id, onKey)
    if (d.t === 'hero' && onKey && page.sections.find((s) => s.key === onKey)?.id === 'hero') { change(`First screen — ${heroName(d.id)}`, (p) => setPartHero(p, page.id, onKey, d.id)); setFlash(onKey); return }
    placeNew(d, at)
  }
  const line = <li aria-hidden className="h-0.5 rounded-full bg-pencil" />

  const title = (
    <div>
      <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Pages</h1>
      {!plan.purpose && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-sm text-muted">What are you making?</span>{(Object.keys(purposes) as PurposeId[]).filter((k) => k !== 'other').map((k) => <Chip key={k} active={false} onClick={() => rebuild({ purpose: k })}>{purposes[k].name}</Chip>)}
        </div>
      )}
    </div>
  )

  return (
    <StepFrame at="Pages" title={title} next={<button type="button" onClick={toRecipe} className="btn btn-ink btn-sm"><span>Next<span className="hidden sm:inline">: Recipe</span></span><ArrowRight size={14} aria-hidden /></button>}>
      <div className="mt-8 grid gap-8 lg:grid-cols-[15rem_1fr] lg:items-start xl:grid-cols-[15rem_1fr_20rem]">
        <div className="space-y-4 lg:sticky lg:top-36">
          <ol className="space-y-1" aria-label="Your pages">
            {plan.pages.map((p, i) => (
              <li key={p.id} className={`group relative flex items-center rounded-lg ${p.id === page.id ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}>
                <button type="button" onClick={() => { setPageId(p.id); setSelKey(undefined) }} aria-current={p.id === page.id ? 'page' : undefined} className="flex min-w-0 flex-1 items-center justify-between gap-2 px-3 py-2.5 text-left">
                  <span className="truncate font-medium">{p.label}</span>
                  <span className="shrink-0 text-xs tabular-nums opacity-60 md:group-hover:opacity-0 md:group-focus-within:opacity-0" title={`${p.sections.length} parts`}>{p.sections.length || ''}</span>
                </button>
                {/* The page's controls only on hover, over the row's end (where the count of its parts sits otherwise). */}
                <span className={`flex shrink-0 pr-1 md:absolute md:inset-y-0 md:right-0 md:items-center md:rounded-r-lg md:pl-6 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 ${p.id === page.id ? 'md:bg-gradient-to-l md:from-ink md:from-60%' : 'md:bg-gradient-to-l md:from-paper-2 md:from-60%'}`}>
                  <Icon label={`Move ${p.label} up`} disabled={i === 0} onClick={() => updatePlan((x) => movePage(x, p.id, -1))}><ArrowUp size={14} /></Icon>
                  <Icon label={`Move ${p.label} down`} disabled={i === plan.pages.length - 1} onClick={() => updatePlan((x) => movePage(x, p.id, 1))}><ArrowDown size={14} /></Icon>
                  <Icon label={`Remove ${p.label}`} disabled={plan.pages.length === 1} onClick={() => change(`Removed: ${p.label}`, (x) => removePage(x, p.id))}><X size={14} /></Icon>
                </span>
              </li>
            ))}
          </ol>
          <PagePicker onPick={add} suggested={missingPages(plan)} />
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (own.trim()) { add('custom', own.trim().slice(0, 60)); setOwn('') } }}>
            <Input value={own} onChange={(e) => setOwn(e.target.value)} placeholder="Your own page" aria-label="Name of your own page" className="h-10 bg-white" />
            <button type="submit" disabled={!own.trim()} className="btn btn-line btn-sm shrink-0 disabled:opacity-40">Add</button>
          </form>
        </div>

        <section aria-labelledby="page-title" className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="page-title" className="min-w-0 flex-1">
              <input key={page.id} defaultValue={page.label} maxLength={60} aria-label="Page name"
                onBlur={(e) => { const v = e.target.value.trim(); if (v && v !== page.label) updatePlan((p) => renamePage(p, page.id, v)); else e.target.value = page.label }}
                onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') { (e.target as HTMLInputElement).value = page.label; (e.target as HTMLInputElement).blur() } }}
                data-slot="page-name" title="Rename this page"
                className="w-full rounded-md border border-transparent bg-transparent px-1 -ml-1 text-2xl font-medium tracking-tight outline-none hover:border-line focus:border-ink/30 focus:bg-white" />
            </h2>
            {sites.length > 1 && !!likes.length && (
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={`${page.label} is made from`}>
                <span className="mr-1 text-sm text-muted">Made from</span>
                <Chip active={!liked} onClick={() => follow()}>All your sites</Chip>
                {likes.map((r) => <SiteChip key={r} site={r} active={liked === r} onClick={() => follow(r)} />)}
              </div>
            )}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Info size={13} aria-hidden />Each part is shown in its source site’s colours — on your site they all take your Brand colours.</p>
          <div className="mt-3"><ChromeRow c="navbar" page={page} picked={chromeSel === 'nav'} onPick={() => pickChrome('nav')} styleName={recipe.chrome.nav.name} preview={<ItemPreview item={{ kind: 'menu', id: recipe.chrome.nav.id }} look={base} />} /></div>
          {isStandardPage(page.type) && !page.sections.length && !drag
            ? <p className="mt-2 rounded-lg bg-paper-2 px-4 py-3 text-ink-2">Written for you — a {pageTypes[page.type].name.toLowerCase()} page needs no parts.</p>
            : (
              <ol className="mt-2 min-h-16 space-y-2" aria-label={`Parts of ${page.label}`} onDragOver={(e) => { if (drag && drag.t !== 'effect') { e.preventDefault(); if (!page.sections.length) setDropAt(0) } }} onDrop={(e) => drop(e)} onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) { setDropAt(null); setFxOver(undefined) } }}>
                {page.sections.map((s, i) => (
                  <Fragment key={s.key}>
                    {dropAt === i && drag?.t !== 'effect' && line}
                    <li data-part={s.key} draggable onDragStart={(e) => start(e, { t: 'move', key: s.key })} onDragEnd={end} onDragOver={(e) => over(e, i, s.key)} onDrop={(e) => { e.stopPropagation(); drop(e, s.key) }}
                      className={`group rounded-lg border bg-white p-2 pr-3 transition-[box-shadow,border-color,opacity] duration-300 ${flash === s.key ? 'border-pencil shadow-[0_0_0_4px_var(--color-pencil-soft)]' : selKey === s.key ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : fxOver === s.key ? 'border-pencil' : 'border-line'} ${drag?.t === 'move' && drag.key === s.key ? 'opacity-40' : ''}`}>
                      <div className="flex items-center gap-3">
                        <GripVertical size={16} className="shrink-0 cursor-grab text-muted/60 active:cursor-grabbing" aria-hidden />
                        <div className="relative flex min-w-0 flex-1 items-center gap-4 text-left">
                          <button type="button" onClick={() => setSelKey(selKey === s.key ? undefined : s.key)} aria-pressed={selKey === s.key} aria-label={`Pick ${s.id === 'hero' ? 'the first screen' : jobOf(s.id).toLowerCase()} to see other designs`} className="absolute inset-0 z-10" />
                          <LazyMount className="pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line sm:w-44">
                            {s.id === 'hero' ? <ItemPreview item={{ kind: 'hero', id: heroOf(plan, s)! }} look={partLook(s)} /> : <ItemPreview item={{ kind: 'section', id: s.id, ...(designOf(s) ? { variant: designOf(s) } : {}) }} look={partLook(s)} />}
                          </LazyMount>
                          <span className="min-w-0 flex-1">
                            <span className="block font-medium leading-snug">{s.id === 'hero' ? heroName(heroOf(plan, s)) : sections[s.id].name}</span>
                            <span className="mt-0.5 block truncate text-sm text-muted">{s.id === 'hero' ? 'First screen' : partSub(s.id, designOf(s))}</span>
                            {s.from ? <span className="mt-1 block text-xs font-medium text-pencil">From {siteName(s.from as SiteRef)}</span> : collected.has(s.id) && <span className="mt-1 block text-xs font-medium text-pencil">From your Collection</span>}
                          </span>
                        </div>
                        <span className="flex shrink-0 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                          <Icon label="Move up" disabled={i === 0} onClick={() => { updatePlan((x) => moveSection(x, page.id, s.key, -1)); setFlash(s.key) }}><ArrowUp size={16} /></Icon>
                          <Icon label="Move down" disabled={i === page.sections.length - 1} onClick={() => { updatePlan((x) => moveSection(x, page.id, s.key, 1)); setFlash(s.key) }}><ArrowDown size={16} /></Icon>
                          <Icon label="Remove" onClick={() => { if (selKey === s.key) setSelKey(undefined); change(`Removed from ${page.label}`, (x) => removeSection(x, page.id, s.key)) }}><X size={16} /></Icon>
                        </span>
                      </div>
                      <PartExtras plan={plan} page={page} part={s} collectedFx={c.items.flatMap((x) => (x.kind === 'effect' ? [x.id] : []))} />
                    </li>
                  </Fragment>
                ))}
                {dropAt === page.sections.length && drag?.t !== 'effect' && line}
                {!page.sections.length && drag && <li className="rounded-lg border border-dashed border-pencil px-4 py-6 text-center text-sm text-pencil">Drop it here</li>}
              </ol>
            )}
          <div className="mt-2"><ChromeRow c="footer" page={page} picked={chromeSel === 'footer'} onPick={() => pickChrome('footer')} styleName={recipe.chrome.footerStyle.name} preview={<ItemPreview item={{ kind: 'footer', id: recipe.chrome.footerStyle.id }} look={base} />} /></div>
          <SiteWide plan={plan} picked={siteSel} onPick={(b) => setSelKey(selKey === `site:${b}` ? undefined : `site:${b}`)} />
          <Link href="/library" className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"><Plus size={14} aria-hidden />Collect more sites in the Library</Link>
        </section>

        <Panel plan={plan} page={page} sel={sel} selDesign={sel && designOf(sel)} chromeSel={chromeSel} siteSel={siteSel} look={base} c={c} sites={sites} placed={where.placed.length}
          onDrag={start} onDragEnd={end} onAdd={placeNew} onEffect={(id) => putEffect(id)} onSwap={swapTo}
          onHero={(id) => { const h = sel?.id === 'hero' ? sel : page.sections.find((s) => s.id === 'hero'); if (h) { change(`First screen — ${heroName(id)}`, (p) => setPartHero(p, page.id, h.key, id)); setFlash(h.key) } else placeNew({ t: 'hero', id }, 0) }}
          onChrome={(k, id) => change(`${k === 'nav' ? 'Menu' : 'Footer'} — ${k === 'nav' ? navStyles[id as NavStyleId].name : footerStyles[id as FooterStyleId].name}`, (p) => setStyle(p, k, id))}
          navId={recipe.chrome.nav.id} footerId={recipe.chrome.footerStyle.id} />
      </div>
    </StepFrame>
  )
}

// Everywhere on Pages a part is titled by its name, with its job (and its design, if it has several) under it.
const partSub = (id: SectionId, variant?: string) => { const v = variant && sectionVariants[id]?.options.find((o) => o.id === variant); return v ? `${jobOf(id)} · ${v.name}` : jobOf(id) }
const designsOf = (id: SectionId) => { const n = sectionVariants[id]?.options.length ?? 0; return n > 1 ? `${n} designs` : '' }

// ─── The right column: what you can put on this page ────────────────────────

/** With a part picked: its other designs and the other parts doing its job (for a first screen, the other first
 *  screens) — tap to swap it in place. Below, everything in your Collection: parts, first screens, effects, menus and
 *  footers, and each collected site's parts. Each can be dragged onto the page (a part to a spot, an effect onto a
 *  part) or added with +, and the page shows where it landed. */
function Panel({ plan, page, sel, selDesign, chromeSel, siteSel, look, c, sites, placed, onDrag, onDragEnd, onAdd, onEffect, onSwap, onHero, onChrome, navId, footerId }: {
  plan: KitPlan; page: PlanPage; sel?: PlanSection; selDesign?: string; chromeSel?: 'nav' | 'footer'; siteSel?: BehaviourId; look: Look; c: Collection; sites: SiteRef[]; placed: number
  onDrag: (e: DragEvent, d: Drag) => void; onDragEnd: () => void; onAdd: (d: Exclude<Drag, { t: 'move' } | { t: 'effect' }>) => void; onEffect: (id: PieceId) => void
  onSwap: (id: SectionId, variant?: string) => void; onHero: (id: HeroId) => void; onChrome: (k: 'nav' | 'footer', id: string) => void; navId: string; footerId: string
}) {
  const parts = useMemo(() => sites.map((r) => {
    const recipe = composeRecipe(siteSpec(r)!), seen = new Set<string>()
    return { site: r, list: recipe.pages.flatMap((p) => p.sections).filter((s) => s.id !== 'hero' && s.id !== 'navbar' && s.id !== 'footer').filter((s) => { const k = `${s.id}:${s.variant?.id ?? ''}`; if (seen.has(k)) return false; seen.add(k); return true }) }
  }), [sites.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps
  const of = <K extends CollectionItem['kind']>(k: K) => c.items.filter((i): i is Extract<CollectionItem, { kind: K }> => i.kind === k)
  const on = (id: SectionId, variant?: string) => page.sections.some((s) => s.id === id && (!variant || s.variant === variant))
  const card = (key: string, item: CollectionItem, look: Look, label: string, sub: string, d: Drag | undefined, act: () => void, done: boolean, verb = 'Add') => (
    <li key={key} draggable={!!d} onDragStart={d ? (e) => onDrag(e, d) : undefined} onDragEnd={onDragEnd} className={`group flex items-center gap-3 rounded-lg p-1 ${d ? 'cursor-grab active:cursor-grabbing hover:bg-paper-2' : ''}`}>
      <div className="w-24 shrink-0 overflow-hidden rounded-md border border-line bg-white"><div className="pointer-events-none aspect-[16/10] overflow-hidden"><ItemPreview item={item} look={look} /></div></div>
      <p className="min-w-0 flex-1 text-sm leading-snug">{label}<span className="block truncate text-xs text-muted">{sub}</span></p>
      <button type="button" disabled={done} onClick={act} aria-label={done ? `${label}: already here` : `${verb} ${label}`}
        className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-white hover:border-ink disabled:border-transparent disabled:bg-transparent disabled:text-pencil">
        {done ? <Check size={14} aria-hidden /> : verb === 'Use' ? <ArrowLeftRight size={13} aria-hidden /> : <Plus size={14} aria-hidden />}
      </button>
    </li>
  )
  const group = (title: string, list: React.ReactNode[], note?: string) => !list.length ? null : (
    <section key={title} aria-label={title}><p className="text-sm text-muted">{title}</p>{note && <p className="text-xs text-muted">{note}</p>}<ul className="mt-1.5 space-y-0.5">{list}</ul></section>
  )
  const sample = (i: CollectionItem) => sampleLook(i, plan.purpose)
  // Whatever gets picked opens at the top of this column: bring the top into view.
  const aside = useRef<HTMLElement>(null)
  useEffect(() => { aside.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, [sel?.key, chromeSel, siteSel])
  // Every part OpusKit has (one design each; its others are a pick away), for what no collected site has.
  const [q, setQ] = useState('')
  const hit = (...t: string[]) => !q || t.join(' ').toLowerCase().includes(q.toLowerCase())
  const all = [
    group('First screens', EFFECTS.filter((e) => hit(e.name, e.line, 'first screen')).map((e) => card(`a:h:${e.hero}`, { kind: 'hero', id: e.hero }, sample({ kind: 'hero', id: e.hero }), e.name, e.lead === 'video' ? 'Needs a film' : 'First screen', { t: 'hero', id: e.hero }, () => onHero(e.hero), page.sections.some((s) => s.id === 'hero' && heroOf(plan, s) === e.hero), 'Use'))),
    group('Menu', Object.values(navStyles).filter((n) => hit(n.name, n.line, 'menu')).map((n) => card(`a:m:${n.id}`, { kind: 'menu', id: n.id }, sample({ kind: 'menu', id: n.id }), n.name, 'Every page', undefined, () => onChrome('nav', n.id), navId === n.id, 'Use'))),
    ...sectionGroups.map((g) => group(g.job, g.ids.filter((id) => hit(sections[id].name, g.name, g.job)).map((id) => card(`a:s:${id}`, { kind: 'section', id }, sample({ kind: 'section', id }), sections[id].name, designsOf(id), { t: 'part', id }, () => onAdd({ t: 'part', id }), on(id))))),
    group('Footer', Object.values(footerStyles).filter((f) => hit(f.name, f.line, 'footer')).map((f) => card(`a:f:${f.id}`, { kind: 'footer', id: f.id }, sample({ kind: 'footer', id: f.id }), f.name, 'Every page', undefined, () => onChrome('footer', f.id), footerId === f.id, 'Use'))),
  ].filter(Boolean)
  // Other designs for the picked part: its own designs, then other parts doing its job.
  const designs = sel && sel.id !== 'hero' ? [
    ...(sectionVariants[sel.id]?.options ?? []).filter((o) => o.id !== selDesign).map((o) => ({ id: sel.id, variant: o.id, label: o.name, sub: sections[sel.id].name })),
    ...(sectionGroups.find((g) => g.ids.includes(sel.id))?.ids ?? []).filter((x) => x !== sel.id).map((x) => ({ id: x, variant: undefined as string | undefined, label: sections[x].name, sub: jobOf(x) })),
  ] : []
  return (
    <aside ref={aside} className="space-y-6 lg:col-span-2 xl:sticky xl:top-36 xl:col-span-1 xl:max-h-[calc(100vh-10rem)] xl:overflow-y-auto xl:pr-1 xl:[scrollbar-color:var(--color-line)_transparent] xl:[scrollbar-width:thin]" aria-label="Add to this page">
      {siteSel && <SiteWideOptions plan={plan} b={siteSel} look={look} />}
      {chromeSel && (
        <section aria-label={chromeSel === 'nav' ? 'Other menus' : 'Other footers'} className="rounded-lg border border-ink/15 bg-white p-3">
          <p className="text-sm font-medium">{chromeSel === 'nav' ? 'Other menus' : 'Other footers'}</p>
          <p className="text-xs text-muted">Tap to swap — the same on every page.</p>
          <ul className="mt-2 space-y-0.5">
            {chromeSel === 'nav'
              ? Object.values(navStyles).map((n) => card(`o:m:${n.id}`, { kind: 'menu', id: n.id }, sample({ kind: 'menu', id: n.id }), n.name, n.line.split(' — ')[0], undefined, () => onChrome('nav', n.id), navId === n.id, 'Use'))
              : Object.values(footerStyles).map((f) => card(`o:f:${f.id}`, { kind: 'footer', id: f.id }, sample({ kind: 'footer', id: f.id }), f.name, f.line.split(' — ')[0], undefined, () => onChrome('footer', f.id), footerId === f.id, 'Use'))}
          </ul>
        </section>
      )}
      {sel && (
        <section aria-label="Other designs" className="rounded-lg border border-ink/15 bg-white p-3">
          <p className="text-sm font-medium">{sel.id === 'hero' ? 'Other first screens' : `Other designs · ${jobOf(sel.id).toLowerCase()}`}</p>
          <p className="text-xs text-muted">Tap to swap the picked part.</p>
          <ul className="mt-2 space-y-0.5">
            {sel.id === 'hero'
              ? EFFECTS.filter((e) => e.hero !== heroOf(plan, sel)).map((e) => card(`h:${e.hero}`, { kind: 'hero', id: e.hero }, sample({ kind: 'hero', id: e.hero }), e.name, e.lead === 'video' ? 'Needs a film' : e.line.split('.')[0], undefined, () => onHero(e.hero), false, 'Use'))
              : designs.map((d) => card(`d:${d.id}:${d.variant ?? ''}`, { kind: 'section', id: d.id, ...(d.variant ? { variant: d.variant } : {}) }, sample({ kind: 'section', id: d.id }), d.label, d.sub, undefined, () => onSwap(d.id, d.variant), false, 'Use'))}
          </ul>
        </section>
      )}
      <div>
        <h2 className="text-sm font-medium">Your Collection</h2>
        <p className="text-sm text-muted">{placed} of {c.items.length} on your pages. Drag onto {page.label}, or +.</p>
      </div>
      {group('Parts', of('section').map((i) => card(itemKey(i), i, sample(i), sections[i.id].name, partSub(i.id, i.variant), { t: 'part', id: i.id, variant: i.variant }, () => onAdd({ t: 'part', id: i.id, variant: i.variant }), on(i.id, i.variant))))}
      {group('First screens', of('hero').map((i) => card(itemKey(i), i, sample(i), itemName(i), page.sections.some((s) => s.id === 'hero') ? 'Replaces this page’s first screen' : 'Adds a first screen', { t: 'hero', id: i.id }, () => onHero(i.id), page.sections.some((s) => s.id === 'hero' && heroOf(plan, s) === i.id), 'Use')))}
      {group('Effects', of('effect').map((i) => card(itemKey(i), i, sample(i), pieces[i.id].name, effectOn(plan, i.id) ? 'On your site' : 'Drop it on a part', { t: 'effect', id: i.id }, () => onEffect(i.id), page.sections.some((s) => s.pieces.includes(i.id)))))}
      {group('Menu & footer', [...of('menu').map((i) => card(itemKey(i), i, sample(i), itemName(i), 'Every page', undefined, () => onChrome('nav', i.id), navId === i.id, 'Use')), ...of('footer').map((i) => card(itemKey(i), i, sample(i), itemName(i), 'Every page', undefined, () => onChrome('footer', i.id), footerId === i.id, 'Use'))])}
      {parts.map(({ site, list }) => {
        // This page's kind on that site first; everything else it has folded below.
        const here = sitePageParts(site, page.type), isHere = (s: (typeof list)[number]) => here.some((h) => h.id === s.id && (h.variant ?? '') === (s.variant?.id ?? ''))
        const row = (s: (typeof list)[number]) => card(`${site}:${s.id}:${s.variant?.id ?? ''}`, { kind: 'section', id: s.id, ...(s.variant ? { variant: s.variant.id } : {}) }, lookOfSite(site), sections[s.id].name, partSub(s.id, s.variant?.id), { t: 'part', id: s.id, variant: s.variant?.id, from: site }, () => onAdd({ t: 'part', id: s.id, variant: s.variant?.id, from: site }), on(s.id, s.variant?.id))
        const top = list.filter(isHere), more = list.filter((s) => !isHere(s))
        return (
          <Fold key={site} title={`From ${siteName(site)}`} sub={top.length ? `its ${pageTypes[page.type].name.toLowerCase()} page · ${top.length}` : `${list.length} parts`} open={!!top.length}>
            {!!top.length && <ul className="space-y-0.5">{top.map(row)}</ul>}
            {!!more.length && (top.length
              ? <Fold title={`More from ${siteName(site)}`} sub={`${more.length}`} small><ul className="space-y-0.5">{more.map(row)}</ul></Fold>
              : <ul className="space-y-0.5">{more.map(row)}</ul>)}
          </Fold>
        )
      })}
      {!c.items.length && <p className="text-sm text-muted">Nothing collected yet — collect sites in the <Link href="/library" className="link">Library</Link>, or pick from All parts.</p>}
      <div className="border-t border-line pt-4">
        <Fold title="All parts" sub="anything OpusKit has" open={!c.items.length}>
          <label className="relative mb-3 block"><span className="sr-only">Search all parts</span>
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search parts — reviews, prices, FAQ…" className="h-9 rounded-full bg-white pl-8 text-sm" /></label>
          <div className="space-y-4">{all.length ? all : <p className="text-sm text-muted">Nothing matches “{q}”.</p>}</div>
        </Fold>
      </div>
    </aside>
  )
}

// ─── On every page: what links, headlines, the main button… do ──────────────

const BEHAVIOURS = Object.keys(behaviours) as BehaviourId[]
const picksOf = (plan: KitPlan, b: BehaviourId) => behaviours[b].many ? behaviours[b].ids.filter((id) => (plan.sitePieces ?? []).includes(id)) : [behaviourPick(plan, b)].filter((x): x is PieceId => !!x)

/** The site-wide effects, one row each, under the footer (they belong to no part): each says what it is now; a click
 *  picks it and the right column shows the options moving; the × takes it off. Nothing here is ever hidden. */
function SiteWide({ plan, picked, onPick }: { plan: KitPlan; picked?: BehaviourId; onPick: (b: BehaviourId) => void }) {
  return (
    <section aria-label="On every page" className="mt-6">
      <h3 className="text-sm font-medium">On every page</h3>
      <p className="text-xs text-muted">Effects that belong to the whole site, not to one part.</p>
      <ul className="mt-2 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
        {BEHAVIOURS.map((b) => {
          const g = behaviours[b], now = picksOf(plan, b), on = picked === b
          return (
            <li key={b} className={`relative flex items-center gap-3 px-3 py-2.5 transition-colors ${on ? 'bg-paper-2' : 'hover:bg-paper-2/60'}`}>
              <button type="button" onClick={() => onPick(b)} aria-pressed={on} aria-label={`${g.name}: see the options`} className="absolute inset-0" />
              <span className="w-28 shrink-0 text-sm font-medium">{g.name}</span>
              <span className={`min-w-0 flex-1 truncate text-sm ${now.length ? 'text-ink' : 'text-muted'}`}>
                {now.length ? now.map((id) => pieces[id].name).join(', ') : g.many ? 'None' : g.none}
              </span>
              {now.map((id) => (
                <button key={id} type="button" aria-label={`Remove ${pieces[id].name}`} title={`Remove ${pieces[id].name}`}
                  onClick={() => change(`${pieces[id].name} removed`, (p) => (g.many ? toggleSitePiece(p, id) : setBehaviour(p, b, undefined)))}
                  className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full text-muted hover:bg-black/5 hover:text-ink"><X size={14} aria-hidden /></button>
              ))}
              <ChevronRight size={15} className={`shrink-0 text-muted transition-transform ${on ? 'rotate-90' : ''}`} aria-hidden />
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/** One site-wide behaviour's options, each shown moving (links on a drawn footer); tap to use, or None. */
function SiteWideOptions({ plan, b, look }: { plan: KitPlan; b: BehaviourId; look: Look }) {
  const g = behaviours[b], now = picksOf(plan, b)
  const pick = (id?: PieceId) => change(id ? `${g.name} — ${pieces[id].name}` : `${g.name} — none`, (p) => (g.many ? (id ? toggleSitePiece(p, id) : { ...p, sitePieces: (p.sitePieces ?? []).filter((x) => !g.ids.includes(x)) }) : setBehaviour(p, b, id)))
  const tile = (id: PieceId | undefined) => {
    const on = id ? now.includes(id) : !now.length
    return (
      <li key={id ?? 'none'} className={`relative overflow-hidden rounded-md border bg-white ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
        {id ? <LazyMount className="pointer-events-none aspect-[16/9] overflow-hidden"><ItemPreview item={{ kind: 'effect', id }} look={look} /></LazyMount>
          : <span className="grid aspect-[16/9] place-items-center text-xs text-muted">{g.many ? 'No extras' : g.none}</span>}
        <button type="button" role={g.many ? 'checkbox' : 'radio'} aria-checked={on} onClick={() => pick(id)}
          className="flex w-full items-start justify-between gap-2 border-t border-line px-2.5 py-2 text-left after:absolute after:inset-0">
          <span className="min-w-0"><span className="block text-[13px] font-medium">{id ? pieces[id].name : 'None'}</span>{id && <span className="block truncate text-[11px] text-muted">{pieces[id].line}</span>}</span>
          {on && <Check size={14} className="mt-0.5 shrink-0 text-pencil" aria-hidden />}
        </button>
      </li>
    )
  }
  return (
    <section aria-label={g.name} className="rounded-lg border border-ink/15 bg-white p-3">
      <p className="text-sm font-medium">{g.name}</p>
      <p className="text-xs text-muted">{g.line}{g.many ? ' — pick any.' : '.'}</p>
      <ul role={g.many ? 'group' : 'radiogroup'} aria-label={g.name} className="mt-2 grid grid-cols-2 gap-2">
        {tile(undefined)}
        {g.ids.map(tile)}
      </ul>
    </section>
  )
}

// ─── The menu and the footer: the frame every page shares ───────────────────

/** Locked in place (top and bottom, the same on every page); a page can leave either out. */
function ChromeRow({ c, page, picked, onPick, styleName, preview }: { c: ChromeId; page: PlanPage; picked: boolean; onPick: () => void; styleName: string; preview: React.ReactNode }) {
  const hidden = !!page.hide?.includes(c), name = c === 'navbar' ? 'Menu' : 'Footer'
  return (
    <div className={`relative flex items-center gap-4 rounded-lg border p-2 pr-3 transition-[box-shadow,border-color] ${picked ? 'border-ink bg-paper-2/60 shadow-[0_0_0_1px_var(--color-ink)]' : hidden ? 'border-dashed border-line bg-transparent hover:border-ink/40' : 'border-line bg-paper-2/60 hover:border-ink/40'}`}>
      <button type="button" onClick={onPick} aria-pressed={picked} aria-label={`Pick the ${name.toLowerCase()} to see other designs`} className="absolute inset-0 rounded-lg" />
      <LazyMount className={`pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line sm:w-44 ${hidden ? 'opacity-30' : ''}`}>{preview}</LazyMount>
      <div className="min-w-0 flex-1">
        <p className={`flex items-center gap-1.5 font-medium leading-snug ${hidden ? 'text-muted' : ''}`}><Lock size={13} className="text-muted" aria-hidden />{name}</p>
        <p className="mt-0.5 truncate text-sm text-muted">{hidden ? `Not on ${page.label}` : `${styleName} · the same on every page`}</p>
      </div>
      <button type="button" onClick={() => change(hidden ? `${name} back on ${page.label}` : `${name} left out of ${page.label}`, (p) => toggleChrome(p, page.id, c))}
        className="relative z-10 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm text-ink-2 hover:bg-black/5 hover:text-ink" aria-pressed={!hidden}>
        {hidden ? <EyeOff size={15} aria-hidden /> : <Eye size={15} aria-hidden />}<span className="max-sm:sr-only">{hidden ? 'Hidden' : 'Shown'}</span>
      </button>
    </div>
  )
}

// ─── What belongs on one part: an effect, your photos, your film ─────────────

const placeOf = (page: PlanPage, part: PlanSection) => `${page.label} · ${part.id === 'hero' ? 'First screen' : jobOf(part.id)}`

function PartExtras({ plan, page, part, collectedFx }: { plan: KitPlan; page: PlanPage; part: PlanSection; collectedFx: PieceId[] }) {
  const photoInput = useRef<HTMLInputElement>(null), filmInput = useRef<HTMLInputElement>(null)
  const fits = piecesFor(part).sort((a, b) => Number(collectedFx.includes(b)) - Number(collectedFx.includes(a)))
  const hero = part.id === 'hero' ? heroOf(plan, part) : undefined
  const photos = PHOTO_SECTIONS.includes(part.id) || MEDIA_SECTIONS.includes(part.id) || (part.id === 'hero' && !FILM.has(hero!))
  const film = part.id === 'hero' && FILM.has(hero!)
  const place = placeOf(page, part)
  const mine = (plan.uploads ?? []).filter((u) => u.place === place)
  const upload = async (files: FileList | null, asset: 'images' | 'video') => {
    if (!files?.length) return
    const metas = await Promise.all([...files].slice(0, asset === 'video' ? 1 : 24).map(async (f) => ({ ...(await storeUpload(f, asset)), place })))
    updatePlan((p) => ({ ...p, uploads: [...(p.uploads ?? []), ...metas], assets: [...new Set([...(p.assets ?? []), asset])], ...(asset === 'video' ? { mediaPlan: 'have' as const } : {}) }))
    toast(`${metas.length} ${asset === 'video' ? 'film' : metas.length === 1 ? 'photo' : 'photos'} added to ${place}`)
  }
  const dropUploads = async (kind: 'image' | 'video') => {
    const gone = mine.filter((u) => u.kind === kind)
    await Promise.all(gone.filter((u) => u.fileId).map((u) => deleteFile(u.fileId!)))
    updatePlan((p) => ({ ...p, uploads: (p.uploads ?? []).filter((u) => !gone.includes(u)) }))
  }
  if (!fits.length && !photos && !film) return null
  const nPhotos = mine.filter((u) => u.kind === 'image').length, hasFilm = mine.some((u) => u.kind === 'video')
  const chip = 'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-xs transition-colors'
  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5 border-t border-line pt-2">
      {part.pieces.map((id) => (
        <span key={id} className={`${chip} border-pencil/30 bg-pencil/5 text-pencil`}><Sparkles size={12} aria-hidden />{pieces[id].name}
          <button type="button" aria-label={`Remove ${pieces[id].name}`} onClick={() => updatePlan((p) => togglePiece(p, page.id, part.key, id))} className="-mr-1 grid size-4 place-items-center rounded-full hover:bg-pencil/15"><X size={11} aria-hidden /></button></span>
      ))}
      {!!fits.length && <EffectPicker plan={plan} page={page} part={part} collectedFx={collectedFx} />}
      {photos && (nPhotos
        ? <span className={`${chip} border-line text-ink-2`}><ImagePlus size={12} aria-hidden />{nPhotos} {nPhotos === 1 ? 'photo' : 'photos'}<button type="button" aria-label="Remove these photos" onClick={() => dropUploads('image')} className="-mr-1 grid size-4 place-items-center rounded-full hover:bg-secondary"><X size={11} aria-hidden /></button></span>
        : <button type="button" onClick={() => photoInput.current?.click()} className={`${chip} border-line text-ink-2 hover:border-ink hover:text-ink`}><ImagePlus size={12} aria-hidden />Your photos</button>)}
      {film && (hasFilm
        ? <span className={`${chip} border-line text-ink-2`}><Film size={12} aria-hidden />Your film<button type="button" aria-label="Remove the film" onClick={() => dropUploads('video')} className="-mr-1 grid size-4 place-items-center rounded-full hover:bg-secondary"><X size={11} aria-hidden /></button></span>
        : <button type="button" onClick={() => filmInput.current?.click()} className={`${chip} border-line text-ink-2 hover:border-ink hover:text-ink`}><Film size={12} aria-hidden />Your film</button>)}
      <input ref={photoInput} type="file" accept="image/*" multiple hidden onChange={(e) => { upload(e.target.files, 'images'); e.target.value = '' }} />
      <input ref={filmInput} type="file" accept="video/*" hidden onChange={(e) => { upload(e.target.files, 'video'); e.target.value = '' }} />
    </div>
  )
}

/** Effects for one part, shown — not listed: each one moving (a real site where there is one, else drawn in your look),
 *  grouped by what it does; one per group on a part, so picking another swaps it. Collected ones lead and say so. */
function EffectPicker({ plan, page, part, collectedFx }: { plan: KitPlan; page: PlanPage; part: PlanSection; collectedFx: PieceId[] }) {
  const [open, setOpen] = useState(false)
  const spec = planToSpec(plan)
  const look = sampleLook({ kind: 'effect', id: 'text-effect' }, plan.purpose) // the effects in their own colours, like every shelf
  const options = (Object.keys(pieces) as PieceId[]).filter((id) => isMoment(id) && pieces[id].sections.includes(part.id))
    .sort((a, b) => Number(collectedFx.includes(b)) - Number(collectedFx.includes(a)))
  const slots = [...new Set(options.map((id) => pieces[id].slot))]
  const pick = (id: PieceId) => updatePlan((p) => {
    const cur = p.pages.find((x) => x.id === page.id)?.sections.find((x) => x.key === part.key)
    if (!cur) return p
    if (cur.pieces.includes(id)) return togglePiece(p, page.id, part.key, id)
    const swap = cur.pieces.find((x) => pieces[x].slot === pieces[id].slot)
    return togglePiece(swap ? togglePiece(p, page.id, part.key, swap) : p, page.id, part.key, id)
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink"><Sparkles size={12} aria-hidden />{part.pieces.length ? 'Effects' : 'Add an effect'}</button>
      <DialogContent className="flex max-h-[88vh] w-[min(94vw,64rem)] max-w-none flex-col gap-0 p-0 sm:max-w-none">
        <div className="border-b border-line px-6 py-5">
          <DialogTitle className="text-xl font-medium tracking-tight">Effects for {part.id === 'hero' ? 'the first screen' : jobOf(part.id).toLowerCase()}</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted">{page.label} · pick one per group — tap again to take it off.</DialogDescription>
        </div>
        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]">
          {slots.map((slot) => (
            <section key={slot} aria-label={pieceSlots[slot].name}>
              <p className="text-sm font-medium">{pieceSlots[slot].name} <span className="font-normal text-muted">· {pieceSlots[slot].line}</span></p>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {options.filter((id) => pieces[id].slot === slot).map((id) => {
                  const on = part.pieces.includes(id), real = closestPiece(spec, id)
                  return (
                    <li key={id}>
                      <div onClick={() => pick(id)} className={`relative cursor-pointer overflow-hidden rounded-lg border bg-white transition-shadow ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
                        {real ? <TileClip match={real} className="aspect-[16/10]" /> : <div className="pointer-events-none aspect-[16/10]"><ItemPreview item={{ kind: 'effect', id }} look={look} /></div>}
                        {on && <span className="absolute left-2 top-2 grid size-6 place-items-center rounded-full bg-pencil text-white shadow-sm"><Check size={14} aria-hidden /></span>}
                      </div>
                      <button type="button" aria-pressed={on} onClick={() => pick(id)} className="mt-2 block w-full text-left">
                        <span className="flex items-center gap-2 text-sm font-medium">{pieces[id].name}{collectedFx.includes(id) && <span className="rounded-full bg-pencil/10 px-1.5 py-0.5 text-[10px] font-medium text-pencil">Collected</span>}</span>
                        <span className="mt-0.5 line-clamp-2 block text-xs text-muted">{pieces[id].line}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
          <p className="text-sm text-muted">{part.pieces.length ? `On this part: ${part.pieces.map((x) => pieces[x].name).join(', ')}` : 'No effect on this part yet.'}</p>
          <DialogClose className="btn btn-ink btn-sm">Done</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/** "Add a page", searchable: type to narrow the list; Enter adds the first match, arrows move through it. */
function PagePicker({ onPick, suggested }: { onPick: (type: PageTypeId, label?: string) => void; suggested: { type: PageTypeId; label: string }[] }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const list = useRef<HTMLDivElement>(null)
  const match = (name: string) => !q || name.toLowerCase().includes(q.trim().toLowerCase())
  const sug = suggested.filter((x) => match(x.label))
  const found = pageGroups.map((g) => ({ ...g, ids: g.ids.filter((id) => match(pageTypes[id].name) && !sug.some((x) => x.type === id)) })).filter((g) => g.ids.length)
  const pick = (id: PageTypeId, label?: string) => { onPick(id, label); setOpen(false); setQ('') }
  const step = (e: React.KeyboardEvent, by: 1 | -1) => {
    const items = [...(list.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])]
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    items[Math.max(0, Math.min(items.length - 1, i + by))]?.focus(); e.preventDefault()
  }
  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQ('') }}>
      <PopoverTrigger className="flex h-10 w-full items-center gap-1.5 rounded-md border border-input bg-white px-3 text-sm text-muted hover:border-ink"><Plus size={14} aria-hidden />Add a page</PopoverTrigger>
      <PopoverContent align="start" className="w-(--radix-popover-trigger-width) min-w-64 p-0" onKeyDown={(e) => { if (e.key === 'ArrowDown') step(e, 1); if (e.key === 'ArrowUp') step(e, -1) }}>
        <div className="flex items-center gap-2 border-b border-line px-3">
          <Search size={14} className="shrink-0 text-muted" aria-hidden />
          <input data-slot="search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (sug[0]) pick(sug[0].type, sug[0].label); else if (found[0]) pick(found[0].ids[0]) } }}
            placeholder="Search pages" aria-label="Search pages" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted focus-visible:outline-none" />
        </div>
        <div ref={list} className="max-h-72 overflow-y-auto p-1 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]">
          {!!sug.length && (
            <div role="group" aria-label="Suggested for your site">
              <p className="px-2.5 pb-1 pt-2 text-xs text-pencil">Suggested for your site</p>
              {sug.map((x) => <button key={x.type + x.label} type="button" onClick={() => pick(x.type, x.label)} className="block w-full rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-secondary focus:bg-secondary focus:outline-none">{x.label}</button>)}
            </div>
          )}
          {found.map((g) => (
            <div key={g.name} role="group" aria-label={g.name}>
              <p className="px-2.5 pb-1 pt-2 text-xs text-muted">{g.name}</p>
              {g.ids.map((id) => <button key={id} type="button" onClick={() => pick(id)} className="block w-full rounded-md px-2.5 py-1.5 text-left text-sm hover:bg-secondary focus:bg-secondary focus:outline-none">{pageTypes[id].name}</button>)}
            </div>
          ))}
          {!found.length && !sug.length && <p className="px-2.5 py-3 text-sm text-muted">No page called that — add it as your own page below.</p>}
        </div>
      </PopoverContent>
    </Popover>
  )
}

/** A collected site's chip in "Made from": hovering it brings back what the site looks like — a few seconds of the real
 *  site (its homepage shot where there is no recording). */
function SiteChip({ site, active, onClick }: { site: SiteRef; active: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  const e = exampleOf(site)
  return (
    <span className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)}>
      <Chip active={active} onClick={onClick}>{siteName(site)}</Chip>
      {hover && e && (
        <span className="pointer-events-none absolute right-0 top-full z-40 mt-2 block w-80 overflow-hidden rounded-lg border border-line bg-white shadow-xl">
          {e.clip
            ? <video src={e.clip} poster={`/examples/${e.slug}.jpg`} muted loop playsInline autoPlay className="block aspect-[16/10] w-full object-cover" aria-hidden />
            : <img src={`/examples/${e.slug}.jpg`} alt="" className="block aspect-[16/10] w-full object-cover object-top" />}
          <span className="block px-3 py-2 text-xs"><span className="font-medium text-ink">{siteName(site)}</span><span className="text-muted"> · {active ? 'this page follows it' : 'tap to make this page follow it'}</span></span>
        </span>
      )}
    </span>
  )
}

/** A group in the right column that folds away (each on its own). */
function Fold({ title, sub, open: initial = true, small, children }: { title: string; sub?: string; open?: boolean; small?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(initial)
  return (
    <section aria-label={title} className={small ? 'mt-1' : ''}>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className={`flex w-full items-center justify-between gap-2 rounded-md py-1 text-left hover:text-ink ${small ? 'text-xs text-muted' : 'text-sm text-muted'}`}>
        <span className="min-w-0 truncate">{title}{sub && <span className="ml-1.5 text-muted/80">· {sub}</span>}</span>
        <ChevronRight size={14} className={`shrink-0 transition-transform duration-200 ${open ? 'rotate-90' : ''}`} aria-hidden />
      </button>
      {open && <div className="mt-1">{children}</div>}
    </section>
  )
}

function Icon({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className="grid size-8 place-items-center rounded-full hover:bg-black/10 disabled:pointer-events-none disabled:opacity-25">{children}</button>
}
