// OpusKit section — Case Study preview (media "full"), made this site's own. It opens with the project's own map
// (the same square picture the Selected Work list shows, so it arrives by PhotoMorph) and the page's remembered
// moment, "Notes in the margin": Ines's pencil notes sit in the margins with marker arrows drawn into the map, the
// way she annotates a proof. Then the wide 21:9 picture (clip reveal, slight drift), the facts in three columns and
// the story in three short paragraphs, ending on the quiet way to ask for one like it.
// Phones: the map full width, the notes under it as a short list, each with its arrow pointing up at the map.
// Reduced motion: the arrows and notes fade in instead of drawing.
import { MediaAsset } from '@/components/MediaAsset'
import { ClipReveal, Cut, Drift } from '@/components/motion'
import { PhotoMorph } from '@/components/pieces/PhotoMorph'
import { CopyEmail } from '@/components/site/CopyEmail'
import { featuredFor, type ProjectSlug } from '@/config/assets'
import { project as copy, type ProjectEntry } from '@/content/site'

const s = (d: number, t = 700) => ({ '--d': `${d}ms`, '--t': `${t}ms` }) as React.CSSProperties
const pen = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, vectorEffect: 'non-scaling-stroke' as const, pathLength: 1, 'data-stroke': '' }

/** A marker arrow drawn from a note toward the map; `dir` is which way it points. */
function Arrow({ dir, delay, className = '' }: { dir: 'right' | 'left' | 'left-up' | 'up'; delay: number; className?: string }) {
  const paths = {
    right: ['M4 30 C 40 6, 90 4, 132 22', 'M118 10 L 133 22 L 116 31'],
    left: ['M136 14 C 100 34, 50 38, 8 22', 'M22 11 L 7 22 L 23 32'],
    'left-up': ['M136 40 C 100 40, 40 34, 10 8', 'M10 24 L 9 7 L 26 9'],
    up: ['M20 46 C 14 32, 16 18, 22 4', 'M12 14 L 22 3 L 31 13'],
  }[dir]
  const box = dir === 'up' ? '0 0 40 50' : '0 0 140 44'
  return (
    <svg viewBox={box} aria-hidden className={`overflow-visible text-(--color-accent) ${dir === 'up' ? 'h-10 w-8' : 'h-11 w-full max-w-[140px]'} ${className}`}>
      <path d={paths[0]} {...pen} style={s(delay, 600)} />
      <path d={paths[1]} {...pen} style={s(delay + 520, 200)} />
    </svg>
  )
}

export function CaseStudySection({ p, n }: { p: ProjectEntry; n: number }) {
  const [a, b, c] = p.notes
  const facts = [
    { label: copy.facts.client, value: p.client },
    { label: `${copy.facts.place}, ${copy.facts.year.toLowerCase()}`, value: `${p.place}, ${p.year}` },
    { label: copy.facts.role, value: p.role },
  ]
  const labels = ['The problem', 'What I did', 'What happened']
  return (
    <section aria-labelledby="project-title" className="px-(--gutter) pb-(--section-y) pt-28 md:pt-36">
      <div className="grid-site items-end gap-y-4">
        <h1 id="project-title" className="type-display col-span-full lg:col-span-9">{p.title}</h1>
        <p className="type-utility col-span-full text-(--color-muted) lg:col-span-3 lg:pb-3 lg:text-right">{p.kind}, <span className="tabular-nums">{p.year}</span></p>
      </div>

      {/* Notes in the margin */}
      <div className="draw-load grid-site mt-10 gap-y-6 lg:mt-14">
        <p className="sr-only">{copy.notesLabel}: {p.notes.join('; ')}.</p>
        <div aria-hidden className="hidden lg:col-span-3 lg:flex lg:flex-col lg:items-end lg:gap-3 lg:pt-[18%] lg:text-right">
          {a && <p data-note className="type-note max-w-[13ch] -rotate-2" style={s(700)}>{a}</p>}
          <Arrow dir="right" delay={850} />
        </div>
        <div className="col-span-full lg:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-(--radius-media)">
            <PhotoMorph name={p.slug}><MediaAsset id={featuredFor(n)} fill priority sizes="(min-width: 1024px) 50vw, 100vw" /></PhotoMorph>
          </div>
        </div>
        <div aria-hidden className="hidden lg:col-span-3 lg:flex lg:flex-col lg:justify-between lg:py-[8%]">
          {b && <div className="flex flex-col gap-3"><Arrow dir="left" delay={1150} /><p data-note className="type-note max-w-[14ch] rotate-1" style={s(1000)}>{b}</p></div>}
          {c && <div className="flex flex-col gap-3"><Arrow dir="left-up" delay={1450} /><p data-note className="type-note max-w-[14ch] -rotate-1" style={s(1300)}>{c}</p></div>}
        </div>
        <ul aria-hidden className="col-span-full grid gap-5 sm:grid-cols-3 lg:hidden">
          {p.notes.map((t, i) => <li key={t} className="flex items-start gap-2"><Arrow dir="up" delay={500 + i * 250} className="shrink-0" /><span data-note className="type-note" style={s(400 + i * 250)}>{t}</span></li>)}
        </ul>
      </div>

      {/* The wide picture */}
      <ClipReveal className="-mx-(--gutter) mt-(--section-y)">
        <Drift className="aspect-[4/3] sm:aspect-[21/9]"><MediaAsset id={`cover:${p.slug as ProjectSlug}`} fill sizes="100vw" /></Drift>
      </ClipReveal>

      <div className="grid-site mt-12 gap-y-12 md:mt-16">
        <Cut as="dl" className="col-span-full grid gap-6 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:content-start">
          {facts.map((f) => <div key={f.label} className="border-t border-(--color-text) pt-3"><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
        </Cut>
        <div className="col-span-full space-y-8 lg:col-span-7 lg:col-start-6">
          {p.story.map((t, i) => (
            <div key={i}>
              <p className="font-(family-name:--font-heading) [font-size:1.6rem] [font-weight:700] leading-none">{labels[i]}</p>
              <p className="type-body mt-2 max-w-[60ch]">{t}</p>
            </div>
          ))}
          <p className="type-body flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-(--color-border) pt-6">
            <span className="text-(--color-muted)">{copy.ask.line}</span><CopyEmail />
          </p>
        </div>
      </div>
    </section>
  )
}
