import type { Metadata } from 'next'
import Lines from '@/components/Lines'

export const metadata: Metadata = { title: 'Contact' }

export default function Contact() {
  return (
    <section aria-labelledby="contact-title" className="mx-auto flex min-h-svh max-w-[1200px] flex-col justify-end px-6 pb-32 pt-40 md:pb-40">
      <h1 id="contact-title" data-reveal="lines" className="type-display">
        <Lines lines={[['Come and', 'stretch-narrow'], ['see one', 'stretch-wide'], ['in person', 'stretch-mid']]} />
      </h1>
      <div data-reveal="rise" className="mt-12 grid gap-8 md:grid-cols-12 md:gap-6">
        <p className="type-body text-muted md:col-span-5">
          Viewings are by appointment, most evenings and all day Saturday. Tell us which car, and we will
          send a time and the address of the garage.
        </p>
        <div className="md:col-span-6 md:col-start-7">
          <a href="mailto:hello@cheeky911.com" className="text-link type-heading inline-flex min-h-16 items-center break-all">
            hello@cheeky911.com
          </a>
          <p className="type-utility mt-2 text-muted">We answer within two working days.</p>
        </div>
      </div>
    </section>
  )
}
