// Home — Hero, "Typographic statement": one sentence at display scale set on the raster, a small metadata row beneath.
// No image. The first screen is composed like a poster: two small labels pinned to the top corners at the menu's
// centre line (what this is; the studio's live time), the sentence broken by hand (three lines on desktop, four on
// phones), then the supporting line, the one action, and the facts in four columns. The single pink mark on the
// screen is the number of seats left. Lines reveal once, 80ms apart; nothing else moves.
import { hero } from '@/content/course'
import { nextCohort, seatsLeft, site } from '@/content/site'
import { ApplyButton } from './Apply'
import { StudioClock } from './StudioClock'

export function Hero() {
  const left = seatsLeft(nextCohort)
  const facts = [
    { k: 'Length', v: `${site.weeks} weeks, ${site.evenings} evenings` },
    { k: 'When', v: `${site.daysShort}, ${site.time} ${site.zoneLabel}` },
    { k: 'Where', v: `Our ${site.city} studio, or online` },
  ]
  return (
    <section className="relative flex min-h-svh flex-col px-(--gutter) pt-[calc(var(--nav-top)+var(--nav-h)+clamp(40px,7vh,88px))] pb-6">
      {/* corner labels, on the menu's centre line — desktop only, where the capsule leaves room */}
      <div aria-hidden={false} className="absolute inset-x-(--gutter) top-[calc(var(--nav-top)+env(safe-area-inset-top,0px))] hidden h-(--nav-h) items-center justify-between xl:flex">
        <p className="type-utility">Evening course in typographic design</p>
        <StudioClock />
      </div>

      <h1 className="type-display [font-size:clamp(3.5rem,14.6vw,9rem)] sm:[font-size:13vw] xl:[font-size:13.6vw]">
        <span className="sr-only">{hero.headline}</span>
        <span aria-hidden className="sm:hidden">
          {['Grids,', 'letters and', 'a poster of', 'your own.'].map((l, i) => (
            <span key={l} className="line-in" style={{ '--i': i } as React.CSSProperties}>{l}</span>
          ))}
        </span>
        <span aria-hidden className="max-sm:hidden">
          {hero.linesDesktop.map((l, i) => (
            <span key={l} className="line-in whitespace-nowrap" style={{ '--i': i } as React.CSSProperties}>{l}</span>
          ))}
        </span>
      </h1>

      <div className="mt-auto pt-12">
        <div className="raster items-end gap-y-6">
          <p className="type-body col-span-4 [font-size:1.0625rem] sm:col-span-4 lg:col-span-4 lg:[font-size:1.125rem]">{hero.line}</p>
          <div className="col-span-4 sm:col-span-2 lg:col-span-3 lg:col-start-10">
            <ApplyButton cohort={nextCohort.id} size="lg" className="w-full">{hero.action}</ApplyButton>
          </div>
        </div>
        <dl className="raster mt-8 gap-y-4 border-t border-(--color-text) pt-3 lg:mt-12">
          {facts.map((f) => (
            <div key={f.k} className="col-span-2 sm:col-span-2 lg:col-span-3">
              <dt className="type-utility text-(--color-muted)">{f.k}</dt>
              <dd className="type-utility mt-0.5">{f.v}</dd>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-6 lg:col-span-3">
            <dt className="type-utility text-(--color-muted)">Next start</dt>
            <dd className="type-utility mt-0.5">
              {nextCohort.start}, {nextCohort.format.toLowerCase()}. <span className="text-(--color-accent)">{left} of {site.seats} seats left</span>
            </dd>
          </div>
        </dl>
        <StudioClock className="mt-4 text-(--color-muted) xl:hidden" />
      </div>
    </section>
  )
}
