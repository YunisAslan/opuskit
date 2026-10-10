'use client'
// The recipe page (decision 47): three tabs for the three things left to do after Direction — see what the site will
// be (Your site), add photos and films (Your files), take it to an AI tool (Build). Every detail for the builder
// (tokens, type scale, controls, layout, motion patterns, section plans) ships in the Build Package and the copied
// recipe, not on this page.

import { PieceDemo } from '@/components/PieceDemo'
import { Bookmark, BookmarkCheck, Download, Pencil, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ToolIcon } from '@/components/ToolIcon'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { directions, kindName } from '@/data/taxonomy'
import { adapters } from '@/features/build-packages'
import { BuildTab, downloadPackage, useBuildPackage } from '@/features/build-packages/BuildPanel'
import { MediaSlots } from '@/components/MediaSlots'
import type { TakenPart, BuildTarget, PaletteColors, PieceId, RecipeSpec, SectionId, UniversalRecipe } from '@/types/domain'
import { normalizeSpec } from './engine'
import { toggleSaved, useSaved } from './library'
import { FlowBar, SiteThumb, exampleOf } from '@/app/library/parts'
import { BrandCard } from '@/components/BrandCard'
import { useGoogleFonts } from '@/components/FontLoader'
import { siteName, takenName, type SiteRef } from '@/features/library/collection'
import { SectionPreview, worldFor } from '@/components/SectionPreview'
import { Chip, CopyButton } from '@/components/ui'
import { recipeToMarkdown } from './markdown'

const TABS = [
  { id: 'site', label: 'Your site' },
  { id: 'media', label: 'Your files' },
  { id: 'build', label: 'Build' },
] as const
type TabId = (typeof TABS)[number]['id']

/** `studio`: this recipe is the one being built (its steps bar is on top); otherwise a Change first opens it in the
 *  building steps (/studio/open), so Brand edits this recipe. */
export function RecipeDocument({ recipe: r, recipeRef, onChange, studio = false }: { recipe: UniversalRecipe; recipeRef: string; onChange: (spec: RecipeSpec) => void; studio?: boolean }) {
  const saved = useSaved().some((s) => s.ref === recipeRef)
  const [tab, setTab] = useState<TabId>('site')
  // The tool the user picked; none if they chose to decide later. We never pick one for them.
  const [target, setTarget] = useState<BuildTarget | null>(r.metadata.spec.target === 'not-sure' ? null : r.metadata.spec.target)
  const [zipping, setZipping] = useState(false)
  const spec = r.metadata.spec
  const colors = Object.fromEntries(r.visualSystem.palette.tokens.map((t) => [t.role, t.hex])) as PaletteColors
  const look = { colors, type: r.visualSystem.typography, shape: r.visualSystem.shape }
  const { pkg, error } = useBuildPackage(r, target, true)
  const [kind, key] = recipeRef.split(':')
  // The owner changes the look, colours and lettering (Direction); the rest is the engine's, read from them (decision 39).
  const editHref = (step?: string) => {
    if (step && !['direction', 'palette', 'typography', 'brand'].includes(step)) return undefined
    return studio ? '/studio/direction' : `/studio/open?from=${kind}:${key}`
  }

  // Tab survives reloads and is linkable (#media).
  useEffect(() => { const h = location.hash.slice(1) as TabId; if (TABS.some((t) => t.id === h)) setTab(h) }, [])
  const pick = (t: TabId) => { setTab(t); history.replaceState(null, '', `#${t}`) }

  const update = (patch: Partial<RecipeSpec>) => onChange(normalizeSpec({ ...spec, ...patch }))

  const actions = (
    <>
          <button type="button" className="btn btn-sm inline-flex items-center gap-1.5 text-ink-2 hover:bg-paper-2 hover:text-ink" aria-pressed={saved} onClick={() => { toggleSaved(recipeRef); toast(saved ? 'Removed from saved' : 'Saved — find it under Saved') }}>
        {saved ? <BookmarkCheck size={16} aria-hidden /> : <Bookmark size={16} aria-hidden />}<span className={studio ? 'max-sm:sr-only' : ''}>{saved ? 'Saved' : 'Save'}</span>
      </button>
      <div className="ml-auto flex flex-wrap items-center gap-2">
            <CopyButton text={() => recipeToMarkdown(r)} label="Copy recipe" className={studio ? 'max-lg:hidden' : ''} />
            <Select value={target ?? undefined} onValueChange={(v) => setTarget(v as BuildTarget)}>
              <SelectTrigger aria-label="Build with" className={`rounded-[3px] ${studio ? 'min-w-36 max-sm:hidden' : 'min-w-44'}`}><SelectValue placeholder="Choose your tool" /></SelectTrigger>
              <SelectContent side={studio ? 'bottom' : 'top'} align="end" sideOffset={8}>
                {Object.values(adapters).map((a) => (
                  <SelectItem key={a.id} value={a.id}><ToolIcon id={a.id} className="size-4" />{a.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button type="button" disabled={!pkg || zipping} className={`btn btn-ink inline-flex items-center gap-2 disabled:opacity-50 ${studio ? 'btn-sm' : ''}`}
              onClick={async () => { if (!pkg) return; setZipping(true); try { await downloadPackage(pkg, r) } finally { setZipping(false) } }}>
              <Download size={16} aria-hidden />{zipping ? 'Preparing…' : 'Download Build Package'}
            </button>
      </div>
    </>
  )

  return (
    <>
    {studio && <FlowBar at="Recipe" next={<div className="flex items-center gap-2 [&_.ml-auto]:ml-0">{actions}</div>} />}
    <article className={`mx-auto max-w-[1440px] px-5 md:px-8 ${studio ? 'pb-24' : 'pb-40'}`}>
      {/* The owner's own name and sentence; the engine's long title stays in the package. */}
      <header className="pt-10 lg:pt-14">
        <p className="label text-muted">Recipe · {kindName(spec.purpose)} · {directions[spec.direction].name} · {r.visualSystem.palette.name} · {r.visualSystem.typography.name}</p>
        <h1 className="display mt-4 max-w-5xl text-[clamp(2.6rem,6vw,5rem)]">{spec.brief?.name?.trim() || r.title}</h1>
        <p className="mt-4 line-clamp-2 max-w-2xl text-lg text-ink-2">{spec.brief?.offer?.trim() || r.summary}</p>
      </header>

      {/* Ruled cells like the steps bar (docs/design.md): the open tab on white, underlined in pencil. */}
      <div role="tablist" aria-label="Recipe" className={`sticky ${studio ? 'top-[111px]' : 'top-[56px]'} z-20 -mx-5 mt-10 flex overflow-x-auto overflow-y-hidden border-y border-line bg-paper/95 backdrop-blur-sm [scrollbar-width:none] md:-mx-8`}
        onKeyDown={(e) => {
          const i = TABS.findIndex((t) => t.id === tab)
          const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1
          if (n >= 0 && n < TABS.length) { pick(TABS[n].id); document.getElementById(`tab-${TABS[n].id}`)?.focus() }
        }}>
        {TABS.map((t) => (
          <button key={t.id} id={`tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} tabIndex={tab === t.id ? 0 : -1}
            onClick={() => pick(t.id)} className={`relative flex h-12 shrink-0 items-center border-r border-line px-5 text-sm transition-colors first:border-l md:first:ml-8 ${tab === t.id ? 'bg-white text-ink after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-pencil' : 'text-ink-2 hover:bg-paper-2 hover:text-ink'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <section id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="pt-10">
        {tab === 'site' ? <YourSite r={r} look={look} editHref={editHref} />
          : tab === 'media' ? <Media r={r} update={update} />
          : <div className="space-y-16">
              <div>
                <Heading title="Pick the AI tool that will build your site" />
                <p className="mt-3 max-w-2xl text-sm text-ink-2">You get one package made for that tool: the same site, written in the files and words it reads best.</p>
                <div className="mt-6"><BuildTab recipe={r} target={target} onTarget={setTarget} pkg={pkg} error={error} /></div>
              </div>
              <RoomToInvent r={r} />
            </div>}
      </section>

      {/* One action bar, always in reach: in the Studio it is the steps bar on top, elsewhere fixed at the bottom. */}
      {!studio && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-5 py-3 md:px-8">
            <Link href={editHref()!} className="btn btn-line btn-sm inline-flex items-center gap-1.5"><SlidersHorizontal size={15} aria-hidden />Change it</Link>
            {actions}
          </div>
        </div>
      )}

    </article>
    </>
  )
}

type Look = { colors: PaletteColors; type: UniversalRecipe['visualSystem']['typography']; shape: UniversalRecipe['visualSystem']['shape'] }
type Edit = (step?: string) => string | undefined

const ChangeLink = ({ href, label = 'Change' }: { href?: string; label?: string }) => href &&
  <Link href={href} className="link inline-flex items-center gap-1 text-sm"><Pencil size={13} aria-hidden />{label}</Link>

/** A section's head, ruled like the landing's: the title, and on the right what can be done with it. */
const Heading = ({ title, children }: { title: string; children?: ReactNode }) => (
  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-3"><h2 className="display text-[clamp(1.5rem,2.4vw,2rem)]">{title}</h2>{children}</div>
)

/** "from Fennwood" — the mark on anything taken from a site in the Library. */
const From = ({ site }: { site?: string }) => site ? <span className="label shrink-0 text-pencil">from {site}</span> : null

// ─── Your site: the brand, and everything taken for it ──────────────────────

function YourSite({ r, look, editHref }: { r: UniversalRecipe; look: Look; editHref: Edit }) {
  const spec = r.metadata.spec, c = look.colors, t = look.type
  useGoogleFonts(t.googleFamilies) // the brand poster speaks in the owner's faces
  // Only what the owner picked in Direction (decision 49); everything else is read from it and never listed.
  const facts: [string, string, string][] = [['Look', directions[spec.direction].name, 'direction'], ['Colours', r.visualSystem.palette.name, 'palette'], ['Lettering', t.name, 'typography']]
  return (
    <div className="space-y-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <Heading title="Your brand"><ChangeLink href={editHref()} label="Change the look" /></Heading>
          <div className="mt-6">
            <BrandCard name={spec.brief?.name} about={spec.brief?.offer} colors={c} type={t}
              caption={`${t.display.family}${t.body.family !== t.display.family ? ` + ${t.body.family}` : ''} — exactly as your site will use them.`} />
          </div>
        </div>
        <dl className="border-l border-t border-line lg:mt-[3.75rem]">
          {facts.map(([k, v, step]) => (
            <Link key={k} href={editHref(step)!} className="group flex items-center justify-between gap-3 border-b border-r border-line bg-white px-5 py-4 transition-colors hover:bg-paper-2" aria-label={`${k}: ${v}. Change`}>
              <span><dt className="label text-muted">{k}</dt><dd className="mt-1.5 text-lg">{v}</dd></span>
              <Pencil size={15} className="shrink-0 text-muted group-hover:text-ink" aria-hidden />
            </Link>
          ))}
        </dl>
      </div>
      <Taken r={r} look={look} />
    </div>
  )
}

type Kind = 'all' | 'parts' | 'effects' | 'qualities'
const KIND_OF = (x: TakenPart): Exclude<Kind, 'all'> => (x.kind === 'effect' ? 'effects' : x.kind === 'section' || x.kind === 'menu' || x.kind === 'footer' ? 'parts' : 'qualities')
const KIND_NAME: Record<Kind, string> = { all: 'All', parts: 'Parts', effects: 'Effects', qualities: 'Looks & qualities' }
const KIND_ONE: Record<Exclude<Kind, 'all'>, string> = { parts: 'Part', effects: 'Effect', qualities: 'Look or quality' }

/** Everything taken in the Library, in one place (decision 49): each drawn in the owner's brand — a part as the ready
 *  section, an effect as its live demo, a whole look or quality as the site it came from — filtered by kind. */
function Taken({ r, look }: { r: UniversalRecipe; look: Look }) {
  const taken = r.metadata.spec.taken ?? []
  const [kind, setKind] = useState<Kind>('all')
  const kinds = (['all', 'parts', 'effects', 'qualities'] as const).filter((k) => k === 'all' || taken.some((x) => KIND_OF(x) === k))
  const shown = taken.filter((x) => kind === 'all' || KIND_OF(x) === kind)
  const t = look.type, world = worldFor(r.metadata.spec.purpose), brand = r.metadata.spec.brief?.name
  const part = (id: string) => r.pages.flatMap((p) => p.sections).find((s) => s.id === id)
  // Live, not a still (the user, 2026-10-08): an effect is its working demo, in the owner's brand — move, click, drag;
  // a part plays its few seconds on the real site it came from, when that site was recorded; a whole look or quality
  // plays that site. Without a recording a part is drawn in the owner's brand.
  const visual = (x: TakenPart) => {
    const clip = exampleOf(x.site as SiteRef)?.sectionClips?.[(x.kind === 'menu' ? 'navbar' : x.kind === 'footer' ? 'footer' : x.id) as SectionId]
    if (x.kind === 'effect') return <PieceDemo id={x.id as PieceId} colors={look.colors} fonts={{ display: t.display.family, body: t.body.family, utility: t.utility.family }} className="!h-full" />
    if (clip && x.kind !== 'site' && x.kind !== 'like' && x.kind !== 'hero') return <LiveClip src={clip} />
    if (x.kind === 'section') { const s = part(x.id); return <div className="size-full" inert><SectionPreview id={x.id as SectionId} variant={s?.variant?.id} tone={s?.tone} media={s?.media} colors={look.colors} type={t} shape={look.shape} world={world} brand={brand} className="h-full" /></div> }
    if (x.kind === 'footer') return <div className="size-full" inert><SectionPreview id="footer" footer={r.chrome.footerStyle.id} colors={look.colors} type={t} shape={look.shape} world={world} brand={brand} className="h-full" /></div>
    return <SiteThumb site={x.site as SiteRef} auto />
  }
  return (
    <div>
      <Heading title="What you took"><Link href="/library" className="link inline-flex items-center gap-1 text-sm">Take more</Link></Heading>
      {taken.length ? (
        <>
          {kinds.length > 2 && <div className="mt-5 flex flex-wrap gap-1.5">{kinds.map((k) => <Chip key={k} small active={kind === k} onClick={() => setKind(k)}>{KIND_NAME[k]}</Chip>)}</div>}
          <ul className="mt-5 grid border-l border-t border-line sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((x) => (
              <li key={`${x.kind}:${x.id}:${x.site}`} className="overflow-hidden border-b border-r border-line bg-white">
                <div className="aspect-[16/10] overflow-hidden border-b border-line" style={{ background: look.colors.background }}>{visual(x)}</div>
                <div className="flex items-baseline justify-between gap-3 px-4 py-3">
                  <span className="min-w-0"><span className="label block text-muted">{KIND_ONE[KIND_OF(x)]}</span><span className="mt-1 block truncate first-letter:uppercase">{takenName(x)}</span></span>
                  <From site={siteName(x.site as SiteRef)} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">Effects work here — move, click, drag. Parts play on the site they came from where it was recorded, else drawn in your brand. Your site takes them; it won’t look like those sites.</p>
        </>
      ) : <p className="mt-6 border border-dashed border-line p-5 text-sm text-muted">Nothing was taken from a site — this recipe started from its kind of site.</p>}
    </div>
  )
}

/** A recording that plays while it is on screen, muted and looping; still with reduced motion. */
function LiveClip({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([x]) => { if (x.isIntersecting) v.play().catch(() => {}); else v.pause() }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} src={src} muted loop playsInline preload="metadata" aria-hidden className="size-full object-cover" />
}

// ─── Your files: one row per picture or film the site needs ─────────────────

function Media({ r, update }: { r: UniversalRecipe; update: (p: Partial<RecipeSpec>) => void }) {
  // The logo is never asked for: without one the builder sets the name as a wordmark in the display face.
  return (
    <div>
      <Heading title="Your photos and films" />
      <p className="mt-3 max-w-2xl text-sm text-ink-2">Each part of your site, and the picture it needs. Add your own, or start with a sample from a site built with OpusKit — the Build Package puts each file where it goes. Files stay in this browser.</p>
      <div className="mt-6"><MediaSlots r={r} onChange={update} /></div>
    </div>
  )
}

// ─── Build: what the builder keeps and what it makes, then the tool ─────────

/** Decision 32 in plain words: the owner's picks are locked; the builder designs the rest like someone who knows the look. */
function RoomToInvent({ r }: { r: UniversalRecipe }) {
  return (
    <div>
      <Heading title={`Room to invent — ${r.style.look}`} />
      <p className="mt-3 max-w-2xl text-sm text-ink-2">Everything you picked stays as you picked it. The rest the builder designs — like someone who knows {r.style.look}, from what its best sites do — and every page gets one moment people remember.</p>
      <div className="mt-6 grid border border-line bg-white md:grid-cols-2">
        {([['Known for', r.style.moves], ['Ideas for the moments', r.style.sparks]] as const).map(([name, xs], i) => (
          <div key={name} className={`p-5 md:p-6 ${i ? 'border-t border-line md:border-l md:border-t-0' : ''}`}>
            <p className="label">{name}</p>
            <ul className="mt-4 space-y-2.5 text-sm text-ink-2">{xs.map((x) => <li key={x} className="flex gap-2.5"><span className="mt-[0.45em] size-1.5 shrink-0 bg-pencil" aria-hidden />{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  )
}
