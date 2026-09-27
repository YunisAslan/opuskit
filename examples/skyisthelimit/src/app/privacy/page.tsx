import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "What SKYISTHELIMIT collects and why." };

export default function Privacy() {
  return (
    <LegalPage label="Privacy Policy" title="What we collect, plainly." updated="27 September 2026">
      <p>This site does not run analytics, advertising or tracking scripts. Browsing it collects nothing about you beyond the standard request logs our host keeps to serve pages and stop abuse.</p>
      <h2>When you email us</h2>
      <p>If you write to {site.email}, we keep your name, address and message so we can reply and, if we work together, run the project. We never sell it or share it for marketing.</p>
      <h2>Accounts</h2>
      <p>If you create an account, we store your name, email and a hashed password. You can ask us to delete the account and its data at any time.</p>
      <h2>How long we keep it</h2>
      <p>Enquiries that do not become projects are deleted after 12 months. Project correspondence is kept for as long as the law requires for our records.</p>
      <h2>Your rights</h2>
      <p>You can ask to see, correct or delete what we hold about you. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we will answer within 30 days.</p>
    </LegalPage>
  );
}
