import type { Metadata } from 'next'
import { Motif } from '@/components/Motif'
import { site } from '@/data/site'

export const metadata: Metadata = { title: 'Privacy', description: 'What Aster House does with your details.' }

export default function Privacy() {
  return (
    <section className="px-5 py-30 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-12">
        <h1 className="type-display flex items-center gap-5 md:col-span-5"><Motif len={64} />Privacy</h1>
        <div className="type-body max-w-[60ch] space-y-5 md:col-span-6 md:col-start-7">
          <p>This site stores nothing about you. It sets no cookies and runs no analytics.</p>
          <p>The viewing form does not send anything itself: it opens your own mail app with a message to {site.email}. What you send there reaches the sales office, who use it only to arrange your viewing and to reply to you.</p>
          <p>We keep viewing emails for twelve months after the last houses are handed over, then delete them. To see or delete what we hold about you, write to {site.email}.</p>
        </div>
      </div>
    </section>
  )
}
