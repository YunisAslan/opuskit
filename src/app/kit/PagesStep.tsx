'use client'
// Step 2 — Pages: every page arrives filled with what that kind of page usually has. You don't build pages; you swap a
// section for another that does the same job, remove one, reorder, and add or drop whole pages. Effects are picked with
// the style and place themselves; here they show on the section that carries them.
//   Left: the pages (standard ones folded away).  Middle: the chosen page, top to bottom.  Right: what can go in the chosen spot.
import { ArrowLeftRight, Check, GripVertical, ImageUp, Palette, Lightbulb, Maximize2, Pencil, Plus, RotateCcw, Sparkles, Trash2, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { toast } from 'sonner'
import { LazyMount } from '@/components/LazyMount'
import { MediaSlots, missingLeadFile } from '@/components/MediaSlots'
import { SectionPreview } from '@/components/SectionPreview'
import { SitePreview, previewFromDirection } from '@/components/SitePreview'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { EFFECTS, imagePresentations, pageTypes, sections, uiByPage } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { goals } from '@/data/taxonomy'
import {
  addPage, addSuggested, effectOn, effectWhere, hasBlock, planToSpec, isStandardPage, pageGroups, placeSection, removeEffect, removePage, removeSection, renamePage, replaceSection, resetPage, setHero, setPagePurpose, swapOptions,
} from '@/features/kit/plan'
import { readPlan, updatePlan, writePlan } from '@/lib/kit'
import type { HeroId, KitPlan, PageTypeId, PieceId, SectionId } from '@/types/domain'
import { HeroPreview, heroName } from './HeroPreview'
import { lookOf } from './ProductVisual'

/** An example of what to ask for on each form or legal page. */
const ASK: Partial<Record<PageTypeId, string>> = {
  'sign-in': 'Google sign-in and a magic link, no password', 'sign-up': 'Just email and name; ask for the rest later',
  'privacy-policy': 'We use Stripe for payments and Plausible for stats', 'terms-of-service': 'Orders can be cancelled within 14 days',
  'cookie-policy': 'Only essential cookies, no banner tracking', accessibility: 'We aim for WCAG 2.2 AA; contact access@ for help',
  'not-found': 'A link back to the shop and a search box', account: 'Order history and saved addresses',
}
type Zoom = { kind: 'hero'; id: HeroId } | { kind: 'section'; id: SectionId }

export function PagesStep({ plan, initialFocus, onStyle }: { plan: KitPlan; initialFocus?: string | null; onStyle: (cat: string) => void }) {
  const look = lookOf(plan)
  const main = plan.pages.filter((p) => p.sections.length || !isStandardPage(p.type))
  const standard = plan.pages.filter((p) => !main.includes(p))
  const [pageId, setPageId] = useState<string | undefined>(main[0]?.id ?? plan.pages[0]?.id)
  const page = plan.pages.find((p) => p.id === pageId) ?? main[0] ?? plan.pages[0]
  const [selKey, setSelKey] = useState<string | undefined>()
  const sel = page?.sections.find((s) => s.key === selKey && s.id !== 'hero') ?? page?.sections.find((s) => s.id !== 'hero')
  const [zoom, setZoom] = useState<Zoom | null>(null)
  const [drag, setDrag] = useState<string | null>(null)
  const [renaming, setRenaming] = useState(false)
  // "files": the owner's logo, video and photos — the one place to add media in the kit.
  const [view, setView] = useState<'page' | 'files'>(initialFocus === 'files' ? 'files' : 'page')
  const spec = planToSpec(plan)
  const lead = missingLeadFile(spec)
  const fileCount = (plan.uploads ?? []).length
  const pv = { colors: look.colors, type: look.type, shape: look.shape, chapters: look.chapters }

  // Every change can be undone from its toast.
  const change = (message: string, f: (p: KitPlan) => KitPlan) => {
    const before = readPlan(), after = f(before)
    writePlan(after)
    // Say what happened to effects the change touched: moved elsewhere, or off because nothing can carry them.
    const notes = (Object.keys(pieces) as PieceId[]).filter((id) => effectOn(before, id) && !message.startsWith(pieces[id].name)).flatMap((id) => {
      const was = effectWhere(before, id), now = effectWhere(after, id)
      return now === was ? [] : [now ? `${pieces[id].name} moved to ${now}.` : `${pieces[id].name} turned off — nothing can carry it now.`]
    })
    toast(message, { description: notes.join(' ') || undefined, action: { label: 'Undo', onClick: () => writePlan(before) } })
  }
  const heroPreview = (id?: HeroId): ReactNode => <HeroPreview plan={plan} id={id} />
  const openPage = (id: string) => { setPageId(id); setSelKey(undefined); setRenaming(false); setView('page') }
  const addPageOf = (type: PageTypeId) => { let nid = ''; updatePlan((p) => { const r = addPage(p, type); nid = r.id; return r.plan }); openPage(nid) }

  // What a visitor would miss — at most two, each with a one-tap fix.
  const hints: { text: string; cta: string; fix: () => void }[] = []
  if (!plan.pages.some((p) => ['contact', 'reservations', 'checkout'].includes(p.type) || p.sections.some((x) => x.id === 'contact-cta' || x.id === 'reservation'))) {
    const last = plan.pages[plan.pages.length - 1]
    hints.push({ text: 'No way to reach you yet — visitors reach the end with nowhere to go.', cta: 'Add Closing CTA', fix: () => change(`Closing CTA added to ${last.label}`, (p) => addSuggested(p, last.id, 'contact-cta')) })
  }
  const goal = plan.goal && goals[plan.goal]
  if (goal?.page && !plan.pages.some((p) => p.type === goal.page)) {
    const type = goal.page
    hints.push({ text: `Visitors should “${goal.name.toLowerCase()}” — there’s no ${pageTypes[type].name} page yet.`, cta: `Add ${pageTypes[type].name}`, fix: () => addPageOf(type) })
  }
  const empty = main.find((p) => !p.sections.length)
  if (empty) hints.push({ text: `${empty.label} is empty.`, cta: 'Fill it', fix: () => { updatePlan((p) => resetPage(p, empty.id)); openPage(empty.id) } })

  // ─── one row of the page ───
  const row = (i: number) => {
    const s = page.sections[i], hero = s.id === 'hero', on = sel?.key === s.key
    return (
      <li key={s.key} draggable={!hero}
        onDragStart={(e) => { setDrag(s.key); e.dataTransfer.effectAllowed = 'move' }} onDragEnd={() => setDrag(null)}
        onDragOver={(e) => { if (drag) e.preventDefault() }}
        onDrop={(e) => { e.preventDefault(); if (drag) updatePlan((p) => placeSection(p, page.id, drag, hero ? 1 : i)); setDrag(null) }}
        className={`group relative flex items-center gap-3 rounded-lg border bg-white p-2 ${drag === s.key ? 'opacity-40' : ''} ${on && !hero ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
        {hero ? <span className="w-4 shrink-0" /> : <GripVertical size={14} className="shrink-0 cursor-grab text-muted" aria-hidden />}
        <LazyMount className="pointer-events-none aspect-[16/10] w-36 shrink-0 overflow-hidden rounded border border-line">{hero ? heroPreview(plan.hero) : <SectionPreview id={s.id} {...pv} className="aspect-[16/10]" />}</LazyMount>
        <div className="min-w-0 flex-1">
          {/* The whole row selects it; the button stretches over the card, the controls sit above it. */}
          <button type="button" aria-pressed={hero ? undefined : on} onClick={() => (hero ? onStyle('first-screen') : setSelKey(s.key))} className="block text-left after:absolute after:inset-0">
            <span className="block text-sm font-medium">{hero ? `First screen · ${heroName(plan.hero)}` : sections[s.id].name}</span>
            <span className="block text-xs text-muted">{hero ? 'What visitors see first' : sections[s.id].purpose}</span>
          </button>
          {hero && lead && <button type="button" onClick={() => setView('files')} className="relative mt-1.5 inline-flex items-center gap-1 rounded-full bg-pencil-soft px-2 py-0.5 text-[11px] font-medium text-pencil hover:underline"><ImageUp size={11} aria-hidden />Add your {lead.asset === '3d' ? '3D scene' : 'video'}</button>}
          {s.pieces.length > 0 && (
            <span className="relative mt-1.5 flex flex-wrap gap-1">
              {s.pieces.map((id) => <span key={id} className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[11px]"><Sparkles size={10} className="text-pencil" aria-hidden />{pieces[id].name}
                <button type="button" aria-label={`Turn off ${pieces[id].name}`} className="text-muted hover:text-ink" onClick={() => change(`${pieces[id].name} turned off`, (p) => removeEffect(p, id))}><X size={10} /></button></span>)}
            </span>
          )}
        </div>
        <span className={`relative hidden shrink-0 items-center gap-1 text-xs sm:inline-flex ${on && !hero ? 'text-pencil' : 'text-muted'}`}>{hero ? <><Palette size={13} aria-hidden />Change in Style</> : <><ArrowLeftRight size={13} aria-hidden />{on ? 'Swapping' : 'Swap'}</>}</span>
        {!hero && <button type="button" aria-label={`Remove ${sections[s.id].name}`} className="relative shrink-0 p-1 text-muted hover:text-ink" onClick={() => change(`${sections[s.id].name} removed`, (p) => removeSection(p, page.id, s.key))}><X size={15} /></button>}
      </li>
    )
  }

  // ─── what can go in the chosen spot ───
  const option = (z: Zoom, current: boolean, pick: () => void) => (
    <li key={z.id} className={`relative overflow-hidden rounded-lg border bg-white ${current ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
      <LazyMount className="pointer-events-none aspect-[16/10] overflow-hidden border-b border-line">{z.kind === 'hero' ? heroPreview(z.id) : <SectionPreview id={z.id} {...pv} className="aspect-[16/10]" />}</LazyMount>
      <button type="button" aria-pressed={current} disabled={current} onClick={pick} className="flex w-full items-start justify-between gap-2 p-3 text-left after:absolute after:inset-0">
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-1.5 text-sm font-medium">{z.kind === 'hero' ? heroName(z.id) : sections[z.id].name}
            {z.kind === 'section' && hasBlock(z.id) && <span className="rounded-full bg-pencil-soft px-1.5 py-0.5 text-[10px] font-normal text-pencil">Ready code</span>}</span>
          <span className="mt-0.5 block text-xs text-muted">{z.kind === 'hero' ? EFFECTS.find((e) => e.hero === z.id)!.line : sections[z.id].purpose}</span>
        </span>
        {current ? <Check size={15} className="shrink-0 text-pencil" aria-hidden /> : <span className="shrink-0 text-xs font-medium text-pencil">Use</span>}
      </button>
      <button type="button" onClick={() => setZoom(z)} aria-label="See it large" className="absolute right-2 top-2 z-10 rounded-full bg-white/90 p-1.5 text-ink-2 shadow-sm hover:text-ink"><Maximize2 size={14} /></button>
    </li>
  )

  if (!page) return null
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[14rem_minmax(0,1fr)_22rem] lg:items-start">
      {/* Pages */}
      <nav aria-label="Pages" className="min-w-0 space-y-3 lg:sticky lg:top-40">
        {hints.length > 0 && (
          <ul className="space-y-1.5">
            {hints.slice(0, 2).map((h) => (
              <li key={h.text} className="flex items-start gap-2 rounded-md bg-pencil-soft/60 px-2.5 py-2 text-xs">
                <Lightbulb size={13} className="mt-0.5 shrink-0 text-pencil" aria-hidden />
                <span className="flex-1">{h.text} <button type="button" className="font-medium text-pencil hover:underline" onClick={h.fix}>{h.cta}</button></span>
              </li>
            ))}
          </ul>
        )}
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
                    <span className="truncate">{p.label}</span>{n === 0 && <span className={`text-xs tabular-nums ${view === 'page' && p.id === page.id ? 'text-paper/70' : 'text-muted'}`}>{p.sections.filter((s) => s.id !== 'hero').length}</span>}
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
          <p className="mb-5 mt-1 max-w-2xl text-sm text-muted">Your logo, {spec.lead === 'video' ? 'the film on your first screen, ' : spec.lead === '3d' ? 'the 3D scene on your first screen, ' : ''}and the photos for the rest of the site. They go into your build kit at the exact paths the site uses; anything missing gets a clearly marked placeholder. Files stay in this browser.</p>
          <MediaSlots spec={spec} onChange={(m) => updatePlan((p) => ({ ...p, ...m }))} />
          <label className="mt-4 block max-w-2xl space-y-1.5 rounded-lg border border-line bg-white p-5 text-sm">
            <span className="font-medium">Anything about your photos? <span className="font-normal text-muted">(optional)</span></span>
            <Textarea value={plan.photoNote ?? ''} maxLength={400} rows={3} onChange={(e) => updatePlan((p) => ({ ...p, photoNote: e.target.value }))}
              placeholder="e.g. A 3D slider for the project photos. The team photo goes on About. Keep the before/after pairs side by side." />
          </label>
          {spec.imagePresentation && <p className="mt-4 text-sm text-muted">Photos are shown as {imagePresentations[spec.imagePresentation].name} — change it in Style → Photo layout.</p>}
        </section>
      ) : <>
      {/* The page, top to bottom */}
      <section aria-label={page.label} className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          {renaming
            ? <Input autoFocus value={page.label} aria-label="Page name" onChange={(e) => updatePlan((p) => renamePage(p, page.id, e.target.value))} onBlur={() => setRenaming(false)} onKeyDown={(e) => e.key === 'Enter' && setRenaming(false)} className="h-9 max-w-64 text-lg font-medium" />
            : <h2 className="text-lg font-medium">{page.label}</h2>}
          <button type="button" aria-label={`Rename ${page.label}`} className="p-1 text-muted hover:text-ink" onClick={() => setRenaming(!renaming)}><Pencil size={14} /></button>
          <span className="ml-auto flex items-center gap-3 text-xs">
            <button type="button" className="link inline-flex items-center gap-1" onClick={() => change(`${page.label} reset`, (p) => resetPage(p, page.id))}><RotateCcw size={12} aria-hidden />Reset page</button>
            <button type="button" disabled={plan.pages.length === 1} className="link inline-flex items-center gap-1 disabled:opacity-30" onClick={() => { change(`${page.label} deleted`, (p) => removePage(p, page.id)); openPage(main.find((p) => p.id !== page.id)?.id ?? '') }}><Trash2 size={12} aria-hidden />Delete page</button>
          </span>
        </div>
        <label className="mb-4 block">
          <span className="sr-only">What this page does</span>
          <Textarea value={page.purpose} rows={2} maxLength={400} onChange={(e) => updatePlan((p) => setPagePurpose(p, page.id, e.target.value))}
            className="min-h-0 bg-white/60 text-sm text-ink-2" placeholder="What this page does, and anything specific it needs" />
          <span className="mt-1 flex flex-wrap items-baseline justify-between gap-2 text-xs text-muted">
            <span>This is the page’s brief in your recipe — change it to ask for anything specific.{page.sections.length ? ' Click a section to swap it, drag to reorder.' : ''}</span>
            {page.purpose !== pageTypes[page.type].defaultPurpose && <button type="button" className="link inline-flex shrink-0 items-center gap-1" onClick={() => change(`${page.label} brief reset`, (p) => setPagePurpose(p, page.id, pageTypes[page.type].defaultPurpose))}><RotateCcw size={12} aria-hidden />Reset brief</button>}
          </span>
        </label>
        {page.sections.length
          ? <ol className="space-y-2">{page.sections.map((_, i) => row(i))}</ol>
          : (
            <div className="rounded-lg border border-dashed border-line p-6 text-center">
              <p className="text-sm text-muted">{isStandardPage(page.type)
                ? <>No sections to pick — {page.label} is built from your style{uiByPage[page.type]?.length ? <> with {uiByPage[page.type]!.map((c) => c.replace(/-/g, ' ')).join(', ')}</> : null}. To change what’s on it, describe it above — e.g. “{ASK[page.type] ?? 'Keep it to one short screen, with a link back home'}”.</>
                : 'This page is empty.'}</p>
              {!isStandardPage(page.type) && <button type="button" className="btn btn-ink btn-sm mt-3" onClick={() => updatePlan((p) => resetPage(p, page.id))}>Use the usual sections</button>}
            </div>
          )}
      </section>

      {/* What can go in the chosen spot */}
      <aside aria-label="Swap" className="min-w-0 lg:sticky lg:top-40 lg:max-h-[calc(100svh-11rem)] lg:overflow-y-auto">
        {sel && (
          <>
            <p className="font-medium">Swap {sections[sel.id].name}</p>
            <p className="mb-3 text-xs text-muted">Pick one to put in its place. Effects on it move along when they fit.</p>
            {(() => {
              const o = swapOptions(page, sel.id)
              const list = (ids: SectionId[]) => <ul className="space-y-3">{ids.map((id) => option({ kind: 'section', id }, false, () => change(`${sections[sel.id].name} → ${sections[id].name}`, (p) => replaceSection(p, page.id, sel.key, id))))}</ul>
              return <>
                {o.job.length > 0 && <><p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">Same job</p>{list(o.job)}</>}
                {o.page.length > 0 && <><p className="mb-2 mt-5 text-xs font-medium uppercase tracking-wider text-muted">Also fits {page.label}</p>{list(o.page)}</>}
              </>
            })()}
          </>
        )}
      </aside>

      </>}

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="bg-white sm:max-w-4xl">
          {zoom && <>
            <DialogTitle>{zoom.kind === 'hero' ? heroName(zoom.id) : sections[zoom.id].name}</DialogTitle>
            <DialogDescription>{zoom.kind === 'hero' ? EFFECTS.find((e) => e.hero === zoom.id)!.line : sections[zoom.id].purpose}</DialogDescription>
            <div className="max-h-[70svh] overflow-auto rounded-md border border-line">{zoom.kind === 'hero' ? heroPreview(zoom.id) : <SectionPreview id={zoom.id} {...pv} auto maxHeight={560} />}</div>
          </>}
        </DialogContent>
      </Dialog>
    </div>
  )
}
