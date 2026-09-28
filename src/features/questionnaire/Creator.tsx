'use client'
// Adaptive visual questionnaire. Only asks what changes the Recipe: steps appear or disappear based on earlier answers.
// The main flow is a few plain, visual questions; detailed ones are optional "fine-tune" steps reached from the review.

import {
  AppWindow, BellRing, BookOpen, Briefcase, Circle, Columns3, GalleryHorizontal, GalleryHorizontalEnd, Globe2, Grid2x2, Layers, LayoutGrid, List, Move, Newspaper, Rows3, Square, Droplet, CalendarCheck, Compass, Globe, Images, Mail, Package, PenTool, Pencil, Plus, Shirt, ShoppingBag,
  ShoppingCart, Sparkles, User, UserPlus, UtensilsCrossed, X, type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Symbol } from '@/components/Logo'
import { PaletteEditor } from '@/components/PaletteEditor'
import { SitePreview, previewFromDirection, type PreviewProps } from '@/components/SitePreview'
import { TypeCard } from '@/components/TypeSpecimen'
import { Swatches } from '@/components/ui'
import { palettes, typography } from '@/data/ingredients'
import { directions, families, goals, leads, motionLevels, purposes } from '@/data/taxonomy'
import { composeRecipe, defaultPagesFor, normalizeSpec, recommendPresentation, recommendedTarget } from '@/features/recipes/engine'
import { saveGeneration } from '@/features/recipes/library'
import { deleteFile, getFile, putFile } from '@/lib/files'
import { examples } from '@/data/examples'
import { KEYS, get, write } from '@/lib/store'
import { heroes, imagePresentations, pageTypes } from '@/data/patterns'
import type {
  AssetId, Brief, HeroId, BuildTargetId, ImagePresentationGroup, ImagePresentationId, CharacterId, DirectionId, FamilyId, GoalId, LayoutId, LeadId, MediaPlan, MotionLevel,
  PageSpec, PageTypeId, PaletteColors, PaletteId, PurposeId, RecipeSpec, TypographyId, UniversalRecipe, UploadedAsset,
} from '@/types/domain'

type Draft = {
  purpose?: PurposeId; brief: Brief; feel?: FamilyId; direction?: DirectionId; characters: CharacterId[]; lead?: LeadId; motion?: MotionLevel
  hero?: HeroId; layout?: LayoutId; palette?: PaletteId; customPalette?: PaletteColors; typography?: TypographyId; assets: AssetId[]
  uploads: UploadedAsset[]; mediaPlan?: MediaPlan; imagePresentation?: ImagePresentationId; pages: PageSpec[]; target?: BuildTargetId
}
const EMPTY: Draft = { brief: {}, characters: [], assets: [], uploads: [], pages: [] }

const LEAD_ASSET: Record<LeadId, AssetId | null> = { photography: 'images', video: 'video', product: 'product-photos', illustration: 'illustrations', '3d': '3d', typography: null }

const has = (d: Draft, a: AssetId) => d.assets.includes(a) || d.uploads.some((u) => u.asset === a)
// Only asked where the experience breaks without the asset; for photos/products/illustrations the recipe adds a "find it" path.
const needsMediaPlan = (d: Draft) => (d.lead === 'video' || d.lead === '3d') && !has(d, LEAD_ASSET[d.lead]!)
/** A patch, or a function of the latest draft — for updates that land after an await (file reads). */
type SetDraft = (patch: Partial<Draft> | ((x: Draft) => Partial<Draft>)) => void
const photosOf = (d: Draft) => d.uploads.filter((u) => u.asset === 'images')
const nameOf = (d: Draft) => d.brief.name?.trim() || 'your site'


type Text = string | ((d: Draft) => string)
const txt = (t: Text | undefined, d: Draft) => (typeof t === 'function' ? t(d) : t)
type Step = {
  id: string; title: Text; hint?: Text
  show: (d: Draft) => boolean; done: (d: Draft) => boolean
}
const always = () => true
const STEPS: Step[] = [
  { id: 'purpose', title: 'What are you making?', hint: 'Pick the closest one.', show: always, done: (d) => !!d.purpose },
  { id: 'brief', title: 'What’s it called?', hint: 'We’ll put it on your site. No name yet? Skip it.', show: always, done: always },
  { id: 'goal', title: 'What should visitors do?', hint: 'Pick the one thing that matters most.', show: always, done: (d) => !!d.brief.goal },
  { id: 'pages', title: 'Which pages do you need?', hint: 'We picked the usual ones. Add, remove, rename or drag to reorder.', show: always, done: (d) => d.pages.length > 0 },
  { id: 'feel', title: 'Which feeling do you like?', hint: 'Go with your gut.', show: always, done: (d) => !!d.feel },
  { id: 'direction', title: 'Pick the style you like best', hint: 'Each one is a complete look — colors, letters and layout that go together.', show: always, done: (d) => !!d.direction },
  { id: 'lead', title: 'What should visitors see when they arrive?', hint: 'The first screen of your site. Trending picks are marked.', show: always, done: (d) => !!d.hero },
  { id: 'motion', title: 'How lively should the rest of the site feel?', hint: 'Each preview moves the way your site would.', show: (d) => motionChoices(d).length > 1, done: (d) => !!d.motion },
  { id: 'palette', title: 'Pick your colors', show: always, done: (d) => !!d.palette },
  { id: 'typography', title: 'Pick your lettering', show: always, done: (d) => !!d.typography },
  { id: 'media', title: (d) => (d.lead === '3d' ? 'Add your 3D scene' : 'Add your video'), hint: (d) => (d.lead === '3d' ? 'A .glb or .gltf file.' : 'A short clip works best — 5 to 15 seconds, landscape.'), show: needsMediaPlan, done: (d) => !!d.mediaPlan },
  // Always asked: every site can use photos, whatever leads the first screen. Their count and shape decide how they are shown.
  { id: 'photos', title: 'Add your photos', hint: (d) => (d.lead === 'photography' ? 'The photos your site is built around. Add as many as you like.' : 'Optional — work, people, places, details for the rest of the site. Add as many as you like.'), show: always, done: always },
  { id: 'target', title: 'How will you build it?', hint: 'Not sure? We’ll pick the best fit.', show: always, done: (d) => !!d.target },
  { id: 'review', title: (d) => `Here’s the plan for ${nameOf(d)}`, hint: 'Happy with it? Create it. Want to change something? Tap it.', show: always, done: always },
]

function toSpec(d: Draft): RecipeSpec {
  const dir = directions[d.direction ?? 'japanese-minimal']
  return normalizeSpec({
    base: dir.baseRecipe, brief: d.brief, purpose: d.purpose ?? 'other', direction: dir.id, characters: d.characters,
    lead: d.lead ?? dir.defaults.lead, motion: d.motion ?? dir.defaults.motion, hero: d.hero, layout: d.layout ?? dir.defaults.layout,
    palette: d.palette ?? dir.defaults.palette, customPalette: d.customPalette, typography: d.typography ?? dir.defaults.typography,
    assets: d.assets, uploads: d.uploads, mediaPlan: needsMediaPlan(d) ? d.mediaPlan : 'have', imagePresentation: d.imagePresentation,
    pages: d.pages.length ? d.pages : defaultPagesFor(d.purpose ?? 'other'), target: d.target ?? 'not-sure',
  })
}

function preview(d: Draft, over: Partial<PreviewProps> = {}): PreviewProps {
  const dirId = d.direction ?? (d.feel ? families[d.feel].directions[0] : 'japanese-minimal')
  const spec = toSpec({ ...d, direction: dirId })
  return previewFromDirection(dirId, {
    colors: { ...palettes[spec.palette].colors, ...spec.customPalette }, type: typography[spec.typography], layout: spec.layout,
    lead: spec.lead, motion: spec.motion, title: d.brief.name?.trim() || directions[dirId].line, ...over,
  })
}

/** Decisions the user made themselves vs. ones still filled in by the direction's defaults. */
function decisions(d: Draft) {
  const mine = [d.purpose, d.brief.goal, d.direction, d.lead, d.motion, d.palette, d.typography, d.target]
  return { made: mine.filter(Boolean).length, total: mine.length }
}

export function Creator() {
  const router = useRouter()
  const params = useSearchParams()
  const [d, setD] = useState<Draft>(EMPTY)
  const [stepId, setStepId] = useState('purpose')
  const [loading, setLoading] = useState<string | null>(null)
  // Set when the user jumps back from the review step, so one click returns them there instead of re-walking every question.
  const [fromReview, setFromReview] = useState(false)

  // Restore draft (optional save state) or start from ?feel= / ?direction=
  useEffect(() => {
    const saved = get<{ d: Draft; stepId: string } | null>(KEYS.draft, null)
    const feel = params.get('feel') as FamilyId | null
    const dir = params.get('direction') as DirectionId | null
    if (dir && directions[dir]) setD({ ...EMPTY, feel: directions[dir].families[0], direction: dir, ...defaultsFor(dir) })
    else if (feel && families[feel]) setD({ ...EMPTY, feel })
    else if (saved?.d) { setD({ ...EMPTY, ...saved.d, brief: saved.d.brief ?? {} }); if (STEPS.some((s) => s.id === saved.stepId)) setStepId(saved.stepId) }
  }, [params])

  // Skips the untouched initial draft, so it can't overwrite the saved one before the restore above lands (dev StrictMode runs effects twice).
  useEffect(() => { if (d !== EMPTY) write(KEYS.draft, { d, stepId }) }, [d, stepId])

  // The step actually on screen is always whatever stepId points at — never re-derived from show(d), so
  // resolving *this* step's own question (e.g. uploading the video) doesn't yank the user forward mid-step.
  const orderIdx = Math.max(0, STEPS.findIndex((s) => s.id === stepId))
  const step = STEPS[orderIdx]
  // Only used to draw the progress bar: how many *other* applicable steps sit at or before this one.
  const visible = STEPS.filter((s) => s.show(d))
  const index = visible.includes(step) ? visible.indexOf(step) : STEPS.slice(0, orderIdx).filter((s) => s.show(d)).length
  const isFirst = !STEPS.slice(0, orderIdx).some((s) => s.show(d))
  const isLast = step.id === 'review'
  const set: SetDraft = (patch) => setD((x) => ({ ...x, ...(typeof patch === 'function' ? patch(x) : patch) }))
  // The real recipe, recomposed on every answer, so feedback quotes what will actually ship — not a guess.
  const recipe = useMemo(() => composeRecipe(toSpec(d)), [d])
  // Once the user uploads their video, every preview plays it instead of the stock still.
  const videoSrc = useUploadUrl(d.lead === 'video' ? d.uploads.find((u) => u.asset === 'video')?.fileId : undefined)

  // Navigation always re-scans STEPS with the latest `d`, so a step whose relevance just changed
  // (media resolved, layout locked by direction) is skipped going forward or backward, correctly, on click.
  const go = (id: string) => { setStepId(id); window.scrollTo({ top: 0 }) }
  const next = () => {
    const upcoming = STEPS.slice(orderIdx + 1).find((s) => s.show(d))
    if (upcoming) go(upcoming.id)
    else finish()
  }
  const back = () => {
    const prior = [...STEPS.slice(0, orderIdx)].reverse().find((s) => s.show(d))
    if (prior) go(prior.id)
  }

  // Move focus to the new question so keyboard and screen-reader users land on it.
  useEffect(() => { document.getElementById('q')?.focus({ preventScroll: true }) }, [stepId])

  // Keyboard: 1–9 picks the nth option on screen, Enter continues — from an option, a text field or the question itself.
  // Other buttons and links keep their native Enter. Shift+Enter still types a newline.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || document.querySelector('dialog[open]')) return
      const el = e.target as HTMLElement
      const TEXT = 'textarea, select, input:not([type=checkbox]):not([type=radio]):not([type=file])'
      if (e.key === 'Enter') {
        const continues = !e.shiftKey && (el === document.body || el.matches(`#q, #q-body [role=radio], #q-body [role=checkbox], ${TEXT}`))
        if (continues && step.done(d)) { e.preventDefault(); next() }
      } else if (!el.matches(TEXT) && /^[1-9]$/.test(e.key)) {
        document.querySelectorAll<HTMLElement>('#q-body [role=radio], #q-body [role=checkbox]')[Number(e.key) - 1]?.click()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  function finish() {
    const spec = toSpec(d)
    const who = d.brief.name?.trim()
    const lines = [who ? `Composing ${who}…` : 'Composing your direction…', 'Setting your typography…', 'Choosing your colors…', 'Building your motion system…', 'Preparing your assets…']
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    lines.forEach((l, i) => setTimeout(() => setLoading(l), reduce ? 0 : i * 420))
    setTimeout(() => {
      const id = saveGeneration(spec)
      write(KEYS.draft, null)
      router.push(`/result/${id}`)
    }, reduce ? 50 : lines.length * 420 + 200)
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper px-5" role="status" aria-live="polite">
        <div className="text-center">
          <Symbol className="mx-auto h-12 w-auto animate-pulse" />
          <p className="mt-6 text-2xl tracking-tight">{loading}</p>
        </div>
      </div>
    )
  }

  const p = preview(d, { videoSrc })
  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
        <div className="flex h-16 items-center justify-between gap-4 px-5 md:px-8">
          <Link href="/" aria-label="Leave the creator and go home"><Symbol className="h-6 w-auto" /></Link>
          <div className="flex flex-1 items-center gap-3 md:max-w-lg" aria-label={`Question ${index + 1} of ${visible.length}`}>
            <div className="flex flex-1 gap-1">
              {visible.map((s, i) => <span key={s.id} className={`h-1 flex-1 rounded-full ${i <= index ? 'bg-ink' : 'bg-line'}`} />)}
            </div>
            <span className="text-sm tabular-nums text-muted">{index + 1}/{visible.length}</span>
          </div>
          <button type="button" className="text-sm link" onClick={() => { setD({ ...EMPTY }); setFromReview(false); go('purpose') }}>Start over</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="px-5 pb-40 pt-10 md:px-10 lg:pt-14" aria-labelledby="q">
          <h1 id="q" tabIndex={-1} className="display outline-none text-[clamp(2rem,4vw,3.4rem)]">{txt(step.title, d)}</h1>
          {step.hint && <p className="mt-3 text-ink-2">{txt(step.hint, d)}</p>}
          <div id="q-body" className="mt-8"><StepBody step={step.id} d={d} set={set} go={(id) => { setFromReview(true); go(id) }} recipe={recipe} /></div>
          <p className="mt-8 hidden text-xs text-muted lg:block">Tip: press 1–9 to choose, Enter to continue.</p>
        </section>

        <aside className="hidden border-l border-line bg-white/60 lg:block" aria-label="Examples and live preview">
          <div className="sticky top-16 p-8">
            {step.id === 'media' ? <MediaExamples d={d} p={p} /> : (
              <>
                {step.id !== 'review' && <Confidence d={d} />}
                <SitePreview {...p} className="mt-4 rounded-lg border border-line" />
                {step.id !== 'review' && <SoFar d={d} />}
              </>
            )}
          </div>
        </aside>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 px-5 py-3 md:px-8">
          <button type="button" onClick={back} disabled={isFirst} className="btn btn-line btn-sm disabled:opacity-30">Back</button>
          <details className="lg:hidden">
            <summary className="cursor-pointer text-sm link">Preview</summary>
            <div className="absolute inset-x-4 bottom-20 rounded-lg border border-line bg-white p-3 shadow-xl"><SitePreview {...p} className="rounded" /></div>
          </details>
          {fromReview && step.id !== 'review' && (
            <button type="button" onClick={() => go('review')} disabled={!step.done(d)} className="btn btn-line btn-sm ml-auto disabled:opacity-30">Back to review</button>
          )}
          <button type="button" onClick={next} disabled={!step.done(d)} className="btn btn-ink disabled:opacity-30">
            {isLast ? 'Create my site plan' : skippedEmpty(step.id, d) ? 'Skip' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  )
}

/** Optional steps left empty get an honest "Skip" label instead of "Continue". */
function skippedEmpty(id: string, d: Draft) {
  return (id === 'brief' && !d.brief.name?.trim() && !d.brief.offer?.trim()) || (id === 'photos' && !photosOf(d).length && !d.imagePresentation && !d.brief.photos?.trim())
}

function defaultsFor(dir: DirectionId): Partial<Draft> {
  const x = directions[dir].defaults
  return { palette: x.palette, typography: x.typography, layout: x.layout, lead: x.lead, motion: x.motion, hero: undefined, customPalette: undefined }
}

function Confidence({ d }: { d: Draft }) {
  const { made, total } = decisions(d)
  return (
    <div className="text-sm">
      <div className="flex items-baseline justify-between"><span className="font-medium">Made by you</span><span className="tabular-nums text-muted">{made} of {total} decisions</span></div>
      <div className="mt-2 h-1.5 rounded-full bg-line"><div className="h-full rounded-full bg-pencil transition-[width] duration-500" style={{ width: `${(made / total) * 100}%` }} /></div>
      <p className="mt-2 text-xs text-muted">{made === total ? 'Every decision in this recipe is yours.' : 'The rest use your direction’s tested defaults until you choose.'}</p>
    </div>
  )
}

function SoFar({ d }: { d: Draft }) {
  const spec = toSpec(d)
  const rows: [string, ReactNode | undefined][] = [
    ['Making', d.purpose && purposes[d.purpose].name],
    ['Name', d.brief.name?.trim() || undefined],
    ['Goal', d.brief.goal && goals[d.brief.goal].name],
    ['Style', d.direction && directions[d.direction].name],
    ['First screen', effectOf(d)?.name],
    ['Movement', d.motion && motionLevels[d.motion].name],
    ['Colors', d.palette && <Swatches colors={Object.values({ ...palettes[spec.palette].colors, ...spec.customPalette })} />],
    ['Lettering', d.typography && typography[d.typography].name],
  ]
  return (
    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="border-t border-line pt-2">
          <dt className="text-muted">{k}</dt>
          <dd className={v ? '' : 'text-line'}>{v ?? '—'}</dd>
        </div>
      ))}
    </dl>
  )
}

// ─── Step bodies ─────────────────────────────────────────────────────────────

function Grid({ children, cols = 'sm:grid-cols-2 xl:grid-cols-3' }: { children: ReactNode; cols?: string }) {
  return <div className={`grid gap-3 ${cols}`}>{children}</div>
}

function Card({ selected, onClick, title, line, children, badge, icon: Icon, role = 'radio' }: { selected: boolean; onClick: () => void; title: string; line?: string; children?: ReactNode; badge?: string; icon?: LucideIcon; role?: 'radio' | 'checkbox' }) {
  return (
    <button type="button" role={role} aria-checked={selected} onClick={onClick} className="choice w-full overflow-hidden">
      {children}
      <span className="block p-4">
        {Icon && <Icon size={28} strokeWidth={1.5} className="mb-3 text-ink-2" aria-hidden />}
        <span className="flex items-center justify-between gap-2"><span className="font-medium">{title}</span>{badge && <span className="pencil">{badge}</span>}</span>
        {line && <span className="mt-0.5 block text-sm text-muted">{line}</span>}
      </span>
    </button>
  )
}

const TARGETS: [BuildTargetId, string, string][] = [
  ['not-sure', 'Not sure yet', 'We’ll pick the best tool for your site'],
  ['lovable', 'Lovable', 'Build it by chatting — no code needed'], ['v0', 'v0', 'Paste one prompt, get a site'],
  ['claude-code', 'Claude Code', 'An AI assistant that writes the code for you'], ['cursor', 'Cursor', 'An AI code editor, for people who code a little'],
  ['own-code', 'I’ll code it myself', 'Full design notes, colors and fonts as code'],
]

/** The first-screen effects, described by what the visitor experiences — never by how it's built. */
const EFFECTS: { hero: HeroId; name: string; line: string; lead: LeadId; motion: MotionLevel; trending?: boolean }[] = [
  { hero: 'scroll-video', name: 'Film on the first screen', line: 'The opening scene plays forward as visitors scroll, then the rest of the page carries on as normal.', lead: 'video', motion: 'immersive', trending: true },
  { hero: 'scroll-video-page', name: 'Film behind the whole page', line: 'The film stays in the background from top to bottom, moving forward with every scroll until the very end.', lead: 'video', motion: 'immersive', trending: true },
  { hero: 'parallax-photo', name: 'Photo with depth', line: 'The photo drifts slower than the page, so it feels three-dimensional.', lead: 'photography', motion: 'dynamic', trending: true },
  { hero: 'kinetic-type', name: 'Words in motion', line: 'Big headlines slide and reveal themselves as visitors scroll.', lead: 'typography', motion: 'dynamic', trending: true },
  { hero: 'webgl-scene', name: 'Object you can play with', line: 'A 3D object visitors can turn and explore with their mouse or finger.', lead: '3d', motion: 'dynamic', trending: true },
  { hero: 'ambient-video', name: 'Moving background', line: 'A calm, looping clip plays quietly behind your headline.', lead: 'video', motion: 'subtle' },
  { hero: 'editorial-image', name: 'One big photo', line: 'A single striking image, calm and still.', lead: 'photography', motion: 'subtle' },
  { hero: 'product-stage', name: 'Product in the spotlight', line: 'Your product, large and clean, like a shop window.', lead: 'product', motion: 'subtle' },
  { hero: 'type-statement', name: 'Just bold words', line: 'A confident headline and nothing else. Fast and clear.', lead: 'typography', motion: 'still' },
  { hero: 'illustrated', name: 'Illustrated scene', line: 'A drawn world that sets your tone from the first second.', lead: 'illustration', motion: 'subtle' },
]
const effectOf = (d: Draft) => EFFECTS.find((e) => e.hero === d.hero)
/** Movement levels the chosen first screen works with (e.g. the scroll-through film only works fully immersive). */
const motionChoices = (d: Draft) => (Object.keys(motionLevels) as MotionLevel[]).filter((m) => !d.hero || heroes[d.hero].motion.includes(m))
/** A real site that uses the effect, shown in its card instead of a mock-up. */
const CLIP = examples.find((e) => e.clip)?.clip
const EFFECT_CLIP: Partial<Record<HeroId, string>> = { 'scroll-video': CLIP, 'scroll-video-page': CLIP }

const PURPOSE_ICON: Record<PurposeId, LucideIcon> = {
  portfolio: Images, agency: Briefcase, studio: PenTool, fashion: Shirt, restaurant: UtensilsCrossed, ecommerce: ShoppingBag,
  product: Package, saas: AppWindow, 'personal-brand': User, experiment: Sparkles, other: Globe,
}
const GOAL_ICON: Record<GoalId, LucideIcon> = { contact: Mail, book: CalendarCheck, buy: ShoppingCart, signup: UserPlus, subscribe: BellRing, explore: Compass }

/** The goal most sites of each kind are built around — shown as a hint, never preselected. */
const TYPICAL_GOAL: Record<PurposeId, GoalId> = {
  portfolio: 'contact', agency: 'contact', studio: 'contact', fashion: 'buy', restaurant: 'book', ecommerce: 'buy',
  product: 'buy', saas: 'signup', 'personal-brand': 'subscribe', experiment: 'explore', other: 'contact',
}

const OFFER_EXAMPLE: Record<PurposeId, [string, string]> = {
  portfolio: ['Mara Okafor', 'Brand identities for independent restaurants and food makers.'],
  agency: ['Northfold', 'We rebuild slow e-commerce sites for fashion brands in eight weeks.'],
  studio: ['Atelier Vey', 'An architecture studio designing small timber houses in the Alps.'],
  fashion: ['Hollow Cloth', 'Undyed linen workwear, cut and sewn in Lisbon in small runs.'],
  restaurant: ['Salt & Ember', 'A twelve-seat wood-fire counter serving one tasting menu a night.'],
  ecommerce: ['Oak & Awl', 'Hand-stitched leather goods from a two-person workshop in Porto.'],
  product: ['Tern One', 'A pocket-sized film scanner that turns negatives into RAW files.'],
  saas: ['Ledgerline', 'Bookkeeping that closes the month for small agencies in one click.'],
  'personal-brand': ['Sam Rivera', 'I write about typography and teach type design online.'],
  experiment: ['Tidal Type', 'A typeface that changes with live ocean tide data.'],
  other: ['Field Notes Co.', 'A community garden network across six city neighbourhoods.'],
}

function StepBody({ step, d, set, go, recipe }: { step: string; d: Draft; set: SetDraft; go: (id: string) => void; recipe: UniversalRecipe }) {
  const dir = d.direction && directions[d.direction]
  const setBrief = (patch: Partial<Brief>) => set({ brief: { ...d.brief, ...patch } })
  switch (step) {
    case 'purpose':
      return (
        <div role="radiogroup" aria-label="What are you building" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {Object.values(purposes).map((p) => <Card key={p.id} icon={PURPOSE_ICON[p.id]} selected={d.purpose === p.id} onClick={() => set({ purpose: p.id, ...(d.purpose !== p.id ? { pages: defaultPagesFor(p.id) } : {}) })} title={p.name} line={p.hint} />)}
        </div>
      )
    case 'brief': {
      const [exName, exOffer] = OFFER_EXAMPLE[d.purpose ?? 'other']
      return (
        <div className="max-w-xl space-y-5">
          <label className="block"><span className="sr-only">Name</span>
            <input value={d.brief.name ?? ''} maxLength={60} placeholder={exName} onChange={(e) => setBrief({ name: e.target.value })}
              className="block w-full rounded-lg border border-line bg-white p-4 text-2xl" /></label>
          <label className="block text-sm"><span className="text-muted">In a few words, what is it? (optional)</span>
            <input value={d.brief.offer ?? ''} maxLength={160} placeholder={exOffer} onChange={(e) => setBrief({ offer: e.target.value })}
              className="mt-2 block w-full rounded-lg border border-line bg-white p-3" /></label>
        </div>
      )
    }
    case 'goal': {
      const typical = TYPICAL_GOAL[d.purpose ?? 'other']
      return (
        <div role="radiogroup" aria-label="Primary goal" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {Object.values(goals).map((g) => <Card key={g.id} icon={GOAL_ICON[g.id]} selected={d.brief.goal === g.id} title={g.name} line={g.line}
            badge={g.id === typical ? 'Typical' : undefined} onClick={() => setBrief({ goal: g.id })} />)}
        </div>
      )
    }
    case 'feel':
      return (
        <div role="radiogroup" aria-label="Feeling"><Grid>
          {(Object.keys(families) as FamilyId[]).map((f) => (
            <Card key={f} selected={d.feel === f} title={families[f].name} line={families[f].line}
              onClick={() => { const first = families[f].directions[0]; set({ feel: f, direction: undefined, ...(d.feel !== f ? defaultsFor(first) : {}) }) }}>
              <SitePreview {...previewFromDirection(families[f].directions[0], d.brief.name?.trim() ? { title: d.brief.name.trim() } : {})} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'direction':
      return (
        <div role="radiogroup" aria-label="Direction"><Grid cols="sm:grid-cols-2">
          {families[d.feel ?? 'quiet'].directions.map((id) => (
            <Card key={id} selected={d.direction === id} title={directions[id].name} line={directions[id].description} onClick={() => set({ direction: id, ...defaultsFor(id) })}>
              <SitePreview {...previewFromDirection(id, d.brief.name?.trim() ? { title: d.brief.name.trim() } : {})} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'lead':
      return (
        <div role="radiogroup" aria-label="First screen"><Grid>
          {EFFECTS.map((e) => (
            <Card key={e.hero} selected={d.hero === e.hero} title={e.name} line={e.line} badge={e.trending ? 'Trending' : undefined}
              onClick={() => set({ hero: e.hero, lead: e.lead, motion: e.motion, mediaPlan: undefined })}>
              <SitePreview {...preview({ ...d, hero: e.hero }, { lead: e.lead, motion: e.motion, videoSrc: EFFECT_CLIP[e.hero] })} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'motion':
      return (
        <div role="radiogroup" aria-label="Motion"><Grid cols="sm:grid-cols-2">
          {motionChoices(d).map((m) => (
            <Card key={m} selected={d.motion === m} title={motionLevels[m].name} line={motionLevels[m].line} badge={dir && dir.defaults.motion === m ? 'Recommended' : undefined} onClick={() => set({ motion: m })}>
              <SitePreview {...preview(d, { motion: m })} />
            </Card>
          ))}
        </Grid></div>
      )
    case 'pages': return <PagesStep d={d} set={set} />
    case 'palette': return <PaletteStep d={d} set={set} />
    case 'typography': return <TypeStep d={d} set={set} />
    case 'media': return <MediaStep d={d} set={set} />
    case 'photos': return <PhotosStep d={d} set={set} />
    case 'target': {
      const rec = recommendedTarget(toSpec({ ...d, target: 'not-sure' }))
      return (
        <div role="radiogroup" aria-label="Build target" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {TARGETS.map(([id, name, line]) => <Card key={id} selected={d.target === id} title={name} line={line} badge={id === rec ? 'Fits this recipe' : undefined} onClick={() => set({ target: id })} />)}
        </div>
      )
    }
    case 'review': return <ReviewStep d={d} go={go} r={recipe} />
  }
  return null
}

function ReviewStep({ d, go, r }: { d: Draft; go: (id: string) => void; r: UniversalRecipe }) {
  const spec = r.metadata.spec
  const b = d.brief
  const tool = TARGETS.find(([x]) => x === r.metadata.recommendedTarget)![1]
  const rows: [string, string, ReactNode][] = [
    ['purpose', 'Making', purposes[spec.purpose].name],
    ['brief', 'Name', b.name?.trim() || <span className="text-muted">No name yet</span>],
    ['goal', 'Main button', b.goal ? `“${r.contentDirection.ctaExamples[0]}”` : undefined],
    ['pages', 'Pages', r.pages.map((x) => x.label).join(', ')],
    ['direction', 'Style', directions[spec.direction].name],
    ['lead', 'First screen', effectOf(d)?.name ?? leads[spec.lead].name],
    ['motion', 'Movement', motionLevels[spec.motion].name],
    ['palette', 'Colors', <Swatches key="c" colors={r.visualSystem.palette.tokens.map((x) => x.hex)} />],
    ['typography', 'Lettering', typography[spec.typography].name],
    ['photos', 'Photos', r.media.imagery && `${r.media.imagery.photos ? `${r.media.imagery.photos} · ` : ''}${r.media.imagery.presentation.name}`],
    ['target', 'Build with', tool],
  ]
  return (
    <div className="max-w-2xl">
      <ul className="divide-y divide-line border-y border-line">
        {rows.map(([id, k, v]) => (
          <li key={id} className="flex items-center gap-4 py-3">
            <span className="w-32 shrink-0 text-sm text-muted sm:w-44">{k}</span>
            <span className="min-w-0 flex-1">{v || <span className="text-muted">—</span>}</span>
            <button type="button" onClick={() => go(id)} className="link text-sm" aria-label={`Change ${k}`}>Change</button>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">You can still change anything after it&apos;s created.</p>
    </div>
  )
}

const UTILITY_PAGE_TYPES: PageTypeId[] = ['faq', 'sign-in', 'sign-up', 'privacy-policy', 'terms-of-service', 'cookie-policy', 'not-found', 'accessibility']

function PagesStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const purpose = purposes[d.purpose ?? 'other']
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dlg = dialogRef.current
    if (!dlg) return
    if (editingId && !dlg.open) dlg.showModal()
    if (!editingId && dlg.open) dlg.close()
  }, [editingId])

  const hasType = (t: PageTypeId) => d.pages.some((p) => p.type === t)
  const addPage = (type: PageTypeId, label: string) =>
    set({ pages: [...d.pages, { id: crypto.randomUUID().slice(0, 8), type, label, purpose: pageTypes[type].defaultPurpose, sections: pageTypes[type].sections }] })
  const addCustom = () => {
    const id = crypto.randomUUID().slice(0, 8)
    set({ pages: [...d.pages, { id, type: 'custom', label: 'New page', purpose: '', sections: [] }] })
    setEditingId(id)
  }
  const removePage = (id: string) => set({ pages: d.pages.filter((p) => p.id !== id) })
  const updatePage = (id: string, patch: Partial<PageSpec>) => set({ pages: d.pages.map((p) => (p.id === id ? { ...p, ...patch } : p)) })
  const reorder = (from: number, to: number) => {
    const next = [...d.pages]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    set({ pages: next })
  }

  // Everything else this kind of site can have, then utility & legal pages — one flat list to add from.
  const addable = [
    ...purpose.pages.map((pp) => ({ type: pp.type, label: pp.label })),
    ...UTILITY_PAGE_TYPES.map((t) => ({ type: t, label: pageTypes[t].name })),
  ].filter((pp, i, xs) => !hasType(pp.type) && xs.findIndex((y) => y.type === pp.type) === i)
  const editing = d.pages.find((p) => p.id === editingId) ?? null

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {d.pages.map((p, i) => (
          <div key={p.id} draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIndex !== null && dragIndex !== i) reorder(dragIndex, i); setDragIndex(null) }}
            className="choice cursor-grab p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm tabular-nums text-muted" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
              <div className="flex gap-1">
                <button type="button" aria-label={`Edit ${p.label}`} className="text-muted hover:text-ink" onClick={() => setEditingId(p.id)}><Pencil size={15} /></button>
                <button type="button" aria-label={`Remove ${p.label}`} className="text-muted hover:text-ink" onClick={() => removePage(p.id)}><X size={15} /></button>
              </div>
            </div>
            <p className="mt-2 font-medium">{p.label}</p>
            {p.purpose && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{p.purpose}</p>}
          </div>
        ))}
      </div>

      <dialog ref={dialogRef} onClose={() => setEditingId(null)} aria-labelledby="page-edit-title" className="m-auto w-[min(30rem,calc(100vw-2rem))] rounded-xl bg-paper p-0 text-ink backdrop:bg-ink/50">
        {editing && (
          <div className="space-y-3 p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 id="page-edit-title" className="text-xl font-medium">Edit page</h2>
              <button type="button" onClick={() => setEditingId(null)} className="-m-2 p-2 text-muted hover:text-ink" aria-label="Close"><X size={18} /></button>
            </div>
            <label className="block text-sm"><span className="font-medium">Page name</span>
              <input autoFocus value={editing.label} onChange={(e) => updatePage(editing.id, { label: e.target.value })} className="mt-1 block w-full rounded border border-line p-2" /></label>
            <label className="block text-sm"><span className="font-medium">What should this page do?</span>
              <textarea value={editing.purpose} onChange={(e) => updatePage(editing.id, { purpose: e.target.value })} rows={3} className="mt-1 block w-full rounded border border-line p-2" /></label>
            <div className="flex justify-end pt-1"><button type="button" className="btn btn-ink btn-sm" onClick={() => setEditingId(null)}>Done</button></div>
          </div>
        )}
      </dialog>

      <div>
        <p className="text-sm font-medium text-muted">Add a page</p>
        <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {addable.map((pp) => (
            <button type="button" key={pp.type} className="choice flex items-start gap-1.5 p-3 text-left text-sm" onClick={() => addPage(pp.type, pp.label)}>
              <Plus size={15} className="mt-0.5 shrink-0 text-muted" aria-hidden />
              <span>{pp.label}<span className="block text-xs text-muted">{pageTypes[pp.type].hint}</span></span>
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="link inline-flex items-center gap-1 text-sm" onClick={addCustom}><Plus size={14} aria-hidden />Add a custom page</button>
    </div>
  )
}

function PaletteStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const dir = directions[d.direction ?? 'japanese-minimal']
  const ids = [...dir.palettes, ...(Object.keys(palettes) as PaletteId[]).filter((x) => !dir.palettes.includes(x))]
  const current = d.palette ?? dir.defaults.palette
  const colors = { ...palettes[current].colors, ...d.customPalette }
  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Palette"><Grid>
        {ids.map((id) => (
          <Card key={id} selected={current === id} title={palettes[id].name} line={palettes[id].line} badge={dir.palettes.includes(id) ? (id === dir.defaults.palette ? 'Recommended' : 'Fits') : undefined}
            onClick={() => set({ palette: id, customPalette: undefined })}>
            <SitePreview {...preview({ ...d, palette: id, customPalette: undefined }, { motion: 'still' })} />
            <span className="block px-4 pt-3"><Swatches colors={Object.values(palettes[id].colors)} /></span>
          </Card>
        ))}
      </Grid></div>
      <details open><summary className="cursor-pointer text-sm link marker:content-none">Adjust individual colors</summary><div className="mt-3"><PaletteEditor colors={colors} changed={!!d.customPalette} onReset={() => set({ customPalette: undefined })} onChange={(c) => set({ palette: current, customPalette: c })} /></div></details>
    </div>
  )
}

function TypeStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const dir = directions[d.direction ?? 'japanese-minimal']
  const rec = dir.typography
  const ids = [...rec, ...(Object.keys(typography) as TypographyId[]).filter((x) => !rec.includes(x))]
  const current = d.typography ?? dir.defaults.typography
  const t = typography[current]
  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="Typography" className="grid gap-3 xl:grid-cols-2">
        {ids.map((id) => (
          <Card key={id} selected={current === id} title={typography[id].name} line={typography[id].line} badge={id === dir.defaults.typography ? 'Recommended' : undefined} onClick={() => set({ typography: id })}>
            <span className="block px-4 pt-5"><TypeCard t={typography[id]} /></span>
          </Card>
        ))}
      </div>
      <p className="prose-serif max-w-xl text-base text-ink-2">{t.why}</p>
    </div>
  )
}

async function inspect(file: File, asset: AssetId): Promise<UploadedAsset> {
  const fileId = crypto.randomUUID().slice(0, 12)
  await putFile(fileId, file) // the actual bytes; UploadedAsset (below) only ever holds this reference, never the File itself
  const base: UploadedAsset = { asset, name: file.name, kind: file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'other', fileId }
  const url = URL.createObjectURL(file)
  try {
    if (base.kind === 'image') {
      const i = new Image(); i.src = url; await i.decode()
      return { ...base, width: i.naturalWidth, height: i.naturalHeight }
    }
    if (base.kind === 'video') {
      const v = document.createElement('video'); v.preload = 'metadata'; v.src = url
      await new Promise((ok, fail) => { v.onloadedmetadata = ok; v.onerror = fail })
      return { ...base, width: v.videoWidth, height: v.videoHeight, duration: v.duration }
    }
  } catch { /* unreadable → keep name + bytes, skip dimensions */ } finally { URL.revokeObjectURL(url) }
  return base
}

/** Swaps in newly uploaded files for one asset type, freeing the IndexedDB bytes of whatever they replace. */
async function replaceUploads(d: Draft, asset: AssetId, metas: UploadedAsset[]): Promise<UploadedAsset[]> {
  await Promise.all(d.uploads.filter((u) => u.asset === asset && u.fileId).map((u) => deleteFile(u.fileId!)))
  return [...d.uploads.filter((u) => u.asset !== asset), ...metas]
}

export function uploadAdvice(u: UploadedAsset): string | null {
  if (u.kind === 'video' && u.width && u.height && u.duration) {
    const ratio = u.width / u.height
    if (u.width < 1920) return `${u.width}×${u.height} will look soft full-screen (it gets stretched on large displays). Upload the original export if you have it — otherwise your Build Package includes a free sharpening step.`
    if (u.duration > 20) return `${u.duration.toFixed(0)}s is long; trim to 5–15s for a hero loop.`
    if (Math.abs(ratio - 16 / 9) > 0.1 && Math.abs(ratio - 9 / 16) > 0.1) return `Aspect ${ratio.toFixed(2)} — hero video works best at 16:9 (desktop) or 9:16 (mobile).`
    return `Good: ${u.width}×${u.height}, ${u.duration.toFixed(1)}s.`
  }
  if (u.kind === 'image' && u.width) return u.width < 1600 && (u.height ?? 0) < 1600 ? `${u.width}×${u.height} may look soft full-width — 2400px is ideal.` : `Good: ${u.width}×${u.height}.`
  return null
}

function MediaStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const lead = d.lead ?? 'video'
  const isVideo = lead === 'video'
  const asset = LEAD_ASSET[lead]!
  const up = d.uploads.find((u) => u.asset === asset)
  const onFile = async (f?: File) => {
    if (!f) return
    const u = await inspect(f, asset)
    set({ uploads: await replaceUploads(d, asset, [u]), assets: d.assets.includes(asset) ? d.assets : [...d.assets, asset], mediaPlan: 'have' })
  }
  return (
    <div className="max-w-xl space-y-6">
      <label className="choice flex cursor-pointer flex-col items-center gap-2 border-dashed p-10 text-center"
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files[0]) }}>
        <Plus size={28} strokeWidth={1.5} className="text-ink-2" aria-hidden />
        <span className="font-medium">{up ? up.name : isVideo ? 'Drop your video here or click to choose' : 'Drop your 3D file here or click to choose'}</span>
        <span className="text-sm text-muted">{up ? 'Click to replace it' : isVideo ? 'MP4, MOV or WebM' : 'GLB or GLTF'}</span>
        <input type="file" accept={isVideo ? 'video/*' : '.glb,.gltf'} className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
      </label>
      {up && uploadAdvice(up) && <p className="text-sm text-pencil">{uploadAdvice(up)}</p>}
      {!up && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <button type="button" className="link" aria-pressed={d.mediaPlan === 'temporary'} onClick={() => set({ mediaPlan: 'temporary' })}>
            {d.mediaPlan === 'temporary' ? '✓ ' : ''}No {isVideo ? 'video' : 'file'} yet — use a free placeholder for now
          </button>
          <button type="button" className="link" onClick={() => set({ lead: 'photography', mediaPlan: undefined })}>Use a photo instead</button>
        </div>
      )}
    </div>
  )
}

const PHOTO_GROUPS: Record<ImagePresentationGroup, string> = { calm: 'Calm layouts', moving: 'Moving — scroll, drag, swipe', immersive: 'Immersive — 3D and WebGL' }
const PHOTO_ICON: Record<ImagePresentationId, LucideIcon> = {
  'single-feature': Square, 'editorial-sequence': Newspaper, 'lookbook-spreads': BookOpen, 'masonry-gallery': LayoutGrid, 'uniform-grid': Grid2x2,
  'hover-reveal': List, 'horizontal-rail': GalleryHorizontal, 'swipe-carousel': GalleryHorizontalEnd, 'marquee-rows': Rows3, 'tilted-grid': Columns3,
  'card-stack': Layers, 'infinite-canvas': Move, 'ring-3d': Circle, 'dome-gallery': Globe2, 'liquid-glass': Droplet,
}

function PhotosStep({ d, set }: { d: Draft; set: SetDraft }) {
  const photos = photosOf(d)
  const rec = recommendPresentation(toSpec(d))
  const current = d.imagePresentation ?? rec.id
  const add = async (files?: FileList | null) => {
    const imgs = [...(files ?? [])].filter((f) => f.type.startsWith('image'))
    if (!imgs.length) return
    const metas = await Promise.all(imgs.map((f) => inspect(f, 'images')))
    set((x) => ({ uploads: [...x.uploads, ...metas] })) // latest draft: several drops can be read at once
  }
  const remove = (u: UploadedAsset) => { if (u.fileId) deleteFile(u.fileId); set((x) => ({ uploads: x.uploads.filter((y) => y.fileId !== u.fileId || y.name !== u.name) })) }
  const soft = photos.filter((u) => u.width && u.width < 1600 && (u.height ?? 0) < 1600)
  return (
    <div className="space-y-8">
      <label className="choice flex max-w-xl cursor-pointer flex-col items-center gap-2 border-dashed p-8 text-center"
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files) }}>
        <Images size={28} strokeWidth={1.5} className="text-ink-2" aria-hidden />
        <span className="font-medium">{photos.length ? 'Add more photos' : 'Drop photos here or click to choose'}</span>
        <span className="text-sm text-muted">JPG, PNG, WebP or AVIF · several at once is fine</span>
        <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => { add(e.target.files); e.target.value = '' }} />
      </label>

      {photos.length > 0 && (
        <div>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-6">
            {photos.map((u) => <Thumb key={u.fileId ?? u.name} u={u} onRemove={() => remove(u)} />)}
          </ul>
          <p className="mt-2 text-sm text-muted">{photos.length} photo{photos.length > 1 ? 's' : ''} · {rec.orientation}</p>
          {soft.length > 0 && <p className="mt-1 text-sm text-pencil">{soft.length} photo{soft.length > 1 ? 's are' : ' is'} under 1600px and may look soft full-width — 2400px is ideal.</p>}
        </div>
      )}

      <label className="block max-w-xl text-sm">
        <span className="font-medium">Anything we should know about your photos? <span className="font-normal text-muted">(optional)</span></span>
        <textarea value={d.brief.photos ?? ''} maxLength={400} rows={3} onChange={(e) => set({ brief: { ...d.brief, photos: e.target.value } })}
          placeholder="e.g. A 3D slider for the project photos. The team photo goes on About. Keep the before/after pairs side by side."
          className="mt-2 block w-full rounded-lg border border-line bg-white p-3" />
      </label>

      <div>
        <p className="font-medium">How should your photos be shown?</p>
        <p className="mt-1 text-sm text-muted">We recommend <span className="text-ink">{imagePresentations[rec.id].name}</span> — {rec.why}.</p>
        {(Object.keys(PHOTO_GROUPS) as ImagePresentationGroup[]).map((g) => (
          <div key={g} className="mt-6">
            <p className="text-sm text-muted">{PHOTO_GROUPS[g]}</p>
            <div role="radiogroup" aria-label={PHOTO_GROUPS[g]} className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {Object.values(imagePresentations).filter((x) => x.group === g).map((x) => (
                <Card key={x.id} icon={PHOTO_ICON[x.id]} selected={current === x.id} title={x.name} line={x.line}
                  badge={x.id === rec.id ? 'Recommended' : undefined} onClick={() => set({ imagePresentation: x.id === rec.id ? undefined : x.id })} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Thumb({ u, onRemove }: { u: UploadedAsset; onRemove: () => void }) {
  const url = useUploadUrl(u.fileId)
  return (
    <li className="group relative aspect-square overflow-hidden rounded-md border border-line bg-line/40">
      {url && <img src={url} alt={u.name} className="h-full w-full object-cover" />}
      <button type="button" onClick={onRemove} aria-label={`Remove ${u.name}`}
        className="absolute right-1 top-1 rounded-full bg-paper/90 p-1 text-ink shadow-sm hover:bg-paper"><X size={14} /></button>
    </li>
  )
}

/** Plays a file the user uploaded (kept in IndexedDB) — object URL is freed when it changes. */
function useUploadUrl(fileId?: string) {
  const [url, setUrl] = useState<string>()
  useEffect(() => {
    if (!fileId) return setUrl(undefined)
    let u: string | undefined
    let live = true
    getFile(fileId).then((f) => { if (f && live) setUrl((u = URL.createObjectURL(f))) })
    return () => { live = false; if (u) URL.revokeObjectURL(u) }
  }, [fileId])
  return url
}

/** Right-hand panel for the media question: your site with your video, plus a real site built the same way. */
function MediaExamples({ d, p }: { d: Draft; p: PreviewProps }) {
  const isVideo = d.lead !== '3d'
  const url = p.videoSrc
  const ex = examples.find((e) => (isVideo ? e.hero.kind === 'video' : e.hero.kind === 'image'))
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium">{url ? 'Your site, with your video' : 'Your site'}</p>
        <SitePreview {...p} className="mt-2 rounded-lg border border-line" />
      </div>
      {ex && (
        <div>
          <p className="text-sm font-medium">A real site made this way</p>
          <div className="mt-2 overflow-hidden rounded-lg border border-line bg-ink">
            {ex.hero.kind === 'video'
              ? <video src={ex.clip ?? ex.hero.src} poster={ex.hero.poster} autoPlay muted loop playsInline className="aspect-[16/10] w-full object-cover" />
              : <img src={ex.hero.src} alt="" className="aspect-[16/10] w-full object-cover" />}
          </div>
          <p className="mt-2 text-sm text-muted">{ex.title.split(' — ')[0]} · <a href={ex.livePath} target="_blank" rel="noreferrer" className="link">Visit the site</a></p>
        </div>
      )}
    </div>
  )
}
