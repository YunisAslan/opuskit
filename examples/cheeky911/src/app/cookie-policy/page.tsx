import type { Metadata } from 'next'
import TextPage from '@/components/TextPage'

export const metadata: Metadata = { title: 'Cookie policy' }

export default function CookiePolicy() {
  return (
    <TextPage title="Cookie policy" intro="Last updated 28 September 2026.">
      <h2>What we use</h2>
      <p>We use as few cookies as we can. A cookie is a small file your browser keeps so a site can remember something between visits.</p>
      <ul>
        <li>Essential: keeps you signed in and remembers what is in an enquiry. These cannot be turned off.</li>
        <li>Preferences: remembers choices such as reduced motion, if you set them here rather than in your system.</li>
      </ul>
      <h2>What we do not use</h2>
      <p>No advertising cookies, no tracking across other sites, and no selling of anything we learn about your visit.</p>
      <h2>Changing your mind</h2>
      <p>You can clear cookies in your browser settings at any time. The site will still work; you will just need to sign in again.</p>
    </TextPage>
  )
}
