import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { MediaAsset } from '@/components/MediaAsset'
import { Timeline } from '@/components/Timeline'

export const metadata: Metadata = { title: 'About' }

export default function AboutPage() {
  return (
    <>
      <PageHeader lines={['Made by', 'the same hands']} mobile={['Made by', 'the same', 'hands']} />
      <section aria-label="About KOFİİ" className="container-text grid gap-12 pb-32 md:grid-cols-12 md:gap-6">
        <MediaAsset id="portrait" className="aspect-[4/5] md:col-span-5" sizes="(min-width: 768px) 40vw, 100vw" reveal="clip" />
        <div className="md:col-span-6 md:col-start-7 md:self-end" data-reveal="stagger">
          <p className="type-heading">We opened KOFİİ because we wanted a coffee shop where you can watch your drink being made, start to finish.</p>
          <p className="mt-8 max-w-[56ch] text-lg">
            The same small team runs the bar every day. We roast with a local partner, bake in the shop each morning, and keep the menu short enough to make everything well.
          </p>
          <p className="mt-4 max-w-[56ch] text-lg">
            No loyalty app, no queue system. Say hello, tell us how you like it, and we will remember next time.
          </p>
        </div>
      </section>
      <section aria-labelledby="story-title" className="container-text grid gap-12 py-32 md:grid-cols-12 md:gap-6">
        <h2 id="story-title" className="type-statement md:col-span-4">How we got here</h2>
        <div className="md:col-span-7 md:col-start-6">
          <Timeline />
        </div>
      </section>
    </>
  )
}
