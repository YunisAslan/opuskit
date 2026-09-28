import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Cookie policy' }

export default function CookiesPage() {
  return (
    <LegalPage
      title={['Cookie', 'policy']}
      updated="28 September 2026"
      intro="This site uses two kinds of cookie: ones it cannot work without, and one for counting visits without identifying you. There are no advertising cookies."
      sections={[
        { h: 'Essential', p: ['A session cookie keeps you signed in, and a basket cookie remembers what you are ordering. Both expire when you sign out or after 30 days. They do not need consent because the site cannot work without them.'] },
        { h: 'Analytics', p: ['We count page views with a privacy-first tool that stores no personal data and sets no cross-site cookie. We use the numbers to see which pages people read and where they stop.'] },
        { h: 'Changing your mind', p: ['You can clear or block cookies in your browser settings at any time. Blocking essential cookies will stop sign-in and checkout from working.'] },
      ]}
    />
  )
}
