import type { Metadata } from 'next'
import { brand } from '@/content/site'

export const metadata: Metadata = { title: 'Privacy', description: 'What Sticky Weather does with your details: very little.' }

export default function Privacy() {
  return (
    <section className="section-y px-5 pt-32 md:px-6 md:pt-40">
      <div className="mx-auto max-w-[760px]">
        <p className="type-body">The short version, because it is short.</p>
        <h1 className="type-display mt-3 [font-size:clamp(2.5rem,6vw,5rem)]">Privacy? Plenty.</h1>
        <div className="type-body mt-10 space-y-5">
          <p>This site has no cookies, no tracking and no analytics. It remembers one thing in your browser for the length of a visit: that you’ve already peeled the sticker on the way in, so we don’t ask twice.</p>
          <p>The hello form doesn’t send anything by itself. It opens your own email app with your note written out, so whatever you send reaches us the way any email does, and stays between us.</p>
          <p>We keep project emails for as long as we work together, plus six years for the accounts. If you’re on the sticker post we keep your address until you tell us to stop. Write to <a className="underline underline-offset-4" href={`mailto:${brand.email}`}>{brand.email}</a> and we’ll delete whatever you ask.</p>
          <p className="type-utility text-(--color-muted)">Sticky Weather Studio Ltd, Unit 4, 12 Gasferry Road, Bristol BS1 6UN.</p>
        </div>
      </div>
    </section>
  )
}
