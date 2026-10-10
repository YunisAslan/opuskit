'use client'
// Make it yours: the look, the colours and the lettering, one list at a time under tabs that name each pick (decision
// 29). On Direction (Make it yours, decisions 36, 39), and on Brand for a recipe opened from elsewhere. What fits
// leads; a colour or lettering seen on a site the owner took from says so ("From Fennwood"), and the Library is one link
// away — taking from real sites stays the way in.
import { Check, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useGoogleFonts } from '@/components/FontLoader'
import { LazyMount } from '@/components/LazyMount'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { Chip } from '@/components/ui'
import { palettes, typography } from '@/data/ingredients'
import { directions, families, kindName } from '@/data/taxonomy'
import { lookCredit, lookImages, lookImg } from '@/data/look-images'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { planToSpec, setStyle } from '@/features/studio/plan'
import { allSites, lookChoices, siteName, siteSpec, type SiteRef, keptByName } from '@/features/library/collection'
import { siteTraits } from '@/features/library/inspire'
import { composeRecipe, rankPalettes } from '@/features/recipes/engine'
import { SiteThumb, exampleOf } from '@/app/library/parts'
import { useCollection } from '@/lib/collection'
import { readPlan, updatePlan, usePlan, writePlan } from '@/lib/plan'
import { luminance } from '@/lib/color'
import { SERIF_FAMILIES } from '@/lib/type-tokens'
import type { DirectionId, FamilyId, StudioPlan, PaletteId, TypographyId } from '@/types/domain'
import { usePlanLook } from './shared'

const FIRST = 12
const ALL_TYPE = Object.keys(typography) as TypographyId[]
const ALL_COLOURS = Object.keys(palettes) as PaletteId[]
const ALL_LOOKS = Object.keys(directions) as DirectionId[]
const FAMILIES = Object.keys(families) as FamilyId[]
const isDark = (id: PaletteId) => luminance(palettes[id].colors.background) < 0.2
// What kind of face leads each pairing (its display family), for the lettering filter.
const EXPRESSIVE = new Set(['Bagel Fat One', 'Ballet', 'Boldonse', 'Caprasimo', 'Caveat Brush', 'Grenze Gotisch', 'Monoton', 'Permanent Marker', 'Press Start 2P', 'Rubik Mono One', 'Tektur', 'Tilt Warp'])
const KINDS = ['Serif', 'Sans', 'Expressive'] as const
const typeKind = (id: TypographyId) => { const f = typography[id].display.family; return SERIF_FAMILIES.has(f) ? 'Serif' : EXPRESSIVE.has(f) ? 'Expressive' : 'Sans' }
// What a new look resets to its own defaults; everything about the pages and parts stays.
const FOLLOWS_LOOK = ['palette', 'typography', 'shape', 'nav', 'footer', 'rotation'] as const

/** `every`: every look is offered (Direction). Otherwise only where there is a choice to make (Brand, decision 28). */
export function LookPicker({ every }: { every?: boolean }) {
  const plan = usePlan()
  const c = useCollection()
  const { look, spec } = usePlanLook(plan)
  const [tone, setTone] = useState<'all' | 'light' | 'dark'>('all')
  const [kind, setKind] = useState<'all' | (typeof KINDS)[number]>('all')
  const [nColours, setNColours] = useState(FIRST)
  const [nType, setNType] = useState(FIRST)
  const [fam, setFam] = useState<'all' | FamilyId>('all')
  const [nLooks, setNLooks] = useState(6)
  const [tab, setTab] = useState<'look' | 'colours' | 'lettering'>()
  const [showLook, setShowLook] = useState<DirectionId>()
  // Each list's order is set once (the pick then, what fits, the rest): picking never moves a tile.
  const typeOrder = useRef<TypographyId[]>(null), colourOrder = useRef<PaletteId[]>(null), lookOrder = useRef<DirectionId[]>(null)
  typeOrder.current ??= [...new Set([look.type.id, ...look.d.typography, ...ALL_TYPE])]
  const fonts = typeOrder.current.filter((t) => kind === 'all' || typeKind(t) === kind)
  useGoogleFonts(fonts.slice(0, nType).flatMap((t) => typography[t].googleFamilies))

  const fits = rankPalettes(spec).slice(0, 6)
  colourOrder.current ??= [...new Set([spec.palette, ...fits, ...look.d.palettes, ...ALL_COLOURS])]
  const colours = colourOrder.current.filter((id) => tone === 'all' || isDark(id) === (tone === 'dark'))
  // Where a colour, lettering or look was seen: the sites the owner took from.
  const taken = [...new Set(c.items.flatMap((i) => (i.kind === 'site' || i.kind === 'like' ? [i.site] : [])))]
  const seenOn = (k: 'palette' | 'typography' | 'direction', id: string) => { const r = taken.find((s) => siteTraits(s)?.[k] === id); return r && `From ${siteName(r)}` }
  const tag = (k: 'palette' | 'typography', id: string, made: boolean, best: boolean) => seenOn(k, id) ?? (best ? 'Fits your site' : made ? 'Made for this look' : undefined)

  // The look: the owner's taken sites' looks lead, then those OpusKit's sites of their kind use, then the rest.
  const theirLooks = new Map(plan.blank ? [] : lookChoices(c).map((r) => [siteSpec(r)!.direction, siteName(r)] as const))
  const kindLooks = new Set(allSites.map((r) => siteSpec(r)!).filter((x) => x.purpose === plan.purpose).map((x) => x.direction))
  lookOrder.current ??= [...new Set([look.d.id, ...theirLooks.keys(), ...kindLooks, ...ALL_LOOKS])]
  const lookChoice = every || plan.blank || !theirLooks.size ? 'all' : theirLooks.size > 1 ? 'theirs' : undefined
  const looks = lookChoice === 'theirs' ? [...theirLooks.keys()] : lookOrder.current.filter((id) => fam === 'all' || directions[id].families.includes(fam))
  // A look OpusKit has built a site in shows that site playing; any other is drawn as the owner's site in it.
  const builtIn = new Map<DirectionId, SiteRef>()
  for (const r of [...allSites].sort((a, b) => Number(!!exampleOf(b)?.clip) - Number(!!exampleOf(a)?.clip))) if (exampleOf(r) && !builtIn.has(siteSpec(r)!.direction)) builtIn.set(siteSpec(r)!.direction, r)
  const inLook = (id: DirectionId): StudioPlan => {
    const site = lookChoices(c).map((r) => siteSpec(r)!).find((x) => x.direction === id)
    // Colours or lettering taken by name stay with any look (decision 39); the rest follows the new look.
    const named = keptByName(c.items)
    return FOLLOWS_LOOK.filter((k) => !named.has(k)).reduce((n, k) => setStyle(n, k, site?.[k] === 'off' ? 'off' : site?.[k]), setStyle(plan, 'direction', id))
  }
  const at = tab === 'look' && !lookChoice ? 'colours' : tab ?? (lookChoice ? 'look' : 'colours')
  const pickLook = (id: DirectionId) => {
    if (id === look.d.id) return
    const before = readPlan()
    updatePlan(() => inLook(id))
    colourOrder.current = null; typeOrder.current = null // the new look's colours and lettering lead
    toast(`Look — ${directions[id].name}`, { description: 'Its colours, lettering, corners, menu and footer come with it. Pick others any time.', action: { label: 'Undo', onClick: () => writePlan(before) } })
  }

  return (
    <div className="min-w-0">
      <div role="tablist" aria-label="Make it yours" className="pb-4">
        <div className={`grid gap-1 rounded-[3px] bg-paper-2 p-1 ${lookChoice ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {([...(lookChoice ? [['look', 'Look', look.d.name]] : []), ['colours', 'Colours', palettes[spec.palette].name], ['lettering', 'Lettering', look.type.name]] as const).map(([k, name, now]) => (
            <button key={k} type="button" role="tab" aria-selected={at === k} onClick={() => setTab(k as typeof at)}
              className={`min-w-0 rounded-[3px] px-3 py-2 text-left transition-colors ${at === k ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
              <span className={`block text-sm font-medium ${at === k ? 'text-ink' : 'text-ink-2'}`}>{name}</span>
              <span className="block truncate text-xs text-muted">{now}</span>
            </button>
          ))}
        </div>
      </div>

      {at === 'look' && (
        <List label="Look" note={lookChoice === 'theirs' ? 'Your sites come in different looks — which one is yours?' : undefined}
          filters={lookChoice === 'all' && (['all', ...FAMILIES] as const).map((f) => <Chip small key={f} active={fam === f} onClick={() => { setFam(f); setNLooks(6) }}>{f === 'all' ? 'All' : families[f].name}</Chip>)}
          shown={lookChoice === 'theirs' ? looks.length : Math.min(nLooks, looks.length)} total={looks.length} onMore={() => setNLooks(Infinity)} wide>
          {looks.slice(0, lookChoice === 'theirs' ? undefined : nLooks).map((id) => (
            <div key={id} className="relative" data-look-tile title={lookCredit(id)}>
            <Tile on={look.d.id === id} onPick={() => pickLook(id)} label={directions[id].name} sub={seenOn('direction', id) ?? (kindLooks.has(id) ? 'Fits your site' : builtIn.has(id) ? `As built: ${siteName(builtIn.get(id)!)}` : undefined)}>
              <span className="pointer-events-none block" aria-hidden>
                {/* A mood photo anyone reads as the style; without one, a site built in it, else the owner's site in it. */}
                {lookImg(id)
                  ? <LookPicture id={id} clip={builtIn.has(id) ? exampleOf(builtIn.get(id)!)?.clip : undefined} />
                  : builtIn.has(id)
                  ? <SiteThumb site={builtIn.get(id)!} auto />
                  : <LazyMount className="aspect-[16/10] overflow-hidden"><SitePreview {...previewFromRecipe(composeRecipe(planToSpec(look.d.id === id ? plan : inLook(id))), plan.name ? { title: plan.name, brand: plan.name } : {})} /></LazyMount>}
              </span>
            </Tile>
            {!!sitesIn(id).length && (
              <button type="button" onClick={() => setShowLook(id)} aria-label={`Sites built in ${directions[id].name}`} title="Sites built in this look"
                className="absolute right-1.5 top-1.5 flex h-7 items-center gap-1 rounded-[3px] bg-paper/90 px-2 text-xs text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-paper">
                <LayoutGrid size={13} aria-hidden /><span className="tabular-nums">{sitesIn(id).length}</span>
              </button>
            )}
            </div>
          ))}
        </List>
      )}
      <LookSites id={showLook} onClose={() => setShowLook(undefined)} onUse={(id) => { pickLook(id); setShowLook(undefined) }} using={look.d.id} />

      {at === 'colours' && (
        <List label="Colours" filters={(['all', 'light', 'dark'] as const).map((t) => <Chip small key={t} active={tone === t} onClick={() => { setTone(t); setNColours(FIRST) }}>{t === 'all' ? 'All' : t === 'light' ? 'Light' : 'Dark'}</Chip>)}
          shown={Math.min(nColours, colours.length)} total={colours.length} onMore={() => setNColours(Infinity)}>
          {colours.slice(0, nColours).map((id) => {
            const pc = palettes[id].colors
            return (
              <Tile key={id} on={spec.palette === id} onPick={() => updatePlan((x) => setStyle(x, 'palette', id))} label={palettes[id].name} sub={tag('palette', id, look.d.palettes.includes(id), fits.includes(id))}>
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
              <Tile key={id} on={look.type.id === id} onPick={() => updatePlan((x) => setStyle(x, 'typography', id))} label={t.name} sub={tag('typography', id, look.d.typography.includes(id), id === look.d.defaults.typography)}>
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
      {shown < total && <button type="button" onClick={onMore} className="mt-3 w-full rounded-[3px] border border-dashed border-line py-2.5 text-sm text-ink-2 hover:border-ink hover:text-ink">Show all {total}</button>}
    </section>
  )
}

/** A look's tile picture: its photo; on hover, the clip of a site built in that look plays over it (decision 41). */
function LookPicture({ id, clip }: { id: DirectionId; clip?: string }) {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  // The picture takes no pointer (the tile's button does): hover is read from the whole tile, keyboard focus too.
  useEffect(() => {
    const v = video.current, tile = v?.closest('[data-look-tile]')
    if (!v || !tile) return
    const play = () => { if (!matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {}) }
    const stop = () => { v.pause(); setPlaying(false) }
    const on: [string, () => void][] = [['mouseenter', play], ['mouseleave', stop], ['focusin', play], ['focusout', stop]]
    on.forEach(([e, f]) => tile.addEventListener(e, f))
    return () => on.forEach(([e, f]) => tile.removeEventListener(e, f))
  }, [clip])
  return (
    <span className="relative block aspect-[16/10] overflow-hidden bg-paper-2">
      <Image src={lookImg(id)!} alt="" fill sizes="(min-width: 1024px) 16rem, 50vw" className="object-cover" />
      {clip && <video ref={video} src={clip} muted loop playsInline preload="none" aria-hidden onPlaying={() => setPlaying(true)}
        className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`} />}
    </span>
  )
}

/** Every site OpusKit has built or planned in a look, the built ones first. */
const sitesIn = (id: DirectionId) => allSites.filter((r) => siteSpec(r)?.direction === id).sort((a, b) => Number(!!exampleOf(b)) - Number(!!exampleOf(a)))

/** A look, large: the sites made in it, playing — what it can become, never the owner's site. Use this look picks it. */
function LookSites({ id, onClose, onUse, using }: { id?: DirectionId; onClose: () => void; onUse: (id: DirectionId) => void; using: DirectionId }) {
  const d = id && directions[id]
  return (
    <Dialog open={!!id} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="max-h-[88vh] overflow-y-auto rounded-[4px] p-0 sm:max-w-5xl">
        {d && <>
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line px-6 py-5 pr-14">
            <div>
              <p className="label text-muted">Look · {sitesIn(d.id).length} {sitesIn(d.id).length === 1 ? 'site' : 'sites'} made in it</p>
              <DialogTitle className="display mt-1 text-[clamp(1.6rem,2.6vw,2.2rem)]">{d.name}</DialogTitle>
              <DialogDescription className="mt-1 text-sm text-ink-2">{d.line}. Your site takes the look, not these sites.</DialogDescription>
            </div>
            <button type="button" onClick={() => onUse(d.id)} disabled={using === d.id} className="btn btn-ink btn-sm disabled:opacity-50">{using === d.id ? <><Check size={14} aria-hidden />Your look</> : 'Use this look'}</button>
          </div>
          <ul className="grid gap-5 p-6 sm:grid-cols-2">
            {sitesIn(d.id).map((r) => (
              <li key={r}>
                <Link href={`/library/sites/${r.replace(':', '/')}`} className="group block">
                  <span className="block overflow-hidden border border-line"><SiteThumb site={r} auto /></span>
                  <span className="mt-2 flex items-baseline justify-between gap-3">
                    <span className="ulink font-medium">{siteName(r)}</span>
                    <span className="text-xs text-muted">{kindName(siteSpec(r)!.purpose)}{exampleOf(r) ? '' : ' · planned'}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {lookImages[d.id] && <p className="border-t border-line px-6 py-3 text-xs text-muted"><a href={lookImages[d.id]!.page} target="_blank" rel="noreferrer" className="link">{lookCredit(d.id)}</a></p>}
        </>}
      </DialogContent>
    </Dialog>
  )
}

function Tile({ on, onPick, label, sub, children }: { on: boolean; onPick: () => void; label: string; sub?: string; children: React.ReactNode }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onPick} className={`block h-full w-full overflow-hidden rounded-[3px] border bg-white text-left ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
      {children}
      <span className="flex items-start justify-between gap-2 border-t border-line px-2.5 py-1.5">
        <span className="min-w-0"><span className="block truncate text-[13px] font-medium">{label}</span>{sub && <span className="block truncate text-[11px] text-pencil">{sub}</span>}</span>
        {on && <Check size={14} className="mt-0.5 shrink-0 text-pencil" aria-hidden />}
      </span>
    </button>
  )
}
