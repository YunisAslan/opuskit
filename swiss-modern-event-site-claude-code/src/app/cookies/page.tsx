import type { Metadata } from "next"
import { LegalPage } from "@/components/LegalPage"

export const metadata: Metadata = { title: "Cookie Policy" }

export default function CookiesPage() {
  return (
    <LegalPage
      label="Cookie Policy"
      lines={["Two cookies,", "no tracking"]}
      updated="29 September 2026"
      sections={[
        { h: "What we set", p: ["A session cookie keeps you signed in when you choose to. A security cookie protects the reply and contact forms from abuse. Both are strictly necessary and hold no personal profile."] },
        { h: "What we do not set", p: ["No advertising cookies, no cross-site tracking and no third-party analytics. Fonts and images are served from this site, so no other company sees your visit."] },
        { h: "Managing cookies", p: ["You can clear or block cookies in your browser settings. If you block them, you can still read the site and reply; you will need to sign in each visit."] },
      ]}
    />
  )
}
