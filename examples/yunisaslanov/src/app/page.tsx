import Link from 'next/link'
import { HeroDither } from '@/components/HeroDither'
import { Lines } from '@/components/Lines'
import { FeaturedWorkSection } from '@/components/sections/FeaturedWork'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { NewsletterSection } from '@/components/sections/Newsletter'
import { Button } from '@/components/ui/button'
import { assets } from '@/config/assets'
import { projects, site } from '@/config/site'

export default function Home() {
  return (
    <>
      {/* Cover: the statement is the loud part; the dithered print is pinned behind it, the words sit on solid blocks */}
      <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden px-(--gutter) pb-[clamp(32px,5vw,64px)] pt-32">
        <div aria-hidden className="taped absolute right-(--gutter) top-[13%] h-[30%] w-[44%] rotate-[2.5deg] bg-(--color-surface) [--tape:3deg] md:right-[calc(2/24*100%)] md:top-[16%] md:h-[44%] md:w-[calc(6/24*100%)]">
          <div className="absolute inset-0 overflow-hidden"><HeroDither shape="warp" size={2} /></div>
        </div>
        <Lines as="h1" now text="Come in. This is where I work."
          mobile={['Come in.', 'This is', 'where', 'I work.']}
          desktop={['Come in.', 'This is where', 'I work.']}
          block="bg-(--color-background) pr-[0.12em]"
          className="type-display relative [font-size:15vw] md:[font-size:10.5vw] md:ml-[calc(1/24*100%)]" />
        <div className="relative mt-10 flex flex-col gap-6 md:ml-[calc(1/24*100%)] md:flex-row md:items-end md:justify-between">
          <ul className="type-utility flex flex-wrap gap-x-6 gap-y-2 text-(--color-muted) *:bg-(--color-background) *:px-1.5 *:py-0.5">
            <li className="text-(--color-text)">Yunis Aslanov</li>
            <li>Portfolio and workspace</li>
            <li className="flex items-center gap-2"><span aria-hidden className="size-2 rounded-full bg-(--color-accent)" />Taking on new work from November</li>
          </ul>
          <Button asChild className="h-12 self-start px-7 md:mr-[calc(1/24*100%)]"><Link href="/contact">Say hello</Link></Button>
        </div>
      </section>

      <div data-reveal="cut">
        <FeaturedWorkSection variant="index" link={Link} title="Selected work, 2023 to 2026"
          projects={projects.map((p) => ({ title: p.title, meta: `${p.kind}, ${p.year}`, image: assets[p.cover].src, alt: assets[p.cover].alt, href: `/projects/${p.slug}` }))} />
      </div>

      <div data-reveal="cut">
        <TestimonialsSection variant="single" tone="surface" title="What people say"
          quotes={[{ quote: 'Yunis listens first, then makes the thing you didn’t know how to ask for.', name: 'Aysel K.', role: 'Editor, Paper Weather' }]} />
      </div>

      <div data-reveal="cut">
        <NewsletterSection title="A letter, once a month"
          text="New pictures, one thing I learned, and nothing you have to answer."
          placeholder="you@example.com" button="Subscribe" note="Once a month. Leave with one click."
          action={`mailto:${site.email}?subject=Add%20me%20to%20the%20monthly%20letter`} />
      </div>
    </>
  )
}
