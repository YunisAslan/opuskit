'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
// OpusKit section — Case Study preview: one project in depth — wide media, facts, then problem / approach / result.
// Immersive: on desktop the media pins while the text advances; with several chapters (one shot each) the pinned media
// crossfades to the chapter being read. Phones and reduced motion get a plain vertical list with each media inline.
export type CaseChapter = { key: string; media: ReactNode; facts: { label: string; value: string }[]; paragraphs: string[] }

export function CaseStudySection({ title, intro, chapters }: { title: string; intro?: string; chapters: CaseChapter[] }) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const many = chapters.length > 1

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
    }, { rootMargin: '-45% 0px -45% 0px' })
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const facts = (c: CaseChapter) => (
    <dl className="grid grid-cols-3 gap-4 border-t border-(--color-border) pt-4">
      {c.facts.map((f) => <div key={f.label}><dt className="type-utility text-(--color-muted)">{f.label}</dt><dd className="type-body mt-1">{f.value}</dd></div>)}
    </dl>
  )

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12">
        {/* Pinned media stack — desktop, full motion only */}
        <div className="hidden lg:col-span-7 lg:motion-safe:block">
          <div className="sticky top-[14svh]">
            <div className="relative aspect-video">
              {chapters.map((c, i) => (
                <div key={c.key} aria-hidden={i !== active} className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>{c.media}</div>
              ))}
            </div>
            {many && (
              <ol className="type-utility mt-4 flex gap-6">
                {chapters.map((c, i) => (
                  <li key={c.key}>
                    <button type="button" onClick={() => refs.current[i]?.scrollIntoView({ block: 'center' })}
                      className={`min-h-11 border-t pt-2 transition-colors duration-150 ${i === active ? 'border-(--color-accent) text-(--color-text)' : 'border-(--color-border) text-(--color-muted) hover:text-(--color-text)'}`}>
                      <span className="tabular-nums">{i + 1}/{chapters.length}</span> {c.key}
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        <div className="lg:col-span-12 lg:motion-safe:col-span-4 lg:motion-safe:col-start-9">
          <h2 className="type-heading">{title}</h2>
          {intro && <p className="type-body mt-4 max-w-[52ch] text-(--color-muted)">{intro}</p>}
          <div className="mt-10 space-y-20 lg:motion-safe:mt-0 lg:motion-safe:space-y-0">
            {chapters.map((c, i) => (
              <div key={c.key} ref={(el) => { refs.current[i] = el }} data-i={i}
                className={`grid gap-8 lg:motion-safe:flex lg:motion-safe:flex-col lg:motion-safe:justify-center lg:motion-safe:gap-6 ${many ? 'lg:motion-safe:min-h-[90svh]' : 'lg:motion-safe:pt-[10svh]'} lg:grid-cols-12 lg:motion-safe:grid-cols-1`}>
                <div className="lg:col-span-7 lg:motion-safe:hidden">{c.media}</div>
                <div className="lg:col-span-4 lg:col-start-9">
                  {many && <h3 className="type-heading mb-6 [font-size:clamp(1.15rem,1.6vw,1.4rem)]">{c.key}</h3>}
                  {facts(c)}
                  <div className={`type-body mt-6 space-y-5 ${many ? '' : 'lg:motion-safe:space-y-[22svh] lg:motion-safe:pb-[20svh]'}`}>
                    {c.paragraphs.map((p, j) => <p key={j} className="max-w-[46ch]">{p}</p>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
