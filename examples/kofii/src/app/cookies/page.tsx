import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'

export const metadata: Metadata = { title: 'Cookie policy' }

export default function CookiesPage() {
  return (
    <>
      <PageHeader lines={['Cookies']} />
      <section className="container-text pb-32">
        <div className="prose-legal">
          <p>Cookies are small files a site stores in your browser. We use as few as we can.</p>
          <h2>Cookies we use</h2>
          <ul>
            <li>Sign-in: keeps you signed in to your account. Removed when you sign out.</li>
            <li>Basket: remembers your online order while you choose. Removed after 24 hours.</li>
          </ul>
          <h2>Cookies we do not use</h2>
          <p>No advertising cookies and no cross-site tracking.</p>
          <h2>Turning them off</h2>
          <p>You can block cookies in your browser settings. The site still works, but you will not be able to sign in or keep an order between visits.</p>
        </div>
      </section>
    </>
  )
}
