import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { site } from '@/config/site'

export const metadata: Metadata = { title: 'Terms of service' }

export default function TermsPage() {
  return (
    <>
      <PageHeader lines={['Terms of', 'service']} />
      <section className="container-text pb-32">
        <div className="prose-legal">
          <p>By using this site you agree to these terms. They are short on purpose.</p>
          <h2>Bookings</h2>
          <p>We hold a booked table for fifteen minutes. If your plans change, call or email and we will free the table for someone else.</p>
          <h2>Orders</h2>
          <p>Prices on the menu include tax. Online orders are paid when you place them. If something is wrong with your order, tell us and we will make it right.</p>
          <h2>Gift cards</h2>
          <p>Gift cards never expire and can be used at both locations and online. They cannot be exchanged for cash.</p>
          <h2>Accounts</h2>
          <p>Keep your password to yourself. We may close accounts that are used to abuse the site.</p>
          <h2>Contact</h2>
          <p>Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
        </div>
      </section>
    </>
  )
}
