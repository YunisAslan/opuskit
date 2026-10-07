'use client'
// Pages (docs/plan-library.md): which pages the site has — one collected site's own, else the kind of site's — plus
// suggestions (in Add a page) and your own. Each page is a blend of the collected sites, or follows one ("Made from").
// In the middle, the picked page between its locked menu and footer: drag parts to reorder (or the arrows), remove,
// and on each part what belongs to it — another design, an effect, your photos, your film. Whatever is clicked on the
// page (a part, the menu, the footer, a row of On every page) opens its own choices, large, in one chooser (`Chooser`).
// Left, the toolbox — Parts (everything collected, each site's parts, then All parts) and Effects (On every page, then
// the effects that go on one part) — dragged onto the page or added with +; whatever lands scrolls into view and
// glows. Right, the site's pages. The page is a plan, not a promise (decision 34): each part a frame in your colours and
// lettering — headings real, body text as bars, photos as marked blocks — with what it says and what it shows under it;
// "Sample" draws it with stand-in words and photos instead. Toolbox thumbnails keep their source site's colours.
import { ArrowDown, ArrowLeftRight, ArrowRight, ArrowUp, Check, ChevronRight, Eye, EyeOff, Film, GripVertical, ImagePlus, Info, Lock, Plus, Search, Sparkles, X } from 'lucide-react'
import Link from 'next/link'
import { Fragment, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { toast } from 'sonner'
import { LazyMount } from '@/components/LazyMount'
import { Chip } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LinkDemo } from '@/components/LinkDemo'
import { TileClip } from '@/components/RealSiteClip'
import { SectionPreview } from '@/components/SectionPreview'
import { closestPiece, heroSite, sectionDesign, type Match } from '@/features/kit/closest'
import { HeroPreview } from '@/components/HeroPreview'
import { heroName } from '@/components/HeroPreview'
import { ItemPreview, exampleOf, sampleLook, siteLook, type Look } from '@/app/library/parts'
import { EFFECTS, footerStyles, navStyles, pageTypes, sections } from '@/data/patterns'
import { sectionVariants, variantFor } from '@/data/section-variants'
import { behaviours, isMoment, pieceSlots, pieces } from '@/data/pieces'
import { sectionGuide } from '@/data/section-guide'
import { directions, purposes } from '@/data/taxonomy'
import { addPage, addSection, addSuggested, behaviourPick, effectOn, heroOf, isStandardPage, jobOf, missingPages, movePage, moveSection, pageGroups, piecesFor, placeSection, planToSpec, removePage, removeSection, renamePage, replaceSection, sectionGroups, setBehaviour, setPartHero, setSectionVariant, setStyle, specToPlan, toggleChrome, togglePiece, toggleSitePiece } from '@/features/kit/plan'
import { blendPage, itemKey, itemName, lookChoices, pageLike, placement, siteName, sitePageParts, siteSpec, sitesWithPage, startSite, type Collection, type CollectionItem, type SiteRef } from '@/features/library/collection'
import { MEDIA_SECTIONS, PHOTO_SECTIONS, composeRecipe } from '@/features/recipes/engine'
import { planFromStudio, updateCollection, useCollection } from '@/lib/collection'
import { deleteFile, storeUpload } from '@/lib/files'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { Shot, BehaviourId, ChromeId, FooterStyleId, HeroId, KitPlan, NavStyleId, PageTypeId, PieceId, PlanPage, PlanSection, PurposeId, SectionId } from '@/types/domain'
import { BackToDirections, NeedsStudio, StepFrame, usePlanLook, useToRecipe } from '../shared'

const FILM = new Set(EFFECTS.filter((e) => e.lead === 'video').map((e) => e.hero))
// First screens made of words or a 3D object take no photos of the owner's.
const NO_PHOTOS = new Set(EFFECTS.filter((e) => e.lead === 'typography' || e.lead === '3d').map((e) => e.hero))

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

/** What the chooser is open on: a part, the menu or footer, or one row of On every page. */
type Choose = { t: 'part'; key: string } | { t: 'chrome'; c: 'nav' | 'footer' } | { t: 'site'; b: BehaviourId }

// Thumbnails keep their own colours (only Brand's example takes yours): a part from a site in that site's look.
const siteLooks = new Map<SiteRef, Look>()
const lookOfSite = (r: SiteRef) => { if (!siteLooks.has(r)) siteLooks.set(r, siteLook(r, specToPlan(siteSpec(r)!))); return siteLooks.get(r)! }

export function Pages() {
  const ready = useHydrated()
  const plan = usePlan()
  const c = useCollection()
  const [pageId, setPageId] = useState<string>()
  const [choose, setChoose] = useState<Choose>()
  const [drag, setDrag] = useState<Drag | null>(null)
  const [dropAt, setDropAt] = useState<number | null>(null)
  const [fxOver, setFxOver] = useState<string>()
  const [flash, setFlash] = useState<string>()
  const [sample, setSample] = useState(false)
  const { recipe, spec, look: own, pv } = usePlanLook(plan)
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
  const sites = lookChoices(c), first = plan.blank ? undefined : startSite(c)
  const base = first ? lookOfSite(first) : sampleLook({ kind: 'menu', id: recipe.chrome.nav.id }, plan.purpose)
  // The page and its chooser are drawn in your own colours and lettering; the toolbox keeps each source's.
  const mine: Look = { ...own, plan, world: pv.world, brand: pv.brand, layout: pv.layout }
  const sketch = !sample
  const built = recipe.pages.find((p) => p.id === page.id)
  const collected = new Set(c.items.flatMap((i) => (i.kind === 'section' ? [i.id] : i.kind === 'hero' ? ['hero'] : [])))
  const add = (type: PageTypeId, label?: string) => { let id = ''; updatePlan((p) => { const r = addPage(p, type, label); id = r.id; return r.plan }); setPageId(id) }
  const where = placement(plan, c)
  const rebuild = (patch: { purpose?: PurposeId }) => { updateCollection((x) => ({ ...x, ...patch })); planFromStudio() }
  const likes = sitesWithPage(c, page.type), liked = c.like?.[page.type]
  const follow = (r?: SiteRef) => {
    updateCollection((x) => { const like = { ...x.like }; if (r) like[page.type] = r; else delete like[page.type]; return { ...x, like } })
    change(r ? `${page.label} now follows ${siteName(r)}` : `${page.label} is a mix again`, (p) => (r ? pageLike(p, page.id, r) : blendPage(p, page.id, sites)))
  }

  // ─── putting things on the page: by drop (at a spot) or by + (before the closing parts) ───
  const keysOf = (p: KitPlan) => new Set(p.pages.find((x) => x.id === page.id)!.sections.map((s) => s.key))
  const placeNew = (d: Exclude<Drag, { t: 'move' } | { t: 'effect' }>, at?: number) => {
    const pos = at
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
    const target = page.sections.find((s) => s.key === onKey) ?? page.sections.find((s) => pieces[id].sections.includes(s.id))
    if (!target || !pieces[id].sections.includes(target.id)) return toast(`${pieces[id].name} doesn’t fit ${target ? jobOf(target.id).toLowerCase() : 'any part on this page'}`, { description: `It goes on: ${[...new Set(pieces[id].sections.map((x) => (x === 'hero' ? 'the first screen' : jobOf(x).toLowerCase())))].slice(0, 4).join(', ')}.` })
    if (target.pieces.includes(id)) return setFlash(target.key)
    const swap = target.pieces.find((x) => pieces[x].slot === pieces[id].slot)
    change(`${pieces[id].name} on ${target.id === 'hero' ? 'the first screen' : jobOf(target.id).toLowerCase()}`, (p) => togglePiece(swap ? togglePiece(p, page.id, target.key, swap) : p, page.id, target.key, id))
    setFlash(target.key)
  }

  // ─── the chooser: what the clicked thing can be instead, every option drawn large ───
  const chooser = (x?: Choose): ChooserProps | undefined => {
    if (!x) return
    if (x.t === 'chrome') {
      const nav = x.c === 'nav'
      return { title: nav ? 'Menu' : 'Footer', line: 'The same on every page — pick one.', groups: [{ title: nav ? 'Menus' : 'Footers', options: nav
        ? Object.values(navStyles).map((n) => ({ key: n.id, label: n.name, sub: n.line, on: recipe.chrome.nav.id === n.id, preview: <ItemPreview item={{ kind: 'menu', id: n.id }} look={mine} />, pick: () => change(`Menu — ${n.name}`, (p) => setStyle(p, 'nav', n.id)) }))
        : Object.values(footerStyles).map((f) => ({ key: f.id, label: f.name, sub: f.line, on: recipe.chrome.footerStyle.id === f.id, preview: <ItemPreview item={{ kind: 'footer', id: f.id }} look={mine} sketch={sketch} />, pick: () => change(`Footer — ${f.name}`, (p) => setStyle(p, 'footer', f.id)) })) }] }
    }
    if (x.t === 'site') {
      const g = behaviours[x.b], now = picksOf(plan, x.b)
      const pick = (id?: PieceId) => change(id ? `${g.name} — ${pieces[id].name}` : `${g.name} — none`, (p) => (g.many ? (id ? toggleSitePiece(p, id) : { ...p, sitePieces: (p.sitePieces ?? []).filter((y) => !g.ids.includes(y)) }) : setBehaviour(p, x.b, id)))
      return { title: g.name, line: `${g.line} — on every page${g.many ? '; pick any' : ''}.`, many: g.many, groups: [{ title: g.many ? 'Extras' : 'Options', options: [
        { key: 'none', label: g.many ? 'No extras' : 'None', sub: g.none, on: !now.length, preview: <Plain b={x.b} look={base} />, pick: () => pick() },
        ...g.ids.map((id) => ({ key: id, label: pieces[id].name, sub: pieces[id].line, on: now.includes(id), preview: <ItemPreview item={{ kind: 'effect', id }} look={base} />, pick: () => pick(id) })),
      ] }] }
    }
    const s = page.sections.find((y) => y.key === x.key)
    if (!s) return
    const look = mine, where = `${page.label} · ${s.id === 'hero' ? 'First screen' : jobOf(s.id)}`
    const flashing = (f: () => void) => () => { f(); setFlash(s.key) }
    if (s.id === 'hero') return { title: heroName(heroOf(plan, s)), line: `${where} — pick another first screen; it changes this one only.`, groups: [{ title: 'First screens', options: EFFECTS.map((e) => ({
      key: e.hero, label: e.name, sub: e.line, badge: e.lead === 'video' ? 'Needs a film' : undefined, on: heroOf(plan, s) === e.hero, proof: heroSite(spec, e.hero),
      preview: <ItemPreview item={{ kind: 'hero', id: e.hero }} look={look} sketch={sketch} />, pick: flashing(() => change(`First screen — ${heroName(e.hero)}`, (p) => setPartHero(p, page.id, s.key, e.hero))) })) }] }
    const name = sections[s.id].name, cur = designOf(s), vs = sectionVariants[s.id]?.options
    const others = (sectionGroups.find((g) => g.ids.includes(s.id))?.ids ?? []).filter((y) => y !== s.id)
    return { title: name, line: `${where} — pick a design, or another part that does the same job.`, groups: [
      { title: vs ? `Designs of ${name}` : name, options: (vs ?? [undefined]).map((o) => ({ key: o?.id ?? s.id, label: o?.name ?? name, sub: o?.line ?? sectionGuide[s.id]?.look, on: !o || o.id === cur, proof: sectionDesign(spec, s.id, o?.id),
        preview: <ItemPreview item={{ kind: 'section', id: s.id, ...(o ? { variant: o.id } : {}) }} look={look} sketch={sketch} />, pick: flashing(() => { if (o && o.id !== cur) change(`${name} — ${o.name}`, (p) => setSectionVariant(p, page.id, s.key, o.id)) }) })) },
      { title: `Other parts · ${jobOf(s.id)}`, options: others.map((y) => { const v = variantFor(y, fam); return { key: y, label: sections[y].name, sub: sectionGuide[y] && `Best when ${sectionGuide[y].bestWhen}`, on: false, proof: sectionDesign(spec, y, v),
        preview: <ItemPreview item={{ kind: 'section', id: y, ...(v ? { variant: v } : {}) }} look={look} sketch={sketch} />, pick: flashing(() => change(`${jobOf(s.id)} — ${sections[y].name}`, (p) => setSectionVariant(replaceSection(p, page.id, s.key, y), page.id, s.key, undefined))) } }) },
    ] }
  }
  const open = chooser(choose)

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
      <BackToDirections />
      <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Adjust pages</h1>
      {!plan.purpose && (
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-sm text-muted">What are you making?</span>{(Object.keys(purposes) as PurposeId[]).filter((k) => k !== 'other').map((k) => <Chip key={k} active={false} onClick={() => rebuild({ purpose: k })}>{purposes[k].name}</Chip>)}
        </div>
      )}
    </div>
  )

  return (
    <StepFrame at="Direction" title={title} next={<button type="button" onClick={toRecipe} className="btn btn-ink btn-sm"><span>Next<span className="hidden sm:inline">: Recipe</span></span><ArrowRight size={14} aria-hidden /></button>}>
      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr_11rem] lg:items-start xl:grid-cols-[20rem_1fr_13rem]">
        <Panel plan={plan} page={page} look={base} c={c} sites={sites} placed={where.placed.length} onSite={(b) => setChoose({ t: 'site', b })}
          onDrag={start} onDragEnd={end} onAdd={placeNew} onEffect={(id) => putEffect(id)}
          onHero={(id) => { const h = page.sections.find((s) => s.id === 'hero'); if (h) { change(`First screen — ${heroName(id)}`, (p) => setPartHero(p, page.id, h.key, id)); setFlash(h.key) } else placeNew({ t: 'hero', id }, 0) }}
          onChrome={(k, id) => change(`${k === 'nav' ? 'Menu' : 'Footer'} — ${k === 'nav' ? navStyles[id as NavStyleId].name : footerStyles[id as FooterStyleId].name}`, (p) => setStyle(p, k, id))}
          navId={recipe.chrome.nav.id} footerId={recipe.chrome.footerStyle.id} />

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
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="flex min-w-0 flex-1 items-start gap-1.5 text-xs leading-relaxed text-muted"><Info size={13} className="mt-px shrink-0" aria-hidden />{sample
              ? 'A sample with stand-in words and photos, in your colours and lettering. Your site is built from the plan and goes further.'
              : 'Your plan, in your colours and lettering. Bars are your words to come, crossed blocks your photos. The builder designs every detail inside each part.'}</p>
            <div role="group" aria-label="Draw the page as" className="flex shrink-0 rounded-[3px] bg-paper-2 p-0.5 font-mono text-[11px] uppercase tracking-[.12em]">
              {([[false, 'Plan'], [true, 'Sample']] as const).map(([v, l]) => (
                <button key={l} type="button" aria-pressed={sample === v} onClick={() => setSample(v)} className={`h-7 rounded-[2px] px-3 transition-colors ${sample === v ? 'bg-ink text-paper' : 'text-muted hover:bg-white hover:text-ink'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="mt-3"><ChromeRow c="navbar" page={page} onPick={() => setChoose({ t: 'chrome', c: 'nav' })} styleName={recipe.chrome.nav.name} preview={<ItemPreview item={{ kind: 'menu', id: recipe.chrome.nav.id }} look={mine} />} /></div>
          {isStandardPage(page.type) && !page.sections.length && !drag
            ? <p className="mt-2 rounded-lg bg-paper-2 px-4 py-3 text-ink-2">Written for you — a {pageTypes[page.type].name.toLowerCase()} page needs no parts.</p>
            : (
              <ol className="mt-2 min-h-16 space-y-3" aria-label={`Parts of ${page.label}`} onDragOver={(e) => { if (drag && drag.t !== 'effect') { e.preventDefault(); if (!page.sections.length) setDropAt(0) } }} onDrop={(e) => drop(e)} onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) { setDropAt(null); setFxOver(undefined) } }}>
                {page.sections.map((s, i) => (
                  <Fragment key={s.key}>
                    {dropAt === i && drag?.t !== 'effect' && line}
                    <li data-part={s.key} draggable onDragStart={(e) => start(e, { t: 'move', key: s.key })} onDragEnd={end} onDragOver={(e) => over(e, i, s.key)} onDrop={(e) => { e.stopPropagation(); drop(e, s.key) }}
                      className={`group overflow-hidden rounded-[3px] border bg-white transition-[box-shadow,border-color,opacity] duration-300 ${flash === s.key ? 'border-pencil shadow-[0_0_0_4px_var(--color-pencil-soft)]' : fxOver === s.key ? 'border-pencil' : 'border-line hover:border-ink/40'} ${drag?.t === 'move' && drag.key === s.key ? 'opacity-40' : ''}`}>
                      {/* The frame's head: its number on the page, the part and its design; moving and removing on hover. */}
                      <div className="flex items-center gap-2 border-b border-line py-1 pl-2 pr-1">
                        <GripVertical size={15} className="shrink-0 cursor-grab text-muted/60 active:cursor-grabbing" aria-hidden />
                        <p className="flex min-w-0 flex-1 items-baseline gap-2.5">
                          <span className="label shrink-0 tabular-nums text-muted">{String(i + 1).padStart(2, '0')}</span>
                          <span className="truncate font-medium">{s.id === 'hero' ? heroName(heroOf(plan, s)) : sections[s.id].name}</span>
                          <span className="hidden truncate text-sm text-muted sm:inline">{s.id === 'hero' ? 'First screen' : partSub(s.id, designOf(s))}</span>
                          {s.from ? <span className="hidden shrink-0 text-xs font-medium text-pencil md:inline">From {siteName(s.from as SiteRef)}</span> : collected.has(s.id) && <span className="hidden shrink-0 text-xs font-medium text-pencil md:inline">From your Collection</span>}
                        </p>
                        <span className="flex shrink-0 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                          <Icon label="Move up" disabled={i === 0} onClick={() => { updatePlan((x) => moveSection(x, page.id, s.key, -1)); setFlash(s.key) }}><ArrowUp size={16} /></Icon>
                          <Icon label="Move down" disabled={i === page.sections.length - 1} onClick={() => { updatePlan((x) => moveSection(x, page.id, s.key, 1)); setFlash(s.key) }}><ArrowDown size={16} /></Icon>
                          <Icon label="Remove" onClick={() => { change(`Removed from ${page.label}`, (x) => removeSection(x, page.id, s.key)) }}><X size={16} /></Icon>
                        </span>
                      </div>
                      <button type="button" onClick={() => setChoose({ t: 'part', key: s.key })} aria-label={`Change ${s.id === 'hero' ? 'the first screen' : sections[s.id].name}`} className="relative block w-full cursor-pointer text-left" style={{ background: own.colors.background }}>
                        <LazyMount className="pointer-events-none min-h-32">
                          {s.id === 'hero'
                            ? <div className={`aspect-[2/1] overflow-hidden ${sketch ? 'sketch' : ''}`} style={{ '--color-text': own.colors.text, '--color-background': own.colors.background } as React.CSSProperties}><HeroPreview plan={plan} id={heroOf(plan, s)} /></div>
                            : <SectionPreview id={s.id} {...pv} variant={designOf(s)} tone={built?.sections[i]?.tone} media={built?.sections[i]?.media} sketch={sketch} auto maxHeight={300} />}
                        </LazyMount>
                      </button>
                      <PartBrief part={s} page={page} pages={plan.pages.length} shots={recipe.media.shots} />
                      <div className="px-2 pb-2"><PartExtras plan={plan} page={page} part={s} onChange={() => setChoose({ t: 'part', key: s.key })} collectedFx={c.items.flatMap((x) => (x.kind === 'effect' ? [x.id] : []))} /></div>
                    </li>
                  </Fragment>
                ))}
                {dropAt === page.sections.length && drag?.t !== 'effect' && line}
                {!page.sections.length && drag && <li className="rounded-lg border border-dashed border-pencil px-4 py-6 text-center text-sm text-pencil">Drop it here</li>}
              </ol>
            )}
          <div className="mt-2"><ChromeRow c="footer" page={page} onPick={() => setChoose({ t: 'chrome', c: 'footer' })} styleName={recipe.chrome.footerStyle.name} preview={<ItemPreview item={{ kind: 'footer', id: recipe.chrome.footerStyle.id }} look={mine} sketch={sketch} />} /></div>
        </section>

        <nav aria-label="Your pages" className="order-first lg:sticky lg:top-36 lg:order-none">
          <p className="px-2.5 text-sm text-muted">Pages · {plan.pages.length}</p>
          <ol className="mt-2 space-y-0.5">
            {plan.pages.map((p, i) => (
              <li key={p.id} className={`group relative flex items-center rounded-md ${p.id === page.id ? 'bg-ink text-paper' : 'hover:bg-paper-2'}`}>
                <button type="button" onClick={() => setPageId(p.id)} aria-current={p.id === page.id ? 'page' : undefined} className="flex min-w-0 flex-1 items-center justify-between gap-2 px-2.5 py-2 text-left text-sm">
                  <span className="truncate font-medium">{p.label}</span>
                  <span className="shrink-0 text-xs tabular-nums opacity-50 md:group-hover:opacity-0 md:group-focus-within:opacity-0" title={`${p.sections.length} parts`}>{p.sections.length || ''}</span>
                </button>
                {/* The page's controls only on hover, over the row's end (where the count of its parts sits otherwise); only the
                    buttons take clicks, so the rest of the row still opens the page. */}
                <span className={`flex shrink-0 pr-0.5 md:pointer-events-none md:absolute md:inset-y-0 md:right-0 md:items-center md:rounded-r-md md:pl-5 md:opacity-0 md:[&>button]:pointer-events-auto md:group-hover:opacity-100 md:group-focus-within:opacity-100 ${p.id === page.id ? 'md:bg-gradient-to-l md:from-ink md:from-60%' : 'md:bg-gradient-to-l md:from-paper-2 md:from-60%'}`}>
                  <Icon small label={`Move ${p.label} up`} disabled={i === 0} onClick={() => updatePlan((x) => movePage(x, p.id, -1))}><ArrowUp size={13} /></Icon>
                  <Icon small label={`Move ${p.label} down`} disabled={i === plan.pages.length - 1} onClick={() => updatePlan((x) => movePage(x, p.id, 1))}><ArrowDown size={13} /></Icon>
                  <Icon small label={`Remove ${p.label}`} disabled={plan.pages.length === 1} onClick={() => change(`Removed: ${p.label}`, (x) => removePage(x, p.id))}><X size={13} /></Icon>
                </span>
              </li>
            ))}
          </ol>
          <PagePicker onPick={add} suggested={missingPages(plan)} />
        </nav>
      </div>
      {open && <Chooser {...open} onClose={() => setChoose(undefined)} />}
    </StepFrame>
  )
}

// Everywhere on Pages a part is titled by its name, with its job (and its design, if it has several) under it.
const partSub = (id: SectionId, variant?: string) => { const v = variant && sectionVariants[id]?.options.find((o) => o.id === variant); return v ? `${jobOf(id)} · ${v.name}` : jobOf(id) }
const designsOf = (id: SectionId) => { const n = sectionVariants[id]?.options.length ?? 0; return n > 1 ? `${n} designs` : '' }

// ─── The toolbox (left): what you can put on this page ─────────────────────

/** Only adds, never changes what is on the page (that opens from the page itself, in the chooser). Two tabs and one
 *  search. Parts: your Collection — parts, first screens, menus and footers, each collected site's parts — then All
 *  parts. Effects: On every page (what links, headlines, the main button… do — each opens the chooser), then every
 *  effect that goes on one part, grouped by what it does, collected ones first. Everything is a picture, two across:
 *  dragged onto the page (a part to a spot, an effect onto a part) or added with +. */
function Panel({ plan, page, look, c, sites, placed, onSite, onDrag, onDragEnd, onAdd, onEffect, onHero, onChrome, navId, footerId }: {
  plan: KitPlan; page: PlanPage; look: Look; c: Collection; sites: SiteRef[]; placed: number; onSite: (b: BehaviourId) => void
  onDrag: (e: DragEvent, d: Drag) => void; onDragEnd: () => void; onAdd: (d: Exclude<Drag, { t: 'move' } | { t: 'effect' }>) => void; onEffect: (id: PieceId) => void
  onHero: (id: HeroId) => void; onChrome: (k: 'nav' | 'footer', id: string) => void; navId: string; footerId: string
}) {
  const [tab, setTab] = useState<'parts' | 'effects'>('parts')
  const [q, setQ] = useState('')
  const parts = useMemo(() => sites.map((r) => {
    const recipe = composeRecipe(siteSpec(r)!), seen = new Set<string>()
    return { site: r, list: recipe.pages.flatMap((p) => p.sections).filter((s) => s.id !== 'hero' && s.id !== 'navbar' && s.id !== 'footer').filter((s) => { const k = `${s.id}:${s.variant?.id ?? ''}`; if (seen.has(k)) return false; seen.add(k); return true }) }
  }), [sites.join('|')]) // eslint-disable-line react-hooks/exhaustive-deps
  const of = <K extends CollectionItem['kind']>(k: K) => c.items.filter((i): i is Extract<CollectionItem, { kind: K }> => i.kind === k)
  const on = (id: SectionId, variant?: string) => page.sections.some((s) => s.id === id && (!variant || s.variant === variant))
  const hit = (...t: string[]) => !q || t.join(' ').toLowerCase().includes(q.trim().toLowerCase())
  // A taken part keeps the look of the site it was taken from (what was taken is what is seen); anything else its sample.
  const sample = (i: CollectionItem) => ('from' in i && i.from ? lookOfSite(i.from) : sampleLook(i, plan.purpose))
  // One tile: the picture, its name under it, and + (or ⇄ for what replaces) over its corner; a tick once it is here.
  const tile = (key: string, item: CollectionItem, lk: Look, label: string, sub: string, d: Drag | undefined, act: () => void, done: boolean, verb = 'Add', badge?: string) => (
    <li key={key} draggable={!!d} onDragStart={d ? (e) => onDrag(e, d) : undefined} onDragEnd={onDragEnd} className={`group relative min-w-0 ${d ? 'cursor-grab active:cursor-grabbing' : ''}`}>
      <div className={`overflow-hidden rounded-md border bg-white transition-colors ${done ? 'border-pencil/40' : 'border-line group-hover:border-ink'}`}>
        <LazyMount className="pointer-events-none aspect-[16/10] overflow-hidden"><ItemPreview item={item} look={lk} /></LazyMount>
      </div>
      <p className="mt-1.5 line-clamp-2 text-[13px] font-medium leading-tight">{label}{badge && <span className="ml-1 align-middle rounded-[3px] bg-pencil/10 px-1.5 py-px text-[10px] font-medium text-pencil">{badge}</span>}</p>
      {sub && <p className="mt-0.5 truncate text-[11px] text-muted" title={sub}>{sub}</p>}
      <button type="button" disabled={done} onClick={act} aria-label={done ? `${label}: already here` : `${verb} ${label}`} title={done ? 'Already on this page' : verb === 'Use' ? 'Use this one' : `Add to ${page.label}`}
        className={`absolute right-1.5 top-1.5 grid size-7 place-items-center rounded-full shadow-sm transition ${done ? 'bg-pencil text-paper' : 'bg-white text-ink hover:bg-ink hover:text-paper md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100'}`}>
        {done ? <Check size={14} aria-hidden /> : verb === 'Use' ? <ArrowLeftRight size={13} aria-hidden /> : <Plus size={15} aria-hidden />}
      </button>
    </li>
  )
  const grid = (list: React.ReactNode[]) => <ul className="grid grid-cols-2 gap-x-3 gap-y-4">{list}</ul>
  const group = (title: string, list: React.ReactNode[], note?: string) => !list.length ? null : (
    <section key={title} aria-label={title}><p className="mb-2 text-xs font-medium text-muted">{title}{note && <span className="font-normal"> · {note}</span>}</p>{grid(list)}</section>
  )

  // Parts: the Collection, each collected site's parts, then everything OpusKit has (one design each; the others are a pick away).
  const site = (r: SiteRef, s: (typeof parts)[number]['list'][number]) => tile(`${r}:${s.id}:${s.variant?.id ?? ''}`, { kind: 'section', id: s.id, ...(s.variant ? { variant: s.variant.id } : {}) }, lookOfSite(r), sections[s.id].name, partSub(s.id, s.variant?.id), { t: 'part', id: s.id, variant: s.variant?.id, from: r }, () => onAdd({ t: 'part', id: s.id, variant: s.variant?.id, from: r }), on(s.id, s.variant?.id))
  const mine = [
    group('Parts', of('section').filter((i) => hit(sections[i.id].name, jobOf(i.id))).map((i) => tile(itemKey(i), i, sample(i), sections[i.id].name, partSub(i.id, i.variant), { t: 'part', id: i.id, variant: i.variant }, () => onAdd({ t: 'part', id: i.id, variant: i.variant }), on(i.id, i.variant)))),
    group('First screens', of('hero').filter((i) => hit(itemName(i), 'first screen')).map((i) => tile(itemKey(i), i, sample(i), itemName(i), page.sections.some((s) => s.id === 'hero') ? 'Replaces the first screen' : 'Adds a first screen', { t: 'hero', id: i.id }, () => onHero(i.id), page.sections.some((s) => s.id === 'hero' && heroOf(plan, s) === i.id), 'Use'))),
    group('Menu & footer', [...of('menu').filter((i) => hit(itemName(i), 'menu')).map((i) => tile(itemKey(i), i, sample(i), itemName(i), 'Every page', undefined, () => onChrome('nav', i.id), navId === i.id, 'Use')), ...of('footer').filter((i) => hit(itemName(i), 'footer')).map((i) => tile(itemKey(i), i, sample(i), itemName(i), 'Every page', undefined, () => onChrome('footer', i.id), footerId === i.id, 'Use'))]),
    ...parts.map(({ site: r, list }) => {
      // This page's kind on that site first; everything else it has folded below.
      const here = sitePageParts(r, page.type), isHere = (s: (typeof list)[number]) => here.some((h) => h.id === s.id && (h.variant ?? '') === (s.variant?.id ?? ''))
      const found = list.filter((s) => hit(sections[s.id].name, jobOf(s.id), siteName(r)))
      const top = found.filter(isHere), more = found.filter((s) => !isHere(s))
      if (!found.length) return null
      return q ? group(`From ${siteName(r)}`, found.map((s) => site(r, s))) : (
        <Fold key={r} title={`From ${siteName(r)}`} sub={top.length ? `its ${pageTypes[page.type].name.toLowerCase()} page · ${top.length}` : `${list.length} parts`} open={!!top.length}>
          {!!top.length && grid(top.map((s) => site(r, s)))}
          {!!more.length && (top.length ? <div className="mt-3"><Fold title={`More from ${siteName(r)}`} sub={`${more.length}`} small>{grid(more.map((s) => site(r, s)))}</Fold></div> : grid(more.map((s) => site(r, s))))}
        </Fold>
      )
    }),
  ].filter(Boolean)
  const all = [
    group('First screens', EFFECTS.filter((e) => hit(e.name, e.line, 'first screen')).map((e) => tile(`a:h:${e.hero}`, { kind: 'hero', id: e.hero }, sample({ kind: 'hero', id: e.hero }), e.name, e.lead === 'video' ? 'Needs a film' : 'First screen', { t: 'hero', id: e.hero }, () => onHero(e.hero), page.sections.some((s) => s.id === 'hero' && heroOf(plan, s) === e.hero), 'Use'))),
    group('Menu', Object.values(navStyles).filter((n) => hit(n.name, n.line, 'menu')).map((n) => tile(`a:m:${n.id}`, { kind: 'menu', id: n.id }, sample({ kind: 'menu', id: n.id }), n.name, 'Every page', undefined, () => onChrome('nav', n.id), navId === n.id, 'Use'))),
    ...sectionGroups.map((g) => group(g.job, g.ids.filter((id) => hit(sections[id].name, g.name, g.job)).map((id) => tile(`a:s:${id}`, { kind: 'section', id }, sample({ kind: 'section', id }), sections[id].name, designsOf(id), { t: 'part', id }, () => onAdd({ t: 'part', id }), on(id))))),
    group('Footer', Object.values(footerStyles).filter((f) => hit(f.name, f.line, 'footer')).map((f) => tile(`a:f:${f.id}`, { kind: 'footer', id: f.id }, sample({ kind: 'footer', id: f.id }), f.name, 'Every page', undefined, () => onChrome('footer', f.id), footerId === f.id, 'Use'))),
  ].filter(Boolean)

  // Effects: the site-wide ones (each opens the chooser), then those that go on one part — collected first.
  const fx = of('effect').map((i) => i.id)
  const moments = (Object.keys(pieces) as PieceId[]).filter((id) => isMoment(id) && hit(pieces[id].name, pieces[id].line, pieceSlots[pieces[id].slot].name))
    .sort((a, b) => Number(fx.includes(b)) - Number(fx.includes(a)))
  const site_wide = BEHAVIOURS.filter((b) => hit(behaviours[b].name, ...behaviours[b].ids.map((id) => pieces[id].name)))
  const nEffects = Object.keys(pieces).length

  return (
    <aside className="order-last lg:sticky lg:top-36 lg:order-none lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-1 lg:[scrollbar-color:var(--color-line)_transparent] lg:[scrollbar-width:thin]" aria-label={`Add to ${page.label}`}>
      <div className="sticky top-0 z-10 space-y-2 bg-paper pb-3">
        <div role="tablist" aria-label="What to add" className="grid grid-cols-2 rounded-[3px] bg-paper-2 p-1 text-sm">
          {([['parts', 'Parts'], ['effects', 'Effects']] as const).map(([k, name]) => (
            <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
              className={`h-8 rounded-[3px] font-medium transition-colors ${tab === k ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>{name}</button>
          ))}
        </div>
        <label className="relative block"><span className="sr-only">{tab === 'parts' ? 'Search parts' : 'Search effects'}</span>
          <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
          <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tab === 'parts' ? 'Search parts — reviews, prices, FAQ…' : `Search ${nEffects} effects`} className="h-9 rounded-[3px] bg-white pl-8 text-sm" /></label>
        <p className="px-1 text-xs text-muted">{tab === 'parts' ? `Drag onto ${page.label}, or +.` : 'Drag onto a part, or +.'}</p>
      </div>
      {tab === 'parts' ? (
        <div className="space-y-6">
          {!!mine.length && <div className="space-y-5"><p className="text-sm font-medium">Your Collection <span className="font-normal text-muted">· {placed} of {c.items.length} on your pages</span></p>{mine}</div>}
          {!c.items.length && !q && <p className="text-sm text-muted">Nothing collected yet — collect sites in the <Link href="/library" className="link">Library</Link>, or pick from all parts below.</p>}
          <div className="space-y-5 border-t border-line pt-4">
            {q ? <>{all.length ? all : !mine.length && <p className="text-sm text-muted">Nothing matches “{q}”.</p>}</> : (
              <Fold title="All parts" sub="anything OpusKit has" open={!c.items.length}><div className="space-y-5">{all}</div></Fold>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {!!site_wide.length && (
            <section aria-label="On every page">
              <p className="text-sm font-medium">On every page</p>
              <p className="text-xs text-muted">How the whole site moves.</p>
              <ul className="mt-2 space-y-1.5">
                {site_wide.map((b) => {
                  const g = behaviours[b], now = picksOf(plan, b)
                  return (
                    <li key={b} className="group relative flex items-center gap-3 rounded-lg border border-line bg-white p-1.5 pr-2.5 transition-colors hover:border-ink">
                      <div aria-hidden className="pointer-events-none w-20 shrink-0 overflow-hidden rounded border border-line">
                        <LazyMount className="aspect-[16/10] overflow-hidden">{now[0] ? <ItemPreview item={{ kind: 'effect', id: now[0] }} look={look} /> : <Plain small b={b} look={look} />}</LazyMount>
                      </div>
                      <button type="button" onClick={() => onSite(b)} className="min-w-0 flex-1 text-left after:absolute after:inset-0 after:rounded-lg">
                        <span className="flex items-center justify-between gap-2 text-xs text-muted">{g.name}<span className="inline-flex items-center gap-0.5 group-hover:text-ink">{g.ids.length}<ArrowRight size={11} aria-hidden /></span></span>
                        <span className={`line-clamp-2 block text-[13px] font-medium leading-snug ${now.length ? '' : 'text-ink-2'}`}>{now.length ? now.map((id) => pieces[id].name).join(', ') : g.many ? 'No extras' : g.none}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )}
          <section aria-label="On one part" className="space-y-5 border-t border-line pt-4">
            <div><p className="text-sm font-medium">On one part</p><p className="text-xs text-muted">Each goes on the part you drop it on.</p></div>
            {[...new Set(moments.map((id) => pieces[id].slot))].map((slot) => group(pieceSlots[slot].name, moments.filter((id) => pieces[id].slot === slot).map((id) =>
              tile(`fx:${id}`, { kind: 'effect', id }, sample({ kind: 'effect', id }), pieces[id].name, pieces[id].line, { t: 'effect', id }, () => onEffect(id), page.sections.some((s) => s.pieces.includes(id)), 'Add', fx.includes(id) ? 'Collected' : undefined))))}
            {!moments.length && !site_wide.length && <p className="text-sm text-muted">Nothing matches “{q}”.</p>}
          </section>
        </div>
      )}
    </aside>
  )
}

// ─── On every page: what links, headlines, the main button… do ──────────────

const BEHAVIOURS = Object.keys(behaviours) as BehaviourId[]
const picksOf = (plan: KitPlan, b: BehaviourId) => behaviours[b].many ? behaviours[b].ids.filter((id) => (plan.sitePieces ?? []).includes(id)) : [behaviourPick(plan, b)].filter((x): x is PieceId => !!x)

/** A behaviour left at its plain state, drawn where it can be (links: the plain underline), else said in a line. */
function Plain({ b, look, small }: { b: BehaviourId; look: Look; small?: boolean }) {
  if (b === 'links') return <LinkDemo colors={look.colors} type={look.type} shape={look.shape} brand={look.brand} />
  const g = behaviours[b]
  return <span className={`grid size-full place-items-center px-3 text-center ${small ? 'text-[11px]' : 'text-xs'}`} style={{ background: look.colors.background, color: look.colors.muted }}>{small ? 'Off' : g.many ? 'Nothing extra' : g.none}</span>
}

// ─── The menu and the footer: the frame every page shares ───────────────────

/** Locked in place (top and bottom, the same on every page); a page can leave either out. */
function ChromeRow({ c, page, onPick, styleName, preview }: { c: ChromeId; page: PlanPage; onPick: () => void; styleName: string; preview: React.ReactNode }) {
  const hidden = !!page.hide?.includes(c), name = c === 'navbar' ? 'Menu' : 'Footer'
  return (
    <div className={`relative flex items-center gap-4 rounded-lg border p-2 pr-3 transition-[box-shadow,border-color] ${hidden ? 'border-dashed border-line bg-transparent hover:border-ink/40' : 'border-line bg-paper-2/60 hover:border-ink/40'}`}>
      <button type="button" onClick={onPick} aria-label={`Change the ${name.toLowerCase()}`} className="absolute inset-0 cursor-pointer rounded-lg" />
      <LazyMount className={`pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line sm:w-44 ${hidden ? 'opacity-30' : ''}`}>{preview}</LazyMount>
      <div className="min-w-0 flex-1">
        <p className={`flex items-center gap-1.5 font-medium leading-snug ${hidden ? 'text-muted' : ''}`}><Lock size={13} className="text-muted" aria-hidden />{name}</p>
        <p className="mt-0.5 truncate text-sm text-muted">{hidden ? `Not on ${page.label}` : `${styleName} · the same on every page`}</p>
      </div>
      <button type="button" onClick={() => change(hidden ? `${name} back on ${page.label}` : `${name} left out of ${page.label}`, (p) => toggleChrome(p, page.id, c))}
        className="relative z-10 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[3px] px-3 text-sm text-ink-2 hover:bg-black/5 hover:text-ink" aria-pressed={!hidden}>
        {hidden ? <EyeOff size={15} aria-hidden /> : <Eye size={15} aria-hidden />}<span className="max-sm:sr-only">{hidden ? 'Hidden' : 'Shown'}</span>
      </button>
      <button type="button" onClick={onPick} className="relative z-10 inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[3px] border border-line bg-white px-3 text-sm text-ink-2 hover:border-ink hover:text-ink"><ArrowLeftRight size={14} aria-hidden />Change</button>
    </div>
  )
}

// ─── What a part says and shows: the plan in words, from the recipe's copy deck and shot list ───

function PartBrief({ part, page, pages, shots }: { part: PlanSection; page: PlanPage; pages: number; shots: Shot[] }) {
  const at = `${pages > 1 ? `${page.label} · ` : ''}${part.id === 'hero' ? 'First screen' : sections[part.id].name}`
  const shot = shots.find((x) => x.where.split('; ').some((w) => w === at || w.startsWith(`${at} — `)))
  const says = part.id === 'hero' ? sections.hero.content : sections[part.id].content
  const rows: [string, string][] = [['Says', says], ...(shot ? [[shot.kind === 'film' ? 'Shows · film' : 'Shows', `${shot.shows[0].toUpperCase()}${shot.shows.slice(1)} — ${shot.count > 1 ? `${shot.count} photos${shot.per ? ` per ${shot.per}` : ''}, ` : ''}${shot.ratio ?? ''}`] as [string, string]] : [])]
  return (
    <dl className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k} className={`bg-white px-3 py-2 ${rows.length === 1 ? 'sm:col-span-2' : ''}`}>
          <dt className="label text-muted">{k}</dt>
          <dd className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink-2" title={v}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

// ─── What belongs on one part: an effect, your photos, your film ─────────────

const placeOf = (page: PlanPage, part: PlanSection) => `${page.label} · ${part.id === 'hero' ? 'First screen' : jobOf(part.id)}`

function PartExtras({ plan, page, part, collectedFx, onChange }: { plan: KitPlan; page: PlanPage; part: PlanSection; collectedFx: PieceId[]; onChange: () => void }) {
  const photoInput = useRef<HTMLInputElement>(null), filmInput = useRef<HTMLInputElement>(null)
  const fits = piecesFor(part).sort((a, b) => Number(collectedFx.includes(b)) - Number(collectedFx.includes(a)))
  const hero = part.id === 'hero' ? heroOf(plan, part) : undefined
  const photos = PHOTO_SECTIONS.includes(part.id) || MEDIA_SECTIONS.includes(part.id) || (part.id === 'hero' && !FILM.has(hero!) && !NO_PHOTOS.has(hero!))
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
  const nPhotos = mine.filter((u) => u.kind === 'image').length, hasFilm = mine.some((u) => u.kind === 'video')
  const chip = 'inline-flex h-7 items-center gap-1.5 rounded-[3px] border px-2.5 text-xs transition-colors'
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-t border-line pt-2">
      <button type="button" onClick={onChange} className={`${chip} border-line text-ink-2 hover:border-ink hover:text-ink`}><ArrowLeftRight size={12} aria-hidden />{part.id === 'hero' ? 'Other first screens' : 'Other designs'}</button>
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

/** Effects for one part, shown — not listed: each one moving (a real site where there is one, else drawn in its own
 *  look), grouped by what it does; one per group on a part, so picking another swaps it. Collected ones lead and say so. */
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
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-flex h-7 items-center gap-1.5 rounded-[3px] border border-line px-2.5 text-xs text-ink-2 transition-colors hover:border-ink hover:text-ink"><Sparkles size={12} aria-hidden />{part.pieces.length ? 'Effects' : 'Add an effect'}</button>
      {open && <Chooser many onClose={() => setOpen(false)} title={`Effects for ${part.id === 'hero' ? 'the first screen' : jobOf(part.id).toLowerCase()}`} line={`${page.label} · one per group — tap again to take it off.`}
        groups={slots.map((slot) => ({ title: pieceSlots[slot].name, sub: pieceSlots[slot].line, options: options.filter((id) => pieces[id].slot === slot).map((id) => {
          const real = closestPiece(spec, id)
          return { key: id, label: pieces[id].name, sub: pieces[id].line, badge: collectedFx.includes(id) ? 'Collected' : undefined, on: part.pieces.includes(id), pick: () => pick(id),
            preview: real ? <TileClip match={real} className="aspect-[16/10]" /> : <ItemPreview item={{ kind: 'effect', id }} look={look} /> }
        }) }))} />}
    </>
  )
}

// ─── The chooser: one place where anything on the page is changed ───────────

type ChooserOption = { key: string; label: string; sub?: string; badge?: string; on: boolean; preview: React.ReactNode; pick: () => void; /** A real site built with this very option. */ proof?: Match }
type ChooserProps = { title: string; line: string; many?: boolean; groups: { title: string; sub?: string; options: ChooserOption[] }[] }

/** Opens from the thing clicked, never somewhere else on the screen: what it is now (marked "Now"), then every option
 *  drawn large enough to read — its name and its whole line, never cut off. A tap swaps it at once (with Undo); the
 *  chooser stays open so options can be compared, and Done closes it. */
function Chooser({ title, line, many, groups, onClose }: ChooserProps & { onClose: () => void }) {
  const now = groups.flatMap((g) => g.options).filter((o) => o.on).map((o) => o.label)
  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="flex max-h-[88vh] w-[min(94vw,68rem)] max-w-none flex-col gap-0 p-0 sm:max-w-none">
        <div className="border-b border-line px-6 py-5">
          <DialogTitle className="text-xl font-medium tracking-tight">{title}</DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted">{line}</DialogDescription>
        </div>
        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin]">
          {groups.filter((g) => g.options.length).map((g) => (
            <section key={g.title} aria-label={g.title}>
              <p className="text-sm font-medium">{g.title}{g.sub && <span className="font-normal text-muted"> · {g.sub}</span>}</p>
              <ul role={many ? 'group' : 'radiogroup'} aria-label={g.title} className="mt-3 grid gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.options.map((o) => (
                  <li key={o.key} className="group relative">
                    {/* The preview is a real section (it has its own buttons), so it sits beside the button, not in it; the
                        button's ::after covers the whole card. */}
                    <div className={`relative overflow-hidden rounded-lg border bg-white transition-shadow ${o.on ? 'border-pencil ring-2 ring-pencil' : 'border-line group-hover:border-ink'}`}>
                      <div aria-hidden><LazyMount className="pointer-events-none aspect-[16/10] overflow-hidden">{o.preview}</LazyMount></div>
                      {o.on && <span className="absolute left-2 top-2 inline-flex h-6 items-center gap-1 rounded-[3px] bg-pencil pl-1.5 pr-2 text-xs font-medium text-paper shadow-sm"><Check size={13} aria-hidden />{many ? 'On' : 'Now'}</span>}
                    </div>
                    <button type="button" role={many ? 'checkbox' : 'radio'} aria-checked={o.on} onClick={o.pick} className="mt-2 block w-full text-left after:absolute after:inset-0 after:rounded-lg">
                      <span className="flex items-center gap-2 text-sm font-medium">{o.label}{o.badge && <span className="rounded-[3px] bg-pencil/10 px-1.5 py-0.5 text-[10px] font-medium text-pencil">{o.badge}</span>}</span>
                      {o.sub && <span className="mt-0.5 block text-xs leading-relaxed text-muted">{o.sub}</span>}
                    </button>
                    {/* Proof, not a promise: where this very design went on a site built with OpusKit. */}
                    {o.proof && (
                      <div className="relative z-10 mt-2 flex items-center gap-2.5 border-t border-line pt-2">
                        <TileClip match={o.proof} className="aspect-[16/10] w-24 shrink-0 rounded-[2px]" />
                        <p className="text-xs leading-snug text-muted">Built with this design: <Link href={`/examples/${o.proof.example.slug}`} className="link text-ink-2">{o.proof.example.title.split(/ [—|] |, |: /)[0]}</Link></p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
          <p className="min-w-0 truncate text-sm text-muted">{now.length ? `Now: ${now.join(', ')}` : 'Nothing picked yet.'}</p>
          <DialogClose className="btn btn-ink btn-sm">Done</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

/** "Add a page", one quiet button: type to narrow the list (suggested pages first); Enter adds the first match, arrows
 *  move through it; a name that matches nothing is added as your own page. */
function PagePicker({ onPick, suggested }: { onPick: (type: PageTypeId, label?: string) => void; suggested: { type: PageTypeId; label: string }[] }) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const list = useRef<HTMLDivElement>(null)
  const match = (name: string) => !q || name.toLowerCase().includes(q.trim().toLowerCase())
  const sug = suggested.filter((x) => match(x.label))
  const found = pageGroups.map((g) => ({ ...g, ids: g.ids.filter((id) => match(pageTypes[id].name) && !sug.some((x) => x.type === id)) })).filter((g) => g.ids.length)
  const pick = (id: PageTypeId, label?: string) => { onPick(id, label); setOpen(false); setQ('') }
  const own = q.trim().slice(0, 60)
  const step = (e: React.KeyboardEvent, by: 1 | -1) => {
    const items = [...(list.current?.querySelectorAll<HTMLButtonElement>('button') ?? [])]
    const i = items.indexOf(document.activeElement as HTMLButtonElement)
    items[Math.max(0, Math.min(items.length - 1, i + by))]?.focus(); e.preventDefault()
  }
  return (
    <Popover open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQ('') }}>
      <PopoverTrigger className="mt-1 flex h-9 w-full items-center gap-1.5 rounded-md px-2.5 text-sm text-muted hover:bg-paper-2 hover:text-ink"><Plus size={14} aria-hidden />Add a page</PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-0" onKeyDown={(e) => { if (e.key === 'ArrowDown') step(e, 1); if (e.key === 'ArrowUp') step(e, -1) }}>
        <div className="flex items-center gap-2 border-b border-line px-3">
          <Search size={14} className="shrink-0 text-muted" aria-hidden />
          <input data-slot="search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (sug[0]) pick(sug[0].type, sug[0].label); else if (found[0]) pick(found[0].ids[0]); else if (own) pick('custom', own) } }}
            placeholder="Find a page, or name your own" aria-label="Search pages" className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted focus-visible:outline-none" />
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
          {own && <button type="button" onClick={() => pick('custom', own)} className="mt-1 flex w-full items-center gap-1.5 rounded-md border-t border-line px-2.5 py-2 text-left text-sm hover:bg-secondary focus:bg-secondary focus:outline-none"><Plus size={13} aria-hidden />Add “{own}” as your own page</button>}
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

function Icon({ label, disabled, small, onClick, children }: { label: string; disabled?: boolean; small?: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick} className={`grid ${small ? 'size-7' : 'size-8'} place-items-center rounded-full hover:bg-black/10 disabled:pointer-events-none disabled:opacity-25`}>{children}</button>
}
