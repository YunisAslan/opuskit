'use client'
// Brand — the first building step (docs/plan-library.md), in three columns side by side: 1 your site in your words
// (name, one sentence — what visitors should do is read from the parts, `inferGoal`); 2 one list at a time, under tabs
// (a look OpusKit built a site in plays that site's recording; any other is drawn as your own site)
// with each pick named (decision 29): the look, only where there is a
// choice to make (decision 28: a blank start picks from every look; several collected sites with different looks pick
// among those; one collected site simply is its look), then your colours, then your lettering — eight of each first
// (what fits leads), more on request; 3 an example in your picks (marked as an example) and OpusKit's built sites that
// use them. Until something is picked, the start site's look (or the kind of site's) is used. Photos and films are added
// on the parts that show them, in Pages.
import { ArrowRight, Check } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { Chip } from '@/components/ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { palettes, typography } from '@/data/ingredients'
import { directions, families } from '@/data/taxonomy'
import { planToSpec, setStyle } from '@/features/kit/plan'
import { composeRecipe, rankPalettes } from '@/features/recipes/engine'
import { LazyMount } from '@/components/LazyMount'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { SectionPreview } from '@/components/SectionPreview'
import { luminance } from '@/lib/color'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { DirectionId, FamilyId, KitPlan, PaletteId, SectionId, TypographyId } from '@/types/domain'
import { NeedsStudio, StepFrame, usePlanLook } from '../shared'
import { UsedOn } from './UsedOn'
import { SiteThumb, exampleOf } from '@/app/library/parts'
import { images } from '@/data/images'
import { allSites, lookChoices, siteName, siteSpec, startSite, type SiteRef } from '@/features/library/collection'
import { updateCollection, useCollection } from '@/lib/collection'

const FIRST = 8
const ALL_TYPE = Object.keys(typography) as TypographyId[]
const ALL_COLOURS = Object.keys(palettes) as PaletteId[]
const isDark = (id: PaletteId) => luminance(palettes[id].colors.background) < 0.2
// What kind of face leads each pairing (its display family), for the lettering filter.
const SERIF = new Set(['Amiri', 'Ancizar Serif', 'Bellefair', 'Besley', 'Bodoni Moda', 'Castoro Titling', 'Cormorant', 'Gilda Display', 'Gloock', 'Hedvig Letters Serif', 'Ibarra Real Nova', 'Imbue', 'Italiana', 'Kalnia', 'Labrada', 'Libre Caslon Display', 'Literata', 'Newsreader', 'Noto Serif Display', 'Petrona', 'Prata', 'Sedan', 'Shippori Mincho', 'Young Serif'])
const EXPRESSIVE = new Set(['Bagel Fat One', 'Ballet', 'Boldonse', 'Caprasimo', 'Caveat Brush', 'Grenze Gotisch', 'Monoton', 'Permanent Marker', 'Press Start 2P', 'Rubik Mono One', 'Tektur', 'Tilt Warp'])
const KINDS = ['Serif', 'Sans', 'Expressive'] as const
const ALL_LOOKS = Object.keys(directions) as DirectionId[]
const FAMILIES = Object.keys(families) as FamilyId[]
// What a new look resets to its own defaults; everything about the pages and parts stays.
const FOLLOWS_LOOK = ['palette', 'typography', 'shape', 'nav', 'footer', 'rotation'] as const
const typeKind = (id: TypographyId) => { const f = typography[id].display.family; return SERIF.has(f) ? 'Serif' : EXPRESSIVE.has(f) ? 'Expressive' : 'Sans' }

export function Brand() {
  const ready = useHydrated()
  const plan = usePlan()
  const c = useCollection()
  const { look, spec, recipe, pv } = usePlanLook(plan)
  const [tone, setTone] = useState<'all' | 'light' | 'dark'>('all')
  const [kind, setKind] = useState<'all' | (typeof KINDS)[number]>('all')
  const [nColours, setNColours] = useState(FIRST)
  const [nType, setNType] = useState(FIRST)
  const [fam, setFam] = useState<'all' | FamilyId>('all')
  const [nLooks, setNLooks] = useState(6)
  const [tab, setTab] = useState<'look' | 'colours' | 'lettering'>()
  // Each list's order is set once, when the page opens (the pick then, what fits, the rest): picking never moves a tile.
  const typeOrder = useRef<TypographyId[]>(null), colourOrder = useRef<PaletteId[]>(null), lookOrder = useRef<DirectionId[]>(null)
  if (ready && !typeOrder.current) typeOrder.current = [...new Set([look.type.id, ...look.d.typography, ...ALL_TYPE])]
  const fonts = (typeOrder.current ?? ALL_TYPE).filter((t) => kind === 'all' || typeKind(t) === kind)
  useGoogleFonts(fonts.slice(0, nType).flatMap((t) => typography[t].googleFamilies))
  if (!ready) return null
  if (plan.via !== 'studio' || !plan.pages.length) return <NeedsStudio />

  const ranked = rankPalettes(spec)
  // A real photo for the tile: the start site's own first picture, else the look's curated one.
  const start = plan.blank ? undefined : startSite(c), e = start && exampleOf(start)
  const photo = e ? (e.hero.kind === 'video' ? e.hero.poster : e.hero.src) : images[look.d.image].src
  const fits = ranked.slice(0, 6)
  colourOrder.current ??= [...new Set([spec.palette, ...fits, ...look.d.palettes, ...ALL_COLOURS])]
  const colours = colourOrder.current.filter((id) => tone === 'all' || isDark(id) === (tone === 'dark'))
  // Name and sentence live on the plan and on the Collection, so a rebuild keeps them.
  const say = (k: 'name' | 'about', v: string) => { updatePlan((p) => ({ ...p, [k]: v || undefined })); updateCollection((x) => ({ ...x, [k]: v })) }
  // The first collected site's colours and lettering are the start, and say so; anything else can be picked.
  const firstSpec = start ? siteSpec(start) : undefined, fromName = start && siteName(start)
  const tag = (made: boolean, best: boolean, theirs?: boolean) => (theirs ? `From ${fromName}` : best ? 'Fits your site' : made ? 'Made for this look' : undefined)
  // The look: your collected sites' looks lead, then those OpusKit's sites of your kind use, then the rest.
  const theirLooks = new Map(plan.blank ? [] : lookChoices(c).map((r) => [siteSpec(r)!.direction, siteName(r)] as const)) // a blank start takes nothing from the Collection
  const kindLooks = new Set(allSites.map((r) => siteSpec(r)!).filter((x) => x.purpose === plan.purpose).map((x) => x.direction))
  lookOrder.current ??= [...new Set([look.d.id, ...theirLooks.keys(), ...kindLooks, ...ALL_LOOKS])]
  // Collected a site: its look is what was chosen. Only a blank start picks from every look; several collected sites
  // that differ pick among their own looks.
  const lookChoice = plan.blank || !theirLooks.size ? 'all' : theirLooks.size > 1 ? 'theirs' : undefined // no site collected: any look
  const looks = lookChoice === 'theirs' ? [...theirLooks.keys()] : lookOrder.current.filter((id) => fam === 'all' || directions[id].families.includes(fam))
  // A look is shown as your own site drawn in it — its colours, lettering, layout and first screen — not a stock photo
  // (41 looks share 18 photos, so photos made them look alike).
  // A collected site's look comes with that site's own colours, lettering, corners, menu and footer; any other look with its defaults.
  // A look OpusKit has built a site in shows that site — its recording playing (its homepage until one is recorded).
  const builtIn = new Map<DirectionId, SiteRef>()
  for (const r of [...allSites].sort((a, b) => Number(!!exampleOf(b)?.clip) - Number(!!exampleOf(a)?.clip))) if (exampleOf(r) && !builtIn.has(siteSpec(r)!.direction)) builtIn.set(siteSpec(r)!.direction, r)
  const inLook = (id: DirectionId): KitPlan => {
    const site = lookChoices(c).map((r) => siteSpec(r)!).find((x) => x.direction === id)
    return FOLLOWS_LOOK.reduce((n, k) => setStyle(n, k, site?.[k] === 'off' ? 'off' : site?.[k]), setStyle(plan, 'direction', id))
  }
  // Four parts of your own pages (first screens and the footer aside), drawn in your picks under the example.
  const parts = recipe.pages.flatMap((pg) => pg.sections.map((x, n) => ({ key: `${pg.id}:${n}`, id: x.id as SectionId, variant: x.variant?.id, tone: x.tone, media: x.media, name: x.name.split(' — ')[0], page: pg.label })))
    .filter((x) => x.id !== 'hero').filter((x, n, a) => a.findIndex((y) => y.id === x.id) === n).slice(0, 4)
  const at = tab === 'look' && !lookChoice ? 'colours' : tab ?? (lookChoice ? 'look' : 'colours')
  const pickLook = (id: DirectionId) => {
    if (id === look.d.id) return
    const before = readPlan()
    updatePlan(() => inLook(id))
    colourOrder.current = null; typeOrder.current = null // the new look's colours and lettering lead
    toast(`Look — ${directions[id].name}`, { description: `${theirLooks.has(id) ? `${theirLooks.get(id)}’s` : 'Its'} colours, lettering, corners, menu and footer come with it. Pick others any time.`, action: { label: 'Undo', onClick: () => writePlan(before) } })
  }

  return (
    <StepFrame at="Brand" title={<h1 className="display text-[clamp(2.2rem,4vw,3.4rem)]">Brand</h1>}
      next={<Link href="/studio/pages" className="btn btn-ink btn-sm"><span>Next<span className="hidden sm:inline">: Pages</span></span><ArrowRight size={14} aria-hidden /></Link>}>
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

        {/* 2 — one list at a time: the look (only where there is a choice), colours, lettering — each tab names its pick */}
        <div className="min-w-0">
          <div role="tablist" aria-label="Brand" className="sticky top-[7.5rem] z-10 bg-paper pb-4">
            <div className={`grid gap-1 rounded-xl bg-paper-2 p-1 ${lookChoice ? 'grid-cols-3' : 'grid-cols-2'}`}>
              {([...(lookChoice ? [['look', 'Look', look.d.name]] : []), ['colours', 'Colours', palettes[spec.palette].name], ['lettering', 'Lettering', look.type.name]] as const).map(([k, name, now]) => (
                <button key={k} type="button" role="tab" aria-selected={at === k} onClick={() => setTab(k as typeof at)}
                  className={`min-w-0 rounded-lg px-3 py-2 text-left transition-colors ${at === k ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
                  <span className={`block text-sm font-medium ${at === k ? 'text-ink' : 'text-ink-2'}`}>{name}</span>
                  <span className="block truncate text-xs text-muted">{now}</span>
                </button>
              ))}
            </div>
          </div>

          {at === 'look' && (
            <List label="Look" note={lookChoice === 'theirs' ? 'Your sites come in different looks — which one is yours?' : 'Shapes your parts, corners, menu, footer and movement — and brings its colours and lettering.'}
              filters={lookChoice === 'all' && (['all', ...FAMILIES] as const).map((f) => <Chip small key={f} active={fam === f} onClick={() => { setFam(f); setNLooks(6) }}>{f === 'all' ? 'All' : families[f].name}</Chip>)}
              shown={lookChoice === 'theirs' ? looks.length : Math.min(nLooks, looks.length)} total={looks.length} onMore={() => setNLooks(Infinity)} wide>
              {looks.slice(0, lookChoice === 'theirs' ? undefined : nLooks).map((id) => (
                <Tile key={id} on={look.d.id === id} onPick={() => pickLook(id)} label={directions[id].name} sub={theirLooks.has(id) ? `From ${theirLooks.get(id)}` : kindLooks.has(id) ? 'Fits your site' : builtIn.has(id) ? `As built: ${siteName(builtIn.get(id)!)}` : undefined}>
                  <span className="pointer-events-none block" aria-hidden>
                    {builtIn.has(id)
                      ? <SiteThumb site={builtIn.get(id)!} auto />
                      : <LazyMount className="aspect-[16/10] overflow-hidden"><SitePreview {...previewFromRecipe(composeRecipe(planToSpec(look.d.id === id ? plan : inLook(id))), plan.name ? { title: plan.name, brand: plan.name } : {})} /></LazyMount>}
                  </span>
                </Tile>
              ))}
            </List>
          )}

          {at === 'colours' && (
            <List label="Colours" note={fromName && firstSpec?.palette === spec.palette ? `Your colours and lettering start as ${fromName}’s. Pick any others.` : undefined}
              filters={(['all', 'light', 'dark'] as const).map((t) => <Chip small key={t} active={tone === t} onClick={() => { setTone(t); setNColours(FIRST) }}>{t === 'all' ? 'All' : t === 'light' ? 'Light' : 'Dark'}</Chip>)}
              shown={Math.min(nColours, colours.length)} total={colours.length} onMore={() => setNColours(Infinity)}>
              {colours.slice(0, nColours).map((id) => {
                const p = palettes[id], pc = p.colors
                return (
                  <Tile key={id} on={spec.palette === id} onPick={() => updatePlan((x) => setStyle(x, 'palette', id))} label={p.name} sub={tag(look.d.palettes.includes(id), fits.includes(id), firstSpec?.palette === id)}>
                    <span className="grid h-12 grid-cols-[2fr_1fr_1fr_1fr]" aria-hidden>{[pc.background, pc.text, pc.accent, pc.surface].map((x, i) => <span key={i} style={{ background: x }} />)}</span>
                  </Tile>
                )
              })}
            </List>
          )}

          {at === 'lettering' && (
            <List label="Lettering" filters={(['all', ...KINDS] as const).map((k) => <Chip small key={k} active={kind === k} onClick={() => { setKind(k); setNType(FIRST) }}>{k === 'all' ? 'All' : k}</Chip>)}
              shown={Math.min(nType, fonts.length)} total={fonts.length} onMore={() => setNType(Infinity)}>
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
            </List>
          )}
        </div>

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

/** One tab's list: a short note and small filters on one line, the grid, and Show all. */
function List({ label, note, filters, shown, total, onMore, wide, children }: { label: string; note?: string; filters?: React.ReactNode; shown: number; total: number; onMore: () => void; wide?: boolean; children: React.ReactNode }) {
  return (
    <section aria-label={label}>
      {(note || filters) && (
        <div className="mb-3 space-y-2">
          {note && <p className="text-sm text-muted">{note}</p>}
          {filters && <div className="flex flex-wrap gap-1">{filters}</div>}
        </div>
      )}
      <div role="radiogroup" aria-label={label} className={`grid grid-cols-2 gap-2 ${wide ? 'sm:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]' : 'sm:grid-cols-[repeat(auto-fill,minmax(9rem,1fr))]'}`}>{children}</div>
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
