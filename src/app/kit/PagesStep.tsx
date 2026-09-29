'use client'
// Step 2 — Pages: one page at a time, top to bottom, drawn with the real section components.
// Left: the site outline (you are here). Middle: the page. Right: the library for exactly the spot you clicked.
import { ArrowDown, ArrowUp, ChevronRight, Plus, Sparkles, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { SectionPreview } from '@/components/SectionPreview'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { Input } from '@/components/ui/input'
import { EFFECTS, navStyles, sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { hasBlock, movePage, moveSection, piecesFor, planToSpec, removePage, removeSection, renamePage, togglePiece } from '@/features/kit/plan'
import { composeRecipe, pieceIssues, recommendedNav } from '@/features/recipes/engine'
import { updatePlan } from '@/lib/kit'
import type { KitPlan, PlanSection } from '@/types/domain'
import { Library, type Panel } from './Library'
import { lookOf } from './ProductVisual'

export function PagesStep({ plan, onStyle }: { plan: KitPlan; onStyle: () => void }) {
  const [pageId, setPageId] = useState(plan.pages[0]?.id)
  const [panel, setPanel] = useState<Panel | null>(null)
  const page = plan.pages.find((p) => p.id === pageId) ?? plan.pages[0]
  const look = lookOf(plan)
  const spec = planToSpec(plan)
  const recipe = composeRecipe(spec)
  const issues = pieceIssues({ motion: spec.motion, pieces: spec.pieces })
  const navName = navStyles[plan.nav ?? recommendedNav({ purpose: spec.purpose, direction: look.d.id })].name
  const isFirst = plan.pages[0]?.id === page?.id
  const pick = (id: string) => { setPageId(id); setPanel(null) }

  const Insert = ({ at, label = 'Add a section here' }: { at: number; label?: string }) => {
    const active = panel?.kind === 'section' && panel.pageId === page.id && panel.at === at
    return (
      <button type="button" onClick={() => setPanel({ kind: 'section', pageId: page.id, at })}
        className={`group flex w-full items-center gap-3 py-1.5 text-xs ${active ? 'text-pencil' : 'text-muted hover:text-ink'}`}>
        <span className={`h-px flex-1 ${active ? 'bg-pencil' : 'bg-line group-hover:bg-ink'}`} />
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 ${active ? 'border-pencil bg-pencil-soft' : 'border-line bg-white group-hover:border-ink'}`}><Plus size={12} aria-hidden />{label}</span>
        <span className={`h-px flex-1 ${active ? 'bg-pencil' : 'bg-line group-hover:bg-ink'}`} />
      </button>
    )
  }

  const Row = ({ s, i }: { s: PlanSection; i: number }) => {
    const hero = s.id === 'hero'
    const options = piecesFor(s)
    const active = panel?.kind === 'piece' && panel.key === s.key
    return (
      <li className={`rounded-lg border bg-white ${active ? 'border-pencil ring-1 ring-pencil' : 'border-line'}`}>
        <div className="flex flex-wrap items-center gap-2 border-b border-line px-3 py-2">
          <span className="text-sm font-medium">{hero ? 'First screen' : sections[s.id].name}</span>
          <span className="text-xs text-muted">{hero ? (EFFECTS.find((e) => e.hero === recipe.media.hero.id)?.name ?? recipe.media.hero.name) : sections[s.id].purpose}</span>
          {!hero && hasBlock(s.id) && <span className="rounded-full bg-pencil-soft px-2 py-0.5 text-[11px] text-pencil">Ready code</span>}
          <span className="ml-auto flex items-center gap-0.5">
            {options.length > 0 && <button type="button" onClick={() => setPanel({ kind: 'piece', pageId: page.id, key: s.key })} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-2 hover:bg-paper"><Sparkles size={13} aria-hidden />Add effect</button>}
            {hero ? <button type="button" className="btn btn-line btn-sm" onClick={() => setPanel({ kind: 'hero' })}>Change</button> : <>
              <button type="button" aria-label="Move up" disabled={i === 0 || page.sections[i - 1]?.id === 'hero'} className="p-1.5 text-muted hover:text-ink disabled:opacity-30" onClick={() => updatePlan((p) => moveSection(p, page.id, s.key, -1))}><ArrowUp size={14} /></button>
              <button type="button" aria-label="Move down" disabled={i === page.sections.length - 1} className="p-1.5 text-muted hover:text-ink disabled:opacity-30" onClick={() => updatePlan((p) => moveSection(p, page.id, s.key, 1))}><ArrowDown size={14} /></button>
              <button type="button" aria-label={`Remove ${sections[s.id].name}`} className="p-1.5 text-muted hover:text-ink" onClick={() => updatePlan((p) => removeSection(p, page.id, s.key))}><X size={14} /></button>
            </>}
          </span>
        </div>
        {s.pieces.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 border-b border-line px-3 py-2">
            {s.pieces.map((id) => (
              <li key={id} className="inline-flex items-center gap-1 rounded-full bg-paper px-2.5 py-1 text-xs">
                <Sparkles size={12} className="text-pencil" aria-hidden />{pieces[id].name}{issues[id] && <span className="text-warn" title={issues[id]}>·&nbsp;check</span>}
                <button type="button" aria-label={`Remove ${pieces[id].name}`} className="ml-0.5 text-muted hover:text-ink" onClick={() => updatePlan((p) => togglePiece(p, page.id, s.key, id))}><X size={12} /></button>
              </li>
            ))}
          </ul>
        )}
        <LazyMount className="overflow-hidden rounded-b-lg">
          {hero ? (recipe.media.hero.id === 'orbit-stickers' ? <SectionPreview id="orbit-hero" colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} className="aspect-[16/9]" /> : <div className="max-h-[340px] overflow-hidden"><SitePreview {...previewFromRecipe(recipe, plan.name ? { title: plan.name, brand: plan.name } : {})} /></div>)
            : <SectionPreview id={s.id} colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} auto maxHeight={260} />}
        </LazyMount>
      </li>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)_22rem]">
      {/* Outline: the whole site, and where you are in it */}
      <nav aria-label="Site outline" className="lg:sticky lg:top-40 lg:self-start">
        <button type="button" onClick={onStyle} className="mb-4 flex w-full items-center justify-between rounded-md border border-line bg-white px-3 py-2 text-left text-sm hover:border-ink">
          <span><span className="block text-xs text-muted">Style · every page</span>{look.d.name}</span><ChevronRight size={14} aria-hidden />
        </button>
        <p className="mb-2 text-xs text-muted">Pages</p>
        <ol className="space-y-1">
          {plan.pages.map((p, i) => (
            <li key={p.id}>
              <button type="button" onClick={() => pick(p.id)} aria-current={p.id === page.id ? 'page' : undefined}
                className={`w-full rounded-md px-3 py-2 text-left text-sm ${p.id === page.id ? 'bg-ink text-paper' : 'hover:bg-white'}`}>
                <span className="flex items-baseline justify-between gap-2"><span className="truncate font-medium">{p.label}</span><span className={`text-xs tabular-nums ${p.id === page.id ? 'text-paper/70' : 'text-muted'}`}>{i + 1}</span></span>
                <span className={`block truncate text-xs ${p.id === page.id ? 'text-paper/70' : 'text-muted'}`}>{p.sections.length ? p.sections.map((s) => (s.id === 'hero' ? 'First screen' : sections[s.id].name)).join(', ') : 'No sections yet'}</span>
              </button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={() => setPanel({ kind: 'page' })} className="mt-2 inline-flex items-center gap-1 px-3 text-sm link"><Plus size={14} aria-hidden />Add a page</button>
      </nav>

      {/* The page, top to bottom */}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <Input value={page.label} aria-label="Page name" onChange={(e) => updatePlan((p) => renamePage(p, page.id, e.target.value))} className="h-10 w-56 bg-white text-lg font-medium" />
          <span className="text-sm text-muted">Page {plan.pages.indexOf(page) + 1} of {plan.pages.length}</span>
          <span className="ml-auto flex gap-1">
            <button type="button" aria-label="Move page earlier" disabled={isFirst} className="p-2 text-muted hover:text-ink disabled:opacity-30" onClick={() => updatePlan((p) => movePage(p, page.id, -1))}><ArrowUp size={15} /></button>
            <button type="button" aria-label="Move page later" disabled={plan.pages.at(-1)?.id === page.id} className="p-2 text-muted hover:text-ink disabled:opacity-30" onClick={() => updatePlan((p) => movePage(p, page.id, 1))}><ArrowDown size={15} /></button>
            <button type="button" aria-label={`Delete ${page.label}`} disabled={plan.pages.length === 1} className="p-2 text-muted hover:text-ink disabled:opacity-30" onClick={() => { updatePlan((p) => removePage(p, page.id)); pick(plan.pages.find((p) => p.id !== page.id)!.id) }}><Trash2 size={15} /></button>
          </span>
        </div>
        <p className="mt-2 text-sm text-muted">Step 2 — building <span className="text-ink">{page.label}</span>. Sections run top to bottom, exactly as on the site. Click <span className="text-ink">+</span> between them to add one there, or <span className="text-ink">Add effect</span> to give a section a ready piece.</p>

        <div className="mt-5 space-y-1.5">
          <div className="flex items-center justify-between rounded-md border border-dashed border-line px-3 py-2 text-xs text-muted">
            <span>Menu — {navName} · same on every page</span><button type="button" className="link" onClick={onStyle}>Change in Style</button>
          </div>
          {isFirst && page.sections[0]?.id !== 'hero' && <button type="button" onClick={() => setPanel({ kind: 'hero' })} className="w-full rounded-md border border-dashed border-muted px-3 py-3 text-sm hover:border-ink">+ Choose a first screen for the top of your site</button>}
          <ol className="space-y-1.5">
            {page.sections.map((s, i) => (
              <li key={s.key} className="space-y-1.5">
                {s.id !== 'hero' && <Insert at={i} />}
                <ol><Row s={s} i={i} /></ol>
              </li>
            ))}
          </ol>
          <Insert at={page.sections.length} label={page.sections.length ? 'Add a section at the end' : 'Add the first section'} />
          <div className="overflow-hidden rounded-lg border border-dashed border-line"><p className="flex justify-between px-3 py-2 text-xs text-muted"><span>Footer · same on every page · ready code</span></p><LazyMount><SectionPreview id="footer" colors={look.colors} type={look.type} shape={look.shape} chapters={look.chapters} auto maxHeight={180} /></LazyMount></div>
        </div>
      </div>

      {/* The library, for exactly the spot that was clicked */}
      <Library key={panel ? JSON.stringify(panel) : 'none'} plan={plan} panel={panel} page={page} onClose={() => setPanel(null)} onPage={pick} />
    </div>
  )
}
