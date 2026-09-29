'use client'
// Adaptive visual questionnaire. Only asks what changes the Recipe: steps appear or disappear based on earlier answers.
// The main flow is a few plain, visual questions. The last one composes the recipe; everything stays editable from the result page.

import {
  AppWindow, BedDouble, BellRing, ClipboardCheck, Download, GraduationCap, HandHeart, HeartHandshake, House, MapPin, Newspaper, PartyPopper, Phone, Stethoscope, Briefcase, CalendarCheck, Compass, Globe, Images, Mail, Package, PenTool, Pencil, Plus, Shirt, ShoppingBag,
  ShoppingCart, Sparkles, User, UserPlus, UtensilsCrossed, X, type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Symbol } from '@/components/Logo'
import { PaletteEditor } from '@/components/PaletteEditor'
import { SitePreview, previewFromDirection, type PreviewProps } from '@/components/SitePreview'
import { TypeCard } from '@/components/TypeSpecimen'
import { Swatches } from '@/components/ui'
import { palettes, typography } from '@/data/ingredients'
import { directions, families, goals, motionLevels, purposes } from '@/data/taxonomy'
import { offShapeVideo, composeRecipe, isValidSpec, specFromSeed, defaultPagesFor, normalizeSpec, recommendPresentation, recommendedNav, recommendedShape, signatureChoices } from '@/features/recipes/engine'
import { saveGeneration } from '@/features/recipes/library'
import { seedBySlug } from '@/data/recipes'
import { deleteFile, getFile, storeUpload } from '@/lib/files'
import { examples } from '@/data/examples'
import { KEYS, get, write } from '@/lib/store'
import { EFFECTS, heroes, imagePresentations, navStyles, pageTypes, shapeStyles } from '@/data/patterns'
import { OptionDemo } from '@/components/OptionDemo'
import { ToolIcon } from '@/components/ToolIcon'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import type {
  AssetId, Brief, HeroId, BuildTargetId, ImagePresentationGroup, ImagePresentationId, CharacterId, DirectionId, FamilyId, GoalId, LayoutId, LeadId, MediaPlan, MotionLevel,
  NavStyleId, PageSpec, PageTypeId, PaletteColors, PaletteId, PurposeId, RecipeSpec, ShapeId, TypographyId, UniversalRecipe, UploadedAsset,
} from '@/types/domain'

type Draft = {
  purpose?: PurposeId; brief: Brief; feel?: FamilyId; direction?: DirectionId; characters: CharacterId[]; lead?: LeadId; motion?: MotionLevel
  hero?: HeroId; layout?: LayoutId; palette?: PaletteId; customPalette?: PaletteColors; typography?: TypographyId; assets: AssetId[]
  uploads: UploadedAsset[]; mediaPlan?: MediaPlan; videoFrame?: 'wide' | 'original'; imagePresentation?: ImagePresentationId; pages: PageSpec[]; target?: BuildTargetId
  nav?: NavStyleId; shape?: ShapeId; signatures?: string[]
}
const EMPTY: Draft = { brief: {}, characters: [], assets: [], uploads: [], pages: [] }

const LEAD_ASSET: Record<LeadId, AssetId | null> = { photography: 'images', video: 'video', product: 'product-photos', illustration: 'illustrations', '3d': '3d', typography: null }

const has = (d: Draft, a: AssetId) => d.assets.includes(a) || d.uploads.some((u) => u.asset === a)
// Only asked where the experience breaks without the asset; for photos/products/illustrations the recipe adds a "find it" path.
const needsMediaPlan = (d: Draft) => (d.lead === 'video' || d.lead === '3d') && !has(d, LEAD_ASSET[d.lead]!)
/** A patch, or a function of the latest draft — for updates that land after an await (file reads). */
type SetDraft = (patch: Partial<Draft> | ((x: Draft) => Partial<Draft>)) => void
const photosOf = (d: Draft) => d.uploads.filter((u) => u.asset === 'images')


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
  { id: 'shape', title: 'Pick the shape of buttons and cards', hint: 'Corners and edges change the whole mood. Shown in your colors.', show: always, done: always },
  { id: 'nav', title: 'How should the menu look?', hint: 'Each preview moves like the real menu. Trending picks are marked.', show: always, done: always },
  { id: 'touches', title: 'Pick your special touches', hint: 'Small moments people remember. We chose the best fits for your site — change them freely, up to 4.', show: always, done: always },
  { id: 'media', title: (d) => (d.lead === '3d' ? 'Add your 3D scene' : 'Add your video'), hint: (d) => (d.lead === '3d' ? 'A .glb or .gltf file.' : 'A short clip works best — 5 to 15 seconds, landscape.'), show: (d) => d.lead === 'video' || d.lead === '3d', done: (d) => !!d.mediaPlan },
  // Always asked: every site can use photos, whatever leads the first screen. Their count and shape decide how they are shown.
  { id: 'photos', title: 'Add your photos', hint: (d) => (d.lead === 'photography' ? 'The photos your site is built around. Add as many as you like.' : 'Optional — work, people, places, details for the rest of the site. Add as many as you like.'), show: always, done: always },
  { id: 'target', title: 'How will you build it?', hint: 'Pick the tool you use. You can switch any time on the result page.', show: always, done: (d) => !!d.target },
]

function toSpec(d: Draft): RecipeSpec {
  const dir = directions[d.direction ?? 'japanese-minimal']
  return normalizeSpec({
    base: dir.baseRecipe, brief: d.brief, purpose: d.purpose ?? 'other', direction: dir.id, characters: d.characters,
    lead: d.lead ?? dir.defaults.lead, motion: d.motion ?? dir.defaults.motion, hero: d.hero, layout: d.layout ?? dir.defaults.layout,
    palette: d.palette ?? dir.defaults.palette, customPalette: d.customPalette, typography: d.typography ?? dir.defaults.typography,
    assets: d.assets, uploads: d.uploads, mediaPlan: needsMediaPlan(d) ? d.mediaPlan : 'have', videoFrame: d.videoFrame, imagePresentation: d.imagePresentation, nav: d.nav, shape: d.shape, signatures: d.signatures,
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


export function Creator() {
  const router = useRouter()
  const params = useSearchParams()
  const [d, setD] = useState<Draft>(EMPTY)
  const [stepId, setStepId] = useState('purpose')
  const [loading, setLoading] = useState<string | null>(null)
  // Set when the user came back from a result page to change answers: finishing saves over that same recipe.
  const [editId, setEditId] = useState<string | null>(null)

  // Restore draft (optional save state) or start from ?feel= / ?direction=
  useEffect(() => {
    const saved = get<{ d: Draft; stepId: string } | null>(KEYS.draft, null)
    const feel = params.get('feel') as FamilyId | null
    const dir = params.get('direction') as DirectionId | null
    const edit = params.get('edit'), seed = params.get('seed'), jump = params.get('step')
    const from = edit ? get<Record<string, { spec: unknown }>>(KEYS.generations, {})[edit]?.spec : seed && seedBySlug[seed] ? specFromSeed(seedBySlug[seed]) : undefined
    if (from && isValidSpec(from)) {
      setD(specToDraft(normalizeSpec(from))); setEditId(edit)
      setStepId(jump && STEPS.some((s) => s.id === jump) ? jump : 'purpose')
    } else if (dir && directions[dir]) setD({ ...EMPTY, feel: directions[dir].families[0], direction: dir, ...defaultsFor(dir) })
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
  const isLast = !STEPS.slice(orderIdx + 1).some((s) => s.show(d))
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
    const lines = editId ? ['Updating your recipe…', 'Recomposing every page…'] : [who ? `Composing ${who}…` : 'Composing your direction…', 'Setting your typography…', 'Choosing your colors…', 'Building your motion system…', 'Preparing your assets…']
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    lines.forEach((l, i) => setTimeout(() => setLoading(l), reduce ? 0 : i * 420))
    setTimeout(() => {
      const id = saveGeneration(spec, editId ?? undefined)
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
          <button type="button" className="text-sm link" onClick={() => { setD({ ...EMPTY }); setEditId(null); go('purpose') }}>Start over</button>
        </div>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="px-5 pb-40 pt-10 md:px-10 lg:pt-14" aria-labelledby="q">
          <h1 id="q" tabIndex={-1} className="display outline-none text-[clamp(2rem,4vw,3.4rem)]">{txt(step.title, d)}</h1>
          {step.hint && <p className="mt-3 text-ink-2">{txt(step.hint, d)}</p>}
          <div id="q-body" className="mt-8"><StepBody step={step.id} d={d} set={set} go={go} recipe={recipe} /></div>
          <RotatingTips stepId={step.id} />
        </section>

        <aside className="hidden border-l border-line bg-white/60 lg:block" aria-label="Examples and live preview">
          <div className="sticky top-16 p-8">
            {step.id === 'media' ? <MediaExamples d={d} p={p} /> : (
              <>
                <SitePreview {...p} className="rounded-lg border border-line" />
                <SoFar d={d} />
              </>
            )}
          </div>
        </aside>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 px-5 py-3 md:px-8">
          <button type="button" onClick={back} disabled={isFirst} className="btn btn-line btn-sm disabled:opacity-30">Back</button>
          <Popover>
            <PopoverTrigger className="text-sm link lg:hidden">Preview</PopoverTrigger>
            <PopoverContent side="top" className="w-[min(28rem,calc(100vw-2rem))] p-3"><SitePreview {...p} className="rounded" /></PopoverContent>
          </Popover>
          {/* Came from a result page to change something: save straight back from any question. */}
          {editId && !isLast && (
            <button type="button" onClick={finish} disabled={!step.done(d)} className="btn btn-line btn-sm ml-auto disabled:opacity-30">Save changes</button>
          )}
          <button type="button" onClick={next} disabled={!step.done(d)} className="btn btn-ink disabled:opacity-30">
            {isLast ? (editId ? 'Save changes' : 'Create my site plan') : skippedEmpty(step.id, d) ? 'Skip' : 'Continue'}
          </button>
        </div>
      </footer>
    </div>
  )
}

const STEP_TIPS: Record<string, [string, string, string]> = {
  purpose:    ['Pick the closest fit — you can rename it later', 'Your choice shapes which pages we suggest', "Not sure? 'Other' works for anything"],
  brief:      ['No name yet? Press Skip and add it any time', 'The short line appears as a subtitle on your site', 'Press Enter to continue when done'],
  goal:       ['This drives the main button on every page', 'Pick one — add more CTAs in the build phase', 'The typical goal for your site type is highlighted'],
  feel:       ['Go with your gut — each style has multiple directions inside', 'Colors and fonts are fine-tuned in later steps', 'Press 1–9 to pick quickly'],
  direction:  ['Directions lock in a coordinated palette, font and layout', "You'll choose exact colors and fonts yourself next", 'Press Enter to continue after picking'],
  lead:       ['The first screen makes the biggest impression', 'Trending picks are the most-used effects right now', 'You can change this any time from the result page'],
  motion:     ['Immersive = big scroll effects. Still = no animation.', 'Match movement to your audience — calm for professional, lively for creative', 'This controls animation throughout the whole site'],
  palette:    ['Recommended palettes were tested for this direction', 'Fine-tune individual colors with the tool below', 'Press 1–9 to pick quickly'],
  typography: ['Font pairs are curated to never clash', 'Recommended fonts were chosen for this direction', "The 'why' below each pair explains the character it adds"],
  shape:      ['Round corners feel friendly. Sharp feel editorial.', 'Shown in your chosen colors so you see the real effect', 'This applies to buttons, cards and form fields'],
  nav:        ['The menu is the first interaction most visitors have', 'Trending picks are tried-and-tested navigation styles', 'You can change this after the site is built too'],
  touches:    ['Choose up to 4 — too many effects feels busy', 'Best fits are pre-selected based on your choices', 'Each touch is a micro-moment visitors notice and remember'],
  media:      ['5–15 seconds works best for hero video loops', 'Landscape (16:9) fills desktop screens cleanly', 'No video yet? Use a placeholder and add it later'],
  photos:     ['More photos = more layout options in the build', 'Landscape photos suit most layouts. Portrait for editorial.', 'Add a note below — the builder uses it to place photos right'],
  target:     ['Not sure yet? Pick “Decide later” and choose on the result page', 'Lovable and v0 need no coding at all', 'Claude Code and Cursor write the code for you'],
}
const DEFAULT_TIPS: [string, string, string] = ['Press 1–9 to choose, Enter to continue', 'Your choices are saved automatically', 'You can change anything later on the result page']

function RotatingTips({ stepId }: { stepId: string }) {
  const tips = STEP_TIPS[stepId] ?? DEFAULT_TIPS
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => { setIdx(0); setFade(true) }, [stepId])

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false)
      setTimeout(() => { setIdx((x) => (x + 1) % 3); setFade(true) }, 250)
    }, 2500)
    return () => clearInterval(id)
  }, [tips])

  return (
    <p className="mt-8 hidden h-5 text-xs text-muted lg:flex lg:items-center lg:gap-1.5" style={{ opacity: fade ? 1 : 0, transition: 'opacity 250ms ease' }}>
      <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-pencil/50" aria-hidden />
      {tips[idx]}
    </p>
  )
}

/** Optional steps left empty get an honest "Skip" label instead of "Continue". */
function skippedEmpty(id: string, d: Draft) {
  return (id === 'brief' && !d.brief.name?.trim() && !d.brief.offer?.trim()) || (id === 'photos' && !photosOf(d).length && !d.imagePresentation && !d.brief.photos?.trim())
}

/** A saved recipe back into questionnaire answers, so "Edit answers" starts exactly where the user left off. */
function specToDraft(s: RecipeSpec): Draft {
  return {
    ...EMPTY, purpose: s.purpose, brief: s.brief ?? {}, feel: directions[s.direction].families[0], direction: s.direction, characters: s.characters,
    lead: s.lead, motion: s.motion, hero: s.hero, layout: s.layout, palette: s.palette, customPalette: s.customPalette, typography: s.typography,
    assets: s.assets, uploads: s.uploads ?? [], mediaPlan: s.mediaPlan, videoFrame: s.videoFrame, imagePresentation: s.imagePresentation,
    pages: s.pages, target: s.target, nav: s.nav, shape: s.shape, signatures: s.signatures,
  }
}

function defaultsFor(dir: DirectionId): Partial<Draft> {
  const x = directions[dir].defaults
  return { palette: x.palette, typography: x.typography, layout: x.layout, lead: x.lead, motion: x.motion, hero: undefined, customPalette: undefined }
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


// ─── Step bodies ─────────────────────────────────────────────────────────────

function Grid({ children, cols = 'sm:grid-cols-2 xl:grid-cols-3' }: { children: ReactNode; cols?: string }) {
  return <div className={`grid gap-3 ${cols}`}>{children}</div>
}

function Card({ selected, onClick, title, line, children, badge, icon: Icon, role = 'radio', disabled = false, note }: { selected: boolean; onClick: () => void; title: string; line?: string; children?: ReactNode; badge?: string; icon?: LucideIcon; role?: 'radio' | 'checkbox'; disabled?: boolean; note?: string }) {
  return (
    <button type="button" role={role} aria-checked={selected} aria-disabled={disabled || undefined} onClick={disabled ? undefined : onClick} className={`choice w-full overflow-hidden ${disabled ? 'cursor-not-allowed opacity-45' : ''}`}>
      {children}
      <span className="block p-4">
        {Icon && <Icon size={28} strokeWidth={1.5} className="mb-3 text-ink-2" aria-hidden />}
        <span className="flex items-center justify-between gap-2"><span className="font-medium">{title}</span>{badge && <span className="pencil">{badge}</span>}</span>
        {line && <span className="mt-0.5 block text-sm text-muted">{line}</span>}
        {note && <span className="mt-2 block text-xs text-warn">{note}</span>}
      </span>
    </button>
  )
}

const TARGETS: [BuildTargetId, string, string][] = [
  ['not-sure', 'Decide later', 'Choose your tool on the result page'],
  ['lovable', 'Lovable', 'Build it by chatting — no code needed'], ['v0', 'v0', 'Paste one prompt, get a site'],
  ['claude-code', 'Claude Code', 'An AI assistant that writes the code for you'], ['cursor', 'Cursor', 'An AI code editor, for people who code a little'],
  ['own-code', 'I’ll code it myself', 'Full design notes, colors and fonts as code'],
]

/** The first-screen effects, described by what the visitor experiences — never by how it's built. */
const effectOf = (d: Draft) => EFFECTS.find((e) => e.hero === d.hero)
/** Movement levels the chosen first screen works with (e.g. the scroll-through film only works fully immersive). */
const motionChoices = (d: Draft) => (Object.keys(motionLevels) as MotionLevel[]).filter((m) => !d.hero || heroes[d.hero].motion.includes(m))
/** A real site that uses the effect, shown in its card instead of a mock-up. */
const CLIP = examples.find((e) => e.clip)?.clip
const EFFECT_CLIP: Partial<Record<HeroId, string>> = { 'scroll-video': CLIP, 'scroll-video-page': CLIP }

const PURPOSE_ICON: Record<PurposeId, LucideIcon> = {
  portfolio: Images, agency: Briefcase, studio: PenTool, fashion: Shirt, restaurant: UtensilsCrossed, ecommerce: ShoppingBag,
  product: Package, saas: AppWindow, 'personal-brand': User, experiment: Sparkles, other: Globe,
  blog: Newspaper, event: PartyPopper, nonprofit: HandHeart, 'real-estate': House, hotel: BedDouble, course: GraduationCap, clinic: Stethoscope,
}
const GOAL_ICON: Record<GoalId, LucideIcon> = { contact: Mail, book: CalendarCheck, buy: ShoppingCart, signup: UserPlus, subscribe: BellRing, explore: Compass, call: Phone, visit: MapPin, donate: HeartHandshake, apply: ClipboardCheck, download: Download }

/** The goal most sites of each kind are built around — shown as a hint, never preselected. */
const TYPICAL_GOAL: Record<PurposeId, GoalId> = {
  portfolio: 'contact', agency: 'contact', studio: 'contact', fashion: 'buy', restaurant: 'book', ecommerce: 'buy',
  product: 'buy', saas: 'signup', 'personal-brand': 'subscribe', experiment: 'explore', other: 'contact',
  blog: 'subscribe', event: 'book', nonprofit: 'donate', 'real-estate': 'book', hotel: 'book', course: 'apply', clinic: 'book',
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
  blog: ['Slow Type', 'Weekly essays on design history, for people who make things.'],
  event: ['Aida & Kenan', 'Our wedding on 14 June in Sheki — the day, the place, the plan.'],
  nonprofit: ['Open Shelves', 'We build free libraries in villages that have none.'],
  'real-estate': ['Caspian Homes', 'New-build apartments by the sea, from studios to penthouses.'],
  hotel: ['Casa Alba', 'Nine rooms in a restored farmhouse above the olive groves.'],
  course: ['Type School', 'A six-week online course in lettering, taught live.'],
  clinic: ['Kind Dental', 'Gentle family dentistry in the city centre, open late.'],
}

/** The palette and type the demos are drawn in: the user's current choices. */
const demoLook = (d: Draft) => { const p = preview(d); return { colors: p.colors, type: p.type } }

function StepBody({ step, d, set, go, recipe }: { step: string; d: Draft; set: SetDraft; go: (id: string) => void; recipe: UniversalRecipe }) {
  const dir = d.direction && directions[d.direction]
  const setBrief = (patch: Partial<Brief>) => set({ brief: { ...d.brief, ...patch } })
  switch (step) {
    case 'purpose':
      return (
        <div role="radiogroup" aria-label="What are you building" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {Object.values(purposes).sort((a, b) => Number(a.id === 'other') - Number(b.id === 'other')).map((p) => <Card key={p.id} icon={PURPOSE_ICON[p.id]} selected={d.purpose === p.id} onClick={() => set({ purpose: p.id, ...(d.purpose !== p.id ? { pages: defaultPagesFor(p.id) } : {}) })} title={p.name} line={p.hint} />)}
        </div>
      )
    case 'brief': {
      const [exName, exOffer] = OFFER_EXAMPLE[d.purpose ?? 'other']
      return (
        <div className="max-w-xl space-y-5">
          <label className="block"><span className="sr-only">Name</span>
            <Input value={d.brief.name ?? ''} maxLength={60} placeholder={exName} onChange={(e) => setBrief({ name: e.target.value })}
              className="h-16 px-4 text-2xl md:text-2xl" /></label>
          <label className="block text-sm"><span className="text-muted">In a few words, what is it? (optional)</span>
            <Input value={d.brief.offer ?? ''} maxLength={160} placeholder={exOffer} onChange={(e) => setBrief({ offer: e.target.value })}
              className="mt-2 h-12" /></label>
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
    case 'shape': {
      const current = d.shape ?? recommendedShape(recipe.metadata.spec)
      return (
        <div role="radiogroup" aria-label="Shape"><Grid>
          {Object.values(shapeStyles).map((x) => (
            <Card key={x.id} selected={current === x.id} title={x.name} line={x.line} badge={x.id === recommendedShape(recipe.metadata.spec) ? 'Fits your style' : undefined} onClick={() => set({ shape: x.id })}>
              <OptionDemo id={`shape:${x.id}`} shape={x} {...demoLook(d)} />
            </Card>
          ))}
        </Grid></div>
      )
    }
    case 'nav': {
      const rec = recommendedNav(recipe.metadata.spec)
      const current = d.nav ?? rec
      return (
        <div role="radiogroup" aria-label="Menu style"><Grid>
          {Object.values(navStyles).map((x) => (
            <Card key={x.id} selected={current === x.id} title={x.name} line={x.line} badge={x.id === rec ? 'Fits your site' : x.trending ? 'Trending' : undefined} onClick={() => set({ nav: x.id })}>
              <OptionDemo id={`nav:${x.id}`} shape={recipe.visualSystem.shape} {...demoLook(d)} />
            </Card>
          ))}
        </Grid></div>
      )
    }
    case 'touches': {
      const choices = signatureChoices(recipe)
      // What actually ships — never show a touch as picked if the plan couldn't place it.
      const picked = recipe.signatures.map((x) => x.id)
      const flip = (id: string) => set({ signatures: picked.includes(id) ? picked.filter((x) => x !== id) : [...picked, id].slice(-4) })
      // A touch whose only sections are already taken by the current picks can't be added — say so instead of silently dropping it.
      const fits = (id: string) => picked.includes(id) || composeRecipe(toSpec({ ...d, signatures: [...picked, id].slice(-4) })).signatures.some((x) => x.id === id)
      return (
        <div role="group" aria-label="Special touches"><Grid>
          {choices.map((x) => (
            <Card key={x.id} role="checkbox" selected={picked.includes(x.id)} title={x.name} line={x.experience} badge={x.recommended ? 'Best fit' : undefined} onClick={() => flip(x.id)}
              disabled={!fits(x.id)} note={fits(x.id) ? undefined : 'No free spot — the section it needs already has one of your touches. Unpick one to use this.'}>
              <OptionDemo id={`sig:${x.id}`} shape={recipe.visualSystem.shape} {...demoLook(d)} />
            </Card>
          ))}
        </Grid></div>
      )
    }
    case 'media': return <MediaStep d={d} set={set} />
    case 'photos': return <PhotosStep d={d} set={set} />
    case 'target': {
      return (
        <div role="radiogroup" aria-label="Build target" className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {TARGETS.map(([id, name, line]) => (
            <Card key={id} selected={d.target === id} title={name} line={line} onClick={() => set({ target: id })}>
              <span className="flex px-4 pt-4"><ToolIcon id={id} className="size-8" /></span>
            </Card>
          ))}
        </div>
      )
    }
  }
  return null
}


const UTILITY_PAGE_TYPES: PageTypeId[] = ['faq', 'sign-in', 'sign-up', 'privacy-policy', 'terms-of-service', 'cookie-policy', 'not-found', 'accessibility']

function PagesStep({ d, set }: { d: Draft; set: (p: Partial<Draft>) => void }) {
  const purpose = purposes[d.purpose ?? 'other']
  const [editingId, setEditingId] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

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

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditingId(null)}>
        <DialogContent className="bg-paper p-6 text-base sm:max-w-md">
          <DialogTitle className="text-xl font-medium">Edit page</DialogTitle>
          <DialogDescription className="sr-only">Rename the page and say what it should do.</DialogDescription>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-1.5"><Label htmlFor="page-name">Page name</Label>
                <Input id="page-name" autoFocus value={editing.label} onChange={(e) => updatePage(editing.id, { label: e.target.value })} /></div>
              <div className="space-y-1.5"><Label htmlFor="page-purpose">What should this page do?</Label>
                <Textarea id="page-purpose" value={editing.purpose} onChange={(e) => updatePage(editing.id, { purpose: e.target.value })} rows={3} /></div>
              <div className="flex justify-end pt-1"><button type="button" className="btn btn-ink btn-sm" onClick={() => setEditingId(null)}>Done</button></div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
      <Collapsible defaultOpen><CollapsibleTrigger className="text-sm link">Adjust individual colors</CollapsibleTrigger><CollapsibleContent className="mt-3"><PaletteEditor colors={colors} changed={!!d.customPalette} onReset={() => set({ customPalette: undefined })} onChange={(c) => set({ palette: current, customPalette: c })} /></CollapsibleContent></Collapsible>
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


/** Swaps in newly uploaded files for one asset type, freeing the IndexedDB bytes of whatever they replace. */
async function replaceUploads(d: Draft, asset: AssetId, metas: UploadedAsset[]): Promise<UploadedAsset[]> {
  await Promise.all(d.uploads.filter((u) => u.asset === asset && u.fileId).map((u) => deleteFile(u.fileId!)))
  return [...d.uploads.filter((u) => u.asset !== asset), ...metas]
}

export function uploadAdvice(u: UploadedAsset): string | null {
  if (u.kind === 'video' && u.width && u.height && u.duration) {
    const ratio = u.width / u.height
    if (u.height > u.width) return `Vertical video (${u.width}×${u.height}). Phones show it exactly as it is; wide desktop screens need a 16:9 version — choose below.`
    if (Math.abs(ratio / (16 / 9) - 1) > 0.05) return `${u.width}×${u.height} isn’t 16:9. Wide screens need a 16:9 version — choose below.`
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
    const u = await storeUpload(f, asset)
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
      {isVideo && offShapeVideo({ lead, uploads: d.uploads }) && (
        <div role="radiogroup" aria-label="Video shape" className="grid gap-2 sm:grid-cols-2">
          <Card selected={d.videoFrame !== 'original'} title="Fill wide screens (recommended)"
            line="Desktop shows a full 16:9 version, edge to edge. Phones keep your video as it is. Your plan explains how to make the 16:9 version sharp." onClick={() => set({ videoFrame: 'wide' })} />
          <Card selected={d.videoFrame === 'original'} title="Keep my video’s shape"
            line="Same shape on every screen. On desktop it sits in a tall frame with your text beside it." onClick={() => set({ videoFrame: 'original' })} />
        </div>
      )}
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

function PhotosStep({ d, set }: { d: Draft; set: SetDraft }) {
  const photos = photosOf(d)
  const rec = recommendPresentation(toSpec(d))
  const current = d.imagePresentation ?? rec.id
  const add = async (files?: FileList | null) => {
    const imgs = [...(files ?? [])].filter((f) => f.type.startsWith('image'))
    if (!imgs.length) return
    const metas = await Promise.all(imgs.map((f) => storeUpload(f, 'images')))
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
        <Textarea value={d.brief.photos ?? ''} maxLength={400} rows={3} onChange={(e) => set({ brief: { ...d.brief, photos: e.target.value } })}
          placeholder="e.g. A 3D slider for the project photos. The team photo goes on About. Keep the before/after pairs side by side."
          className="mt-2" />
      </label>

      <div>
        <p className="font-medium">How should your photos be shown?</p>
        <p className="mt-1 text-sm text-muted">We recommend <span className="text-ink">{imagePresentations[rec.id].name}</span> — {rec.why}.</p>
        {(Object.keys(PHOTO_GROUPS) as ImagePresentationGroup[]).map((g) => (
          <div key={g} className="mt-6">
            <p className="text-sm text-muted">{PHOTO_GROUPS[g]}</p>
            <div role="radiogroup" aria-label={PHOTO_GROUPS[g]} className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {Object.values(imagePresentations).filter((x) => x.group === g).map((x) => (
                <Card key={x.id} selected={current === x.id} title={x.name} line={x.line}
                  badge={x.id === rec.id ? 'Recommended' : undefined} onClick={() => set({ imagePresentation: x.id === rec.id ? undefined : x.id })}>
                  <OptionDemo id={`photo:${x.id}`} shape={shapeStyles[d.shape ?? recommendedShape(toSpec(d))]} {...demoLook(d)} />
                </Card>
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

