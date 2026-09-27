import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy", description: "Which cookies this site uses and why." };

export default function Cookies() {
  return (
    <LegalPage label="Cookie Policy" title="Almost no cookies." updated="27 September 2026">
      <p>Browsing this site sets no cookies. There is no analytics, no advertising and no third-party embed that would set them for us.</p>
      <h2>If you sign in</h2>
      <p>Signing in sets one strictly necessary session cookie so the site remembers you are signed in. It expires when you sign out or after 30 days, and it is never used for tracking.</p>
      <h2>Local settings</h2>
      <p>Your browser may cache fonts, images and the 3D scene so pages load faster next time. That cache is not a cookie and holds nothing about you.</p>
      <h2>Changes</h2>
      <p>If we ever add a cookie, it will be listed here before it goes live — with what it does and how long it lasts.</p>
    </LegalPage>
  );
}
