'use client'
// The result page: one recipe, shown visually in tabs, with a fixed action bar.
// The page shows what a person needs to judge and adjust the design; every detail (components, resources,
// references, implementation, "why it works") still ships in full inside the Build Package and the copied recipe.

import { PieceDemo } from '@/components/PieceDemo'
import { Bookmark, BookmarkCheck, Check, Circle, Download, Pencil, Search, SlidersHorizontal, TriangleAlert, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { OptionDemo } from '@/components/OptionDemo'
import { SectionPreview } from '@/components/SectionPreview'
import { ToolIcon } from '@/components/ToolIcon'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { TypeSpecimen } from '@/components/TypeSpecimen'
import { CopyButton } from '@/components/ui'
import { buildPackageLocked, lockedSections } from '@/config/pricing'
import { img } from '@/data/images'
import { directions, purposes } from '@/data/taxonomy'
import { resources } from '@/data/resources'
import { useAccess } from '@/features/billing'
import { CheckoutDialog } from '@/features/billing/CheckoutDialog'
import { adapters } from '@/features/build-packages'
import { BuildTab, downloadPackage, useBuildPackage } from '@/features/build-packages/BuildPanel'
import { MediaSlots, SLOTS } from '@/components/MediaSlots'
import type { AssetId, BuildTarget, PageSection, PaletteColors, RecipeSpec, UniversalRecipe, UploadedAsset } from '@/types/domain'
import { chromeNote, normalizeSpec } from './engine'
import { markRecent, toggleSaved, useSaved } from './library'
import { recipeToMarkdown } from './markdown'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'design', label: 'Design' },
  { id: 'pages', label: 'Pages' },
  { id: 'media', label: 'Your files' },
  { id: 'motion', label: 'Motion' },
  { id: 'build', label: 'Build' },
] as const
type TabId = (typeof TABS)[number]['id']

const STATUS: Record<string, { label: string; mark: typeof Check; cls: string }> = {
  have: { label: 'Ready', mark: Check, cls: 'text-ink' },
  create: { label: 'To create', mark: Pencil, cls: 'text-pencil' },
  find: { label: 'To find', mark: Search, cls: 'text-ink-2' },
  temporary: { label: 'Placeholder for now', mark: TriangleAlert, cls: 'text-warn' },
  optional: { label: 'Optional', mark: Circle, cls: 'text-muted' },
}

/** `inKit`: shown as step 3 of the kit (its step bar is above), so the bar's own way back replaces "Customise in kit". */
export function RecipeDocument({ recipe: r, recipeRef, onChange, inKit = false }: { recipe: UniversalRecipe; recipeRef: string; onChange: (spec: RecipeSpec) => void; inKit?: boolean }) {
  const { unlocked } = useAccess(recipeRef)
  const saved = useSaved().some((s) => s.ref === recipeRef)
  const [checkout, setCheckout] = useState(false)
  const [tab, setTab] = useState<TabId>('overview')
  // The tool the user picked in the kit; none if they chose to decide later. We never pick one for them.
  const [target, setTarget] = useState<BuildTarget | null>(r.metadata.spec.target === 'not-sure' ? null : r.metadata.spec.target)
  const [zipping, setZipping] = useState(false)
  const spec = r.metadata.spec
  const colors = Object.fromEntries(r.visualSystem.palette.tokens.map((t) => [t.role, t.hex])) as PaletteColors
  const look = { colors, type: r.visualSystem.typography, shape: r.visualSystem.shape }
  const { pkg, error } = useBuildPackage(r, target, unlocked)
  const [kind, key] = recipeRef.split(':')
  // Every change happens in the kit (the one editor), opened on this recipe at the matching spot.
  const editHref = (step?: string) => {
    const [at, spot] = KIT_SPOT[step ?? ''] ?? ['style']
    return `/kit?from=${kind}:${key}&step=${at}${spot ? `&${at === 'style' ? 'cat' : 'shelf'}=${spot}` : ''}`
  }
  const isLocked = (t: TabId) => !unlocked && ((t === 'motion' && lockedSections.includes('motion')) || (t === 'build' && buildPackageLocked))

  useEffect(() => { markRecent(recipeRef) }, [recipeRef])
  // Tab survives reloads and is linkable (#design).
  useEffect(() => { const h = location.hash.slice(1) as TabId; if (TABS.some((t) => t.id === h)) setTab(h) }, [])
  const pick = (t: TabId) => { setTab(t); history.replaceState(null, '', `#${t}`) }

  const update = (patch: Partial<RecipeSpec>) => onChange(normalizeSpec({ ...spec, ...patch }))

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-40 md:px-8">
      <header className="pt-10 lg:pt-14">
        <p className="text-sm text-muted">{purposes[spec.purpose].name} · {directions[spec.direction].name} · {r.metadata.complexity} build</p>
        <h1 className="display mt-3 max-w-4xl text-[clamp(2.2rem,4.6vw,4.2rem)]">{r.title}</h1>
        <p className="prose-serif mt-4 line-clamp-2 max-w-2xl text-ink-2">{r.summary}</p>
      </header>

      <div role="tablist" aria-label="Recipe" className="sticky top-16 z-20 -mx-5 mt-8 flex gap-1 overflow-x-auto overflow-y-hidden bg-paper/95 px-5 shadow-[inset_0_-1px_0_var(--color-line)] backdrop-blur-sm [scrollbar-width:none] md:-mx-8 md:px-8"
        onKeyDown={(e) => {
          const i = TABS.findIndex((t) => t.id === tab)
          const n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1
          if (n >= 0 && n < TABS.length) { pick(TABS[n].id); document.getElementById(`tab-${TABS[n].id}`)?.focus() }
        }}>
        {TABS.map((t) => (
          <button key={t.id} id={`tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} tabIndex={tab === t.id ? 0 : -1}
            onClick={() => pick(t.id)} className={`shrink-0 border-b-2 px-3 py-3.5 text-sm transition-colors ${tab === t.id ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
            {t.label}{isLocked(t.id) && <span className="ml-1 text-xs text-muted">· locked</span>}
          </button>
        ))}
      </div>

      <section id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="pt-10">
        {isLocked(tab) ? <Locked onUnlock={() => setCheckout(true)} what={tab === 'build' ? 'Build Packages' : 'The motion system'} />
          : tab === 'overview' ? <Overview r={r} look={look} editHref={editHref} />
          : tab === 'design' ? <Design r={r} look={look} colors={colors} editHref={editHref} />
          : tab === 'pages' ? <Pages r={r} editHref={editHref} />
          : tab === 'media' ? <Media r={r} spec={spec} update={update} editHref={editHref} />
          : tab === 'motion' ? <Motion r={r} look={look} editHref={editHref} />
          : <BuildTab recipe={r} target={target} onTarget={setTarget} pkg={pkg} error={error} />}
      </section>

      {/* One fixed action bar: everything the user can do with this recipe, always in reach. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-5 py-3 md:px-8">
          {!inKit && <Link href={editHref()} className="btn btn-line btn-sm inline-flex items-center gap-1.5"><SlidersHorizontal size={15} aria-hidden />Customise in kit</Link>}
          <button type="button" className="btn btn-sm inline-flex items-center gap-1.5 text-ink-2 hover:text-ink" aria-pressed={saved} onClick={() => { toggleSaved(recipeRef); toast(saved ? 'Removed from saved' : 'Saved — find it under Saved') }}>
            {saved ? <BookmarkCheck size={16} aria-hidden /> : <Bookmark size={16} aria-hidden />}{saved ? 'Saved' : 'Save'}
          </button>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {unlocked ? (
              <>
                <CopyButton text={() => recipeToMarkdown(r)} label="Copy recipe" />
                <Select value={target ?? undefined} onValueChange={(v) => setTarget(v as BuildTarget)}>
                  <SelectTrigger aria-label="Build with" className="min-w-44 rounded-full"><SelectValue placeholder="Choose your tool" /></SelectTrigger>
                  <SelectContent side="top" align="end" sideOffset={8}>
                    {Object.values(adapters).map((a) => (
                      <SelectItem key={a.id} value={a.id}><ToolIcon id={a.id} className="size-4" />{a.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button type="button" disabled={!pkg || zipping} className="btn btn-ink inline-flex items-center gap-2 disabled:opacity-50"
                  onClick={async () => { if (!pkg) return; setZipping(true); try { await downloadPackage(pkg, r) } finally { setZipping(false) } }}>
                  <Download size={16} aria-hidden />{zipping ? 'Preparing…' : 'Download build kit'}
                </button>
              </>
            ) : <button type="button" className="btn btn-ink" onClick={() => setCheckout(true)}>Unlock full recipe</button>}
          </div>
        </div>
      </div>

      <CheckoutDialog open={checkout} onClose={() => setCheckout(false)} recipeRef={recipeRef} recipeTitle={r.title} />
    </article>
  )
}

type Look = { colors: PaletteColors; type: UniversalRecipe['visualSystem']['typography']; shape: UniversalRecipe['visualSystem']['shape'] }
type Edit = (step?: string) => string

/** Questionnaire step → where the same choice lives in the kit: [kit step, style category or components shelf]. */
const KIT_SPOT: Record<string, [string, string?]> = {
  direction: ['style', 'look'], palette: ['style', 'colours'], typography: ['style', 'lettering'], shape: ['style', 'shape'], nav: ['style', 'menu'], footer: ['style', 'menu'], photos: ['pages'],
  lead: ['pages', 'first-screen'], motion: ['style', 'motion'], touches: ['style', 'idea'], idea: ['style', 'idea'], pages: ['pages'], kit: ['style', 'behaviour'],
}

const ChangeLink = ({ href, label = 'Change' }: { href: string; label?: string }) =>
  <Link href={href} className="link inline-flex items-center gap-1 text-sm"><Pencil size={13} aria-hidden />{label}</Link>

const Heading = ({ title, children }: { title: string; children?: ReactNode }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-2xl font-medium tracking-tight">{title}</h2>{children}</div>
)

// ─── Overview: the site at a glance, every decision as a picture ─────────────

function Overview({ r, look, editHref }: { r: UniversalRecipe; look: Look; editHref: Edit }) {
  const spec = r.metadata.spec
  const name = spec.brief?.name?.trim()
  const c = look.colors
  const t = look.type
  const tiles: { label: string; value: string; step: string; href?: string; visual: ReactNode }[] = [
    { label: 'Style', value: directions[spec.direction].name, step: 'direction',
      visual: <div className="flex h-full flex-col justify-end p-4" style={{ background: c.background, color: c.text }}><span style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontSize: '1.4rem', lineHeight: 1.05 }}>{r.creativeDirection.mood.slice(0, 3).join(' · ')}</span></div> },
    { label: 'Colors', value: r.visualSystem.palette.name, step: 'palette',
      visual: <div className="flex h-full">{r.visualSystem.palette.tokens.map((x) => <span key={x.role} className="flex-1" style={{ background: x.hex }} />)}</div> },
    { label: 'Lettering', value: t.name, step: 'typography',
      visual: <div className="flex h-full items-center justify-center" style={{ background: c.surface, color: c.text }}><span style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontSize: '3.4rem', lineHeight: 1 }}>Aa</span></div> },
    { label: 'First screen', value: r.media.hero.name, step: 'lead',
      // eslint-disable-next-line @next/next/no-img-element -- small decorative thumbnail
      visual: <img src={img(r.metadata.image, 480)} alt="" className="h-full w-full object-cover" /> },
    { label: 'Shape', value: r.visualSystem.shape.name, step: 'shape', visual: <OptionDemo id={`shape:${r.visualSystem.shape.id}`} {...look} /> },
    { label: 'Menu', value: r.chrome.nav.name, step: 'nav', visual: <OptionDemo id={`nav:${r.chrome.nav.id}`} {...look} /> },
    { label: 'Big idea', value: r.concept?.name ?? 'None', step: 'idea',
      visual: <div className="flex h-full flex-col justify-end p-4" style={{ background: c.surface, color: c.text }}><span className="text-sm leading-snug">{r.concept?.line ?? 'No single idea — the look carries the site.'}</span></div> },
    { label: 'Special touches', value: r.signatures.map((s) => s.name).join(', ') || 'None', step: 'touches',
      visual: r.signatures[0] ? <OptionDemo id={`sig:${r.signatures[0].id}`} {...look} /> : <div className="h-full" style={{ background: c.surface }} /> },
    ...(r.pieces.length ? [{ label: 'Your kit', value: r.pieces.map((p) => p.name).join(', '), step: 'kit', href: editHref('kit'),
      visual: <PieceDemo id={r.pieces[0].id} colors={c} fonts={{ display: t.display.family, body: t.body.family, utility: t.utility.family }} className="!h-full" /> }] : []),
    { label: 'Pages', value: `${r.pages.length} — ${r.pages.map((p) => p.label).join(', ')}`, step: 'pages',
      visual: <div className="grid h-full grid-cols-3 gap-1.5 p-3" style={{ background: c.background }}>{r.pages.slice(0, 6).map((p) => <span key={p.id} className="flex items-end rounded p-1.5 text-[10px] leading-tight" style={{ background: c.surface, color: c.muted }}>{p.label}</span>)}</div> },
  ]
  return (
    <div className="space-y-12">
      <SitePreview {...previewFromRecipe(r, name ? { title: name, brand: name } : {})} className="rounded-xl border border-line" />
      <div>
        <Heading title="Your choices"><ChangeLink href={editHref()} label="Customise in kit" /></Heading>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((x) => (
            <li key={x.label} className="choice group relative overflow-hidden">
              {/* The visual is a sibling of the link (demos contain their own links); the link stretches over the card. */}
              <div className="pointer-events-none aspect-[16/10] overflow-hidden border-b border-line" inert>{x.visual}</div>
              <Link href={x.href ?? editHref(x.step)} className="block after:absolute after:inset-0" aria-label={`${x.label}: ${x.value}. Change`}>
                <div className="flex items-start justify-between gap-2 p-3.5">
                  <span className="min-w-0"><span className="block text-xs text-muted">{x.label}</span><span className="mt-0.5 block truncate font-medium">{x.value}</span></span>
                  <Pencil size={14} className="mt-1 shrink-0 text-muted group-hover:text-ink" aria-hidden />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ─── Design: colors, type, shape, menu, layout — shown, then explained in one line ─

function Design({ r, look, colors, editHref }: { r: UniversalRecipe; look: Look; colors: PaletteColors; editHref: Edit }) {
  const l = r.layoutSystem
  return (
    <div className="space-y-16">
      <div>
        <Heading title={`Colors — ${r.visualSystem.palette.name}`}><ChangeLink href={editHref('palette')} /></Heading>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">{r.whyItWorks.palette}</p>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <PalettePreview colors={colors} recipe={r} />
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {r.visualSystem.palette.tokens.map((x) => (
              <li key={x.role}>
                <button type="button" title={`Copy ${x.hex}`} onClick={() => { navigator.clipboard?.writeText(x.hex); toast(`Copied ${x.hex}`) }} className="w-full overflow-hidden rounded-lg border border-line text-left">
                  <span className="block h-16" style={{ background: x.hex }} />
                  <span className="block p-2 text-xs"><span className="block font-medium capitalize">{x.role}</span><span className="font-mono text-muted">{x.hex}</span></span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <Heading title={`Lettering — ${r.visualSystem.typography.name}`}><ChangeLink href={editHref('typography')} /></Heading>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">{r.whyItWorks.typography}</p>
        <div className="mt-6"><TypeSpecimen t={r.visualSystem.typography} colors={{ bg: colors.background, fg: colors.text, muted: colors.muted }} /></div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Heading title={`Shape — ${r.visualSystem.shape.name}`}><ChangeLink href={editHref('shape')} /></Heading>
          <p className="mt-2 text-sm text-ink-2">{r.visualSystem.shape.rule}</p>
          <OptionDemo id={`shape:${r.visualSystem.shape.id}`} {...look} className="mt-5 rounded-lg border border-line" />
        </div>
        <div>
          <Heading title={`Menu — ${r.chrome.nav.name}`}><ChangeLink href={editHref('nav')} /></Heading>
          <p className="mt-2 text-sm text-ink-2">{r.chrome.nav.line}</p>
          <OptionDemo id={`nav:${r.chrome.nav.id}`} {...look} className="mt-5 rounded-lg border border-line" />
        </div>
        <div>
          <Heading title={`Footer — ${r.chrome.footerStyle.name}`}><ChangeLink href={editHref('footer')} /></Heading>
          <p className="mt-2 text-sm text-ink-2">{r.chrome.footerStyle.line}</p>
          <SectionPreview id="footer" footer={r.chrome.footerStyle.id} {...look} brand={r.metadata.spec.brief?.name} auto className="mt-5 overflow-hidden rounded-lg border border-line" />
        </div>
      </div>

      <div>
        <Heading title="Controls & forms" />
        <p className="mt-2 max-w-2xl text-sm text-ink-2">Every field, menu and button is a polished, accessible component (shadcn/ui), restyled to your colors and shape — never a plain browser default.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <ControlsPreview colors={colors} r={r} />
          <ul className="flex flex-wrap content-start gap-2">
            {r.implementation.ui.components.map((c) => <li key={c.slug} title={c.where.join(', ')} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm">{c.name}</li>)}
          </ul>
        </div>
      </div>

      <div>
        <Heading title={`Layout — ${l.name}`} />
        <p className="mt-2 max-w-2xl text-sm text-ink-2">{l.why}</p>
        <dl className="mt-5 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
          {([['Width', l.container], ['Columns', l.columns], ['Space between sections', l.sectionSpacing], ['Photo shapes', l.mediaProportions]] as const).map(([k, v]) => (
            <div key={k} className="border-t border-line pt-2"><dt className="text-muted">{k}</dt><dd className="mt-0.5">{v}</dd></div>
          ))}
        </dl>
      </div>
    </div>
  )
}

// ─── Pages: each page as its ordered sections; details on demand ─────────────

function Pages({ r, editHref }: { r: UniversalRecipe; editHref: Edit }) {
  return (
    <div className="space-y-4">
      <Heading title={`${r.pages.length} pages`}><ChangeLink href={editHref('pages')} label="Change pages" /></Heading>
      <p className="max-w-2xl text-sm text-ink-2">Every page is planned section by section. Open a section to see exactly what goes in it.</p>
      <div className="grid gap-4 pt-2 lg:grid-cols-2">
        {r.pages.map((p) => <PageCard key={p.id} title={p.label} line={[p.purpose, chromeNote(p)].filter(Boolean).join(' ')} sections={p.sections} />)}
        <PageCard title="On every page" line={`The menu and footer, shared across the site${r.pages.some((p) => p.hide) ? ' — except where a page says otherwise' : ''}.`} sections={[r.chrome.navbar, r.chrome.footer]} />
      </div>
    </div>
  )
}

function PageCard({ title, line, sections }: { title: string; line: string; sections: PageSection[] }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <p className="font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted">{line}</p>
      {sections.length > 0 && (
        <Accordion type="multiple" className="mt-4 space-y-1.5">
          {sections.map((s, i) => (
            <AccordionItem key={`${s.id}-${i}`} value={`${s.id}-${i}`} className="rounded-md border border-line last:border-b">
              <AccordionTrigger className="gap-3 px-3 py-2 text-sm hover:no-underline">
                <span className="flex flex-1 gap-3"><span className="w-4 tabular-nums text-muted">{i + 1}</span>{s.name}</span>
              </AccordionTrigger>
              <AccordionContent>
                <dl className="grid gap-2 px-3 pb-1 pl-10 text-sm">
                  {([['What it does', s.purpose], ['Layout', s.composition], ['Content', s.content], ['On phones', s.responsive]] as const).map(([k, v]) => <div key={k}><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}

// ─── Your files: upload or replace logo, photos, video right here ────────────

function Media({ r, spec, update, editHref }: { r: UniversalRecipe; spec: RecipeSpec; update: (p: Partial<RecipeSpec>) => void; editHref: Edit }) {
  const others = r.assetRequirements.filter((a) => !SLOTS.some((s) => s.asset === a.asset && s.show(spec)))
  return (
    <div className="space-y-14">
      <div>
        <Heading title="Your files" />
        <p className="mt-2 max-w-2xl text-sm text-ink-2">Add or replace them here. They go straight into your build kit, at the exact paths the site uses. Files stay in this browser.</p>
        <div className="mt-6"><MediaSlots spec={spec} onChange={update} /></div>
        {r.media.imagery && (
          <div className="mt-8 grid items-center gap-6 rounded-lg border border-line bg-white p-5 md:grid-cols-[18rem_1fr]">
            <OptionDemo id={`photo:${r.media.imagery.presentation.id}`} colors={Object.fromEntries(r.visualSystem.palette.tokens.map((t) => [t.role, t.hex])) as PaletteColors} type={r.visualSystem.typography} shape={r.visualSystem.shape} className="rounded-md" />
            <div>
              <p className="text-sm text-muted">Photos are shown as</p>
              <p className="mt-0.5 font-medium">{r.media.imagery.presentation.name}</p>
              <p className="mt-1 text-sm text-ink-2">{r.media.imagery.presentation.line}</p>
              <div className="mt-3"><ChangeLink href={editHref('photos')} /></div>
            </div>
          </div>
        )}
      </div>

      <div>
        <Heading title="Everything else the site needs" />
        <ul className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {others.map((a) => {
            const st = STATUS[a.status]
            return (
              <li key={a.key} className="flex items-start gap-3 rounded-lg border border-line bg-white p-4">
                <st.mark size={16} className={`mt-0.5 shrink-0 ${st.cls}`} aria-hidden />
                <span className="min-w-0"><span className="block font-medium">{a.label}</span><span className={`block text-sm ${st.cls}`}>{st.label}</span><span className="mt-1 block text-xs text-muted">{a.specs}</span></span>
              </li>
            )
          })}
        </ul>
      </div>

      {r.assetCreationPaths.length > 0 && (
        <div>
          <Heading title="How to get what's missing" />
          <Accordion type="multiple" className="mt-5 space-y-2">
            {r.assetCreationPaths.map((p) => (
              <AccordionItem key={p.title} value={p.title} className="rounded-lg border border-line bg-white last:border-b">
                <AccordionTrigger className="p-4 text-base font-medium hover:no-underline">{p.title}</AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <ol className="list-decimal space-y-1 pl-5 text-sm">{p.steps.map((s) => <li key={s}>{s}</li>)}</ol>
                  {p.prompt && (
                    <div className="mt-4 rounded-md bg-ink p-4 text-paper">
                      <p className="font-mono text-xs leading-relaxed">{p.prompt}</p>
                      <CopyButton text={p.prompt} label="Copy prompt" className="mt-3 border-paper! text-paper" />
                    </div>
                  )}
                  <p className="mt-4 text-sm text-muted">Use: {p.tools.map((id) => resources.find((x) => x.id === id)).filter(Boolean).map((x, i) => <span key={x!.id}>{i > 0 && ', '}<a className="link text-ink" href={x!.url} target="_blank" rel="noreferrer">{x!.name}</a></span>)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  )
}

// ─── Motion: the feel, and the moments people remember ───────────────────────

function Motion({ r, look, editHref }: { r: UniversalRecipe; look: Look; editHref: Edit }) {
  return (
    <div className="space-y-14">
      <div>
        <Heading title={`Movement — ${r.motion.level.name}`}><ChangeLink href={editHref('motion')} /></Heading>
        <p className="mt-2 max-w-2xl text-ink-2">{r.motion.principle}</p>
        <ul className="mt-5 flex flex-wrap gap-2">{r.motion.patterns.map((p) => <li key={p.id} className="rounded-full border border-line bg-white px-3 py-1.5 text-sm">{p.name}</li>)}</ul>
      </div>
      {r.concept && (
        <div>
          <Heading title={`Big idea — ${r.concept.name}`}><ChangeLink href={editHref('idea')} /></Heading>
          <p className="mt-2 max-w-2xl text-ink-2">{r.concept.line} {r.concept.why}</p>
          <dl className="mt-5 grid max-w-4xl gap-4 text-sm md:grid-cols-2">
            {([['What guides the scroll', r.concept.motif], ['How each part opens', r.concept.chapters], ['The moment people remember', r.concept.moment], ['How the site ends', r.concept.ending]] as const).map(([k, v]) => (
              <div key={k} className="rounded-lg border border-line bg-white p-4"><dt className="text-xs text-muted">{k}</dt><dd className="mt-1 text-ink-2">{v}</dd></div>
            ))}
          </dl>
        </div>
      )}
      <div>
        <Heading title="Special touches"><ChangeLink href={editHref('touches')} /></Heading>
        {r.signatures.length ? (
          <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {r.signatures.map((s) => (
              <li key={s.id} className="overflow-hidden rounded-lg border border-line bg-white">
                <OptionDemo id={`sig:${s.id}`} {...look} />
                <div className="p-4">
                  <p className="text-xs text-muted">{s.where}</p>
                  <p className="mt-0.5 font-medium">{s.name}</p>
                  <p className="mt-1.5 text-sm text-ink-2">{s.experience}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="mt-4 text-sm text-muted">None — this recipe keeps interaction deliberately quiet.</p>}
      </div>
      {r.pieces.length > 0 && (
        <div>
          <Heading title="Your kit"><ChangeLink href="/kit?step=pages" label="Open in the showcase" /></Heading>
          <p className="mt-2 max-w-2xl text-sm text-ink-2">Ready components — their code ships in your Build Package (src/components/pieces/), already in your colours and fonts.</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {r.pieces.map((p) => (
              <li key={p.id} className="overflow-hidden rounded-lg border border-line bg-white">
                <PieceDemo id={p.id} colors={look.colors} fonts={{ display: look.type.display.family, body: look.type.body.family, utility: look.type.utility.family }} />
                <div className="p-4">
                  <p className="text-xs text-muted">{p.where}</p>
                  <p className="mt-0.5 font-medium">{p.name}</p>
                  <p className="mt-1.5 text-sm text-ink-2">{p.line}</p>
                  {p.issue && <p className="mt-2 text-sm text-warn">{p.issue}</p>}
                  <p className="mt-2 text-xs text-muted">Adapted from {p.source.library} (MIT)</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {r.media.storytelling && (
        <div>
          <Heading title="How the film tells your story" />
          <ol className="mt-4 max-w-3xl list-decimal space-y-1.5 pl-5 text-sm text-ink-2">{r.media.storytelling.map((x) => <li key={x}>{x}</li>)}</ol>
        </div>
      )}
    </div>
  )
}

function Locked({ what, onUnlock }: { what: string; onUnlock: () => void }) {
  return (
    <div className="mx-auto max-w-lg rounded-lg border border-dashed border-muted p-8 text-center">
      <p className="text-lg font-medium">{what} are part of the full recipe.</p>
      <p className="mt-2 text-sm text-ink-2">Unlock to download a build kit for Claude Code, Cursor, v0 or Lovable — with your files included.</p>
      <button type="button" className="btn btn-ink mt-5" onClick={onUnlock}>See what&apos;s included</button>
    </div>
  )
}

/** The palette in context — a small UI rendered with the recipe's own colors. */
function PalettePreview({ colors: c, recipe }: { colors: PaletteColors; recipe: UniversalRecipe }) {
  const t = recipe.visualSystem.typography
  const sh = recipe.visualSystem.shape
  return (
    <div className="overflow-hidden rounded-lg border border-line" style={{ background: c.background, color: c.text }}>
      <div className="flex items-center justify-between px-5 py-3 text-xs" style={{ borderBottom: `1px solid ${c.border}`, fontFamily: `'${t.utility.family}'` }}><span>Studio</span><span style={{ color: c.muted }}>Work · About · <span style={{ color: c.accent }}>Contact</span></span></div>
      <div className="p-5">
        <p style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontSize: '2rem', lineHeight: 1, letterSpacing: t.display.letterSpacing }}>{recipe.contentDirection.headlineExamples[0]}</p>
        <p className="mt-3 text-sm" style={{ color: c.muted, fontFamily: `'${t.body.family}'` }}>Secondary text uses the muted role. Links use the <span style={{ color: c.accent }}>accent</span>, sparingly.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 text-sm" style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: sh.card }}>Surface card</div>
          <div className="p-3 text-sm" style={{ background: c.secondary, borderRadius: sh.card }}>Secondary</div>
        </div>
        <div className="mt-4 flex gap-2 text-sm"><span className="px-4 py-2" style={{ background: c.primary, color: c.background, borderRadius: sh.button }}>Primary action</span><span className="px-4 py-2" style={{ border: `1px solid ${c.border}`, borderRadius: sh.button }}>Secondary</span></div>
      </div>
    </div>
  )
}

/** A tiny form in the recipe's own colors and shape: how its selects, date picker and toggles will look. */
function ControlsPreview({ colors: c, r }: { colors: PaletteColors; r: UniversalRecipe }) {
  const sh = r.visualSystem.shape
  const t = r.visualSystem.typography
  const field = { background: c.surface, border: `1px solid ${c.muted}`, borderRadius: sh.button === '999px' ? '999px' : sh.card, color: c.text }
  return (
    <div aria-hidden className="space-y-3 rounded-lg border border-line p-5 text-sm" style={{ background: c.background, color: c.text, fontFamily: `'${t.body.family}'` }}>
      <div className="grid grid-cols-2 gap-3">
        <div><p className="mb-1 text-xs" style={{ color: c.muted }}>Date</p><div className="flex items-center justify-between px-3 py-2" style={field}><span>Fri 12 Oct</span><span style={{ color: c.muted }}>▾</span></div></div>
        <div><p className="mb-1 text-xs" style={{ color: c.muted }}>Guests</p><div className="flex items-center justify-between px-3 py-2" style={field}><span>2 people</span><span style={{ color: c.muted }}>▾</span></div></div>
      </div>
      <div className="p-3" style={{ ...field, borderRadius: sh.card }}>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} style={{ color: c.muted }}>{d}</span>)}
          {[...Array(14)].map((_, i) => <span key={i} className="py-1" style={i === 11 ? { background: c.primary, color: c.background, borderRadius: sh.button === '0px' ? 0 : '999px' } : undefined}>{i + 1}</span>)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center text-[10px]" style={{ background: c.primary, color: c.background, borderRadius: sh.button === '0px' ? 0 : 4 }}>✓</span>Window seat</span>
        <span className="flex items-center gap-2">Reminders<span className="relative h-5 w-9 rounded-full" style={{ background: c.primary }}><span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full" style={{ background: c.background }} /></span></span>
      </div>
      <div className="flex justify-center px-4 py-2.5" style={{ background: c.primary, color: c.background, borderRadius: sh.button }}>{r.contentDirection.ctaExamples[0]}</div>
    </div>
  )
}
