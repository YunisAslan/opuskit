import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Privacy policy' }

export default function PrivacyPage() {
  return (
    <>
      <PageHeader lines={['Privacy']} />
      <section className="container-text pb-32">
        <div className="prose-legal">
          <p>This page explains what we collect when you use this site, why, and what you can ask us to do with it.</p>
          <h2>What we collect</h2>
          <ul>
            <li>Bookings: your name, phone number, date, time and party size.</li>
            <li>Orders and gift cards: your name, contact details and what you ordered.</li>
            <li>Accounts: your name, email and a securely stored password.</li>
            <li>Basic site statistics, without identifying you.</li>
          </ul>
          <h2>Why we use it</h2>
          <p>Only to run your booking, prepare your order, send your gift card or keep your account working. We do not sell your data or use it for advertising.</p>
          <h2>How long we keep it</h2>
          <p>Booking details for 30 days. Order and account details for as long as your account is open, or as long as tax law requires.</p>
          <h2>Your rights</h2>
          <p>You can ask to see, correct or delete your data at any time. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we reply within 30 days.</p>
        </div>
      </section>
    </>
  )
}
