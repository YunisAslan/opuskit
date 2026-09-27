'use client'
// Adaptive visual questionnaire. Only asks what changes the Recipe: steps appear or disappear based on earlier answers.

import { Pencil, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Symbol } from '@/components/Logo'
import { PaletteEditor } from '@/components/PaletteEditor'
import { SitePreview, previewFromDirection, type PreviewProps } from '@/components/SitePreview'
import { TypeCard } from '@/components/TypeSpecimen'
import { Swatches } from '@/components/ui'
import { layouts, palettes, typography } from '@/data/ingredients'
import { heroes } from '@/data/patterns'
import { characters, directions, families, leads, motionLevels, purposes } from '@/data/taxonomy'
import { defaultPagesFor, normalizeSpec, recommendedTarget, resolveHero } from '@/features/recipes/engine'
import { saveGeneration } from '@/features/recipes/library'
import { deleteFile, putFile } from '@/lib/files'
import { KEYS, get, write } from '@/lib/store'
import { pageTypes } from '@/data/patterns'
import type {
  AssetId, BuildTargetId, CharacterId, DirectionId, FamilyId, LayoutId, LeadId, MediaPlan, MotionLevel, PageSpec, PageTypeId,
  PaletteColors, PaletteId, PurposeId, RecipeSpec, TypographyId, UploadedAsset,
} from '@/types/domain'

type Draft = {
  purpose?: PurposeId; feel?: FamilyId; direction?: DirectionId; characters: CharacterId[]; lead?: LeadId; motion?: MotionLevel
  layout?: LayoutId; palette?: PaletteId; customPalette?: PaletteColors; typography?: TypographyId; assets: AssetId[]
  uploads: UploadedAsset[]; mediaPlan?: MediaPlan; pages: PageSpec[]; target?: BuildTargetId
}
const EMPTY: Draft = { characters: [], assets: [], uploads: [], pages: [] }

const LEAD_ASSET: Record<LeadId, AssetId | null> = { photography: 'images', video: 'video', product: 'product-photos', illustration: 'illustrations', '3d': '3d', typography: null }

const has = (d: Draft, a: AssetId) => d.assets.includes(a) || d.uploads.some((u) => u.asset === a)
// Only asked where the experience breaks without the asset; for photos/products/illustrations the recipe adds a "find it" path.
const needsMediaPlan = (d: Draft) => (d.lead === 'video' || d.lead === '3d') && !has(d, LEAD_ASSET[d.lead]!)

function layoutSkipReason(d: Draft): string | null {
  if (!d.direction) return null
  const locked = directions[d.direction].layoutLocked
  if (locked) return `${directions[d.direction].name} is built on a ${layouts[locked].name.toLowerCase()} layout, so we set it for you.`
  if (d.lead && d.motion && resolveHero({ lead: d.lead, motion: d.motion }).forcesLayout) return 'Scroll-controlled video needs the full screen, so the layout is full-bleed.'
  return null
}

type Step = { id: string; title: string; hint?: string; show: (d: Draft) => boolean; done: (d: Draft) => boolean }
const STEPS: Step[] = [
  { id: 'purpose', title: 'What are you building?', show: () => true, done: (d) => !!d.purpose },
  { id: 'pages', title: 'What pages does your site need?', hint: 'We recommend a starting set — add, remove, rename or reorder freely.', show: () => true, done: (d) => d.pages.length > 0 },
  { id: 'feel', title: 'What should it feel like?', hint: 'Pick the closest feeling. You can refine it next.', show: () => true, done: (d) => !!d.feel },
  { id: 'direction', title: 'Choose a visual direction', show: () => true, done: (d) => !!d.direction },
  { id: 'character', title: 'What personality should it have?', hint: 'Choose one or two.', show: () => true, done: (d) => d.characters.length > 0 },
  { id: 'lead', title: 'What should lead the experience?', show: () => true, done: (d) => !!d.lead },
  { id: 'motion', title: 'How alive should it feel?', hint: 'Each preview moves the way your site would.', show: () => true, done: (d) => !!d.motion },
  { id: 'layout', title: 'How should the page be structured?', show: (d) => !layoutSkipReason(d), done: (d) => !!d.layout },
  { id: 'palette', title: 'Choose the color atmosphere', show: () => true, done: (d) => !!d.palette },
  { id: 'typography', title: 'How should the typography feel?', show: () => true, done: (d) => !!d.typography },
  { id: 'assets', title: 'What do you already have?', hint: 'Tick what exists or upload it. Nothing is required to continue.', show: () => true, done: () => true },
  { id: 'media', title: 'This recipe needs visual media', show: needsMediaPlan, done: (d) => !!d.mediaPlan },
  { id: 'target', title: 'How are you planning to build it?', show: () => true, done: (d) => !!d.target },
]

function toSpec(d: Draft): RecipeSpec {
  const dir = directions[d.direction ?? 'japanese-minimal']
  return normalizeSpec({
    base: dir.baseRecipe, purpose: d.purpose ?? 'other', direction: dir.id, characters: d.characters,
    lead: d.lead ?? dir.defaults.lead, motion: d.motion ?? dir.defaults.motion, layout: d.layout ?? dir.defaults.layout,
    palette: d.palette ?? dir.defaults.palette, customPalette: d.customPalette, typography: d.typography ?? dir.defaults.typography,
    assets: d.assets, uploads: d.uploads, mediaPlan: needsMediaPlan(d) ? d.mediaPlan : 'have',
    pages: d.pages.length ? d.pages : defaultPagesFor(d.purpose ?? 'other'), target: d.target ?? 'not-sure',
  })
}

function preview(d: Draft, over: Partial<PreviewProps> = {}): PreviewProps {
  const dirId = d.direction ?? (d.feel ? families[d.feel].directions[0] : 'japanese-minimal')
  const spec = toSpec({ ...d, direction: dirId })
  return previewFromDirection(dirId, {
    colors: { ...palettes[spec.palette].colors, ...spec.customPalette }, type: typography[spec.typography], layout: spec.layout,
    lead: spec.lead, motion: spec.motion, title: directions[dirId].line, ...over,
  })
}

export function Creator() {
  const router = useRouter()
  const params = useSearchParams()
  const [d, setD] = useState<Draft>(EMPTY)
  const [stepId, setStepId] = useState('purpose')
  const [loading, setLoading] = useState<string | null>(null)

  // Restore draft (optional save state) or start from ?feel= / ?direction=
  useEffect(() => {
    const saved = get<{ d: Draft; stepId: string } | null>(KEYS.draft, null)
    const feel = params.get('feel') as FamilyId | null
    const dir = params.get('direction') as DirectionId | null
    if (dir && directions[dir]) setD({ ...EMPTY, feel: directions[dir].families[0], direction: dir, ...defaultsFor(dir) })
    else if (feel && families[feel]) setD({ ...EMPTY, feel })
    else if (saved?.d) { setD({ ...EMPTY, ...saved.d }); setStepId(saved.stepId) }
  }, [params])

  useEffect(() => { write(KEYS.draft, { d, stepId }) }, [d, stepId])

  // The step actually on screen is always whatever stepId points at — never re-derived from show(d), so
  // resolving *this* step's own question (e.g. uploading the video) doesn't yank the user forward mid-step.
  const orderIdx = Math.max(0, STEPS.findIndex((s) => s.id === stepId))
  const step = STEPS[orderIdx]
  // Only used to draw the progress bar: how many *other* applicable steps sit at or before this one.
  const visible = STEPS.filter((s) => s.show(d))
  const index = visible.includes(step) ? visible.indexOf(step) : STEPS.slice(0, orderIdx).filter((s) => s.show(d)).length
  const isFirst = !STEPS.slice(0, orderIdx).some((s) => s.show(d))
  const isLast = !STEPS.slice(orderIdx + 1).some((s) => s.show(d))
  const set = (patch: Partial<Draft>) => setD((x) => ({ ...x, ...patch }))
  const skipped = layoutSkipReason(d)

  // Navigation always re-scans STEPS with the latest `d`, so a step whose relevance just changed
  // (media resolved, layout locked by direction) is skipped going forward or backward, correctly, on click.
  const next = () => {
    const upcoming = STEPS.slice(orderIdx + 1).find((s) => s.show(d))
    if (upcoming) { setStepId(upcoming.id); window.scrollTo({ top: 0 }) }
    else finish()
  }
  const back = () => {
    const prior = [...STEPS.slice(0, orderIdx)].reverse().find((s) => s.show(d))
    if (prior) setStepId(prior.id)
  }

  function finish() {
    const spec = toSpec(d)
    const lines = ['Composing your direction…', 'Selecting typography…', 'Building your motion system…', 'Preparing your assets…']
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    lines.forEach((l, i) => setTimeout(() => setLoading(l), reduce ? 0 : i * 420))
    setTimeout(() => {
      const id = saveGeneration(spec)
      write(KEYS.draft, null)
      router.push(`/result/${id}`)
    }, reduce ? 50 : lines.length * 420 + 200)
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper px-5" role="status" aria-live="polite">
        <div className="text-center">
          <Symbol className="mx-auto h-12 w-auto animate-pulse" />
          <p className="mt-6 text-2xl tracking-tight">{loading}</p>
        </div>
      </div>
    )
  }

  const p = preview(d)
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" aria-label="Leave the creator and go home"><Symbol className="h-6 w-auto" /></Link>
          <div className="flex flex-1 items-center gap-3 md:max-w-md" aria-label={`Step ${index + 1} of ${visible.length}`}>
            <div className="flex flex-1 gap-1">{visible.map((s, i) => <span key={s.id} className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-ink' : 'bg-line'}`} />)}</div>
            <span className="text-sm tabular-nums text-muted">{index + 1}/{visible.length}</span>
          </div>
          <button type="button" className="text-sm link" onClick={() => { setD(EMPTY); setStepId('purpose') }}>Start over</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="px-5 pb-40 pt-10 md:px-10 lg:pt-14" aria-labelledby="q">
          <h1 id="q" className="display text-[clamp(2rem,4vw,3.4rem)]">{step.title}</h1>
          {step.hint && <p className="mt-3 text-ink-2">{step.hint}</p>}
          {step.id === 'palette' && skipped && <p className="mt-3 text-sm text-pencil">{skipped}</p>}
          <div className="mt-8"><StepBody step={step.id} d={d} set={set} /></div>
        </section>

        <aside className="hidden border-l border-line bg-white/60 lg:block" aria-label="Live preview">
          <div className="sticky top-16 p-8">
            <SitePreview {...p} className="rounded-lg border border-line" />
            <SoFar d={d} />
          </div>
        </aside>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 px-5 py-3 md:px-8">
          <button type="button" onClick={back} disabled={isFirst} className="btn btn-line btn-sm disabled:opacity-30">Back</button>
          <details className="lg:hidden">
            <summary className="cursor-pointer text-sm link">Preview</summary>
            <div className="absolute inset-x-4 bottom-20 rounded-lg border border-line bg-white p-3 shadow-xl"><SitePreview {...p} className="rounded" /></div>
          </details>
          <button type="button" onClick={next} disabled={!step.done(d)} className="btn btn-ink disabled:opacity-30">
            {isLast ? 'Compose my recipe' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  )
}

function defaultsFor(dir: DirectionId): Partial<Draft> {
  const x = directions[dir].defaults
  return { palette: x.palette, typography: x.typography, layout: x.layout, lead: x.lead, motion: x.motion, customPalette: undefined }
}

function SoFar({ d }: { d: Draft }) {
  const spec = toSpec(d)
  const rows: [string, ReactNode | undefined][] = [
    ['Building', d.purpose && purposes[d.purpose].name],
    ['Pages', d.pages.length ? d.pages.map((p) => p.label).join(', ') : undefined],
    ['Direction', d.direction && directions[d.direction].name],
    ['Character', d.characters.length ? d.characters.map((c) => characters[c].name).join(' + ') : undefined],
    ['Leads with', d.lead && leads[d.lead].name],
    ['Motion', d.motion && motionLevels[d.motion].name],
    ['Layout', (d.layout || layoutSkipReason(d)) && layouts[spec.layout].name],
    ['Palette', d.palette && <Swatches colors={Object.values({ ...palettes[spec.palette].colors, ...spec.customPalette })} />],
    ['Type', d.typography && typography[d.typography].name],
    ['Hero', d.lead && d.motion && resolveHero(spec).name],
  ]
  return (
    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="border-t border-line pt-2">
          <dt className="text-muted">{k}</dt>
          <dd className={v ? '' : 'text-line'}>{v ?? '—'}</dd>
        </div>
      ))}
    </dl>
  )
}

// ─── Step bodies ─────────────────────────────────────────────────────────────

function Grid({ children, cols = 'sm:grid-cols-2 xl:grid-cols-3' }: { children: ReactNode; cols?: string }) {
  return <div className={`grid gap-3 ${cols}`}>{children}</div>
}

function Card({ selected, onClick, title, line, children, badge, role = 'radio' }: { selected: boolean; onClick: () => void; title: string; line?: string; children?: ReactNode; badge?: string; role?: 'radio' | 'checkbox' }) {
  return (
    <button type="button" role={role} aria-checked={selected} onClick={onClick} className="choice w-full overflow-hidden">
      {children}
      <span className="block p-4">
        <span className="flex items-center justify-between gap-2"><span className="font-medium">{title}</span>{badge && <span className="pencil">{badge}</span>}</span>
        {line && <span className="mt-0.5 block text-sm text-muted">{line}</span>}
      </span>
    </button>
  )
}

function StepBody({ step, d, set }: { step: string; d: Draft; set: (p: Partial<Draft>) => void }) {
  const dir = d.direction && directions[d.direction]
  switch (step) {
    case 'purpose':
      return (
        <div role="radiogroup" aria-label="What are you building" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {Object.values(purposes).map((p) => <Card key={p.id} selected={d.purpose === p.id} onClick={() => set({ purpose: p.id, pages: defaultPagesFor(p.id) })} title={p.name} line={p.hint} />)}
        </div>
      )
    case 'feel':
      return (
        <div role="radiogroup" aria-label="Feeling"><Grid>
          {(Object.keys(families) as FamilyId[]).map((f) => (
            <Card key={f} selected={d.feel === f} title={families[f].name} line={families[f].line}
              onClick={() => { const first = families[f].directions[0]; set({ feel: f, direction: undefined, ...(d.feel !== f ? defaultsFor(first) : {}) }) }}>
              <SitePreview {...previewFromDirection(families[f].directions[0])} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'direction':
      return (
        <div role="radiogroup" aria-label="Direction"><Grid cols="sm:grid-cols-2">
          {families[d.feel ?? 'quiet'].directions.map((id) => (
            <Card key={id} selected={d.direction === id} title={directions[id].name} line={directions[id].description} onClick={() => set({ direction: id, ...defaultsFor(id) })}>
              <SitePreview {...previewFromDirection(id)} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'character':
      return (
        <div role="group" aria-label="Personality" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {Object.values(characters).map((c) => {
            const on = d.characters.includes(c.id)
            return <Card key={c.id} role="checkbox" selected={on} title={c.name} line={c.line}
              onClick={() => set({ characters: on ? d.characters.filter((x) => x !== c.id) : [...d.characters, c.id].slice(-2) })} />
          })}
        </div>
      )
    case 'lead':
      return (
        <div role="radiogroup" aria-label="Lead"><Grid>
          {(Object.keys(leads) as LeadId[]).map((l) => (
            <Card key={l} selected={d.lead === l} title={leads[l].name} line={leads[l].line} badge={dir && dir.defaults.lead === l ? 'Recommended' : undefined} onClick={() => set({ lead: l, mediaPlan: undefined })}>
              <SitePreview {...preview(d, { lead: l, layout: 'balanced', motion: 'still' })} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'motion':
      return (
        <div role="radiogroup" aria-label="Motion"><Grid cols="sm:grid-cols-2">
          {(Object.keys(motionLevels) as MotionLevel[]).map((m) => (
            <Card key={m} selected={d.motion === m} title={motionLevels[m].name} line={motionLevels[m].line} badge={dir && dir.defaults.motion === m ? 'Recommended' : undefined} onClick={() => set({ motion: m })}>
              <SitePreview {...preview(d, { motion: m })} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'layout':
      return (
        <div role="radiogroup" aria-label="Layout"><Grid>
          {(Object.keys(layouts) as LayoutId[]).map((l) => (
            <Card key={l} selected={d.layout === l} title={layouts[l].name} line={layouts[l].line} badge={dir && dir.defaults.layout === l ? 'Recommended' : undefined} onClick={() => set({ layout: l })}>
              <SitePreview {...preview(d, { layout: l, motion: 'still' })} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'pages': return <PagesStep d={d} set={set} />
    case 'palette': return <PaletteStep d={d} set={set} />
    case 'typography': return <TypeStep d={d} set={set} />
    case 'assets': return <AssetsStep d={d} set={set} />
    case 'media': return <MediaStep d={d} set={set} />
    case 'target': {
      const rec = recommendedTarget(toSpec({ ...d, target: 'not-sure' }))
      const opts: [BuildTargetId, string, string][] = [
        ['claude-code', 'Claude Code', 'Project instructions + recipe-specific skills'], ['cursor', 'Cursor', 'Project rules + implementation plan'],
        ['v0', 'v0', 'A context-rich prompt + attachments'], ['lovable', 'Lovable', 'Project knowledge + prompt sequence'],
        ['own-code', 'My own code', 'Recipe docs, tokens and asset layer'], ['not-sure', 'Not sure yet', 'We\'ll recommend one for this recipe'],
      ]
      return (
        <div role="radiogroup" aria-label="Build target" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {opts.map(([id, name, line]) => <Card key={id} selected={d.target === id} title={name} line={line} badge={id === rec ? 'Fits this recipe' : undefined} onClick={() => set({ target: id })} />)}
        </div>
      )
    }
  }
  return null
}

const UTILITY_PAGE_TYPES: PageTypeId[] = ['faq', 'sign-in', 'sign-up', 'privacy-policy', 'terms-of-service', 'cookie-policy', 'not-found', 'accessibility']

function PagesStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const purpose = purposes[d.purpose ?? 'other']
  const [dismissed, setDismissed] = useState<PageTypeId[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (editingId && !dlg.open) dlg.showModal()
    if (!editingId && dlg.open) dlg.close()
  }, [editingId])

  const hasType = (t: PageTypeId) => d.pages.some((p) => p.type === t)
  const addPage = (type: PageTypeId, label: string) =>
    set({ pages: [...d.pages, { id: crypto.randomUUID().slice(0, 8), type, label, purpose: pageTypes[type].defaultPurpose, sections: pageTypes[type].sections }] })
  const addCustom = () => {
    const id = crypto.randomUUID().slice(0, 8)
    set({ pages: [...d.pages, { id, type: 'custom', label: 'New page', purpose: '', sections: [] }] })
    setEditingId(id)
  }
  const removePage = (id: string) => set({ pages: d.pages.filter((p) => p.id !== id) })
  const updatePage = (id: string, patch: Partial<PageSpec>) => set({ pages: d.pages.map((p) => (p.id === id ? { ...p, ...patch } : p)) })
  const reorder = (from: number, to: number) => {
    const next = [...d.pages]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    set({ pages: next })
  }

  const missing = purpose.pages.filter((pp) => pp.tier === 'recommended' && !hasType(pp.type) && !dismissed.includes(pp.type))
  const optional = purpose.pages.filter((pp) => pp.tier === 'optional' && !hasType(pp.type))
  const editing = d.pages.find((p) => p.id === editingId) ?? null

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {d.pages.map((p, i) => (
          <div key={p.id} draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i); setDragIndex(null) }}
            className="choice cursor-grab p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm tabular-nums text-muted" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <div className="flex gap-1">
                <button type="button" aria-label={`Edit ${p.label}`} className="text-muted hover:text-ink" onClick={() => setEditingId(p.id)}><Pencil size={15} /></button>
                <button type="button" aria-label={`Remove ${p.label}`} className="text-muted hover:text-ink" onClick={() => removePage(p.id)}><X size={15} /></button>
              </div>
            </div>
            <p className="mt-2 font-medium">{p.label}</p>
            {p.purpose && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{p.purpose}</p>}
          </div>
        ))}
      </div>

      <dialog ref={dialogRef} onClose={() => setEditingId(null)} aria-labelledby="page-edit-title" className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-xl bg-paper p-0 text-ink backdrop:bg-ink/50">
        {editing && (
          <div className="space-y-3 p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="page-edit-title" className="text-xl font-medium">Edit page</h2>
              <button type="button" onClick={() => setEditingId(null)} className="-m-2 p-2 text-muted hover:text-ink" aria-label="Close"><X size={18} /></button>
            </div>
            <label className="block text-sm"><span className="font-medium">Page name</span>
              <input autoFocus value={editing.label} onChange={(e) => updatePage(editing.id, { label: e.target.value })} className="mt-1 block w-full rounded border border-line p-2" /></label>
            <label className="block text-sm"><span className="font-medium">What should this page do?</span>
              <textarea value={editing.purpose} onChange={(e) => updatePage(editing.id, { purpose: e.target.value })} rows={3} className="mt-1 block w-full rounded border border-line p-2" /></label>
            <div className="flex justify-end pt-1"><button type="button" className="btn btn-ink btn-sm" onClick={() => setEditingId(null)}>Done</button></div>
          </div>
        )}
      </dialog>

      {missing.length > 0 && (
        <div className="rounded-lg bg-ink p-4 text-paper">
          <p className="font-medium">A complete {purpose.name.toLowerCase()} site usually needs a few more pages.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {missing.map((pp) => (
              <span key={pp.type} className="inline-flex items-center gap-2 rounded-full border border-paper/30 py-1 pl-3 pr-1 text-sm">
                {pp.label}
                <button type="button" className="rounded-full bg-paper/10 px-2 py-0.5 text-xs" onClick={() => addPage(pp.type, pp.label)}>Add</button>
                <button type="button" className="rounded-full px-2 py-0.5 text-xs text-paper/60" onClick={() => setDismissed((x) => [...x, pp.type])}>Dismiss</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {optional.length > 0 && (
        <div>
          <p className="text-sm font-medium text-muted">Optional pages</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {optional.map((pp) => (
              <button type="button" key={pp.type} className="choice flex items-start gap-1.5 p-3 text-left text-sm" onClick={() => addPage(pp.type, pp.label)}>
                <Plus size={15} className="mt-0.5 shrink-0 text-muted" aria-hidden />
                <span>{pp.label}<span className="block text-xs text-muted">{pageTypes[pp.type].hint}</span></span>
              </button>
            ))}
          </div>
        </div>
      )}

      <details className="rounded-lg border border-line bg-white p-4">
        <summary className="cursor-pointer text-sm font-medium">Utility & legal pages</summary>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {UTILITY_PAGE_TYPES.filter((t) => !hasType(t)).map((t) => (
            <button type="button" key={t} className="choice flex items-start gap-1.5 p-3 text-left text-sm" onClick={() => addPage(t, pageTypes[t].name)}>
              <Plus size={15} className="mt-0.5 shrink-0 text-muted" aria-hidden />
              <span>{pageTypes[t].name}<span className="block text-xs text-muted">{pageTypes[t].hint}</span></span>
            </button>
          ))}
        </div>
      </details>

      <button type="button" className="link inline-flex items-center gap-1 text-sm" onClick={addCustom}><Plus size={14} aria-hidden />Add a custom page</button>
    </div>
  )
}

function PaletteStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const dir = directions[d.direction ?? 'japanese-minimal']
  const ids = [...dir.palettes, ...(Object.keys(palettes) as PaletteId[]).filter((x) => !dir.palettes.includes(x))]
  const [all, setAll] = useState(false)
  const current = d.palette ?? dir.defaults.palette
  const colors = { ...palettes[current].colors, ...d.customPalette }
  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Palette"><Grid>
        {(all ? ids : ids.slice(0, 6)).map((id) => (
          <Card key={id} selected={current === id} title={palettes[id].name} line={palettes[id].line} badge={dir.palettes.includes(id) ? (id === dir.defaults.palette ? 'Recommended' : 'Fits') : undefined}
            onClick={() => set({ palette: id, customPalette: undefined })}>
            <SitePreview {...preview({ ...d, palette: id, customPalette: undefined }, { motion: 'still' })} />
            <span className="block px-4 pt-3"><Swatches colors={Object.values(palettes[id].colors)} /></span>
          </Card>
        ))}
      </Grid></div>
      {!all && <button type="button" className="link text-sm" onClick={() => setAll(true)}>Explore all {ids.length} atmospheres</button>}
      <PaletteEditor colors={colors} changed={!!d.customPalette} onReset={() => set({ customPalette: undefined })} onChange={(c) => set({ palette: current, customPalette: c })} />
    </div>
  )
}

function TypeStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const dir = directions[d.direction ?? 'japanese-minimal']
  const rec = dir.typography
  const [all, setAll] = useState(false)
  const ids = all ? [...rec, ...(Object.keys(typography) as TypographyId[]).filter((x) => !rec.includes(x))] : rec
  const current = d.typography ?? dir.defaults.typography
  const t = typography[current]
  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Typography" className="grid gap-3 xl:grid-cols-2">
        {ids.map((id) => (
          <Card key={id} selected={current === id} title={typography[id].name} line={typography[id].line} badge={id === dir.defaults.typography ? 'Recommended' : undefined} onClick={() => set({ typography: id })}>
            <span className="block px-4 pt-5"><TypeCard t={typography[id]} /></span>
          </Card>
        ))}
      </div>
      {!all && <button type="button" className="link text-sm" onClick={() => setAll(true)}>Choose another pairing</button>}
      <div className="rounded-lg border border-line bg-white p-5 text-sm">
        <p className="font-medium">{t.name}: how it&apos;s set</p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-4">
          {(['display', 'heading', 'body', 'utility'] as const).map((r) => (
            <div key={r}><dt className="capitalize text-muted">{r}</dt><dd>{t[r].family} {t[r].weight}<br /><span className="text-muted">lh {t[r].lineHeight} · ls {t[r].letterSpacing}</span></dd></div>
          ))}
        </dl>
        <p className="prose-serif mt-4 text-base">{t.why}</p>
      </div>
    </div>
  )
}

const ASSET_OPTS: { id: AssetId; name: string; accept?: string }[] = [
  { id: 'logo', name: 'Logo', accept: 'image/*,.svg' }, { id: 'images', name: 'Images', accept: 'image/*' }, { id: 'video', name: 'Video', accept: 'video/*' },
  { id: 'product-photos', name: 'Product photos', accept: 'image/*' }, { id: 'illustrations', name: 'Illustrations', accept: 'image/*,.svg' },
  { id: '3d', name: '3D assets', accept: '.glb,.gltf,.splinecode' }, { id: 'fonts', name: 'Brand fonts', accept: '.woff,.woff2,.otf,.ttf' }, { id: 'copy', name: 'Copy' },
]

async function inspect(file: File, asset: AssetId): Promise<UploadedAsset> {
  const fileId = crypto.randomUUID().slice(0, 12)
  await putFile(fileId, file) // the actual bytes; UploadedAsset (below) only ever holds this reference, never the File itself
  const base: UploadedAsset = { asset, name: file.name, kind: file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'other', fileId }
  const url = URL.createObjectURL(file)
  try {
    if (base.kind === 'image') {
      const i = new Image(); i.src = url; await i.decode()
      return { ...base, width: i.naturalWidth, height: i.naturalHeight }
    }
    if (base.kind === 'video') {
      const v = document.createElement('video'); v.preload = 'metadata'; v.src = url
      await new Promise((ok, fail) => { v.onloadedmetadata = ok; v.onerror = fail })
      return { ...base, width: v.videoWidth, height: v.videoHeight, duration: v.duration }
    }
  } catch { /* unreadable → keep name + bytes, skip dimensions */ } finally { URL.revokeObjectURL(url) }
  return base
}

/** Swaps in newly uploaded files for one asset type, freeing the IndexedDB bytes of whatever they replace. */
async function replaceUploads(d: Draft, asset: AssetId, metas: UploadedAsset[]): Promise<UploadedAsset[]> {
  await Promise.all(d.uploads.filter((u) => u.asset === asset && u.fileId).map((u) => deleteFile(u.fileId!)))
  return [...d.uploads.filter((u) => u.asset !== asset), ...metas]
}

export function uploadAdvice(u: UploadedAsset): string | null {
  if (u.kind === 'video' && u.width && u.height && u.duration) {
    const ratio = u.width / u.height
    if (u.width < 1280 && u.height < 1280) return `${u.width}×${u.height} is low for a hero — aim for 1920×1080.`
    if (u.duration > 20) return `${u.duration.toFixed(0)}s is long; trim to 5–15s for a hero loop.`
    if (Math.abs(ratio - 16 / 9) > 0.1 && Math.abs(ratio - 9 / 16) > 0.1) return `Aspect ${ratio.toFixed(2)} — hero video works best at 16:9 (desktop) or 9:16 (mobile).`
    return `Good: ${u.width}×${u.height}, ${u.duration.toFixed(1)}s.`
  }
  if (u.kind === 'image' && u.width) return u.width < 1600 && (u.height ?? 0) < 1600 ? `${u.width}×${u.height} may look soft full-width — 2400px is ideal.` : `Good: ${u.width}×${u.height}.`
  return null
}

function AssetsStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const toggle = (a: AssetId) => set({ assets: d.assets.includes(a) ? d.assets.filter((x) => x !== a) : [...d.assets, a] })
  const upload = async (a: AssetId, files: FileList | null) => {
    if (!files?.length) return
    const metas = await Promise.all([...files].slice(0, 12).map((f) => inspect(f, a)))
    set({ uploads: await replaceUploads(d, a, metas), assets: d.assets.includes(a) ? d.assets : [...d.assets, a] })
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {ASSET_OPTS.map((o) => {
        const ups = d.uploads.filter((u) => u.asset === o.id)
        return (
          <div key={o.id} className={`choice p-4 ${has(d, o.id) ? 'border-pencil!' : ''}`}>
            <label className="flex cursor-pointer items-center gap-3">
              <input type="checkbox" checked={has(d, o.id)} onChange={() => toggle(o.id)} className="h-5 w-5 accent-[var(--color-pencil)]" />
              <span className="font-medium">{o.name}</span>
            </label>
            {o.accept && (
              <label className="mt-3 block text-sm">
                <span className="link cursor-pointer">Upload{ups.length ? ' again' : ''}</span>
                <input type="file" accept={o.accept} multiple={o.id === 'images' || o.id === 'product-photos'} className="sr-only" onChange={(e) => upload(o.id, e.target.files)} />
              </label>
            )}
            {ups.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-muted">{ups.map((u) => <li key={u.name}>{u.name}{uploadAdvice(u) && <span className="block text-pencil">{uploadAdvice(u)}</span>}</li>)}</ul>
            )}
          </div>
        )
      })}
      <p className="text-sm text-muted sm:col-span-2">Uploads stay in your browser. We read size and duration to check they fit the recipe.</p>
    </div>
  )
}

function MediaStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const lead = d.lead ?? 'photography'
  const hero = heroes[resolveHero({ lead, motion: d.motion ?? 'subtle' }).id]
  const isVideo = lead === 'video'
  const opts: { plan: MediaPlan | 'switch' | 'upload'; title: string; line: string }[] = isVideo ? [
    { plan: 'upload', title: 'I already have a video', line: 'Upload it — we check resolution, aspect ratio and length.' },
    { plan: 'image-to-video', title: 'I have an image', line: 'We write the image-to-video prompt and settings for you.' },
    { plan: 'temporary', title: 'Find a temporary video', line: 'Use a curated free clip now, replace it before launch.' },
    { plan: 'switch', title: 'Use an image-based alternative', line: 'Switch this recipe to photography — no video needed.' },
  ] : [
    { plan: 'upload', title: `I have the ${leads[lead].name.toLowerCase()}`, line: 'Upload it now or mark it as available.' },
    { plan: 'temporary', title: 'Use a temporary placeholder', line: 'See the final idea now. Replace it with your own before launch.' },
    { plan: 'have', title: 'I\'ll create or find it', line: 'We add a creation path and resources to your recipe.' },
    ...(lead === '3d' || lead === 'illustration' ? [{ plan: 'switch' as const, title: 'Use an image-based alternative', line: 'Switch this recipe to photography.' }] : []),
  ]
  const [uploading, setUploading] = useState(false)
  const asset = LEAD_ASSET[lead]!
  const vid = d.uploads.find((u) => u.asset === 'video')
  return (
    <div className="space-y-6">
      <p className="max-w-xl text-lg text-ink-2">This recipe is possible, but you&apos;ll need visual media first. The {hero.name.toLowerCase()} needs: {hero.requires.join('; ')}.</p>
      <div role="radiogroup" aria-label="Media plan" className="grid gap-2 sm:grid-cols-2">
        {opts.map((o) => (
          <Card key={o.plan} title={o.title} line={o.line} selected={o.plan === 'upload' ? uploading : d.mediaPlan === o.plan}
            onClick={() => {
              if (o.plan === 'switch') set({ lead: 'photography', mediaPlan: undefined })
              else if (o.plan === 'upload') setUploading(true)
              else { setUploading(false); set({ mediaPlan: o.plan }) }
            }} />
        ))}
      </div>
      {uploading && (
        <div className="rounded-lg border border-line bg-white p-5">
          <label className="block">
            <span className="font-medium">Upload {isVideo ? 'your video' : leads[lead].name.toLowerCase()}</span>
            <input type="file" accept={isVideo ? 'video/*' : lead === '3d' ? '.glb,.gltf' : 'image/*'} className="mt-3 block text-sm"
              onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const u = await inspect(f, asset); set({ uploads: await replaceUploads(d, asset, [u]), assets: [...d.assets, asset], mediaPlan: 'have' }) } }} />
          </label>
          <button type="button" className="link mt-3 text-sm" onClick={() => set({ assets: [...d.assets, asset], mediaPlan: 'have' })}>I have it, I&apos;ll add it later</button>
          {vid && <p className="mt-3 text-sm text-pencil">{uploadAdvice(vid)}</p>}
        </div>
      )}
      {d.mediaPlan === 'image-to-video' && (
        <div className="rounded-lg bg-ink p-5 text-paper">
          <p className="font-medium">You can turn your image into a video asset.</p>
          <p className="mt-2 text-sm text-paper/70">Your recipe will include the prompt, camera movement, duration (5–8s), aspect ratio and the tools to use. Upload the image now if you like:</p>
          <input type="file" accept="image/*" className="mt-3 block text-sm" onChange={async (e) => { const f = e.target.files?.[0]; if (f) { const u = await inspect(f, 'images'); set({ uploads: await replaceUploads(d, 'images', [u]), assets: d.assets.includes('images') ? d.assets : [...d.assets, 'images'] }) } }} />
        </div>
      )}
      {d.mediaPlan === 'temporary' && <p className="text-sm text-pencil">This is a temporary placeholder. Replace it with your own asset before launch — your Build Package marks it as replaceable.</p>}
    </div>
  )
}
