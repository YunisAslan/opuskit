'use client'
// Step 1 — Style, as a configurator: pick a category on the left, see only its options in the middle, and the site
// on the right. The preview changes only when an option is picked, never on hover. No long scroll.
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { OptionDemo } from '@/components/OptionDemo'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { SectionPreview } from '@/components/SectionPreview'
import { SitePreview, previewFromDirection, previewFromRecipe } from '@/components/SitePreview'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { accentSets, palettes, typography } from '@/data/ingredients'
import { footerStyles, heroes, navStyles, shapeStyles } from '@/data/patterns'
import { behaviours, pieces } from '@/data/pieces'
import { directions, families, goals, motionLevels, purposes } from '@/data/taxonomy'
import { behaviourPick, planToSpec, setBehaviour, setStyle, starters, usualPages, type StyleKey } from '@/features/kit/plan'
import { composeRecipe, recommendedNav, recommendedShape } from '@/features/recipes/engine'
import { toast } from 'sonner'
import { updatePlan } from '@/lib/kit'
import type { BehaviourId, DirectionId, FamilyId, GoalId, KitPlan, MotionLevel, PieceId, PurposeId } from '@/types/domain'
import { heroName } from './HeroPreview'
import { lookOf } from './ProductVisual'

// Biggest decisions first: the look, then movement, then the details. The first screen is part of the page — it is chosen in Pages.
const CATS = ['look', 'motion', 'colours', 'lettering', 'shape', 'menu', 'behaviour'] as const
type Cat = (typeof CATS)[number]

function Tile({ on, label, sub, children, onPick }: { on: boolean; label: string; sub?: string; children?: ReactNode; onPick: () => void }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onPick}
      className={`group relative overflow-hidden rounded-md border bg-white text-left transition-[border-color,box-shadow] duration-150 ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
      {children}
      <span className="flex items-center justify-between gap-1 px-2.5 py-2"><span className="truncate text-[13px] font-medium">{label}</span>{on && <Check size={14} className="shrink-0 text-pencil" aria-hidden />}</span>
      {sub && <span className="-mt-1.5 block truncate px-2.5 pb-2 text-[11px] text-muted">{sub}</span>}
    </button>
  )
}

export function StyleStep({ plan, initialCat, initialFeel, onDone }: { plan: KitPlan; initialCat?: string | null; initialFeel?: string | null; onDone: () => void }) {
  const [cat, setCat] = useState<Cat>(() => (CATS.includes(initialCat as Cat) ? initialCat as Cat : 'look'))
  const [family, setFamily] = useState<FamilyId | 'all'>(() => (initialFeel && initialFeel in families ? initialFeel as FamilyId : 'all'))
  const scroller = useRef<HTMLDivElement>(null)

  const look = lookOf(plan)
  const recipe = composeRecipe(planToSpec(plan))
  const set = (k: StyleKey, v: string | undefined) => updatePlan((p) => setStyle(p, k, v))
  // A new look keeps what you picked; say so, with a one-tap way to take the look's own instead.
  const OWN: [StyleKey, string][] = [['palette', 'colours'], ['typography', 'lettering'], ['shape', 'shape'], ['nav', 'menu'], ['footer', 'footer'], ['motion', 'movement'], ['rotation', 'colour chapters']]
  // A new kind of site keeps your pages; its usual pages are one tap away.
  const pickPurpose = (id: PurposeId) => {
    updatePlan((p) => ({ ...p, purpose: id }))
    toast(`Now a ${purposes[id].name.toLowerCase()} site — your pages stay as they are`, { action: { label: `Use its usual pages`, onClick: () => updatePlan((p) => usualPages(p, id)) } })
  }
  const pickLook = (id: DirectionId) => {
    if (id === d.id) return
    const kept = OWN.filter(([k]) => plan[k as keyof KitPlan] !== undefined)
    set('direction', id)
    if (kept.length) toast(`${directions[id].name} — kept your ${kept.map(([, n]) => n).join(', ')}`, {
      action: { label: `Use ${directions[id].name}’s own`, onClick: () => updatePlan((p) => kept.reduce((x, [k]) => setStyle(x, k, undefined), p)) },
    })
  }
  const demo = { colors: look.colors, type: look.type, shape: look.shape }
  const d = look.d
  const shapeDefault = recommendedShape({ direction: d.id })
  const navDefault = recommendedNav({ purpose: recipe.metadata.spec.purpose, direction: d.id })
  const grid = 'grid gap-2 grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))]'
  const pal = palettes[plan.palette ?? d.defaults.palette]

  // Left rail: every category with what it is set to now, so the whole style reads at a glance.
  const cats: { id: Cat; name: string; value: string; mini?: ReactNode }[] = [
    { id: 'look', name: 'Look', value: d.name },
    { id: 'motion', name: 'Movement', value: motionLevels[recipe.metadata.spec.motion].name },
    { id: 'colours', name: 'Colours', value: pal.name, mini: <span className="flex">{[pal.colors.background, pal.colors.text, pal.colors.accent].map((c, i) => <span key={i} className="size-3 rounded-full ring-1 ring-black/10 first:ml-0 -ml-1" style={{ background: c }} />)}</span> },
    { id: 'lettering', name: 'Lettering', value: look.type.name, mini: <span className="text-base leading-none" style={{ fontFamily: `'${look.type.display.family}'`, fontWeight: look.type.display.weight }}>Aa</span> },
    { id: 'shape', name: 'Shape', value: look.shape.name },
    { id: 'menu', name: 'Menu & footer', value: `${navStyles[plan.nav ?? navDefault].name} · ${recipe.chrome.footerStyle.name}` },
    { id: 'behaviour', name: 'Behaviour', value: String((plan.sitePieces ?? []).filter((id) => behaviours.headlines.ids.concat(behaviours.links.ids, behaviours.buttons.ids, behaviours.site.ids).includes(id)).length || 'Plain') },
  ]
  const next = cats[cats.findIndex((c) => c.id === cat) + 1], prev = cats[cats.findIndex((c) => c.id === cat) - 1]
  const why: Record<Cat, string> = {
    look: 'A complete style — colours, lettering and layout tested together. Start here; the rest follows it.',
    colours: `Swap the palette of ${d.name}. The first ones are made for it.`,
    lettering: 'The typefaces for headlines, text and labels.',
    shape: 'Corners and edges of buttons, cards and photos.',
    menu: 'How visitors get around, and how every page ends. The same menu and footer on every page — in Pages you can leave either out of one page.',
    motion: 'How lively the site feels as people scroll. Moments you add in Pages can raise it.',
    behaviour: 'How the site acts, the same on every page: how headings arrive, what links and the main button do, and a few whole-site extras. Effects for one part of one page — a counting number, a photo ring — are added on that part, in Pages.',
  }
  const reset: Partial<Record<Cat, StyleKey[]>> = { colours: ['palette'], lettering: ['typography'], shape: ['shape'], menu: ['nav', 'footer'], motion: ['motion'] }
  const motions = (Object.keys(motionLevels) as MotionLevel[]).filter((m) => !plan.hero || heroes[plan.hero].motion.includes(m))
  const picked = (ks?: StyleKey[]) => !!ks?.some((k) => plan[k as keyof KitPlan] !== undefined)

  return (
    <Tabs value={cat} onValueChange={(v) => { setCat(v as Cat); scroller.current?.scrollTo({ top: 0 }) }} orientation="vertical" className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)_26rem] lg:items-start">
      <div className="min-w-0 space-y-4 lg:sticky lg:top-40">
      <div className="space-y-2 rounded-md border border-line bg-white p-3">
        <p className="text-xs text-muted">Your site</p>
        <Input value={plan.name ?? ''} maxLength={60} placeholder="Site name" aria-label="Site name" onChange={(e) => updatePlan((p) => ({ ...p, name: e.target.value }))} className="h-9 font-medium" />
        <Textarea value={plan.about ?? ''} maxLength={160} rows={3} placeholder="What is it? e.g. A twelve-seat wood-fire counter in Baku." aria-label="What the site is about"
          onChange={(e) => updatePlan((p) => ({ ...p, about: e.target.value }))} className="min-h-20 text-sm" />
        <p className="text-right text-[11px] tabular-nums text-muted">{(plan.about ?? '').length}/160</p>
        <Select value={plan.purpose ?? ''} onValueChange={(v) => pickPurpose(v as PurposeId)}>
          <SelectTrigger className="h-9 w-full text-sm" aria-label="Kind of site"><SelectValue placeholder="Kind of site…" /></SelectTrigger>
          <SelectContent className="max-h-80">{starters.map((x) => <SelectItem key={x.id} value={x.id}>{purposes[x.id].name}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={plan.goal ?? ''} onValueChange={(v) => updatePlan((p) => ({ ...p, goal: v as GoalId }))}>
          <SelectTrigger className="h-9 w-full text-sm" aria-label="What visitors should do"><SelectValue placeholder="Visitors should…" /></SelectTrigger>
          <SelectContent>{Object.values(goals).map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <TabsList aria-label="Style" className="flex h-auto w-full flex-row gap-1 overflow-x-auto rounded-none bg-transparent p-0 lg:flex-col lg:overflow-visible">
        {cats.map((c) => (
          <TabsTrigger key={c.id} value={c.id}
            className="h-auto shrink-0 flex-none justify-between gap-3 rounded-md border border-transparent px-3 py-1.5 text-left after:hidden data-active:border-line data-active:bg-white data-active:shadow-sm lg:w-full">
            <span className="text-xs font-normal text-muted">{c.name}</span>
            <span className="ml-auto flex min-w-0 items-center gap-1.5"><span className="truncate text-sm text-ink">{c.value}</span>{c.mini}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      </div>

      <div className="flex min-w-0 flex-col rounded-lg border border-line bg-white/50 lg:sticky lg:top-40 lg:h-[calc(100svh-11.5rem)]">
        {/* Fixed: what this category is, its reset and its filters. Only the options below scroll. */}
        <div className="shrink-0 space-y-3 border-b border-line p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="max-w-xl text-sm text-ink-2">{why[cat]}</p>
            {picked(reset[cat]) && <button type="button" className="text-xs link inline-flex items-center gap-1" onClick={() => updatePlan((p) => reset[cat]!.reduce((x, k) => setStyle(x, k, undefined), p))}><RotateCcw size={12} aria-hidden />Use the look’s default</button>}
          </div>
          {cat === 'look' && (
            <div role="group" aria-label="Filter by feeling" className="flex flex-wrap gap-1.5">
              {(['all', ...Object.keys(families)] as (FamilyId | 'all')[]).map((f) => (
                <button key={f} type="button" aria-pressed={family === f} onClick={() => { setFamily(f); scroller.current?.scrollTo({ top: 0 }) }}
                  className={`rounded-full border px-3 py-1 text-xs ${family === f ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`}>{f === 'all' ? 'All' : families[f].name}</button>
              ))}
            </div>
          )}
        </div>
        <div ref={scroller} className="min-h-0 flex-1 p-4 [scrollbar-color:var(--color-line)_transparent] [scrollbar-width:thin] lg:overflow-y-auto">

        <TabsContent value="look">
          <div role="radiogroup" aria-label="Look" className={grid}>
            {(family === 'all' ? [...new Set(Object.values(families).flatMap((f) => f.directions))] : families[family].directions).map((id: DirectionId) => (
              <Tile key={id} on={d.id === id} onPick={() => pickLook(id)} label={directions[id].name} sub={directions[id].line}>
                <LazyMount className="aspect-[16/10] overflow-hidden"><SitePreview {...previewFromDirection(id, { title: plan.name || directions[id].name })} /></LazyMount>
              </Tile>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="colours">
          <div role="radiogroup" aria-label="Colours" className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(7.5rem,1fr))]">
            {[...d.palettes, ...Object.keys(palettes).filter((x) => !d.palettes.includes(x as never))].map((id) => {
              const c = palettes[id as keyof typeof palettes]
              return (
                <Tile key={id} on={pal.id === id} onPick={() => set('palette', id)} label={c.name} sub={d.palettes.includes(id as never) ? 'Made for this look' : undefined}>
                  <span className="grid h-9 grid-cols-[2fr_1fr_1fr_1fr]" aria-hidden>{[c.colors.background, c.colors.text, c.colors.accent, c.colors.surface].map((x, i) => <span key={i} style={{ background: x }} />)}</span>
                </Tile>
              )
            })}
          </div>
          <div className="mt-8 border-t border-line pt-5">
            <p className="text-sm font-medium">Colour chapters <span className="font-normal text-muted">(optional)</span></p>
            <p className="mb-3 mt-0.5 max-w-xl text-xs text-muted">Three extra accents that take turns section by section — each chapter owns one as a full colour field. Playful, poster-like sites use it; most don’t need it.</p>
            <div role="radiogroup" aria-label="Colour chapters" className={grid}>
              <Tile on={!look.rotId} onPick={() => set('rotation', 'off')} label="Off" sub="One accent only"><span className="grid h-12 place-items-center text-xs text-muted">—</span></Tile>
              {Object.values(accentSets).map((x) => (
                <Tile key={x.id} on={look.rotId === x.id} onPick={() => set('rotation', x.id)} label={x.name} sub={x.id === d.rotation ? 'Look default' : x.line}>
                  <span className="grid h-12 grid-cols-3" aria-hidden>{x.colors.map((c, i) => <span key={i} style={{ background: c }} />)}</span>
                </Tile>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lettering">
          <div role="radiogroup" aria-label="Lettering" className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
            {[...d.typography, ...Object.keys(typography).filter((x) => !d.typography.includes(x as never))].map((id) => {
              const t = typography[id as keyof typeof typography]
              return (
                <Tile key={id} on={look.type.id === id} onPick={() => set('typography', id)} label={t.name} sub={t.line}>
                  <span className="block truncate px-2.5 pt-3 text-3xl leading-none" style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontStretch: t.display.stretch }} aria-hidden>Aa {t.display.family}</span>
                </Tile>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="shape">
          <div role="radiogroup" aria-label="Shape" className={grid}>{Object.values(shapeStyles).map((x) => <Tile key={x.id} on={look.shape.id === x.id} onPick={() => set('shape', x.id)} label={x.name} sub={x.id === shapeDefault ? 'Look default' : x.line}><OptionDemo id={`shape:${x.id}`} {...demo} shape={x} /></Tile>)}</div>
        </TabsContent>

        <TabsContent value="menu">
          <p className="mb-2 text-sm font-medium">Menu <span className="font-normal text-muted">· the top of every page</span></p>
          <div role="radiogroup" aria-label="Menu" className={grid}>{Object.values(navStyles).map((x) => <Tile key={x.id} on={(plan.nav ?? navDefault) === x.id} onPick={() => set('nav', x.id)} label={x.name} sub={x.id === navDefault ? 'Fits your site' : x.trending ? 'Trending' : undefined}><OptionDemo id={`nav:${x.id}`} {...demo} /></Tile>)}</div>
          <p className="mb-2 mt-8 text-sm font-medium">Footer <span className="font-normal text-muted">· the end of every page</span></p>
          <div role="radiogroup" aria-label="Footer" className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">{Object.values(footerStyles).map((x) => <Tile key={x.id} on={recipe.chrome.footerStyle.id === x.id} onPick={() => set('footer', x.id)} label={x.name} sub={x.line}>
            <LazyMount className="pointer-events-none min-h-16 overflow-hidden"><SectionPreview id="footer" footer={x.id} auto colors={look.colors} type={look.type} shape={look.shape} brand={plan.name || undefined} /></LazyMount></Tile>)}</div>
        </TabsContent>

        <TabsContent value="motion">
          <div role="radiogroup" aria-label="Movement" className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
            {motions.map((m) => (
              <Tile key={m} on={recipe.metadata.spec.motion === m} onPick={() => set('motion', m)} label={motionLevels[m].name} sub={m === d.defaults.motion ? 'Look default' : motionLevels[m].line}>
                <LazyMount className="aspect-[16/10] overflow-hidden"><SitePreview {...previewFromRecipe(composeRecipe(planToSpec(setStyle(plan, 'motion', m))), plan.name ? { title: plan.name, brand: plan.name } : {})} /></LazyMount>
              </Tile>
            ))}
          </div>
          {plan.hero && motions.length < 4 && <p className="mt-3 text-xs text-muted">{heroName(plan.hero)} (your first screen) works at these levels only — change the first screen in Pages for others.</p>}
        </TabsContent>

        <TabsContent value="behaviour">
          <div className="space-y-7">
            {(Object.keys(behaviours) as BehaviourId[]).map((b) => {
              const g = behaviours[b], pick = behaviourPick(plan, b)
              const card = (id: PieceId | undefined) => {
                const on = id ? (plan.sitePieces ?? []).includes(id) : !pick
                const choose = () => updatePlan((p) => (g.many ? ({ ...p, sitePieces: on ? (p.sitePieces ?? []).filter((x) => x !== id) : [...(p.sitePieces ?? []), id!] }) : setBehaviour(p, b, id)))
                return (
                  // The demo is a sibling of the button (demos contain their own buttons); the button stretches over the card.
                  <div key={id ?? 'none'} className={`relative overflow-hidden rounded-md border bg-white ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'}`}>
                    {id ? <LazyMount className="pointer-events-none aspect-video"><ScaledFrame width={420} className="aspect-video"><PieceDemo id={id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame></LazyMount>
                      : <span className="grid aspect-video place-items-center text-xs text-muted">Plain — no effect</span>}
                    <button type="button" role={g.many ? 'checkbox' : 'radio'} aria-checked={on} onClick={choose}
                      className="flex w-full items-start justify-between gap-2 border-t border-line px-2.5 py-2 text-left after:absolute after:inset-0">
                      <span className="min-w-0"><span className="block text-[13px] font-medium">{id ? pieces[id].name : 'None'}</span><span className="block truncate text-[11px] text-muted">{id ? pieces[id].line : g.none}</span></span>
                      {on && <Check size={14} className="mt-0.5 shrink-0 text-pencil" aria-hidden />}
                    </button>
                  </div>
                )
              }
              return (
                <section key={b} aria-label={g.name}>
                  <p className="text-sm font-medium">{g.name} <span className="font-normal text-muted">— {g.line}</span></p>
                  <div role={g.many ? 'group' : 'radiogroup'} aria-label={g.name} className="mt-2 grid gap-2 grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
                    {!g.many && card(undefined)}
                    {g.ids.map((id) => card(id))}
                  </div>
                </section>
              )
            })}
          </div>
        </TabsContent>

        </div>
        <div className="sticky bottom-0 flex items-center justify-end gap-3 rounded-b-lg border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-sm">
          <span className="flex items-center gap-2">
          {prev && <button type="button" aria-label={`Back to ${prev.name}`} className="btn btn-line btn-sm inline-flex items-center" onClick={() => { setCat(prev.id); scroller.current?.scrollTo({ top: 0 }) }}><ArrowLeft size={14} aria-hidden /></button>}
          {next
            ? <button type="button" className="btn btn-line btn-sm inline-flex items-center gap-1.5" onClick={() => { setCat(next.id); scroller.current?.scrollTo({ top: 0 }) }}>Next<ArrowRight size={14} aria-hidden /></button>
            : <button type="button" className="btn btn-ink btn-sm inline-flex items-center gap-1.5" onClick={onDone}>Next<ArrowRight size={14} aria-hidden /></button>}
          </span>
        </div>
      </div>

      <aside className="lg:sticky lg:top-40" aria-label="Live preview">
        <p className="mb-2 flex items-baseline justify-between text-sm"><span className="font-medium">Your site</span></p>
        <SitePreview {...previewFromRecipe(recipe, plan.name ? { title: plan.name, brand: plan.name } : {})} className="rounded-lg border border-line" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <OptionDemo id={`shape:${look.shape.id}`} colors={look.colors} type={look.type} shape={look.shape} className="rounded-md border border-line" />
          <OptionDemo id={`nav:${recipe.chrome.nav.id}`} colors={look.colors} type={look.type} shape={look.shape} className="rounded-md border border-line" />
        </div>
        <p className="mt-3 text-xs text-muted">Everything here applies to every page. Pages and their sections come next.</p>
      </aside>
    </Tabs>
  )
}
