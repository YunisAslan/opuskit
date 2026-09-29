'use client'
// The library for exactly the spot the user clicked — a section slot, a section's effects, the first screen, or a new page.
// Compact rows with small thumbnails; hovering (or focusing) a row shows it large at the top of the panel.
import { Check, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { SectionPreview } from '@/components/SectionPreview'
import { SitePreview, previewFromDirection } from '@/components/SitePreview'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { examples } from '@/data/examples'
import { EFFECTS, pageTypes, sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { addPage, addSection, hasBlock, pageGroups, piecesFor, planToSpec, sectionGroups, setHero, togglePiece } from '@/features/kit/plan'
import { pieceIssues } from '@/features/recipes/engine'
import { updatePlan } from '@/lib/kit'
import type { KitPlan, PageTypeId, PieceId, PlanPage, SectionId } from '@/types/domain'
import { lookOf } from './ProductVisual'

export type Panel = { kind: 'section'; pageId: string; at: number } | { kind: 'piece'; pageId: string; key: string } | { kind: 'hero' } | { kind: 'page' }

const CLIP = examples.find((e) => e.clip)?.clip

function useWide() {
  const [wide, setWide] = useState(true)
  useEffect(() => { const m = matchMedia('(min-width: 1024px)'); const f = () => setWide(m.matches); f(); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return wide
}

// The thumbnail is a sibling of the button, never inside it: demos contain their own buttons (video, FAQ, forms),
// and a button inside a button is invalid HTML. The button stretches over the whole row, so the row stays one click target.
function Row({ on, onClick, onHover, thumb, name, line, tag }: { on?: boolean; onClick: () => void; onHover: () => void; thumb?: ReactNode; name: string; line: string; tag?: string }) {
  return (
    <li className={`relative flex items-center gap-3 rounded-md p-1.5 ${on ? 'bg-pencil-soft' : 'hover:bg-paper'}`} onMouseEnter={onHover}>
      {thumb && <span aria-hidden className="pointer-events-none w-20 shrink-0 overflow-hidden rounded border border-line bg-white">{thumb}</span>}
      <button type="button" onClick={onClick} onFocus={onHover} className="min-w-0 flex-1 text-left after:absolute after:inset-0 after:rounded-md focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-pencil">
        <span className="flex items-center gap-1.5 text-sm font-medium">{name}{on && <Check size={13} className="text-pencil" aria-hidden />}</span>
        <span className="block truncate text-xs text-muted">{line}</span>
      </button>
      {tag && <span className="pointer-events-none shrink-0 rounded-full bg-pencil-soft px-1.5 py-0.5 text-[10px] text-pencil">{tag}</span>}
    </li>
  )
}

export function Library({ plan, panel, page, onClose, onPage }: { plan: KitPlan; panel: Panel | null; page: PlanPage; onClose: () => void; onPage: (id: string) => void }) {
  const wide = useWide()
  const [hover, setHover] = useState<string>()
  const look = lookOf(plan)
  const small = (id: SectionId) => <LazyMount className="aspect-[16/10]"><SectionPreview id={id} colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} className="aspect-[16/10]" /></LazyMount>

  if (!panel) return (
    <aside className="hidden text-sm text-muted lg:sticky lg:top-40 lg:block lg:self-start">
      <div className="rounded-lg border border-dashed border-line p-5">
        <p className="font-medium text-ink">Library</p>
        <p className="mt-1">Click <span className="text-ink">+</span> between sections to add one at that spot, <span className="text-ink">Add effect</span> on a section to give it a ready piece, or <span className="text-ink">Add a page</span> in the outline.</p>
      </div>
    </aside>
  )

  let title = '', context = '', preview: ReactNode = null, list: ReactNode = null
  if (panel.kind === 'section') {
    const before = page.sections[panel.at - 1], after = page.sections[panel.at]
    const name = (s?: { id: SectionId }) => s && (s.id === 'hero' ? 'the first screen' : sections[s.id].name)
    title = 'Add a section'
    context = `to ${page.label}, ${before ? `after ${name(before)}` : after ? `before ${name(after)}` : 'as its first section'}`
    const shown = (hover ?? sectionGroups[0].ids[0]) as SectionId
    preview = <><SectionPreview id={shown} colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} auto maxHeight={320} /><p className="mt-2 text-xs text-muted">{sections[shown].name} — {sections[shown].composition}</p></>
    list = sectionGroups.map((g) => (
      <div key={g.name} className="mt-4 first:mt-0">
        <p className="px-1.5 text-xs font-medium text-muted">{g.name}</p>
        <ul className="mt-1">{g.ids.map((id) => <Row key={id} name={sections[id].name} line={sections[id].purpose} tag={hasBlock(id) ? 'Code' : undefined} thumb={small(id)} onHover={() => setHover(id)} onClick={() => { updatePlan((p) => addSection(p, panel.pageId, id, panel.at)); onClose() }} />)}</ul>
      </div>
    ))
  } else if (panel.kind === 'piece') {
    const s = page.sections.find((x) => x.key === panel.key)
    if (!s) return null
    const ids = piecesFor(s)
    const issues = pieceIssues({ motion: planToSpec(plan).motion, pieces: ids })
    title = 'Add an effect'
    context = `to ${page.label} → ${s.id === 'hero' ? 'First screen' : sections[s.id].name}. Ready code, in your colours; one per kind.`
    const shown = (hover ?? ids[0]) as PieceId
    preview = shown && <><PieceDemo id={shown} colors={look.colors} fonts={look.fonts} chapters={look.chapters} className="rounded-md border border-line" /><p className="mt-2 text-xs text-muted">{pieces[shown].rules[0]}</p></>
    list = <ul>{ids.map((id) => (
      <Row key={id} on={s.pieces.includes(id)} name={pieces[id].name} line={issues[id] ?? pieces[id].line} tag={pieces[id].source.library}
        thumb={<LazyMount className="aspect-[16/10]"><ScaledFrame width={360} className="aspect-[16/10]"><PieceDemo id={id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame></LazyMount>}
        onHover={() => setHover(id)} onClick={() => updatePlan((p) => togglePiece(p, panel.pageId, panel.key, id))} />
    ))}</ul>
  } else if (panel.kind === 'hero') {
    title = 'Choose the first screen'
    context = `the top of ${plan.pages[0]?.label ?? 'Home'} — what visitors see when they arrive`
    const shown = EFFECTS.find((e) => e.hero === (hover ?? plan.hero)) ?? EFFECTS[0]
    const pv = (e: typeof EFFECTS[number]) => previewFromDirection(look.d.id, { colors: look.colors, type: look.type, lead: e.lead, motion: e.motion, title: plan.name || 'Your headline', videoSrc: e.hero.startsWith('scroll-video') ? CLIP : undefined })
    preview = <>{shown.hero === 'orbit-stickers' ? <SectionPreview id="orbit-hero" colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} className="aspect-[16/10] rounded-md border border-line" /> : <SitePreview {...pv(shown)} className="rounded-md border border-line" />}<p className="mt-2 text-xs text-muted">{shown.line}</p></>
    list = <ul>{EFFECTS.map((e) => <Row key={e.hero} on={plan.hero === e.hero} name={e.name} line={e.line} tag={e.trending ? 'Trending' : undefined} onHover={() => setHover(e.hero)} onClick={() => { updatePlan((p) => setHero(p, e.hero)); onClose() }} />)}</ul>
  } else {
    title = 'Add a page'
    context = 'it comes with its usual sections — change them after'
    const shown = (hover ?? 'about') as PageTypeId
    preview = <div className="rounded-md border border-line bg-white p-3 text-sm"><p className="font-medium">{pageTypes[shown].name}</p><p className="text-xs text-muted">{pageTypes[shown].hint}</p><p className="mt-2 text-xs">{pageTypes[shown].sections.length ? pageTypes[shown].sections.map((x) => (x === 'hero' ? 'First screen' : sections[x].name)).join(' → ') : 'Written from its purpose — add sections if you like'}</p></div>
    list = pageGroups.map((g) => (
      <div key={g.name} className="mt-4 first:mt-0">
        <p className="px-1.5 text-xs font-medium text-muted">{g.name}</p>
        <ul className="mt-1">{g.ids.map((id) => <Row key={id} name={pageTypes[id].name} line={pageTypes[id].hint} tag={plan.pages.some((p) => p.type === id) ? 'Added' : undefined} onHover={() => setHover(id)} onClick={() => { let nid = ''; updatePlan((p) => { const r = addPage(p, id); nid = r.id; return r.plan }); onPage(nid) }} />)}</ul>
      </div>
    ))
  }

  const body = (
    <div className="flex max-h-[calc(100svh-11rem)] flex-col">
      <div className="flex items-start justify-between gap-3">
        <div><p className="font-medium">{title}</p><p className="text-sm text-muted">{context}</p></div>
        <button type="button" onClick={onClose} aria-label="Close library" className="-m-1 p-1 text-muted hover:text-ink"><X size={16} /></button>
      </div>
      <div className="mt-3">{preview}</div>
      <div className="-mx-1.5 mt-4 min-h-0 flex-1 overflow-y-auto px-1.5 pb-2">{list}</div>
    </div>
  )

  return wide
    ? <aside className="rounded-lg border border-line bg-white p-4 lg:sticky lg:top-40 lg:self-start" aria-label={title}>{body}</aside>
    : <Dialog open onOpenChange={(o) => !o && onClose()}><DialogContent className="max-h-[90svh] bg-white"><DialogTitle className="sr-only">{title}</DialogTitle>{body}</DialogContent></Dialog>
}
