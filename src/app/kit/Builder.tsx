'use client'
// The showcase builder: plan a site in three clear steps. The step bar always says where you are and what it is for.
//   1 Style  — applies to every page
//   2 Pages  — one page at a time, top to bottom
//   3 Create — the recipe and Build Package
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useGoogleFonts } from '@/components/FontLoader'
import { LazyMount } from '@/components/LazyMount'
import { SitePreview, previewFromDirection } from '@/components/SitePreview'
import { directions, purposes } from '@/data/taxonomy'
import { examples } from '@/data/examples'
import exampleSpecs from '@/data/example-specs.generated.json'
import { seedBySlug } from '@/data/recipes'
import { planToSpec, setStyle, specFromChoices, specToPlan, start, starters } from '@/features/kit/plan'
import { isValidSpec, specFromSeed } from '@/features/recipes/engine'
import { saveGeneration, type Generation } from '@/features/recipes/library'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { KEYS, get, useHydrated } from '@/lib/store'
import type { DirectionId, PurposeId, RecipeSpec } from '@/types/domain'
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
  // Bumped to reopen Design on a category even when Design is already showing (the step bar's site name).
  const [styleKey, setStyleKey] = useState(0)
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
      <StepBar plan={plan} step={step} onGo={go} onSite={() => { setStyleCat('site'); setStyleKey((k) => k + 1); go('style') }} />

      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
        {step === 'style' && <StyleStep key={styleKey} plan={plan} initialCat={styleCat} initialFeel={params.get('feel')} onDone={() => go('pages')} />}
        {step === 'pages' && <PagesStep plan={plan} initialFocus={params.get('shelf')} />}
      </div>
    </div>
  )
}

/** Each starter card shows a first screen in a look that suits that kind of site, with a headline it might use. */
const CARD: Partial<Record<PurposeId, [DirectionId, string]>> = {
  portfolio: ['art-editorial', 'Selected work, 2019–2026'], agency: ['swiss-modern', 'Brands people remember'], studio: ['architectural-minimal', 'Houses for steep ground'],
  fashion: ['fashion-editorial', 'The autumn collection'], restaurant: ['warm-hospitality', 'Dinner, from seven'], ecommerce: ['playful-pop', 'New in: the summer edit'],
  product: ['bento-product', 'Meet the new speaker'], saas: ['technical-minimal', 'Close your books in one click'], 'personal-brand': ['modern-heritage', 'Writer, speaker, gardener'],
  experiment: ['digital-futurism', 'A small experiment in light'], blog: ['news-grid', 'Notes from the field'], event: ['cinematic-editorial', 'Three days in June'],
  nonprofit: ['soft-pastel', 'Clean water, one village at a time'], 'real-estate': ['scandinavian-minimal', 'Homes with light in them'], hotel: ['coastal-calm', 'Rooms by the sea'],
  course: ['organic-modern', 'Learn to throw pots in six weeks'], clinic: ['japanese-minimal', 'Care that starts with listening'],
}

/** First visit: pick the kind of site (it brings its usual pages) or start from a blank Home page — or from a real site. */
function Start({ onStart }: { onStart: (p: PurposeId | null) => void }) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-8">
      <p className="text-sm text-muted">Kit · build a site in three steps: design, pages, recipe</p>
      <h1 className="display mt-3 text-[clamp(2.2rem,5vw,4rem)]">What are you making?</h1>
      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="max-w-2xl text-ink-2">Pick the closest kind of site — it comes with its usual pages and sections, which you can change later. Nothing here is final.</p>
        <Link href="/examples" className="link inline-flex items-center gap-1 text-sm">Or start from one of {examples.length} real sites<ArrowRight size={14} aria-hidden /></Link>
      </div>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {starters.map((s) => {
          const card = CARD[s.id]
          return (
            <li key={s.id}>
              <button type="button" onClick={() => onStart(s.id)} className="choice block h-full w-full overflow-hidden text-left">
                {card && <LazyMount className="pointer-events-none overflow-hidden border-b border-line"><SitePreview {...previewFromDirection(card[0], { title: card[1] })} /></LazyMount>}
                <span className="block p-4">
                  <span className="block font-medium">{purposes[s.id].name}</span>
                  <span className="mt-1 block text-sm text-muted">{s.pages.join(' · ')}</span>
                </span>
              </button>
            </li>
          )
        })}
        <li><button type="button" onClick={() => onStart(null)} className="grid h-full min-h-40 w-full place-content-center rounded-lg border border-dashed border-muted p-4 text-center hover:border-ink"><span className="block font-medium">Start blank</span><span className="mt-1 block text-sm text-muted">One empty Home page — add everything yourself</span></button></li>
      </ul>
    </div>
  )
}
