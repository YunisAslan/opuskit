import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ToolIcon } from '@/components/ToolIcon'
import { ShaderDither } from '@/pieces/ShaderDither'
import exampleSpecs from '@/data/example-specs.generated.json'
import { examples } from '@/data/examples'
import { directions, purposes } from '@/data/taxonomy'
import { adapters } from '@/features/build-packages'
import { composeRecipe } from '@/features/recipes/engine'
import type { RecipeSpec } from '@/types/domain'

// The landing page tells what OpusKit is today: the Library of real sites, the three building steps, the Build
// Package, and the sites made that way. Every picture and number here is the real thing (examples.ts, the engine).

const specs = exampleSpecs as Record<string, RecipeSpec>
const SHOWN = ['halden', 'maison-vey', 'fieldhouse', 'qum', 'sela-mor', 'aster-house', 'night-shift', 'kur-delta-watch']
const shown = SHOWN.map((s) => examples.find((e) => e.slug === s)!).filter(Boolean)
const short = (title: string) => title.split(/[,:—]/)[0].trim()

const STEPS = [
  { n: '01', where: 'Library', title: 'Collect sites you like', text: 'Browse built, working sites — real photos, real type, real motion. Take the ones that feel like yours into the Collection. Several are mixed into one.', href: '/library' },
  { n: '02', where: 'Brand', title: 'Make it yours', text: 'Your name and one sentence. Pick the look, the colours and the lettering, each shown as your own site — what fits comes first.', href: '/studio/brand' },
  { n: '03', where: 'Pages', title: 'Arrange every page', text: 'Each page with the parts it usually has, drawn in the design the build will get. Swap a design, add a part or an effect, move, remove.', href: '/studio/pages' },
  { n: '04', where: 'Recipe', title: 'Download, then build', text: 'A Build Package for your AI tool: the recipe, ready-made sections, the pictures each part needs and the checks it must pass.', href: '/library' },
]

export default async function Home() {
  // The package a real site was built from: its files and its shot list, shown as they ship.
  const recipe = composeRecipe(specs.halden)
  const pkg = await adapters['claude-code'].generate(recipe)
  const files = pkg.files.map((f) => f.path).filter((p) => !p.startsWith('.claude/') && !p.includes('/pieces/') && !p.includes('/sections/'))
  const sections = pkg.files.filter((f) => f.path.includes('/sections/')).length
  const shots = recipe.media.shots.slice(0, 4)
  const looks = new Set(Object.values(specs).map((s) => s.direction)).size

  return (
    <div className="overflow-x-clip">
      {/* ── Hero: what OpusKit does, said once and drawn once — sites you like in, your site out ── */}
      <section className="frame relative overflow-hidden">
        <div aria-hidden className="grid-paper pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_60%_at_50%_70%,black,transparent)]" />
        <div className="relative mx-auto max-w-4xl px-5 pb-12 pt-16 text-center md:pt-24">
          <p className="label flex items-center justify-center gap-2"><span className="dot-live" />{examples.length} sites built this way · live</p>
          <h1 className="display mt-6 text-[clamp(2.4rem,7vw,6.4rem)]">Pick sites you like.<br />Get your own.</h1>
          <p className="mx-auto mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2">OpusKit turns real, built sites into a recipe for yours — your name, colours, lettering and pages — and your AI tool builds the finished site from it.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/library" className="btn btn-ink">Start a site<ArrowRight size={16} aria-hidden /></Link>
            <Link href="/examples" className="btn btn-line bg-paper/70 backdrop-blur-sm">See what it builds</Link>
          </div>
        </div>
        <HeroFlow recipe={recipe} />
      </section>

      {/* ── The looks the library holds, running past ── */}
      <div className="frame overflow-hidden border-t border-line bg-paper-2/50">
        <div className="ticker flex w-max gap-10 py-3">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10" aria-hidden={k === 1}>
              {examples.map((e) => <span key={e.slug} className="label flex items-center gap-2 whitespace-nowrap"><span className="size-1.5 bg-pencil" />{short(e.title)} — {specs[e.slug] ? directions[specs[e.slug].direction].name : e.mood[0]}</span>)}
            </div>
          ))}
        </div>
      </div>

      {/* ── 01 How it works: four steps, four cells ── */}
      <section id="how" className="frame xm border-t border-line">
        <SectionHead n="01" name="How it works" note="Four steps, about ten minutes">
          From sites you like <br />to a site that is yours.
        </SectionHead>
        <ol className="grid gap-px border-y border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.n} className="flex flex-col bg-paper p-6 md:p-8">
              <div className="flex items-baseline justify-between"><span className="label">{s.where}</span><span className="label">{s.n}</span></div>
              <StepPicture i={i} />
              <h3 className="display mt-6 text-[1.6rem]">{s.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{s.text}</p>
              <Link href={s.href} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-ink hover:text-pencil"><span className="ulink">Open {s.where}</span><ArrowUpRight size={14} aria-hidden /></Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ── 02 The Build Package: what the AI tool receives ── */}
      <section id="package" className="keep-light relative overflow-hidden bg-ink text-paper">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ '--color-background': '#0A0A0C', '--color-accent': '#3A1B0E' } as React.CSSProperties}>
          <ShaderDither shape="wave" size={2} />
        </div>
        <div className="frame relative grid gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="label text-paper/50!">02 / The Build Package</p>
            <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.4rem)]">Everything your AI tool needs. Room for what it invents.</h2>
            <p className="mt-6 max-w-lg leading-relaxed text-paper/70">One zip, written for the tool you build with. It fixes what you chose — the words, the pictures each part needs, the checks the site must pass — and hands the builder what the best sites in your style are known for, so it composes, not just copies.</p>
            <dl className="mt-10 grid grid-cols-2 gap-px bg-paper/10">
              {[
                [String(sections), 'ready sections, in its design'],
                [String(recipe.media.shots.length), 'shots, each with its size'],
                [String(recipe.style.moves.length + recipe.style.sparks.length), 'moves and sparks of its style'],
                [String(files.length), 'recipe and build files'],
              ].map(([v, k]) => (
                <div key={k} className="bg-ink py-5 pr-5">
                  <dt className="sr-only">{k}</dt><dd className="display text-[2.6rem]">{v}</dd><dd className="label mt-1 text-paper/50!">{k}</dd>
                </div>
              ))}
            </dl>
            <p className="label mt-6 text-paper/40!">From the package Halden was built from</p>
          </div>
          <div className="grid gap-px self-start overflow-hidden rounded-[4px] border border-paper/10 bg-paper/10 font-mono text-[0.78rem] md:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-[#141417] p-5">
              <p className="label text-paper/40!">halden/</p>
              <ul className="mt-4 space-y-1.5 text-paper/80">
                {files.map((f) => <li key={f} className="flex gap-2"><span className="text-paper/30">{f.includes('/') ? '└' : '·'}</span>{f}</li>)}
                <li className="flex gap-2"><span className="text-paper/30">└</span>src/components/sections/ <span className="text-paper/40">×{sections}</span></li>
              </ul>
            </div>
            <div className="flex flex-col bg-[#141417] p-5">
              <p className="label text-paper/40!">recipe/design.md — room to invent</p>
              <ul className="mt-4 space-y-2.5 font-sans text-[0.82rem] leading-snug text-paper/75">
                {recipe.style.sparks.slice(0, 2).map((s) => <li key={s} className="flex gap-2"><span className="text-pencil">→</span>{s}</li>)}
              </ul>
              <p className="label mt-6 text-paper/40!">recipe/media.md — shot list</p>
              <ul className="mt-2 divide-y divide-paper/10">
                {shots.map((s) => (
                  <li key={s.key} className="py-2.5">
                    <div className="flex justify-between gap-3"><span className="text-pencil">{s.key}</span><span className="text-paper/40">{s.ratio} · {s.size}</span></div>
                    <p className="mt-1 font-sans text-[0.8rem] leading-snug text-paper/65">{s.shows}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 Proof: sites made this way ── */}
      <section className="frame xm">
        <SectionHead n="03" name="Made with OpusKit" note={`${examples.length} sites · ${looks} looks · all live`}>
          Real sites, <br />built from recipes.
        </SectionHead>
        <ul className="grid gap-x-6 gap-y-12 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {shown.map((e, i) => {
            const s = specs[e.slug]
            return (
              <li key={e.slug} className="group">
                <Link href={`/examples/${e.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-paper-2">
                    <Image src={`/examples/${e.slug}.jpg`} alt={`${e.title} — homepage`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="font-medium"><span className="ulink">{short(e.title)}</span></span>
                    <span className="label shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <p className="label mt-1.5">{s ? `${purposes[s.purpose].name} · ${directions[s.direction].name}` : e.mood.join(' · ')}</p>
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="flex justify-center p-12"><Link href="/examples" className="btn btn-line">All {examples.length} examples<ArrowRight size={16} aria-hidden /></Link></div>
      </section>

      {/* ── 04 Tools ── */}
      <section className="frame xm border-t border-line px-5 md:px-8">
        <div className="grid gap-10 py-16 md:grid-cols-[1fr_2fr] md:py-20">
          <div>
            <p className="label">04 / Build with</p>
            <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3rem)]">Your tool, its own package.</h2>
            <p className="mt-4 max-w-sm text-ink-2">Each package is written the way that tool reads: skills and a plan for Claude Code, rules for Cursor, one prompt for v0, knowledge for Lovable.</p>
          </div>
          <ul className="grid grid-cols-2 gap-px self-start border border-line bg-line">
            {(['claude-code', 'cursor', 'v0', 'lovable'] as const).map((id) => (
              <li key={id} className="flex flex-col justify-between gap-8 bg-paper p-6 transition-colors hover:bg-white md:p-8">
                <ToolIcon id={id} className="size-7" />
                <div><p className="font-medium">{adapters[id].name}</p><p className="mt-1 text-sm text-muted">{adapters[id].receives.slice(0, 2).join(' · ')}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="frame xm border-t border-line px-5 md:px-8">
        <div className="py-24 text-center md:py-32">
          <p className="label">Ten minutes from here</p>
          <h2 className="display-xl mx-auto mt-6 max-w-5xl text-[clamp(2.8rem,7.5vw,6.8rem)]">Start with a site you like.</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/library" className="btn btn-ink">Open the Library<ArrowRight size={16} aria-hidden /></Link>
            <Link href="/examples" className="btn btn-line">See the examples</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

/** The hero's drawing: four stations on one line — the sites you like, your choices, the recipe, the site your AI
 *  tool builds — with a signal travelling along it. Every value in it is real (Halden's recipe, the built sites). */
function HeroFlow({ recipe }: { recipe: ReturnType<typeof composeRecipe> }) {
  const t = recipe.visualSystem.typography
  const stations = [
    {
      n: '01', name: 'Sites you like', caption: 'Collect built sites from the Library',
      visual: (
        <div className="relative mx-auto h-full w-[86%]">
          {['halden', 'maison-vey', 'qum'].map((s, i) => (
            <div key={s} className="absolute w-[58%] overflow-hidden rounded-[3px] md:w-[72%] border border-ink/10 bg-white shadow-[0_12px_28px_-14px_rgb(14_14_16/.45)]" style={{ left: `${i * 14}%`, top: `${i * 16}%`, rotate: `${(i - 1) * 4}deg`, zIndex: i }}>
              <Image src={`/examples/${s}.jpg`} alt="" width={320} height={200} sizes="200px" className="aspect-[16/10] w-full object-cover object-top" />
              {i === 2 && <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-pencil text-[10px] text-paper">✓</span>}
            </div>
          ))}
        </div>
      ),
    },
    {
      n: '02', name: 'Make it yours', caption: 'Your name, colours, lettering, pages',
      visual: (
        <div className="mx-auto flex h-full w-[86%] flex-col gap-2 rounded-[3px] border border-line bg-white p-3 text-left shadow-[0_12px_28px_-18px_rgb(14_14_16/.35)]">
          <div className="flex items-baseline justify-between"><span className="text-[0.95rem] font-medium" style={{ fontFamily: `'${t.display.family}', serif` }}>Your name</span><span className="label">Aa · {t.display.family}</span></div>
          <div className="flex gap-1">{recipe.visualSystem.palette.tokens.slice(0, 6).map((c) => <span key={c.role} className="h-5 flex-1 rounded-[2px] border border-ink/10" style={{ background: c.hex }} />)}</div>
          <ul className="mt-auto space-y-1">{recipe.pages.slice(0, 3).map((p) => <li key={p.id} className="flex justify-between rounded-[2px] bg-paper-2 px-2 py-1 text-[0.7rem]"><span>{p.label}</span><span className="text-muted">{p.sections.length} parts</span></li>)}</ul>
        </div>
      ),
    },
    {
      n: '03', name: 'The recipe', caption: 'One Build Package for your AI tool',
      visual: (
        <div className="keep-light mx-auto flex h-full w-[86%] flex-col justify-center gap-1 rounded-[3px] bg-ink p-4 text-left font-mono text-[0.68rem] text-paper/75 shadow-[0_12px_28px_-14px_rgb(14_14_16/.5)]">
          <span className="mb-1 text-paper">your-site.zip</span>
          {['CLAUDE.md', 'recipe/design.md', 'recipe/content.md', 'recipe/media.md', 'build/verification.md'].map((f) => <span key={f}><span className="text-paper/35">└ </span>{f}</span>)}
        </div>
      ),
    },
    {
      n: '04', name: 'Your site', caption: 'Built by Claude Code, Cursor, v0 or Lovable',
      visual: (
        <div className="mx-auto flex h-full w-[86%] flex-col gap-2">
          <div className="relative flex-1 overflow-hidden rounded-[3px] border border-ink/10 bg-white shadow-[0_12px_28px_-14px_rgb(14_14_16/.45)]">
            {['fieldhouse', 'sela-mor', 'aster-house', 'night-shift'].map((s, i) => (
              <Image key={s} src={`/examples/${s}.jpg`} alt="" fill sizes="240px" className="take-turns object-cover object-top" style={{ animationDelay: `${i * 4}s` }} />
            ))}
          </div>
          <div className="flex justify-center gap-3">{(['claude-code', 'cursor', 'v0', 'lovable'] as const).map((id) => <ToolIcon key={id} id={id} className="size-4" />)}</div>
        </div>
      ),
    },
  ]
  return (
    <div className="xm relative border-t border-line">
      {/* The line the signal runs on, through the middle of every picture. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-[12.5%] top-[calc(2.35rem+6.25rem)] hidden h-px bg-line md:block">
        <span className="travel absolute -top-[3px] block size-[7px] -translate-x-1/2 rounded-full bg-pencil shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-pencil)_20%,transparent)]" />
      </div>
      <ol className="relative grid md:grid-cols-4">
        {stations.map((x, i) => (
          <li key={x.n} className={`flex flex-col border-line ${i ? 'max-md:border-t md:border-l' : ''}`}>
            <div className="flex items-baseline justify-between border-b border-line px-4 py-2.5"><span className="label">{x.n} · {x.name}</span>{i < 3 && <ArrowRight size={13} className="text-muted max-md:rotate-90" aria-hidden />}</div>
            <div className="relative h-44 px-4 pt-6">{x.visual}</div>
            <p className="px-4 pb-5 pt-6 text-center text-sm text-ink-2">{x.caption}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SectionHead({ n, name, note, children }: { n: string; name: string; note: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-6 px-5 py-14 md:grid-cols-[1fr_auto] md:items-end md:px-8 md:py-20">
      <div>
        <p className="label">{n} / {name}</p>
        <h2 className="display mt-6 text-[clamp(2.4rem,5.2vw,4.6rem)]">{children}</h2>
      </div>
      <span className="label md:text-right">{note}</span>
    </div>
  )
}


/** A small, real picture per step: the library's cards, a palette, a page's parts, the package. */
function StepPicture({ i }: { i: number }) {
  if (i === 0) return (
    <div className="mt-6 grid aspect-[4/3] grid-cols-2 gap-2 rounded-[3px] bg-paper-2 p-2">
      {['halden', 'maison-vey', 'fieldhouse', 'qum'].map((s, k) => (
        <div key={s} className="relative overflow-hidden rounded-[2px] bg-white">
          <Image src={`/examples/${s}.jpg`} alt="" fill sizes="160px" className="object-cover object-top" />
          {k === 1 && <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-ink text-[10px] text-paper">✓</span>}
        </div>
      ))}
    </div>
  )
  if (i === 1) return (
    <div className="mt-6 flex aspect-[4/3] flex-col justify-between rounded-[3px] bg-[#4A1119] p-5 text-[#F8ECE8]">
      <span className="text-[0.7rem] tracking-wide opacity-70">Maison Vey</span>
      <span className="text-[clamp(1.4rem,2.2vw,1.9rem)] leading-none" style={{ fontFamily: 'Didot, "Bodoni 72", serif' }}>A harbour wall<br />at twenty to six</span>
      <div className="flex gap-1.5">{['#4A1119', '#5A1A23', '#F8ECE8', '#D7B5B0', '#A9D6FF'].map((c) => <span key={c} className="h-4 flex-1 border border-white/20" style={{ background: c }} />)}</div>
    </div>
  )
  if (i === 2) return (
    <div className="mt-6 flex aspect-[4/3] flex-col gap-1.5 rounded-[3px] bg-paper-2 p-2.5">
      {['Menu', 'Film on the first screen', 'Services', 'Gallery', 'Reservation', 'Footer'].map((x, k) => (
        <div key={x} className={`flex flex-1 items-center justify-between rounded-[2px] px-2.5 text-[0.72rem] ${k === 0 || k === 5 ? 'bg-ink/5 text-muted' : 'bg-white'} ${k === 3 ? 'outline outline-1 outline-pencil' : ''}`}>
          <span>{x}</span>{k === 3 && <span className="text-pencil">Other designs</span>}
        </div>
      ))}
    </div>
  )
  return (
    <div className="keep-light mt-6 flex aspect-[4/3] flex-col justify-center gap-1.5 rounded-[3px] bg-ink p-4 font-mono text-[0.7rem] text-paper/75">
      {['CLAUDE.md', 'recipe/design.md', 'recipe/media.md', 'build/implementation-plan.md', 'build/verification.md', 'src/config/assets.ts'].map((f) => <span key={f}>· {f}</span>)}
      <span className="mt-2 text-[#FF8A5B]">→ claude “Read CLAUDE.md and build”</span>
    </div>
  )
}
