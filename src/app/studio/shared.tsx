'use client'
// Shared by the Studio's Pages and Style steps: the plan's look, a page drawn top to bottom, and the way on to the recipe.
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { HeroPreview } from '@/components/HeroPreview'
import { lookOf } from '@/components/ProductVisual'
import { FlowBar, type Step } from '@/app/library/parts'
import { heroOf, inferPurpose, planToSpec } from '@/features/studio/plan'
import { composeRecipe, isValidSpec } from '@/features/recipes/engine'
import { saveGeneration, type Generation } from '@/features/recipes/library'
import { readPlan, updatePlan } from '@/lib/plan'
import { KEYS, get } from '@/lib/store'
import type { StudioPlan } from '@/types/domain'

/** Everything a preview of this plan is drawn with. */
export function usePlanLook(plan: StudioPlan) {
  const look = lookOf(plan)
  useGoogleFonts(look.type.googleFamilies)
  const spec = planToSpec(plan), recipe = composeRecipe(spec)
  const pv = { colors: look.colors, type: look.type, shape: look.shape, chapters: look.chapters, world: worldFor(inferPurpose(plan)), brand: plan.name || undefined, layout: spec.layout }
  return { look, spec, recipe, pv }
}

/** One page as the recipe will build it, top to bottom, in the plan's own colours and type. */
export function PagePreview({ plan, pageId }: { plan: StudioPlan; pageId: string }) {
  const { recipe, pv } = usePlanLook(plan)
  const page = plan.pages.find((p) => p.id === pageId), built = recipe.pages.find((p) => p.id === pageId)
  if (!page) return null
  return (
    <div className="overflow-hidden rounded-lg border border-line" style={{ background: pv.colors.background }}>
      {page.sections.map((s, i) => s.id === 'hero'
        ? <div key={s.key} className="aspect-[16/10] overflow-hidden"><HeroPreview plan={plan} id={heroOf(plan, s)} /></div>
        : <SectionPreview key={s.key} id={s.id} {...pv} tone={built?.sections[i]?.tone} media={built?.sections[i]?.media} variant={built?.sections[i]?.variant?.id} auto />)}
      {!page.hide?.includes('footer') && <SectionPreview id="footer" footer={recipe.chrome.footerStyle.id} {...pv} auto />}
    </div>
  )
}

/** Saves the plan as a recipe (or updates the one it made before) and opens it — the recipe step. */
export function useToRecipe() {
  const router = useRouter()
  return () => {
    const p = readPlan(), latest = p.fromId ? get<Record<string, Generation>>(KEYS.generations, {})[p.fromId]?.spec : undefined
    const spec = planToSpec(isValidSpec(latest) ? { ...p, from: latest } : p)
    const id = saveGeneration(spec, p.fromId)
    updatePlan((x) => ({ ...x, fromId: id, from: spec }))
    router.push(`/result/${id}`)
  }
}

/** A step's frame: the steps bar on top (back is a step link, Next on the right), then the title and the step. */
export function StepFrame({ at, title, next, children }: { at: Step; title: ReactNode; next: ReactNode; children: ReactNode }) {
  const toRecipe = useToRecipe()
  return (
    <>
      <FlowBar at={at} next={next} onRecipe={toRecipe} />
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 md:px-8 md:pt-12">
        {title}
        {children}
      </div>
    </>
  )
}

