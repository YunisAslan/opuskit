import type { Metadata } from 'next'
import Lines from '@/components/Lines'
import MagneticButton from '@/components/MagneticButton'

export const metadata: Metadata = { title: 'Contact' }

export default function ContactPage() {
  return (
    <section aria-label="Closing call to action" className="container-text flex min-h-svh flex-col justify-end pb-32 pt-40 md:pb-40">
      <Lines as="h1" lines={['Stock it.', 'Pour it.', 'Write to us.']} className="type-display" />
      <div className="mt-12 grid gap-12 border-t-2 border-border pt-6 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col gap-4 md:col-span-5">
          <p className="type-body text-lg">
            Cafés, delis, offices and bars: we ship cases across the EU and UK from our London unit. Tell us how many cans a week you pour, and we will send prices and two free cases to try.
          </p>
          <p className="type-body">Lena or Marco replies within one working day.</p>
        </div>
        <div className="flex flex-col items-start gap-6 md:col-span-6 md:col-start-7">
          <MagneticButton href="mailto:hello@keepersdrinks.com?subject=Stocking%20Keepers">Email us</MagneticButton>
          <dl className="type-body grid grid-cols-[96px_1fr] gap-x-4 gap-y-2">
            <dt className="type-utility text-muted">Email</dt>
            <dd><a href="mailto:hello@keepersdrinks.com" className="link-quiet">hello@keepersdrinks.com</a></dd>
            <dt className="type-utility text-muted">Phone</dt>
            <dd><a href="tel:+442079460312" className="link-quiet">+44 20 7946 0312</a></dd>
            <dt className="type-utility text-muted">Unit</dt>
            <dd>Unit 4, 22 Hackney Wick Road, London E9 5ES</dd>
          </dl>
        </div>
      </div>
    </section>
  )
}
