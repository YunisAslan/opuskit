import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Service", description: "The terms for using this site." };

export default function Terms() {
  return (
    <LegalPage label="Terms of Service" title="The terms of the sky." updated="27 September 2026">
      <p>By using this site you agree to these terms. They are short on purpose.</p>
      <h2>The work</h2>
      <p>Everything shown here — type, layouts, images and code — belongs to SKYISTHELIMIT or the people we made it with. You are welcome to look, link and share. Please do not copy it into your own work or sell it.</p>
      <h2>Third-party material</h2>
      <p>The sky scene is “FREE – SkyBox Basic Sky” by Paul, used under CC BY 4.0. Fonts are Syne, DM Sans and DM Mono under the SIL Open Font License.</p>
      <h2>Accounts</h2>
      <p>Keep your sign-in details to yourself. We may close accounts that are used to abuse the site or other people.</p>
      <h2>No warranty</h2>
      <p>We keep the site running as well as we can, but we provide it as it is. Project work is governed by the separate agreement we sign with each client.</p>
      <h2>Changes</h2>
      <p>If these terms change, the date above changes with them. Questions go to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
