'use client'
import { Check, Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { SitePreview, previewFromDirection, previewFromRecipe } from '@/components/SitePreview'
import { Chip } from '@/components/ui'
import { components, inspirationSources, motionPatterns } from '@/data/patterns'
import { recipeSeeds } from '@/data/recipes'
import { directions, families, leads, motionLevels } from '@/data/taxonomy'
import { setStyle, start } from '@/features/kit/plan'
import { composeRecipe, specFromSeed } from '@/features/recipes/engine'
import { updatePlan, usePlan } from '@/lib/kit'
import type { DirectionId, FamilyId, LeadId, MotionLevel } from '@/types/domain'

const TABS = [['recipes', 'Recipes'], ['styles', 'Styles'], ['motion', 'Motion'], ['components', 'Components'], ['references', 'References']] as const
type Tab = (typeof TABS)[number][0]

export function Explore() {
  const params = useSearchParams()
  const router = useRouter()
  const tab = (TABS.find(([t]) => t === params.get('tab'))?.[0] ?? 'recipes') as Tab
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
      <div className="flex flex-wrap items-center gap-2 border-b border-line pb-4" role="tablist" aria-label="Explore">
        {TABS.map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} onClick={() => router.replace(id === 'recipes' ? '/explore' : `/explore?tab=${id}`, { scroll: false })}
            className="rounded-full px-4 py-2 text-sm aria-selected:bg-ink aria-selected:text-paper hover:bg-paper-2">{label}</button>
        ))}
        <Link href="/resources" className="rounded-full px-4 py-2 text-sm hover:bg-paper-2">Resources</Link>
      </div>
      <div className="pt-8" role="tabpanel">
        {tab === 'recipes' && <Recipes />}
        {tab === 'styles' && <Styles />}
        {tab === 'motion' && <Motion />}
        {tab === 'components' && <Components />}
        {tab === 'references' && <References />}
      </div>
    </div>
  )
}

function Recipes() {
  const all = useMemo(() => recipeSeeds.map((s) => ({ seed: s, recipe: composeRecipe(specFromSeed(s)) })), [])
  const [q, setQ] = useState('')
  const [fam, setFam] = useState<FamilyId | null>(null)
  const [lead, setLead] = useState<LeadId | null>(null)
  const [motion, setMotion] = useState<MotionLevel | null>(null)
  const list = all.filter(({ seed, recipe }) =>
    (!fam || recipe.metadata.familyIds.includes(fam)) && (!lead || seed.spec.lead === lead) && (!motion || seed.spec.motion === motion)
    && (!q || `${seed.title} ${seed.summary} ${seed.mood.join(' ')}`.toLowerCase().includes(q.toLowerCase())))

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <FilterRow label="Feeling">{(Object.keys(families) as FamilyId[]).map((f) => <Chip key={f} active={fam === f} onClick={() => setFam(fam === f ? null : f)}>{families[f].name}</Chip>)}</FilterRow>
          <FilterRow label="Media">{(Object.keys(leads) as LeadId[]).map((l) => <Chip key={l} active={lead === l} onClick={() => setLead(lead === l ? null : l)}>{leads[l].name}</Chip>)}</FilterRow>
          <FilterRow label="Motion">{(Object.keys(motionLevels) as MotionLevel[]).map((m) => <Chip key={m} active={motion === m} onClick={() => setMotion(motion === m ? null : m)}>{motionLevels[m].name}</Chip>)}</FilterRow>
        </div>
        <label className="self-start"><span className="sr-only">Search recipes</span>
          <span className="relative block"><Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search recipes" className="h-11 w-full rounded-full pl-10 lg:w-72" /></span>
        </label>
      </div>
      {list.length === 0 ? (
        <div className="py-24 text-center"><p className="text-xl">No recipe matches all of those.</p><button type="button" className="link mt-3" onClick={() => { setFam(null); setLead(null); setMotion(null); setQ('') }}>Clear filters</button></div>
      ) : (
        <ul className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
          {list.map(({ seed, recipe }) => (
            <li key={seed.slug}>
              <Link href={`/recipe/${seed.slug}`} className="group block">
                <SitePreview {...previewFromRecipe(recipe)} className="rounded-lg border border-line transition-transform duration-300 group-hover:-translate-y-1" />
                <div className="mt-4 flex items-baseline gap-3"><span className="text-sm tabular-nums text-muted">{seed.number}</span><h2 className="text-xl font-medium tracking-tight group-hover:text-pencil">{seed.title}</h2></div>
                <p className="mt-1 pl-8 text-sm text-ink-2">{seed.summary}</p>
                <p className="mt-2 pl-8 text-xs text-muted">{leads[seed.spec.lead].name} · {motionLevels[seed.spec.motion].name} motion · {recipe.visualSystem.typography.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-1.5"><span className="w-16 text-sm text-muted">{label}</span>{children}</div>
}

function Styles() {
  return (
    <div className="space-y-16">
      <p className="max-w-2xl text-ink-2">&ldquo;Modern&rdquo; isn&apos;t one style. These are the specific directions beneath it, grouped by feeling. Directions can belong to more than one family.</p>
      {Object.values(families).map((f) => (
        <section key={f.id} aria-labelledby={`fam-${f.id}`}>
          <div className="flex items-baseline justify-between border-t border-ink pt-3"><h2 id={`fam-${f.id}`} className="text-2xl font-medium tracking-tight">{f.name}</h2><span className="text-sm text-muted">{f.line}</span></div>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {f.directions.map((id) => (
              <li key={id}>
                <Link href={`/kit?look=${id}`} className="group block">
                  <SitePreview {...previewFromDirection(id)} className="rounded-md border border-line" />
                  <p className="mt-3 font-medium group-hover:text-pencil">{directions[id].name}</p>
                  <p className="text-sm text-muted">{directions[id].line}</p>
                </Link>
                <AddStyleToKit id={id} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function Motion() {
  return (
    <ul className="grid gap-x-8 gap-y-10 md:grid-cols-2">
      {motionPatterns.map((m) => (
        <li key={m.id} className="border-t border-line pt-4">
          <div className="flex items-baseline justify-between gap-3"><h2 className="text-xl font-medium">{m.name}</h2><span className="text-sm text-muted">{m.levels.map((l) => motionLevels[l].name).join(', ')}</span></div>
          <p className="mt-2 text-ink-2">{m.purpose}</p>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted">Behavior</dt><dd>{m.behavior}</dd></div>
            <div><dt className="text-muted">Built with</dt><dd>{m.implementation}</dd></div>
            <div><dt className="text-muted">Timing</dt><dd>{m.duration} · {m.easing}</dd></div>
            <div><dt className="text-muted">Reduced motion</dt><dd>{m.reducedMotion}</dd></div>
          </dl>
        </li>
      ))}
    </ul>
  )
}

function Components() {
  return (
    <ul className="grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
      {Object.values(components).map((c) => (
        <li key={c.id} className="border-t border-line pt-3">
          <p className="font-mono text-sm">{`<${c.id} />`}</p>
          <p className="mt-1">{c.purpose}</p>
          <p className="mt-1 text-sm text-muted">{c.anatomy}</p>
        </li>
      ))}
    </ul>
  )
}

function References() {
  const refs = recipeSeeds.flatMap((s) => s.references.map((r) => ({ ...r, recipe: s })))
  return (
    <div className="space-y-12">
      <ul className="grid gap-6 md:grid-cols-4">
        {inspirationSources.map((s) => <li key={s.id}><a href={s.url} target="_blank" rel="noreferrer" className="text-xl font-medium hover:text-pencil">{s.name}</a><p className="mt-1 text-sm text-ink-2">{s.line}</p></li>)}
      </ul>
      <ul className="divide-y divide-line border-y border-line">
        {refs.map((r) => (
          <li key={`${r.recipe.slug}-${r.title}`} className="grid gap-2 py-4 md:grid-cols-[2fr_3fr_1fr]">
            <a href={r.url} target="_blank" rel="noreferrer" className="font-medium hover:text-pencil">{r.title}</a>
            <p className="text-sm text-ink-2"><span className="text-muted">Study: </span>{r.study}</p>
            <Link href={`/recipe/${r.recipe.slug}`} className="text-sm link">{r.recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Puts a style into the kit (starting a blank site if there is none yet), so browsing can feed the bag. */
function AddStyleToKit({ id }: { id: DirectionId }) {
  const router = useRouter()
  const plan = usePlan()
  const on = plan.direction === id
  return (
    <button type="button" disabled={on} className="mt-2 inline-flex items-center gap-1 text-sm link disabled:no-underline disabled:opacity-60"
      onClick={() => { updatePlan((p) => setStyle(p.pages.length ? p : start(p, null), 'direction', id)); toast(`${directions[id].name} is your kit’s style`, { action: { label: 'Open kit', onClick: () => router.push('/kit') } }) }}>
      {on ? <><Check size={14} aria-hidden />Style in your kit</> : <><Plus size={14} aria-hidden />Use in kit</>}
    </button>
  )
}
