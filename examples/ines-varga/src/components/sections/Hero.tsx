// Home → Hero — Illustrated hero: the drawn map is the key visual; the headline is set in the brush hand beside it,
// one word circled in marker, the line and the action under it. Desktop: the map fills the right two-thirds, the
// words sit bottom-left on clean paper. Phones: a portrait crop of the town and the lake above the words, the
// headline re-broken by hand. Readable at first paint: only the drawing animates.
import Link from 'next/link'
import { Fragment } from 'react'
import { Circled, HeroMap } from '@/components/drawings/HeroMap'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { buttonVariants } from '@/components/ui/button'
import { home } from '@/content/site'

function withCircle(line: string, word: string) {
  const parts = line.split(word)
  return parts.map((part, i) => <Fragment key={i}>{part}{i < parts.length - 1 && <Circled>{word}</Circled>}</Fragment>)
}

export function HeroSection() {
  const h = home.hero
  return (
    <section aria-labelledby="hero-title" className="relative px-(--gutter) pt-16 md:pt-20 lg:min-h-svh">
      <HeroMap labels={h.mapLabels} className="pointer-events-none -mx-(--gutter) mt-6 aspect-[7/9] sm:mt-0 sm:aspect-[5/4] lg:absolute lg:inset-y-0 lg:right-0 lg:left-[38%] lg:mx-0 lg:aspect-auto lg:py-[10svh] lg:pr-(--gutter)" />
      <div className="relative grid-site pb-16 pt-8 lg:min-h-[calc(100svh-5rem)] lg:content-end lg:pb-[10svh] lg:pt-0">
        <div className="col-span-full lg:col-span-6">
          <h1 id="hero-title" className="type-display">
            <span className="hidden sm:block">{h.lines.map((l) => <span key={l} className="block">{withCircle(l, h.circled)}</span>)}</span>
            <span className="sm:hidden">{h.mobileLines.map((l) => <span key={l} className="block">{withCircle(l, h.circled)}</span>)}</span>
          </h1>
          <p className="type-body mt-8 max-w-[38ch] text-(--color-muted)">{h.line}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={h.action.href} className={buttonVariants({ size: 'lg' })}>{h.action.label}</Link>
            <DrawnLink href={h.second.href} stroke="wave" className="type-utility py-3">{h.second.label}</DrawnLink>
          </div>
        </div>
      </div>
    </section>
  )
}
