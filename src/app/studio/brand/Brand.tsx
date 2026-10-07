'use client'
// Brand — "Adjust the look" for a recipe opened from elsewhere (an example, a saved recipe; decision 36): 1 your site in
// your words; 2 the look, colours and lettering (`LookPicker`, the same as on Direction); 3 a sample in your picks,
// marked as one, with four of your parts under it.
import { ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LazyMount } from '@/components/LazyMount'
import { SectionPreview } from '@/components/SectionPreview'
import { images } from '@/data/images'
import { startSite } from '@/features/library/collection'
import { exampleOf } from '@/app/library/parts'
import { updateCollection, useCollection } from '@/lib/collection'
import { updatePlan, usePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { SectionId } from '@/types/domain'
import { LookPicker } from '../LookPicker'
import { BackToDirections, NeedsStudio, StepFrame, usePlanLook, useToRecipe } from '../shared'
import { UsedOn } from './UsedOn'

export function Brand() {
  const ready = useHydrated()
  const plan = usePlan()
  const c = useCollection()
  const { look, spec, recipe, pv } = usePlanLook(plan)
  const toRecipe = useToRecipe()
  if (!ready) return null
  if (plan.via !== 'studio' || !plan.pages.length) return <NeedsStudio />
  // A real photo for the tile: the start site's own first picture, else the look's curated one.
  const start = plan.blank ? undefined : startSite(c), e = start && exampleOf(start)
  const photo = e ? (e.hero.kind === 'video' ? e.hero.poster : e.hero.src) : images[look.d.image].src
  // Name and sentence live on the plan and on the Collection, so a rebuild keeps them.
  const say = (k: 'name' | 'about', v: string) => { updatePlan((p) => ({ ...p, [k]: v || undefined })); updateCollection((x) => ({ ...x, [k]: v })) }
  // Four parts of your own pages (first screens and the footer aside), drawn in your picks under the example.
  const parts = recipe.pages.flatMap((pg) => pg.sections.map((x, n) => ({ key: `${pg.id}:${n}`, id: x.id as SectionId, variant: x.variant?.id, tone: x.tone, media: x.media, name: x.name.split(' — ')[0], page: pg.label })))
    .filter((x) => x.id !== 'hero').filter((x, n, a) => a.findIndex((y) => y.id === x.id) === n).slice(0, 4)

  return (
    <StepFrame at="Direction" title={<><BackToDirections /><h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Adjust the look</h1></>}
      next={<button type="button" onClick={toRecipe} className="btn btn-ink btn-sm"><span>Next<span className="hidden sm:inline">: Recipe</span></span><ArrowRight size={14} aria-hidden /></button>}>
      <div className="mt-8 grid gap-8 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start lg:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)] xl:gap-10">
        {/* 1 — your site, in your words */}
        <section aria-labelledby="your-site" className="space-y-4 md:sticky md:top-36">
          <div>
            <h2 id="your-site" className="font-medium">Your site</h2>
            <p className="mt-0.5 text-sm text-muted">Its name, and what it is.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="site-name">Name</Label>
            <Input id="site-name" value={plan.name ?? ''} maxLength={60} onChange={(e) => say('name', e.target.value)} placeholder="Mira Atelier" className="h-10 bg-white" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="site-about">In one sentence</Label>
            <Textarea id="site-about" value={plan.about ?? ''} maxLength={160} onChange={(e) => say('about', e.target.value)} placeholder="What you do, and for whom" rows={3} className="resize-none bg-white" />
            <p className="-mt-0.5 text-right text-xs tabular-nums text-muted">{(plan.about ?? '').length} / 160</p>
          </div>
        </section>

        {/* 2 — the look, the colours, the lettering (the same picker as Direction's) */}
        <LookPicker />

        {/* 3 — what you'll get: an example in your picks */}
        <div className="md:col-span-2 lg:col-span-1">
          <p className="mb-3 text-xs text-muted"><span className="font-medium text-ink-2">A sample, not your site</span> — only your colours and lettering. The real one goes much further.</p>
          <UsedOn plan={plan} palette={spec.palette} type={look.type} shape={look.shape} photo={photo} />
          {/* Under it, parts of your own pages in the same picks, side by side. */}
          {!!parts.length && (
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {parts.map((x) => (
                <li key={x.key}>
                  <div aria-hidden className="pointer-events-none overflow-hidden rounded-lg border border-line"><LazyMount className="aspect-[16/10] overflow-hidden"><SectionPreview id={x.id} variant={x.variant} tone={x.tone} media={x.media} {...pv} className="aspect-[16/10]" /></LazyMount></div>
                  <p className="mt-1.5 truncate text-xs text-muted">{x.name} · {x.page}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </StepFrame>
  )
}
