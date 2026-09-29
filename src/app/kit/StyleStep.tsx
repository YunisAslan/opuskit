'use client'
// Step 1 — Style: the choices that are the same on every page. Compact tiles; the live preview on the right shows the result.
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { LazyMount } from '@/components/LazyMount'
import { OptionDemo } from '@/components/OptionDemo'
import { SitePreview, previewFromDirection, previewFromRecipe } from '@/components/SitePreview'
import { accentSets, palettes, typography } from '@/data/ingredients'
import { pieces } from '@/data/pieces'
import { PieceDemo } from '@/components/PieceDemo'
import { ScaledFrame } from '@/components/ScaledFrame'
import { imagePresentations, navStyles, shapeStyles } from '@/data/patterns'
import { directions, families } from '@/data/taxonomy'
import { planToSpec, setStyle, sitePieceIds, toggleSitePiece, type StyleKey } from '@/features/kit/plan'
import { composeRecipe, recommendedNav, recommendedShape } from '@/features/recipes/engine'
import { updatePlan } from '@/lib/kit'
import type { DirectionId, FamilyId, KitPlan } from '@/types/domain'
import { lookOf } from './ProductVisual'

function Tile({ on, onClick, label, sub, children, wide = false }: { on: boolean; onClick: () => void; label: string; sub?: string; children?: ReactNode; wide?: boolean }) {
  return (
    <button type="button" role="radio" aria-checked={on} onClick={onClick}
      className={`group relative overflow-hidden rounded-md border bg-white text-left transition-colors ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line hover:border-ink'} ${wide ? '' : ''}`}>
      {children}
      <span className="flex items-center justify-between gap-1 px-2.5 py-2"><span className="truncate text-[13px] font-medium">{label}</span>{on && <Check size={14} className="shrink-0 text-pencil" aria-hidden />}</span>
      {sub && <span className="-mt-1.5 block truncate px-2.5 pb-2 text-[11px] text-muted">{sub}</span>}
    </button>
  )
}

function Group({ title, why, picked, onReset, children }: { title: string; why: string; picked?: boolean; onReset?: () => void; children: ReactNode }) {
  return (
    <section className="border-t border-line py-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-medium">{title}</h2>
        {picked && onReset && <button type="button" className="text-xs link" onClick={onReset}>Use the look’s default</button>}
      </div>
      <p className="mt-0.5 text-sm text-muted">{why}</p>
      <div role="radiogroup" aria-label={title} className="mt-4">{children}</div>
    </section>
  )
}

export function StyleStep({ plan }: { plan: KitPlan }) {
  const look = lookOf(plan)
  const recipe = composeRecipe(planToSpec(plan))
  const set = (k: StyleKey, v: string | undefined) => updatePlan((p) => setStyle(p, k, v))
  const demo = { colors: look.colors, type: look.type, shape: look.shape }
  const d = look.d
  const shapeDefault = recommendedShape({ direction: d.id })
  const navDefault = recommendedNav({ purpose: recipe.metadata.spec.purpose, direction: d.id })
  const grid = 'grid gap-2 grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))]'

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div>
        <p className="mb-8 max-w-2xl rounded-md bg-pencil-soft px-4 py-3 text-sm text-ink">
          <span className="font-medium">Step 1 — Style.</span> Everything here is the same on every page of your site. Pick a look first; the rest starts from it and can be swapped one by one.
        </p>

        <Group title="Look" why="A complete style — colours, lettering and layout tested together.">
          {(Object.keys(families) as FamilyId[]).map((f) => (
            <div key={f} className="mb-5">
              <p className="mb-2 text-xs text-muted">{families[f].name}</p>
              <div className={grid}>
                {families[f].directions.map((id: DirectionId) => (
                  <Tile key={id} on={d.id === id} onClick={() => set('direction', id)} label={directions[id].name}>
                    <LazyMount className="aspect-[16/10] overflow-hidden"><SitePreview {...previewFromDirection(id, { title: plan.name || directions[id].name })} /></LazyMount>
                  </Tile>
                ))}
              </div>
            </div>
          ))}
        </Group>

        <Group title="Colours" why={`Swap the palette of ${d.name}. The first ones are made for it.`} picked={!!plan.palette} onReset={() => set('palette', undefined)}>
          <div className={grid}>
            {[...d.palettes, ...Object.keys(palettes).filter((x) => !d.palettes.includes(x as never))].map((id) => {
              const c = palettes[id as keyof typeof palettes]
              return (
                <Tile key={id} on={(plan.palette ?? d.defaults.palette) === id} onClick={() => set('palette', id)} label={c.name} sub={d.palettes.includes(id as never) ? 'Made for this look' : undefined}>
                  <span className="grid h-14 grid-cols-[2fr_1fr_1fr_1fr]" aria-hidden>{[c.colors.background, c.colors.text, c.colors.accent, c.colors.surface].map((x, i) => <span key={i} style={{ background: x }} />)}</span>
                </Tile>
              )
            })}
          </div>
        </Group>

        <Group title="Lettering" why="The typefaces for headlines, text and labels." picked={!!plan.typography} onReset={() => set('typography', undefined)}>
          <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
            {[...d.typography, ...Object.keys(typography).filter((x) => !d.typography.includes(x as never))].map((id) => {
              const t = typography[id as keyof typeof typography]
              return (
                <Tile key={id} on={(plan.typography ?? d.defaults.typography) === id} onClick={() => set('typography', id)} label={t.name} sub={t.line}>
                  <span className="block truncate px-2.5 pt-3 text-3xl leading-none" style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontStretch: t.display.stretch }} aria-hidden>Aa {t.display.family}</span>
                </Tile>
              )
            })}
          </div>
        </Group>

        <Group title="Shape" why="Corners and edges of buttons, cards and photos." picked={!!plan.shape} onReset={() => set('shape', undefined)}>
          <div className={grid}>{Object.values(shapeStyles).map((x) => <Tile key={x.id} on={look.shape.id === x.id} onClick={() => set('shape', x.id)} label={x.name} sub={x.id === shapeDefault ? 'Look default' : undefined}><OptionDemo id={`shape:${x.id}`} {...demo} shape={x} /></Tile>)}</div>
        </Group>

        <Group title="Menu" why="How visitors get around — the same menu on every page." picked={!!plan.nav} onReset={() => set('nav', undefined)}>
          <div className={grid}>{Object.values(navStyles).map((x) => <Tile key={x.id} on={(plan.nav ?? navDefault) === x.id} onClick={() => set('nav', x.id)} label={x.name} sub={x.id === navDefault ? 'Fits your site' : undefined}><OptionDemo id={`nav:${x.id}`} {...demo} /></Tile>)}</div>
        </Group>

        <Group title="Colour chapters" why="Optional: three accents that take turns — each chapter section owns one as a full colour field, over the palette above." picked={plan.rotation !== undefined} onReset={() => set('rotation', undefined)}>
          <div className={grid}>
            <Tile on={!look.rotId} onClick={() => set('rotation', 'off')} label="Off" sub="One accent only"><span className="grid h-14 place-items-center text-xs text-muted">—</span></Tile>
            {Object.values(accentSets).map((x) => (
              <Tile key={x.id} on={look.rotId === x.id} onClick={() => set('rotation', x.id)} label={x.name} sub={x.id === d.rotation ? 'Look default' : x.line}>
                <span className="grid h-14 grid-cols-3" aria-hidden>{x.colors.map((c) => <span key={c} style={{ background: c }} />)}</span>
              </Tile>
            ))}
          </div>
        </Group>

        <Group title="Whole site" why="Effects that work across every page — mounted once in the site layout. Optional, pick any.">
          <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(13rem,1fr))]">
            {sitePieceIds.map((id) => {
              const on = (plan.sitePieces ?? []).includes(id)
              return (
                <div key={id} className={`overflow-hidden rounded-md border bg-white ${on ? 'border-pencil ring-2 ring-pencil' : 'border-line'}`}>
                  <LazyMount className="aspect-[16/9]"><ScaledFrame width={420} className="aspect-[16/9]"><PieceDemo id={id} colors={look.colors} fonts={look.fonts} chapters={look.chapters} /></ScaledFrame></LazyMount>
                  <button type="button" role="checkbox" aria-checked={on} onClick={() => updatePlan((p) => toggleSitePiece(p, id))} className="flex w-full items-center justify-between gap-2 border-t border-line px-2.5 py-2 text-left">
                    <span><span className="block text-[13px] font-medium">{pieces[id].name}</span><span className="block text-[11px] text-muted">{pieces[id].line}</span></span>
                    {on && <Check size={14} className="shrink-0 text-pencil" aria-hidden />}
                  </button>
                </div>
              )
            })}
          </div>
        </Group>

        <Group title="Photo layout" why="How sets of photos are shown wherever they appear (galleries, collections, work)." picked={!!plan.imagePresentation} onReset={() => set('imagePresentation', undefined)}>
          <div className={grid}>{Object.values(imagePresentations).map((x) => <Tile key={x.id} on={plan.imagePresentation === x.id} onClick={() => set('imagePresentation', x.id)} label={x.name} sub={x.piece ? 'Comes with ready code' : undefined}><LazyMount className="overflow-hidden"><OptionDemo id={`photo:${x.id}`} {...demo} /></LazyMount></Tile>)}</div>
        </Group>
      </div>

      <aside className="lg:sticky lg:top-40 lg:self-start" aria-label="Live preview">
        <p className="mb-2 text-sm font-medium">Your site, with this style</p>
        <SitePreview {...previewFromRecipe(recipe, plan.name ? { title: plan.name, brand: plan.name } : {})} className="rounded-lg border border-line" />
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {([['Look', d.name], ['Colours', palettes[plan.palette ?? d.defaults.palette].name], ['Lettering', look.type.name], ['Shape', look.shape.name], ['Menu', navStyles[plan.nav ?? navDefault].name], ['Photos', plan.imagePresentation ? imagePresentations[plan.imagePresentation].name : 'Per section']] as const).map(([k, v]) => (
            <div key={k} className="border-t border-line pt-1.5"><dt className="text-xs text-muted">{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </aside>
    </div>
  )
}
