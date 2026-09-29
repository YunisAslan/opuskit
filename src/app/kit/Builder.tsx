'use client'
// The showcase builder: plan a site in three clear steps. The step bar always says where you are and what it is for.
//   1 Style  — applies to every page
//   2 Pages  — one page at a time, top to bottom
//   3 Create — the recipe and Build Package
import { Check, FileText, LayoutTemplate, Palette } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { Input } from '@/components/ui/input'
import { purposes } from '@/data/taxonomy'
import { start, starters } from '@/features/kit/plan'
import { planSummary, updatePlan, usePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { PurposeId } from '@/types/domain'
import { CreateStep } from './CreateStep'
import { PagesStep } from './PagesStep'
import { lookOf } from './ProductVisual'
import { StyleStep } from './StyleStep'

export type Step = 'style' | 'pages' | 'create'

export function Builder() {
  const plan = usePlan()
  const ready = useHydrated()
  const params = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState<Step>('style')
  useEffect(() => { const s = params.get('step') as Step | null; if (s && ['style', 'pages', 'create'].includes(s)) setStep(s) }, [params])
  const go = (s: Step) => { setStep(s); router.replace(`/kit?step=${s}`, { scroll: false }); window.scrollTo({ top: 0 }) }
  const look = lookOf(plan)
  useGoogleFonts(look.type.googleFamilies)

  if (!ready) return null
  if (!plan.pages.length) return <Start onStart={(p) => { updatePlan((x) => start(x, p)); go('style') }} />

  const sum = planSummary(plan)
  const steps: { id: Step; n: number; name: string; sub: string; icon: typeof Palette }[] = [
    { id: 'style', n: 1, name: 'Style', sub: 'Same on every page', icon: Palette },
    { id: 'pages', n: 2, name: 'Pages', sub: `${sum.pages} page${sum.pages === 1 ? '' : 's'}, ${sum.sections} sections`, icon: LayoutTemplate },
    { id: 'create', n: 3, name: 'Create', sub: 'Recipe + Build Package', icon: FileText },
  ]
  const idx = steps.findIndex((s) => s.id === step)

  return (
    <div className="pb-24">
      <div className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 md:px-8">
          <label className="flex items-center gap-2 text-sm"><span className="sr-only">Site name</span>
            <Input value={plan.name ?? ''} maxLength={60} placeholder="Name your site" onChange={(e) => updatePlan((p) => ({ ...p, name: e.target.value }))} className="h-9 w-48 bg-white font-medium" />
          </label>
          <ol className="flex flex-1 items-center gap-1 overflow-x-auto" aria-label="Steps">
            {steps.map((s, i) => (
              <li key={s.id} className="flex items-center gap-1">
                {i > 0 && <span aria-hidden className="h-px w-6 bg-line" />}
                <button type="button" onClick={() => go(s.id)} aria-current={step === s.id ? 'step' : undefined}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-1.5 text-left ${step === s.id ? 'bg-white shadow-sm ring-1 ring-line' : 'hover:bg-white/60'}`}>
                  <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${step === s.id ? 'bg-ink text-paper' : i < idx ? 'bg-pencil text-white' : 'border border-line text-muted'}`}>{i < idx ? <Check size={13} /> : s.n}</span>
                  <span className="leading-tight"><span className="block text-sm font-medium">{s.name}</span><span className="block whitespace-nowrap text-xs text-muted">{s.sub}</span></span>
                </button>
              </li>
            ))}
          </ol>
          {step !== 'create' && <button type="button" className="btn btn-ink btn-sm" onClick={() => go(step === 'style' ? 'pages' : 'create')}>{step === 'style' ? 'Next: build the pages' : 'Next: create the recipe'}</button>}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
        {step === 'style' && <StyleStep plan={plan} />}
        {step === 'pages' && <PagesStep plan={plan} onStyle={() => go('style')} />}
        {step === 'create' && <CreateStep plan={plan} onEdit={go} />}
      </div>
    </div>
  )
}

/** First visit: pick the kind of site (it brings its usual pages) or start from a blank Home page. */
function Start({ onStart }: { onStart: (p: PurposeId | null) => void }) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-8">
      <p className="text-sm text-muted">Showcase · plan a site in three steps: style, pages, create</p>
      <h1 className="display mt-3 text-[clamp(2.2rem,5vw,4rem)]">What are you making?</h1>
      <p className="mt-3 max-w-2xl text-ink-2">Pick the closest kind of site — it comes with its usual pages and sections, which you can change in step 2. Nothing here is final.</p>
      <ul className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {starters.map((s) => (
          <li key={s.id}>
            <button type="button" onClick={() => onStart(s.id)} className="choice block h-full w-full p-4 text-left">
              <span className="block font-medium">{purposes[s.id].name}</span>
              <span className="mt-1 block text-sm text-muted">{s.pages.join(' · ')}</span>
            </button>
          </li>
        ))}
        <li><button type="button" onClick={() => onStart(null)} className="block h-full w-full rounded-lg border border-dashed border-muted p-4 text-left hover:border-ink"><span className="block font-medium">Start blank</span><span className="mt-1 block text-sm text-muted">One empty Home page — add everything yourself</span></button></li>
      </ul>
    </div>
  )
}
