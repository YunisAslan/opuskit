'use client'
// Direction (docs/plan-library.md decisions 35, 36, 39–44): Make it yours — every look, colour and lettering
// (`LookPicker`) with the owner's brand drawn beside the lists (exact).
// The start is the first of `directionsFor`'s mixes, picked silently (the packs are no longer shown, decision 42).
// Pages are not shown: they come from the kind of site and the sentence; anything more is asked of the AI tool.
// A finished recipe (an example's, a saved one) opens here too, kept as it is (decision 44: no Brand screen).
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { palettes, typography } from '@/data/ingredients'
import { goals, purposes } from '@/data/taxonomy'
import { collectionSig, takenFrom, takenOf } from '@/features/library/collection'
import { inferGoal } from '@/features/kit/plan'
import { directionsFor, purposeFrom } from '@/features/library/inspire'
import { updateCollection, useCollection } from '@/lib/collection'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { KEYS, get, useHydrated, write } from '@/lib/store'
import { BrandCard } from '@/components/BrandCard'
import { LookPicker } from '../LookPicker'
import { StepFrame, usePlanLook, useToRecipe } from '../shared'
import type { KitPlan } from '@/types/domain'

/** The mix in use for these words and likes; `opened` names a finished recipe opened into them instead (decision 44). */
type Picked = { sig: string; pick: number; opened?: string }

export function Directions() {
  const ready = useHydrated()
  const c = useCollection()
  const plan = usePlan()
  const router = useRouter()
  const toRecipe = useToRecipe()
  const sig = collectionSig(c)
  const dirs = useMemo(() => directionsFor(c), [sig]) // eslint-disable-line react-hooks/exhaustive-deps
  const [pick, setPick] = useState<number>()
  const [opened, setOpened] = useState<string>()
  const choose = (i: number) => {
    const before = readPlan()
    const keep = before.via === 'studio' ? { fromId: before.fromId, uploads: before.uploads } : {}
    writePlan({ ...dirs[i].plan, ...keep, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined, taken: takenOf(c.items) })
    write(KEYS.composed, { sig, pick: i } satisfies Picked)
    setPick(i); setOpened(undefined)
  }
  // Arriving: the plan made from these same words and likes (or a recipe opened into them) is kept as it is, with
  // the name from You; anything new taken or said starts again from the first mix.
  useEffect(() => {
    if (!ready || !c.purpose || !c.name?.trim()) return
    const last = get<Picked | null>(KEYS.composed, null)
    if (last?.sig === sig && readPlan().via === 'studio') { setPick(last.pick); setOpened(last.opened); updatePlan((p) => ({ ...p, name: c.name?.trim() || p.name, taken: p.taken ?? (last.opened ? undefined : takenOf(c.items)) })) }
    else choose(last?.sig === sig ? last.pick : 0)
  }, [ready, sig, c.name]) // eslint-disable-line react-hooks/exhaustive-deps
  // No kind yet: read it from the sentence; no name (a seed opened here has none): ask You, which keeps the plan.
  useEffect(() => {
    if (!ready || (c.purpose && c.name?.trim())) return
    const guess = !c.purpose && purposeFrom(c.about)
    if (c.name?.trim() && guess) updateCollection((x) => ({ ...x, purpose: guess }))
    else router.replace('/studio/you')
  }, [ready, c.purpose, c.name, c.about, router])
  if (!ready || !c.purpose || !c.name?.trim()) return null

  const taken = takenFrom(takenOf(c.items))
  const live = pick !== undefined && plan.via === 'studio'
  return (
    <StepFrame at="Direction"
      title={<>
        <p className="label mb-4">Step 2 · {c.name} · {purposes[c.purpose].name}</p>
        <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Make it yours.</h1>
        <p className="mt-3 max-w-[62ch] text-ink-2">Any look, any colours, any lettering. Your brand changes as you pick, exactly as your site will use it.</p>
        <p className="mt-3 text-sm text-muted">{opened ? <>Opened from {opened}, as it was built. </> : taken.length ? <>From {taken.join('; ')}. </> : 'Nothing taken yet, so this starts from your kind of site. '}<Link href="/library" className="link text-ink-2">{taken.length ? 'Take something else' : 'Find sites you like'}</Link></p>
      </>}
      next={<button type="button" onClick={toRecipe} disabled={pick === undefined} className="btn btn-ink btn-sm disabled:opacity-40"><span>Next<span className="hidden sm:inline">: Recipe</span></span><ArrowRight size={14} aria-hidden /></button>}>
      {live && (
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          {/* What is exact (the brand) beside the lists; first on phones, so a pick is seen where it is made. */}
          <div className="lg:order-2 lg:sticky lg:top-36"><YourBrand plan={plan} /></div>
          <div className="lg:order-1"><LookPicker every /></div>
        </div>
      )}
    </StepFrame>
  )
}

/** The brand exactly as the build will use it (decision 40). */
function YourBrand({ plan }: { plan: KitPlan }) {
  const { look, spec } = usePlanLook(plan)
  const t = look.type
  return (
    <div>
      <p className="label mb-3 text-muted">Your brand</p>
      <BrandCard name={plan.name} about={plan.about} cta={goals[inferGoal(plan)].cta[0]} colors={look.colors} type={t} button={look.shape.button}
        caption={`${palettes[spec.palette].name} · ${typography[spec.typography].name} (${t.display.family}${t.body.family !== t.display.family ? ` + ${t.body.family}` : ''})`} />
    </div>
  )
}
