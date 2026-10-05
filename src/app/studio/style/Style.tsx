'use client'
// Style (docs/plan-library.md): your colours and your lettering — what fits your site first, then every one we have —
// beside your home page drawn in them. Until something is picked, the start site's look (or the kind of site's) is used.
// Your files (logo, photos, video) are asked for on the recipe, where it says what the site needs.
import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { useGoogleFonts } from '@/components/FontLoader'
import { Chip } from '@/components/ui'
import { palettes, typography } from '@/data/ingredients'
import { isStandardPage, setStyle } from '@/features/kit/plan'
import { rankPalettes } from '@/features/recipes/engine'
import { luminance } from '@/lib/color'
import { updatePlan, usePlan } from '@/lib/kit'
import { useHydrated } from '@/lib/store'
import type { PaletteId, TypographyId } from '@/types/domain'
import { NeedsStudio, PagePreview, StepFrame, usePlanLook, useToRecipe } from '../shared'

const ALL_TYPE = Object.keys(typography) as TypographyId[]
const ALL_COLOURS = Object.keys(palettes) as PaletteId[]
const isDark = (id: PaletteId) => luminance(palettes[id].colors.background) < 0.2
// What kind of face leads each pairing (its display family), for the lettering filter.
const SERIF = new Set(['Amiri', 'Ancizar Serif', 'Bellefair', 'Besley', 'Bodoni Moda', 'Castoro Titling', 'Cormorant', 'Gilda Display', 'Gloock', 'Hedvig Letters Serif', 'Ibarra Real Nova', 'Imbue', 'Italiana', 'Kalnia', 'Labrada', 'Libre Caslon Display', 'Literata', 'Newsreader', 'Noto Serif Display', 'Petrona', 'Prata', 'Sedan', 'Shippori Mincho', 'Young Serif'])
const EXPRESSIVE = new Set(['Bagel Fat One', 'Ballet', 'Boldonse', 'Caprasimo', 'Caveat Brush', 'Grenze Gotisch', 'Monoton', 'Permanent Marker', 'Press Start 2P', 'Rubik Mono One', 'Tektur', 'Tilt Warp'])
const KINDS = ['Serif', 'Sans', 'Expressive'] as const
const typeKind = (id: TypographyId) => { const f = typography[id].display.family; return SERIF.has(f) ? 'Serif' : EXPRESSIVE.has(f) ? 'Expressive' : 'Sans' }

export function Style() {
  const ready = useHydrated()
  const plan = usePlan()
  const { look, spec } = usePlanLook(plan)
  const toRecipe = useToRecipe()
  const [tone, setTone] = useState<'all' | 'light' | 'dark'>('all')
  const [kind, setKind] = useState<'all' | (typeof KINDS)[number]>('all')
  const fonts = [...look.d.typography, ...ALL_TYPE.filter((t) => !look.d.typography.includes(t))].filter((t) => kind === 'all' || typeKind(t) === kind)
  useGoogleFonts(fonts.flatMap((t) => typography[t].googleFamilies))
  if (!ready) return null
  if (plan.via !== 'studio' || !plan.pages.length) return <NeedsStudio />

  const ranked = rankPalettes(spec)
  const fits = ranked.slice(0, 6)
  const colours = [...new Set([...fits, ...look.d.palettes, ...ALL_COLOURS])].filter((id) => tone === 'all' || isDark(id) === (tone === 'dark'))
  const home = plan.pages.find((p) => p.sections.length || !isStandardPage(p.type))
  const tag = (made: boolean, best: boolean) => (best ? 'Fits your site' : made ? 'Made for this look' : undefined)

  return (
    <StepFrame at="Style" title={<h1 className="display text-[clamp(2.2rem,5vw,4rem)]">Style</h1>} back={['/studio/pages', 'Pages']}
      next={<button type="button" onClick={toRecipe} className="btn btn-ink btn-sm">Recipe<ArrowRight size={14} aria-hidden /></button>}>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div className="space-y-12">
          <Group title={`Colours · ${ALL_COLOURS.length}`} filters={(['all', 'light', 'dark'] as const).map((t) => <Chip key={t} active={tone === t} onClick={() => setTone(t)}>{t === 'all' ? 'All' : t === 'light' ? 'Light' : 'Dark'}</Chip>)}>
            {colours.map((id) => {
              const p = palettes[id], c = p.colors
              return (
                <Tile key={id} on={spec.palette === id} onPick={() => updatePlan((x) => setStyle(x, 'palette', id))} label={p.name} sub={tag(look.d.palettes.includes(id), fits.includes(id))}>
                  <span className="grid h-12 grid-cols-[2fr_1fr_1fr_1fr]" aria-hidden>{[c.background, c.text, c.accent, c.surface].map((x, i) => <span key={i} style={{ background: x }} />)}</span>
                </Tile>
              )
            })}
          </Group>

          <Group title={`Lettering · ${ALL_TYPE.length}`} filters={(['all', ...KINDS] as const).map((k) => <Chip key={k} active={kind === k} onClick={() => setKind(k)}>{k === 'all' ? 'All' : k}</Chip>)}>
            {fonts.map((id) => {
              const t = typography[id]
              return (
                <Tile key={id} on={look.type.id === id} onPick={() => updatePlan((x) => setStyle(x, 'typography', id))} label={t.name} sub={tag(look.d.typography.includes(id), id === look.d.defaults.typography)}>
                  <span className="block h-12 truncate px-3 pt-2.5 text-[1.7rem] leading-none" style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontStretch: t.display.stretch, fontStyle: t.display.italic ? 'italic' : undefined }} aria-hidden>Aa {t.display.family}</span>
                </Tile>
              )
            })}
          </Group>
        </div>

        {home && <div className="max-h-[calc(100vh-11rem)] overflow-y-auto rounded-lg scrollbar-thin lg:sticky lg:top-24"><PagePreview plan={plan} pageId={home.id} /></div>}
      </div>
    </StepFrame>
  )
}

function Group({ title, filters, children }: { title: string; filters: React.ReactNode; children: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ink pt-3">
        <h2 className="text-xl font-medium tracking-tight">{title}</h2>
        <div className="flex gap-1">{filters}</div>
      </div>
      <div role="radiogroup" aria-label={title} className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]">{children}</div>
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
