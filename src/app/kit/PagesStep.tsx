'use client'
// Step 2 — Pages. One idea per column, so every step is obvious:
//   Left:   the pages (and Your files).
//   Middle: the page itself, top to bottom — the menu at the top and the footer at the bottom (the same on every page),
//           its parts in between, already filled with what that kind of page usually has. Drag to reorder.
//   Right:  one job at a time — either "Add to page" (the parts you can add; drag one into the page, or tap +), or,
//           with a part picked, "This part" (its look, its photos, its moments). Structure and effects never share a list.
// Site-wide behaviour (headlines, links, buttons) lives in Design.
import { ArrowDown, ArrowLeft, ArrowUp, Check, Eye, EyeOff, FileText, GripVertical, ImageUp, MoreHorizontal, Pencil, Plus, RotateCcw, Sparkles, Trash2, X } from 'lucide-react'
import { useState, type DragEvent, type ReactNode } from 'react'
import { toast } from 'sonner'
import { LazyMount } from '@/components/LazyMount'
import { MediaSlots, missingLeadFile } from '@/components/MediaSlots'
import { OptionDemo } from '@/components/OptionDemo'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { RealSiteClip } from '@/components/RealSiteClip'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { closestChrome, closestSection, closestSite } from '@/features/kit/closest'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { EFFECTS, footerStyles, imagePresentations, navStyles, pageTypes, sections, uiByPage } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { sectionGuide } from '@/data/section-guide'
import { motionLevels } from '@/data/taxonomy'
import {
  addPage, addSection, addSuggested, effectOn, effectWhere, inferPurpose, isPhotoSection, isStandardPage, jobOf, pageGroups, piecesFor, placeSection,
  heroTitle, libraryFor, planToSpec, setStyle, toggleChrome, removePage, removeSection, renamePage, replaceSection, resetPage, sectionPhotos, setHero, setPagePurpose, setSectionPhotos, swapOptions, togglePiece,
} from '@/features/kit/plan'
import { recommendedNav } from '@/features/recipes/engine'
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
  const spec = planToSpec(plan)
  const lead = missingLeadFile(spec)
  const fileCount = (plan.uploads ?? []).length
  const navId = plan.nav ?? recommendedNav({ purpose: spec.purpose, direction: look.d.id }), navName = navStyles[navId].name
  const footerId = spec.footer ?? 'signature', footerName = footerStyles[footerId].name
  // Previews dress as the user's kind of site (a café sees cups, a shop sees products) and carry its name.
  const pv = { colors: look.colors, type: look.type, shape: look.shape, chapters: look.chapters, world: worldFor(inferPurpose(plan)), brand: plan.name || undefined }
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
  const openPage = (id: string) => { setPageId(id); setSelKey(undefined); setRenaming(false); setView('page') }
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
    setSelKey(key)
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
        <button type="button" aria-pressed={on} onClick={() => setSelKey(on ? undefined : `chrome:${c}`)} className="min-w-0 flex-1 text-left after:absolute after:inset-0">
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
      <li key={s.key} draggable
        onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', s.key); setDrag({ kind: 'move', key: s.key }) }} onDragEnd={endDrag}
        onDragOver={(e) => overPart(e, i)}
        className={`group relative flex items-center gap-4 rounded-lg border bg-white p-2.5 transition-shadow ${drag?.kind === 'move' && drag.key === s.key ? 'opacity-40' : ''} ${on ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : 'border-line hover:shadow-sm'}`}>
        <span className="flex w-4 shrink-0 justify-center text-muted"><GripVertical size={14} className="cursor-grab opacity-40 group-hover:opacity-100" aria-hidden /></span>
        <LazyMount className="pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded-md border border-line">{hero ? <HeroPreview plan={plan} id={plan.hero} /> : <SectionPreview id={s.id} {...pv} className="aspect-[16/10]" />}</LazyMount>
        <div className="min-w-0 flex-1">
          <button type="button" aria-pressed={on} onClick={() => setSelKey(on ? undefined : s.key)} className="block w-full text-left after:absolute after:inset-0">
            <span className="block text-sm font-medium">{title}</span>
            <span className="block truncate text-xs text-muted">{hero ? heroName(plan.hero) : cap(lookOfSection(s.id))}{isPhotoSection(s.id) ? ` · photos as ${imagePresentations[sectionPhotos(plan, s).id].name.toLowerCase()}` : ''}</span>
          </button>
          {(s.pieces.length > 0 || (hero && lead)) && (
            <span className="relative mt-1.5 flex flex-wrap gap-1">
              {s.pieces.map((id) => (
                <span key={id} className="inline-flex items-center gap-1 rounded-full bg-pencil-soft py-0.5 pl-2 pr-1 text-[11px] text-pencil">
                  <Sparkles size={10} aria-hidden />{pieces[id].name}
                  <button type="button" aria-label={`Remove ${pieces[id].name}`} className="rounded-full p-0.5 hover:bg-white" onClick={() => change(`${pieces[id].name} removed from ${title.toLowerCase()}`, (p) => togglePiece(p, page.id, s.key, id))}><X size={10} /></button>
                </span>
              ))}
              {hero && lead && <button type="button" onClick={() => setView('files')} className="inline-flex items-center gap-1 rounded-full border border-pencil/40 px-2 py-0.5 text-[11px] text-pencil hover:bg-pencil-soft"><ImageUp size={10} aria-hidden />Add your {lead.asset === '3d' ? '3D scene' : 'video'}</button>}
            </span>
          )}
        </div>
        <span className={`flex shrink-0 items-center ${on ? '' : 'lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100'}`}>
          {iconBtn(`Move ${title} up`, () => move(s.key, i - 1), <ArrowUp size={15} />, i === 0)}
          {iconBtn(`Move ${title} down`, () => move(s.key, i + 2), <ArrowDown size={15} />, i === page.sections.length - 1)}
          {iconBtn(`Remove ${title}`, () => { change(`${cap(lookOfSection(s.id))} removed`, (p) => removeSection(p, page.id, s.key)); if (on) setSelKey(undefined) }, <X size={15} />)}
        </span>
      </li>
    )
  }

  // ─── right panel: every option is a large, real preview — small thumbnails don't say enough ───
  // Section previews render at a narrower virtual width than the page, so they read larger in the panel.
  const PANEL_W = 1100
  const sectionShot = (id: SectionId) => <LazyMount className="aspect-[16/10]"><SectionPreview id={id} {...pv} width={PANEL_W} className="aspect-[16/10]" /></LazyMount>
  const heroShot = (id: KitPlan['hero']) => <LazyMount className="aspect-[16/10]"><HeroPreview plan={plan} id={id} /></LazyMount>
  const effectShot = (id: PieceId) => <LazyMount className="aspect-video"><ScaledFrame width={420} className="aspect-video"><PieceDemo id={id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame></LazyMount>
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

  // Nothing picked: the parts you can add, two to a row, each a real preview.
  const library = (
    <>
      <p className="font-medium">Add to {page.label}</p>
      <p className="mb-4 mt-0.5 text-xs text-muted">What a {pageTypes[page.type].name} page usually has comes first. Drag a part into the page — a line shows where it lands. Or tap +.</p>
      <div className="space-y-5">
        {libraryFor(page.type).map((g) => (
          <section key={g.name} aria-label={g.job}>
            <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted">{g.job}</p>
            <ul className="grid grid-cols-2 gap-2">
              {g.ids.map((id) => {
                const onPage = page.sections.some((s) => s.id === id)
                return (
                  <li key={id} draggable onDragStart={(e) => { e.dataTransfer.effectAllowed = 'copy'; e.dataTransfer.setData('text/plain', id); setDrag({ kind: 'new', id }) }} onDragEnd={endDrag}
                    title={id === 'hero' ? 'Full width — at the top, or anywhere lower down' : sectionGuide[id] ? `Best when ${sectionGuide[id]!.bestWhen}` : sections[id].purpose}
                    className="group relative cursor-grab overflow-hidden rounded-lg border border-line bg-white hover:border-ink active:cursor-grabbing">
                    <div className="pointer-events-none border-b border-line">{id === 'hero' ? heroShot(plan.hero) : sectionShot(id)}</div>
                    <p className="px-2 py-1.5 text-[12px] font-medium leading-tight">{cap(lookOfSection(id))}{onPage ? <span className="block text-[10px] font-normal text-muted">On this page</span> : g.usual.includes(id) && <span className="block text-[10px] font-normal text-pencil">Usual on {pageTypes[page.type].name}</span>}</p>
                    <button type="button" aria-label={`Add ${lookOfSection(id)} to ${page.label}`} onClick={() => addPart(id)} className="absolute right-1.5 top-1.5 rounded-full border border-line bg-white p-1 text-ink-2 shadow-sm hover:border-ink hover:text-ink"><Plus size={13} /></button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </>
  )

  const group = (value: string, name: string, now: string, body: ReactNode) => (
    <AccordionItem value={value} className="rounded-md border border-line bg-white not-last:border-b">
      <AccordionTrigger className="px-3 py-2.5 hover:no-underline"><span className="flex min-w-0 flex-1 items-baseline justify-between gap-3 pr-2"><span>{name}</span><span className="truncate text-xs font-normal text-muted">{now}</span></span></AccordionTrigger>
      <AccordionContent className="px-2">{body}</AccordionContent>
    </AccordionItem>
  )
  const back = <button type="button" className="mb-3 inline-flex items-center gap-1 text-xs text-muted hover:text-ink" onClick={() => setSelKey(undefined)}><ArrowLeft size={12} aria-hidden />Add parts</button>

  // The menu or the footer: on this page or not, and its look (the same on every page).
  const chromeInspector = (c: ChromeId) => {
    const hidden = !!page.hide?.includes(c), name = c === 'navbar' ? 'Menu' : 'Footer'
    const real = closestChrome(spec, c)
    return (
      <>
        {back}
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
            : Object.values(footerStyles).map((x) => card(x.id, footerId === x.id, () => change(`Footer: ${x.name}`, (p) => setStyle(p, 'footer', x.id)), <LazyMount className="min-h-16"><SectionPreview id="footer" footer={x.id} {...pv} width={PANEL_W} auto /></LazyMount>, x.name, x.line))}
        </ul>
      </>
    )
  }

  // A part picked: first the part as it is now — its look with its photo layout and effects together — then one
  // question per heading (each showing its current answer), every answer a large preview.
  const inspector = sel && (() => {
    const hero = sel.id === 'hero'
    const i = page.sections.indexOf(sel)
    const title = hero ? heroTitle(page, sel) : jobOf(sel.id)
    const moments = piecesFor(sel)
    const looks = hero ? [] : [sel.id, ...swapOptions(page, sel.id).job]
    const ph = !hero && isPhotoSection(sel.id) ? sectionPhotos(plan, sel) : undefined
    const real = hero ? closestSite(spec) : closestSection(spec, sel.id)
    const bestWhen = (id: SectionId) => (sectionGuide[id] ? `Best when ${sectionGuide[id]!.bestWhen}` : sections[id].purpose)
    const extras: [string, ReactNode, string][] = [
      ...(ph ? [[`photos-${ph.id}`, photoShot(ph.id), `Photos: ${imagePresentations[ph.id].name}`] as [string, ReactNode, string]] : []),
      ...sel.pieces.map((id) => [id, effectShot(id), pieces[id].name] as [string, ReactNode, string]),
    ]
    return (
      <>
        {back}
        <p className="text-xs text-muted">Part {i + 1} of {page.label}</p>
        <p className="font-medium">{title}</p>

        <figure className="mt-3 overflow-hidden rounded-lg border border-line bg-white">
          <div className="pointer-events-none">{hero ? heroShot(plan.hero) : sectionShot(sel.id)}</div>
          <figcaption className="px-3 py-2 text-xs text-muted">{hero ? heroName(plan.hero) : cap(lookOfSection(sel.id))}{extras.length ? ', with:' : ' — no extras'}</figcaption>
          {extras.length > 0 && (
            <ul className="grid grid-cols-2 gap-2 px-2 pb-2">
              {extras.map(([k, shot, label]) => <li key={k} className="overflow-hidden rounded-md border border-line"><div className="pointer-events-none">{shot}</div><p className="truncate px-2 py-1 text-[11px]">{label}</p></li>)}
            </ul>
          )}
        </figure>
        {real && <div className="mt-3"><RealSiteClip match={real} label={hero ? 'A first screen like this' : 'This part on a real site'} /></div>}

        <Accordion type="single" collapsible key={sel.key} className="mt-3 gap-2">
          {(hero || looks.length > 1) && group('look', hero ? 'Change what it shows' : 'Change its look', hero ? heroName(plan.hero) : cap(lookOfSection(sel.id)), hero ? <>
            <p className="mb-2 text-xs text-muted">{i === 0 ? 'What visitors see first on this page.' : 'A full-width band at this spot of the page.'} The same wherever you put it; it sets the media you need.</p>
            <ul className="space-y-2">{[undefined, ...EFFECTS.map((e) => e.hero)].map((id) => card(id ?? 'look', plan.hero === id, () => {
              if (plan.hero === id) return
              const was = planToSpec(plan).motion
              change(`${title}: ${heroName(id)}`, (p) => setHero(p, id))
              const now = planToSpec(readPlan()).motion
              if (now !== was) toast(`Movement is now ${motionLevels[now].name} — this film or image works at that level.`)
            }, heroShot(id), heroName(id), id ? EFFECTS.find((e) => e.hero === id)!.line : `${look.d.name}’s own`))}</ul>
          </> : <>
            <p className="mb-2 text-xs text-muted">Same job, different design. Your content and effects carry over when they fit.</p>
            <ul className="space-y-2">{looks.map((id) => card(id, id === sel.id, () => { if (id !== sel.id) change(`${cap(lookOfSection(sel.id))} → ${lookOfSection(id)}`, (p) => replaceSection(p, page.id, sel.key, id)) }, sectionShot(id), cap(lookOfSection(id)), bestWhen(id)))}</ul>
          </>)}

          {ph && group('photos', 'Change how photos show', imagePresentations[ph.id].name, <>
            <p className="mb-2 text-xs text-muted">Here only.{ph.chosen && <> <button type="button" className="link" onClick={() => change('Photo layout back to the recommendation', (p) => setSectionPhotos(p, page.id, sel.key, undefined))}>Use the recommendation</button></>}</p>
            <ul className="grid grid-cols-2 gap-2">{Object.values(imagePresentations).map((x) => card(x.id, ph.id === x.id, () => change(`${title}: photos as ${x.name}`, (p) => setSectionPhotos(p, page.id, sel.key, x.id)),
              photoShot(x.id), x.name, x.id === ph.recommended ? 'Recommended' : x.piece ? 'Ready code' : x.ideal))}</ul>
          </>)}

          {moments.length > 0 && group('effects', 'Add an effect', sel.pieces.length ? `${sel.pieces.length} on` : 'Optional', <>
            <p className="mb-2 text-xs text-muted">On this part only. Tap to add or remove; one of each kind.</p>
            <ul className="space-y-2">{moments.map((id) => {
              const on = sel.pieces.includes(id)
              return card(id, on, () => change(`${pieces[id].name} ${on ? 'removed from' : 'added to'} ${title.toLowerCase()}`, (p) => togglePiece(p, page.id, sel.key, id)), effectShot(id), pieces[id].name, pieces[id].line)
            })}</ul>
          </>)}
        </Accordion>
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
          <p className="mt-2 text-xs text-muted">Drag a part to move it. Click it to change its look, photos or effects.</p>
        </section>

        {/* Right: one job at a time */}
        <aside aria-label={sel || chromeSel ? 'This part' : 'Add to page'} className="min-w-0 rounded-xl border border-line bg-white/60 p-4 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin] lg:sticky lg:top-40 lg:max-h-[calc(100svh-11rem)] lg:overflow-y-auto">
          {chromeSel ? chromeInspector(chromeSel) : sel ? inspector : library}
        </aside>
      </>}
    </div>
  )
}
