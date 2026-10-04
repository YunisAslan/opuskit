'use client'
// Step 2 — Pages. One idea per column, so every step is obvious:
//   Left:   the pages (and Your files).
//   Middle: the page itself, top to bottom — the menu at the top and the footer at the bottom (the same on every page),
//           its parts in between, already filled with what that kind of page usually has. Drag to reorder.
//   Right:  one job at a time — either "Add to page" (the parts you can add; drag one into the page, or tap +), or,
//           with a part picked, "This part" (its look, its photos, its moments). Structure and effects never share a list.
// Site-wide behaviour (headlines, links, buttons) lives in Design.
import { ArrowDown, ArrowUp, Check, Eye, EyeOff, FileText, GripVertical, ImageUp, MoreHorizontal, Pencil, Plus, RotateCcw, Sparkles, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState, type DragEvent, type ReactNode } from 'react'
import { toast } from 'sonner'
import { LazyMount } from '@/components/LazyMount'
import { MediaSlots, missingLeadFile } from '@/components/MediaSlots'
import { OptionDemo } from '@/components/OptionDemo'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { DualShot, RealSiteClip } from '@/components/RealSiteClip'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { anySection, closestChrome, closestPiece, closestSection, closestSite, heroSite } from '@/features/kit/closest'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EFFECTS, footerStyles, imagePresentations, navStyles, pageTypes, sections, uiByPage } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { sectionVariants } from '@/data/section-variants'
import { sectionGuide } from '@/data/section-guide'
import { motionLevels } from '@/data/taxonomy'
import {
  addPage, addSection, addSuggested, effectOn, effectWhere, inferPurpose, isPhotoSection, isStandardPage, jobOf, pageGroups, piecesFor, placeSection,
  heroOf, heroTitle, libraryFor, planToSpec, setPartHero, setStyle, toggleChrome, removePage, removeSection, renamePage, replaceSection, resetPage, sectionPhotos, setPagePurpose, setSectionPhotos, setSectionVariant, swapOptions, togglePiece,
} from '@/features/kit/plan'
import { composeRecipe, recommendedNav } from '@/features/recipes/engine'
import { readPlan, updatePlan, writePlan } from '@/lib/kit'
import type { ChromeId, ImagePresentationId, KitPlan, PageTypeId, PieceId, SectionId } from '@/types/domain'
import { HeroPreview, heroName } from './HeroPreview'
import { lookOf } from './ProductVisual'

/** An example of what to ask for on each form or legal page. */
const ASK: Partial<Record<PageTypeId, string>> = {
  'sign-in': 'Google sign-in and a magic link, no password', 'sign-up': 'Just email and name; ask for the rest later',
  'privacy-policy': 'We use Stripe for payments and Plausible for stats', 'terms-of-service': 'Orders can be cancelled within 14 days',
  'cookie-policy': 'Only essential cookies, no banner tracking', accessibility: 'We aim for WCAG 2.2 AA; contact access@ for help',
  'not-found': 'A link back to the shop and a search box', account: 'Order history and saved addresses',
}
type Drag = { kind: 'new'; id: SectionId } | { kind: 'move'; key: string }

export function PagesStep({ plan, initialFocus }: { plan: KitPlan; initialFocus?: string | null }) {
  const look = lookOf(plan)
  const main = plan.pages.filter((p) => p.sections.length || !isStandardPage(p.type))
  const standard = plan.pages.filter((p) => !main.includes(p))
  const [pageId, setPageId] = useState<string | undefined>(main[0]?.id ?? plan.pages[0]?.id)
  const page = plan.pages.find((p) => p.id === pageId) ?? main[0] ?? plan.pages[0]
  // ?shelf=first-screen (a recipe's "Change first screen") opens the first page with its first screen picked.
  const [selKey, setSelKey] = useState<string | undefined>(() => (initialFocus === 'first-screen' ? plan.pages[0]?.sections.find((s) => s.id === 'hero')?.key : undefined))
  const sel = page?.sections.find((s) => s.key === selKey)
  const [drag, setDrag] = useState<Drag | null>(null)
  const [dropAt, setDropAt] = useState<number | null>(null)
  const [renaming, setRenaming] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [briefOpen, setBriefOpen] = useState(false)
  const [view, setView] = useState<'page' | 'files'>(initialFocus === 'files' ? 'files' : 'page')
  // The right column does one job at a time, and says which: adding parts, or editing the part picked in the page.
  const [tab, setTab] = useState<'add' | 'edit'>(initialFocus === 'first-screen' ? 'edit' : 'add')
  const [editTab, setEditTab] = useState<'effects' | 'design' | 'photos'>()
  // A part just added or changed: the page scrolls to it and it glows for a moment, so a change is never silent.
  const [flash, setFlash] = useState<string>()
  const [justAdded, setJustAdded] = useState<SectionId>()
  // A new job in the right column starts at its top.
  const panel = useRef<HTMLElement>(null)
  useEffect(() => { panel.current?.scrollTo({ top: 0 }) }, [tab, selKey])
  const pick = (key?: string, t?: 'effects' | 'design' | 'photos') => { setSelKey(key); setTab(key ? 'edit' : 'add'); setEditTab(t) }
  const land = (key: string) => {
    setFlash(key)
    requestAnimationFrame(() => document.querySelector(`[data-part="${key}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
    setTimeout(() => setFlash((k) => (k === key ? undefined : k)), 1800)
  }
  const spec = planToSpec(plan)
  const lead = missingLeadFile(spec)
  const fileCount = (plan.uploads ?? []).length
  const navId = plan.nav ?? recommendedNav({ purpose: spec.purpose, direction: look.d.id }), navName = navStyles[navId].name
  // Previews dress as the user's kind of site (a café sees cups, a shop sees products) and carry its name.
  const pv = { colors: look.colors, type: look.type, shape: look.shape, chapters: look.chapters, world: worldFor(inferPurpose(plan)), brand: plan.name || undefined, layout: spec.layout }
  // Each part as the recipe will place it: its tone (ground / surface / inverse / chapter) and media placement.
  const composed = composeRecipe(spec)
  const footerId = composed.chrome.footerStyle.id, footerName = composed.chrome.footerStyle.name
  const rhythmOf = (pageIdOf: string, i: number) => { const s = composed.pages.find((x) => x.id === pageIdOf)?.sections[i]; return { tone: s?.tone, media: s?.media, variant: s?.variant?.id } }
  const designOf = (pageIdOf: string, i: number) => composed.pages.find((x) => x.id === pageIdOf)?.sections[i]?.variant?.name
  const lookOfSection = (id: SectionId) => (id === 'hero' ? `film or image · ${heroName(plan.hero).toLowerCase()}` : sectionGuide[id]?.look ?? sections[id].name)
  const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1)

  // Every change can be undone from its toast; it also says what happened to moments the change touched.
  const change = (message: string, f: (p: KitPlan) => KitPlan) => {
    const before = readPlan(), after = f(before)
    writePlan(after)
    const notes = (Object.keys(pieces) as PieceId[]).filter((id) => effectOn(before, id) && !message.startsWith(pieces[id].name)).flatMap((id) => {
      const was = effectWhere(before, id), now = effectWhere(after, id)
      return now === was ? [] : [now ? `${pieces[id].name} moved to ${now}.` : `${pieces[id].name} turned off — the new part can’t carry it.`]
    })
    toast(message, { description: notes.join(' ') || undefined, action: { label: 'Undo', onClick: () => writePlan(before) } })
  }
  const openPage = (id: string) => { setPageId(id); pick(undefined); setRenaming(false); setView('page') }
  const addPageOf = (type: PageTypeId) => { let nid = ''; updatePlan((p) => { const r = addPage(p, type); nid = r.id; return r.plan }); openPage(nid) }

  if (!page) return null
  const edited = page.purpose !== pageTypes[page.type].defaultPurpose

  // Adds a part at a position (drop) or, from +, right after the picked part — else before the closing parts (FAQ, contact).
  const addPart = (id: SectionId, at?: number) => {
    let key: string | undefined
    const after = sel ? page.sections.indexOf(sel) + 1 : undefined
    change(`${cap(lookOfSection(id))} added to ${page.label}`, (p) => {
      const before = new Set(p.pages.find((x) => x.id === page.id)!.sections.map((x) => x.key))
      const pos = at ?? after
      const next = pos !== undefined ? addSection(p, page.id, id, pos) : addSuggested(p, page.id, id)
      key = next.pages.find((x) => x.id === page.id)!.sections.find((x) => !before.has(x.key))?.key
      return next
    })
    if (key) land(key)
    setJustAdded(id)
    setTimeout(() => setJustAdded((x) => (x === id ? undefined : x)), 1600)
  }

  // ─── drag and drop: a new part from the library, or a part moved within the page. Parts only mark where it would
  //     land (dropAt); the page list alone takes the drop, so one drag is one change. ───
  const endDrag = () => { setDrag(null); setDropAt(null) }
  const overPart = (e: DragEvent, i: number) => {
    if (!drag) return
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    setDropAt(e.clientY < r.top + r.height / 2 ? i : i + 1)
  }
  const drop = (e: DragEvent) => {
    e.preventDefault()
    const at = dropAt ?? page.sections.length
    if (drag?.kind === 'new') addPart(drag.id, at)
    else if (drag?.kind === 'move') updatePlan((p) => placeSection(p, page.id, drag.key, at))
    endDrag()
  }
  const line = (i: number) => (dropAt === i && drag ? <li key={`drop-${i}`} aria-hidden className="h-0.5 rounded-full bg-pencil" /> : null)

  // ─── small icon controls on a row (above the row's own click area) ───
  const iconBtn = (label: string, onClick: () => void, icon: ReactNode, disabled = false) => (
    <button type="button" aria-label={label} title={label} disabled={disabled} onClick={onClick}
      className="relative rounded p-1.5 text-muted hover:bg-paper hover:text-ink disabled:pointer-events-none disabled:opacity-25">{icon}</button>
  )
  const move = (k: string, to: number) => updatePlan((p) => placeSection(p, page.id, k, to))

  // ─── the menu and the footer: the same on every page that shows them; a page can leave either out ───
  const chromeRow = (c: ChromeId) => {
    const hidden = !!page.hide?.includes(c), on = selKey === `chrome:${c}`, name = c === 'navbar' ? 'Menu' : 'Footer'
    return (
      <li key={c} className={`group relative flex items-center gap-4 rounded-lg border p-2.5 ${on ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : hidden ? 'border-dashed border-line' : 'border-line'} ${hidden ? 'bg-transparent' : 'bg-paper'}`}>
        <span className="w-4 shrink-0" />
        <LazyMount className={`pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line ${hidden ? 'opacity-30' : ''}`}>
          {c === 'navbar' ? <OptionDemo id={`nav:${navId}`} colors={look.colors} type={look.type} shape={look.shape} /> : <SectionPreview id="footer" footer={footerId} {...pv} className="aspect-[16/10]" />}
        </LazyMount>
        <button type="button" aria-pressed={on} onClick={() => pick(on ? undefined : `chrome:${c}`)} className="min-w-0 flex-1 text-left after:absolute after:inset-0">
          <span className={`block text-sm font-medium ${hidden ? 'text-muted' : ''}`}>{name}</span>
          <span className="block truncate text-xs text-muted">{hidden ? `Not on ${page.label}` : `${c === 'navbar' ? navName : footerName} · same on every page`}</span>
        </button>
        {iconBtn(hidden ? `Show the ${name.toLowerCase()} on ${page.label}` : `Leave the ${name.toLowerCase()} out of ${page.label}`,
          () => change(hidden ? `${name} back on ${page.label}` : `${name} left out of ${page.label}`, (p) => toggleChrome(p, page.id, c)), hidden ? <EyeOff size={15} /> : <Eye size={15} />)}
      </li>
    )
  }

  // ─── one part of the page: what it is, what it carries (photos, effects), and its controls ───
  const part = (i: number) => {
    const s = page.sections[i], hero = s.id === 'hero', on = sel?.key === s.key, title = hero ? heroTitle(page, s) : jobOf(s.id)
    return (
      <li key={s.key} data-part={s.key} draggable
        onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', s.key); setDrag({ kind: 'move', key: s.key }) }} onDragEnd={endDrag}
        onDragOver={(e) => overPart(e, i)}
        className={`group relative flex items-center gap-4 rounded-lg border bg-white p-2.5 transition-shadow ${drag?.kind === 'move' && drag.key === s.key ? 'opacity-40' : ''} ${on ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : 'border-line hover:shadow-sm'} ${flash === s.key ? 'animate-[kit-flash_1.8s_ease-out]' : ''}`}>
        <span className="flex w-4 shrink-0 justify-center text-muted"><GripVertical size={14} className="cursor-grab opacity-40 group-hover:opacity-100" aria-hidden /></span>
        <LazyMount className="pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line">{hero ? <HeroPreview plan={plan} id={heroOf(plan, s)} /> : <SectionPreview id={s.id} {...pv} {...rhythmOf(page.id, i)} className="aspect-[16/10]" />}</LazyMount>
        <div className="min-w-0 flex-1">
          <button type="button" aria-pressed={on} onClick={() => pick(on ? undefined : s.key)} className="block w-full text-left after:absolute after:inset-0">
            <span className="block text-sm font-medium">{title}</span>
            <span className="block truncate text-xs text-muted">{hero ? heroName(heroOf(plan, s)) : cap(lookOfSection(s.id))}{designOf(page.id, i) ? ` · ${designOf(page.id, i)!.toLowerCase()}` : ''}{isPhotoSection(s.id) ? ` · photos as ${imagePresentations[sectionPhotos(plan, s).id].name.toLowerCase()}` : ''}</span>
          </button>
          {(s.pieces.length > 0 || (hero && lead) || piecesFor(s).length > 0) && (
            <span className="relative mt-1.5 flex flex-wrap gap-1">
              {s.pieces.map((id) => (
                <span key={id} className="inline-flex items-center gap-1 rounded-full bg-pencil-soft py-0.5 pl-2 pr-1 text-[11px] text-pencil">
                  <Sparkles size={10} aria-hidden />{pieces[id].name}
                  <button type="button" aria-label={`Remove ${pieces[id].name}`} className="rounded-full p-0.5 hover:bg-white" onClick={() => change(`${pieces[id].name} removed from ${title.toLowerCase()}`, (p) => togglePiece(p, page.id, s.key, id))}><X size={10} /></button>
                </span>
              ))}
              {piecesFor(s).length > 0 && <button type="button" onClick={() => pick(s.key, 'effects')} className="inline-flex items-center gap-1 rounded-full border border-dashed border-pencil/50 px-2 py-0.5 text-[11px] text-pencil hover:bg-pencil-soft"><Plus size={10} aria-hidden />Effect</button>}
              {hero && lead && <button type="button" onClick={() => setView('files')} className="inline-flex items-center gap-1 rounded-full border border-pencil/40 px-2 py-0.5 text-[11px] text-pencil hover:bg-pencil-soft"><ImageUp size={10} aria-hidden />Add your {lead.asset === '3d' ? '3D scene' : 'video'}</button>}
            </span>
          )}
        </div>
        <span className={`flex shrink-0 items-center ${on ? '' : 'lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100'}`}>
          {iconBtn(`Move ${title} up`, () => move(s.key, i - 1), <ArrowUp size={15} />, i === 0)}
          {iconBtn(`Move ${title} down`, () => move(s.key, i + 2), <ArrowDown size={15} />, i === page.sections.length - 1)}
          {iconBtn(`Remove ${title}`, () => { change(`${cap(lookOfSection(s.id))} removed`, (p) => removeSection(p, page.id, s.key)); if (on) pick(undefined) }, <X size={15} />)}
        </span>
      </li>
    )
  }

  // ─── right panel: every option is a large, real preview — small thumbnails don't say enough ───
  // Section previews render at a narrower virtual width than the page, so they read larger in the panel.
  const PANEL_W = 1100
  const sectionShot = (id: SectionId, x: ReturnType<typeof rhythmOf> = { tone: undefined, media: undefined, variant: undefined }) => <LazyMount className="aspect-[16/10]"><SectionPreview id={id} {...pv} {...x} width={PANEL_W} className="aspect-[16/10]" /></LazyMount>
  const heroShot = (id: KitPlan['hero']) => <LazyMount className="aspect-[16/10]"><HeroPreview plan={plan} id={id} /></LazyMount>
  const effectShot = (id: PieceId) => <LazyMount className="aspect-video"><ScaledFrame width={420} className="aspect-video"><PieceDemo id={id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame></LazyMount>
  // Every option shows two things when a real site has it: that site, and the same thing drawn in your style (DualShot).
  // Menus are drawn only (MenuDemo: real words, a pointer that uses them) — a menu is too small in a recording.
  const sectionOption = (id: SectionId) => <DualShot real={anySection(spec, id)} drawn={sectionShot(id)} />
  const heroOption = (id: KitPlan['hero']) => <DualShot real={(id && heroSite(spec, id)) || undefined} drawn={heroShot(id)} />
  const effectOption = (id: PieceId) => <DualShot real={closestPiece(spec, id)} drawn={effectShot(id)} className="aspect-video" />
  const footerOption = (style: string) => <DualShot real={closestChrome({ ...spec, footer: style as never }, 'footer')}
    drawn={<LazyMount className="aspect-[16/10] overflow-hidden"><SectionPreview id="footer" footer={style as never} {...pv} width={PANEL_W} auto /></LazyMount>} />
  const photoShot = (id: ImagePresentationId) => <LazyMount className="overflow-hidden"><OptionDemo id={`photo:${id}`} colors={look.colors} type={look.type} shape={look.shape} /></LazyMount>
  const card = (key: string, current: boolean, onPick: () => void, shot: ReactNode, title: string, line?: string) => (
    <li key={key} className={`relative overflow-hidden rounded-lg border bg-white ${current ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : 'border-line hover:border-ink'}`}>
      <div className="pointer-events-none border-b border-line">{shot}</div>
      <button type="button" aria-pressed={current} onClick={onPick} className="block w-full px-3 py-2 text-left after:absolute after:inset-0">
        <span className="flex items-center justify-between gap-2 text-[13px] font-medium">{title}{current && <Check size={14} className="shrink-0" aria-hidden />}</span>
        {line && <span className="mt-0.5 line-clamp-2 block text-[11px] leading-snug text-muted">{line}</span>}
      </button>
    </li>
  )

  // Adding: every card adds itself (click, Enter, or drag it to a spot). The panel stays here so more can follow; the
  // page scrolls to the new part and it glows.
  const selTitle = sel ? (sel.id === 'hero' ? heroTitle(page, sel) : jobOf(sel.id)) : undefined
  const library = (
    <>
      <p className="font-medium">Add to {page.label}</p>
      <p className="mb-4 mt-0.5 text-xs text-muted">Click a card to add it {selTitle ? <>after <span className="text-ink">{selTitle}</span></> : 'before the closing parts'} — or drag it to the exact spot. What a {pageTypes[page.type].name} page usually has comes first.</p>
      <div className="space-y-5">
        {libraryFor(page.type).map((g) => (
          <section key={g.name} aria-label={g.job}>
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">{g.job}</p>
            <ul className="grid grid-cols-2 gap-2">
              {g.ids.map((id) => {
                const onPage = page.sections.some((s) => s.id === id), added = justAdded === id
                return (
                  <li key={id} draggable onDragStart={(e) => { e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setData('text/plain', id); setDrag({ kind: 'new', id }) }} onDragEnd={endDrag}
                    title={id === 'hero' ? 'Full width — at the top, or anywhere lower down' : sectionGuide[id] ? `Best when ${sectionGuide[id]!.bestWhen}` : sections[id].purpose}
                    className={`group relative overflow-hidden rounded-lg border bg-white transition-colors ${added ? 'border-pencil' : 'border-line hover:border-ink'}`}>
                    <div className="pointer-events-none border-b border-line">{id === 'hero' ? heroOption(plan.hero) : sectionOption(id)}</div>
                    <button type="button" onClick={() => addPart(id)} aria-label={`Add ${lookOfSection(id)} to ${page.label}`}
                      className="block w-full px-2 py-1.5 text-left text-[12px] font-medium leading-tight after:absolute after:inset-0">
                      {cap(lookOfSection(id))}
                      {onPage ? <span className="block text-[10px] font-normal text-muted">On this page</span> : g.usual.includes(id) && <span className="block text-[10px] font-normal text-pencil">Usual on {pageTypes[page.type].name}</span>}
                    </button>
                    <span className={`pointer-events-none absolute right-1.5 top-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium shadow-sm transition-opacity ${added ? 'bg-pencil text-white opacity-100' : 'bg-white text-ink opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'}`}>
                      {added ? <><Check size={11} aria-hidden />Added</> : <><Plus size={11} aria-hidden />Add</>}
                    </span>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  )

  // The menu or the footer: on this page or not, and its look (the same on every page).
  const chromeInspector = (c: ChromeId) => {
    const hidden = !!page.hide?.includes(c), name = c === 'navbar' ? 'Menu' : 'Footer'
    const real = closestChrome(spec, c)
    return (
      <>
        <p className="font-medium">{name}</p>
        {real && <div className="mt-3"><RealSiteClip match={real} label={`This ${name.toLowerCase()} on a real site`} /></div>}
        <label className="mt-3 flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2.5 text-sm">
          <Checkbox checked={!hidden} onCheckedChange={() => change(hidden ? `${name} back on ${page.label}` : `${name} left out of ${page.label}`, (p) => toggleChrome(p, page.id, c))} />
          Show on {page.label}
        </label>
        <p className="mb-2 mt-5 text-xs text-muted">Its look — the same on every page that shows it.</p>
        <ul className="space-y-2">
          {c === 'navbar'
            ? Object.values(navStyles).map((x) => card(x.id, navId === x.id, () => change(`Menu: ${x.name}`, (p) => setStyle(p, 'nav', x.id)), <OptionDemo id={`nav:${x.id}`} colors={look.colors} type={look.type} shape={look.shape} />, x.name, x.line))
            : Object.values(footerStyles).map((x) => card(x.id, footerId === x.id, () => change(`Footer: ${x.name}`, (p) => setStyle(p, 'footer', x.id)), footerOption(x.id), x.name, x.line))}
        </ul>
      </>
    )
  }

  // A part picked: the part as it is now (real site ↔ your style), then one question at a time in tabs — effects first,
  // since nowhere else offers them.
  const inspector = sel && (() => {
    const hero = sel.id === 'hero'
    const i = page.sections.indexOf(sel)
    const title = hero ? heroTitle(page, sel) : jobOf(sel.id)
    const moments = piecesFor(sel)
    const looks = hero ? [] : [sel.id, ...swapOptions(page, sel.id).job]
    const ph = !hero && isPhotoSection(sel.id) ? sectionPhotos(plan, sel) : undefined
    const rhythm = rhythmOf(page.id, i)
    const designs = hero ? undefined : sectionVariants[sel.id]
    const real = hero ? closestSite(spec) : closestSection(spec, sel.id)
    // The site's first film/image part is its first screen; any other one shows a pick of its own.
    const lead = hero && plan.pages.flatMap((p) => p.sections).find((x) => x.id === 'hero')?.key === sel.key
    const bestWhen = (id: SectionId) => (sectionGuide[id] ? `Best when ${sectionGuide[id]!.bestWhen}` : sections[id].purpose)
    const tabs = ([
      moments.length > 0 && ['effects', `Effects${sel.pieces.length ? ` · ${sel.pieces.length}` : ''}`],
      (hero || looks.length > 1 || designs) && ['design', hero ? 'What it shows' : 'Other designs'],
      ph && ['photos', 'Photos'],
    ].filter(Boolean)) as ['effects' | 'design' | 'photos', string][]
    const t = tabs.find(([k]) => k === editTab)?.[0] ?? tabs[0]?.[0]
    const changed = (m: string, f: (p: KitPlan) => KitPlan) => { change(m, f); land(sel.key) }
    return (
      <>
        <p className="text-xs text-muted">Part {i + 1} of {page.label}</p>
        <p className="font-medium">{title}</p>
        <figure className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
          <DualShot real={real} drawn={<div className="pointer-events-none">{hero ? heroShot(heroOf(plan, sel)) : sectionShot(sel.id, rhythmOf(page.id, i))}</div>} />
          <figcaption className="px-3 py-2 text-xs text-muted">{hero ? heroName(heroOf(plan, sel)) : cap(lookOfSection(sel.id))}{ph ? ` · photos as ${imagePresentations[ph.id].name.toLowerCase()}` : ''}{sel.pieces.length ? ` · ${sel.pieces.map((id) => pieces[id].name).join(', ')}` : ''}</figcaption>
        </figure>

        {tabs.length > 0 && (
          <div role="tablist" aria-label={`Change ${title}`} className="mt-4 flex gap-1 border-b border-line">
            {tabs.map(([k, label]) => (
              <button key={k} type="button" role="tab" aria-selected={t === k} onClick={() => setEditTab(k)}
                className={`-mb-px border-b-2 px-2.5 py-2 text-sm ${t === k ? 'border-ink font-medium text-ink' : 'border-transparent text-muted hover:text-ink'}`}>{label}</button>
            ))}
          </div>
        )}
        <div role="tabpanel" className="pt-3">
          {t === 'effects' && <>
            <p className="mb-2 text-xs text-muted">Something that moves on this part only — the same part elsewhere keeps its own. Add as many as you like; two that move the same thing (say, two headline effects) can’t share it, so the new one takes over and says so.</p>
            <ul className="space-y-2">{moments.map((id) => {
              const on = sel.pieces.includes(id)
              // Pieces sharing a slot animate the same element: picking one swaps out the other, never silently.
              const clash = on ? undefined : sel.pieces.find((x) => pieces[x].slot === pieces[id].slot)
              return card(id, on, () => changed(on ? `${pieces[id].name} removed from ${title.toLowerCase()}` : `${pieces[id].name} added to ${title.toLowerCase()}${clash ? ` — instead of ${pieces[clash].name}` : ''}`, (p) => togglePiece(p, page.id, sel.key, id)),
                effectOption(id), pieces[id].name, clash ? `Takes the place of ${pieces[clash].name} — both move the same thing.` : pieces[id].line)
            })}</ul>
          </>}
          {t === 'design' && (hero ? <>
            <p className="mb-2 text-xs text-muted">{lead ? <>{i === 0 ? 'What visitors see first on this page' : 'A full-width band at this spot'} — your site’s first screen: it sets the media you need.</> : <>This one only — your other film or image parts keep theirs. It needs its own media.</>}</p>
            <ul className="space-y-2">{[...(lead ? [undefined] : []), ...EFFECTS.map((e) => e.hero)].map((id) => card(id ?? 'look', heroOf(plan, sel) === id, () => {
              if (heroOf(plan, sel) === id) return
              const was = planToSpec(plan).motion
              changed(`${title}: ${heroName(id)}`, (p) => setPartHero(p, page.id, sel.key, id))
              const now = planToSpec(readPlan()).motion
              if (now !== was) toast(`Movement is now ${motionLevels[now].name} — this film or image works at that level.`)
            }, heroOption(id), heroName(id), id ? EFFECTS.find((e) => e.hero === id)!.line : `${look.d.name}’s own`))}</ul>
          </> : <>
            {designs && <>
              <p className="mb-2 text-xs text-muted">This part, laid out another way — same content.{sel.variant && <> <button type="button" className="link" onClick={() => changed(`${title}: back to ${look.d.name}’s own design`, (p) => setSectionVariant(p, page.id, sel.key, undefined))}>Use the recommendation</button></>}</p>
              <ul className="mb-5 grid grid-cols-2 gap-2">{designs.options.map((o) => card(o.id, rhythm.variant === o.id, () => changed(`${title}: ${o.name.toLowerCase()}`, (p) => setSectionVariant(p, page.id, sel.key, o.id)),
                sectionShot(sel.id, { ...rhythm, variant: o.id }), o.name, o.line))}</ul>
            </>}
            {looks.length > 1 && <p className="mb-2 text-xs text-muted">The same job, as another part. Your content and effects carry over when they fit.</p>}
            <ul className="space-y-2">{looks.length > 1 && looks.map((id) => card(id, id === sel.id, () => { if (id !== sel.id) changed(`${cap(lookOfSection(sel.id))} → ${lookOfSection(id)}`, (p) => replaceSection(p, page.id, sel.key, id)) }, sectionOption(id), cap(lookOfSection(id)), bestWhen(id)))}</ul>
          </>)}
          {t === 'photos' && ph && <>
            <p className="mb-2 text-xs text-muted">How the photos sit in this part only.{ph.chosen && <> <button type="button" className="link" onClick={() => changed('Photo layout back to the recommendation', (p) => setSectionPhotos(p, page.id, sel.key, undefined))}>Use the recommendation</button></>}</p>
            <ul className="grid grid-cols-2 gap-2">{Object.values(imagePresentations).map((x) => card(x.id, ph.id === x.id, () => changed(`${title}: photos as ${x.name}`, (p) => setSectionPhotos(p, page.id, sel.key, x.id)),
              photoShot(x.id), x.name, x.id === ph.recommended ? 'Recommended' : x.piece ? 'Ready code' : x.ideal))}</ul>
          </>}
        </div>
      </>
    )
  })()
  const chromeSel = selKey === 'chrome:navbar' ? 'navbar' : selKey === 'chrome:footer' ? 'footer' : undefined

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[13rem_minmax(0,1fr)_27rem] lg:items-start">
      {/* Pages */}
      <nav aria-label="Pages" className="min-w-0 space-y-3 lg:sticky lg:top-40">
        <button type="button" onClick={() => setView('files')} aria-current={view === 'files' ? 'page' : undefined}
          className={`flex w-full items-center justify-between gap-3 rounded-md border px-3 py-2 text-left text-sm ${view === 'files' ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`}>
          <span className="inline-flex items-center gap-2"><ImageUp size={15} aria-hidden />Your files</span>
          <span className={`text-xs ${view === 'files' ? 'text-paper/70' : lead ? 'text-pencil' : 'text-muted'}`}>{fileCount || (lead ? `Add ${lead.asset === '3d' ? '3D' : 'video'}` : 'Add')}</span>
        </button>
        {[main, standard].map((list, n) => list.length > 0 && (
          <div key={n}>
            {n === 1 && <p className="mb-1 px-3 text-[11px] uppercase tracking-wider text-muted">Forms & legal</p>}
            <ul className="flex gap-1 overflow-x-auto lg:flex-col">
              {list.map((p) => (
                <li key={p.id} className="shrink-0">
                  <button type="button" onClick={() => openPage(p.id)} aria-current={view === 'page' && p.id === page.id ? 'page' : undefined}
                    className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm ${view === 'page' && p.id === page.id ? 'bg-ink text-paper' : 'hover:bg-white'}`}>
                    <span className="truncate">{p.label}</span>{n === 0 && <span className={`text-xs tabular-nums ${view === 'page' && p.id === page.id ? 'text-paper/70' : 'text-muted'}`}>{p.sections.length}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Select value="" onValueChange={(v) => addPageOf(v as PageTypeId)}>
          <SelectTrigger className="w-full bg-white" aria-label="Add a page"><span className="inline-flex items-center gap-1.5 text-muted"><Plus size={14} aria-hidden />Add a page</span></SelectTrigger>
          <SelectContent className="max-h-80">
            {pageGroups.map((g) => (
              <SelectGroup key={g.name}><SelectLabel>{g.name}</SelectLabel>{g.ids.map((id) => <SelectItem key={id} value={id}>{pageTypes[id].name}</SelectItem>)}</SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </nav>

      {view === 'files' ? (
        <section aria-label="Your files" className="min-w-0 lg:col-span-2">
          <h2 className="text-lg font-medium">Your files</h2>
          <p className="mb-5 mt-1 max-w-2xl text-sm text-muted">Your logo, {spec.lead === 'video' ? 'your film, ' : spec.lead === '3d' ? 'your 3D scene, ' : ''}and the photos for the rest of the site. They go into your build kit at the exact paths the site uses; anything missing gets a clearly marked placeholder. Files stay in this browser.</p>
          <MediaSlots spec={spec} onChange={(m) => updatePlan((p) => ({ ...p, ...m }))} />
          <label className="mt-4 block max-w-2xl space-y-1.5 rounded-lg border border-line bg-white p-5 text-sm">
            <span className="font-medium">Anything about your photos? <span className="font-normal text-muted">(optional)</span></span>
            <Textarea value={plan.photoNote ?? ''} maxLength={400} rows={3} onChange={(e) => updatePlan((p) => ({ ...p, photoNote: e.target.value }))}
              placeholder="e.g. A 3D slider for the project photos. The team photo goes on About. Keep the before/after pairs side by side." />
          </label>
          <p className="mt-4 max-w-2xl text-sm text-muted">How photos are shown is chosen per part: pick a gallery, a collection or a work list on a page, then its Photos tab.</p>
        </section>
      ) : <>
        {/* The page itself: menu, its parts, footer */}
        <section aria-label={page.label} className="min-w-0">
          <div className="mb-4 flex items-center gap-1">
            {renaming
              ? <Input autoFocus value={page.label} aria-label="Page name" onChange={(e) => updatePlan((p) => renamePage(p, page.id, e.target.value))} onBlur={() => setRenaming(false)} onKeyDown={(e) => e.key === 'Enter' && setRenaming(false)} className="h-9 max-w-64 text-lg font-medium" />
              : <h2 className="text-lg font-medium">{page.label}</h2>}
            <Popover open={menuOpen} onOpenChange={setMenuOpen}>
              <PopoverTrigger className="rounded p-1.5 text-muted hover:bg-white hover:text-ink" aria-label={`${page.label} options`}><MoreHorizontal size={16} /></PopoverTrigger>
              <PopoverContent align="start" className="w-56 p-1 text-sm">
                {([
                  ['Rename page', <Pencil key="i" size={13} aria-hidden />, () => setRenaming(true)],
                  [`What this page does${edited ? ' · edited' : ''}`, <FileText key="i" size={13} aria-hidden />, () => setBriefOpen(true)],
                  ['Back to its usual parts', <RotateCcw key="i" size={13} aria-hidden />, () => change(`${page.label} reset`, (p) => resetPage(p, page.id))],
                  ['Delete page', <Trash2 key="i" size={13} aria-hidden />, () => { change(`${page.label} deleted`, (p) => removePage(p, page.id)); openPage(main.find((p) => p.id !== page.id)?.id ?? '') }, plan.pages.length === 1],
                ] as const).map(([label, icon, onClick, disabled]) => (
                  <button key={label} type="button" disabled={!!disabled} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left hover:bg-secondary disabled:opacity-30" onClick={() => { setMenuOpen(false); onClick() }}>{icon}{label}</button>
                ))}
              </PopoverContent>
            </Popover>
          </div>

          {/* The page's brief — the recipe hands it to the builder. Forms & legal pages are customised only here. */}
          <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
            <DialogContent className="bg-paper sm:max-w-lg">
              <DialogTitle>What {page.label} does</DialogTitle>
              <DialogDescription>Your recipe hands this to the builder as the page’s brief. Add anything specific it needs.</DialogDescription>
              <Textarea value={page.purpose} rows={4} maxLength={400} onChange={(e) => updatePlan((p) => setPagePurpose(p, page.id, e.target.value))}
                className="bg-white text-sm" placeholder={`e.g. ${ASK[page.type] ?? 'Keep it to one short screen, with a link back home'}`} />
              <div className="flex items-center justify-between text-sm">
                {edited ? <button type="button" className="link text-xs" onClick={() => change(`${page.label} brief reset`, (p) => setPagePurpose(p, page.id, pageTypes[page.type].defaultPurpose))}>Back to the usual brief</button> : <span />}
                <DialogClose className="rounded-full bg-ink px-4 py-1.5 text-paper">Done</DialogClose>
              </div>
            </DialogContent>
          </Dialog>

          <ol className={`space-y-2 rounded-xl border bg-white/40 p-3 transition-colors ${drag ? 'border-pencil border-dashed' : 'border-line'}`}
            onDragOver={(e) => { if (drag) { e.preventDefault(); if (e.target === e.currentTarget) setDropAt(page.sections.length) } }} onDrop={drop}>
            {chromeRow('navbar')}
            {page.sections.length ? page.sections.flatMap((_, i) => [line(i), part(i)]) : (
              <li className="rounded-lg border border-dashed border-line p-6 text-center text-sm text-muted" onDragOver={(e) => { if (drag) { e.preventDefault(); setDropAt(0) } }}>
                {isStandardPage(page.type)
                  ? <>{page.label} is written for you from your style{uiByPage[page.type]?.length ? <> with {uiByPage[page.type]!.map((c) => c.replace(/-/g, ' ')).join(', ')}</> : null}.  <button type="button" className="link" onClick={() => setBriefOpen(true)}>Tell it what this page needs</button> — e.g. “{ASK[page.type] ?? 'Keep it to one short screen, with a link back home'}”. Or drag parts here.</>
                  : <>Drag parts here from the right — or <button type="button" className="link" onClick={() => updatePlan((p) => resetPage(p, page.id))}>use the usual parts</button>.</>}
              </li>
            )}
            {page.sections.length > 0 && line(page.sections.length)}
            {chromeRow('footer')}
          </ol>
          <p className="mt-2 text-xs text-muted">Drag a part to move it. Click it to give it effects, another design or other photos.</p>
        </section>

        {/* Right: one job at a time */}
        <aside ref={panel} aria-label={tab === 'edit' ? 'This part' : 'Add to page'} className="min-w-0 rounded-xl border border-line bg-white/60 p-4 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin] lg:sticky lg:top-40 lg:max-h-[calc(100svh-11rem)] lg:overflow-y-auto">
          <div role="tablist" aria-label="What this column does" className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-secondary p-1 text-sm">
            <button type="button" role="tab" aria-selected={tab === 'add'} onClick={() => setTab('add')}
              className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 ${tab === 'add' ? 'bg-white font-medium shadow-sm' : 'text-ink-2 hover:text-ink'}`}><Plus size={14} aria-hidden />Add a part</button>
            <button type="button" role="tab" aria-selected={tab === 'edit'} disabled={!sel && !chromeSel} onClick={() => setTab('edit')} title={sel || chromeSel ? undefined : 'Click a part in the page to edit it'}
              className={`inline-flex min-w-0 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 disabled:opacity-45 ${tab === 'edit' ? 'bg-white font-medium shadow-sm' : 'text-ink-2 hover:text-ink'}`}>
              <Pencil size={13} aria-hidden /><span className="truncate">{chromeSel ? `Edit ${chromeSel === 'navbar' ? 'menu' : 'footer'}` : sel ? `Edit ${(sel.id === 'hero' ? heroTitle(page, sel) : jobOf(sel.id)).toLowerCase()}` : 'Edit a part'}</span>
            </button>
          </div>
          {tab === 'edit' && chromeSel ? chromeInspector(chromeSel) : tab === 'edit' && sel ? inspector : library}
        </aside>
      </>}
    </div>
  )
}
