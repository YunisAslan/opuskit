'use client'
// Step 3 — Create: the whole plan on one screen, the tool, and the button. Every line links back to where it is changed.
import { useRouter } from 'next/navigation'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { ToolIcon } from '@/components/ToolIcon'
import { TARGETS } from '@/data/targets'
import { sections } from '@/data/patterns'
import { pieces } from '@/data/pieces'
import { planToSpec } from '@/features/kit/plan'
import { composeRecipe } from '@/features/recipes/engine'
import { saveGeneration } from '@/features/recipes/library'
import { updatePlan } from '@/lib/kit'
import type { KitPlan } from '@/types/domain'
import type { Step } from './Builder'

export function CreateStep({ plan, onEdit }: { plan: KitPlan; onEdit: (s: Step) => void }) {
  const router = useRouter()
  const spec = planToSpec(plan)
  const r = composeRecipe(spec)
  const target = plan.target ?? 'not-sure'
  const codeFiles = new Set(r.pages.flatMap((p) => p.sections).filter((s) => s.code).map((s) => s.code!.path)).size + r.pieces.length

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
      <div className="space-y-10">
        <p className="max-w-2xl rounded-md bg-pencil-soft px-4 py-3 text-sm"><span className="font-medium">Step 3 — Create.</span> Check the plan, pick the tool you build with, and get a Universal Recipe plus its Build Package — with {codeFiles} ready code files included.</p>

        <section>
          <div className="flex items-baseline justify-between"><h2 className="text-lg font-medium">Style · every page</h2><button type="button" className="text-sm link" onClick={() => onEdit('style')}>Change</button></div>
          <p className="mt-2 text-ink-2">{r.summary}</p>
          <p className="mt-2 text-sm text-muted">{[r.visualSystem.palette.name, r.visualSystem.typography.name, r.visualSystem.shape.name, r.chrome.nav.name].join(' · ')}</p>
        </section>

        <section>
          <div className="flex items-baseline justify-between"><h2 className="text-lg font-medium">Pages</h2><button type="button" className="text-sm link" onClick={() => onEdit('pages')}>Change</button></div>
          <ol className="mt-3 divide-y divide-line border-y border-line">
            {plan.pages.map((p, i) => (
              <li key={p.id} className="grid gap-1 py-3 sm:grid-cols-[10rem_1fr]">
                <span className="font-medium"><span className="mr-2 text-sm tabular-nums text-muted">{i + 1}</span>{p.label}</span>
                <span className="text-sm text-ink-2">{p.sections.length ? p.sections.map((s) => `${s.id === 'hero' ? `First screen (${r.media.hero.name})` : sections[s.id].name}${s.pieces.length ? ` + ${s.pieces.map((x) => pieces[x].name).join(', ')}` : ''}`).join(' → ') : 'Written from its purpose'}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-40 lg:self-start" aria-label="Create">
        <SitePreview {...previewFromRecipe(r, plan.name ? { title: plan.name, brand: plan.name } : {})} className="rounded-lg border border-line" />
        <div>
          <p className="text-sm font-medium">Build it with</p>
          <div role="radiogroup" aria-label="Build with" className="mt-2 grid grid-cols-2 gap-2">
            {TARGETS.map(([id, name]) => (
              <button key={id} type="button" role="radio" aria-checked={target === id} onClick={() => updatePlan((p) => ({ ...p, target: id }))}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-left text-sm ${target === id ? 'border-pencil bg-pencil-soft' : 'border-line bg-white hover:border-ink'}`}>
                {id !== 'not-sure' && <ToolIcon id={id} className="size-4" />}{name}
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="btn btn-ink w-full" onClick={() => router.push(`/result/${saveGeneration(spec)}`)}>Create my recipe</button>
        <p className="text-xs text-muted">Your plan stays here — come back to the showcase to change it and create again.</p>
      </aside>
    </div>
  )
}
