'use client'
import { Check, Circle, Pencil, Plus, Search, TriangleAlert } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { PaletteEditor } from '@/components/PaletteEditor'
import { SitePreview, previewFromRecipe } from '@/components/SitePreview'
import { TypeSpecimen } from '@/components/TypeSpecimen'
import { CopyButton } from '@/components/ui'
import { lockedSections } from '@/config/pricing'
import { layouts, palettes, typography } from '@/data/ingredients'
import { inspirationSources } from '@/data/patterns'
import { resources } from '@/data/resources'
import { directions, leads, motionLevels, purposes } from '@/data/taxonomy'
import { useAccess } from '@/features/billing'
import { CheckoutDialog } from '@/features/billing/CheckoutDialog'
import { BuildPanel } from '@/features/build-packages/BuildPanel'
import type { LayoutId, LeadId, MotionLevel, PageSection, PaletteColors, PaletteId, RecipeSpec, TypographyId, UniversalRecipe } from '@/types/domain'
import { heroOptions, remix } from './engine'
import { markRecent, toggleSaved, useSaved } from './library'
import { recipeSections, recipeToMarkdown, type RecipeSectionKey } from './markdown'

const TOC: { id: string; label: string; md?: RecipeSectionKey }[] = [
  { id: 'direction', label: 'Creative Direction', md: 'direction' },
  { id: 'visual', label: 'Visual System', md: 'color' },
  { id: 'structure', label: 'Page Structure', md: 'structure' },
  { id: 'components', label: 'Components', md: 'components' },
  { id: 'media', label: 'Media', md: 'media' },
  { id: 'motion', label: 'Motion', md: 'motion' },
  { id: 'signatures', label: 'Signature Moments', md: 'signatures' },
  { id: 'assets', label: 'Asset Checklist', md: 'assets' },
  { id: 'resources', label: 'Resources', md: 'resources' },
  { id: 'references', label: 'References', md: 'references' },
  { id: 'why', label: 'Why It Works', md: 'why' },
  { id: 'implementation', label: 'Implementation', md: 'implementation' },
  { id: 'build', label: 'Build with…' },
]

const STATUS: Record<string, { label: string; mark: typeof Check; cls: string }> = {
  have: { label: 'Have it', mark: Check, cls: 'text-ink' },
  create: { label: 'Create it', mark: Pencil, cls: 'text-pencil' },
  find: { label: 'Find it', mark: Search, cls: 'text-ink-2' },
  temporary: { label: 'Temporary placeholder', mark: TriangleAlert, cls: 'text-warn' },
  optional: { label: 'Optional', mark: Circle, cls: 'text-muted' },
}

export function RecipeDocument({ recipe, recipeRef, onRemix }: { recipe: UniversalRecipe; recipeRef: string; onRemix: (spec: RecipeSpec) => void }) {
  const { unlocked } = useAccess(recipeRef)
  const saved = useSaved().some((s) => s.ref === recipeRef)
  const [checkout, setCheckout] = useState(false)
  const [remixOpen, setRemixOpen] = useState(false)
  const r = recipe
  const spec = r.metadata.spec
  const colors = Object.fromEntries(r.visualSystem.palette.tokens.map((t) => [t.role, t.hex])) as PaletteColors

  useEffect(() => { markRecent(recipeRef) }, [recipeRef])

  const locked = (k?: RecipeSectionKey) => !unlocked && !!k && lockedSections.includes(k)
  // Stable component identity so <details> state survives unrelated re-renders (save, checkout).
  const Section = useMemo(() => function Section(p: { id: string; title: string; children: ReactNode; md?: RecipeSectionKey }) {
    return <DocSection {...p} recipe={r} isLocked={!unlocked && !!p.md && lockedSections.includes(p.md)} onUnlock={() => setCheckout(true)} />
  }, [r, unlocked])

  return (
    <article className="mx-auto max-w-[1440px] px-5 pb-24 md:px-8">
      {/* Header */}
      <header className="grid gap-10 pb-14 pt-10 lg:grid-cols-[5fr_7fr] lg:pt-16">
        <div className="flex flex-col">
          <p className="text-sm text-muted">{purposes[spec.purpose].name} · {directions[spec.direction].name} · {r.metadata.complexity} build</p>
          <h1 className="display mt-4 text-[clamp(2.6rem,5.4vw,5rem)]">{r.title}</h1>
          <p className="prose-serif mt-5 max-w-lg text-ink-2">{r.summary}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            <button type="button" className="btn btn-ink btn-sm" onClick={() => setRemixOpen((o) => !o)} aria-expanded={remixOpen} aria-controls="remix">Remix</button>
            <button type="button" className="btn btn-line btn-sm" aria-pressed={saved} onClick={() => toggleSaved(recipeRef)}>{saved ? 'Saved' : 'Save recipe'}</button>
            {unlocked ? <CopyButton text={() => recipeToMarkdown(r)} label="Copy full recipe" /> : <button type="button" className="btn btn-line btn-sm" onClick={() => setCheckout(true)}>Unlock full recipe</button>}
          </div>
          {unlocked && <p className="mt-4 text-sm text-pencil">Full recipe unlocked.</p>}
        </div>
        <div>
          <SitePreview {...previewFromRecipe(r, { brand: purposes[spec.purpose].name === 'Restaurant' ? 'Maison' : 'Studio' })} className="rounded-lg border border-line" />
          <p className="mt-3 text-sm text-muted">Live preview: {r.visualSystem.typography.name} type, {r.visualSystem.palette.name} palette, {layouts[r.layoutSystem.id].name.toLowerCase()} layout, {r.motion.level.name.toLowerCase()} motion.</p>
        </div>
      </header>

      {remixOpen && <RemixPanel spec={spec} onChange={(s) => onRemix(s)} />}

      <div className="grid gap-10 lg:grid-cols-[13rem_1fr]">
        <nav aria-label="Recipe sections" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1.5 text-sm">
            {TOC.map((t) => <li key={t.id}><a href={`#${t.id}`} className="text-ink-2 hover:text-pencil">{t.label}{locked(t.md) && <span className="text-muted"> · locked</span>}</a></li>)}
          </ol>
        </nav>

        <div className="min-w-0">
          <Section id="direction" title="Creative Direction" md="direction">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted">Mood</p>
                <p className="mt-1 text-2xl tracking-tight">{r.creativeDirection.mood.join(', ')}</p>
                <p className="mt-6 text-sm text-muted">Personality</p>
                <p className="prose-serif mt-1">{r.creativeDirection.personality}</p>
                <p className="mt-6 text-sm text-muted">Design principles</p>
                <ul className="prose-serif mt-1 list-disc space-y-1 pl-5">{r.designPrinciples.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                <List title="Do" items={r.creativeDirection.do} />
                <List title="Avoid" items={r.creativeDirection.avoid} />
                <div className="sm:col-span-2 md:col-span-1 xl:col-span-2"><List title="Not the generic AI look" items={r.creativeDirection.genericAvoid} /></div>
              </div>
            </div>
          </Section>

          <Section id="visual" title="Visual System" md="color">
            <h3 className="text-xl font-medium">Palette: {r.visualSystem.palette.name}</h3>
            <div className="mt-4 grid gap-6 xl:grid-cols-[1fr_1fr]">
              <PalettePreview colors={colors} recipe={r} />
              <table className="w-full text-sm">
                <thead className="text-left text-muted"><tr><th className="pb-2 font-normal">Role</th><th className="pb-2 font-normal">Hex</th><th className="pb-2 font-normal">Usage</th></tr></thead>
                <tbody>
                  {r.visualSystem.palette.tokens.map((t) => (
                    <tr key={t.role} className="border-t border-line align-top">
                      <td className="py-2 pr-3"><span className="flex items-center gap-2 capitalize"><span className="h-4 w-4 rounded-full ring-1 ring-black/10" style={{ background: t.hex }} />{t.role}</span></td>
                      <td className="py-2 pr-3 font-mono text-xs">{t.hex}</td>
                      <td className="py-2 text-ink-2">{t.usage}{t.contrast && <span className="block text-xs text-muted">{t.contrast}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-medium">Typography: {r.visualSystem.typography.name}</h3>
              <CopyButton text={() => recipeSections.typography(r)} label="Copy typography" />
            </div>
            <div className="mt-4"><TypeSpecimen t={r.visualSystem.typography} colors={{ bg: colors.background, fg: colors.text, muted: colors.muted }} /></div>
            <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-xl font-medium">Layout, spacing and grid: {r.layoutSystem.name}</h3>
              <CopyButton text={() => recipeSections.layout(r)} label="Copy layout" />
            </div>
            <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
              {([['Container', r.layoutSystem.container], ['Grid', r.layoutSystem.grid], ['Columns', r.layoutSystem.columns], ['Gutters', r.layoutSystem.gutters], ['Section spacing', r.layoutSystem.sectionSpacing], ['Alignment', r.layoutSystem.alignment], ['Hero composition', r.layoutSystem.heroComposition], ['Card proportions', r.layoutSystem.cardProportions], ['Media proportions', r.layoutSystem.mediaProportions]] as const).map(([k, v]) => (
                <div key={k} className="border-t border-line pt-2"><dt className="text-muted">{k}</dt><dd className="mt-0.5">{v}</dd></div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-ink-2">Spacing scale ({r.visualSystem.spacing.base} base): {r.visualSystem.spacing.scale.join(' · ')}. {r.visualSystem.spacing.note}</p>
          </Section>

          <Section id="structure" title="Page Structure" md="structure">
            <div className="space-y-8">
              {r.pages.map((p) => (
                <div key={p.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{p.label}</h3>
                    <span className="pencil">{p.type}</span>
                  </div>
                  <p className="mt-1 text-sm text-ink-2">{p.purpose}</p>
                  {p.sections.length > 0 && <div className="mt-3"><SectionList sections={p.sections} keyPrefix={p.id} /></div>}
                </div>
              ))}
              <div>
                <h3 className="font-medium">Site Chrome</h3>
                <p className="mt-1 text-sm text-ink-2">Shared across every page.</p>
                <div className="mt-3"><SectionList sections={[r.chrome.navbar, r.chrome.footer]} keyPrefix="chrome" /></div>
              </div>
            </div>
          </Section>

          <Section id="components" title="Components" md="components">
            <div className="grid gap-4 md:grid-cols-2">
              {r.components.map((c) => (
                <div key={c.id} className="border-t border-line pt-3">
                  <p className="font-mono text-sm">{`<${c.id} />`}</p>
                  <p className="mt-1">{c.purpose}</p>
                  <p className="mt-1 text-sm text-muted">{c.anatomy}. {c.behavior}.</p>
                </div>
              ))}
            </div>
          </Section>

          <Section id="media" title={`Media: ${r.media.name}`} md="media">
            <p className="prose-serif max-w-2xl">{r.media.direction}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-medium">Hero: {r.media.hero.name}</h3>
                <dl className="mt-3 space-y-3 text-sm">
                  {([['Composition', r.media.hero.composition], ['Behavior', r.media.hero.behavior], ['Mobile', r.media.hero.responsive], ['Needs', r.media.hero.requires.join('; ')], ['If you don\'t have it', r.media.hero.fallback]] as const).map(([k, v]) => <div key={k}><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
                </dl>
              </div>
              <div>
                <List title="Treatment" items={r.media.treatment} />
                <p className="mt-4 text-sm text-muted">Formats: {r.media.formats}</p>
              </div>
            </div>
          </Section>

          <Section id="motion" title={`Motion: ${r.motion.level.name}`} md="motion">
            <p className="prose-serif max-w-2xl">{r.motion.principle} Animation for demonstration, not decoration.</p>
            <p className="mt-3 text-sm text-muted">Libraries: {r.motion.libraries.join(', ')}</p>
            <div className="mt-8 space-y-px overflow-hidden rounded-lg border border-line bg-line">
              {r.motion.patterns.map((p) => (
                <details key={p.id} className="group bg-white">
                  <summary className="flex cursor-pointer items-baseline justify-between gap-4 p-4 marker:content-none"><span className="font-medium">{p.name}</span><span className="text-sm text-muted">{p.duration} · {p.tech}</span></summary>
                  <dl className="grid gap-3 px-4 pb-5 text-sm md:grid-cols-2">
                    {([['Purpose', p.purpose], ['Trigger', p.trigger], ['Behavior', p.behavior], ['Easing', p.easing], ['Implementation', p.implementation], ['Performance', p.performance], ['Reduced motion', p.reducedMotion]] as const).map(([k, v]) => <div key={k}><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
                  </dl>
                </details>
              ))}
            </div>
          </Section>

          <Section id="signatures" title="Signature moments" md="signatures">
            <p className="prose-serif max-w-2xl">The small interactions people remember and share — each one placed on its own section of your site.</p>
            {r.signatures.length ? (
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {r.signatures.map((s) => (
                  <div key={s.id} className="rounded-lg border border-line bg-white p-5">
                    <p className="text-sm text-muted">{s.where}</p>
                    <p className="mt-1 font-medium">{s.name}</p>
                    <p className="mt-2 text-sm text-ink-2">{s.experience}</p>
                    <p className="mt-3 text-xs text-muted">On phones: {s.mobile}</p>
                  </div>
                ))}
              </div>
            ) : <p className="mt-4 text-sm text-muted">None — this recipe keeps interaction deliberately quiet.</p>}
          </Section>

          <Section id="assets" title="What you'll need" md="assets">
            <ul className="divide-y divide-line border-y border-line">
              {r.assetRequirements.map((a) => {
                const status = STATUS[a.status]
                return (
                  <li key={a.key} className="grid gap-1 py-3 sm:grid-cols-[1.5rem_1fr_10rem_12rem] sm:items-baseline">
                    <status.mark size={16} className={status.cls} aria-hidden />
                    <span><span className="font-medium">{a.label}</span> <span className="text-muted">· {a.quantity}</span><span className="block text-sm text-muted">{a.specs}</span></span>
                    <span className="text-sm capitalize text-ink-2">{a.level}</span>
                    <span className={`text-sm ${status.cls}`}>
                      {status.label}
                      {a.providedFiles ? <span className="block text-xs text-ink-2">{a.providedFiles.map((f) => f.name).join(', ')}</span>
                        : a.status === 'have' && <span className="block text-xs text-warn">No file attached yet</span>}
                    </span>
                  </li>
                )
              })}
            </ul>
            {r.assetRequirements.some((a) => a.status === 'temporary') && <p className="mt-4 text-sm text-warn">Temporary placeholders are marked in your Build Package. Replace them with your own assets before launch.</p>}
            {spec.lead === 'video' && r.assetRequirements.some((a) => a.asset === 'video' && a.level === 'required' && a.status !== 'have') && (
              <div className="mt-6 rounded-lg border border-pencil bg-pencil-soft/40 p-5">
                <p className="font-medium">This recipe needs a hero video.</p>
                <p className="mt-1 text-sm text-ink-2">You can upload one later, create one from an image (prompt below), use a temporary clip, or switch to the image-led variant.</p>
                <button type="button" className="btn btn-line btn-sm mt-4" onClick={() => onRemix(remix(spec, { lead: 'photography' }))}>Switch to image-led variant</button>
              </div>
            )}
            {r.assetCreationPaths.length > 0 && (
              <div className="mt-10 grid gap-6 xl:grid-cols-2">
                {r.assetCreationPaths.map((p) => (
                  <div key={p.title} className="rounded-lg border border-line bg-white p-5">
                    <h3 className="font-medium">{p.title}</h3>
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">{p.steps.map((s) => <li key={s}>{s}</li>)}</ol>
                    {p.settings && <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">{Object.entries(p.settings).map(([k, v]) => <div key={k}><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}</dl>}
                    {p.prompt && (
                      <div className="mt-4 rounded-md bg-ink p-4 text-paper">
                        <p className="font-mono text-xs leading-relaxed">{p.prompt}</p>
                        <CopyButton text={p.prompt} label="Copy prompt" className="mt-3 border-paper! text-paper" />
                      </div>
                    )}
                    <p className="mt-4 text-sm text-muted">Use: {p.tools.map((id) => resources.find((x) => x.id === id)).filter(Boolean).map((x, i) => <span key={x!.id}>{i > 0 && ', '}<a className="link text-ink" href={x!.url} target="_blank" rel="noreferrer">{x!.name}</a></span>)}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section id="resources" title="Curated Resources" md="resources">
            <ul className="grid gap-x-8 gap-y-5 md:grid-cols-2">
              {r.resources.map((id) => resources.find((x) => x.id === id)).filter(Boolean).map((x) => (
                <li key={x!.id} className="border-t border-line pt-3">
                  <a href={x!.url} target="_blank" rel="noreferrer" className="font-medium hover:text-pencil">{x!.name}</a> <span className="text-sm text-muted">{x!.category}</span>
                  <p className="mt-1 text-sm text-ink-2">{x!.why}</p>
                  <p className="mt-1 text-xs text-muted">{x!.license} · verified {x!.verifiedAt}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="references" title="References" md="references">
            <p className="mb-6 text-ink-2">Study the principle. Build something original.</p>
            <ul className="space-y-6">
              {r.references.map((x) => (
                <li key={x.title} className="grid gap-2 border-t border-line pt-3 md:grid-cols-[1fr_2fr]">
                  <div><a href={x.url} target="_blank" rel="noreferrer" className="font-medium hover:text-pencil">{x.title}</a><p className="text-sm text-muted">{inspirationSources.find((s) => s.id === x.source)?.name}</p></div>
                  <dl className="grid gap-2 text-sm sm:grid-cols-3">
                    <div><dt className="text-muted">What to study</dt><dd>{x.study}</dd></div>
                    <div><dt className="text-muted">Why it matters</dt><dd>{x.why}</dd></div>
                    <div><dt className="text-muted">Principle</dt><dd>{x.principle}</dd></div>
                  </dl>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="why" title="Why It Works" md="why">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {([['The visual direction', r.whyItWorks.direction], ['The typography', r.whyItWorks.typography], ['The palette', r.whyItWorks.palette], ['The layout', r.whyItWorks.layout], ['The motion', r.whyItWorks.motion], ['The chosen assets', r.whyItWorks.assets]] as const).map(([k, v]) => (
                <div key={k}><h3 className="font-medium">{k}</h3><p className="prose-serif mt-2 text-ink-2">{v}</p></div>
              ))}
            </div>
          </Section>

          <Section id="implementation" title="Implementation" md="implementation">
            <p><span className="text-muted">Stack:</span> {r.implementation.stack.join(', ')}</p>
            {r.implementation.dependencies.length > 0 && <ul className="mt-3 space-y-1 text-sm">{r.implementation.dependencies.map((d) => <li key={d.name}><code className="font-mono">{d.name}</code> <span className="text-muted">{d.why}</span></li>)}</ul>}
            <pre className="mt-6 overflow-x-auto rounded-lg bg-ink p-5 font-mono text-xs leading-relaxed text-paper">{r.implementation.fileStructure}</pre>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div><h3 className="font-medium">Sequence</h3><ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">{r.implementation.sequence.map((s) => <li key={s}>{s}</li>)}</ol></div>
              <List title="Responsive" items={r.implementation.responsive} />
              <List title="Accessibility" items={r.implementation.accessibility} />
              <List title="Performance" items={r.implementation.performance} />
            </div>
          </Section>

          <section id="build" aria-labelledby="build-h" className="scroll-mt-24 border-t border-ink pt-6">
            <h2 id="build-h" className="text-3xl font-medium tracking-tight md:text-4xl">How do you want to build it?</h2>
            <p className="mt-3 max-w-xl text-ink-2">Same Universal Recipe, packaged for the tool you use.</p>
            <div className="mt-8"><BuildPanel recipe={r} locked={!unlocked} onUnlock={() => setCheckout(true)} /></div>
          </section>
        </div>
      </div>

      <CheckoutDialog open={checkout} onClose={() => setCheckout(false)} recipeRef={recipeRef} recipeTitle={r.title} />
    </article>
  )
}

function DocSection({ id, title, children, md, recipe, isLocked, onUnlock }: { id: string; title: string; children: ReactNode; md?: RecipeSectionKey; recipe: UniversalRecipe; isLocked: boolean; onUnlock: () => void }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-ink pt-6 pb-16">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id={`${id}-h`} className="text-3xl font-medium tracking-tight md:text-4xl">{title}</h2>
        {md && !isLocked && <CopyButton text={() => recipeSections[md](recipe)} label="Copy section" />}
      </div>
      <div className="mt-8">{isLocked ? <Locked title={title} onUnlock={onUnlock} /> : children}</div>
    </section>
  )
}

function SectionList({ sections, keyPrefix }: { sections: PageSection[]; keyPrefix: string }) {
  return (
    <ol className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
      {sections.map((s, i) => (
        <li key={`${keyPrefix}-${s.id}`} className="bg-white">
          <details className="group">
            <summary className="flex cursor-pointer items-baseline gap-4 p-4 marker:content-none">
              <span className="w-6 text-sm tabular-nums text-muted">{i + 1}</span>
              <span className="flex-1 font-medium">{s.name}</span>
              <span className="hidden text-sm text-muted sm:block">{s.purpose}</span>
              <Plus size={16} className="shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden />
            </summary>
            <dl className="grid gap-4 px-4 pb-5 pl-14 text-sm md:grid-cols-2">
              {([['Composition', s.composition], ['Content', s.content], ['Behavior', s.behavior], ['Responsive', s.responsive]] as const).map(([k, v]) => <div key={k}><dt className="text-muted">{k}</dt><dd>{v}</dd></div>)}
              {s.note && <div className="md:col-span-2"><dt className="text-pencil">Recipe note</dt><dd>{s.note}</dd></div>}
            </dl>
          </details>
        </li>
      ))}
    </ol>
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div><h3 className="font-medium">{title}</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">{items.map((x) => <li key={x}>{x}</li>)}</ul></div>
}

function Locked({ title, onUnlock }: { title: string; onUnlock: () => void }) {
  return (
    <div className="rounded-lg border border-dashed border-muted p-6">
      <p className="font-medium">{title} is part of the full recipe.</p>
      <p className="mt-1 text-sm text-ink-2">Unlock to see every detail, copy it, and generate Build Packages for Claude Code, Cursor, v0 and Lovable.</p>
      <button type="button" className="btn btn-ink btn-sm mt-4" onClick={onUnlock}>See what&apos;s included</button>
    </div>
  )
}

/** The palette in context — a small UI rendered with the recipe's own colors. */
function PalettePreview({ colors: c, recipe }: { colors: PaletteColors; recipe: UniversalRecipe }) {
  const t = recipe.visualSystem.typography
  return (
    <div className="overflow-hidden rounded-lg border border-line" style={{ background: c.background, color: c.text }}>
      <div className="flex items-center justify-between px-5 py-3 text-xs" style={{ borderBottom: `1px solid ${c.border}`, fontFamily: `'${t.utility.family}'` }}><span>Studio</span><span style={{ color: c.muted }}>Work · About · <span style={{ color: c.accent }}>Contact</span></span></div>
      <div className="p-5">
        <p style={{ fontFamily: `'${t.display.family}'`, fontWeight: t.display.weight, fontSize: '2rem', lineHeight: 1, letterSpacing: t.display.letterSpacing }}>{recipe.contentDirection.headlineExamples[0]}</p>
        <p className="mt-3 text-sm" style={{ color: c.muted, fontFamily: `'${t.body.family}'` }}>Secondary text uses the muted role. Links use the <span style={{ color: c.accent }}>accent</span>, sparingly.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded p-3 text-sm" style={{ background: c.surface, border: `1px solid ${c.border}` }}>Surface card</div>
          <div className="rounded p-3 text-sm" style={{ background: c.secondary }}>Secondary</div>
        </div>
        <div className="mt-4 flex gap-2 text-sm"><span className="rounded-full px-4 py-2" style={{ background: c.primary, color: c.background }}>Primary action</span><span className="rounded-full px-4 py-2" style={{ border: `1px solid ${c.border}` }}>Secondary</span></div>
      </div>
    </div>
  )
}

function RemixPanel({ spec, onChange }: { spec: RecipeSpec; onChange: (s: RecipeSpec) => void }) {
  const d = directions[spec.direction]
  const change = (c: Partial<RecipeSpec>) => onChange(remix(spec, c))
  const heroes = heroOptions(spec.lead, spec.motion)
  const colors = { ...palettes[spec.palette].colors, ...spec.customPalette }
  const Select = <T extends string>({ label, value, options, on }: { label: string; value: T; options: [T, string][]; on: (v: T) => void }) => (
    <label className="text-sm"><span className="text-muted">{label}</span>
      <select value={value} onChange={(e) => on(e.target.value as T)} className="mt-1 block w-full rounded-md border border-line bg-white px-3 py-2.5">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  )
  return (
    <section id="remix" aria-label="Remix" className="mb-14 rounded-xl border border-ink bg-white p-5 md:p-7">
      <p className="text-xl font-medium">Remix</p>
      <p className="mt-1 text-sm text-ink-2">Change one ingredient. Only the parts that depend on it update — the rest of the recipe stays as it is.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Select<PaletteId> label="Palette" value={spec.palette} on={(v) => change({ palette: v })} options={(Object.keys(palettes) as PaletteId[]).map((p) => [p, `${palettes[p].name}${d.palettes.includes(p) ? '' : ' (off-direction)'}`])} />
        <Select<TypographyId> label="Font pairing" value={spec.typography} on={(v) => change({ typography: v })} options={(Object.keys(typography) as TypographyId[]).map((t) => [t, typography[t].name])} />
        <Select<LayoutId> label={d.layoutLocked ? `Layout (set by ${d.name})` : 'Layout'} value={spec.layout} on={(v) => change({ layout: v })} options={(Object.keys(layouts) as LayoutId[]).map((l) => [l, layouts[l].name])} />
        <Select<LeadId> label="Media" value={spec.lead} on={(v) => change({ lead: v })} options={(Object.keys(leads) as LeadId[]).map((l) => [l, leads[l].name])} />
        <Select<MotionLevel> label="Motion intensity" value={spec.motion} on={(v) => change({ motion: v })} options={(Object.keys(motionLevels) as MotionLevel[]).map((m) => [m, motionLevels[m].name])} />
        <Select<string> label="Hero" value={spec.hero ?? heroes[0]?.id ?? ''} on={(v) => change({ hero: v as RecipeSpec['hero'] })} options={heroes.map((h) => [h.id, h.name])} />
      </div>
      <details className="mt-6">
        <summary className="cursor-pointer text-sm link">Customize palette colors</summary>
        <div className="mt-4"><PaletteEditor colors={colors} changed={!!spec.customPalette} onReset={() => onChange({ ...spec, customPalette: undefined })} onChange={(c) => onChange({ ...spec, customPalette: c })} /></div>
      </details>
    </section>
  )
}
