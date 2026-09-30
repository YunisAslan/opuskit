'use client'
// The showcase builder: plan a site in three clear steps. The step bar always says where you are and what it is for.
//   1 Style  — applies to every page
//   2 Pages  — one page at a time, top to bottom
//   3 Create — the recipe and Build Package
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useGoogleFonts } from '@/components/FontLoader'
import { directions, purposes } from '@/data/taxonomy'
import { examples } from '@/data/examples'
import exampleSpecs from '@/data/example-specs.generated.json'
import { seedBySlug } from '@/data/recipes'
import { planToSpec, setStyle, specFromChoices, specToPlan, start, starters } from '@/features/kit/plan'
import { isValidSpec, specFromSeed } from '@/features/recipes/engine'
import { saveGeneration, type Generation } from '@/features/recipes/library'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { KEYS, get, useHydrated } from '@/lib/store'
import type { PurposeId, RecipeSpec } from '@/types/domain'
import { PagesStep } from './PagesStep'
import { lookOf } from './ProductVisual'
import { StepBar, type KitStep } from './StepBar'
import { StyleStep } from './StyleStep'


export function Builder() {
  const plan = usePlan()
  const ready = useHydrated()
  const params = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState<'style' | 'pages'>('style')
  // Which Style category opens: from the URL (?cat=).
  const [styleCat, setStyleCat] = useState<string | null>(() => params.get('cat'))
  useEffect(() => { const s = params.get('step'); if (s === 'style' || s === 'pages') setStep(s); if (s === 'create') setStep('pages') }, [params])
  // Customise: /kit?from=seed:slug | gen:id | example:slug opens that recipe here — the kit is the one editor.
  const opened = useRef<string | null>(null)
  useEffect(() => {
    const f = params.get('from')
    if (!f || opened.current === f) return
    opened.current = f
    const [kind, id] = f.split(':')
    const gen = kind === 'gen' ? get<Record<string, Generation>>(KEYS.generations, {})[id]?.spec : undefined
    const spec = kind === 'seed' && seedBySlug[id] ? specFromSeed(seedBySlug[id])
      : kind === 'example' ? (exampleSpecs as Record<string, RecipeSpec>)[id] ?? specFromChoices(examples.find((e) => e.slug === id)?.choices ?? [])
      : isValidSpec(gen) ? gen : null
    // Already this recipe in the kit (step 3 → back): keep the draft as it is.
    if (spec && !(kind === 'gen' && readPlan().fromId === id)) {
      const before = readPlan()
      writePlan(specToPlan(spec, kind === 'gen' ? id : undefined))
      if (before.pages.length) toast('Opened in the kit. Your previous draft was replaced.', { action: { label: 'Undo', onClick: () => writePlan(before) } })
    }
    const rest = new URLSearchParams(params); rest.delete('from')
    router.replace(`/kit?${rest}`, { scroll: false })
  }, [params, router])
  // /kit?look=id (from Explore → Styles): use that look, keep everything else.
  useEffect(() => {
    const id = params.get('look')
    if (!id || !(id in directions)) return
    updatePlan((p) => setStyle(p, 'direction', id))
    const rest = new URLSearchParams(params); rest.delete('look')
    router.replace(`/kit?${rest}`, { scroll: false })
  }, [params, router])
  // Step 3 is the recipe itself: save (or update the one this plan came from) and open it.
  // It builds on the recipe's latest saved version, so what was changed there (uploads, media) is kept.
  const toRecipe = () => {
    const p = readPlan(), latest = p.fromId ? get<Record<string, Generation>>(KEYS.generations, {})[p.fromId]?.spec : undefined
    const spec = planToSpec(isValidSpec(latest) ? { ...p, from: latest } : p)
    const id = saveGeneration(spec, p.fromId)
    updatePlan((p) => ({ ...p, fromId: id, from: spec }))
    router.push(`/result/${id}`)
  }
  const go = (s: KitStep) => {
    if (s === 'recipe') return toRecipe()
    if (s === 'pages') setStyleCat(null)
    setStep(s); router.replace(`/kit?step=${s}`, { scroll: false }); window.scrollTo({ top: 0 })
  }
  const look = lookOf(plan)
  useGoogleFonts(look.type.googleFamilies)

  if (!ready) return null
  if (!plan.pages.length) return <Start onStart={(p) => { updatePlan((x) => start(x, p)); go('style') }} />


  return (
    <div className="pb-24">
      <StepBar plan={plan} step={step} onGo={go} />

      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
        {step === 'style' && <StyleStep plan={plan} initialCat={styleCat} initialFeel={params.get('feel')} onDone={() => go('pages')} />}
        {step === 'pages' && <PagesStep plan={plan} initialFocus={params.get('shelf')} />}
      </div>
    </div>
  )
}

/** First visit: pick the kind of site (it brings its usual pages) or start from a blank Home page. */
function Start({ onStart }: { onStart: (p: PurposeId | null) => void }) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-8">
      <p className="text-sm text-muted">Kit · build a site in three steps: style, pages, create</p>
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
