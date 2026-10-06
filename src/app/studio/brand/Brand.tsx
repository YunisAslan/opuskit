'use client'
// Brand — the first building step (docs/plan-library.md), in three columns side by side: 1 your site in your words
// (name, one sentence — what visitors should do is read from the parts, `inferGoal`); 2 your colours, then your lettering — eight of each first
// (what fits leads), more on request; 3 an example in your picks (marked as an example) and OpusKit's built sites that
// use them. Until something is picked, the start site's look (or the kind of site's) is used. Photos and films are added
// on the parts that show them, in Pages.
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { Chip } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { palettes, typography } from '@/data/ingredients'
import { purposes } from '@/data/taxonomy'
import { setStyle } from '@/features/kit/plan'
import { rankPalettes } from '@/features/recipes/engine'
import { luminance } from '@/lib/color'
import { updatePlan, usePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { PaletteId, TypographyId } from '@/types/domain'
import { NeedsStudio, StepFrame, usePlanLook } from '../shared'
import { UsedOn } from './UsedOn'
import { exampleOf } from '@/app/library/parts'
import { images } from '@/data/images'
import { siteName, siteSpec, startSite } from '@/features/library/collection'
import { updateCollection, useCollection } from '@/lib/collection'

const FIRST = 8
const ALL_TYPE = Object.keys(typography) as TypographyId[]
const ALL_COLOURS = Object.keys(palettes) as PaletteId[]
const isDark = (id: PaletteId) => luminance(palettes[id].colors.background) < 0.2
// What kind of face leads each pairing (its display family), for the lettering filter.
const SERIF = new Set(['Amiri', 'Ancizar Serif', 'Bellefair', 'Besley', 'Bodoni Moda', 'Castoro Titling', 'Cormorant', 'Gilda Display', 'Gloock', 'Hedvig Letters Serif', 'Ibarra Real Nova', 'Imbue', 'Italiana', 'Kalnia', 'Labrada', 'Libre Caslon Display', 'Literata', 'Newsreader', 'Noto Serif Display', 'Petrona', 'Prata', 'Sedan', 'Shippori Mincho', 'Young Serif'])
const EXPRESSIVE = new Set(['Bagel Fat One', 'Ballet', 'Boldonse', 'Caprasimo', 'Caveat Brush', 'Grenze Gotisch', 'Monoton', 'Permanent Marker', 'Press Start 2P', 'Rubik Mono One', 'Tektur', 'Tilt Warp'])
const KINDS = ['Serif', 'Sans', 'Expressive'] as const
const typeKind = (id: TypographyId) => { const f = typography[id].display.family; return SERIF.has(f) ? 'Serif' : EXPRESSIVE.has(f) ? 'Expressive' : 'Sans' }

export function Brand() {
  const ready = useHydrated()
  const plan = usePlan()
  const c = useCollection()
  const { look, spec } = usePlanLook(plan)
  const [tone, setTone] = useState<'all' | 'light' | 'dark'>('all')
  const [kind, setKind] = useState<'all' | (typeof KINDS)[number]>('all')
  const [nColours, setNColours] = useState(FIRST)
  const [nType, setNType] = useState(FIRST)
  // Each list's order is set once, when the page opens (the pick then, what fits, the rest): picking never moves a tile.
  const typeOrder = useRef<TypographyId[]>(null), colourOrder = useRef<PaletteId[]>(null)
  if (ready && !typeOrder.current) typeOrder.current = [...new Set([look.type.id, ...look.d.typography, ...ALL_TYPE])]
  const fonts = (typeOrder.current ?? ALL_TYPE).filter((t) => kind === 'all' || typeKind(t) === kind)
  useGoogleFonts(fonts.slice(0, nType).flatMap((t) => typography[t].googleFamilies))
  if (!ready) return null
  if (plan.via !== 'studio' || !plan.pages.length) return <NeedsStudio />

  const ranked = rankPalettes(spec)
  // A real photo for the tile: the start site's own first picture, else the look's curated one.
  const start = startSite(c), e = start && exampleOf(start)
  const photo = e ? (e.hero.kind === 'video' ? e.hero.poster : e.hero.src) : images[look.d.image].src
  const fits = ranked.slice(0, 6)
  colourOrder.current ??= [...new Set([spec.palette, ...fits, ...look.d.palettes, ...ALL_COLOURS])]
  const colours = colourOrder.current.filter((id) => tone === 'all' || isDark(id) === (tone === 'dark'))
  // Name and sentence live on the plan and on the Collection, so a rebuild keeps them.
  const say = (k: 'name' | 'about', v: string) => { updatePlan((p) => ({ ...p, [k]: v || undefined })); updateCollection((x) => ({ ...x, [k]: v })) }
  const pages = plan.pages.length, collected = c.items.filter((i) => i.kind !== 'site').length
  // The first collected site's colours and lettering are the start, and say so; anything else can be picked.
  const firstSpec = start ? siteSpec(start) : undefined, fromName = start && siteName(start)
  const tag = (made: boolean, best: boolean, theirs?: boolean) => (theirs ? `From ${fromName}` : best ? 'Fits your site' : made ? 'Made for this look' : undefined)

  return (
    <StepFrame at="Brand" title={<h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Brand</h1>}
      next={<Link href="/studio/pages" className="btn btn-ink btn-sm"><span>Next<span className="hidden sm:inline">: Pages</span></span><ArrowRight size={14} aria-hidden /></Link>}>
      <div className="mt-8 grid gap-8 md:grid-cols-[14rem_minmax(0,1fr)] md:items-start lg:grid-cols-[15rem_minmax(0,1fr)_minmax(0,1fr)] xl:gap-10">
        {/* 1 — your site, in your words */}
        <section aria-labelledby="your-site" className="space-y-5 md:sticky md:top-36">
          <h2 id="your-site" className="border-t border-ink pt-3 text-xl font-medium tracking-tight">Your site</h2>
          <label className="block"><span className="text-sm text-muted">Name</span>
            <Input value={plan.name ?? ''} maxLength={60} onChange={(e) => say('name', e.target.value)} placeholder="Mira Atelier" className="mt-1.5 h-11 bg-white text-base" /></label>
          <label className="block"><span className="text-sm text-muted">In one sentence</span>
            <Textarea value={plan.about ?? ''} maxLength={160} onChange={(e) => say('about', e.target.value)} placeholder="What you do, and for whom" rows={3} className="mt-1.5 resize-none bg-white text-base" /></label>
          <p className="border-t border-line pt-4 text-sm text-muted">Next: your {pages} pages{collected ? `, with the ${collected} ${collected === 1 ? 'thing' : 'things'} you collected` : ''}{plan.purpose ? ` — ${/^[aeiou]/i.test(purposes[plan.purpose].name) ? 'an' : 'a'} ${purposes[plan.purpose].name.toLowerCase()}` : ''}.</p>
        </section>

        {/* 2 — colours, then lettering */}
        <div className="min-w-0 space-y-12">
          <Group id="colours" title="Colours" intro={fromName && <p className="mb-3 rounded-md bg-paper-2 px-3 py-2 text-sm text-ink-2">Your colours and lettering start as <span className="font-medium text-ink">{fromName}</span>’s — the first site you collected. Pick any others.</p>} shown={Math.min(nColours, colours.length)} total={colours.length} onMore={() => setNColours(Infinity)} filters={(['all', 'light', 'dark'] as const).map((t) => <Chip key={t} active={tone === t} onClick={() => { setTone(t); setNColours(FIRST) }}>{t === 'all' ? 'All' : t === 'light' ? 'Light' : 'Dark'}</Chip>)}>
            {colours.slice(0, nColours).map((id) => {
              const p = palettes[id], c = p.colors
              return (
                <Tile key={id} on={spec.palette === id} onPick={() => updatePlan((x) => setStyle(x, 'palette', id))} label={p.name} sub={tag(look.d.palettes.includes(id), fits.includes(id), firstSpec?.palette === id)}>
                  <span className="grid h-12 grid-cols-[2fr_1fr_1fr_1fr]" aria-hidden>{[c.background, c.text, c.accent, c.surface].map((x, i) => <span key={i} style={{ background: x }} />)}</span>
                </Tile>
              )
            })}
          </Group>

          <Group id="lettering" title="Lettering" shown={Math.min(nType, fonts.length)} total={fonts.length} onMore={() => setNType(Infinity)} filters={(['all', ...KINDS] as const).map((k) => <Chip key={k} active={kind === k} onClick={() => { setKind(k); setNType(FIRST) }}>{k === 'all' ? 'All' : k}</Chip>)}>
            {fonts.slice(0, nType).map((id) => {
              const t = typography[id]
              return (
                <Tile key={id} on={look.type.id === id} onPick={() => updatePlan((x) => setStyle(x, 'typography', id))} label={t.name} sub={tag(look.d.typography.includes(id), id === look.d.defaults.typography, firstSpec?.typography === id)}>
                  {/* Both faces of the pairing, each in itself: headings, and the text everything else is set in. */}
                  <span className="block h-[4.25rem] overflow-hidden px-3 pt-2.5" aria-hidden>
                    <span className="block truncate text-[1.35rem] leading-none" style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontStretch: t.display.stretch, fontStyle: t.display.italic ? 'italic' : undefined }}>Aa {t.display.family}</span>
                    <span className="mt-2 block truncate text-[12px] text-ink-2" style={{ fontFamily: `'${t.body.family}'`, fontWeight: t.body.weight }}>{t.body.family === t.display.family ? 'The same face for text' : `Text in ${t.body.family}`}</span>
                  </span>
                </Tile>
              )
            })}
          </Group>
        </div>

        {/* 3 — what you'll get: an example in your picks */}
        <div className="md:col-span-2 lg:sticky lg:top-36 lg:col-span-1">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-paper-2 px-3 py-1 text-xs text-ink-2"><span className="size-1.5 rounded-full bg-pencil" aria-hidden />Example · how your site will look</p>
          <UsedOn plan={plan} palette={spec.palette} type={look.type} shape={look.shape} photo={photo} />
        </div>
      </div>
    </StepFrame>
  )
}

function Group({ id, title, intro, filters, shown, total, onMore, children }: { id: string; title: string; intro?: React.ReactNode; filters: React.ReactNode; shown: number; total: number; onMore: () => void; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={title} className="scroll-mt-32">
      {/* The heading and its filters stay in reach while its list scrolls by (the next heading takes its place). */}
      <div className="sticky top-[7.5rem] z-10 flex flex-wrap items-center justify-between gap-2 border-t border-ink bg-paper pb-3 pt-3">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        <div className="flex gap-1">{filters}</div>
      </div>
      {intro}
      <div role="radiogroup" aria-label={title} className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]">{children}</div>
      {shown < total && <button type="button" onClick={onMore} className="mt-3 w-full rounded-md border border-dashed border-line py-2.5 text-sm text-ink-2 hover:border-ink hover:text-ink">Show all {total}</button>}
    </section>
  )
}

function Tile({ on, onPick, label, sub, children }: { on: boolean; onPick: () => void; label: string; sub?: string; children: React.ReactNode }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onPick} className={`overflow-hidden rounded-md border bg-white text-left ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
      {children}
      <span className="flex items-start justify-between gap-2 border-t border-line px-2.5 py-1.5">
        <span className="min-w-0"><span className="block truncate text-[13px] font-medium">{label}</span>{sub && <span className="block truncate text-[11px] text-pencil">{sub}</span>}</span>
        {on && <Check size={14} className="mt-0.5 shrink-0 text-pencil" aria-hidden />}
      </span>
    </button>
  )
}
