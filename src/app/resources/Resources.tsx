'use client'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMemo, useState } from 'react'
import { recipeSeeds } from '@/data/recipes'
import { resources, type ResourceCategory } from '@/data/resources'
import { families } from '@/data/taxonomy'
import { composeRecipe, specFromSeed } from '@/features/recipes/engine'
import type { FamilyId } from '@/types/domain'

const CATEGORY: Record<ResourceCategory, string> = {
  fonts: 'Fonts', images: 'Images', video: 'Video', icons: 'Icons', illustrations: 'Illustrations', '3d': '3D', textures: 'Textures', motion: 'Motion',
  libraries: 'Libraries', 'developer-tools': 'Developer tools', 'ai-media': 'AI media tools', 'design-tools': 'Design tools', inspiration: 'Inspiration', color: 'Color',
}

/** Radix Select can't hold an empty value, so "All" is a sentinel. */
const ALL = '__all'

export function Resources() {
  const byRecipe = useMemo(() => Object.fromEntries(recipeSeeds.map((s) => [s.slug, composeRecipe(specFromSeed(s)).resources])), [])
  const useCases = useMemo(() => [...new Set(resources.flatMap((r) => r.useCases))].sort(), [])
  const techs = useMemo(() => [...new Set(resources.flatMap((r) => r.technologies))].sort(), [])
  const [f, setF] = useState({ category: '', useCase: '', family: '', tech: '', recipe: '' })

  const list = resources.filter((r) =>
    (!f.category || r.category === f.category) && (!f.useCase || r.useCases.includes(f.useCase))
    && (!f.family || r.families.length === 0 || r.families.includes(f.family as FamilyId))
    && (!f.tech || r.technologies.includes(f.tech)) && (!f.recipe || byRecipe[f.recipe]?.includes(r.id)))

  const groups = (Object.keys(CATEGORY) as ResourceCategory[]).map((c) => [c, list.filter((r) => r.category === c)] as const).filter(([, xs]) => xs.length)
  const Filter = ({ k, label, options }: { k: keyof typeof f; label: string; options: [string, string][] }) => (
    <div className="text-sm"><Label className="text-muted" htmlFor={`f-${k}`}>{label}</Label>
      <Select value={f[k] || ALL} onValueChange={(v) => setF({ ...f, [k]: v === ALL ? '' : v })}>
        <SelectTrigger id={`f-${k}`} className="mt-1 w-full"><SelectValue /></SelectTrigger>
        <SelectContent><SelectItem value={ALL}>All</SelectItem>{options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
      </Select>
    </div>
  )

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
      <div className="grid gap-3 border-y border-line py-5 sm:grid-cols-2 lg:grid-cols-5">
        <Filter k="category" label="Category" options={Object.entries(CATEGORY)} />
        <Filter k="useCase" label="Use case" options={useCases.map((u) => [u, u])} />
        <Filter k="family" label="Style" options={Object.values(families).map((x) => [x.id, x.name])} />
        <Filter k="tech" label="Technology" options={techs.map((t) => [t, t])} />
        <Filter k="recipe" label="Recipe" options={recipeSeeds.map((s) => [s.slug, s.title])} />
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">{list.length} of {resources.length} resources</p>
      {groups.length === 0 ? (
        <div className="py-24 text-center"><p className="text-xl">Nothing here for that combination.</p><button type="button" className="link mt-3" onClick={() => setF({ category: '', useCase: '', family: '', tech: '', recipe: '' })}>Clear filters</button></div>
      ) : groups.map(([c, xs]) => (
        <section key={c} className="mt-12" aria-labelledby={`c-${c}`}>
          <h2 id={`c-${c}`} className="border-t border-ink pt-3 text-2xl font-medium tracking-tight">{CATEGORY[c]}</h2>
          <ul className="mt-4 grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
            {xs.map((r) => (
              <li key={r.id} className="border-b border-line py-4">
                <a href={r.url} target="_blank" rel="noreferrer" className="text-lg font-medium hover:text-pencil">{r.name}<span className="sr-only"> (opens in a new tab)</span></a>
                <p className="mt-1 text-sm text-ink-2">{r.description}</p>
                <p className="mt-2 text-sm"><span className="text-muted">Why: </span>{r.why}</p>
                <p className="mt-2 text-xs text-muted">{r.license} · verified {r.verifiedAt}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
