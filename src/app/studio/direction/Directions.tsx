'use client'
// Direction (docs/plan-library.md decision 35): the owner's site three ways — their kind's pages and their words, in
// three mixes of what they liked (`directionsFor`); each says what it took from which site. Picking one makes it the
// plan the recipe is written from. Under them, Make it yours (decision 36): every look, colour and lettering
// (`LookPicker`), with the picked direction drawn live beside the lists; pages are adjusted one link away (Pages).
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { HeroPreview, heroName } from '@/components/HeroPreview'
import { LazyMount } from '@/components/LazyMount'
import { SectionPreview } from '@/components/SectionPreview'
import { palettes, typography } from '@/data/ingredients'
import { sections } from '@/data/patterns'
import { directions, motionLevels, purposes } from '@/data/taxonomy'
import { itemKey, siteName } from '@/features/library/collection'
import { TRAITS, directionsFor, type Direction, type Took } from '@/features/library/inspire'
import { planToSpec } from '@/features/kit/plan'
import { useCollection } from '@/lib/collection'
import { readPlan, usePlan, writePlan } from '@/lib/kit'
import { KEYS, get, useHydrated, write } from '@/lib/store'
import { LookPicker } from '../LookPicker'
import { StepFrame, usePlanLook, useToRecipe } from '../shared'
import type { KitPlan } from '@/types/domain'

const LETTERS = ['A', 'B', 'C']
type Picked = { sig: string; pick: number }

export function Directions() {
  const ready = useHydrated()
  const c = useCollection()
  const plan = usePlan()
  const router = useRouter()
  const toRecipe = useToRecipe()
  const sig = JSON.stringify([c.items.map(itemKey), c.purpose])
  const dirs = useMemo(() => directionsFor(c), [sig]) // eslint-disable-line react-hooks/exhaustive-deps
  const [pick, setPick] = useState<number>()
  const choose = (i: number) => {
    const before = readPlan()
    const keep = before.via === 'studio' ? { fromId: before.fromId, uploads: before.uploads } : {}
    writePlan({ ...dirs[i].plan, ...keep, name: c.name?.trim() || undefined, about: c.about?.trim() || undefined })
    write(KEYS.composed, { sig, pick: i } satisfies Picked)
    setPick(i)
  }
  // Arriving: the pick made for these same likes is kept; new likes (or none picked yet) start on A.
  useEffect(() => {
    if (!ready || !c.purpose || !c.name?.trim()) return
    const last = get<Picked | null>(KEYS.composed, null)
    if (last?.sig === sig && readPlan().via === 'studio') setPick(last.pick)
    else choose(last?.sig === sig ? last.pick : 0)
  }, [ready, sig]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (ready && (!c.purpose || !c.name?.trim())) router.replace('/studio/you') }, [ready, c.purpose, c.name, router])
  if (!ready || !c.purpose || !c.name?.trim()) return null

  const looks = c.items.filter((i) => i.kind === 'site' || i.kind === 'like')
  return (
    <StepFrame at="Direction"
      title={<>
        <p className="label mb-4">Step 2 · {c.name} · {purposes[c.purpose].name}</p>
        <h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Your site, three ways.</h1>
        <p className="mt-3 max-w-[62ch] text-ink-2">Each is made from your words and a different mix of what you liked. None copies a site: each takes at most two things from any one of them. Pick the one that feels like you.</p>
        <p className="mt-3 text-sm text-muted">{looks.length ? <>From {looks.map((i) => (i.kind === 'site' ? `${siteName(i.site)}’s whole look` : i.kind === 'like' ? `${siteName(i.site)}’s ${TRAITS[i.what].name.toLowerCase()}` : '')).join(', ')}. </> : 'Nothing liked yet, so these come from your kind of site. '}<Link href="/library" className="link text-ink-2">{looks.length ? 'Like something else' : 'Find sites you like'}</Link></p>
      </>}
      next={<button type="button" onClick={toRecipe} disabled={pick === undefined} className="btn btn-ink btn-sm disabled:opacity-40"><span>Next<span className="hidden sm:inline">: Recipe</span></span><ArrowRight size={14} aria-hidden /></button>}>
      <div role="radiogroup" aria-label="Three directions" className="mt-10 grid gap-6 lg:grid-cols-3">
        {dirs.map((d, i) => <Card key={i} d={d} letter={LETTERS[i]} on={pick === i} onPick={() => choose(i)} />)}
      </div>
      {pick !== undefined && plan.via === 'studio' && <>
        <section aria-labelledby="make-it-yours" className="mt-16 border-t border-line pt-8">
          <p className="label">Make it yours</p>
          <h2 id="make-it-yours" className="display mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)]">Any look, any colours, any lettering.</h2>
          <p className="mt-2 max-w-[62ch] text-sm text-ink-2">Direction {LETTERS[pick]} is your start. Change anything — every look, palette and pairing OpusKit has — and watch it beside the lists.</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <LookPicker every />
            <div className="lg:sticky lg:top-36">
              <p className="label mb-3 text-muted">Direction {LETTERS[pick]} · live</p>
              <div className="overflow-hidden border border-line"><Preview plan={plan} height="h-[26rem]" /></div>
            </div>
          </div>
        </section>
        <YourSite />
      </>}
    </StepFrame>
  )
}

/** One direction: the first screen and the first parts of its home page in its picks, then what it took from where. */
function Card({ d, letter, on, onPick }: { d: Direction; letter: string; on: boolean; onPick: () => void }) {
  // The picked one is drawn as it is now, with whatever was changed under Make it yours.
  const now = usePlan(), plan = on && now.via === 'studio' ? now : d.plan
  const { look, recipe } = usePlanLook(plan)
  const spec = planToSpec(plan), was = planToSpec(d.plan)
  const changed = (t: Took) => t.what === 'look' ? spec.direction !== was.direction : t.what === 'colours' ? spec.palette !== was.palette : t.what === 'lettering' ? spec.typography !== was.typography : t.what === 'opening' ? spec.hero !== was.hero : spec.motion !== was.motion
  const value = (t: Took) => t.what === 'look' ? directions[spec.direction].name : t.what === 'colours' ? palettes[spec.palette].name : t.what === 'lettering' ? typography[spec.typography].name : t.what === 'opening' ? heroName(spec.hero ?? recipe.media.hero.id) : motionLevels[spec.motion].name
  return (
    <div className={`group relative flex flex-col border bg-white transition-[border-color,box-shadow] duration-300 ${on ? 'border-pencil shadow-[0_0_0_3px_var(--color-pencil-soft)]' : 'border-line hover:border-ink'}`}>
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="label">Direction {letter}</span>
        <span className="truncate text-sm font-medium">{directions[spec.direction].name}</span>
      </div>
      <button type="button" role="radio" aria-checked={on} onClick={onPick} aria-label={`Direction ${letter}: ${directions[spec.direction].name}`} className="relative block text-left">
        <Preview plan={plan} height="h-[30rem]" />
      </button>
      <dl className="flex-1 divide-y divide-line border-t border-line text-sm">
        {d.took.map((t) => (
          <div key={t.what} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 px-4 py-2">
            <dt className="label text-muted">{t.what === 'look' ? 'Look' : TRAITS[t.what].name}</dt>
            <dd className="flex min-w-0 items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2 truncate">
                {t.what === 'colours' && <span aria-hidden className="flex shrink-0">{[look.colors.background, look.colors.text, look.colors.accent].map((x, k) => <span key={k} className="-ml-1 size-3.5 rounded-full border border-line first:ml-0" style={{ background: x }} />)}</span>}
                <span className="truncate">{value(t)}</span>
              </span>
              <span className={`shrink-0 text-xs ${t.site && !changed(t) ? 'text-pencil' : 'text-muted'}`}>{changed(t) ? 'your pick' : t.site ? siteName(t.site) : 'for you'}</span>
            </dd>
          </div>
        ))}
      </dl>
      <button type="button" onClick={onPick} className={`flex h-12 items-center justify-center gap-2 border-t text-sm font-medium transition-colors ${on ? 'border-pencil bg-pencil text-paper' : 'border-line hover:bg-ink hover:text-paper'}`}>
        {on ? <><Check size={16} aria-hidden />Your direction</> : `Choose ${letter}`}
      </button>
    </div>
  )
}

/** A direction's first screen and the first parts of its home page, in its picks, faded out at the bottom. */
function Preview({ plan, height }: { plan: KitPlan; height: string }) {
  const { look, recipe, pv } = usePlanLook(plan)
  const parts = (recipe.pages[0]?.sections ?? []).filter((x) => !['hero', 'navbar', 'footer'].includes(x.id)).slice(0, 2)
  return (
    <div className="relative" style={{ background: look.colors.background }}>
      <LazyMount className={`pointer-events-none overflow-hidden ${height}`}>
        <div className="aspect-[16/10] overflow-hidden"><HeroPreview plan={plan} id={plan.hero} /></div>
        {parts.map((x, n) => <SectionPreview key={n} id={x.id} variant={x.variant?.id} tone={x.tone} media={x.media} {...pv} auto />)}
      </LazyMount>
      <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20" style={{ background: `linear-gradient(to bottom, transparent, ${look.colors.background})` }} />
    </div>
  )
}

/** What the picked direction's site will have, page by page — read, not arranged; adjusting is one link away. */
function YourSite() {
  const plan = usePlan()
  const { recipe } = usePlanLook(plan)
  return (
    <section aria-labelledby="your-site" className="mt-16 border-t border-line pt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">What your site will have</p>
          <h2 id="your-site" className="display mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)]">{recipe.pages.length} pages for {plan.name ?? 'your site'}.</h2>
          <p className="mt-2 max-w-[62ch] text-sm text-ink-2">These are first sketches with stand-in photos and words. Your AI tool builds the real site from this direction, with your words and your photos, and designs every detail inside each part.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/studio/pages" className="btn btn-line btn-sm">Adjust pages</Link>
        </div>
      </div>
      <ul className="mt-6 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {recipe.pages.map((p) => (
          <li key={p.id} className="border-b border-r border-line bg-white px-4 py-3">
            <p className="font-medium">{p.label}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{p.sections.filter((x) => x.id !== 'navbar' && x.id !== 'footer').map((x) => (x.id === 'hero' ? 'First screen' : sections[x.id].name)).join(' · ') || 'Written for you'}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
