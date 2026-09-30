'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { SitePreview, previewFromDirection, type PreviewProps } from '@/components/SitePreview'
import { useInView } from '@/components/Reveal'
import { Swatches } from '@/components/ui'
import { img } from '@/data/images'
import { palettes, typography } from '@/data/ingredients'
import { directions, families, motionLevels } from '@/data/taxonomy'
import type { FamilyId, PaletteColors, TypographyPairing } from '@/types/domain'

const Wrap = ({ children, className = '' }: { children: React.ReactNode; className?: string }) =>
  <div className={`mx-auto max-w-[1440px] px-5 md:px-8 ${className}`}>{children}</div>

// ─── 2. Beautiful websites aren't magic ──────────────────────────────────────

const NEUTRAL: PaletteColors = { background: '#FFFFFF', surface: '#EFEFEF', text: '#2A2A2A', muted: '#8A8A8A', primary: '#2A2A2A', secondary: '#E5E5E5', accent: '#2A2A2A', border: '#E0E0E0' }
const PLAIN: TypographyPairing = {
  ...typography['grid-discipline'], googleFamilies: [],
  display: { ...typography['grid-discipline'].display, family: 'Arial', weight: 700, letterSpacing: '0' },
  heading: { ...typography['grid-discipline'].heading, family: 'Arial' }, body: { ...typography['grid-discipline'].body, family: 'Arial' }, utility: { ...typography['grid-discipline'].utility, family: 'Arial', uppercase: false },
}

const STEPS = [
  { name: 'Typography', text: 'A display face with character and a body face that disappears. Type sets the voice before anything else.' },
  { name: 'Color', text: 'Bottle green, pale ink and one pink note. Color decides the temperature of the whole experience.' },
  { name: 'Layout', text: 'An editorial grid: a big headline on eight columns, a portrait image on the other four.' },
  { name: 'Media', text: 'One photograph with the right light does more than ten decorative elements.' },
  { name: 'Motion', text: 'The image drifts, the headline rises. Slow enough to feel, never enough to distract.' },
]

export function Assembly() {
  const [step, setStep] = useState(-1)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.step))
    }, { rootMargin: '-45% 0px -45% 0px' })
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const final = previewFromDirection('luxury-editorial', { brand: 'Maison Vey', title: 'The Autumn Collection' })
  const p: PreviewProps = {
    ...final,
    type: step >= 0 ? final.type : PLAIN,
    colors: step >= 1 ? final.colors : NEUTRAL,
    layout: step >= 2 ? final.layout : 'balanced',
    noMedia: step < 3,
    motion: step >= 4 ? 'dynamic' : 'still',
  }

  return (
    <section className="border-t border-line bg-white py-20 md:py-28" aria-labelledby="magic">
      <Wrap>
        <h2 id="magic" className="display max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)]">Beautiful websites aren&apos;t magic.</h2>
        <p className="mt-5 max-w-lg text-lg text-ink-2">They&apos;re a handful of decisions, made well and made together. Scroll to add them one by one.</p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <ol className="order-2 lg:order-1">
            {STEPS.map((s, n) => (
              <li key={s.name} data-step={n} ref={(el) => { refs.current[n] = el }} className="flex min-h-[46vh] items-center border-t border-line py-8 last:min-h-[60vh]">
                <div className={`transition-opacity duration-500 ${step === n ? 'opacity-100' : 'opacity-35'}`}>
                  <p className="text-3xl font-medium tracking-tight md:text-5xl">{n > 0 && <span className="text-muted">+ </span>}{s.name}</p>
                  <p className="prose-serif mt-4 max-w-sm text-ink-2">{s.text}</p>
                </div>
              </li>
            ))}
            <li className="border-t border-ink py-8">
              <p className="text-3xl font-medium tracking-tight md:text-5xl">= Experience</p>
              <p className="prose-serif mt-4 max-w-sm text-ink-2">That combination, written down precisely, is a Recipe.</p>
            </li>
          </ol>
          <div className="order-1 lg:order-2">
            <div className="sticky top-20 z-10 lg:top-28">
              <SitePreview {...p} className="rounded-lg border border-line" />
              <p className="pencil mt-3" aria-live="polite">{step < 0 ? 'Nothing decided yet' : `+ ${STEPS[step].name}`}</p>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  )
}

// ─── 3. Inspiration → Recipe ─────────────────────────────────────────────────

export function InspirationToRecipe() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3)
  const d = directions['japanese-minimal']
  const pal = palettes['pink-plaster'].colors
  const t = typography['ink-and-paper']
  const stage = () => `transition-all duration-700 ease-out-expo ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`
  const delay = (n: number) => ({ transitionDelay: `${n * 220}ms` })

  return (
    <section className="py-20 md:py-28" aria-labelledby="insp">
      <Wrap>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="insp" className="display max-w-2xl text-[clamp(2.4rem,5vw,4.6rem)]">From a feeling to a plan.</h2>
          <p className="max-w-sm text-ink-2">You bring the taste. OpusKit names it, breaks it into ingredients, and writes the recipe.</p>
        </div>
        <div ref={ref} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stage title="Inspiration" n={0} className={stage()} style={delay(0)}>
            <img src={img('interior', 700)} alt="An empty Japanese room with tatami mats and shoji windows" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            <p className="mt-3 text-sm text-muted">&ldquo;Something calm, like this room.&rdquo;</p>
          </Stage>
          <Stage title="Direction" n={1} className={stage()} style={delay(1)}>
            <p className="text-3xl font-medium tracking-tight">{d.name}</p>
            <p className="prose-serif mt-3 text-ink-2">{d.description}</p>
            <p className="mt-6 flex flex-wrap gap-2">{d.mood.map((m) => <span key={m} className="rounded-full border border-line px-3 py-1 text-sm">{m}</span>)}</p>
          </Stage>
          <Stage title="Ingredients" n={2} className={stage()} style={delay(2)}>
            <dl className="space-y-4 text-sm">
              <div><dt className="text-muted">Palette</dt><dd><Swatches colors={Object.values(pal)} size="h-6 w-6" /></dd></div>
              <div><dt className="text-muted">Typography</dt><dd className="text-base">{t.display.family} + {t.body.family}</dd></div>
              <div><dt className="text-muted">Layout</dt><dd className="text-base">Asymmetric, 50% empty space</dd></div>
              <div><dt className="text-muted">Motion</dt><dd className="text-base">Subtle, single reveals</dd></div>
              <div><dt className="text-muted">Media</dt><dd className="text-base">6–10 photographs, warm grade</dd></div>
            </dl>
          </Stage>
          <Stage title="Recipe" n={3} className={stage()} style={delay(3)}>
            <div className="rounded-md bg-ink p-5 font-mono text-[12px] leading-relaxed text-paper/90">
              <p className="text-paper">Japanese Quiet Minimal</p>
              <p className="mt-3 text-paper/60">## Creative Direction</p><p>Mood: Still, Considered…</p>
              <p className="mt-2 text-paper/60">## Color System</p><p>background #EACDC3 …</p>
              <p className="mt-2 text-paper/60">## Motion System</p><p>Fade &amp; rise, 600ms …</p>
              <p className="mt-2 text-paper/60">## Asset Checklist</p><p>⌕ 6–10 images</p>
              <p className="mt-2 text-paper/60">## Why It Works</p><p>Restraint makes each…</p>
            </div>
            <Link href="/recipe/japanese-quiet-minimal" className="link mt-4 inline-block text-sm">Open this recipe</Link>
          </Stage>
        </div>
      </Wrap>
    </section>
  )
}

function Stage({ title, n, children, className, style }: { title: string; n: number; children: React.ReactNode; className: string; style: React.CSSProperties }) {
  return (
    <div className={`border-t border-ink pt-4 ${className}`} style={style}>
      <h3 className="mb-5 flex justify-between text-sm"><span>{title}</span><span className="text-muted">{n + 1} of 4</span></h3>
      {children}
    </div>
  )
}

// ─── 4. Choose visually ──────────────────────────────────────────────────────

const FEELINGS: FamilyId[] = ['quiet', 'editorial', 'cinematic', 'bold', 'raw', 'organic', 'experimental']

export function ChooseFeeling() {
  const [f, setF] = useState<FamilyId>('editorial')
  const d = directions[families[f].directions[0]]
  const p = previewFromDirection(d.id, { title: d.line })
  return (
    <section className="border-t border-line bg-white py-20 md:py-28" aria-labelledby="feel">
      <Wrap className="grid gap-12 lg:grid-cols-[4fr_8fr]">
        <div>
          <h2 id="feel" className="display text-[clamp(2.2rem,4.4vw,4rem)]">What should your website feel like?</h2>
          <p className="mt-5 text-ink-2">No design vocabulary needed. Pick a feeling and watch the direction change.</p>
          <div role="radiogroup" aria-label="Feeling" className="mt-8 flex flex-col">
            {FEELINGS.map((id) => (
              <button key={id} role="radio" aria-checked={f === id} onClick={() => setF(id)}
                className="group flex items-baseline justify-between border-b border-line py-3 text-left text-2xl tracking-tight transition-colors hover:text-ink aria-checked:text-ink text-muted">
                <span>{families[id].name}</span><span className="text-sm opacity-0 group-aria-checked:opacity-100 text-pencil">{families[id].line}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <SitePreview {...p} className="rounded-lg border border-line" />
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
            <div><dt className="text-muted">Direction</dt><dd className="mt-1 text-base">{d.name}</dd></div>
            <div><dt className="text-muted">Palette</dt><dd><Swatches colors={Object.values(p.colors).slice(0, 7)} /></dd></div>
            <div><dt className="text-muted">Type</dt><dd className="mt-1 text-base">{p.type.name}</dd></div>
            <div><dt className="text-muted">Motion</dt><dd className="mt-1 text-base">{motionLevels[p.motion].name}</dd></div>
          </dl>
          <Link href={`/kit?feel=${f}`} className="btn btn-ink mt-8">Continue with {families[f].name.toLowerCase()}</Link>
        </div>
      </Wrap>
    </section>
  )
}

// ─── 5. Ingredients ──────────────────────────────────────────────────────────

export function Ingredients() {
  const [ref, inView] = useInView<HTMLDivElement>(0.2)
  const pal = palettes['oxblood-room'].colors
  const tiles: { name: string; body: React.ReactNode; note: string }[] = [
    { name: 'Typography', note: 'Display, heading, body, utility — with sizes and spacing', body: <p className="text-5xl leading-none"><span style={{ fontFamily: 'var(--font-newsreader)' }} className="italic">Aa</span> <span className="font-semibold">Aa</span></p> },
    { name: 'Palette', note: 'Eight roles, each with a hex, a purpose and contrast', body: <Swatches colors={Object.values(pal)} size="h-7 w-7" /> },
    { name: 'Layout', note: 'Container, grid, gutters, rhythm', body: <div className="grid h-12 grid-cols-12 gap-1">{Array.from({ length: 12 }, (_, i) => <span key={i} className={i < 8 ? 'bg-paper/70' : 'bg-paper/25'} />)}</div> },
    { name: 'Hero', note: 'The first view, composed', body: <div className="flex h-12 items-end bg-paper/15 p-2"><span className="h-2 w-1/2 bg-paper" /></div> },
    { name: 'Motion', note: 'What moves, why, and the reduced-motion fallback', body: <div className="relative h-12"><span className={`absolute left-0 top-4 h-4 w-4 rounded-full bg-paper transition-transform duration-[1600ms] ease-out-expo ${inView ? 'translate-x-[9rem]' : ''}`} /></div> },
    { name: 'Media', note: 'What to shoot, find or generate', body: <><img src={img('cinematic', 500)} alt="" className="h-12 w-full object-cover opacity-80" loading="lazy" /></> },
    { name: 'Components', note: 'Only the ones this site needs', body: <p className="font-mono text-xs leading-5 text-paper/80">Navigation<br />ProjectCard · MediaSection</p> },
  ]
  return (
    <section className="bg-ink py-20 text-paper md:py-28" aria-labelledby="ingr">
      <Wrap>
        <h2 id="ingr" className="display max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)]">Your ingredients, written down.</h2>
        <p className="mt-5 max-w-lg text-lg text-paper/70">Every recipe specifies the same seven ingredients, so nothing is left for an AI to guess.</p>
        <div ref={ref} className="mt-14 grid gap-px bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, n) => (
            <div key={t.name} className={`bg-ink p-6 transition-all duration-700 ease-out-expo ${inView ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${n * 90}ms` }}>
              <div className="h-14">{t.body}</div>
              <h3 className="mt-6 text-xl font-medium">{t.name}</h3>
              <p className="mt-1 text-sm text-paper/60">{t.note}</p>
            </div>
          ))}
          <div className="flex flex-col justify-end bg-ink p-6">
            <Link href="/explore" className="link text-paper">See them in 10 recipes</Link>
          </div>
        </div>
      </Wrap>
    </section>
  )
}

// ─── 6. Asset reality ────────────────────────────────────────────────────────

export function AssetReality() {
  return (
    <section className="py-20 md:py-28" aria-labelledby="assets">
      <Wrap>
        <div className="grid gap-6 lg:grid-cols-2">
          <h2 id="assets" className="display text-[clamp(2.4rem,5vw,4.6rem)]">Some experiences need real media.</h2>
          <p className="prose-serif self-end text-ink-2">A scroll-controlled film needs a film. OpusKit tells you which assets a recipe depends on — and if you don&apos;t have them, how to create one from an image, where to find a temporary one, or which variant works without it.</p>
        </div>
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <AssetStep n={1} title="No video" text="The recipe needs a hero video. You don't have one — that's fine.">
            <div className="grid aspect-[4/5] place-items-center rounded-md border border-dashed border-muted text-sm text-muted">Hero video missing</div>
          </AssetStep>
          <AssetStep n={2} title="Existing image" text="You have a photograph with depth and a clear focal point.">
            <img src={img('landscape', 700)} alt="A lone tree in a foggy field" className="aspect-[4/5] w-full rounded-md object-cover" loading="lazy" />
          </AssetStep>
          <AssetStep n={3} title="Image → video" text="OpusKit writes the prompt: slow forward dolly, 5–8s, no cuts.">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md" data-motion="immersive">
              <div className="sp-media h-full"><img src={img('landscape', 700)} alt="" className="h-full w-full object-cover" loading="lazy" /></div>
              <p className="absolute inset-x-3 bottom-3 rounded bg-ink/80 p-2 font-mono text-[11px] leading-snug text-paper">Slow cinematic forward camera movement · 6s · 16:9</p>
            </div>
          </AssetStep>
          <AssetStep n={4} title="Scroll-driven" text="Now the recipe works: scroll moves the camera. Scroll this page to see it.">
            <div className="aspect-[4/5] overflow-hidden rounded-md">
              <img src={img('landscape', 700)} alt="" className="scrub-demo h-full w-full object-cover" loading="lazy" />
            </div>
          </AssetStep>
        </ol>
      </Wrap>
    </section>
  )
}

function AssetStep({ n, title, text, children }: { n: number; title: string; text: string; children: React.ReactNode }) {
  return (
    <li>
      {children}
      <h3 className="mt-4 flex items-baseline gap-3 text-lg font-medium"><span className="text-sm text-muted">{n}</span>{title}</h3>
      <p className="mt-1 text-sm text-ink-2">{text}</p>
    </li>
  )
}

// ─── 7. Build with your AI ───────────────────────────────────────────────────

export type ToolTree = { id: string; name: string; description: string; files: string[] }

export function BuildWithAI({ tools, recipeTitle }: { tools: ToolTree[]; recipeTitle: string }) {
  const [t, setT] = useState(tools[0].id)
  const tool = tools.find((x) => x.id === t)!
  return (
    <section className="border-t border-line bg-white py-20 md:py-28" aria-labelledby="build">
      <Wrap>
        <h2 id="build" className="display max-w-3xl text-[clamp(2.4rem,5vw,4.6rem)]">Build it with the AI you already use.</h2>
        <p className="mt-5 max-w-xl text-lg text-ink-2">OpusKit doesn&apos;t replace your AI development tool. It gives it the design context it&apos;s missing — in the format that tool actually reads.</p>
        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[4fr_1fr_7fr]">
          <div className="rounded-lg border border-ink p-6">
            <p className="text-sm text-muted">Universal Recipe</p>
            <p className="mt-2 text-2xl font-medium tracking-tight">{recipeTitle}</p>
            <p className="mt-4 text-sm text-ink-2">What to build and why. Identical for every tool.</p>
          </div>
          <div role="tablist" aria-label="AI tool" className="flex flex-row flex-wrap gap-2 lg:flex-col">
            {tools.map((x) => (
              <button key={x.id} role="tab" aria-selected={t === x.id} aria-controls="tool-panel" onClick={() => setT(x.id)}
                className="rounded-full border border-line px-4 py-2 text-left text-sm hover:border-ink aria-selected:border-ink aria-selected:bg-ink aria-selected:text-paper">{x.name}</button>
            ))}
          </div>
          <div id="tool-panel" role="tabpanel" className="rounded-lg bg-ink p-6 text-paper">
            <p className="text-paper/70">{tool.description}</p>
            <ul className="mt-5 space-y-1 font-mono text-[13px]">
              {tool.files.map((f) => <li key={f} className="truncate"><span className="text-paper/40">{f.includes('/') ? f.slice(0, f.lastIndexOf('/') + 1) : ''}</span>{f.slice(f.lastIndexOf('/') + 1)}</li>)}
            </ul>
          </div>
        </div>
      </Wrap>
    </section>
  )
}
